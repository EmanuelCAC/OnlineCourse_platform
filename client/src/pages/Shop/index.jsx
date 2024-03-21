import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Button, Img, Text, SelectBox, Input, Heading, RatingBar, BreadCrumbs } from "../../components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const dropDownOptions = [
  { label: "Latest", value: "-createdAt" },
  { label: "Earliest", value: "createdAt" },
  { label: "A - Z", value: "name" },
  { label: "Z - A", value: "-name" },
  { label: "$ - $$$", value: "price" },
  { label: "$$$ - $", value: "-price" },
];

export default function EduviShopPage() {
  const [popularBooks, setPopularBooks] = useState(null)
  const [newArrivals, setNewArrivals] = useState(null)
  const [books, setBooks] = useState(null)
  const [searchBarValue, setSearchBarValue] = useState("");
  const [sortBy, setSortBy] = useState("-createdAt")
  const [active, setActive] = useState("All Books")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const getPopularBooks = async () => {
    const data = await fetch('http://localhost:3001/api/v1/book?limit=3&sort=-rating')
    const result = await data.json()
    setPopularBooks(result.books)
  }

  const getNewArrivals = async () => {
    const data = await fetch('http://localhost:3001/api/v1/book?limit=3&sort=-createdAt')
    const result = await data.json()
    setNewArrivals(result.books)
  }

  const getBooks = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/book?search=${searchBarValue}&sort=${sortBy}&limit=9&page=${page}`)
    const result = await data.json()
    setBooks(result.books)
  }

  const getTotalPages = async () => {
    const data = await fetch(`http://localhost:3001/api/v1/book?search=${searchBarValue}&sort=${sortBy}`)
    const result = await data.json()
    setTotalPages(Math.ceil(result.books.length / 9))
    console.log(totalPages)
  }

  const pageHandler = (action) => {
    if (action === "next") {
      (page + 1) >= totalPages ? setPage(totalPages) : setPage(page + 1)
    } else if (action === "prev") {
      (page - 1) <= 1 ? setPage(1) : setPage(page - 1)
    }
  }

  useEffect(() => {
    getPopularBooks()
    getNewArrivals()
  }, [])

  useEffect(() => {
    getBooks()
    getTotalPages()
  }, [searchBarValue, sortBy, page])

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
                path: "/"
              },
              {
                name: "Shop",
                path: "#"
              }
            ]} />
            <div className="flex flex-row md:flex-col justify-between items-center w-[99%] md:w-full ml-2.5 gap-[492px] md:gap-10 md:ml-0">
              <Heading size="3xl" as="h1" className="w-[30%] !font-semibold">
                <>
                  Educatsy Online
                  <br />
                  Book Shop
                </>
              </Heading>
              <Img
                src="images/img_kisspng_bookcas.png"
                alt="kisspngbookcas"
                className="w-[31%] md:w-full md:h-[210px] object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-start items-start w-full pl-20 pr-14 gap-10 md:gap-5 md:px-5">
          <div className="flex flex-col w-[31%] md:w-full gap-[39px]">
            <div className="flex flex-col items-start justify-start w-full pt-0.5 gap-3.5">
              <Heading size="xl" as="h2" className="!text-black-900_02">
                Popular Books
              </Heading>
              <div className="flex flex-col w-full gap-[15px]">
                {popularBooks && popularBooks.map((book) => (
                  <div
                    key={book._id}
                    className="flex flex-row justify-start items-center w-full gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px]">
                    <Img
                      src={book.image}
                      alt="popular_books"
                      className="w-[21%] md:h-auto sm:w-full ml-[3px] object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-2.5">
                      <RatingBar
                        starCount={book.rating}
                        isEditable={true}
                        color="#ffc107"
                        activeColor="#ffc107"
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
              <Text size="lg" as="p" className="!text-red-300_01">
                See More
              </Text>
            </div>
            <div className="flex flex-col items-start justify-start w-full gap-4">
              <Heading size="xl" as="h3" className="!text-black-900_02">
                New Arrivals
              </Heading>
              <div className="flex flex-col w-full gap-[15px]">
                {newArrivals && newArrivals.map((book) => (
                  <div
                    key={book._id}
                    className="flex flex-row justify-start items-center w-full gap-[15px] p-[21px] sm:p-5 bg-white-A700 rounded-[10px]">
                    <Img
                      src={book.image}
                      alt="popular_books"
                      className="w-[21%] md:h-auto sm:w-full ml-[3px] object-cover rounded-[5px]"
                    />
                    <div className="flex flex-col items-start justify-start w-[73%] mr-[3px] gap-2.5">
                      <RatingBar
                        starCount={book.rating}
                        isEditable={true}
                        color="#ffc107"
                        activeColor="#ffc107"
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
              <Text size="lg" as="p" className="!text-red-300_01">
                See More
              </Text>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-[65%] md:w-full gap-10">
            <div className="flex flex-col items-center justify-start w-full gap-[30px]">
              <div className="flex flex-row md:flex-col justify-start w-full gap-6 md:gap-5">
                <Button onClick={() => setActive("All Books")} color={active == "All Books" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[131px] rounded-[10px]">
                  All Books
                </Button>
                <Button onClick={() => setActive("Kindergarten")} color={active == "Kindergarten" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[212px] rounded-[10px]">
                  Kindergarten
                </Button>
                <Button onClick={() => setActive("High School")} color={active == "High School" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[212px] rounded-[10px]">
                  High School
                </Button>
                <Button onClick={() => setActive("College")} color={active == "College" ? "orange_200_01" : "white_A700"} className="sm:px-5 font-medium min-w-[212px] rounded-[10px]">
                  College
                </Button>
              </div>
              <div className="flex flex-row sm:flex-col justify-start w-full gap-[15px] sm:gap-5">
                <Input
                  color="white_A700"
                  size="md"
                  name="search"
                  placeholder="Search Book Name"
                  value={searchBarValue}
                  onChange={(e) => setSearchBarValue(e)}
                  suffix={
                    searchBarValue?.length > 0 ? (
                      <CloseSVG onClick={() => setSearchBarValue("")} height={24} width={24} fillColor="#0000000" />
                    ) : (
                      <Img src="images/img_search.svg" alt="search" className="cursor-pointer opacity-0 fill-black-900_02" fill="#0000000" />
                    )
                  }
                  className="w-[84%] sm:w-full gap-[35px] !text-gray-700_99 rounded-tr-[10px] rounded-br-[10px] font-medium"
                />
                <SelectBox
                  shape="round"
                  indicator={<Img src="images/img_arrowdown_red_300_01.svg" alt="arrow_down" />}
                  name="sortby"
                  placeholder="Sort by: Latest"
                  options={dropDownOptions}
                  className="w-[16%] sm:w-full gap-px font-medium"
                  onChange={(value) => { setSortBy(value.value) }}
                />
              </div>
              <div className="justify-center w-full gap-[15px] grid-cols-3 md:grid-cols-2 md:gap-5 sm:grid-cols-1 grid">
                {books && books.map((book, i) => (
                  <div className="flex flex-col items-center justify-start w-full gap-2" key={i}>
                    <div className="flex flex-col items-center justify-start w-full md:h-auto p-5 bg-white-A700 rounded-[10px]">
                      <div className="flex flex-col items-center justify-start w-full md:px-5 max-w-[230px]">
                        <Img
                          src={book.image}
                          alt="image_one"
                          className="w-full md:h-auto sm:w-full object-cover rounded-[10px]"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-start w-full gap-[9px]">
                      <Heading as="h1">{book.name}</Heading>
                      <div className="flex flex-row justify-between items-center w-full">
                        <Heading as="h2" className="!text-red-300_01">
                          {book.price}
                        </Heading>
                        <RatingBar
                          value={book.rating}
                          isEditable={true}
                          color="#ffc107"
                          activeColor="#ffc107"
                          size={16}
                          className="flex justify-between"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-between items-center w-[35%] md:w-full">
              <Button color="white_A700" size="lg" shape="round" className="w-[15%] !rounded-md" onClick={() => pageHandler('prev')}>
                <Img src="images/img_arrow_left.svg" />
              </Button>
              <Text as="p" className="!text-gray-900 !font-medium">
                Page
              </Text>
              <Button color="white_A700" size="sm" className="!text-gray-700_01 font-medium min-w-[42px] rounded-lg cursor-default">
                {page}
              </Button>
              <Text as="p" className="!text-gray-900 !font-medium">
                of {books ? totalPages : 1}
              </Text>
              <Button size="lg" shape="round" className="w-[15%] !rounded-md" onClick={() => pageHandler('next')}>
                <Img src="images/img_arrow_right.svg" />
              </Button>
            </div>
          </div>
        </div>
        <Footer className="flex flex-col items-center justify-center w-full" />
      </div>
    </>
  );
}
