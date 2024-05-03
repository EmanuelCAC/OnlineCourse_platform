import React from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text, Img, Footer, Header, BreadCrumbs } from "../../components";
import PricingCard from "components/PricingCard";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-red-50 max-w-7xl rounded-[20px]">
              <BreadCrumbs routes={[
                {
                  name: "Home",
                  path: "/"
                },
                {
                  name: "Pricing",
                  path: "#"
                }
              ]} />
              <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[360px] md:gap-10 md:ml-0">
                <Heading size="2xl" as="h1" className="w-[31%] !font-semibold">
                  <>
                    Our Pre-ready
                    <br />
                    Pricing Packages
                  </>
                </Heading>
                <div className="flex flex-row justify-end w-[40%] md:w-full pt-1 px-1">
                  <div className="flex flex-col items-center justify-start w-[87%] mb-1">
                    <Img
                      src="/images/pricing_banner.png"
                      alt="speechbubble"
                      className="w-[100%] mr-10 md:mr-5 z-[0]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-start w-full gap-5 md:px-5 max-w-7xl">
            <Heading size="2xl" as="h2" className="!font-metropolis text-center leading-[55px]">
              <>
                We create a monthly pricing package
                <br />
                for all standard students
              </>
            </Heading>
            <Text as="p" className="text-center !leading-[30px] !text-black-900_02">
              <>
                Basically we create this package for those who are really interested and get benefited from our courses
                or books. <br />
                We want to make a low cost package for them. So that they can purchase any courses with the package they
                buy from us. <br />
                Also will get free books from every packages.
              </>
            </Text>
          </div>
        </div>
          <div className="flex flex-row justify-center w-full md:px-5 max-w-7xl">
            <div className="flex flex-row md:flex-col items-center w-full gap-10 md:gap-2.5">
            <PricingCard title="Basic" price={200} items={[
                {
                  description: "3 HD video lessons & tutorials",
                  has: true
                },
                {
                  description: "1 Official exam",
                  has: true
                },
                {
                  description: "100 Practice questions",
                  has: true
                },
                {
                  description: "1 Free book",
                  has: true
                },
                {
                  description: "Practice quizzes & assignments",
                  has: false
                },
                {
                  description: "In depth explanations",
                  has: false
                },
                {
                  description: "Personal instructor Assistance",
                  has: false
                }
              ]} />
              <PricingCard title="Standard Pack" price={600} items={[
                {
                  description: "8 HD video lessons & tutorials",
                  has: true
                },
                {
                  description: "2 Official exam",
                  has: true
                },
                {
                  description: "200 Practice questions",
                  has: true
                },
                {
                  description: "3 Free book",
                  has: true
                },
                {
                  description: "Practice quizzes & assignments",
                  has: true
                },
                {
                  description: "In depth explanations",
                  has: false
                },
                {
                  description: "Personal instructor Assistance",
                  has: false
                }
              ]} />
              <PricingCard title="Premium Pack" price={1200} items={[
                {
                  description: "15 HD video lessons & tutorials",
                  has: true
                },
                {
                  description: "3 Official exam",
                  has: true
                },
                {
                  description: "300 Practice questions",
                  has: true
                },
                {
                  description: "5 Free book",
                  has: true
                },
                {
                  description: "Practice quizzes & assignments",
                  has: true
                },
                {
                  description: "In depth explanations",
                  has: true
                },
                {
                  description: "Personal instructor Assistance",
                  has: true
                }
              ]} />
            </div>
          </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}