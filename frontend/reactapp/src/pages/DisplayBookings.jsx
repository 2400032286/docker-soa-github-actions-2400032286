import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookingService from './BookingService.js'

function DisplayBookings() {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  async function loadBookings() {
    setLoading(true)
    setError('')
    try {
      const response = await BookingService.getAll()
      setBookings(Array.isArray(response.data) ? response.data : [])
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to load bookings. Check that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadBookings() }, [])

  async function deleteBooking(id) {
    if (!window.confirm(`Delete booking ${id}?`)) return
    setError('')
    setMessage('')
    try {
      await BookingService.delete(id)
      setMessage('Booking deleted successfully.')
      setBookings((current) => current.filter((booking) => booking.id !== id))
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to delete booking.')
    }
  }

  return (
    <section className="list-page">
      <div className="list-heading">
        <div><p className="eyebrow">Manage records</p><h1>Bookings</h1></div>
        <Link className="button button-primary btn btn-success" to="/add">Add Booking</Link>
      </div>
      {message && <p className="success-message alert alert-success">{message}</p>}
      {error && <p className="error-message alert alert-danger">{error}</p>}
      {loading ? <p>Loading bookings...</p> : bookings.length === 0 ? <p>No bookings found.</p> : (
        <div className="table-wrap">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead><tr><th>ID</th><th>Customer Name</th><th>Booking Date</th><th>Service Fee</th><th>Completed</th><th>Actions</th></tr></thead>
            <tbody>{bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td><td>{booking.customerName}</td><td>{booking.bookingDate}</td>
                <td>{Number(booking.serviceFee).toFixed(2)}</td><td>{booking.completed ? 'Yes' : 'No'}</td>
                <td className="actions">
                  <Link className="button button-secondary btn btn-outline-success" to={`/update/${booking.id}`}>Edit</Link>
                  <button className="button button-danger btn btn-danger" onClick={() => deleteBooking(booking.id)}>Delete</button>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
      <button className="button button-secondary refresh-button" onClick={loadBookings}>Refresh</button>
    </section>
  )
}

export default DisplayBookings
