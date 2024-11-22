const express = require("express");

const app = express();

app.use(express.json());

let data = [
    {
        id: 1,
        price: 50000,
        value: "Laptop"
    },
    {
        id: 2,
        price: 20000,
        value: "Mobile"
    },
    {
        id: 3,
        price: 5000,
        value: "Headphones"
    },
    {
        id: 4,
        price: 2500,
        value: "Watch"
    }
];

app.get("/product", (req, res) => {
    res.json(data)
});

app.post("/product", (req, res) => {
    const { value } = req.body
    const newItem = { id: Date.now(), value };
    data.push(newItem);
    res.json(newItem);
});

app.put("/product/:id", (req, res) => {
    const { id } = req.params
    const { value } = req.body

    const item = data.find(i => i.id == id);

    if (item) {
        item.value = value;
        res.json(item);
    }
    else {
        res.status(404).json({ message: "Item not found" })
    }
});

app.delete("/product/:id", (req, res) => {
    const { id } = req.params
    data = data.filter((i) => i.id != id);
    res.json({ message: "Item Deleted" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000")
});
