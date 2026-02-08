import axios from 'axios';

// API Base URL - automatically detects environment
const getBaseURL = () => {
  // Production backend URL (Render)
  const PRODUCTION_API = 'https://diet-tracker-7h04.onrender.com/api';

  // If in production (deployed), use production backend
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return PRODUCTION_API;
  }

  // Local development - use localhost backend
  return 'http://localhost:5001/api';
};

const API_BASE = getBaseURL();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service
const apiService = {
  // Health check
  health: async () => {
    const response = await api.get('/health');
    return response.data;
  },

  // Goals
  getGoals: async () => {
    const response = await api.get('/goals');
    return response.data;
  },

  updateGoals: async (goals) => {
    const response = await api.put('/goals', goals);
    return response.data;
  },

  // Meals
  getMeals: async () => {
    const response = await api.get('/meals');
    return response.data;
  },

  updateMeals: async (meals) => {
    const response = await api.put('/meals', meals);
    return response.data;
  },

  addFoodToMeal: async (mealType, food) => {
    const response = await api.post(`/meals/${mealType}`, food);
    return response.data;
  },

  removeFoodFromMeal: async (mealType, foodId) => {
    const response = await api.delete(`/meals/${mealType}/${foodId}`);
    return response.data;
  },

  clearMeals: async () => {
    const response = await api.delete('/meals');
    return response.data;
  },

  // Week Log
  getWeekLog: async () => {
    const response = await api.get('/weeklog');
    return response.data;
  },

  updateWeekLog: async (weekLog) => {
    const response = await api.put('/weeklog', weekLog);
    return response.data;
  },

  updateTodayLog: async (calories, protein) => {
    const response = await api.post('/weeklog/today', { calories, protein });
    return response.data;
  },

  // Selected Plan
  getPlan: async () => {
    const response = await api.get('/plan');
    return response.data;
  },

  updatePlan: async (planName) => {
    const response = await api.put('/plan', { selectedPlan: planName });
    return response.data;
  },

  // Get all data
  getAllData: async () => {
    const response = await api.get('/data');
    return response.data;
  },
};

export default apiService;
