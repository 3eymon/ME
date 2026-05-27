"use client";
import { LazyLoadImage as ReactLazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyloadImageProps {
  src: string;
  alt: string;
  aspectRatio?: string; // مثلا "16/9"
}

function LazyloadImage({ src, alt, aspectRatio = "16/9" }: LazyloadImageProps) {
  return (
    <div
      className={`w-full relative aspect-[${aspectRatio}] overflow-hidden rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none`}
    >
      <ReactLazyLoadImage
        src={src}
        alt={alt}
        effect="blur"
        className="object-cover w-full h-full transition-all duration-500"
        wrapperClassName="w-full h-full"
      />
    </div>
  );
}

export default LazyloadImage;
