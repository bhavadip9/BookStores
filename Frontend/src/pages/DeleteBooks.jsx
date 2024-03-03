import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoding] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handelDeleteBook = () => {
    setLoding(true);
    axios
      .delete(`http://localhost:8000/books/${id}`)
      .then(() => {
        setLoding(false);
        enqueueSnackbar("Book Delete Successfully", { variant: "success" });
        navigate("/");
        // await data.save();
      })
      .catch((Error) => {
        console.log(Error);
        setLoding(false);
        // alert("An error happened ,please Check console");
        enqueueSnackbar("Error ", { variant: "error" })
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : " "}
      <div className="flex flex-col items-center border-sky-400 rounded-xl w-[600px] p-4 mx-auto border-2">
        <h3 className="text-2xl">
          {" "}
          Are you sure You want to delete this book ?
        </h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={handelDeleteBook}
        >
          Yes,Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBooks;
