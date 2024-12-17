import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ErrorPage from "./pages/ErrorPage";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, colRef, todoRef } from "./firebase/firebase";
import { getDocs, onSnapshot } from "firebase/firestore";


export default function App() {

  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    onAuthStateChanged(auth, () => {
      console.log(auth.currentUser);
    })

    
      let arr = [];
      const fetchit = async () => {
       await getDocs(todoRef)
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            arr.push({
              ...doc.data(),
              id: doc.id
            })
          })
        });
      setTodos(arr);
      }

      fetchit()
  }, [])


  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage todos={todos} setTodos={setTodos} />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </main>
  )
}