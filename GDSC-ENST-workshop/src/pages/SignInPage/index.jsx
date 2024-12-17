import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import './style.css';

export default function SignInPage () {

    const navigation = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            const docRef = doc(db, 'accounts', cred.user.uid);
            setDoc(docRef, {
                name, email, password, uid: cred.user.uid, todos: []
            })
            .then(() => {
                localStorage.setItem('user-uid', cred.user.uid);
                navigation('/');
            })
            .catch((err) => {
                console.log(err.message);
            })
        })
        .catch((err) => {
            console.log(err.message);
        })
    }
    return (
        <>
            <h1>Sign In to the TODO!</h1>
            <form className='signin-form'>
                <div className='form-field'>
                    <label htmlFor="fullName">Name</label>
                    <input required type="text" id="fullName" onChange={(e) => {setName(e.target.value)}} value={name} />
                </div>
                <div className='form-field'>
                    <label htmlFor="email">Email</label>
                    <input required type="text" id="email" onChange={(e) => {setEmail(e.target.value)}} value={email} />
                </div>
                <div className='form-field'>
                    <label htmlFor="password">Password</label>
                    <input required type="password" id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} /> 
                </div>
                <div className="form-field">
                    <button onClick={signIn}>Sign In</button>
                </div>
                <div>Don't have an account? <Link to='/login'>New Account!</Link></div>
            </form>
        </>
    )
}