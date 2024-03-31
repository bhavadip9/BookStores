// import { useState } from "react";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
// //import cors from "cors";

// const CreateBooks = () => {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [publishYear, setPublishYear] = useState("");
//   const [pdfFile, setPdf] = useState("");
//   const [loading, setLoding] = useState("");
//   const navigate = useNavigate();
//   const { enqueueSnackbar } = useSnackbar();
//   const handelSaveBook = async () => {
//     // const data = {
//     //   title,
//     //   author,
//     //   publishYear,
//     //   filename,
//     // };

//     //console.log(data);
//     setLoding(true);
//     await axios
//       .post("http://localhost:8000/books", formData)
//       .then(async () => {
//         setLoding(false);
//         enqueueSnackbar("Book Create Successfully", { variant: "success" });
//         navigate("/");
//         // await data.save();
//       })
//       .catch((Error) => {
//         console.log(Error);
//         setLoding(false);
//         enqueueSnackbar("Error ", { variant: "error" })
//         // alert("An error happened ,please Check console");
//       });
//   };

//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Creat Book</h1>
//       {loading ? <Spinner /> : " "}
//       <div className="flex flex-col border-sky-300 rounded-xl w-[600px] p-4 mx-auto border-2">
//         <div className="my-4">
//           <label className="text-xl mr-4 text-gray-500"> Title</label>
//           <input
//             type="text"
//             name=""
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//           />
//         </div>
//         <div className="my-4">
//           <label className="text-xl mr-4 text-gray-500"> Author</label>
//           <input
//             type="text"
//             name=""
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//           />
//         </div>
//         <div className="my-4">
//           <label className="text-xl mr-4 text-gray-500"> Publish Year</label>
//           <input
//             type="text"
//             name=""
//             value={publishYear}
//             onChange={(e) => setPublishYear(e.target.value)}
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//           />
//         </div>
//         <div className="my-4">
//           <label className="text-xl mr-4 text-gray-500"> PDF</label>
//           <input
//             type="file"
//             name="pdfFile"
//             accept="application/pdf"
//             //value={fileName}
//             onChange={(e) => setPdf(e.target.files[0])}
//             className="border-2 border-gray-500 px-4 py-2 w-full"
//           />
//         </div>
//         <button className="p-2 bg-sky-300 m-8" onClick={handelSaveBook}>
//           Save
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateBooks;


import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("publishYear", publishYear);
      formData.append("pdfFile", pdfFile);
      console.log(title, author, publishYear, pdfFile);

      const result = await axios.post("http://localhost:8000/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("result", result);
      enqueueSnackbar("Book Created Successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      //console.error("Error saving book:", error);
      enqueueSnackbar("Error creating book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Create Book</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-sky-300 rounded-xl w-[600px] p-4 mx-auto border-2">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500"> PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;
