import React, { useEffect, useState } from "react";
import { Img, Text } from "./..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import Menu from "modals/Menu"
import axios from "axios";

export default function Header({ updateCart, ...props }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)
  const authData = useSelector((state) => state.auth.userData)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [menu, setMenu] = useState(false)
  const [cartItems, setCartItems] = useState(0)

  const getCart = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/api/v1/cart',
        {
          userId: authData.userId
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
      if (data) setCartItems(data.cart.length)
    } catch (error) {
      console.log(error.response.data.msg)
    }
  }

  useEffect(() => {
    getCart()
  }, [authData, updateCart])


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
      slug: "/courses",
      img: {
        src: "images/img_arrow_down.svg",
        alt: "arrowdown_one",
        className: "h-[24px] w-[24px]"
      },
      state: { category: "" },
      dropdown: ["Kindergarten", "High School", "College", "Technology", "Science", "Language", "Mathematics", "Social Studies"],
      active: true
    },
    {
      name: "Mentors",
      slug: "/mentor",
      active: true
    }
  ]

  const navAuthItems = [
    {
      name: `Cart (${cartItems})`,
      slug: "/cart",
      img: {
        src: "images/img_shopping_bag_24.svg",
        alt: "shoppingbagtwen",
        className: "h-[30px] w-[30px]"
      },
      action: (item) => { navigate(item.slug) },
      active: authStatus
    },
    {
      name: authData ? authData.name : "My Account",
      slug: "#",
      img: {
        src: "images/img_profile_24_outline.svg",
        alt: "profiletwentyfo",
        className: "h-[30px] w-[30px]"
      },
      action: () => {
        setMenu(true)
      },
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
              <li
                id={item.name}
                className="flex flex-row justify-start items-center relative"
                onMouseOver={() => {
                  const navitem = document.getElementById(item.name)
                  if (navitem && item.dropdown) {
                    const dropdown = navitem.querySelector("#dropdown")
                    dropdown.className = dropdown.className.replace("hidden", "flex ")
                  }
                }}
                onMouseOut={() => {
                  const navitem = document.getElementById(item.name)
                  if (navitem && item.dropdown) {
                    const dropdown = navitem.querySelector("#dropdown")
                    dropdown.className = dropdown.className.replace("flex ", "hidden")
                  }
                }}
              >
                <Text as="button" className="!text-gray-900 !font-medium" onClick={() => {
                  navigate(item.slug, { state: item.state })
                  if (item.state) history.pushState(item.state, "")
                }}>
                  {item.name}
                </Text>
                {item.img && (<Img {...item.img} />)}
                {item.dropdown && (
                  <div className="flex-col absolute border-2 border-gray-300 bg-gray-100 top-6 -left-1 rounded-xl z-50 hidden" id="dropdown">
                    {item.dropdown.map((dd_item, i) => (
                      <Text
                        key={i}
                        as="p"
                        className={`!text-gray-700 !font-medium whitespace-nowrap px-3 py-1 hover:bg-gray-200 bg-clip-border ${i == 0 && 'rounded-t-lg border-gray-300'} ${i == item.dropdown.length - 1 && 'rounded-b-lg'}`}
                        onClick={() => {
                          navigate(item.slug, { state: { category: dd_item } })
                          history.pushState({ category: dd_item }, "")
                        }}>
                        {dd_item}
                      </Text>
                    ))}
                  </div>
                )}

              </li>
            ) : null)
          }
        </ul>
        <ul className="flex flex-row justify-between w-[21%] md:w-full">
          {
            navAuthItems.map((item) => item.active ? (
              <li key={item.name} className="flex flex-row justify-start items-center pl-[3px] gap-2.5 ml-auto" onClick={() => item.action(item)}>
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
      <Menu
        isOpen={menu}
        close={() => setMenu(false)}
        onRequestClose={() => setMenu(false)}
      />
    </header>
  );
}
