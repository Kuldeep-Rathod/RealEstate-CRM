import app from "./app.js";

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(Number(PORT), "0.0.0.0", () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
