create mongoose schema from the object and create a rest api 
{
    address: {
      building: "1007",
      coord: [-73.856077, 40.848447],
      street: "Morris Park Ave",
      zipcode: "10462",
    },
    borough: "Bronx",
    cuisine: "Bakery",
    grades: [
      {
        date: {
          $date: 1393804800000,
        },
        grade: "A",
        score: 2,
      },
      {
        date: {
          $date: 1378857600000,
        },
        grade: "A",
        score: 6,
      },
      {
        date: {
          $date: 1358985600000,
        },
        grade: "A",
        score: 10,
      },
      {
        date: {
          $date: 1322006400000,
        },
        grade: "A",
        score: 9,
      },
      {
        date: {
          $date: 1299715200000,
        },
        grade: "B",
        score: 14,
      },
    ],
    name: "Morris Park Bake Shop",
    restaurant_id: "30075445",
  }

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  address: {
    building: {
      type: String,
      required: true,
    },
    coord: {
      type: Array,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
  },
  borough: {
    type: String,
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  grades: [
    {
      date: {
        type: Date,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  name: {
    type: String,
    required: true,
  },
  restaurant_id: {
    type: String,
    required: true,
  },
});

const Restaurant = mongoose.model('restaurant', restaurantSchema);

module.exports = Restaurant;

// REST API

// Create new restaurant
router.post('/', (req, res) => {
  const newRestaurant = new Restaurant({
    address: {
      building: req.body.building,
      coord: req.body.coord,
      street: req.body.street,
      zipcode: req.body.zipcode,
    },
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    grades: req.body.grades,
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
  });

  newRestaurant
    .save()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get all restaurants
router.get('/', (req, res) => {
  Restaurant.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Get restaurant by id
router.get('/:id', (req, res) => {
  Restaurant.findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update restaurant by id
router.put('/:id', (req, res) => {
  Restaurant.findByIdAndUpdate(
    req.params.id,
    {
      address: {
        building: req.body.building,
        coord: req.body.coord,
        street: req.body.street,
        zipcode: req.body.zipcode,
      },
      borough: req.body.borough,
      cuisine: req.body.cuisine,
      grades: req.body.grades,
      name: req.body.name,
      restaurant_id: req.body.restaurant_id,
    },
    { new: true }
  )
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete restaurant by id
router.delete('/:id', (req, res) => {
  Restaurant.findByIdAndDelete(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});
