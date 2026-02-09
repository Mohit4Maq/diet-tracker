const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const DATA_FILE = path.join(__dirname, 'data', 'storage.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return {
      userGoals: { cal: 1800, protein: 130, carbs: 190, fat: 55 },
      meals: { Breakfast: [], Lunch: [], Snack: [], Dinner: [] },
      weekLog: [
        { day: "Mon", cal: 0, protein: 0 },
        { day: "Tue", cal: 0, protein: 0 },
        { day: "Wed", cal: 0, protein: 0 },
        { day: "Thu", cal: 0, protein: 0 },
        { day: "Fri", cal: 0, protein: 0 },
        { day: "Sat", cal: 0, protein: 0 },
        { day: "Sun", cal: 0, protein: 0 }
      ],
      selectedPlan: null
    };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FuelUp Backend is running!' });
});

// Get all data
app.get('/api/data', (req, res) => {
  const data = readData();
  res.json(data);
});

// Get user goals
app.get('/api/goals', (req, res) => {
  const data = readData();
  res.json(data.userGoals);
});

// Update user goals
app.put('/api/goals', (req, res) => {
  const data = readData();
  data.userGoals = req.body;
  if (writeData(data)) {
    res.json({ success: true, goals: data.userGoals });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save goals' });
  }
});

// Get today's meals
app.get('/api/meals', (req, res) => {
  const data = readData();
  res.json(data.meals);
});

// Update meals
app.put('/api/meals', (req, res) => {
  const data = readData();
  data.meals = req.body;
  if (writeData(data)) {
    res.json({ success: true, meals: data.meals });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save meals' });
  }
});

// Add food to a meal
app.post('/api/meals/:mealType', (req, res) => {
  const { mealType } = req.params;
  const food = req.body;
  const data = readData();

  if (!data.meals[mealType]) {
    return res.status(400).json({ success: false, message: 'Invalid meal type' });
  }

  data.meals[mealType].push(food);
  if (writeData(data)) {
    res.json({ success: true, meals: data.meals });
  } else {
    res.status(500).json({ success: false, message: 'Failed to add food' });
  }
});

// Remove food from a meal
app.delete('/api/meals/:mealType/:foodId', (req, res) => {
  const { mealType, foodId } = req.params;
  const data = readData();

  if (!data.meals[mealType]) {
    return res.status(400).json({ success: false, message: 'Invalid meal type' });
  }

  data.meals[mealType] = data.meals[mealType].filter(f => f.id !== foodId);
  if (writeData(data)) {
    res.json({ success: true, meals: data.meals });
  } else {
    res.status(500).json({ success: false, message: 'Failed to remove food' });
  }
});

// Get week log
app.get('/api/weeklog', (req, res) => {
  const data = readData();
  res.json(data.weekLog);
});

// Update week log
app.put('/api/weeklog', (req, res) => {
  const data = readData();
  data.weekLog = req.body;
  if (writeData(data)) {
    res.json({ success: true, weekLog: data.weekLog });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save week log' });
  }
});

// Update today's log (for current day in week log)
app.post('/api/weeklog/today', (req, res) => {
  const { calories, protein } = req.body;
  const data = readData();

  // Get current day
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = days[new Date().getDay()];

  // Update today's entry
  const todayIndex = data.weekLog.findIndex(d => d.day === today);
  if (todayIndex !== -1) {
    data.weekLog[todayIndex].cal = calories;
    data.weekLog[todayIndex].protein = protein;
  }

  if (writeData(data)) {
    res.json({ success: true, weekLog: data.weekLog });
  } else {
    res.status(500).json({ success: false, message: 'Failed to update today\'s log' });
  }
});

// Get selected plan
app.get('/api/plan', (req, res) => {
  const data = readData();
  res.json({ selectedPlan: data.selectedPlan });
});

// Update selected plan
app.put('/api/plan', (req, res) => {
  const data = readData();
  data.selectedPlan = req.body.selectedPlan;
  if (writeData(data)) {
    res.json({ success: true, selectedPlan: data.selectedPlan });
  } else {
    res.status(500).json({ success: false, message: 'Failed to save plan' });
  }
});

// Clear today's meals
app.delete('/api/meals', (req, res) => {
  const data = readData();
  data.meals = { Breakfast: [], Lunch: [], Snack: [], Dinner: [] };
  data.selectedPlan = null;
  if (writeData(data)) {
    res.json({ success: true, meals: data.meals });
  } else {
    res.status(500).json({ success: false, message: 'Failed to clear meals' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🚀 FuelUp Backend Server is running!`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`📍 Network: http://192.168.1.116:${PORT}`);
  console.log(`✅ API Health Check: http://localhost:${PORT}/api/health\n`);
});
