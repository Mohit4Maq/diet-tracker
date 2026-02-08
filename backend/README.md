# FuelUp Diet Tracker - Backend API

Express.js backend server for the FuelUp Diet Tracker app.

## 🚀 Getting Started

### Installation
```bash
cd backend
npm install
```

### Start Server
```bash
npm start
```

Server will run on:
- **Local**: http://localhost:5001
- **Network**: http://192.168.1.116:5001

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status.

**Response:**
```json
{
  "status": "OK",
  "message": "FuelUp Backend is running!"
}
```

---

### User Goals

#### Get Goals
```
GET /api/goals
```
Returns user's daily nutritional goals.

**Response:**
```json
{
  "cal": 1800,
  "protein": 130,
  "carbs": 190,
  "fat": 55
}
```

#### Update Goals
```
PUT /api/goals
```
Updates user's daily goals.

**Request Body:**
```json
{
  "cal": 2000,
  "protein": 150,
  "carbs": 200,
  "fat": 60
}
```

---

### Meals

#### Get All Meals
```
GET /api/meals
```
Returns today's meals for all meal types.

**Response:**
```json
{
  "Breakfast": [...],
  "Lunch": [...],
  "Snack": [...],
  "Dinner": [...]
}
```

#### Update All Meals
```
PUT /api/meals
```
Replaces all meals with new data.

**Request Body:**
```json
{
  "Breakfast": [...],
  "Lunch": [...],
  "Snack": [...],
  "Dinner": [...]
}
```

#### Add Food to Meal
```
POST /api/meals/:mealType
```
Adds a food item to a specific meal.

**Parameters:**
- `mealType`: Breakfast, Lunch, Snack, or Dinner

**Request Body:**
```json
{
  "id": "1234567890",
  "name": "Oats (50g dry)",
  "cal": 190,
  "protein": 7,
  "carbs": 34,
  "fat": 3,
  "category": "Carbs"
}
```

#### Remove Food from Meal
```
DELETE /api/meals/:mealType/:foodId
```
Removes a food item from a specific meal.

**Parameters:**
- `mealType`: Breakfast, Lunch, Snack, or Dinner
- `foodId`: The ID of the food item

#### Clear All Meals
```
DELETE /api/meals
```
Clears all meals and resets selected plan.

---

### Week Log

#### Get Week Log
```
GET /api/weeklog
```
Returns the weekly progress log.

**Response:**
```json
[
  { "day": "Mon", "cal": 1650, "protein": 118 },
  { "day": "Tue", "cal": 1720, "protein": 125 },
  ...
]
```

#### Update Week Log
```
PUT /api/weeklog
```
Updates the entire week log.

#### Update Today's Log
```
POST /api/weeklog/today
```
Updates only today's entry in the week log.

**Request Body:**
```json
{
  "calories": 1800,
  "protein": 130
}
```

---

### Meal Plan

#### Get Selected Plan
```
GET /api/plan
```
Returns the currently selected meal plan.

**Response:**
```json
{
  "selectedPlan": "Balanced (1800 cal)"
}
```

#### Update Selected Plan
```
PUT /api/plan
```
Sets the selected meal plan.

**Request Body:**
```json
{
  "selectedPlan": "Muscle Gain (2200 cal)"
}
```

---

### Get All Data
```
GET /api/data
```
Returns all stored data (goals, meals, weekLog, selectedPlan).

## 💾 Data Storage

Data is stored in `backend/data/storage.json` as a simple JSON file. This persists across server restarts.

## 🔧 Development

To run with auto-reload:
```bash
npm run dev
```

(Note: Requires nodemon - run `npm install` first)

## 🌐 Network Access

The server is configured to listen on `0.0.0.0`, making it accessible from:
- Your Mac: http://localhost:5001
- Your iPhone (on same WiFi): http://192.168.1.116:5001
- Any device on the same network

## 🔒 CORS

CORS is enabled for all origins, allowing the React frontend to communicate with the backend.
