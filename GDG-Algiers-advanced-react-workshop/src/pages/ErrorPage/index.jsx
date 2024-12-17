import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <h1>Error page you should go back to <Link to="/">Home</Link>.</h1>
  )
}

export default ErrorPage