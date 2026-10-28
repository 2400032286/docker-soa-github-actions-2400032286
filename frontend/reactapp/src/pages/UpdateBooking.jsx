import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import BookingService from './BookingService.js'

function UpdateBooking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [booking, setBooking] = useState({ customerName: '', bookingDate: '', serviceFee: '', completed: false })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    BookingService.getById(id)
      .then((response) => {
        if (!response.data) { setError('Booking not found.'); return }
        setBooking({
          customerName: response.data.customerName || '',
          bookingDate: response.data.bookingDate || '',
          serviceFee: response.data.serviceFee ?? '',
          completed: Boolean(response.data.completed),
        })
      })
      .catch((e) => setError(e.response?.data?.message || 'Unable to load booking.'))
      .finally(() => setLoading(false))
  }, [id])

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setBooking({ ...booking, [name]: type === 'checkbox' ? checked : value })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    if (!booking.customerName.trim() || !booking.bookingDate || Number(booking.serviceFee) <= 0) {
      setError('Enter a customer name, booking date, and a positive service fee.')
      return
    }
    try {
      await BookingService.update(id, { ...booking, customerName: booking.customerName.trim(), serviceFee: Number(booking.serviceFee) })
      setMessage('Booking updated successfully.')
      setTimeout(() => navigate('/display'), 700)
    } catch (e) {
      setError(e.response?.data?.message || 'Unable to update booking.')
    }
  }

  if (loading) return <section className="form-page"><p>Loading booking...</p></section>

  return (
    <section className="form-page">
      <form className="auth-form card shadow-sm" onSubmit={handleSubmit}>
        <p className="eyebrow">Booking ID: {id}</p><h1>Update Booking</h1>
        {message && <p className="success-message alert alert-success">{message}</p>}
        {error && <p className="error-message alert alert-danger">{error}</p>}
        <label>Customer Name<input className="form-control" name="customerName" value={booking.customerName} onChange={handleChange} required /></label>
        <label>Booking Date<input className="form-control" name="bookingDate" type="date" value={booking.bookingDate} onChange={handleChange} required /></label>
        <label>Service Fee<input className="form-control" name="serviceFee" type="number" min="0.01" step="0.01" value={booking.serviceFee} onChange={handleChange} required /></label>
        <label className="checkbox-label"><input className="form-check-input" name="completed" type="checkbox" checked={booking.completed} onChange={handleChange} />Booking completed</label>
        <button className="button button-primary btn btn-success" type="submit">Update Booking</button>
      </form>
    </section>
  )
}

export default UpdateBooking
