const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // IMPORTANT

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    const data = `
Name: ${name}
Email: ${email}
Message: ${message}
-------------------------
`;

    fs.appendFile("messages.txt", data, (err) => {
        if (err) {
            return res.status(500).send("Error saving data");
        }
        res.send("Saved successfully");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));