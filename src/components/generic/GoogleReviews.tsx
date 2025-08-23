"use client";

const GoogleReviews = () => {

  return (
    <div className="my-12 elfsight-google-reviews-widget">
      <div className="flex justify-center overflow-hidden">
        <iframe
          src="https://431d611b6243482082804f61bd8fceb9.elf.site"
          width="100%"
          height="660"
          style={{
            border: "none",
            overflow: "hidden",
            scrollbarWidth: "none",
          }}
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
        ></iframe>
      </div>
    </div>
  );
};

export default GoogleReviews;
