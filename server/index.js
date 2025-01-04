const express = require('express');
const cors = require('cors');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb'}));

app.get('/', (req, res) => {
    console.info("Recieved request from client", req);
    res.json({message: "Auth successful. Grader instantiated."});
})

app.listen(port, () => {
    console.info(`Server listening on port ${port}`);
})