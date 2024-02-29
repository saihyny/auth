import React, { useState, useRef, useEffect } from "react";
import "./Expense.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Expense() {
  const [selectedOption, setSelectedOption] = useState('Food')
  const [items, setItems] = useState([]);
  const money = useRef();
  const discription = useRef();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option
  };
  useEffect(() => {
    axios.get('https://auth-cd5cd-default-rtdb.firebaseio.com/items.json')
    .then((res)=>{
       if(res.data){
        const valuesArray = Object.values(res.data)
        setItems(valuesArray)
       }
    })
  },[]);
  console.log(items)
  const Navigate = useNavigate();
  const submitHandler = async (e) => {
     e.preventDefault()
    const spends = selectedOption;
    const Money = money.current.value;
    const Discription = discription.current.value;

    const obj = {
      spe: spends,
      mon: Money,
      dis: Discription,
    };
   
    setItems((old) => {
      return [...old, obj];
    });
     axios.post('https://auth-cd5cd-default-rtdb.firebaseio.com/items.json',obj)
      .then((res)=>{
        alert('added')
          console.log(res.data)
      })
    
  };
  let expense = (
    <div className="items">
      {items.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.spe}</li>
            <li>{item.mon}</li>
            <li>{item.dis}</li>
          </ul>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="nav">
        welcome to Expense Tracker
        <div className="profile">
          your profile is incomplere<Link to="/user">Complete Now</Link>
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            localStorage.clear("login");
            Navigate("/");
          }}
        >
          Loggout
        </button>
      </div>
      <div>
        <form onSubmit={submitHandler}>
          <label>Money</label>
          <input ref={money}></input>
          <label>discription</label>
          <input ref={discription}></input>
          <div>
      <label>Spent For</label>
      {/* Dropdown input */}
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="Food">Food</option>
        <option value="Petrol">Petrol</option>
        <option value="Travel">Travel</option>
      </select>
      {/* Display the selected option */}
      <p>Selected Option: {selectedOption}</p>
    </div>
          <button>submit</button>
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
