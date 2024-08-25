const express = require('express');
const router = express.Router();
const db = require('./db');

// Add School API
router.post('/addSchool', (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Input validation
  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

// List Schools API
router.get('/listSchools', (req, res) => {
  const { userLat, userLon } = req.query;

  // Input validation
  if (!userLat || !userLon) {
    return res.status(400).json({ error: 'User latitude and longitude are required' });
  }

  const query = 'SELECT id, name, address, latitude, longitude FROM schools';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Calculate distance using Haversine formula
    const schoolsWithDistance = results.map(school => {
      const distance = getDistanceFromLatLonInKm(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    });

    // Sort schools by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  });
});

// Function to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

module.exports = router;
