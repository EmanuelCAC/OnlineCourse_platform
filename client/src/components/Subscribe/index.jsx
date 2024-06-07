import React, { useState } from "react";
import { Img, Button, Input, Text, Heading } from "./..";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Subscribe({ ...props }) {
  const [email, setEmail] = useState("")
  const subscribed = () => toast.success("Subscribed successfully!")

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      const {data} = await axios.post(`http://localhost:3001/api/v1/subscribe`, {
        email: email
      })
      setEmail("")
      subscribed()
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  return (
    <div {...props}>
      <div className="flex flex-row justify-center w-full md:w-[80%] p-[50px] md:p-5 bg-black-900_01 max-w-7xl rounded-[20px]">
        <div className="flex flex-row justify-between md:justify-center w-full my-[11px] gap-3">
          <div className="flex flex-col items-start justify-start w-fit gap-[57px] md:hidden">
            <Img
              src="/images/img_ellipse_169.png"
              alt="circleimage"
              className="h-[60px] aspect-square sm:hidden rounded-[50%]"
            />
            <Img
              src="/images/img_ellipse_170.png"
              alt="circleimage_one"
              className="h-[60px] aspect-square ml-[150%] rounded-[50%]"
            />
            <Img
              src="/images/img_ellipse_171.png"
              alt="circleimage_two"
              className="h-[60px] aspect-square ml-[30%] sm:ml-5 rounded-[50%]"
            />
          </div>
          <div className="flex flex-col items-center justify-start">
            <div className="flex flex-col items-center justify-start w-full gap-10">
              <div className="flex flex-col items-center justify-start w-full pb-[3px] gap-[26px]">
                <Heading size="2xl" as="h1" className="!text-white-A700 !font-metropolis text-center leading-[55px] md:text-4xl">
                  Subscribe For Get Update
                  <br />
                  Every New Courses
                </Heading>
                <Text as="p" className="!text-white-A700_b2 text-center md:text-sm">
                  20k+ students daily learn with Educatsy. Subscribe for new courses.
                </Text>
              </div>
              <form className="flex flex-row sm:flex-col justify-center w-full sm:gap-3" onSubmit={(e) => submitHandler(e)}>
                <Input
                  shape="round"
                  name="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e)}
                  className="w-[77%] sm:w-full md:h-[50px] font-medium sm:rounded-[10px]"
                />
                <Button size="3xl" type='submit' className="sm:px-5 rounded-tr-[10px] rounded-br-[10px] sm:rounded-[10px] font-medium min-w-[138px] md:h-[50px]">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start gap-[57px]  md:hidden">
            <Img
              src="/images/img_ellipse_166.png"
              alt="circleimage"
              className="h-[60px] aspect-square mr-[90%] rounded-[50%]"
            />
            <Img
              src="/images/img_ellipse_167.png"
              alt="circleimage"
              className="h-[60px] aspect-square mr-[190%] rounded-[50%]"
            />
            <Img
              src="/images/img_ellipse_168.png"
              alt="circleimage"
              className="h-[60px] aspect-square rounded-[50%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
