import React from "react";
import { MdOutlineInfo } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

export default function SingleBook({ book }) {
  return (
    <div className="justify-evenly">
      <div key={book._id} className="card " style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">
            <b>Book title</b> {book.title}
          </h5>
          {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
          <p className="card-text">Author : {book.author}</p>
          <a href="#" className="card-link">
            Published in the Year: {book.publishYear}
          </a>
          <div className="flex justify-evenly mt-2">
            <Link to={`/books/details/${book._id}`}>
              <MdOutlineInfo />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
              <FaEdit />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
              <MdDelete />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
