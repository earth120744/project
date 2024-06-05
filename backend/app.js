const express = require('express');
const cors = require('cors');
const app = express();
const roomRouter = require('./user'); 


const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions)); // ให้ใช้ cors ก่อนการใช้ Router

app.use(express.static('public'));
app.use(express.json())
app.use('/api', roomRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});