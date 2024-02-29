import React, { useRef, useState } from "react";
import { useNavigate } from "react-router"; 
import "./user.css";


function UserProfile() {
  const [toggle,seToggle] = useState(false);
  const [code,setCode] = useState(false);
  const verifyEmail = useRef();
  const verifyCode  = useRef();
  const name = useRef();
  const url = useRef();
  const Navigate = useNavigate()
 
  if (name.current?.value && url.current?.value) {
    
  } else {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("login"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (name.current?.value !== undefined) {
          name.current.value = data?.users[0]?.displayName;
          url.current.value = data?.users[0]?.photoUrl;
        } else {
          console.log("undifined");
        }
      });
  }
  const updateFunction = (e) => {
    e.preventDefault();
    const Name = name.current.value;
    const URl = url.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("login"),
          displayName: Name,
          photoUrl: URl,
          returnsecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        alert("update succesfull");
      }
    });
  };
  const getCodeFuction = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y",
      {
        method: "POST",
        body: JSON.stringify({
          requestType:'VERIFY_EMAIL',
          idToken: localStorage.getItem("login"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
     
        if (!res.ok) {
          console.log(res)
          setCode(false)
          alert('please enter your correct email')
        }else{
          console.log(res)
          return res.json()
        }
      }).then((data)=>{
        if(data.email){
          if(data.email !== verifyEmail.current.value){
            verifyEmail.current.value = null;
            setCode(false)
            alert('please enter your old email id ')
          }
        }
      })
   
  }
  const VerifyCodeFunction = () =>{

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y",
      {
        method: "POST",
        body: JSON.stringify({
          oobCode:verifyCode.current.value
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
        if (!res.ok) {
          console.log(res)
          setCode(false)
          alert('please enter your correct code')
        } else {
          console.log(res)
          return res.json()
        }
      }).then((data)=>{
        console.log(data)
      })
  }

  return (
    <>
      <div className="nav">
        <h5>winners never Quite , Quitters never Win</h5>
        <h5>your profile is 64% completed </h5>
      </div>
      <div className="forms">
        <form onSubmit={updateFunction}>
          <div className="hedding">
            <h2>contact Details</h2>
            <button className="click" onClick={(e)=> { e.preventDefault()
             !toggle && seToggle(true)
             toggle && seToggle(false)
              }}>Verify Email Id</button>
            <button onClick={()=>Navigate('/expense')}>cancel</button>
          </div>
          <label>Full name</label>
          <input ref={name} required />
          <label>Profile photo URL</label>
          <input ref={url} required />
          <button>Update</button>
        </form>
        {toggle && (<form>
          <label>enter your email id </label>
          <input type="email" ref={verifyEmail} />
          <button onClick={(e)=> {
            e.preventDefault()
            getCodeFuction()
            setCode(true)}}>send me a code</button>
          {code && (
            <>
             <label>enter your code</label>
             <input type="code" ref={verifyCode}/>
             <button onClick={(e)=> {e.preventDefault()
              VerifyCodeFunction()}}>submit</button>
            </>
          )}
        </form>)}
      </div>
    </>
  );
}

export default UserProfile;
