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
        </div>
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
                <Heading children='category' size="s" />
                <div className="flex flex-row gap-3 mt-1">
                  <Text as="span" className="border-2 py-1 px-2 rounded-full bg-gray-100 text-black-900_02">{book.category}</Text>
                </div>
              </div>
              <div className="mt-8">
                <Heading children='description' size="s" />
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
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}