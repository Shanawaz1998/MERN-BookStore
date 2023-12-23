import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { enqueueSnackbar } from "notistack";

export default function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleOnSubmit = () => {
    let newBook = {
      title: title,
      author: author,
      publishYear: publishYear,
    };
    setLoading(true);
    axios
      .post("http://localhost:4000/addBooks", newBook)
      .then(() => {
        setLoading(false);
        navigate("/");
        enqueueSnackbar("Book Created Successfully", {
          autoHideDuration: 1000,
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <BackButton />
      <form className="m-12">
        {loading ? <Spinner /> : ""}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Enter Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishYear">Publish Year</label>
          <input
            type="text"
            className="form-control"
            id="publishYear"
            placeholder="Enter Publish Year"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={handleOnSubmit}
          className="btn btn-primary mt-8"
        >
          Submit
        </button>
      </form>
    </>
  );
}
