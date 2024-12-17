import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import './style.css';

export default function LoginPage () {

    const navigator = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            localStorage.setItem('user-uid', cred.user.uid);
            navigator('/');
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <>
            <h1>Login to the TODO!</h1>
            <form className='login-form'>
                <div className='form-field'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" onChange={(e) => {setEmail(e.target.value)}} value={email} />
                </div>
                <div className='form-field'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e) => {setPassword(e.target.value)}} value={password} /> 
                </div>
                <div className="form-field">
                    <button onClick={login}>Login</button>
                </div>
                <div>Forget your password? <Link to='/forget-password'>Retrieve it!</Link></div>
            </form>
        </>
    )
}