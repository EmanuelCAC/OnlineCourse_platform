import React, {useState} from "react";
import { Img, Text, Heading, Button } from "./..";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import { useSelector } from "react-redux";

export default function PricingCard({title, price, items}) {
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const authData = useSelector((state) => state.auth.userData)

  return (
    <div className="flex flex-col items-start justify-start w-[32%] md:w-full gap-6 p-[30px] sm:p-5 bg-white-A700 cursor-pointer rounded-[20px] hover:shadow-sm">
      <div className="flex flex-col items-center justify-start w-full pb-3.5">
        <div className="flex flex-col items-start justify-start w-full gap-3.5">
          <Img src="/images/img_group_red_300_01.svg" alt="basic_pack_one" className="h-[50px] w-[50px]" />
          <Heading size="xl" as="h2">
            {title}
          </Heading>
        </div>
      </div>
      <div className="flex flex-col items-center justify-start w-full gap-5">
        {items.map((item) => (
          <div className="flex flex-row justify-start items-center w-full gap-2.5">
            {item.has ? <Img src="/images/img_approve_24_outline.svg" alt="image" className="h-[24px] w-[24px]" /> : <Img src="/images/img_close_24_outline.svg" alt="image_four" className="h-[24px] w-[24px]" />}
            <Text as="p" className="!font-medium">
              {item.description}
            </Text>
          </div>
        ))}
      </div>
      <Heading size="s" as="h3">
        ${price}
      </Heading>
      <Button size="2xl" variant="outline" shape="round" className="w-full sm:px-5 font-medium hover:bg-red-300_01 hover:text-white-A700"
      onClick={() => {
        if (!authData) 
          setLogin(true)
      }}
      >
        Purchase Course
      </Button>
      <LogIn
        isOpen={login}
        isSignupOpen={() => {
          setLogin(false)
          setSignup(true)
        }}
        close={() => setLogin(false)}
        onRequestClose={() => setLogin(false)}
      />
      <SignUp
        isOpen={signup}
        isLoginOpen={() => {
          setSignup(false)
          setLogin(true)
        }}
        close={() => setSignup(false)}
        onRequestClose={() => setSignup(false)}
      />
    </div> 
  )
}