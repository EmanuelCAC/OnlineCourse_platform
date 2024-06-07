import React from "react";
import { Text, Heading, Img, Button, Subscribe } from "..";

export default function Footer({ ...props }) {
  return (
    <>
      <Subscribe className="flex flex-row justify-center w-full" />
      <footer {...props}>
        <div className="flex flex-row justify-between fs:justify-center w-full gap-2 max-w-7xl mb-5">
          <div className="flex flex-col items-center justify-start w-fit gap-[46px] fs:gap-5">
            <div className="flex flex-col items-center justify-start w-full gap-[22px]">
              <Img src="/images/img_logo.svg" alt="logo_three" className="h-[30px]" />
              <div className="flex flex-row justify-between items-center w-[85%]">
                <Img src="/images/img_facebook_logo_1.svg" alt="facebooklogoone" className="h-[22px] w-[22px]" />
                <Button color="deep_orange_400" size="xs" shape="circle" className="w-[36px]">
                  <Img src="/images/img_instagram_icon.svg" />
                </Button>
                <Img src="/images/img_twitter_logo.svg" alt="twitterlogo" className="h-[17px]" />
                <Img src="/images/img_linkedin_icon.svg" alt="linkedinicon" className="h-[18px]" />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start fs:items-center w-full gap-[13px]">
              <Text as="p">©2021 Educatsy</Text>
              <Text as="p">Educatsy is a registered</Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-fit gap-[19px] fs:hidden">
            <Heading size="md" as="h5">
              Courses
            </Heading>
            <div className="flex flex-col items-start justify-start w-full gap-[20px]">
              <Text as="p">Classroom courses</Text>
              <Text as="p">
                Virtual classroom courses
              </Text>
              <Text as="p">E-learning courses</Text>
              <Text as="p">Video Courses</Text>
              <Text as="p">Offline Courses</Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-fit gap-[19px] fs:hidden">
            <Heading size="md" as="h5">
              Community
            </Heading>
            <div className="flex flex-col items-start justify-center w-full gap-[20px]">
              <Text as="p" className="mt-0.5">
                Learners
              </Text>
              <Text as="p">Partners</Text>
              <Text as="p">Developers</Text>
              <Text as="p">Transactions</Text>
              <Text as="p">Blog</Text>
              <Text as="p">Teaching Center</Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-fit gap-[19px] fs:hidden">
            <Heading size="md" as="h5">
              Quick links
            </Heading>
            <div className="flex flex-col items-start justify-center gap-[20px]">
              <Text as="p" className="mt-0.5">
                Home
              </Text>
              <Text as="p">Professional Education</Text>
              <Text as="p">Courses</Text>
              <Text as="p">Admissions</Text>
              <Text as="p">Testimonial</Text>
              <Text as="p">Programs</Text>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start w-fit gap-[19px] fs:hidden">
            <Heading size="md" as="h5">
              More
            </Heading>
            <div className="flex flex-col items-start justify-start gap-[20px]">
              <Text as="p">Press</Text>
              <Text as="p">Investors</Text>
              <Text as="p">Terms</Text>
              <a href="#">
                <Text as="p">Privacy</Text>
              </a>
              <Text as="p">Help</Text>
              <Text as="p">Contact</Text>
            </div>
          </div>
        </div>
      </footer>
    </>

  );
}
