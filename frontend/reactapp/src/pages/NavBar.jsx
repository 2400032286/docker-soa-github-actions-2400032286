import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import AddBooking from './AddBooking.jsx'
import DisplayBookings from './DisplayBookings.jsx'
import UpdateBooking from './UpdateBooking.jsx'

function NavBar() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <NavLink className="brand" to="/">Home Cleaning Booking</NavLink>
        <nav aria-label="Main navigation">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/add">Add Booking</NavLink>
          <NavLink to="/display">Bookings</NavLink>
        </nav>
      </header>
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddBooking />} />
          <Route path="/display" element={<DisplayBookings />} />
          <Route path="/update/:id" element={<UpdateBooking />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default NavBar
