import { useState, useEffect } from "react";
import apiService from "./api";

const FOOD_DB = [
  { name: "Moong Dal (1 cup cooked)", cal: 210, protein: 14, carbs: 38, fat: 1, category: "Dal" },
  { name: "Toor Dal (1 cup cooked)", cal: 198, protein: 12, carbs: 36, fat: 1, category: "Dal" },
  { name: "Masoor Dal (1 cup cooked)", cal: 230, protein: 18, carbs: 40, fat: 1, category: "Dal" },
  { name: "Urad Dal (1 cup cooked)", cal: 230, protein: 15, carbs: 40, fat: 1, category: "Dal" },
  { name: "Chana Dal (1 cup cooked)", cal: 270, protein: 16, carbs: 45, fat: 4, category: "Dal" },
  { name: "Rajma (1 cup cooked)", cal: 225, protein: 15, carbs: 40, fat: 1, category: "Dal" },
  { name: "Chole / Chickpeas (1 cup)", cal: 270, protein: 15, carbs: 45, fat: 4, category: "Dal" },
  { name: "Soy Chunks (50g dry)", cal: 170, protein: 26, carbs: 16, fat: 0.5, category: "Protein" },
  { name: "Paneer (100g)", cal: 265, protein: 18, carbs: 3, fat: 21, category: "Protein" },
  { name: "Tofu (150g)", cal: 120, protein: 15, carbs: 2, fat: 7, category: "Protein" },
  { name: "Egg (1 boiled)", cal: 78, protein: 6, carbs: 1, fat: 5, category: "Protein" },
  { name: "Egg White (1)", cal: 17, protein: 4, carbs: 0, fat: 0, category: "Protein" },
  { name: "Whey Protein (1 scoop)", cal: 120, protein: 24, carbs: 3, fat: 1, category: "Protein" },
  { name: "Curd / Yogurt (1 cup)", cal: 100, protein: 10, carbs: 8, fat: 4, category: "Dairy" },
  { name: "Greek Yogurt (1 cup)", cal: 130, protein: 18, carbs: 6, fat: 4, category: "Dairy" },
  { name: "Milk (1 glass)", cal: 150, protein: 8, carbs: 12, fat: 8, category: "Dairy" },
  { name: "Buttermilk / Chaas (1 glass)", cal: 40, protein: 3, carbs: 5, fat: 1, category: "Dairy" },
  { name: "Roti / Chapati (1)", cal: 104, protein: 3, carbs: 18, fat: 3, category: "Carbs" },
  { name: "Rice (1 cup cooked)", cal: 206, protein: 4, carbs: 45, fat: 0.4, category: "Carbs" },
  { name: "Brown Rice (1 cup cooked)", cal: 216, protein: 5, carbs: 45, fat: 2, category: "Carbs" },
  { name: "Oats (50g dry)", cal: 190, protein: 7, carbs: 34, fat: 3, category: "Carbs" },
  { name: "Poha (1 plate)", cal: 250, protein: 5, carbs: 45, fat: 6, category: "Carbs" },
  { name: "Upma (1 plate)", cal: 230, protein: 6, carbs: 38, fat: 7, category: "Carbs" },
  { name: "Idli (2 pcs)", cal: 130, protein: 4, carbs: 26, fat: 1, category: "Carbs" },
  { name: "Dosa (1 plain)", cal: 168, protein: 4, carbs: 28, fat: 4, category: "Carbs" },
  { name: "Peanuts (30g)", cal: 170, protein: 7, carbs: 5, fat: 14, category: "Snacks" },
  { name: "Peanut Butter (2 tbsp)", cal: 190, protein: 8, carbs: 6, fat: 16, category: "Snacks" },
  { name: "Almonds (10 pcs)", cal: 70, protein: 3, carbs: 2, fat: 6, category: "Snacks" },
  { name: "Roasted Chana (50g)", cal: 180, protein: 10, carbs: 28, fat: 3, category: "Snacks" },
  { name: "Makhana (30g)", cal: 100, protein: 3, carbs: 18, fat: 1, category: "Snacks" },
  { name: "Banana (1 medium)", cal: 105, protein: 1, carbs: 27, fat: 0.4, category: "Fruits" },
  { name: "Apple (1 medium)", cal: 95, protein: 0.5, carbs: 25, fat: 0.3, category: "Fruits" },
  { name: "Sattu Drink (2 tbsp)", cal: 100, protein: 8, carbs: 15, fat: 2, category: "Drinks" },
  { name: "Sprouts Salad (1 cup)", cal: 120, protein: 9, carbs: 18, fat: 1, category: "Protein" },
  { name: "Mixed Sabzi (1 cup)", cal: 100, protein: 3, carbs: 12, fat: 5, category: "Veggies" },
  { name: "Palak / Spinach (1 cup)", cal: 40, protein: 3, carbs: 4, fat: 1, category: "Veggies" },
  { name: "Ghee (1 tsp)", cal: 45, protein: 0, carbs: 0, fat: 5, category: "Fats" },
  { name: "Coconut Oil (1 tsp)", cal: 40, protein: 0, carbs: 0, fat: 5, category: "Fats" },

  // More Breads
  { name: "Paratha (1 plain)", cal: 180, protein: 4, carbs: 25, fat: 7, category: "Carbs" },
  { name: "Aloo Paratha (1)", cal: 250, protein: 5, carbs: 32, fat: 11, category: "Carbs" },
  { name: "Paneer Paratha (1)", cal: 280, protein: 9, carbs: 30, fat: 14, category: "Carbs" },
  { name: "Naan (1)", cal: 262, protein: 9, carbs: 45, fat: 5, category: "Carbs" },
  { name: "Butter Naan (1)", cal: 310, protein: 9, carbs: 46, fat: 10, category: "Carbs" },
  { name: "Puri (1)", cal: 85, protein: 2, carbs: 11, fat: 4, category: "Carbs" },
  { name: "Bhatura (1)", cal: 280, protein: 6, carbs: 40, fat: 11, category: "Carbs" },
  { name: "Thepla (1)", cal: 110, protein: 3, carbs: 16, fat: 4, category: "Carbs" },
  { name: "Missi Roti (1)", cal: 125, protein: 5, carbs: 18, fat: 4, category: "Carbs" },

  // Rice Preparations
  { name: "Jeera Rice (1 cup)", cal: 250, protein: 5, carbs: 50, fat: 5, category: "Carbs" },
  { name: "Veg Biryani (1 plate)", cal: 380, protein: 8, carbs: 62, fat: 12, category: "Carbs" },
  { name: "Veg Pulao (1 cup)", cal: 320, protein: 6, carbs: 54, fat: 9, category: "Carbs" },
  { name: "Lemon Rice (1 cup)", cal: 270, protein: 5, carbs: 48, fat: 7, category: "Carbs" },
  { name: "Curd Rice (1 cup)", cal: 240, protein: 8, carbs: 42, fat: 5, category: "Carbs" },
  { name: "Khichdi (1 cup)", cal: 220, protein: 9, carbs: 40, fat: 3, category: "Carbs" },

  // Vegetables & Sabzis
  { name: "Aloo Gobi (1 cup)", cal: 150, protein: 3, carbs: 22, fat: 6, category: "Veggies" },
  { name: "Bhindi / Okra (1 cup)", cal: 90, protein: 2, carbs: 12, fat: 4, category: "Veggies" },
  { name: "Baingan Bharta (1 cup)", cal: 180, protein: 3, carbs: 15, fat: 12, category: "Veggies" },
  { name: "Kadai Paneer (1 cup)", cal: 320, protein: 15, carbs: 12, fat: 24, category: "Protein" },
  { name: "Palak Paneer (1 cup)", cal: 280, protein: 14, carbs: 10, fat: 20, category: "Protein" },
  { name: "Matar Paneer (1 cup)", cal: 300, protein: 13, carbs: 18, fat: 19, category: "Protein" },
  { name: "Aloo Matar (1 cup)", cal: 170, protein: 5, carbs: 28, fat: 5, category: "Veggies" },
  { name: "Methi Leaves (1 cup)", cal: 45, protein: 4, carbs: 6, fat: 1, category: "Veggies" },
  { name: "Cabbage Sabzi (1 cup)", cal: 80, protein: 2, carbs: 10, fat: 4, category: "Veggies" },
  { name: "Lauki / Bottle Gourd (1 cup)", cal: 60, protein: 1, carbs: 10, fat: 2, category: "Veggies" },
  { name: "Karela / Bitter Gourd (1 cup)", cal: 55, protein: 2, carbs: 8, fat: 2, category: "Veggies" },
  { name: "Beans Sabzi (1 cup)", cal: 95, protein: 3, carbs: 14, fat: 3, category: "Veggies" },
  { name: "Carrot Sabzi (1 cup)", cal: 85, protein: 2, carbs: 12, fat: 3, category: "Veggies" },

  // More Dals & Curries
  { name: "Dal Makhani (1 cup)", cal: 280, protein: 13, carbs: 35, fat: 10, category: "Dal" },
  { name: "Dal Tadka (1 cup)", cal: 210, protein: 12, carbs: 36, fat: 4, category: "Dal" },
  { name: "Sambhar (1 cup)", cal: 150, protein: 8, carbs: 24, fat: 3, category: "Dal" },
  { name: "Kadhi (1 cup)", cal: 140, protein: 6, carbs: 12, fat: 8, category: "Dairy" },

  // South Indian
  { name: "Medu Vada (2 pcs)", cal: 220, protein: 6, carbs: 28, fat: 10, category: "Snacks" },
  { name: "Masala Dosa (1)", cal: 320, protein: 8, carbs: 48, fat: 11, category: "Carbs" },
  { name: "Uttapam (1)", cal: 250, protein: 6, carbs: 42, fat: 6, category: "Carbs" },
  { name: "Rava Dosa (1)", cal: 280, protein: 6, carbs: 44, fat: 9, category: "Carbs" },
  { name: "Pongal (1 cup)", cal: 240, protein: 7, carbs: 40, fat: 6, category: "Carbs" },
  { name: "Vada Pav (1)", cal: 290, protein: 7, carbs: 42, fat: 11, category: "Snacks" },

  // Snacks & Street Food
  { name: "Samosa (1)", cal: 262, protein: 4, carbs: 30, fat: 14, category: "Snacks" },
  { name: "Kachori (1)", cal: 180, protein: 4, carbs: 22, fat: 9, category: "Snacks" },
  { name: "Pakora (100g)", cal: 280, protein: 6, carbs: 28, fat: 16, category: "Snacks" },
  { name: "Dhokla (2 pcs)", cal: 160, protein: 4, carbs: 28, fat: 4, category: "Snacks" },
  { name: "Khandvi (100g)", cal: 170, protein: 6, carbs: 20, fat: 7, category: "Snacks" },
  { name: "Chivda / Mixture (30g)", cal: 150, protein: 3, carbs: 18, fat: 7, category: "Snacks" },
  { name: "Bhel Puri (1 cup)", cal: 220, protein: 5, carbs: 32, fat: 8, category: "Snacks" },
  { name: "Pani Puri (6 pcs)", cal: 180, protein: 4, carbs: 30, fat: 5, category: "Snacks" },
  { name: "Sev (30g)", cal: 160, protein: 3, carbs: 15, fat: 10, category: "Snacks" },
  { name: "Mathri (2 pcs)", cal: 180, protein: 3, carbs: 20, fat: 10, category: "Snacks" },

  // Sweets
  { name: "Gulab Jamun (1 pc)", cal: 175, protein: 3, carbs: 28, fat: 6, category: "Snacks" },
  { name: "Jalebi (2 pcs)", cal: 150, protein: 1, carbs: 30, fat: 4, category: "Snacks" },
  { name: "Rasgulla (1 pc)", cal: 106, protein: 1, carbs: 21, fat: 2, category: "Snacks" },
  { name: "Ladoo (1)", cal: 140, protein: 3, carbs: 20, fat: 6, category: "Snacks" },
  { name: "Kheer / Payasam (1 cup)", cal: 250, protein: 6, carbs: 38, fat: 9, category: "Dairy" },
  { name: "Halwa (100g)", cal: 300, protein: 4, carbs: 45, fat: 12, category: "Snacks" },
  { name: "Barfi (1 pc)", cal: 120, protein: 2, carbs: 16, fat: 6, category: "Snacks" },

  // More Fruits
  { name: "Mango (1 medium)", cal: 135, protein: 1, carbs: 35, fat: 0.6, category: "Fruits" },
  { name: "Papaya (1 cup)", cal: 62, protein: 1, carbs: 16, fat: 0.4, category: "Fruits" },
  { name: "Pomegranate (1 cup)", cal: 144, protein: 3, carbs: 32, fat: 2, category: "Fruits" },
  { name: "Orange (1 medium)", cal: 62, protein: 1, carbs: 15, fat: 0.2, category: "Fruits" },
  { name: "Grapes (1 cup)", cal: 104, protein: 1, carbs: 27, fat: 0.2, category: "Fruits" },
  { name: "Watermelon (1 cup)", cal: 46, protein: 1, carbs: 12, fat: 0.2, category: "Fruits" },
  { name: "Guava (1 medium)", cal: 68, protein: 3, carbs: 14, fat: 1, category: "Fruits" },
  { name: "Pear (1 medium)", cal: 101, protein: 1, carbs: 27, fat: 0.2, category: "Fruits" },

  // Nuts & Seeds
  { name: "Cashews (10 pcs)", cal: 85, protein: 3, carbs: 5, fat: 7, category: "Snacks" },
  { name: "Walnuts (7 halves)", cal: 185, protein: 4, carbs: 4, fat: 18, category: "Snacks" },
  { name: "Pistachios (30g)", cal: 170, protein: 6, carbs: 8, fat: 14, category: "Snacks" },
  { name: "Flaxseeds (1 tbsp)", cal: 55, protein: 2, carbs: 3, fat: 4, category: "Snacks" },
  { name: "Chia Seeds (1 tbsp)", cal: 58, protein: 2, carbs: 5, fat: 4, category: "Snacks" },
  { name: "Sunflower Seeds (30g)", cal: 165, protein: 6, carbs: 6, fat: 14, category: "Snacks" },
  { name: "Pumpkin Seeds (30g)", cal: 151, protein: 7, carbs: 5, fat: 13, category: "Snacks" },

  // Beverages
  { name: "Masala Chai (1 cup)", cal: 80, protein: 2, carbs: 12, fat: 2, category: "Drinks" },
  { name: "Green Tea (1 cup)", cal: 2, protein: 0, carbs: 0, fat: 0, category: "Drinks" },
  { name: "Lassi (1 glass)", cal: 160, protein: 8, carbs: 20, fat: 5, category: "Drinks" },
  { name: "Mango Lassi (1 glass)", cal: 220, protein: 6, carbs: 35, fat: 6, category: "Drinks" },
  { name: "Coconut Water (1 glass)", cal: 46, protein: 2, carbs: 9, fat: 0.5, category: "Drinks" },
  { name: "Nimbu Pani (1 glass)", cal: 60, protein: 0, carbs: 16, fat: 0, category: "Drinks" },
  { name: "Sugarcane Juice (1 glass)", cal: 180, protein: 0, carbs: 45, fat: 0, category: "Drinks" },
  { name: "Thandai (1 glass)", cal: 240, protein: 6, carbs: 32, fat: 10, category: "Drinks" },

  // More Protein Sources
  { name: "Chicken Breast (100g)", cal: 165, protein: 31, carbs: 0, fat: 4, category: "Protein" },
  { name: "Fish (100g grilled)", cal: 140, protein: 26, carbs: 0, fat: 3, category: "Protein" },
  { name: "Mutton (100g)", cal: 294, protein: 25, carbs: 0, fat: 21, category: "Protein" },
  { name: "Cottage Cheese / Paneer (50g)", cal: 132, protein: 9, carbs: 2, fat: 11, category: "Protein" },

  // Salads & Raita
  { name: "Cucumber Salad (1 cup)", cal: 45, protein: 1, carbs: 8, fat: 2, category: "Veggies" },
  { name: "Kachumber Salad (1 cup)", cal: 60, protein: 2, carbs: 10, fat: 2, category: "Veggies" },
  { name: "Boondi Raita (1 cup)", cal: 120, protein: 5, carbs: 12, fat: 6, category: "Dairy" },
  { name: "Cucumber Raita (1 cup)", cal: 90, protein: 5, carbs: 8, fat: 4, category: "Dairy" },
  { name: "Mixed Veg Raita (1 cup)", cal: 100, protein: 6, carbs: 10, fat: 4, category: "Dairy" },

  // Condiments & Sides
  { name: "Pickle (1 tbsp)", cal: 25, protein: 0, carbs: 3, fat: 1, category: "Veggies" },
  { name: "Coconut Chutney (2 tbsp)", cal: 60, protein: 1, carbs: 4, fat: 5, category: "Fats" },
  { name: "Mint Chutney (2 tbsp)", cal: 20, protein: 1, carbs: 4, fat: 0, category: "Veggies" },
  { name: "Tamarind Chutney (2 tbsp)", cal: 50, protein: 0, carbs: 13, fat: 0, category: "Veggies" },
  { name: "Papad (1)", cal: 50, protein: 2, carbs: 8, fat: 1, category: "Snacks" },
];

