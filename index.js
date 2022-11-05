const express = require('express');
const routes = require('./routes/flightRoute');
const flight = require('./flight.json');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded());

app.use('/', routes);

// This is to get all flights
app.get('/flight', (req, res) => {
  return res.json({ flight });
});

// This creates/adds a new flight and saves it to the database in flight.json
app.post('/flight', (req, res) => {
  console.log(req.body);
  flight.push(req.body.newFlight);
  let stringedData = JSON.stringify(flight, null, 2);
  fs.writeFile('flight.json', stringedData, (err) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
  });
  return res.status(200).json({ message: 'new flight created!' });
});

// This is to get a single flight
app.get('/flight/:id', (req, res) => {
  let id = req.params.id;
  let foundFlight = flight.find((booking) => {
    return String(booking.id) === id;
  });
  console.log(foundFlight);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
