import React,{useState,useRef}from "react";
import "./Expense.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Expense() {
  const [food,setFood] = useState(null)
  const [petrol,setPetrol] = useState(null)
  const [travel,setTravel] = useState(null)
  const [items,setItems] = useState([])
  const money = useRef()
  const discription = useRef()

  const Navigate = useNavigate();
  const submitHandler=()=>{
     
     let spends;
     if(food){
       spends = food
     }else if(petrol){
      spends= petrol
     }else if(travel){
      spends = travel
     }
    
     const Money = money.current.value
     const Discription = discription.current.value

     const obj = {
      spe:spends,
      mon:Money,
      dis:Discription,
     }
     setItems((old)=>{
      return [...old,obj]
     })
  }
  let expense = ( 
    <div className="items">
    {
      items.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.spe}</li>
            <li>{item.mon}</li>
            <li>{item.dis}</li>
          </ul>
        </div>
      ))
    }
  </div>
  )
  return (
    <>
      <div className="nav">
        welcome to Expense Tracker
        <div className="profile">
          your profile is incomplere<Link to="/user">Complete Now</Link>
        </div>
        <button
          onClick={() => {
            localStorage.clear("login");
            Navigate("/");
          }}
        >
          Loggout
        </button>
      </div>
      <div>
        <form>
          <label>Money</label>
          <input  ref={money}></input>
          <label>discription</label>
          <input ref={discription}></input>
          <div class="dropdown">
            <button class="dropbtn">Spent For</button>
            <div class="dropdown-content">
              <a onClick={()=>setFood('Food')}>food</a>
              <a onClick={()=>setPetrol('Petrol')}>petro</a>
              <a onClick={()=>setTravel('Travel')}>travel</a>
            </div>
          </div>
          <button onClick={()=>{submitHandler()}}>submit</button>
        </form>
      </div>
      <div>
        <div className="label_">
          <h3>Spend For</h3>
          <h3>Money</h3>
          <h3>Discription</h3>
        </div>
        {expense}
      </div>
    </>
  );
}

export default Expense;
