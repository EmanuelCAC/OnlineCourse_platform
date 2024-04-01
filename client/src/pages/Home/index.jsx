import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Header, Text, Heading, Img, RatingBar, Button, Footer, BreadCrumbs } from "components";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const [books, setBooks] = useState(null)

  const navigate = useNavigate()

  const popularBooks = async () => {
    const data = await fetch('http://localhost:3001/api/v1/book?limit=3&sort=-rating')
    const result = await data.json()
    setBooks(result.books)
  }

  useEffect(() => {
    popularBooks()
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
          <div className="flex flex-col items-start justify-start w-full gap-[5px] p-5 md:px-5 bg-red-50 max-w-7xl rounded-[20px]">
            <BreadCrumbs routes={[
              {
                name: "Home",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[492px] md:gap-10 md:ml-0">
              <Heading size="3xl" as="h1" className="w-[30%] !font-semibold">
                <>
                  Educatsy Online
                  <br />
                  Welcome!
                </>
              </Heading>
              <Img
                src="images/img_image_210x374.png"
                alt="kisspngbookcas"
                className="w-[31%] md:w-full md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-full gap-[47px]">
          <div className="flex flex-col items-center justify-start w-full gap-[23px] md:px-5 max-w-7xl">
            <Heading size="xl" as="h2">
              Popular Books
            </Heading>
            <div className="flex flex-row w-full gap-[25px]">
              {books && books.map((book) => (
                <div
                  key={book._id}
                  onClick={() => navigate(`shop/${book._id}`)}
                  className="flex flex-col justify-start items-center w-full gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px] cursor-pointer">
                  <Img
                    src={book.image}
                    alt="popular_books"
                    className="w-[60%] md:h-auto sm:w-full ml-[3px] object-cover rounded-[5px]"
                  />
                  <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-2.5">
                    <RatingBar
                      value={book.rating}
                      isEditable={false}
                      size={16}
                      className="flex justify-between"
                    />
                    <Heading as="h3" className="!text-black-900_02">
                      <>
                        {book.name}, by
                        <br />
                        {book.author}
                      </>
                    </Heading>
                    <Heading as="h4" className="!text-red-300_01">
                      ${book.price}
                    </Heading>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer className="flex justify-center items-center w-full px-14 py-20 md:p-5 bg-gray-100" />
      </div>
    </>
  )
}