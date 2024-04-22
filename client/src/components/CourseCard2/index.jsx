import React from "react";
import { Img, Heading, Text, Button, RatingBar } from "./..";
import { useNavigate } from "react-router-dom";

export default function CourseCard2({course, ...props}) {
  const navigate = useNavigate()
  
  return (
    <div
      className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs"
      {...props}
      onMouseLeave={() => {
        const button = document.getElementById(course._id)
        button.className = button.className.replace('bg-red-300_01', 'bg-red-100')
        const child = button.querySelector('#child')
        child.src = "/images/img_shopping_bag_24.svg"
      }}
      onMouseOver={() => {
        const button = document.getElementById(course._id)
        button.className = button.className.replace('bg-red-100', 'bg-red-300_01')
        const child = button.querySelector('#child')
        child.src = "/images/img_shopping_bag_24_white_a700.svg"
      }}
      onClick={() => { navigate('/courses/' + course._id) }}
    >
      <div className="flex flex-row sm:flex-col justify-start items-center w-[89%] md:w-full gap-[15px] sm:gap-5">
        <div className="flex flex-row justify-start w-[35%] sm:w-full">
          <Img
            src={course.image}
            alt="image"
            className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-[67%] sm:w-full gap-2">
          <div>
            <Heading size="md" as="h1">
              {course.name}
            </Heading>
            <Text as="p" size="s" className="!text-gray-700_01">{course.instructor}</Text>
          </div>
          <RatingBar
            value={course.rating}
            isEditable={false}
            size={18}
            className="flex justify-between"
          />
          <Heading size="md" as="h2" className="!text-deep_orange-400">
            ${course.price.toFixed(2)}
          </Heading>
          <div className="flex flex-row gap-3">
            {course.category.map((courseCat) => (
              <span key={courseCat} className="py-1 px-2 rounded-full bg-gray-200 text-black-900_02 text-xs">{courseCat}</span>
            ))}
          </div>
        </div>
      </div>
      <Button size="lg" shape="round" className="w-[44px] !rounded-md bg-red-100" id={course._id}>
        <Img src="/images/img_shopping_bag_24.svg" id="child" />
      </Button>
    </div>
  )
}