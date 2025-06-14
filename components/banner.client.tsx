import { Button } from "@radix-ui/themes";
import Image from "next/image";

interface Props {
  handleOnClick: () => void;
  buttonText: string;
}

export default function Banner({ handleOnClick, buttonText }: Props) {
  return (
    <div className="mb-12 grid lg:mb-24 lg:grid-cols-2">
      <div className="z-20 flex flex-col px-2 md:pt-12">
        <h1 className="my-2 flex-wrap text-5xl">
          <span className="pr-2 text-white">Coffee</span>
          <span className="text-amber-600">Connoisseur</span>
        </h1>
        <p className="font-sans text-xl font-semibold text-amber-900 md:mt-5 lg:text-2xl">
          Discover your local coffee shops!
        </p>

        <div className="mt-12">
          <Button onClick={handleOnClick}>{buttonText}</Button>
        </div>
      </div>
      <div className="absolute top-2 z-10 md:top-0 md:mt-12 md:pl-10 md:pt-0 lg:right-1/4 lg:flex lg:pl-20">
        <Image
          src="/static/hero-image.png"
          width={800}
          height={300}
          alt="hero image"
          priority={true}
        />
      </div>
    </div>
  );
}
