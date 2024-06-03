import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Img, Heading, Button, Text, Footer, Header, Banner } from "../../components";

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
          <Banner
            bgColor="bg-yellow-100"
            l1="Join Educatsy as"
            l2="a Mentor"
            image="/images/joinAsTeacher_banner.png"
            routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Join as a Teacher",
                path: "#"
              }
            ]}
          />
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
