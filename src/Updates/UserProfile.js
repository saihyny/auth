import React,{useRef,useState} from "react";
import "./user.css";
function UserProfile() {
 const name = useRef()
 const url = useRef()
const updateFunction =(e)=>{
    e.preventDefault()
    const Name = name.current.value;
    const URl = url.current.value;

    fetch( 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAN1w9QjbLVYdwm9PeodDq_kWATHQr6-0Y',{
       method:"POST",
       body:JSON.stringify({
         idToken:localStorage.getItem('login'),
         displayName:Name,
         photoUrl:URl,
         returnsecureToken:true,
       }),
       headers: {
        "Content-Type": "application/json",
      }
    }).then((res)=>{
        if(res.ok){
            alert('update succesfull')
        }
    })
   

}



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
          <button>cancel</button>
        </div>
          <label>Full name</label>
          <input ref={name} required/>
          <label>Profile photo URL</label>
          <input ref={url} required />
          <button>Update</button>
        </form>
      </div>
    </>
  );
}

export default UserProfile;
