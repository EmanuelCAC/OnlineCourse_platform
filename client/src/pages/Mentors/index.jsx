import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Text, Button, Img, Slider, Heading, Header, Footer, BreadCrumbs } from "../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Mentors() {
  const [mentors, setMentors] = useState([])
  const navigate = useNavigate()

  const getMentors = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/api/v1/mentor`)
      if (data) {
        const newMentors = data.map((mentor) => {
          mentor.role = mentor.role.join(' & ')
          return mentor
        })
        setMentors(newMentors)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    getMentors()
  }, [])

  return (
    <>
      <Helmet>
        <title>Emanuel's Application1</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-red-50 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Our Mentors",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[420px] md:gap-10 md:ml-0">
              <Heading size="2xl" as="h1" className="w-[31%] !font-semibold">
                <>
                  Educatsy has the
                  <br />
                  qualified mentor
                </>
              </Heading>
              <div className="flex flex-row justify-end w-[35%] md:w-full py-[3px]">
                <div className="flex flex-col items-center justify-start w-[97%] mb-1">
                  <Img
                    src="/images/mentors_banner.png"
                    alt="speechbubble"
                    className="w-[100%] mr-10 md:mr-5 z-[1]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full gap-[50px]">
          <Heading size="3xl" as="h1" className="text-center" >Our Mentors</Heading>
          <div className="flex flex-row flex-wrap md:flex-col justify-between w-[85%] gap-3 md:gap-5 mx-auto">
            {mentors[0] && mentors.map((mentor) => (
              <div
              className="flex flex-col items-center justify-start w-[23%] md:w-full gap-2.5 mx-auto bg-white-A700 hover:shadow-xs rounded-[20px] p-3 cursor-pointer"
              onClick={() => {navigate('/mentor/' + mentor._id)}}
              >
                <Img src={mentor.image} alt="bg_one" className="w-full md:h-auto object-cover rounded-[20px]" />
                <div className="flex flex-col items-start justify-start w-full pl-1 gap-1">
                  <Text as="p" className="!text-black-900_02 !font-medium">
                    {mentor.name}
                  </Text>
                  <Text size="xs" as="p" className="!text-gray-500">
                    {mentor.role}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer className="flex flex-col items-center justify-center w-full" />
      </div>
    </>
  );
}
