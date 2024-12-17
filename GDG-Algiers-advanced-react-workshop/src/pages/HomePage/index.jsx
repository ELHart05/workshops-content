import { useSelector } from "react-redux"
import MyPrice from "../../components/Bank/MyPrice"
import MyName from "../../components/Bank/MyName"

function HomePage() {
  const name = useSelector(state => state.bank.name);
  const price = useSelector(state => state.bank.price);
  return (
    <>
      <h2>GDG BANK EXAMPLE | HOME</h2>
      <hr />
      <h2>the owner is: {name}</h2>
      <MyName />
      <hr />
      <h2>the amount of money he got is: {price} DZD</h2>
      <MyPrice />
    </>
  )
}

export default HomePage