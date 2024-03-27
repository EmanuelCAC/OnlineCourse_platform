import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs, Input } from "components";
import { useParams } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams()
  const [book, setBook] = useState({})
  const [display, setDisplay] = useState(null)
  const [amount, setAmount] = useState(1)

  const getBook = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/book/${id}`)
    const result = await data.json()
    if (result) setBook(result)
    if (book) setDisplay(book.image)
  }

  useEffect(() => {
    getBook()

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
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-white-A700 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "/"
              },
              {
                name: "Shop",
                path: "/shop"
              },
              {
                name: book ? book.name : "",
                path: "#"
              },
            ]} />
            <div className="flex flex-row w-full mt-3">
              <div className="w-[50%] flex flex-row gap-5 mr-3">
                <div className="flex flex-col" onClick={() => (setDisplay(book.image))}>
                  <Img src={book.image} className={'w-16 hover:border-black-900_02 hover:border-2 mb-1 mx-3'} />
                </div>
                <div>
                  <Img src={display || book.image} />
                </div>
              </div>
              <div className="flex flex-col m-5 w-[50%]">
                <Heading children={book.name} size="xl" />
                <div className="flex flex-rol w-full justify-between">
                  <Text>
                    By {book.author}
                  </Text>
                  <div className="flex flex-rol gap-2">
                    <RatingBar />
                    <Text>(4,6)</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Category' size="s" />
                  <div className="flex flex-row gap-3 mt-1">
                    <Text as="span" className="border-2 py-1 px-2 rounded-full bg-gray-100 text-black-900_02">{book.category}</Text>
                  </div>
                </div>
                <div className="mt-8">
                  <Heading children='Description' size="s" />
                  <Text as="p" className="text-black-900_02 my-1 mx-3">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta praesentium vero suscipit veniam ipsum facere facilis qui deleniti repudiandae totam veritatis doloremque repellat ipsam eaque mollitia, consequatur quam dolorum necessitatibus!
                  </Text>
                </div>
                <div className="flex flew-row mt-auto">
                  <Text as="p" className="text-black-900_02 my-auto mx-3 h-8" size="lg">
                    Amount:
                  </Text>
                  <div className="flex border-2 border-gray-200 h-[32px] my-auto">
                    <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => { if (amount > 1) setAmount(amount - 1) }}>
                      <Text size="lg" className="text-black-900_02" >-</Text>
                    </Button>
                    <Input
                      className="h-[30px] text-black-900_02 !px-5"
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        if (e && e > 1)
                          setAmount(e)
                        else
                          setAmount(1)
                      }}
                      inputClass="text-center w-8 font-semibold"
                    />
                    <Button className="h-[30px] px-0 bg-gray-200 aspect-square" onClick={() => setAmount(amount + 1)}>
                      <Text size="lg" className="text-black-900_02" >+</Text>
                    </Button>
                  </div>
                  <Button className="ml-auto">
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-10 px-3 w-full">
              <Heading size="lg" className="py-8 font-normal">Avaliações</Heading>
              <div className="flex flex-row h-[60px] gap-3">
                <Text as="span" className="text-5xl font-extrabold h-[36px] my-auto">4.6</Text>
                <div className="flex flex-col my-auto">
                  <RatingBar />
                  <Text size="md" className="pb-4">13 avaliações</Text>
                </div>
              </div>
              <div className="flex flex-col w-[70%] pl-3 pr-6 gap-2 my-5">
                <div className="flex flex-col w-full gap-2 my-5">
                  <div className="flex flex-row w-full gap-2">
                    <Img src="images/img_profile_24_outline.svg" className="h-[30px] w-[30px]" />
                    <Text className="!text-gray-600 !font-medium h-5 my-auto">Usuario 1</Text>
                    <Text className="!text-gray-500 !font-medium h-4 my-auto ml-auto" size="xs">22 dez. 2023</Text>
                  </div>
                  <RatingBar />
                  <Text className="!text-gray-800 !font-medium">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium delectus commodi hic at obcaecati rem, minus facere ab harum officiis aperiam doloremque in blanditiis magnam cupiditate? Nihil dolorem beatae quisquam!
                  </Text>
                  <div className="flex flex-row w-full pt-1">
                    <Button
                      className="rounded-full border-2 border-[#6B7280] gap-1 font-medium"
                      color="white_A700"
                      size="xs"
                      rightIcon={<img width="24" height="24" src="https://img.icons8.com/material-outlined/24/6B7280/facebook-like--v1.png" alt="facebook-like--v1" />}
                      children={<Text className="text-inherit !font-medium !text-[#6B7280] pt-[2px]">Útil</Text>}
                    />
                    <Button
                      shape="circle"
                      color="white_A700"
                      size="xs"
                      className="ml-auto"
                      children={<img width="24" height="24" src="https://img.icons8.com/material-rounded/24/737373/menu-2.png" alt="menu-2" />}
                    />
                  </div>
                </div>
                <hr />
              </div>


            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}