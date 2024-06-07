import React from "react";
import { BreadCrumbs, Heading, Img } from "components";

const Banner = ({bgColor, routes, l1, l2, image}) => {
  return (
    <div className={`flex flex-col items-start justify-start w-full gap-[5px] p-5 ${bgColor} max-w-7xl rounded-[20px] mx-5`}>
      <BreadCrumbs routes={routes} />
      <div className="flex flex-row justify-between items-center w-full px-2">
        <Heading size="3xl" as="h1" className="!font-semibold md:text-4xl sm:text-2xl">
          <>
            {l1}
            <br />
            {l2}
          </>
        </Heading>
        <Img
          src={image}
          alt="kisspngbookcas"
          className="object-cover max-h-[60%] max-w-[50%]"
        />
      </div>
    </div>
  );
};

export { Banner };