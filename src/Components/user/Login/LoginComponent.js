import styles from "./LoginComponent.module.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React from 'react';

export function LoginComponent(props) {
  const formRef = React.useRef(null);
  const [errorMessages, setErrorMessages] = React.useState('');
  let navigate = useNavigate();
  localStorage.clear();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get('login');  
    const mdp = formData.get('password');
    try {
      const resp = await axios.post('http://localhost:3030/user/auth/login', {
        email,
        mdp,
        });
    localStorage.setItem('access_token', resp.data.access_token);
    localStorage.setItem('user_id', resp.data.user_id);
    navigate('/homepage');
    } catch (error) {
      localStorage.clear();
      setErrorMessages('Invalid email or password');   
      navigate('/');
    }
  } 
  return (
    <div className={`${styles.wrapper} ${styles.fadeInDown}`}>
      <div id={styles.formContent}>
        <form ref={formRef} onSubmit={handleSubmit} method='POST' action='/user/auth/login' >
          <input
            type="email"
            id="login"
            className={`${styles.fadeIn} ${styles.first} ${styles.forrm}`}
            name="login"
            placeholder="email"
            required
          />
          <input
            type="password"
            id="password"
            className={`${styles.fadeIn} ${styles.second} ${styles.forrm}`}
            name="password"
            placeholder="password"
            required
          />
          <input
            type="submit"
            className={`${styles.fadeIn} ${styles.third} ${styles.forrm1}`}
            value="Log In"
          />
        </form>
        {errorMessages && <p style={{color: 'red', fontStyle: 'italic'}}>{errorMessages}</p>}
        <div id={styles.formFooter}>
          <p>
            Not a member?{"  "}
            <a className={styles.underlineHover} href="/signup">
              Register
            </a>
          </p>

        </div>
      </div>
    </div>
  );
}

