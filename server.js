const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to read form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve your frontend files
app.use(express.static("public"));

// Home route (optional)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Test route
app.get("/test", (req, res) => {
    res.send("PhysioFlex backend is working!");
});

// Booking form route (we'll connect your form later)
app.post("/book", (req, res) => {

    const booking = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        submittedAt: new Date()
    };

    let bookings = [];

    try {
        const data = fs.readFileSync("bookings.json", "utf8");
        bookings = JSON.parse(data);
    } catch (err) {
        bookings = [];
    }

    bookings.push(booking);

    fs.writeFileSync(
        "bookings.json",
        JSON.stringify(bookings, null, 2)
    );

    console.log("New Booking Saved:", booking);

    res.send(`
        <html>
        <head>
            <title>Booking Confirmed</title>

            <style>
            body{
                margin:0;
                min-height:100vh;
                display:flex;
                justify-content:center;
                align-items:center;
                font-family:Poppins, Arial, sans-serif;
                background:linear-gradient(
                    135deg,
                    #020b2d 0%,
                    #04133f 50%,
                    #07253a 100%
                );
            }

            .card{
                width:500px;
                max-width:90%;
                background:rgba(255,255,255,0.06);
                backdrop-filter:blur(20px);
                border:1px solid rgba(255,255,255,0.1);
                border-radius:24px;
                padding:50px;
                text-align:center;
                color:white;
            }

            .home-btn{
                display:inline-block;
                margin-top:25px;
                padding:14px 30px;
                background:#18d1c0;
                color:#02122d;
                text-decoration:none;
                border-radius:12px;
                font-weight:600;
            }
            </style>

        </head>

        <body>

            <div class="card">
                <div style="font-size:60px;">✓</div>

                <h1>Consultation Request Received</h1>

                <p>
                    Thank you for choosing PhysioFlex.
                    Our specialists will contact you shortly.
                </p>

                <a href="/" class="home-btn">
                    Return to Website
                </a>
            </div>

        </body>
        </html>
    `);

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});