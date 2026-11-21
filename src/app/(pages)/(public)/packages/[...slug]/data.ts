import PACKAGES_JSON from "@/utility/json/packages.json";

export { default } from "@/utility/json/packages.json";

// Type for package label function
export const PACKAGE_LABEL = (pkg: typeof PACKAGES_JSON[0]) =>
  `${pkg.title} (${pkg.duration}, ${pkg.people}) · ${pkg.price}`;
