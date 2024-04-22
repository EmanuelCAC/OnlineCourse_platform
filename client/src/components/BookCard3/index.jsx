import React from "react";
import { Img, RatingBar, Heading } from "./..";
import { useNavigate } from "react-router-dom";

export default function BookCard3({book, ...props}) {
  const navigate = useNavigate()
  
  return (
    <div
      className="flex flex-col items-center justify-start w-full gap-2 cursor-pointer"
      {...props}
      onClick={() => navigate(book._id)}
    >
      <div className="flex flex-col items-center justify-start w-full md:h-auto p-5 bg-white-A700 rounded-[10px] hover:shadow-xs">
        <div className="flex flex-col items-center justify-start w-full md:px-5 max-w-[230px]">
          <Img
            src={book.image}
            alt="image_one"
            className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
          />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start w-full gap-[9px]">
        <Heading as="h1">{book.name}</Heading>
        <div className="flex flex-row justify-between items-center w-full">
          <Heading as="h2" className="!text-red-300_01">
            {book.price.toFixed(2)}
          </Heading>
          <RatingBar
            value={book.rating}
            isEditable={false}
            size={16}
            className="flex justify-between"
          />
        </div>
      </div>
    </div>
  )
}