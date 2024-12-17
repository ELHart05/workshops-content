import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div style={{display: 'flex', gap: '10px'}}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/ahshash">Error</Link>
        <Link to="/member/samada">Member</Link>
    </div>
  )
}

export default Navbar