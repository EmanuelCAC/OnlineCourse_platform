import React from "react";
import { Img, Heading, Text, Button } from "./..";
import { useNavigate } from "react-router-dom";

export default function CourseCard1({course, ...props}) {
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-fit" {...props}>
      <div className="flex flex-col items-center justify-between w-full h-full p-[15px] bg-white-A700 rounded-[15px]">
        <div className="flex flex-col items-center justify-start w-full gap-3 max-w-[260px]">
          <Img src={course.image} alt="image" />
          <div className="flex flex-col items-center justify-start w-full gap-1">
            <Heading as="h1" className="text-center !font-bold">
              {course.name}
            </Heading>
            <Text as="p" className="!text-gray-700_01 text-center !leading-[20px] !text-sm">
              {course.description}
            </Text>
          </div>
        </div>
        <Button
          size="md"
          variant="outline"
          shape="round"
          className="my-3 sm:px-5 font-medium min-w-[159px] sm:min-w-full hover:text-white-A700 hover:bg-red-300_01"
          onClick={() => { navigate('/courses/' + course._id) }}
        >
          Course Details
        </Button>
      </div>
    </div>
  )
}