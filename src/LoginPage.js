import React, { useRef, useState } from "react";
import "./LoginPage.css";
function LoginPage() {
  const [isLogin, setLoggedin] = useState(false);
  const [isnew,setUser] = useState(false);
  const email_log = useRef();
  const password_log = useRef();

  const email_sig = useRef();
  const password_sig = useRef();
  const confirm_sig = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const Email = isLogin ? email_log.current.value : email_sig.current.value;
    const Password = isLogin ? password_log.current.value : password_sig.current.value;

    let URL;
    if (isLogin) {
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
          alert('successfully loggedin ')
          console.log('logged in successfully')
          return res.json();
         
        } else {
          return res.json().then((data) => {
            let errorMessage = "authentication faild";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        setLoggedin(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const login = (
    <>
      <label>Email</label>
      <input type="email" ref={email_log} required/>
      <label>Password</label>
      <input type="password" ref={password_log}
      required />
      <button>submit</button>
      <button className="link" onClick={
        ()=>{ setUser(false)
        setLoggedin(false)}}>New User ?</button>
    </>
  );
  const signUp = (
    <>
     
      <label>Email</label>
      <input type="email" ref={email_sig}     required/>
      <label>Password</label>
      <input type="name" ref={password_sig} required />
      <label>Confirm Password</label>
      <input type="password" required ref={confirm_sig} />
      <button >submit</button>
      <button className="link" onClick={()=>{setUser(true) 
        setLoggedin(false)}}>already have an account ?</button>
    </>
  );
  return (
    <div>
      <form onSubmit={submitHandler} >
        {isnew ? login : signUp}
      </form>
    </div>
  );
}

export default LoginPage;
