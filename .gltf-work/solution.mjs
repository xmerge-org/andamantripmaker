import { rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const runtimeSpecifier = process.env.QODER_GLTF_RUNTIME
  ? pathToFileURL(path.resolve(process.env.QODER_GLTF_RUNTIME)).href
  : '@phodal/modeling-glb';
const { createModelBundle, modelCreate, modelLoftProfiles } =
  await import(runtimeSpecifier);

// Octagon sections lofted along +z, tipped upright by the placement: a tapering, leaning trunk.
function trunk(peak, bend, radii, offsets) {
  return modelLoftProfiles({
    sectionPlane: 'xy',
    loftAxis: 'z',
    sections: offsets.map((offset, i) => {
      const r = radii[i];
      const cx = bend * (offset / peak) ** 1.6;
      return {
        offset,
        profile: Array.from({ length: 8 }, (_, k) => {
          const a = (k * Math.PI) / 4;
          return { x: cx + r * Math.cos(a), y: r * Math.sin(a) };
        }),
      };
    }),
  });
}

// Thin quads lofted along +x: the blade widens, then narrows to a tip while the spine droops.
function frond(spine) {
  const thickness = 0.009;
  return modelLoftProfiles({
    sectionPlane: 'yz',
    loftAxis: 'x',
    sections: spine.map(({ offset, halfWidth, lift }) => ({
      offset,
      profile: [
        { y: lift + thickness, z: -halfWidth },
        { y: lift + thickness, z: halfWidth },
        { y: lift - thickness, z: halfWidth },
        { y: lift - thickness, z: -halfWidth },
      ],
    })),
  });
}

const trunkTall = trunk(0.68, 0.24, [0.075, 0.062, 0.048], [0, 0.36, 0.68]);
const trunkShort = trunk(0.52, 0.18, [0.06, 0.05, 0.04], [0, 0.28, 0.52]);

const frondLong = frond([
  { offset: 0, halfWidth: 0.022, lift: 0.014 },
  { offset: 0.2, halfWidth: 0.058, lift: -0.004 },
  { offset: 0.42, halfWidth: 0.05, lift: -0.058 },
  { offset: 0.62, halfWidth: 0.012, lift: -0.152 },
]);

const roof = modelLoftProfiles({
  sectionPlane: 'xy',
  loftAxis: 'z',
  sections: [
    { offset: 0, profile: [{ x: -0.26, y: -0.26 }, { x: 0.26, y: -0.26 }, { x: 0.26, y: 0.26 }, { x: -0.26, y: 0.26 }] },
    { offset: 0.26, profile: [{ x: -0.05, y: -0.05 }, { x: 0.05, y: -0.05 }, { x: 0.05, y: 0.05 }, { x: -0.05, y: 0.05 }] },
  ],
});

function defineModel() {
  return modelCreate('build a low-poly Andaman island emblem for a hero section')
    .appearance('sea.reef', { baseColor: '#86CFC8', metallic: 0.05, roughness: 0.5 })
    .appearance('sea.deep', { baseColor: '#0B5C76', metallic: 0.2, roughness: 0.22 })
    .appearance('island.sand', { baseColor: '#E3C48F', metallic: 0, roughness: 0.93 })
    .appearance('hut.wall', { baseColor: '#F3E6CC', metallic: 0, roughness: 0.82 })
    .appearance('hut.thatch', { baseColor: '#74442B', metallic: 0, roughness: 0.9 })
    .appearance('palm.trunk', { baseColor: '#7C5433', metallic: 0, roughness: 0.9 })
    .appearance('palm.frond', { baseColor: '#1E7A5F', metallic: 0, roughness: 0.72 })
    .appearance('palm.nut', { baseColor: '#4A2E1C', metallic: 0, roughness: 0.6 })

    .occurrence('island.root', { name: 'AndamanIsland' })

    .part('island.reef', {
      parent: 'island.root',
      name: 'ReefFlat',
      appearance: 'sea.reef',
      translation: [0, -0.06, 0],
      geometry: { type: 'primitive.cylinder', radius: 0.6, height: 0.02, radialSegments: 48, axis: 'y' },
    })
    .part('island.lagoon', {
      parent: 'island.root',
      name: 'LagoonDisc',
      appearance: 'sea.deep',
      translation: [0, -0.035, 0],
      geometry: { type: 'primitive.cylinder', radius: 0.55, height: 0.024, radialSegments: 48, axis: 'y' },
    })
    .part('island.mound', {
      parent: 'island.root',
      name: 'SandCay',
      appearance: 'island.sand',
      translation: [0, 0.16, 0],
      geometry: { type: 'primitive.ellipsoid', radii: [0.56, 0.28, 0.54], widthSegments: 32, heightSegments: 12 },
    })

    .occurrence('hut.group', { name: 'Hut', parent: 'island.root', translation: [-0.02, 0.4, -0.26], rotationRad: [0, 0.42, 0] })
    .part('hut.walls', {
      parent: 'hut.group',
      name: 'HutWalls',
      appearance: 'hut.wall',
      translation: [0, 0.12, 0],
      geometry: { type: 'primitive.box', size: [0.3, 0.24, 0.26] },
    })
    .part('hut.roof', {
      parent: 'hut.group',
      name: 'HutRoof',
      appearance: 'hut.thatch',
      translation: [0, 0.225, 0],
      rotationRad: [-Math.PI / 2, 0, 0],
      geometry: roof,
    })

    .occurrence('palm1.group', { name: 'PalmTall', parent: 'island.root', translation: [0.2, 0.41, 0.14], rotationRad: [0, -0.6, 0] })
    .part('palm1.trunk', {
      parent: 'palm1.group',
      name: 'PalmTallTrunk',
      appearance: 'palm.trunk',
      rotationRad: [-Math.PI / 2, 0, 0],
      geometry: trunkTall,
    })
    .occurrence('palm1.crown', { name: 'PalmTallCrown', parent: 'palm1.group', translation: [0.24, 0.68, 0] })
    .part('palm1.frond.000', {
      parent: 'palm1.crown',
      name: 'PalmTallFrond',
      appearance: 'palm.frond',
      translation: [0.02, 0.02, 0],
      geometry: frondLong,
    })
    .pattern('palm1.fronds', { type: 'radial', source: 'palm1.frond.000', count: 6, axis: 'y', center: [0, 0, 0] })
    .part('palm1.nut.000', {
      parent: 'palm1.crown',
      name: 'PalmTallCoconut',
      appearance: 'palm.nut',
      translation: [0.07, -0.05, 0.04],
      geometry: { type: 'primitive.sphere', radius: 0.042, widthSegments: 12, heightSegments: 8 },
    })
    .pattern('palm1.nuts', { type: 'radial', source: 'palm1.nut.000', count: 3, axis: 'y', center: [0, 0, 0] })

    .occurrence('palm2.group', { name: 'PalmShort', parent: 'island.root', translation: [-0.24, 0.39, 0.18], rotationRad: [0, 2.2, 0] })
    .part('palm2.trunk', {
      parent: 'palm2.group',
      name: 'PalmShortTrunk',
      appearance: 'palm.trunk',
      rotationRad: [-Math.PI / 2, 0, 0],
      geometry: trunkShort,
    })
    .occurrence('palm2.crown', { name: 'PalmShortCrown', parent: 'palm2.group', translation: [0.18, 0.52, 0] })
    .part('palm2.frond.000', {
      parent: 'palm2.crown',
      name: 'PalmShortFrond',
      appearance: 'palm.frond',
      translation: [0.02, 0.02, 0],
      scale: [0.8, 0.8, 0.8],
      geometry: frondLong,
    })
    .pattern('palm2.fronds', { type: 'radial', source: 'palm2.frond.000', count: 5, axis: 'y', center: [0, 0, 0] })
    .part('palm2.nut.000', {
      parent: 'palm2.crown',
      name: 'PalmShortCoconut',
      appearance: 'palm.nut',
      translation: [0.055, -0.04, 0.03],
      geometry: { type: 'primitive.sphere', radius: 0.034, widthSegments: 10, heightSegments: 6 },
    })
    .pattern('palm2.nuts', { type: 'radial', source: 'palm2.nut.000', count: 3, axis: 'y', center: [0, 0, 0] })

    .expectBounds({
      min: [-0.84, -0.12, -0.604],
      max: [0.981, 1.133, 0.915],
      tolerance: 0.005,
    })

    .budget({
      maxOperations: 64,
      maxGeneratedInstances: 40,
      maxNodes: 64,
      maxVertices: 9000,
      maxTriangles: 6000,
      maxBytes: 3 * 1024 * 1024,
    });
}

const source = defineModel();

const bundle = await createModelBundle(source.program());
await Promise.all([
  writeAtomic('program.gltf.json', JSON.stringify(bundle.program, null, 2) + '\n'),
  writeAtomic('artifact.glb', bundle.artifact),
  writeAtomic('artifact.gltf-project.json', bundle.projectSidecar),
  writeAtomic('capability-report.json', JSON.stringify(bundle.capabilityReport, null, 2) + '\n'),
]);

process.stdout.write(JSON.stringify({
  status: 'committed',
  revision: bundle.inspection.revision,
  bounds: bundle.inspection.bounds,
  counts: bundle.validation.counts,
}) + '\n');

async function writeAtomic(filePath, data) {
  const absolute = path.resolve(filePath);
  const temporary = path.join(path.dirname(absolute), '.' + path.basename(absolute) + '.' + process.pid + '.tmp');
  await writeFile(temporary, data);
  await rename(temporary, absolute);
}
