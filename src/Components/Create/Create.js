import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import { FirebaseContext, Authcontext } from "../../Store/Context";
import { useForm } from "react-hook-form";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(Authcontext);
  const history = useHistory();
  const [image, setImage] = useState(null);
  const date = new Date();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection("products").add({
            name: data.name,
            category: data.category,
            price: data.Price,
            url,
            userId: user.uid,
            createdAt: date.toDateString(),
          });
          history.push("/");
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            {...register("name", { required: true,minLength:5})}
          />
          {errors.name && <p className="errorMsg">Please check the Name</p>}

          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="category"
            {...register("category", { required: true})}
          />
          {errors.category && (
            <p className="errorMsg">Please check the category</p>
          )}

          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            name="Price"
            {...register("Price", { required: true})}
          />
          {errors.Price && <p className="errorMsg">Please check the Price</p>}

          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? window.URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            name="image"
            // {...register("image", { required: true })}

            type="file"
            required
          />
          {errors.image && <p className="errorMsg">Please check the IMAGE</p>}

          <br />
          <button onClick={handleSubmit(onSubmit)} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
