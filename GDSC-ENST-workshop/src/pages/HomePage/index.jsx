import { signOut } from 'firebase/auth';
import { addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, todoRef } from '../../firebase/firebase';
import './style.css';

export default function HomePage ({ todos, setTodos }) {

    const navigator = useNavigate();

    const [title, setTitle] = useState("");

    useEffect(() => {
        if (!localStorage.getItem('user-uid')) {
            navigator('/login')
        }
    }, [])
    
    function newTodo() {
        const data = {title, finished: false, owner: localStorage.getItem('user-uid')}
        let newArr = todos.slice();
        newArr.unshift(data);
        addDoc(todoRef, data)
        .then(() => {
            setTodos(newArr);
            setTitle("");
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    function updateState({ id, finished }) {
        const docRef = doc(todoRef, id)
        let newArr = todos.map((todo) => {
            return (todo.id == id) ? ({...todo, finished: !finished}) : todo;
        })
        updateDoc(docRef, {
            finished: !finished
        })
        .then(() => {
            setTodos(newArr);
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    function deleteTodo({ id }) {
        let newArr = todos.filter((todo) => {
            return todo.id !== id;
        })
        const docRef = doc(todoRef, id);
        deleteDoc(docRef)
        .then(() => {
            setTodos(newArr);
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    function logout() {
        signOut(auth)
        .then(() => {
            console.log("logout successfully");
            localStorage.removeItem('user-uid');
            navigator('/login');
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    return (
        <>
            <h1>TO-DO List</h1>
            <div className='new-todo'>
                <div className='todo-form'>
                    <input required type="text" placeholder='Enter to Do...' value={title} onChange={(e) => {setTitle(e.target.value)}} />
                    <button className='add-btn' onClick={() => {newTodo()}}>Add</button>
                </div>
            </div>
            <div className='todos'>
                {todos.length > 0 && todos.map((todo, index) => (
                    <div className='todo' key={index}>
                        <h3 className={`${todo.finished ? 'checked' : ""}`}>{todo.title}</h3>
                        <div>
                            <i onClick={() => deleteTodo(todo)} className="uil uil-trash-alt"></i>
                            <i onClick={() => updateState(todo)} className="uil uil-check-circle"></i>
                        </div>
                    </div> 
                ))}
                {!todos.length && <p>No todos for the moment</p>}
            </div>
            <button onClick={logout} className='add-btn logout-btn'>Logout</button>
        </>
    )
}