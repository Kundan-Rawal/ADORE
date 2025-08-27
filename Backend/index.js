import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {Pool} from "pg";

dotenv.config();
const app = express();
app.use(cors());
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



app.get('/', (req, res) => {
    res.send('Hello World!');
});


