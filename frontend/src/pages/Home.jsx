import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { IoAddOutline } from "react-icons/io5";
import Spinner from "../components/Spinner";
import SingleBook from "../components/SingleBook";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/getAllBooks")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <div className="mt-10 flex">
      <Link to={"/books/create"}>
        <button className="btn btn-primary">
          <IoAddOutline />
        </button>
      </Link>
      {loading ? <Spinner /> : books.map((book) => <SingleBook book={book} />)}
    </div>
  );
}
