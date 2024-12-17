import { useState } from "react"
import { useDispatch } from "react-redux";
import { updatePrice } from "../../../redux/slices/bankSlice";

function MyPrice() {
    const dispatch = useDispatch();

    function addMoney () {
        dispatch(updatePrice(income));
    }
    const [income, useIncome] = useState(0);
  return (
    <>
      <div>here is your bank</div>
      <input type="number" placeholder="enter the amount of money you want to add" value={income} onInput={(e) => useIncome(+e.target.value)} />
      <button onClick={addMoney}>Add money</button>
    </>
  )
}

export default MyPrice