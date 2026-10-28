import axios from 'axios'

const API_URL = 'http://localhost:5001/homecleaningbooking'

const BookingService = {
  add: (booking) => axios.post(`${API_URL}/add`, booking),
  getAll: () => axios.get(`${API_URL}/displayall`),
  getById: (id) => axios.get(`${API_URL}/display/${id}`),
  update: (id, booking) => axios.put(`${API_URL}/update/${id}`, booking),
  delete: (id) => axios.delete(`${API_URL}/delete/${id}`),
}

export default BookingService
