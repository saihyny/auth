
import './App.css';
import Expense from './ExpenseTracker/Expense';
import LoginPage from './LoginPage';
import UserProfile from './Updates/UserProfile';
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<LoginPage/>} />
    <Route path="/user" element={<UserProfile/>}/>
    <Route path="/expense" element={<Expense />} />
  </Routes>
</BrowserRouter>
}

export default App;
