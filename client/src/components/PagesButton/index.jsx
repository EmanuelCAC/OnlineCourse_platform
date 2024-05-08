import React from "react";
import { Img, Button, Text } from "./..";

export default function PagesButton({items, page, pageHandler, totalPages}) {
  
  return (
    <div className="flex flex-row justify-between items-center w-[35%] md:w-full">
      <Button size="lg" shape="round" className="w-[15%] !rounded-md !bg-white-A700 hover:!bg-red-300_01"
        onClick={() => pageHandler('prev')}
        onMouseOver={() => {
          const img = document.getElementById('prev')
          img.src = "/images/img_arrow_right.svg"
          img.className = img.className.replace("rotate-0", "rotate-180")
        }}
        onMouseLeave={() => {
          const img = document.getElementById('prev')
          img.src = "/images/img_arrow_left.svg"
          img.className = img.className.replace("rotate-180", "rotate-0")
        }}
      >
        <Img src="/images/img_arrow_left.svg" id="prev" className="rotate-0" />
      </Button>
      <Text as="p" className="!text-gray-900 !font-medium">
        Page
      </Text>
      <Button color="white_A700" size="sm" className="!text-gray-700_01 font-medium min-w-[42px] rounded-lg cursor-default">
        {page}
      </Button>
      <Text as="p" className="!text-gray-900 !font-medium">
        of {items ? totalPages : 1}
      </Text>
      <Button size="lg" shape="round" className="w-[15%] !rounded-md !bg-white-A700 hover:!bg-red-300_01"
        onClick={() => pageHandler('next')}
        onMouseOver={() => {
          const img = document.getElementById('next')
          img.src = "/images/img_arrow_right.svg"
          img.className = img.className.replace("rotate-180", "rotate-0")
        }}
        onMouseLeave={() => {
          const img = document.getElementById('next')
          img.src = "/images/img_arrow_left.svg"
          img.className = img.className.replace("rotate-0", "rotate-180")
        }}
      >
        <Img src="/images/img_arrow_left.svg" className="rotate-180" id="next" />
      </Button>
    </div>
  )
}