import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from './routes/auth.js';
import hotelRouter from './routes/hotel.js';
import roomRouter from './routes/room.js';
import userRouter from './routes/users.js';
import tourTypeRoutes from './routes/tour_type.js';
import facilityRoutes from './routes/facility.js';
import destinationRoutes from './routes/destination.js';
import packageRoutes from './routes/package.js';
import packageListRoutes from './routes/packageList.js';
import customizePackageRoutes from './routes/customizePackage.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import  Voucher  from "./routes/voucher.js";

const app = express();
dotenv.config();


app.use(cors({
  origin: ['https://travel-admin-jj81.vercel.app',"https://travel.lpgexpress.com.pk", 'http://localhost:3000'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));


 // Enable preflight for all routes

app.use(express.json());
app.use(cookieParser());

// Define routes with /api prefix
app.use('/api/auth', authRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
app.use('/api/tours', tourTypeRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/destination', destinationRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/packageList', packageListRoutes);
app.use("/api/customizePackage", customizePackageRoutes);
app.use('/api/voucher', Voucher);



// MongoDB connection function
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

// MongoDB connection 
connect();

// Root route for testing
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Vercel!' });
});



mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for Vercel
export default app;
