import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Button, Img, Text, SelectBox, Input, Heading, Header, BreadCrumbs, RatingBar } from "../../components";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];

export default function EduviCoursesPage() {
  const [searchBarValue, setSearchBarValue] = useState("");

  const [active, setActive] = useState("All Courses")


  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-yellow-100 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Courses",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[436px] md:gap-10 md:ml-0">
              <Heading size="3xl" as="h1" className="w-[33%] !font-semibold">
                <>
                  Educatsy Courses
                  <br />
                  For All Standards
                </>
              </Heading>
              <div className="h-[210px] w-[32%] md:w-full relative">
                <div className="h-[14px] w-full bottom-[1%] right-0 left-0 m-auto bg-black-900_cc backdrop-opacity-[0.5] blur-[81.00px] absolute rounded-[50%]" />
                <Img
                  src="images/img_image_210x374.png"
                  alt="image_one"
                  className="justify-center h-[210px] w-[97%] sm:w-full left-0 bottom-0 right-0 top-0 m-auto object-cover absolute"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-row md:flex-col justify-start w-full gap-5 md:px-5 max-w-7xl">
            <Button onClick={() => setActive("All Courses")} color={active == "All Courses" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              All Courses
            </Button>
            <Button onClick={() => setActive("Kindergarten")} color={active == "Kindergarten" ? "orange_200_01" : "white_A700"} className="font-medium min-w-[142px] rounded-[10px]">
              Kindergarten
            </Button>
            <Button onClick={() => setActive("High School")} color={active == "High School" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              High School
            </Button>
            <Button onClick={() => setActive("College")} color={active == "College" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              College
            </Button>
            <Button onClick={() => setActive("Computer")} color={active == "Computer" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              Computer
            </Button>
            <Button onClick={() => setActive("Science")} color={active == "Science" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              Science
            </Button>
            <Button onClick={() => setActive("Engineering")} color={active == "Engineering" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[142px] rounded-[10px]">
              Engineering
            </Button>
            <Button color="white_A700" className="!text-deep_orange-400 font-medium min-w-[142px] rounded-[10px]">
              More Courses
            </Button>
          </div>
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-start justify-start w-full gap-[23px] md:px-5 max-w-7xl">
              <Heading size="xl" as="h2">
                Standard Classes
              </Heading>
              <div className="flex flex-row justify-start w-full">
                <div className="w-full gap-10 md:gap-5 flex-row flex flex-wrap justify-center">
                  <div className="flex flex-col items-center justify-start w-full max-w-fit">
                    <div className="flex flex-col items-center justify-center w-full gap-[25px] p-[15px] bg-white-A700 rounded-[15px]">
                      <div className="flex flex-col items-center justify-start w-full mt-[15px] gap-[19px] md:px-5 max-w-[260px]">
                        <Img src="images/img_group.svg" alt="image" className="h-[50px] w-[50px]" />
                        <div className="flex flex-col items-center justify-start w-full gap-[9px]">
                          <Heading size="lg" as="h1" className="text-center">
                            Standard One
                          </Heading>
                          <Text as="p" className="!text-gray-700_01 text-center !leading-[30px]">
                            Standard 1 is a foundation Standard that reflects 7 important concepts...
                          </Text>
                        </div>
                      </div>
                      <Button
                        size="md"
                        variant="outline"
                        shape="round"
                        className="mb-[15px] sm:px-5 font-medium min-w-[159px] sm:min-w-full"
                      >
                        Class Details
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-full max-w-fit">
                    <div className="flex flex-col items-center justify-center w-full gap-[25px] p-[15px] bg-white-A700 rounded-[15px]">
                      <div className="flex flex-col items-center justify-start w-full mt-[15px] gap-[19px] md:px-5 max-w-[260px]">
                        <Img src="images/img_group.svg" alt="image" className="h-[50px] w-[50px]" />
                        <div className="flex flex-col items-center justify-start w-full gap-[9px]">
                          <Heading size="lg" as="h1" className="text-center">
                            Standard One
                          </Heading>
                          <Text as="p" className="!text-gray-700_01 text-center !leading-[30px]">
                            Standard 1 is a foundation Standard that reflects 7 important concepts...
                          </Text>
                        </div>
                      </div>
                      <Button
                        size="md"
                        variant="outline"
                        shape="round"
                        className="mb-[15px] sm:px-5 font-medium min-w-[159px] sm:min-w-full"
                      >
                        Class Details
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-start w-full max-w-fit">
                    <div className="flex flex-col items-center justify-center w-full gap-[25px] p-[15px] bg-white-A700 rounded-[15px]">
                      <div className="flex flex-col items-center justify-start w-full mt-[15px] gap-[19px] md:px-5 max-w-[260px]">
                        <Img src="images/img_group.svg" alt="image" className="h-[50px] w-[50px]" />
                        <div className="flex flex-col items-center justify-start w-full gap-[9px]">
                          <Heading size="lg" as="h1" className="text-center">
                            Standard One
                          </Heading>
                          <Text as="p" className="!text-gray-700_01 text-center !leading-[30px]">
                            Standard 1 is a foundation Standard that reflects 7 important concepts...
                          </Text>
                        </div>
                      </div>
                      <Button
                        size="md"
                        variant="outline"
                        shape="round"
                        className="mb-[15px] sm:px-5 font-medium min-w-[159px] sm:min-w-full"
                      >
                        Class Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-start w-full gap-[50px] md:px-5 max-w-7xl">
            <div className="flex flex-col items-center justify-start w-full gap-10">
              <div className="flex flex-col items-start justify-start w-full pt-0.5 gap-2.5">
                <Heading size="xl" as="h2">
                  Other Courses For High School
                </Heading>
                <div className="flex flex-row md:flex-col justify-start w-full gap-[42px] md:gap-5">
                  <Input
                    color="white_A700"
                    name="search"
                    placeholder="Search Class or Course Name"
                    value={searchBarValue}
                    onChange={(e) => setSearchBarValue(e)}
                    suffix={
                      searchBarValue?.length > 0 ? (
                        <CloseSVG onClick={() => setSearchBarValue("")} height={24} width={24} fillColor="#0000000" />
                      ) : (
                        <Img src="images/img_search.svg" alt="search" className="cursor-pointer opacity-0 fill-black-900_02" fill="#0000000" />
                      )
                    }
                    className="w-[84%] md:w-full gap-[35px] !text-gray-700_99 rounded-tr-[10px] rounded-br-[10px] font-medium"
                  />
                  <SelectBox
                    size="xs"
                    shape="round"
                    indicator={<Img src="images/img_arrowdown_red_300_01.svg" alt="arrow_down" />}
                    name="sortby"
                    placeholder="Sort by: Latest"
                    options={dropDownOptions}
                    className="w-[16%] md:w-full gap-px font-medium"
                  />
                </div>
              </div>
              <div className="justify-center w-full gap-10 grid-cols-2 md:grid-cols-1 md:gap-5 grid">
                <div className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs">
                  <div className="flex flex-row sm:flex-col justify-start items-center w-[89%] md:w-full gap-[15px] sm:gap-5">
                    <div className="flex flex-row justify-start w-[31%] sm:w-full">
                      <Img
                        src="images/img_image_103x160.png"
                        alt="image"
                        className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[67%] sm:w-full gap-3">
                      <Heading size="md" as="h1">
                        The Three Musketeers
                      </Heading>
                      <RatingBar
                        value={5}
                        isEditable={true}
                        color="#ffc107"
                        activeColor="#ffc107"
                        size={20}
                        className="flex justify-between"
                      />
                      <Heading size="md" as="h2" className="!text-deep_orange-400">
                        $40.00
                      </Heading>
                    </div>
                  </div>
                  <Button size="lg" shape="round" className="w-[44px] !rounded-md">
                    <Img src="images/img_shopping_bag_24_white_a700.svg" />
                  </Button>
                </div>
                <div className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs">
                  <div className="flex flex-row sm:flex-col justify-start items-center w-[89%] md:w-full gap-[15px] sm:gap-5">
                    <div className="flex flex-row justify-start w-[31%] sm:w-full">
                      <Img
                        src="images/img_image_103x160.png"
                        alt="image"
                        className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[67%] sm:w-full gap-3">
                      <Heading size="md" as="h1">
                        The Three Musketeers
                      </Heading>
                      <RatingBar
                        value={5}
                        isEditable={true}
                        color="#ffc107"
                        activeColor="#ffc107"
                        size={20}
                        className="flex justify-between"
                      />
                      <Heading size="md" as="h2" className="!text-deep_orange-400">
                        $40.00
                      </Heading>
                    </div>
                  </div>
                  <Button size="lg" shape="round" className="w-[44px] !rounded-md">
                    <Img src="images/img_shopping_bag_24_white_a700.svg" />
                  </Button>
                </div>
                <div className="flex flex-row justify-start w-full gap-6 p-[15px] bg-white-A700 cursor-pointer rounded-[10px] hover:shadow-xs">
                  <div className="flex flex-row sm:flex-col justify-start items-center w-[89%] md:w-full gap-[15px] sm:gap-5">
                    <div className="flex flex-row justify-start w-[31%] sm:w-full">
                      <Img
                        src="images/img_image_103x160.png"
                        alt="image"
                        className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
                      />
                    </div>
                    <div className="flex flex-col items-start justify-start w-[67%] sm:w-full gap-3">
                      <Heading size="md" as="h1">
                        The Three Musketeers
                      </Heading>
                      <RatingBar
                        value={5}
                        isEditable={true}
                        color="#ffc107"
                        activeColor="#ffc107"
                        size={20}
                        className="flex justify-between"
                      />
                      <Heading size="md" as="h2" className="!text-deep_orange-400">
                        $40.00
                      </Heading>
                    </div>
                  </div>
                  <Button size="lg" shape="round" className="w-[44px] !rounded-md">
                    <Img src="images/img_shopping_bag_24_white_a700.svg" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start items-center w-full pl-[497px] pr-14 gap-[19px] md:px-5">
              <Button color="white_A700" size="lg" shape="round" className="w-[44px] !rounded-md">
                <Img src="images/img_arrow_left.svg" />
              </Button>
              <Text as="p" className="!text-gray-900 !font-medium">
                Page
              </Text>
              <Button color="white_A700" size="sm" className="!text-gray-700_01 font-medium min-w-[42px] rounded-lg">
                5
              </Button>
              <Text as="p" className="!text-gray-900 !font-medium">
                of 80
              </Text>
              <Button size="lg" shape="round" className="w-[44px] !rounded-md">
                <Img src="images/img_arrow_right.svg" />
              </Button>
            </div>
          </div>
        </div>
        <footer className="flex flex-col items-center justify-center w-full">
        </footer>
      </div>
    </>
  );
}
