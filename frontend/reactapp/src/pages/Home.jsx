import { Link } from 'react-router-dom'

function Home() {
  return (
    <section className="home-page">
      <p className="eyebrow">Home Cleaning Booking</p>
      <h1>Book a cleaner. Enjoy a cleaner home.</h1>
      <p className="intro">Create and manage your home cleaning bookings</p>
      <div className="home-actions">
        <Link className="button button-primary btn btn-success" to="/add">Add Booking</Link>
        <Link className="button button-secondary btn btn-outline-success" to="/display">View Bookings</Link>
      </div>
    </section>
  )
}

export default Home
