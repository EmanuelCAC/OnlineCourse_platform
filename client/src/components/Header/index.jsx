import React, { useState } from "react";
import { Img, Text } from "./..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";

export default function Header({ ...props }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

  const navItems = [
    {
      name: "Shop",
      slug: "/shop",
      active: true
    },
    {
      name: "For Kindergarten",
      slug: "#",
      img: {
        src: "images/img_arrow_down.svg",
        alt: "arrowdown_one",
        className: "h-[24px] w-[24px]"
      },
      active: true
    },
    {
      name: "For High School",
      slug: "#",
      img: {
        src: "images/img_arrow_down.svg",
        alt: "arrowdown_one",
        className: "h-[24px] w-[24px]"
      },
      active: true
    },
    {
      name: "For College",
      slug: "#",
      img: {
        src: "images/img_arrow_down.svg",
        alt: "arrowdown_one",
        className: "h-[24px] w-[24px]"
      },
      active: true
    },
    {
      name: "Courses",
      slug: "#",
      img: {
        src: "images/img_arrow_down.svg",
        alt: "arrowdown_one",
        className: "h-[24px] w-[24px]"
      },
      active: true
    },
    {
      name: "Mentors",
      slug: "#",
      active: true
    }
  ]

  const navAuthItems = [
    {
      name: "Cart (0)",
      slug: "#",
      img: {
        src: "images/img_shopping_bag_24.svg",
        alt: "shoppingbagtwen",
        className: "h-[30px] w-[30px]"
      },
      action: () => { navigate(item.slug) },
      active: authStatus
    },
    {
      name: "My Account",
      slug: "#",
      img: {
        src: "images/img_profile_24_outline.svg",
        alt: "profiletwentyfo",
        className: "h-[30px] w-[30px]"
      },
      action: () => { navigate(item.slug) },
      active: authStatus
    },
    {
      name: "Login",
      slug: "#",
      img: {
        src: "images/img_profile_24_outline.svg",
        alt: "profiletwentyfo",
        className: "h-[30px] w-[30px]"
      },
      action: () => {
        setLogin(true)
        console.log(login)
      },
      active: !authStatus
    },
  ]

  return (
    <header {...props}>
      <div className="flex flex-row md:flex-col justify-between w-full mx-auto md:gap-10 md:px-5 max-w-7xl">
        <button onClick={() => navigate("/")}>
          <Img src="images/img_logo.svg" alt="logo_one" className="h-[30px]" />
        </button>
        <ul className="flex flex-row md:flex-col justify-start items-center w-[58%] md:w-full gap-6 md:gap-5">
          {
            navItems.map((item) => item.active ? (
              <li key={item.name} className="flex flex-row justify-start items-center">
                <Text as="button" className="!text-gray-900 !font-medium" onClick={() => navigate(item.slug)}>
                  {item.name}
                </Text>
                {item.img && (<Img {...item.img} />)}
              </li>
            ) : null)
          }
        </ul>
        <ul className="flex flex-row justify-between w-[21%] md:w-full">
          {
            navAuthItems.map((item) => item.active ? (
              <li key={item.name} className="flex flex-row justify-start items-center pl-[3px] gap-2.5 ml-auto" onClick={() => item.action()}>
                <Text as="button" className="!text-gray-900 text-right !font-medium" >
                  {item.name}
                </Text>
                <Img {...item.img} />
              </li>
            ) : null)
          }
        </ul>
      </div>
      <LogIn
        isOpen={login}
        isSignupOpen={() => {
          setLogin(false)
          setSignup(true)
        }}
        onRequestClose={() => setLogin(false)}
      />
      <SignUp
        isOpen={signup}
        isLoginOpen={() => {
          setSignup(false)
          setLogin(true)
        }}
        onRequestClose={() => setSignup(false)}
      />
    </header>
  );
}
