"use client";

export type ImageCardProps = {
  title: string;
  blurb: string;
  src: string;
  alt?: string;
};

export default function ImageCard({
  title,
  blurb,
  src,
  alt = title,
}: ImageCardProps) {
  return (
    <div className="relative w-[80%] md:w-full max-w-sm mx-auto group cursor-pointer mt-20">
      {/* Background rectangle (smaller height and padding) */}
      <div className="bg-gray-300 rounded-2xl px-4 pt-12 pb-6 transition-colors duration-300 group-hover:bg-gray-600">
        {/* Image container (sticks out and bigger) */}
        <div className="relative -mt-28 z-10  md:w-full flex justify-center">
          <img
            src="./hero.png"
            alt="Service"
            className="w-[100%] md:w-[440px] max-w-none transition-transform duration-300 group-hover:transform group-hover:-translate-y-2 group-hover:translate-x-2"
          />
        </div>

        {/* Title and subtitle section */}
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-[42px] font-bold text-gray-800 ">Service Title</h3>
        <p className="text-xl text-gray-600 ">
          This is a brief description of the service or feature being showcased
          in this card.
        </p>
      </div>
    </div>
  );
}
