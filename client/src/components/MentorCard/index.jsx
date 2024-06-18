import React from "react";
import { Img, Text } from "./..";
import { useNavigate } from "react-router-dom";

export default function MentorCard({mentor, ...props}) {
  const navigate = useNavigate()

  return (
    <div
    {...props}
    className="flex flex-col items-center justify-start w-[23%] md:w-[48%] sm:w-full gap-2.5 mx-auto bg-white-A700 hover:shadow-xs rounded-[20px] p-3 cursor-pointer"
    onClick={() => {navigate('/mentor/' + mentor._id)}}
    >
      <Img src={mentor.image} alt="bg_one" className="w-full object-cover rounded-[20px]" />
      <div className="flex flex-col items-start justify-start w-full pl-1 gap-1">
        <Text as="p" className="!text-black-900_02 !font-medium">
          {mentor.name}
        </Text>
        <Text size="xs" as="p" className="!text-gray-500">
          {mentor.role}
        </Text>
      </div>
    </div>
  )
}