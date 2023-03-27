import React, { useContext } from "react";

import Logo from "../../olx-logo.png";
import { FirebaseContext } from "../../Store/Context";
import { useHistory } from "react-router-dom";
import "./Signup.css";
import { useForm } from "react-hook-form";

export default function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((result) => {
        result.user.updateProfile({ displayName: data.name }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: data.name,
              phone: data.phone,
            })
            .then(() => {
              history.push("/login");
            });
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const loginPage = () => {
    history.push("/login");
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            {...register("name", { required: true, maxLength: 10 })}
          />
          {errors.name && <p className="errorMsg">Please check the Name</p>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            {...register("email", { required: true, maxLength: 20 })}
          />
          {errors.email && <p className="errorMsg">Please check the Email</p>}

          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            {...register("phone", { required: true, maxLength: 10 })}
          />
          {errors.phone && (
            <p className="errorMsg">Please check the Phone Number</p>
          )}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && (
            <p className="errorMsg">Please check the Password</p>
          )}
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a onClick={loginPage}>Login</a>
      </div>
    </div>
  );
}
