const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // IMPORTANT

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    // 🔥 FIXED IP (works on Render also)
    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.socket.remoteAddress ||
        req.ip;

    // 🔥 DEVICE INFO
    const userAgent = req.headers["user-agent"] || "Unknown Device";

    const time = new Date().toLocaleString();

    const data = `
Time: ${time}
IP: ${ip}
Device: ${userAgent}
Name: ${name}
Email: ${email}
Message: ${message}
-------------------------
`;

    console.log(data); // 🔥 SEE IN RENDER LOGS

    fs.appendFile("messages.txt", data, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error saving data");
        }
        res.send("Saved successfully");
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