const MEAL_PLANS = {
  "Fat Loss (1600 cal)": {
    target: { cal: 1600, protein: 120, carbs: 150, fat: 50 },
    meals: {
      Breakfast: ["Oats (50g dry)", "Egg White (1)", "Egg White (1)", "Egg White (1)", "Banana (1 medium)"],
      Lunch: ["Brown Rice (1 cup cooked)", "Moong Dal (1 cup cooked)", "Mixed Sabzi (1 cup)", "Curd / Yogurt (1 cup)"],
      Snack: ["Whey Protein (1 scoop)", "Roasted Chana (50g)"],
      Dinner: ["Roti / Chapati (1)", "Roti / Chapati (1)", "Soy Chunks (50g dry)", "Palak / Spinach (1 cup)", "Buttermilk / Chaas (1 glass)"],
    },
  },
  "Muscle Gain (2200 cal)": {
    target: { cal: 2200, protein: 150, carbs: 250, fat: 65 },
    meals: {
      Breakfast: ["Oats (50g dry)", "Milk (1 glass)", "Peanut Butter (2 tbsp)", "Banana (1 medium)", "Egg (1 boiled)"],
      Lunch: ["Rice (1 cup cooked)", "Rajma (1 cup cooked)", "Mixed Sabzi (1 cup)", "Curd / Yogurt (1 cup)", "Roti / Chapati (1)"],
      Snack: ["Whey Protein (1 scoop)", "Almonds (10 pcs)", "Sattu Drink (2 tbsp)"],
      Dinner: ["Roti / Chapati (1)", "Roti / Chapati (1)", "Paneer (100g)", "Toor Dal (1 cup cooked)", "Ghee (1 tsp)"],
    },
  },
  "Balanced (1800 cal)": {
    target: { cal: 1800, protein: 130, carbs: 190, fat: 55 },
    meals: {
      Breakfast: ["Idli (2 pcs)", "Sprouts Salad (1 cup)", "Milk (1 glass)"],
      Lunch: ["Rice (1 cup cooked)", "Toor Dal (1 cup cooked)", "Mixed Sabzi (1 cup)", "Curd / Yogurt (1 cup)"],
      Snack: ["Roasted Chana (50g)", "Makhana (30g)", "Buttermilk / Chaas (1 glass)"],
      Dinner: ["Roti / Chapati (1)", "Roti / Chapati (1)", "Tofu (150g)", "Palak / Spinach (1 cup)", "Whey Protein (1 scoop)"],
    },
  },
};

