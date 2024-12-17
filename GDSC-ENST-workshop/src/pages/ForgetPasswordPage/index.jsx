import { sendPasswordResetEmail } from 'firebase/auth';
import { Link } from 'react-router-dom';
import './style.css';

export default function ForgetPasswordPage () {
    const sendPasword = () => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("done")
        })
        .catch((err) => {
            console.log(err.massage);
        })
    }
    return (
        <>
            <h1>Forget Password?, Get it back!</h1>
            <form className='forget-form'>
                <div className='form-field'>
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" cv />
                </div>
                <div className="form-field">
                    <button onClick={sendPasword}>Send Mail</button>
                </div>
                <div>Figure it? <Link to='/login'>Login!</Link></div>
            </form>
        </>
    )
}