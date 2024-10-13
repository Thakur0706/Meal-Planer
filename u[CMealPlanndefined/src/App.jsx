import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('');
  const [diet, setDiet] = useState('');
  const [mealPlan, setMealPlan] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!weight || !goal || !diet) {
      alert('Please fill in all the fields');
      return;
    }

    const calorieIntake = calculateCalories(weight, goal);
    const proteinIntake = calculateProtein(weight);

    const plan = generateMealPlan(diet, calorieIntake, proteinIntake, weight);
    setMealPlan(plan);
  };

  const calculateCalories = (weight, goal) => {
    const maintenanceCalories = weight * 30; // Simple maintenance calculation
    return goal === 'bulk'
      ? maintenanceCalories + 500
      : maintenanceCalories - 500;
  };

  const calculateProtein = (weight) => {
    return weight * 2; // 2g protein per kg body weight
  };

  const adjustPortion = (portionSize, weight) => {
    return Math.round((portionSize * weight) / 70); // Adjust portions for a standard 70kg weight and round
  };

  const generateMealPlan = (diet, calories, protein, weight) => {
    const weightRanges = {
      '50-70': {
        vegetarian: {
          breakfast: [
            `Oatmeal (${adjustPortion(50, weight)}g) with peanut butter (${adjustPortion(30, weight)}g) and banana`,
            `Greek yogurt (${adjustPortion(150, weight)}g) with honey (${adjustPortion(20, weight)}g) and berries`,
          ],
          lunch: [
            `Lentil soup (${adjustPortion(200, weight)}g) with quinoa (${adjustPortion(100, weight)}g) and vegetables`,
            `Chickpea salad with olive oil dressing and avocado (${adjustPortion(100, weight)}g)`,
          ],
          dinner: [
            `Tofu stir-fry with brown rice (${adjustPortion(150, weight)}g) and broccoli (${adjustPortion(200, weight)}g)`,
            `Paneer curry with whole wheat bread (${adjustPortion(100, weight)}g) and spinach (${adjustPortion(150, weight)}g)`,
          ],
          snacks: [
            `Almonds (${adjustPortion(50, weight)}g)`,
            `Protein shake with oats (${adjustPortion(30, weight)}g)`,
          ],
        },
        nonVegetarian: {
          breakfast: [
            `Scrambled eggs (${adjustPortion(3, weight)} eggs) with whole wheat toast`,
            `Protein shake with oats (${adjustPortion(30, weight)}g) and peanut butter`,
          ],
          lunch: [
            `Grilled chicken breast (${adjustPortion(150, weight)}g) with brown rice (${adjustPortion(100, weight)}g) and veggies`,
            `Turkey sandwich with avocado (${adjustPortion(100, weight)}g) on whole grain bread`,
          ],
          dinner: [
            `Salmon (${adjustPortion(150, weight)}g) with sweet potatoes (${adjustPortion(200, weight)}g) and green beans`,
            `Beef stir-fry with mixed veggies and quinoa (${adjustPortion(100, weight)}g)`,
          ],
          snacks: [
            `Boiled eggs (${adjustPortion(2, weight)} eggs) with almonds (${adjustPortion(30, weight)}g)`,
            `Protein shake with peanut butter`,
          ],
        },
      },
      '70-90': {
        vegetarian: {
          breakfast: [
            `Chia pudding (${adjustPortion(100, weight)}g) with berries`,
            `Smoothie bowl with spinach and banana`,
          ],
          lunch: [
            `Brown rice and black bean bowl (${adjustPortion(200, weight)}g)`,
            `Vegetable sushi rolls`,
          ],
          dinner: [
            `Chickpea curry with basmati rice (${adjustPortion(200, weight)}g)`,
            `Zucchini noodles with marinara sauce`,
          ],
          snacks: [
            `Trail mix (${adjustPortion(50, weight)}g)`,
            `Hummus with carrot sticks`,
          ],
        },
        nonVegetarian: {
          breakfast: [
            `Omelette with vegetables (${adjustPortion(3, weight)} eggs)`,
            `Protein smoothie with oats`,
          ],
          lunch: [
            `Turkey burger with whole grain bun (${adjustPortion(150, weight)}g)`,
            `Chicken caesar salad`,
          ],
          dinner: [
            `Pork stir-fry with mixed vegetables (${adjustPortion(200, weight)}g)`,
            `Grilled shrimp tacos`,
          ],
          snacks: [
            `Cottage cheese with pineapple`,
            `Peanut butter on whole grain toast`,
          ],
        },
      },
      '90-110': {
        vegetarian: {
          breakfast: [
            `Avocado toast (${adjustPortion(100, weight)}g) with poached eggs`,
            `Fruit smoothie with protein powder`,
          ],
          lunch: [
            `Stuffed portobello mushrooms (${adjustPortion(2, weight)} mushrooms)`,
            `Vegetarian burrito bowl`,
          ],
          dinner: [
            `Vegetable paella (${adjustPortion(250, weight)}g)`,
            `Mushroom risotto`,
          ],
          snacks: [
            `Nut butter with apple slices`,
            `Energy balls`,
          ],
        },
        nonVegetarian: {
          breakfast: [
            `Breakfast burrito with eggs and sausage`,
            `Greek yogurt with granola (${adjustPortion(150, weight)}g)`,
          ],
          lunch: [
            `Chicken stir-fry with quinoa`,
            `Steak salad with mixed greens`,
          ],
          dinner: [
            `Baked cod with asparagus (${adjustPortion(200, weight)}g)`,
            `Chicken Alfredo pasta`,
          ],
          snacks: [
            `Jerky with almonds`,
            `Fruit and nut bars`,
          ],
        },
      },
      '110-130': {
        vegetarian: {
          breakfast: [
            `Smoothie with spinach, banana, and protein powder`,
            `Overnight oats with nuts and berries`,
          ],
          lunch: [
            `Quinoa and roasted vegetable bowl`,
            `Stuffed zucchini boats`,
          ],
          dinner: [
            `Vegetable lasagna`,
            `Chickpea and vegetable stew`,
          ],
          snacks: [
            `Homemade protein bars`,
            `Mixed seeds and nuts`,
          ],
        },
        nonVegetarian: {
          breakfast: [
            `Three-egg omelette with cheese and vegetables`,
            `Protein pancakes with maple syrup`,
          ],
          lunch: [
            `Grilled chicken salad with quinoa`,
            `Bacon-wrapped asparagus`,
          ],
          dinner: [
            `Ribeye steak with mashed potatoes`,
            `Chicken curry with rice`,
          ],
          snacks: [
            `String cheese with apple`,
            `Nut butter on rice cakes`,
          ],
        },
      },
    };

    let selectedPlan;
    if (weight < 70) {
      selectedPlan = weightRanges['50-70'];
    } else if (weight < 90) {
      selectedPlan = weightRanges['70-90'];
    } else if (weight < 110) {
      selectedPlan = weightRanges['90-110'];
    } else {
      selectedPlan = weightRanges['110-130'];
    }

    return {
      calories,
      protein,
      meals: selectedPlan[diet],
    };
  };

  return (
    <div>
      <h1>CalorieCraft</h1>
      <h1 className='h123'>Tailored Meals for a Healthier You!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Select your goal:
          <select value={goal} onChange={(e) => setGoal(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="cut">Cut</option>
            <option value="bulk">Bulk</option>
          </select>
        </label>
        <br />
        <label>
          Select your diet:
          <select value={diet} onChange={(e) => setDiet(e.target.value)} required>
            <option value="">--Select--</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="nonVegetarian">Non-Vegetarian</option>
          </select>
        </label>
        <br />
        <button type="submit">Generate Meal Plan</button>
      </form>

      {mealPlan && (
        <div>
          <h2>Your Meal Plan</h2>
          <p>Calories: {mealPlan.calories} kcal</p>
          <p>Protein: {mealPlan.protein} g</p>
          <h3>Meals</h3>
          <p><strong>Breakfast:</strong> {mealPlan.meals.breakfast.join(' or ')}</p>
          <p><strong>Lunch:</strong> {mealPlan.meals.lunch.join(' or ')}</p>
          <p><strong>Dinner:</strong> {mealPlan.meals.dinner.join(' or ')}</p>
          <p><strong>Snacks:</strong> {mealPlan.meals.snacks.join(' or ')}</p>
        </div>
      )}
    </div>
  );
};

export default App;
