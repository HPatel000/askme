const express = require('express')
const connectDB = require('./config/db');

const app = express();
// connect db
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {

});

// define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/answers', require('./routes/answers'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port : ${PORT}`)); 