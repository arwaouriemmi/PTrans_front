import styles from "./SignUp.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

export default function SignUp() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const formRef = React.useRef(null);
  const [errorMessages, setErrorMessages] = React.useState("");
  let navigate = useNavigate();
  localStorage.clear();
  useEffect(() => {
    if (selectedImage) {
      const url = "/images/" + selectedImage.name;
      setImageURL(url);
    }
  }, [selectedImage]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get("email");
    const mdp = formData.get("mdp");
    const name = formData.get("name");
    const firstname = formData.get("firstname");
    const adresse = formData.get("adresse");
    const numTel = formData.get("numTel");
    const imgURL = imageURL;
    console.log(email, mdp, name, firstname, adresse, imgURL);
    try {
      axios
        .post("http://localhost:3030/user/register", {
          email,
          mdp,
          name,
          firstname,
          adresse,
          imgURL,
          numTel,
        })
        .then((response) => navigate("/"));
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setErrorMessages("Email already exists");
        navigate("/signup");
      } else {
        setErrorMessages("One or more information are missing");
        navigate("/signup");
      }
    }
  };
  return (
    <div className="container">
      <div
        className={`${styles.d_flex} justify-content-center align-items-center ${styles.profile}`}
      >
        <h1 style={{ textAlign: "center", fontStyle: "italic", color: "lightBlue" }}>
          s'inscrire
        </h1>
        <div className={styles.upload}>
          <img src={imageURL} className={styles.profile_image}></img>
          <div className={styles.round}>
            <input
              accept="image/*"
              type="file"
              id="select-image"
              style={{ display: "none" }}
              onChange={(e) => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image">
              <i className={`fa fa-camera`}></i>
            </label>
          </div>
        </div>
        <div className={styles.profile_info}>
          <form
            className={styles.modifier_form}
            onSubmit={handleSubmit}
            action="/commercant/register"
            method="POST"
            ref={formRef}
          >
            <div className="mb-1">
              <label htmlFor="disabledTextInput" className={`form-label ${styles.title}`}>
                Prenom
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                name="firstname"
                required
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="disabledTextInput" className={`form-label ${styles.title}`}>
                Nom
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                name="name"
                required
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="disabledTextInput" className={`form-label ${styles.title}`}>
                Adresse
              </label>
              <input
                type="text"
                id="disabledTextInput"
                className="form-control"
                name="adresse"
                required
              ></input>
            </div>
            <div className="mb-1">
              <label htmlFor="disabledTextInput" className={`form-label ${styles.title}`}>
                Numero du telephone
              </label>
              <input
                type="tel"
                id="disabledTextInput"
                className="form-control"
                name="numTel"
                required
              ></input>
            </div>
            <div className="mb-1">
              <label
                htmlFor="exampleInputEmail1"
                className={`form-label ${styles.title}`}
              >
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                required
              ></input>
              <div id="emailHelp" className="form-text">
                Nous ne partagerons jamais votre e-mail avec quelqu'un d'autre.
              </div>
            </div>
            <div className="mb-1">
              <label
                htmlFor="exampleInputPassword1"
                className={`form-label ${styles.title}`}
              >
                Mot de passe
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="mdp"
                required
              ></input>
            </div>
            <br />
            {errorMessages && (
              <p style={{ color: "red", fontStyle: "italic", textAlign: "center" }}>
                {errorMessages}
              </p>
            )}
            <button type="submit" className="btn btn-primary form-control mt-3">
              continuer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
