
import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home';
import Header from "./componants/Header/Header";
import PersonList from "./pages/PersonList";
import Loan from "./pages/Loan";
import NoPage from "./pages/NoPage";
import Expenses from "./pages/Expenses";
import Footer from "./componants/Footer/Footer";
import Dashboard from "./pages/Dashboard";
import AddBlog from "./pages/AddBlog";
import BlogDetails from "./pages/BlogDetails";
import SavingsEdit from "./pages/SavingsEdit";
import WelcomePage from "./pages/WelcomePage";
import LoanEdit from "./pages/LoanEdit";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./componants/ProtectedRoute";
import User from "./componants/User";
import ExpenseEdit from "./pages/ExpenseEdit";
import BlogEdit from "./pages/BlogEdit";
import MessageAll from "./componants/MessageAll";
import AddTestimonial from "./pages/AddTestimonial";
import Settings from "./pages/Settings";

import AddExpense from "./pages/AddExpense";
import DonationDonate from "./pages/DonationDonate";


function App() {
  

  return (
    <>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Home />} />
        <Route path="/personList" element={<ProtectedRoute><PersonList /></ProtectedRoute>} />
        <Route path="/loan" element={<ProtectedRoute><Loan /></ProtectedRoute>} />
        <Route path="/expense" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
        <Route path="/signin" element={<Signin />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} >
        <Route index element={<WelcomePage />} />
        <Route path="savingsEdit" element={<SavingsEdit />} />
        <Route path="loanEdit" element={<LoanEdit />} />
        <Route path="addBlog" element={<AddBlog />} />
        <Route path="users" element={<User />} />
        <Route path="expenseEdit" element={<ExpenseEdit />} />
        <Route path="blogEdit" element={<BlogEdit />} />
        <Route path="allMessages" element={<MessageAll />} />
        <Route path="addTestimonial" element={<AddTestimonial />} />
        <Route path="addExpense" element={<AddExpense />} />
        <Route path="donation" element={<DonationDonate />} />
        <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/blogs/:id" element={<ProtectedRoute><BlogDetails /></ProtectedRoute>} />
          {/* 
          <Route path="contact" element={<Contact />} />
           */}
           <Route path="*" element={<NoPage />} />
        
      </Routes>
      <Footer />
    </>
  )
}

export default App
