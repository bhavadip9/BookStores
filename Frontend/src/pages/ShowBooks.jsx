import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { BiShow } from "react-icons/bi";


const ShowBooks = () => {
  const [book, setBooks] = useState({});
  const [loading, setLoding] = useState(false);
  const [showPdf, setShowPdf] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoding(true);
    axios
      .get(`http://localhost:8000/books/${id}`)
      .then((Response) => {
        setBooks(Response.data);
        setLoding(false);
      })
      .catch((Error) => {
        console.log(Error);
        setLoding(false);
      });
  }, [id]);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Id :-</span>
            <span>{book._id}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Title :-</span>
            <span>{book.title}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500 ">Author :-</span>
            <span>{book.author}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Publish Year :-</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-xl mr-4 text-gray-500">PDF:-</span>
            <span>{book.pdf}</span>
            <BiShow className="text-3xl text-blue-800 hover:text-black cursor-pointer" onClick={() => setShowPdf(true)} />
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">Creat Time :-</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className="my-4">
            <span className="text-xl mr-4 text-gray-500">
              Last Update Time :-
            </span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBooks;
