// server.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Dummy data for hotel rooms
const hotelRooms = [
  { id: 1, name: 'Single Room', price: 50 },
  { id: 2, name: 'Double Room', price: 80 },
  { id: 3, name: 'Suite', price: 150 }
];

// Route to get available rooms
app.get('/api/rooms', (req, res) => {
  res.json(hotelRooms);
});

// Route to book a room
app.post('/api/book', (req, res) => {
  const { roomId, name, email, startDate, endDate } = req.body;
  // Handle booking logic here (e.g., save booking details to database)
  res.json({ success: true, message: 'Room booked successfully!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// scripts.js
document.addEventListener('DOMContentLoaded', () => {
  const roomsContainer = document.getElementById('rooms');
  const bookingForm = document.getElementById('bookingForm');
  const messageDiv = document.getElementById('message');

  // Fetch available rooms
  fetch('/api/rooms')
    .then(response => response.json())
    .then(rooms => {
      rooms.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.textContent = `${room.name} - $${room.price}/night`;
        roomsContainer.appendChild(roomDiv);
      });
    });

  // Handle form submission
  bookingForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const bookingData = {
      roomId: 1, // Assuming the user always books the first room
      name: formData.get('name'),
      email: formData.get('email'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate')
    };

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });
      const data = await response.json();
      messageDiv.textContent = data.message;
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
