import "./App.css";
import Expense from "./ExpenseTracker/Expense";
import LoginPage from "./LoginPage";
import UserProfile from "./Updates/UserProfile";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { theme } from "./Store/expenSlice";
function App() {
  const mode = useSelector((state)=>{
   return state.expenses.darkMode
  })
  console.log(mode)
  return (
    <div className={mode?'white':'dark'}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
