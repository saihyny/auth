import React, { useState, useRef, useEffect } from "react";
import "./Expense.css";
import {  useDispatch,useSelector } from "react-redux";
import { isLogout } from "../Store/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addItems } from "../Store/expenSlice";
function Expense() {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState('Food')
  const [fetchData,setFetchData] = useState([])
  const [edit,setEdit] = useState(false);
  const [items, setItems] = useState([]);
  const total = useSelector((state)=>state.expenses.total)
 
  
  const money = useRef();
  const discription = useRef();

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option
  };
  const reloadFunc = ()=>{
    axios.get('https://auth-cd5cd-default-rtdb.firebaseio.com/items.json')
    .then((res)=>{
       if(res.data){
        const valuesArray = Object.values(res.data)
        const keysArray = Object.keys(res.data)
        setFetchData(keysArray)
        dispatch(addItems(valuesArray))
        setItems(valuesArray)
       }
    })
 }
  useEffect(() => {
    reloadFunc()
  },[]);
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
         if(res.status===200){
          console.log('post success')
         }
      })
    
  };
 
  const deleteFunc=(index)=>{
   
    const id = fetchData[index]
    axios.delete(`https://auth-cd5cd-default-rtdb.firebaseio.com/items/${id}.json`)
    .then((res)=>{
      if(res.status===200){
        reloadFunc()
        const updated = fetchData.filter((item)=>{
          return item !== id
        })
        setFetchData(updated)
       
      } 
    })


  }
  const editFunc=(index)=>{
    
    const id = fetchData[index]
    const spends = selectedOption;
    const Money = money.current.value;
    const Discription = discription.current.value;

    const obj = {
      spe: spends,
      mon: Money,
      dis: Discription,
    };
    axios.put(`https://auth-cd5cd-default-rtdb.firebaseio.com/items/${id}.json`,obj)
    .then((res)=>{
      if(res.status===200){
        console.log('edited')
        setEdit(false)
        reloadFunc()
      } 
    })
  }
  
  let expense = (
    <div className="items">
      {items.map((item, index) => (
        <div key={index}>
          <ul>
            <li>{item.spe}</li>
            <li>{item.mon}</li>
            <li>{item.dis}</li>
            <div>
              <button onClick={(e)=>{
                e.preventDefault()
                setEdit(true)
                money.current.focus()
               }}>Edit</button>
              {edit && (
                <button onClick={(e)=>{
                  e.preventDefault()
                  editFunc(index) 
                }}>OK</button>
              )}
              {!edit && (<button onClick={(e)=>{
                e.preventDefault()
                deleteFunc(index)
                }}>Delete</button>)}
            </div>
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
        {total>=10000 && <button className="premium">premium</button>}
        <button
          onClick={(e) => {
            e.preventDefault()
            dispatch(isLogout())
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
          {edit && (
                <button onClick={(e)=>{
                  e.preventDefault()
                  setEdit(false)}}>Done Edit</button>
              )}
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
