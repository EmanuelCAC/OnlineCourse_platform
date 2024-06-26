import React from "react";
import { Helmet } from "react-helmet";
import { Heading, Text, Footer, Header, Banner } from "../../components";
import PricingCard from "components/PricingCard";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100 px-5">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex flex-row justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <div className="flex flex-row justify-center w-full">
            <Banner
              bgColor="bg-red-50"
              l1="Our Pre-ready"
              l2="Pricing Packages"
              image="/images/pricing_banner.png"
              routes={[
                {
                  name: "Home",
                  path: "/"
                },
                {
                  name: "Pricing",
                  path: "#"
                }
              ]}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col items-center justify-start w-full gap-5 md:px-5 max-w-7xl">
            <Heading size="2xl" as="h2" className="!font-metropolis text-center leading-[55px]">
              <>
                We create a monthly plan
                <br />
                for all students
              </>
            </Heading>
            <Text as="p" className="text-center !leading-[30px] !text-black-900_02">
              <>
                Basically we create this plan for those who are really interested and get benefited from our courses
                or books. <br />
                We want to make a low cost plan for them. So that they can purchase any courses with the plan they
                buy from us. <br />
                Also will get free books from every plan.
              </>
            </Text>
          </div>
        </div>
        <div className="flex flex-row justify-center w-full md:px-5 max-w-7xl">
          <div className="flex flex-row flex-wrap items-center w-full gap-4">
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
            <PricingCard title="Standard" price={600} items={[
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
            <PricingCard title="Premium" price={1200} items={[
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