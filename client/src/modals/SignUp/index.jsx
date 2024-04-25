import React from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider } from "../../components";
import SignUpInputfield from "../../components/SignUpInputfield";
import { default as ModalProvider } from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "store/authSlice";

export default function SignUp({ isOpen, isLoginOpen, close, ...props }) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password1, setPassword1] = React.useState("")
  const [password2, setPassword2] = React.useState("")
  const [passType1, setPassType1] = React.useState("password")
  const [passType2, setPassType2] = React.useState("password")
  const [error, setError] = React.useState(null)

  const submitHandler = (async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("http://localhost:3001/api/v1/auth/signup", { name, email, password1, password2 })
      setName("")
      setEmail("")
      setPassword1("")
      setPassword2("")
      setError(null)
      close()
    } catch (error) {
      setError(error.response.data.msg)
    }
  })

  return (
    <ModalProvider
      {...props}
      appElement={document.getElementById("root")}
      isOpen={isOpen}
      className="min-w-[1052px]"
    >
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-row justify-center w-full px-14 py-[71px] md:p-5 bg-white-A700 rounded-[15px]">
          <div className="flex flex-row justify-center w-[97%]">
            <div className="flex flex-row justify-center w-full p-2">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
                  <div className="flex flex-col items-center justify-start w-[40%] md:w-full gap-[25px]">
                    <Slider
                      autoPlay
                      autoPlayInterval={2000}
                      responsive={{ 0: { items: 1 }, 550: { items: 1 }, 1050: { items: 3 } }}
                      disableDotsControls
                      activeIndex={sliderState}
                      onSlideChanged={(e) => {
                        setSliderState(e?.item);
                      }}
                      ref={sliderRef}
                      className="w-full"
                      items={[...Array(9)].map(() => (
                        <React.Fragment key={Math.random()}>
                          <Heading size="2xl" as="h1" className="mx-2.5 !text-black-900_02 !font-metropolis">
                            <>
                              Welcome to
                              <br />
                              Educatsy Online
                              <br />
                              Learning Platform
                            </>
                          </Heading>
                        </React.Fragment>
                      ))}
                    />
                    <div className="flex justify-center w-[36px] h-[10px] sm:w-full" />
                  </div>
                  <div className="h-[641px] w-px md:w-full md:h-px bg-gradient" />
                  <div className="flex flex-col items-center justify-start w-[42%] md:w-full">
                    <Button
                      color="white_A700"
                      leftIcon={<Img src="images/img_googleplus_1_1.svg" alt="google-plus (1) 1" />}
                      className="w-full gap-[23px] sm:px-5 !text-gray-700_01 border-gray-300 border border-solid rounded-[10px]"
                    >
                      Sign in with google
                    </Button>
                    <div className="flex flex-row justify-center items-center w-full mt-5 gap-[11px] p-[3px]">
                      <div className="h-px w-[6%] ml-[54px] md:ml-5 bg-gray-700_01" />
                      <a href="#" className="mt-[3px]">
                        <Text as="p" className="!text-gray-700_01 text-center !font-medium">
                          Or sign in with your email
                        </Text>
                      </a>
                      <div className="h-px w-[6%] mr-[54px] md:mr-5 bg-gray-700_01" />
                    </div>
                    <form className="w-full" onSubmit={(e) => { submitHandler(e) }} method="post">
                      <div className="flex flex-col items-start justify-start w-full mt-5 pt-[5px] gap-[9px]">
                        <Text as="p" className="!text-gray-900 !font-medium">
                          Full name
                        </Text>
                        <Input
                          color="white_A700"
                          size="xs"
                          type="text"
                          name="fullName"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e)}
                          prefix={<Img src="images/img_account_24_outline.svg" alt="account / 24 / Outline" />}
                          className="w-full gap-[15px] rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
                        />
                      </div>
                      <SignUpInputfield
                        value={email}
                        onChange={(e) => setEmail(e)}
                        className="flex flex-col items-start justify-start w-full pt-[5px] gap-[9px]"
                      />
                      <div className="flex flex-col items-start justify-start w-full mt-5 pt-[5px] gap-[9px]">
                        <Text as="p" className="!text-gray-900 !font-medium">
                          Password
                        </Text>
                        <Input
                          color="white_A700"
                          size="xs"
                          type={passType1}
                          name="password1"
                          placeholder="*************"
                          value={password1}
                          onChange={(e) => setPassword1(e)}
                          prefix={
                            <Img
                              src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                              alt="lock,pad lock,safe,security,protected,lock alt, / 24 / Outline"
                            />
                          }
                          suffix={
                            <div className="flex justify-center items-center w-[15px] h-[11px]" onClick={() => passType1=="password" ? setPassType1("text") : setPassType1("password")}>
                              <Img src="images/img_vector.svg" alt="Vector" />
                            </div>
                          }
                          className="w-full sm:w-full gap-[15px] rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
                        />
                        <Input
                          color="white_A700"
                          size="xs"
                          type={passType2}
                          name="password2"
                          placeholder="*************"
                          value={password2}
                          onChange={(e) => setPassword2(e)}
                          prefix={
                            <Img
                              src="images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                              alt="lock,pad lock,safe,security,protected,lock alt, / 24 / Outline"
                            />
                          }
                          suffix={
                            <div className="flex justify-center items-center w-[15px] h-[11px]"onClick={() => passType2=="password" ? setPassType2("text") : setPassType2("password")}>
                              <Img src="images/img_vector.svg" alt="Vector" />
                            </div>
                          }
                          className="w-full sm:w-full gap-[15px] rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
                        />
                      </div>
                      <div className="flex justify-center mt-4">
                        {error && <Text as="p" className="!text-red-700 !font-medium">{error}</Text>}
                      </div>
                      <Button type="submit" className="w-full mt-[30px] sm:px-5 font-medium rounded-[10px]">Sign up</Button>
                    </form>
                    <CheckBox
                      shape="square"
                      name="checked24outlin"
                      label="I agreed to the Terms & Conditions"
                      id="checked24outlin"
                      className="mt-6 gap-2.5 text-gray-700_01 text-left font-medium"
                    />
                    <div className="flex flex-row justify-center w-full mt-[27px] p-[3px]">
                      <a href="#" className="ml-[65px] my-px md:ml-5">
                        <Text as="p" className="!text-gray-700_01">
                          Don’t have an account?
                        </Text>
                      </a>
                      <a href="#" className="ml-1 mr-[65px] md:mr-5">
                        <Text as="button" className="!text-red-300_01 !font-medium" onClick={isLoginOpen}>
                          Sign in
                        </Text>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
