/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
//import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/Home/BooksTable";
import Bookscard from "../components/Home/Bookscard";
import { CgAdd } from "react-icons/cg";


const Home = () => {
  const [books, setBooks] = useState([]);
  const [loding, setLoding] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoding(true);
    axios
      .get("http://localhost:8000/books")
      .then((Response) => {
        setBooks(Response.data.data);
        setLoding(false);
      })
      .catch((Error) => {
        console.log(Error);
        setLoding(false);
      });
  }, []);

  return (
    <div className="px-10 py-10 bg-blue-200 h-screen">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-4xl my-8 text-black-1000 underline"> Books List</h1>
        <Link to="/books/create">
          {/* <MdOutlineAddBox className="text-sky-800 text-4xl" /> */}
          <CgAdd className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loding ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <Bookscard books={books} />
      )}
    </div>
  );
};

export default Home;
