import React from "react";
import { Text, Heading, Img, Button, Input } from "..";

export default function Footer({ ...props }) {
  return (
    <footer {...props}>
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row md:flex-col justify-between items-center w-full p-[50px] md:gap-10 md:p-5 bg-black-900_01 max-w-7xl rounded-[20px]">
          <div className="flex flex-col items-start justify-start w-[16%] md:w-full gap-[57px] my-[11px] md:my-0">
            <Img
              src="images/img_ellipse_169.png"
              alt="circleimage"
              className="h-[60px] w-[60px] md:h-auto rounded-[50%]"
            />
            <Img
              src="images/img_ellipse_170.png"
              alt="circleimage_one"
              className="h-[60px] w-[60px] md:h-auto ml-[127px] md:ml-5 rounded-[50%]"
            />
            <Img
              src="images/img_ellipse_171.png"
              alt="circleimage_two"
              className="h-[60px] w-[60px] md:h-auto ml-[30px] md:ml-0 sm:ml-5 rounded-[50%]"
            />
          </div>
          <div className="flex flex-col items-center justify-start w-[49%] md:w-full gap-10">
            <div className="flex flex-col items-center justify-start w-full pb-[3px] gap-[26px]">
              <Heading size="3xl" as="h1" className="!text-white-A700 !font-metropolis text-center leading-[55px]">
                <>
                  Subscribe For Get Update
                  <br />
                  Every New Courses
                </>
              </Heading>
              <Text as="p" className="!text-white-A700_b2 text-center">
                20k+ students daily learn with Educatsy. Subscribe for new courses.
              </Text>
            </div>
            <div className="flex flex-row sm:flex-col justify-center w-full sm:gap-5">
              <Input
                shape="round"
                name="email"
                placeholder="enter your email"
                className="w-[77%] md:w-full font-medium"
              />
              <Button size="3xl" className="sm:px-5 rounded-tr-[10px] rounded-br-[10px] font-medium min-w-[138px]">
                Subscribe
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start w-[16%] md:w-full gap-[57px]">
            <Img
              src="images/img_ellipse_166.png"
              alt="circleimage"
              className="h-[60px] w-[60px] md:h-auto mr-[30px] sm:mr-5 rounded-[50%]"
            />
            <Img
              src="images/img_ellipse_167.png"
              alt="circleimage"
              className="h-[60px] w-[60px] md:h-auto mr-[127px] md:mr-5 rounded-[50%]"
            />
            <Img
              src="images/img_ellipse_168.png"
              alt="circleimage"
              className="h-[60px] w-[60px] md:h-auto rounded-[50%]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full mt-[516px] ml-[-1440px] px-14 py-20 md:ml-0 md:p-5 bg-gray-100">
        <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10 max-w-7xl">
          <div className="flex flex-col items-center justify-start w-[15%] md:w-full pb-[3px] gap-[46px]">
            <div className="flex flex-col items-center justify-start w-[97%] md:w-full gap-[22px]">
              <Img src="images/img_logo.svg" alt="logo_three" className="h-[30px]" />
              <div className="flex flex-row justify-between items-center w-[85%] md:w-full">
                <Img src="images/img_facebook_logo_1.svg" alt="facebooklogoone" className="h-[22px] w-[22px]" />
                <Button color="deep_orange_400" size="xs" shape="circle" className="w-[36px]">
                  <Img src="images/img_instagram_icon.svg" />
                </Button>
                <Img src="images/img_twitter_logo.svg" alt="twitterlogo_one" className="h-[17px]" />
                <Img src="images/img_linkedin_icon.svg" alt="linkedinicon" className="h-[18px]" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-3.5">
              <Text as="p" className="!text-gray-700_01">
                ©2021 Educatsy
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Educatsy is a registered
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-[14%] md:w-full gap-[19px]">
            <Heading size="md" as="h5">
              Courses
            </Heading>
            <div className="flex flex-col items-start justify-start w-full gap-6 py-[5px]">
              <Text as="p" className="!text-gray-700_01">
                Classroom courses
              </Text>
              <Text as="p" className="!text-gray-700_01 !leading-[30px]">
                Virtual classroom courses
              </Text>
              <Text as="p" className="!text-gray-700_01">
                E-learning courses
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Video Courses
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Offline Courses
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-[14%] md:w-full pt-0.5 gap-[17px]">
            <Heading size="md" as="h5">
              Community
            </Heading>
            <div className="flex flex-col items-start justify-center w-full gap-[27px] py-[3px]">
              <Text as="p" className="mt-0.5 !text-gray-700_01">
                Learners
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Partners
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Developers
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Transactions
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Blog
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Teaching Center
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-[14%] md:w-full gap-[19px]">
            <Heading size="md" as="h5">
              Quick links
            </Heading>
            <div className="flex flex-col items-start justify-center w-full gap-[27px] py-[3px]">
              <Text as="p" className="mt-0.5 !text-gray-700_01">
                Home
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Professional Education
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Courses
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Admissions
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Testimonial
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Programs
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-[14%] md:w-full gap-[19px]">
            <Heading size="md" as="h5">
              More
            </Heading>
            <div className="flex flex-col items-start justify-start w-full gap-[26px] py-1">
              <Text as="p" className="!text-gray-700_01">
                Press
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Investors
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Terms
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Privacy
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Help
              </Text>
              <Text as="p" className="!text-gray-700_01">
                Contact
              </Text>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
