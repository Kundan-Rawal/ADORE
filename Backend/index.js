import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import {Pool} from "pg";
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://adore-two.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false, // required for Neon
        },
})

async function testDBConnection() {
    try {
        const client = await pool.connect();
        console.log("Connected to the database successfully.");
        client.release();
       }
    catch(e){
        console.error("Database connection error:", e);
    }
}
testDBConnection();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});





app.get('/services', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/news', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM news');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/register', async (req, res) => {
    const { id, name, email,password,phone } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const alreadyExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(alreadyExists.rows.length > 0){
            return res.status(400).json({error: 'Email already registered'});
        }else{
            await pool.query('INSERT INTO users (id, name, email, password, phone) VALUES ($1, $2, $3, $4, $5)', [id, name, email,hashedPassword,phone]);
        res.json({message: 'User registered successfully'});
        }
    }catch(e){
        res.status(500).json({error: 'Internal Server Error'});
        console.error('Error registering user:', e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(userResult.rows.length === 0){
            return res.status(400).json({error: 'Invalid email or password'});
        }
        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({error: 'Invalid email or password'});
        }
        const payload = {
        email: email,
        };
        const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
        res.send({jwtToken});
    }catch(e){
        res.status(500).json({error: 'Internal Server Error'});
        console.error('Error during login:', e);
    }
});


app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const id = uuidv4();

    await pool.query(
      "INSERT INTO messages (id, name, email, message) VALUES ($1, $2, $3, $4)",
      [id, name, email, message]
    );

    res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error inserting message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
