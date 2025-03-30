require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    interests: [String]
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.send(user);
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

app.listen(5000, () => console.log('Wangu backend running on port 5000'));