const CATEGORIES_COLORS = {
  Dal: "#E8A838",
  Protein: "#E05555",
  Dairy: "#5B9FE8",
  Carbs: "#D4A053",
  Snacks: "#8BC34A",
  Fruits: "#FF7EB3",
  Drinks: "#4DD0E1",
  Veggies: "#66BB6A",
  Fats: "#FFB74D",
};

const MEAL_ICONS = {
  Breakfast: "🌅",
  Lunch: "☀️",
  Snack: "🍿",
  Dinner: "🌙",
};

export default function DietTracker() {
  const [activeTab, setActiveTab] = useState("tracker");
  const [meals, setMeals] = useState({ Breakfast: [], Lunch: [], Snack: [], Dinner: [] });
  const [activeMeal, setActiveMeal] = useState("Breakfast");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [weekLog, setWeekLog] = useState([
    { day: "Mon", cal: 0, protein: 0 },
    { day: "Tue", cal: 0, protein: 0 },
    { day: "Wed", cal: 0, protein: 0 },
    { day: "Thu", cal: 0, protein: 0 },
    { day: "Fri", cal: 0, protein: 0 },
    { day: "Sat", cal: 0, protein: 0 },
    { day: "Sun", cal: 0, protein: 0 },
  ]);
  const [userGoal, setUserGoal] = useState({ cal: 1800, protein: 130, carbs: 190, fat: 55 });
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load data from backend on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllData();
        setMeals(data.meals);
        setUserGoal(data.userGoals);
        setWeekLog(data.weekLog);
        setSelectedPlan(data.selectedPlan);
        setError(null);
      } catch (err) {
        console.error('Failed to load data:', err);
        setError('Failed to connect to backend. Using local data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const totals = Object.values(meals)
    .flat()
    .reduce(
      (acc, item) => ({
        cal: acc.cal + item.cal,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fat: acc.fat + item.fat,
      }),
      { cal: 0, protein: 0, carbs: 0, fat: 0 }
    );

  const addFood = async (food) => {
    const foodWithId = { ...food, id: Date.now() + Math.random() };
    const updatedMeals = {
      ...meals,
      [activeMeal]: [...meals[activeMeal], foodWithId],
    };
    setMeals(updatedMeals);

    // Save to backend
    try {
      await apiService.updateMeals(updatedMeals);
      // Update today's log
      const totals = Object.values(updatedMeals).flat().reduce(
        (acc, item) => ({
          cal: acc.cal + item.cal,
          protein: acc.protein + item.protein,
        }),
        { cal: 0, protein: 0 }
      );
      await apiService.updateTodayLog(totals.cal, totals.protein);
    } catch (err) {
      console.error('Failed to save meal:', err);
    }
  };

  const removeFood = async (mealType, id) => {
    const updatedMeals = {
      ...meals,
      [mealType]: meals[mealType].filter((f) => f.id !== id),
    };
    setMeals(updatedMeals);

    // Save to backend
    try {
      await apiService.updateMeals(updatedMeals);
      // Update today's log
      const totals = Object.values(updatedMeals).flat().reduce(
        (acc, item) => ({
          cal: acc.cal + item.cal,
          protein: acc.protein + item.protein,
        }),
        { cal: 0, protein: 0 }
      );
      await apiService.updateTodayLog(totals.cal, totals.protein);
    } catch (err) {
      console.error('Failed to remove food:', err);
    }
  };

  const loadPlan = async (planName) => {
    const plan = MEAL_PLANS[planName];
    setSelectedPlan(planName);
    setUserGoal(plan.target);
    const loaded = {};
    Object.entries(plan.meals).forEach(([mealType, foods]) => {
      loaded[mealType] = foods.map((name) => {
        const found = FOOD_DB.find((f) => f.name === name);
        return { ...found, id: Date.now() + Math.random() };
      });
    });
    setMeals(loaded);

    // Save to backend
    try {
      await apiService.updatePlan(planName);
      await apiService.updateGoals(plan.target);
      await apiService.updateMeals(loaded);
      // Update today's log
      const totals = Object.values(loaded).flat().reduce(
        (acc, item) => ({
          cal: acc.cal + item.cal,
          protein: acc.protein + item.protein,
        }),
        { cal: 0, protein: 0 }
      );
      await apiService.updateTodayLog(totals.cal, totals.protein);
    } catch (err) {
      console.error('Failed to save plan:', err);
    }
  };

  const clearDay = async () => {
    setMeals({ Breakfast: [], Lunch: [], Snack: [], Dinner: [] });
    setSelectedPlan(null);

    // Save to backend
    try {
      await apiService.clearMeals();
      await apiService.updateTodayLog(0, 0);
    } catch (err) {
      console.error('Failed to clear day:', err);
    }
  };

  const filteredFoods = FOOD_DB.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === "All" || f.category === filterCategory;
    return matchSearch && matchCat;
  });

  const categories = ["All", ...new Set(FOOD_DB.map((f) => f.category))];

  const pct = (val, goal) => Math.min((val / goal) * 100, 100);

  // Get current time period and recommendations
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) return { period: "Morning", meal: "Breakfast", icon: "🌅", color: "#FFB74D" };
    if (hour >= 11 && hour < 16) return { period: "Afternoon", meal: "Lunch", icon: "☀️", color: "#E8A838" };
    if (hour >= 16 && hour < 20) return { period: "Evening", meal: "Snack", icon: "🌆", color: "#E05555" };
    return { period: "Night", meal: "Dinner", icon: "🌙", color: "#5B9FE8" };
  };

  const getSmartRecommendations = () => {
    const remaining = {
      cal: Math.max(0, userGoal.cal - totals.cal),
      protein: Math.max(0, userGoal.protein - totals.protein),
      carbs: Math.max(0, userGoal.carbs - totals.carbs),
      fat: Math.max(0, userGoal.fat - totals.fat),
    };

    // Determine goal type based on calorie target
    let goalType = "balanced";
    if (userGoal.cal <= 1700) goalType = "fat-loss";
    if (userGoal.cal >= 2100) goalType = "muscle-gain";

    // Filter foods based on time of day and goals
    let recommendations = [];
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) {
      // Morning: High energy, moderate protein
      recommendations = FOOD_DB.filter(f =>
        ["Carbs", "Protein", "Fruits", "Dairy"].includes(f.category) &&
        f.carbs > 10 && f.cal <= remaining.cal
      );
    } else if (hour >= 11 && hour < 16) {
      // Afternoon: Balanced meal
      recommendations = FOOD_DB.filter(f =>
        ["Dal", "Carbs", "Protein", "Veggies", "Dairy"].includes(f.category) &&
        f.cal <= remaining.cal
      );
    } else if (hour >= 16 && hour < 20) {
      // Evening: Light snacks, protein focus
      recommendations = FOOD_DB.filter(f =>
        ["Snacks", "Protein", "Fruits", "Drinks"].includes(f.category) &&
        f.protein >= 3 && f.cal <= remaining.cal
      );
    } else {
      // Night: Light, high protein, low carbs
      recommendations = FOOD_DB.filter(f =>
        ["Protein", "Veggies", "Dal", "Dairy"].includes(f.category) &&
        f.protein >= 8 && f.carbs < 30 && f.cal <= remaining.cal
      );
    }

    // Score foods based on how well they match remaining macros
    recommendations = recommendations.map(food => {
      let score = 0;

      // Prioritize protein if low
      if (remaining.protein > 0) {
        score += (food.protein / remaining.protein) * 100;
      }

      // Match carbs need
      if (remaining.carbs > 0 && food.carbs > 0) {
        score += Math.min((food.carbs / remaining.carbs) * 50, 50);
      }

      // Match calories without exceeding
      if (food.cal <= remaining.cal) {
        score += 30;
      }

      // Bonus for goal type
      if (goalType === "fat-loss" && food.cal < 150 && food.protein > 5) score += 20;
      if (goalType === "muscle-gain" && food.protein > 15) score += 25;

      return { ...food, score };
    });

    // Sort by score and return top recommendations
    return recommendations.sort((a, b) => b.score - a.score).slice(0, 12);
  };

  const timeInfo = getTimeOfDay();
  const smartPicks = getSmartRecommendations();

  // Loading screen
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0a0f 0%, #111118 40%, #0d1117 100%)",
        color: "#fff",
        fontFamily: "'Outfit', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 20,
      }}>
        <div style={{ fontSize: 48 }}>⏳</div>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Loading FuelUp...</h2>
        <p style={{ margin: 0, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Connecting to backend</p>
      </div>
    );
  }

  const CircularProgress = ({ value, max, size = 120, stroke = 8, color, label, unit }) => {
    const r = (size - stroke) / 2;
    const circ = 2 * Math.PI * r;
    const progress = Math.min(value / max, 1);
    const offset = circ * (1 - progress);
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div style={{ position: "relative", marginTop: -size + 10, height: size - 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: size > 100 ? 28 : 20, fontWeight: 800, color: "#fff", fontFamily: "'Outfit', sans-serif" }}>
            {Math.round(value)}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>
            / {max} {unit}
          </span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1.5, marginTop: 4 }}>
          {label}
        </span>
      </div>
    );
  };

  const MacroBar = ({ label, value, max, color }) => (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1.2 }}>{label}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>{Math.round(value)}g <span style={{ color: "rgba(255,255,255,0.3)" }}>/ {max}g</span></span>
      </div>
      <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct(value, max)}%`, background: `linear-gradient(90deg, ${color}, ${color}aa)`, borderRadius: 3, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0a0f 0%, #111118 40%, #0d1117 100%)",
      color: "#fff",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>

      {/* Ambient glow */}
      <div style={{ position: "fixed", top: -200, right: -200, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,168,56,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -150, left: -150, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(224,85,85,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 16px", paddingBottom: 100 }}>
        {/* Header */}
        <div style={{ padding: "24px 0 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: -0.5, background: "linear-gradient(135deg, #E8A838, #E05555)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              FuelUp
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.35)", fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>
              Diet Tracker
            </p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowGoalEdit(true)}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "8px 14px", color: "rgba(255,255,255,0.6)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              ⚙️ Goals
            </button>
            <button
              onClick={clearDay}
              style={{ background: "rgba(224,85,85,0.1)", border: "1px solid rgba(224,85,85,0.2)", borderRadius: 12, padding: "8px 14px", color: "#E05555", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
            >
              Clear Day
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div style={{
            background: "rgba(224,85,85,0.1)",
            border: "1px solid rgba(224,85,85,0.3)",
            borderRadius: 12,
            padding: 12,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>⚠️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E05555" }}>{error}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                Check that backend is running on port 5001
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.03)", borderRadius: 16, padding: 4, marginBottom: 20, border: "1px solid rgba(255,255,255,0.05)" }}>
          {["tracker", "smart", "plans", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "12px 0",
                border: "none",
                borderRadius: 12,
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: activeTab === tab
                  ? "linear-gradient(135deg, #E8A838, #E05555)"
                  : "transparent",
                color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.35)",
                fontFamily: "'Outfit', sans-serif",
                boxShadow: activeTab === tab ? "0 4px 12px rgba(232,168,56,0.3)" : "none",
              }}
            >
              {tab === "tracker" ? "📋 Today" : tab === "smart" ? "✨ Smart" : tab === "plans" ? "🍽️ Plans" : "📊 Progress"}
            </button>
          ))}
        </div>

        {/* ===== TRACKER TAB ===== */}
        {activeTab === "tracker" && (
          <div>
            {/* Calorie Ring + Macros */}
            <div style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                <CircularProgress value={totals.cal} max={userGoal.cal} size={140} stroke={10} color="#E8A838" label="Calories" unit="kcal" />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <MacroBar label="Protein" value={totals.protein} max={userGoal.protein} color="#E05555" />
                <MacroBar label="Carbs" value={totals.carbs} max={userGoal.carbs} color="#E8A838" />
                <MacroBar label="Fat" value={totals.fat} max={userGoal.fat} color="#5B9FE8" />
              </div>
            </div>

            {/* Meal Sections */}
            {Object.entries(meals).map(([mealType, items]) => {
              const mealTotal = items.reduce((a, i) => a + i.cal, 0);
              const mealProtein = items.reduce((a, i) => a + i.protein, 0);
              return (
                <div
                  key={mealType}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 20,
                    padding: 16,
                    marginBottom: 12,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: items.length ? 12 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{MEAL_ICONS[mealType]}</span>
                      <div>
                        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>{mealType}</h3>
                        {items.length > 0 && (
                          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                            {mealTotal} kcal · {mealProtein}g protein
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => { setActiveMeal(mealType); setShowFoodModal(true); }}
                      style={{
                        background: "linear-gradient(135deg, rgba(232,168,56,0.15), rgba(224,85,85,0.1))",
                        border: "1px solid rgba(232,168,56,0.2)",
                        borderRadius: 10,
                        padding: "6px 14px",
                        color: "#E8A838",
                        fontSize: 18,
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: 12,
                        marginBottom: 6,
                        border: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 4, height: 4, borderRadius: 2, background: CATEGORIES_COLORS[item.category] || "#888" }} />
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{item.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12, marginTop: 4, paddingLeft: 12 }}>
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{item.cal} cal</span>
                          <span style={{ fontSize: 10, color: "#E05555" }}>{item.protein}g P</span>
                          <span style={{ fontSize: 10, color: "#E8A838" }}>{item.carbs}g C</span>
                          <span style={{ fontSize: 10, color: "#5B9FE8" }}>{item.fat}g F</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFood(mealType, item.id)}
                        style={{ background: "none", border: "none", color: "rgba(255,255,255,0.2)", cursor: "pointer", fontSize: 16, padding: 4 }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* ===== SMART RECOMMENDATIONS TAB ===== */}
        {activeTab === "smart" && (
          <div>
            {/* Time-based header */}
            <div style={{
              background: `linear-gradient(145deg, ${timeInfo.color}15, rgba(255,255,255,0.02))`,
              borderRadius: 24,
              padding: 24,
              marginBottom: 20,
              border: `1px solid ${timeInfo.color}30`,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, fontSize: 120, opacity: 0.05 }}>{timeInfo.icon}</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 40 }}>{timeInfo.icon}</span>
                  <div>
                    <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: timeInfo.color }}>
                      Good {timeInfo.period}!
                    </h2>
                    <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                      Perfect time for {timeInfo.meal.toLowerCase()}
                    </p>
                  </div>
                </div>

                {/* Remaining macros */}
                <div style={{
                  background: "rgba(0,0,0,0.2)",
                  borderRadius: 16,
                  padding: 16,
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: 12,
                  marginTop: 16,
                }}>
                  {[
                    { label: "Calories Left", value: Math.max(0, userGoal.cal - totals.cal), unit: "kcal", color: "#E8A838", icon: "🔥" },
                    { label: "Protein Left", value: Math.max(0, userGoal.protein - totals.protein), unit: "g", color: "#E05555", icon: "💪" },
                    { label: "Carbs Left", value: Math.max(0, userGoal.carbs - totals.carbs), unit: "g", color: "#D4A053", icon: "🌾" },
                    { label: "Fat Left", value: Math.max(0, userGoal.fat - totals.fat), unit: "g", color: "#5B9FE8", icon: "🥑" },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 1 }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: item.color, fontFamily: "'Space Mono', monospace" }}>
                          {Math.round(item.value)}<span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>{item.unit}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart picks */}
            <div style={{ marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ background: "linear-gradient(135deg, #E8A838, #E05555)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  ✨ Smart Picks for You
                </span>
              </h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 16, marginTop: 4 }}>
                AI-powered recommendations based on your progress and time of day
              </p>
            </div>

            {smartPicks.length === 0 ? (
              <div style={{
                background: "rgba(255,255,255,0.02)",
                borderRadius: 20,
                padding: 40,
                textAlign: "center",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎯</div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  You've hit your goals!
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                  Great job staying on track today
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
                {smartPicks.map((food, idx) => (
                  <div
                    key={food.name}
                    style={{
                      background: idx < 3
                        ? "linear-gradient(145deg, rgba(232,168,56,0.08), rgba(224,85,85,0.04))"
                        : "rgba(255,255,255,0.02)",
                      borderRadius: 16,
                      padding: 16,
                      border: idx < 3
                        ? "1px solid rgba(232,168,56,0.2)"
                        : "1px solid rgba(255,255,255,0.05)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {idx < 3 && (
                      <div style={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        background: "linear-gradient(135deg, #E8A838, #E05555)",
                        borderRadius: 8,
                        padding: "4px 8px",
                        fontSize: 9,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}>
                        Top Pick
                      </div>
                    )}
                    <div style={{ flex: 1, marginTop: idx < 3 ? 20 : 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: 3, background: CATEGORIES_COLORS[food.category] }} />
                        <span style={{ fontSize: 14, fontWeight: 600 }}>{food.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 12, paddingLeft: 14 }}>
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{food.cal} cal</span>
                        <span style={{ fontSize: 11, color: "#E05555" }}>{food.protein}g P</span>
                        <span style={{ fontSize: 11, color: "#E8A838" }}>{food.carbs}g C</span>
                        <span style={{ fontSize: 11, color: "#5B9FE8" }}>{food.fat}g F</span>
                      </div>
                      <div style={{ marginTop: 6, paddingLeft: 14 }}>
                        <span style={{
                          fontSize: 10,
                          padding: "3px 8px",
                          borderRadius: 6,
                          background: `${CATEGORIES_COLORS[food.category]}20`,
                          color: CATEGORIES_COLORS[food.category],
                          fontWeight: 600,
                        }}>
                          {food.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addFood(food);
                        setActiveMeal(timeInfo.meal);
                      }}
                      style={{
                        background: "linear-gradient(135deg, rgba(232,168,56,0.2), rgba(224,85,85,0.15))",
                        border: "1px solid rgba(232,168,56,0.3)",
                        borderRadius: 12,
                        padding: "10px 16px",
                        color: "#E8A838",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Why these picks? */}
            <div style={{
              background: "rgba(91,159,232,0.05)",
              borderRadius: 16,
              padding: 16,
              marginTop: 20,
              border: "1px solid rgba(91,159,232,0.15)",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>💡</span>
                <div>
                  <h4 style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#5B9FE8", marginBottom: 6 }}>
                    Why these recommendations?
                  </h4>
                  <p style={{ margin: 0, fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                    Our AI considers your remaining daily macros, current time of day, and nutritional goals to suggest
                    the best foods that will help you stay on track and feel great.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== PLANS TAB ===== */}
        {activeTab === "plans" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Meal Plans</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20, marginTop: 0 }}>
              Indian vegetarian plans tailored for your goals
            </p>
            {Object.entries(MEAL_PLANS).map(([name, plan]) => (
              <div
                key={name}
                style={{
                  background: selectedPlan === name
                    ? "linear-gradient(145deg, rgba(232,168,56,0.15), rgba(224,85,85,0.1))"
                    : "rgba(255,255,255,0.02)",
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 12,
                  border: selectedPlan === name ? "2px solid #E8A838" : "1px solid rgba(255,255,255,0.05)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: selectedPlan === name ? "0 4px 20px rgba(232,168,56,0.2)" : "none",
                  transform: selectedPlan === name ? "scale(1.02)" : "scale(1)",
                }}
                onClick={() => loadPlan(name)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>{name}</h3>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                      {plan.target.cal} kcal · {plan.target.protein}g protein
                    </span>
                  </div>
                  {selectedPlan === name && (
                    <span style={{
                      background: "linear-gradient(135deg, #E8A838, #E05555)",
                      borderRadius: 8,
                      padding: "6px 14px",
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                      boxShadow: "0 2px 8px rgba(232,168,56,0.4)",
                      animation: "pulse 2s infinite",
                    }}>
                      ✓ ACTIVE
                    </span>
                  )}
                </div>
                {Object.entries(plan.meals).map(([mealType, foods]) => (
                  <div key={mealType} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 14 }}>{MEAL_ICONS[mealType]}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: 1 }}>{mealType}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, paddingLeft: 22 }}>
                      {foods.map((f, i) => {
                        const fd = FOOD_DB.find((x) => x.name === f);
                        return (
                          <span
                            key={i}
                            style={{
                              fontSize: 11,
                              padding: "4px 10px",
                              borderRadius: 8,
                              background: `${CATEGORIES_COLORS[fd?.category] || "#555"}15`,
                              border: `1px solid ${CATEGORIES_COLORS[fd?.category] || "#555"}30`,
                              color: CATEGORIES_COLORS[fd?.category] || "#aaa",
                              fontWeight: 500,
                            }}
                          >
                            {f.split("(")[0].trim()}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ===== PROGRESS TAB ===== */}
        {activeTab === "progress" && (
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Weekly Overview</h2>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 20, marginTop: 0 }}>
              Track consistency to stay on course
            </p>

            {/* Calorie bars */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 20,
              padding: 20,
              marginBottom: 16,
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Daily Calories</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
                {weekLog.map((d, i) => {
                  const h = d.cal ? (d.cal / 2200) * 120 : 4;
                  const isToday = i === 6;
                  return (
                    <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      {d.cal > 0 && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>{d.cal}</span>}
                      <div style={{
                        width: "100%",
                        height: h,
                        borderRadius: 8,
                        background: isToday
                          ? "linear-gradient(180deg, rgba(232,168,56,0.3), rgba(232,168,56,0.1))"
                          : d.cal >= userGoal.cal * 0.9 && d.cal <= userGoal.cal * 1.1
                            ? "linear-gradient(180deg, rgba(102,187,106,0.4), rgba(102,187,106,0.15))"
                            : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
                        border: isToday ? "1px solid rgba(232,168,56,0.3)" : "1px solid rgba(255,255,255,0.05)",
                        transition: "height 0.5s ease",
                      }} />
                      <span style={{ fontSize: 11, fontWeight: isToday ? 800 : 500, color: isToday ? "#E8A838" : "rgba(255,255,255,0.35)" }}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
              {/* Goal line indicator */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
                <div style={{ width: 12, height: 3, borderRadius: 2, background: "rgba(102,187,106,0.5)" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>Within goal range</span>
              </div>
            </div>

            {/* Protein bars */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: 20,
              padding: 20,
              marginBottom: 16,
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <h3 style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1.5 }}>Daily Protein</h3>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 130 }}>
                {weekLog.map((d, i) => {
                  const h = d.protein ? (d.protein / 160) * 110 : 4;
                  const isToday = i === 6;
                  return (
                    <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      {d.protein > 0 && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>{d.protein}g</span>}
                      <div style={{
                        width: "100%",
                        height: h,
                        borderRadius: 8,
                        background: isToday
                          ? "linear-gradient(180deg, rgba(224,85,85,0.3), rgba(224,85,85,0.1))"
                          : d.protein >= userGoal.protein
                            ? "linear-gradient(180deg, rgba(224,85,85,0.4), rgba(224,85,85,0.15))"
                            : "linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
                        border: isToday ? "1px solid rgba(224,85,85,0.3)" : "1px solid rgba(255,255,255,0.05)",
                      }} />
                      <span style={{ fontSize: 11, fontWeight: isToday ? 800 : 500, color: isToday ? "#E05555" : "rgba(255,255,255,0.35)" }}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Avg Calories", value: Math.round(weekLog.filter(d => d.cal).reduce((a, d) => a + d.cal, 0) / weekLog.filter(d => d.cal).length) || 0, unit: "kcal", color: "#E8A838" },
                { label: "Avg Protein", value: Math.round(weekLog.filter(d => d.protein).reduce((a, d) => a + d.protein, 0) / weekLog.filter(d => d.protein).length) || 0, unit: "g", color: "#E05555" },
                { label: "Days Tracked", value: weekLog.filter(d => d.cal > 0).length, unit: "/ 7", color: "#66BB6A" },
                { label: "Goal Hit Rate", value: Math.round((weekLog.filter(d => d.cal >= userGoal.cal * 0.9 && d.cal <= userGoal.cal * 1.1).length / 7) * 100), unit: "%", color: "#5B9FE8" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 16,
                    padding: 16,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: 1.5 }}>{s.label}</span>
                  <div style={{ marginTop: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 900, color: s.color, fontFamily: "'Space Mono', monospace" }}>{s.value}</span>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginLeft: 4 }}>{s.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ===== FOOD SEARCH MODAL ===== */}
      {showFoodModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            background: "#111118",
            borderRadius: "24px 24px 0 0",
            marginTop: 60,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {/* Modal header */}
            <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#fff" }}>
                  Add to {activeMeal} {MEAL_ICONS[activeMeal]}
                </h2>
                <button
                  onClick={() => { setShowFoodModal(false); setSearchQuery(""); setFilterCategory("All"); }}
                  style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 10, width: 36, height: 36, color: "#fff", fontSize: 16, cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>
              {/* Search */}
              <input
                type="text"
                placeholder="Search foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  color: "#fff",
                  fontSize: 14,
                  outline: "none",
                  fontFamily: "'Outfit', sans-serif",
                  boxSizing: "border-box",
                }}
              />
              {/* Category filter */}
              <div style={{ display: "flex", gap: 6, marginTop: 12, overflowX: "auto", paddingBottom: 4 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 10,
                      border: "none",
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      fontFamily: "'Outfit', sans-serif",
                      background: filterCategory === cat
                        ? CATEGORIES_COLORS[cat] || "#E8A838"
                        : "rgba(255,255,255,0.04)",
                      color: filterCategory === cat
                        ? "#000000"
                        : "rgba(255,255,255,0.4)",
                      borderWidth: 2,
                      borderStyle: "solid",
                      borderColor: filterCategory === cat
                        ? CATEGORIES_COLORS[cat] || "#E8A838"
                        : "rgba(255,255,255,0.05)",
                      boxShadow: filterCategory === cat
                        ? `0 2px 8px ${CATEGORIES_COLORS[cat] || "#E8A838"}40`
                        : "none",
                      transform: filterCategory === cat ? "scale(1.05)" : "scale(1)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            {/* Food list */}
            <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
              {filteredFoods.map((food) => (
                <button
                  key={food.name}
                  onClick={() => { addFood(food); }}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: 14,
                    marginBottom: 8,
                    cursor: "pointer",
                    textAlign: "left",
                    color: "#fff",
                    fontFamily: "'Outfit', sans-serif",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "rgba(255,255,255,0.02)"; }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 3, background: CATEGORIES_COLORS[food.category] }} />
                      <span style={{ fontSize: 14, fontWeight: 600 }}>{food.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, paddingLeft: 14 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{food.cal} cal</span>
                      <span style={{ fontSize: 11, color: "#E05555" }}>{food.protein}g P</span>
                      <span style={{ fontSize: 11, color: "#E8A838" }}>{food.carbs}g C</span>
                      <span style={{ fontSize: 11, color: "#5B9FE8" }}>{food.fat}g F</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 20, color: "rgba(232,168,56,0.5)" }}>+</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== GOAL EDIT MODAL ===== */}
      {showGoalEdit && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(10px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
        }}>
          <div style={{
            background: "#16161f",
            borderRadius: 24,
            padding: 28,
            width: "100%",
            maxWidth: 380,
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <h2 style={{ margin: "0 0 20px", fontSize: 20, fontWeight: 800 }}>Daily Goals</h2>
            {[
              { key: "cal", label: "Calories (kcal)", color: "#E8A838" },
              { key: "protein", label: "Protein (g)", color: "#E05555" },
              { key: "carbs", label: "Carbs (g)", color: "#D4A053" },
              { key: "fat", label: "Fat (g)", color: "#5B9FE8" },
            ].map((g) => (
              <div key={g.key} style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 11, fontWeight: 700, color: g.color, textTransform: "uppercase", letterSpacing: 1.5 }}>{g.label}</label>
                <input
                  type="number"
                  value={userGoal[g.key]}
                  onChange={(e) => setUserGoal((prev) => ({ ...prev, [g.key]: parseInt(e.target.value) || 0 }))}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    marginTop: 6,
                    background: "rgba(255,255,255,0.05)",
                    border: `1px solid ${g.color}30`,
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: 700,
                    fontFamily: "'Space Mono', monospace",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            ))}
            <button
              onClick={async () => {
                try {
                  await apiService.updateGoals(userGoal);
                  setShowGoalEdit(false);
                } catch (err) {
                  console.error('Failed to save goals:', err);
                  alert('Failed to save goals. Please try again.');
                }
              }}
              style={{
                width: "100%",
                padding: 14,
                background: "linear-gradient(135deg, #E8A838, #E05555)",
                border: "none",
                borderRadius: 14,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "'Outfit', sans-serif",
                marginTop: 8,
              }}
            >
              Save Goals
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
