import React, { useEffect, useState } from "react";
import { Button, Img, Text } from "./..";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LogIn from "modals/LogIn";
import SignUp from "modals/SignUp";
import Menu from "modals/Menu"
import axios from "axios";

export default function Header({ updateCart, ...props }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status)
  const authData = useSelector((state) => state.auth.userData)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)
  const [menu, setMenu] = useState(false)
  const [cartItems, setCartItems] = useState(0)

  const getCart = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_APILINK}/cart`,
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
      console.log(error.response)
    }
  }

  const toogleMenu = () => {
    const menuItens = document.querySelector('#menu')
    if (menuItens.className.includes("hidden"))
      menuItens.className = menuItens.className.replace("hidden", "flex")
    else if (menuItens.className.includes("flex"))
      menuItens.className = menuItens.className.replace("flex", "hidden")
  }

  useEffect(() => {
    getCart()
  }, [authData, updateCart])


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true
    },
    {
      name: "Pricing",
      slug: "/pricing",
      active: true
    },
    {
      name: "Shop",
      slug: "/shop",
      active: true
    },
    {
      name: "Courses",
      slug: "/courses",
      img: {
        src: "/images/img_arrow_down.svg",
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
    },
    {
      name: "Join Us",
      slug: "/joinAsTeacher",
      active: true
    }
  ]

  const navAuthItems = [
    {
      name: `Cart (${cartItems})`,
      slug: "/cart",
      img: {
        src: "/images/img_shopping_bag_24.svg",
        alt: "shoppingbagtwen",
        className: "h-[30px] w-[30px]"
      },
      action: (item) => { navigate(item.slug) },
      active: authStatus
    },
    {
      name: authData?.name || "My Account",
      slug: "#",
      img: {
        src: authData?.img || "/images/img_profile_24_outline.svg",
        alt: "profiletwentyfo",
        className: "h-[30px] w-[30px] rounded-full"
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
        src: "/images/img_profile_24_outline.svg",
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
      <div className="flex flex-row justify-start w-full mx-auto gap-8 max-w-7xl h-[46px] relative">
        <Button
          className="md:block hidden !p-2 !h-fit !w-fit rounded-[5px] bg-transparent -mr-6 hover:bg-gray-200"
          onClick={() => toogleMenu()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" fill="#0a033c">
          <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z"></path>
          </svg>
        </Button>
        <button onClick={() => navigate("/")} className="max-w-[180px] sm:max-w-[150px]">
          <Img src="/images/img_logo.svg" alt="logo_one" className="h-[30px] w-[175px]" />
        </button>
        <ul className="flex flex-row justify-start items-center gap-4 md:hidden md:absolute md:w-fit md:rounded-[5px] md:top-14 md:left-0 md:py-2 md:px-3 md:bg-gray-200" id="menu">
          {
            navItems.map((item, i) => item.active ? (
              <li
                id={item.name}
                key={i}
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
                <Text as="button" className="!text-gray-900 !font-medium hover:!font-semibold" onClick={() => {
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
        <ul className="flex flex-row justify-end w-fit gap-3 ml-auto">
          {
            navAuthItems.map((item) => item.active ? (
              <li key={item.name} className="flex flex-row justify-start items-center gap-2" onClick={() => item.action(item)}>
                <Text as="button" className="!text-gray-900 text-right !font-medium md:hidden" >
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
