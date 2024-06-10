import React from "react";
import { Img, RatingBar, Heading } from "./..";
import { useNavigate } from "react-router-dom";

export default function BookCard2({book, ...props}) {
  const navigate = useNavigate()
  
  return (
    <div
      {...props}
      onClick={() => navigate('/shop/' + book._id)}
      className="flex flex-row sm:flex-col justify-start items-center w-full md:h-[225px] sm:h-full md:max-w-[90%] gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px] cursor-pointer hover:shadow-xs">
      <Img
        src={book.image}
        alt="popular_books"
        className="w-[100px] md:w-[180px] sm:w-[60%] md:min-w-[160px] aspect-square ml-[3px] object-cover rounded-[5px]"
      />
      <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-1">
        <RatingBar
          value={book.rating}
          isEditable={false}
          size={16}
          className="flex justify-between"
        />
        <Heading as="h3" className="!text-black-900_02 text-base md:text-lg">
          <>
            {book.name}, by
            <br />
            {book.author}
          </>
        </Heading>
        <Heading as="h4" className="!text-red-300_01 text-base md:text-lg">
          ${book.price.toFixed(2)}
        </Heading>
      </div>
    </div>
  )
}