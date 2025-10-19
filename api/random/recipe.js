const axios = require('axios');

const meta = {
  name: 'Recipe',
  path: '/recipe',
  method: 'get',
  category: 'random'
};

async function onStart({ req, res }) {
  try {
    const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
    const meal = response.data.meals[0];
    const ingredients = [];
    
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
      }
    }
    
    res.json({
      name: meal.strMeal,
      category: meal.strCategory,
      instructions: meal.strInstructions,
      ingredients
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
}

module.exports = { meta, onStart };