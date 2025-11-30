import app from "./app.js"; 
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
    const mode = process.env.NODE_ENV || 'development';
    console.log(`Server berjalan di Port ${PORT} dalam mode: ${mode.toUpperCase()}`);
});