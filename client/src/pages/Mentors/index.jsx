import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Heading, Header, Footer, Banner} from "../../components";
import axios from "axios";
import MentorCard from "components/MentorCard";

export default function Mentors() {
  const [mentors, setMentors] = useState([])

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
        <title>Online Course Platform</title>
        <meta name="description" content="Web site created using create-react-app" />
      </Helmet>
      <div className="flex flex-col items-center justify-start w-full gap-[100px] bg-gray-100">
        <div className="flex flex-col items-center justify-start w-full gap-12">
          <Header className="flex justify-center items-center w-full md:h-auto p-[22px] sm:p-5 bg-gray-100" />
          <Banner
            bgColor="bg-red-50"
            l1="Educatsy has the"
            l2="qualified mentor"
            image="/images/mentors_banner.png"
            routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Our Mentors",
                path: "#"
              }
            ]}
          />
        </div>
        <div className="flex flex-col justify-center w-full gap-[50px]">
          <Heading size="3xl" as="h1" className="text-center" >Our Mentors</Heading>
          <div className="flex flex-row flex-wrap md:flex-col justify-between w-[85%] gap-3 md:gap-5 mx-auto">
            {mentors[0] && mentors.map((mentor) => (
              <MentorCard mentor={mentor} key={mentor._id} />
            ))}
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  );
}
