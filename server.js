import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

console.log("Admin password loaded:", !!process.env.ADMIN_PASSWORD);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
}));

// ================= CARS =================

const cars = [
    {
        id: 1,
        name: "Porsche GT3 RS",
        category: "Sports",
        price: 2500,
        image: "/images/cars/porsche.webp",
        featured: true,
    },
    {
        id: 2,
        name: "Lamborghini Huracán",
        category: "Supercar",
        price: 3200,
        image: "/images/cars/lamborghini.webp",
        featured: true,
    },
    {
        id: 3,
        name: "Mercedes AMG G63",
        category: "SUV",
        price: 1800,
        image: "/images/cars/mercedes.webp",
        featured: true,
    },
    {
        id: 4,
        name: "Ferrari F8",
        category: "Supercar",
        price: 3500,
        image: "/images/cars/ferrari.webp",
        featured: true,
    },
    {
        id: 5,
        name: "Audi R8",
        category: "Sports",
        price: 2000,
        image: "/images/cars/audi.webp",
        featured: true,
    },
    {
        id: 6,
        name: "BMW M4",
        category: "Sports",
        price: 1200,
        image: "/images/cars/bmw.webp",
        featured: true,
    },
];

// ================= BOOKINGS =================

const bookings = [];

// ================= ADMIN AUTH =================

const requireAdmin = (req, res, next) => {
    const password = req.headers.authorization;

    if (
        !process.env.ADMIN_PASSWORD ||
        password !== `Bearer ${process.env.ADMIN_PASSWORD}`
    ) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }

    res.setHeader("Cache-Control", "no-store");

    next();
};

// ================= GET ALL CARS =================

app.get("/api/cars", (req, res) => {
    const featured = req.query.featured;

    if (featured === "true") {
        const featuredCars = cars.filter(
            (car) => car.featured === true
        );

        return res.status(200).json(featuredCars);
    }

    return res.status(200).json(cars);
});

// ================= GET INDIVIDUAL CAR =================

app.get("/api/cars/:id", (req, res) => {
    const id = Number(req.params.id);

    const car = cars.find((car) => car.id === id);

    if (!car) {
        return res.status(404).json({
            message: "Car not found!",
        });
    }

    return res.status(200).json(car);
});

// ================= CHECK AVAILABILITY =================

app.get("/api/cars/:id/availability", (req, res) => {
    const id = Number(req.params.id);

    const car = cars.find((car) => car.id === id);

    if (!car) {
        return res.status(404).json({
            message: "Car not found!",
        });
    }

    const pickup = new Date(req.query.pickup);
    const returnDate = new Date(req.query.returnDate);

    if (
        isNaN(pickup.getTime()) ||
        isNaN(returnDate.getTime())
    ) {
        return res.status(400).json({
            message: "Invalid dates",
        });
    }

    if (returnDate <= pickup) {
        return res.status(400).json({
            message: "Return date must be after pickup date",
        });
    }

    const days = (returnDate - pickup) / 86400000;
    const totalPrice = days * car.price;

    const alreadyBooked = bookings.some((booking) =>
        booking.carId === id &&
        pickup < new Date(booking.returnDate) &&
        returnDate > new Date(booking.pickup) &&
        booking.status === "confirmed"
    );

    return res.status(200).json({
        available: !alreadyBooked,
        days,
        totalPrice,
    });
});

// ================= CREATE BOOKING =================

app.post("/api/bookings", (req, res) => {
    const {
        carId,
        pickup,
        returnDate,
        name,
        email,
        phone,
    } = req.body || {};

    if (
        !carId ||
        !pickup ||
        !returnDate ||
        !name ||
        !email ||
        !phone
    ) {
        return res.status(400).json({
            message: "Invalid data",
        });
    }

    const car = cars.find(
        (car) => car.id === Number(carId)
    );

    if (!car) {
        return res.status(404).json({
            message: "Car not found!",
        });
    }

    const start = new Date(pickup);
    const end = new Date(returnDate);

    if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime())
    ) {
        return res.status(400).json({
            message: "Invalid dates",
        });
    }

    if (end <= start) {
        return res.status(400).json({
            message: "Return date must be after pickup date",
        });
    }

    // PREVENT DOUBLE BOOKINGS

    const alreadyBooked = bookings.some((booking) =>
        booking.carId === car.id &&
        start < new Date(booking.returnDate) &&
        end > new Date(booking.pickup) &&
        booking.status === "confirmed"
    );

    if (alreadyBooked) {
        return res.status(409).json({
            message: "This vehicle is already booked for the selected dates",
        });
    }

    // CALCULATE RENTAL PRICE

    const days = (end - start) / 86400000;
    const totalPrice = days * car.price;

    // CREATE RESERVATION

    const booking = {
        id: bookings.length + 1,
        carId: car.id,
        pickup,
        returnDate,
        name,
        email,
        phone,
        days,
        totalPrice,
        status: "confirmed",
    };

    bookings.push(booking);

    return res.status(201).json({
        message: "Booking confirmed successfully",
        booking,
    });
});

// ================= ADMIN: GET BOOKINGS =================

app.get("/api/bookings", requireAdmin, (req, res) => {
    return res.status(200).json(bookings);
});

// ================= ADMIN: CANCEL BOOKING =================

app.patch("/api/bookings/:id/cancel", requireAdmin, (req, res) => {
    const id = Number(req.params.id);

    const booking = bookings.find(
        (booking) => booking.id === id
    );

    if (!booking) {
        return res.status(404).json({
            message: "Booking not found",
        });
    }

    booking.status = "cancelled";

    return res.status(200).json({
        message: "Booking cancelled successfully",
        booking,
    });
});

// ================= START SERVER =================

app.listen(PORT, () => {
    console.log(
        `Server running on http://localhost:${PORT}`
    );
});