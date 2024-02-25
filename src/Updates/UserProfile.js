import React, { useRef, useState } from "react";
import { useNavigate } from "react-router"; 
import "./user.css";
function UserProfile() {
  const name = useRef();
  const url = useRef();
  const Navigate = useNavigate()
  if (name.current?.value && url.current?.value) {
    console.log("no value c ");
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
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (name.current?.value !== undefined) {
          name.current.value = data.users[0]?.displayName;
          url.current.value = data.users[0]?.photoUrl;
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

  return (
    <>
      <div className="nav">
        <h5>winners never Quite , Quitters never Win</h5>
        <h5>your profile is 64% completed </h5>
      </div>
      <div>
        <form onSubmit={updateFunction}>
          <div className="hedding">
            <h2>contact Details</h2>
            <button onClick={()=>Navigate('/expense')}>cancel</button>
          </div>
          <label>Full name</label>
          <input ref={name} required />
          <label>Profile photo URL</label>
          <input ref={url} required />
          <button>Update</button>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
