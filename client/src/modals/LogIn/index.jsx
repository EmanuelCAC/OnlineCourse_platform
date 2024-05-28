import React from "react";
import { Text, CheckBox, Button, Input, Img, Heading, Slider } from "../../components";
import SignUpInputfield from "../../components/SignUpInputfield";
import { default as ModalProvider } from "react-modal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login as authLogin } from "store/authSlice";
import { useGoogleLogin } from '@react-oauth/google';

export default function LogIn({ isOpen, isSignupOpen, close, ...props }) {
  const [sliderState, setSliderState] = React.useState(0);
  const sliderRef = React.useRef(null);
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState(null)
  const dispatch = useDispatch()

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const {data} = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        });
        if (data.email_verified) {
          try {
            const { data: userData } = await axios.post("http://localhost:3001/api/v1/auth/login", { email: data.email, password: data.sub})
            if (userData) {
              dispatch(authLogin(userData.token))
              close()
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  const submitHandler = (async (e) => {
    e.preventDefault()

    try {
      const { data } = await axios.post("http://localhost:3001/api/v1/auth/login", { email, password })
      localStorage.setItem('token', data.token)
      setEmail("")
      setPassword("")
      setError(null)
      dispatch(authLogin(data.token))
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
      className="w-[80%]"
      style={{
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        },
      }}
    >
      <div className="flex flex-row justify-center min-h-[80vh] max-h-fit">
        <div className="flex flex-row justify-center w-full px-14 py-[71px] md:p-5 bg-white-A700 rounded-[15px] outline-none">
          <div className="flex flex-row justify-center w-[97%]">
            <div className="flex flex-row justify-center w-full p-2">
              <div className="flex flex-row justify-center w-full">
                <div className="flex flex-row md:flex-col justify-between items-center w-full md:gap-10">
                  <div className="flex flex-col items-center justify-start w-[40%] md:w-full gap-[25px]">
                    {<Slider
                      autoPlay
                      autoPlayInterval={2000}
                      responsive={{ 0: { items: 0 }, 550: { items: 0 }, 1050: { items: 0 } }}
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
                    />}
                    <div className="flex justify-center w-[36px] h-[10px] sm:w-full" />
                  </div>
                  <div className="h-full w-px md:w-full md:h-px bg-gradient" />
                  <div className="flex flex-col items-center justify-start w-[42%] md:w-full">
                    <Button
                      color="white_A700"
                      leftIcon={<Img src="/images/img_googleplus_1_1.svg" alt="google-plus (1) 1" />}
                      className="w-full gap-[23px] sm:px-5 !text-gray-700_01 border-gray-300 border border-solid rounded-[10px]"
                      onClick={() => loginWithGoogle()}
                    >
                      Sign in with google
                    </Button>
                    <div className="flex flex-row justify-center items-center w-full mt-5 gap-[11px] p-[3px]">
                      <div className="h-px w-[6%] ml-[55px] md:ml-5 bg-gray-700_01" />
                      <a href="#" className="mt-[3px]">
                        <Text as="p" className="!text-gray-700_01 text-center">
                          Or sign in with your email
                        </Text>
                      </a>
                      <div className="h-px w-[6%] mr-[55px] md:mr-5 bg-gray-700_01" />
                    </div>
                    <form className="w-full" onSubmit={(e) => { submitHandler(e) }} method="post">
                      <div className="flex flex-col items-center justify-start w-full mt-5 gap-5">
                        <SignUpInputfield
                          value={email}
                          onChange={(e) => setEmail(e)}
                          className="flex flex-col items-start justify-start w-full pt-[5px] gap-[9px]"
                        />
                        <div className="flex flex-col items-start justify-start w-full pt-[5px] gap-[9px]">
                          <Text as="p" className="!text-gray-900 !font-medium">
                            Password
                          </Text>
                          <Input
                            color="white_A700"
                            size="xs"
                            type="password"
                            name="password"
                            placeholder="*************"
                            value={password}
                            onChange={(e) => setPassword(e)}
                            prefix={
                              <Img
                                src="/images/img_lockpad_locksafesecurityprotectedlock_alt_24_outline.svg"
                                alt="lock,pad lock,safe,security,protected,lock alt, / 24 / Outline"
                              />
                            }
                            suffix={<Img src="/images/img_eye_1_1.svg" alt="eye (1) 1" />}
                            className="w-full sm:w-full gap-[15px] rounded-tr-[10px] rounded-br-[10px] border-gray-300 border border-solid"
                          />
                        </div>
                      </div>
                      <div className="flex justify-center mt-4">
                        {error && <Text as="p" className="!text-red-700 !font-medium">{error}</Text>}
                      </div>
                      <Button type="submit" className="w-full mt-[30px] sm:px-5 font-medium rounded-[10px]">Sign In</Button>
                    </form>
                    <div className="flex flex-row justify-between items-center w-full mt-6 py-[3px]">
                      <CheckBox
                        shape="square"
                        name="keepmesignedin"
                        label="Keep me signed in"
                        id="keepmesignedin"
                        className="gap-2.5 text-gray-700_01 text-left"
                      />
                      <a href="#">
                        <Text as="p" className="!text-gray-700_01">
                          Forgot Password?
                        </Text>
                      </a>
                    </div>
                    <div className="flex flex-row justify-start w-[66%] md:w-full mt-6 gap-1 py-[3px]">
                      <a href="#" className="my-px">
                        <Text as="p" className="!text-gray-700_01 !font-medium">
                          Don’t have an account?
                        </Text>
                      </a>
                      <a href="#">
                        <Text as="button" className="!text-red-300_01 !font-medium" onClick={isSignupOpen}>
                          Sign Up
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
