
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>AUTH TRACKER</h1>
          <p>Track Your Workouts</p>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
