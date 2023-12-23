import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function ShowBook() {
  const [books, setBooks] = useState({});
  const [loading, setLoading] = useState(false);
  const bookId = useParams().id;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/getBookByID/" + bookId)
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }, []);

  return (
    <center>
      <BackButton />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <strong>
            <h1 className="m-10"> Book Detail</h1>
          </strong>
          <div className="card" style={{ width: "22rem" }}>
            <div className="card-header">
              <strong>Title : {books[0]?.title}</strong>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Book Author : {books[0]?.author}
              </li>
              <li className="list-group-item">
                Book Publish Year{books[0]?.publishYear}
              </li>
              <li className="list-group-item">Book Id : {books[0]?._id}</li>
            </ul>
          </div>
        </>
      )}
    </center>
  );
}
