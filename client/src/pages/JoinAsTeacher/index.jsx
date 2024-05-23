import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Heading, Button, Text, Footer, Header, BreadCrumbs } from "../../components";

export default function JoinAsTeacher() {
  const [active, setActive] = useState(1)

  return (
    <>
      <Helmet>
        <title>Emanuel's Application1</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-yellow-100 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Join as a Teacher",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-center items-center w-[99%] md:w-full ml-2.5 gap-[546px] md:gap-10 md:ml-0">
              <Heading size="2xl" as="h1" className="w-[31%] !font-semibold">
                <>
                  Join Educatsy as
                  <br />a Mentor
                </>
              </Heading>
              <div className="h-[210px] w-[32%] md:w-full relative">
                <div className="h-[14px] w-full bottom-[1%] right-0 left-0 m-auto bg-black-900_cc backdrop-opacity-[0.5] blur-[81.00px] absolute rounded-[50%]" />
                <Img
                  src="/images/joinAsTeacher_banner.png"
                  alt="image_one"
                  className="justify-center h-[210px] w-[97%] sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10 md:px-5 max-w-7xl">
            <div className="flex flex-row justify-center">
              <Img
                src="images/img_image_521x510.png"
                alt="image_seven"
                className="w-[88%] md:h-auto sm:w-full object-cover"
              />
            </div>
            <div className="flex flex-col items-start justify-start w-[46%] md:w-full gap-[30px]">
              <div className="flex flex-col items-start justify-start w-full pt-0.5 gap-2.5">
                <Heading size="xl" as="h2">
                  Apply As Instructor
                </Heading>
                <Text as="p" className="!leading-[30px] !text-gray-700">
                  Teaching is a vital and admirable career. As such, it comes with quite a bit of responsibility, both
                  in practice and in preparation with many skills required to be a teacher. The following steps provide
                  a general breakdown of the requirements for teachers:
                </Text>
              </div>
              <div className="flex flex-col items-center justify-start w-full gap-5">
                <div className="flex flex-row justify-start items-start w-full gap-[30px] h-[60px]">
                  <div className="flex flex-col items-center justify-start w-[33%] pt-1.5 gap-[13px]">
                    <Text as="p" className={`${active==1 && '!text-red-300_01'} !font-medium cursor-pointer`} onClick={() => setActive(1)}>
                      Instructor Requirements
                    </Text>
                    {active==1 && <div className="h-px w-full bg-red-300_01 shadow-lg" />}
                  </div>
                  <div className="flex flex-col items-center h-full justify-start pt-1.5 gap-[13px]">
                    <Text as="p" className={`${active==2 && '!text-red-300_01'} mt-[10px] !font-medium cursor-pointer`}  onClick={() => setActive(2)}>
                      Instructor Rules
                    </Text>
                    {active==2 && <div className="h-px w-full bg-red-300_01 shadow-lg  mt-auto" />}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-start w-full gap-2.5">
                  <div className="flex flex-row justify-start items-center w-full gap-2.5 py-[3px] sm:gap-2.5">
                    <div className="h-[10px] w-[10px] bg-red-300_01 rounded-[50%]" />
                    <Text as="p" className="mt-[3px] !text-gray-900">
                      An undergraduate degree
                    </Text>
                  </div>
                  <div className="flex flex-row justify-start items-center w-full gap-2.5 py-[3px] sm:gap-2.5">
                    <div className="h-[10px] w-[10px] bg-red-300_01 rounded-[50%]" />
                    <Text as="p" className="mt-[3px] !text-gray-900">
                      Participate in supervised teaching
                    </Text>
                  </div>
                  <div className="flex flex-row justify-start items-center w-full gap-2.5 py-[3px] sm:gap-2.5">
                    <div className="h-[10px] w-[10px] bg-red-300_01 rounded-[50%]" />
                    <Text as="p" className="mt-[3px] !text-gray-900">
                      State teaching license
                    </Text>
                  </div>
                  <div className="flex flex-row justify-start items-center w-full gap-2.5 py-[3px] sm:gap-2.5">
                    <div className="h-[10px] w-[10px] bg-red-300_01 rounded-[50%]" />
                    <Text as="p" className="mt-[3px]  !text-gray-900">
                      Pursue graduate studies
                    </Text>
                  </div>
                </div>
              </div>
              <Button className="sm:px-5 font-medium min-w-[143px] rounded-[10px] sm:min-w-full" hover>Apply Now</Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-row justify-center w-full md:px-5 max-w-7xl">
            <div className="flex flex-col items-center justify-start w-[83%] pt-[5px] gap-16">
              <Heading size="2xl" as="h2" className="!font-metropolis text-center">
                How to apply to join as instructor
              </Heading>
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row justify-center w-full p-2 bg-white-A700 shadow-md rounded-[20px]">
                  <div className="flex flex-row justify-center w-full mt-[7px]">
                    <div className="flex flex-row justify-center w-full bg-white-A700">
                      <Img
                        src="images/img_bg.png"
                        alt="bg_three"
                        className="w-full md:h-auto sm:w-full object-cover rounded-[20px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer className="flex flex-col items-center justify-center w-full" />
      </div>
    </>
  );
}
