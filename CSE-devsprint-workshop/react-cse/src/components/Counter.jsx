import { useEffect, useState } from "react";

export default function Counter() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        console.log('Counter is updated');
    }, [counter])


    const increment = () => {
        setCounter(counter + 1);
    }

    const decrement = () => {
        setCounter(counter - 1);
    }
    return (
        <>
            <h2>Counter is in: {counter}</h2>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
        </>
    )
}
