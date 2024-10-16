import styles from "./Profile.module.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function () {
  const navigate = useNavigate();
  const [user_id, setId] = useState(localStorage.getItem("user_id"));
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const imgURL = imageURL;
  const [name, setName] = useState("");
  const [firstname, setFirstName] = useState("");
  const [ adresse, setAdresse ]= useState("");
  const [numTel, setNumTel] = useState(null);
  const [email, setEmail] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  }
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }
  const handleAdresseChange = (e) => {
    setAdresse(e.target.value);
  }
  const handleNumTelChange = (e) => {
    setNumTel(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios
      .put('http://localhost:3030/user/update/'+user_id, {
        name, firstname, numTel, adresse, email, imgURL
      })
      navigate('/homepage');
    } catch(error) {
      navigate("/profile");
    }
  }
  useEffect(() => {
    if (selectedImage) {
      const url ="/images/" + selectedImage.name;
      setImageURL(url);
    }
  }, [selectedImage]);
  useEffect(()=>{
    axios
    .get('http://localhost:3030/user/'+user_id, {
      headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}
    })
    .then((response) => {
      setFirstName(response.data.firstname);
      setName(response.data.name);
      setImageURL(response.data.imgURL);
      setAdresse(response.data.adresse);
      setNumTel(response.data.numTel);
      setEmail(response.data.email);
    })
    .catch((error) => {
      navigate('/');
    })
  }, []);
  return (
      <div className="container">
        <div className={`${styles.d_flex} justify-content-center align-items-center ${styles.profile}`}>
          <div className={styles.upload}>
          <img src={imageURL}  className={styles.profile_image} ></img>
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
            <form className={styles.modifier_form} onSubmit={handleSubmit} action={`/user/update/${user_id}`} method='PUT'>
              <div className="mb-1">
                <label for="name" className={`form-label ${styles.title}`}>
                  Prenom:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  defaultValue={firstname} 
                  onChange={handleFirstNameChange}
                ></input>
              </div>
              <div className="mb-1">
                <label for="name" className={`form-label ${styles.title}`}>
                  Nom:
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  defaultValue={name} 
                  onChange={handleNameChange}
                ></input>
              </div>
              <div className="mb-1">
                <label for="servicename" className={`form-label ${styles.title}`}>
                Adresse:
                </label>
                <input
                  type="text"
                  id="servicename"
                  className="form-control"
                  defaultValue={adresse} 
                  onChange={handleAdresseChange}
                ></input>
              </div>
              <div className="mb-1">
                <label for="tel" className={`form-label ${styles.title}`}>
                Numero du telephone:
                </label>
                <input
                  type="tel"
                  id="tel"
                  className="form-control"
                  defaultValue={numTel} 
                  onChange={handleNumTelChange}
                ></input>
              </div>
              <div className="mb-1">
                <label for="tel" className={`form-label ${styles.title}`}>
                Email:
                </label>
                <input
                  type="email"
                  id="tel"
                  className="form-control"
                  placeholder="exemple@gmail.com"
                  defaultValue={email}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <button className="btn btn-primary form-control mt-3">modifier</button>
            </form>
          </div>
        </div>
      </div>
  );
}
