const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// Connect to Mongo
mongoose.connect('mongodb://localhost/hotels', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err))

// Enable CORS
app.use(cors())

// Enable JSON Body Parsing
app.use(express.json())

// Hotel Model
const Hotel = mongoose.model('Hotel', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}))

// API Routes

// Get All Hotels
app.get('/hotels', async (req, res) => {
    const hotels = await Hotel.find()
    res.json(hotels)
})

// Create Hotel
app.post('/hotels', async (req, res) => {
    const hotel = new Hotel(req.body)
    await hotel.save()
    res.json(hotel)
})

// Get Hotel
app.get('/hotels/:id', async (req, res) => {
    const hotel = await Hotel.findById(req.params.id)
    res.json(hotel)
})

// Update Hotel
app.put('/hotels/:id', async (req, res) => {
    const { name, address, stars, price } = req.body
    const newHotel = await Hotel.findByIdAndUpdate(
        req.params.id,
        { name, address, stars, price },
        { new: true }
    )
    res.json(newHotel)
})

// Delete Hotel
app.delete('/hotels/:id', async (req, res) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id)
    res.json(hotel)
})

// Start Server
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server started on port ${port}`))
