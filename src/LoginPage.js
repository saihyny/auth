import React, { useRef, useState, useEffect } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const Navigate = useNavigate();
  const [isnew, setUser] = useState(false);
  const [error, setError] = useState(null);
  const [forgetPass, setForgotpass] = useState(false);

  const email_log = useRef();
  const password_log = useRef();

  const email_sig = useRef();
  const password_sig = useRef();
  const confirm_sig = useRef();

  const forgotEmail = useRef()

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 10000);

      // Cleanup function to clear the timer when component unmounts or state changes
      return () => clearTimeout(timer);
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!isnew) {
      if (password_sig.current.value !== confirm_sig.current.value) {
        setError("please enter same password in both fields");
        return null;
      }
    }
    const Email = isnew ? email_log.current.value : email_sig.current.value;
    const Password = isnew
      ? password_log.current.value
      : password_sig.current.value;
    console.log(Email, Password, isnew);
    let URL;
    if (isnew) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y";
    } else {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y";
    }

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: Email,
        password: Password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data;
            setError(errorMessage.error.message);
            throw new Error(errorMessage.error.message);
          });
        }
      })
      .then((data) => {
        localStorage.setItem("login", data.idToken);
        // console.log(data.idToken)
        !isnew ? alert("successfully sigup ") : Navigate("/expense");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const forPassFunction = ()=>{
    const Email = forgotEmail.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y",
      {
        method: "POST",
        body: JSON.stringify({
          requestType:"PASSWORD_RESET",
          email:Email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
        if (!res.ok) {
          alert('please enter your Correct Email Id')

        } else {
          setError('You would recieve a password reset link in your mail id which you entered above.Open the link and change the password Now try logging into your website via the new password and it should work')
        }
      })
  }
  const login = (
    <>
      <h6>{error}</h6>
      <label>Email</label>
      <input type="email" ref={email_log} required />
      <label>Password</label>
      <input type="password" ref={password_log} required />
      <button>submit</button>
      <button
        className="link"
        onClick={() => {
          setUser(false);
        }}
      >
        New User ?
      </button>
      <button
        className="link"
        onClick={(e) => {
          e.preventDefault();
          setForgotpass(true);
        }}
      >
        Forgot Password
      </button>
    </>
  );
  const signUp = (
    <>
      <h6>{error}</h6>
      <label>Email</label>
      <input type="email" ref={email_sig} required />
      <label>Password</label>
      <input type="name" ref={password_sig} required />
      <label>Confirm Password</label>
      <input type="password" required ref={confirm_sig} />
      <button>submit</button>
      <button
        className="link"
        onClick={() => {
          setUser(true);
        }}
      >
        already have an account ?
      </button>
    </>
  );
  const forgetPassword = (
    <>
      <h6>{error}</h6>
      <label>Enter the email with which you have registered</label>
      <input type="email" ref={forgotEmail} required />
      <button onClick={(e)=>{
        e.preventDefault()
        forPassFunction()}}>Send Link</button>
      <button
        className="link"
        onClick={(e) => {
          setForgotpass(false)
          e.preventDefault();
        }}
      >
        Already have an account?
      </button>
    </>
  );
  return (
    <div>
      <form onSubmit={submitHandler}>
        {forgetPass ? forgetPassword : isnew ? login : signUp}
      </form>
    </div>
  );
};

export default LoginPage;
