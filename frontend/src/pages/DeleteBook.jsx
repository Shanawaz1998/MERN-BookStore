import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { enqueueSnackbar } from "notistack";

export default function DeleteBook() {
  const naviagate = useNavigate();
  const id = useParams().id;

  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:4000/deleteBookById/${id}`)
      .then((response) => {
        setLoading(false);
        naviagate("/");
        enqueueSnackbar("Deleted Successfully", {
          autoHideDuration: 1000,
          variant: "error",
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <center className="mt-10">
      {loading ? <Spinner /> : ""}
      <center className="card w-25">
        <div className="card-body">
          <h5 className="card-title">
            <strong>Delete</strong>
          </h5>
          <p className="card-text">Do you want to delete it ?</p>
          <button onClick={handleDelete} className="btn btn-danger mt-2">
            Delete
          </button>
        </div>
      </center>
    </center>
  );
}
