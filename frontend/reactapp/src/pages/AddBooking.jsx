import { useState } from 'react'
import BookingService from './BookingService.js'

const initialData = { customerName: '', bookingDate: '', serviceFee: '', completed: false }

function AddBooking() {
  const [booking, setBooking] = useState(initialData)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setBooking({ ...booking, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setError('')
    if (!booking.customerName.trim() || !booking.bookingDate || Number(booking.serviceFee) <= 0) {
      setError('Enter a customer name, booking date, and a positive service fee.')
      return
    }
    setLoading(true)
    try {
      await BookingService.add({ ...booking, customerName: booking.customerName.trim(), serviceFee: Number(booking.serviceFee) })
      setMessage('Booking added successfully.')
      setBooking(initialData)
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to add booking. Check that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="form-page">
      <form className="auth-form card shadow-sm" onSubmit={handleSubmit}>
        <p className="eyebrow">New booking</p>
        <h1>Add Booking</h1>
        <p className="form-description">Enter the home cleaning booking details.</p>
        {message && <p className="success-message alert alert-success">{message}</p>}
        {error && <p className="error-message alert alert-danger">{error}</p>}
        <label>Customer Name
          <input className="form-control" name="customerName" value={booking.customerName} onChange={handleChange} required maxLength="100" />
        </label>
        <label>Booking Date
          <input className="form-control" name="bookingDate" type="date" value={booking.bookingDate} onChange={handleChange} required />
        </label>
        <label>Service Fee
          <input className="form-control" name="serviceFee" type="number" min="0.01" step="0.01" value={booking.serviceFee} onChange={handleChange} required />
        </label>
        <label className="checkbox-label">
          <input className="form-check-input" name="completed" type="checkbox" checked={booking.completed} onChange={handleChange} />
          Booking completed
        </label>
        <button className="button button-primary btn btn-success" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Add Booking'}</button>
      </form>
    </section>
  )
}

export default AddBooking
