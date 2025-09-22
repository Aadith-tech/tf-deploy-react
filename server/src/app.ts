import express from 'express';
import cors from 'cors';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticPath = path.join(__dirname);

app.use(express.static(staticPath));

const PORT = 3000;

app.get('/getRecipie', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.themealdb.com/api/json/v1/1/random.php',
    );
    const data = response.data;
    const result = [
      {
        id: data.meals[0].idMeal,
        name: data.meals[0].strMeal,
        category: data.meals[0].strCategory,
        area: data.meals[0].strArea,
        instructions: data.meals[0].strInstructions,
      },
    ];
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch recipe ${error}` });
  }
});

app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
