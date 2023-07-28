const express = require('express');
const bodyParser = require('body-parser');
const { noteRoutes } = require('./Routes/noteRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/notes', noteRoutes);

app.use((err, req, res, next) => {
    res.json({ 
        message: err.message 
    });
});

app.listen(8002, () => {
    console.log('Server started on port 8002 (http://localhost:8002/)')
}
);
