import { useDispatch } from "react-redux"
import { changeName } from "../../../redux/slices/bankSlice";

function MyName() {

  const dispatch = useDispatch();

  function updateMyName (e) {
    dispatch(changeName(e.target.value))
  }

  return (
    <>
      <input type="text" placeholder="enter your name" onInput={updateMyName} />
    </>
  )
}

export default MyName