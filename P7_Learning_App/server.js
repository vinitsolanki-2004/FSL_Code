const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

let courses = [
    {
        id: 1,
        name: "JavaScript Basics",
        description: "Learn the fundamentals of JavaScript",
        price: 100,
    },
    {
        id: 2,
        name: "Python for Data Science",
        description: "Analyze data with Python",
        price: 150,
    },
    {
        id: 3,
        name: "React Advanced",
        description: "Master React for web development",
        price: 120,
    },
];

app.get("/", (req, res) => {
    res.send("Welcome to the Course API!");
});

app.get("/courses", (req, res) => {
    res.json(courses);
});

app.post("/courses", (req, res) => {
    const { name, description, price } = req.body;
    const newCourse = { id: Date.now(), name, description, price };
    courses.push(newCourse);
    res.json(newCourse);
});

app.put("/courses/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const course = courses.find((c) => c.id == id);

    if (course) {
        course.name = name;
        course.description = description;
        course.price = price;
        res.json(course);
    } else {
        res.status(404).json({ message: "Course not found" });
    }
});

app.delete("/courses/:id", (req, res) => {
    const { id } = req.params;
    courses = courses.filter((c) => c.id != id);
    res.json({ message: "Course deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});