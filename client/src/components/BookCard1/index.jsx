import React from "react";
import { Img, RatingBar, Heading } from "./..";
import { useNavigate } from "react-router-dom";

export default function BookCard1({book}) {
  const navigate = useNavigate()
  
  return (
    <div
      key={book._id}
      onClick={() => navigate(`shop/${book._id}`)}
      className="flex flex-col justify-start items-center w-full gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px] cursor-pointer hover:shadow-xs">
      <Img
        src={book.image}
        alt="popular_books"
        className="w-[60%] md:h-auto sm:w-full ml-[3px] object-cover rounded-[5px]"
      />
      <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-2.5">
        <RatingBar
          value={book.rating}
          isEditable={false}
          size={16}
          className="flex justify-between"
        />
        <Heading as="h3" className="!text-black-900_02">
          <>
            {book.name}, by
            <br />
            {book.author}
          </>
        </Heading>
        <Heading as="h4" className="!text-red-300_01">
          ${book.price}
        </Heading>
      </div>
    </div>
  )
}