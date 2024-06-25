const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let users = {}; 

app.post('/request-password-reset', (req, res) => {
    const { email } = req.body;
    const user = users[email];

    if (!user) {
        return res.status(400).send('User not found');
    }

    
    res.send({ message: 'User found', email });
});

app.post('/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    if (!users[email]) {
        return res.status(400).send('User not found');
    }

    users[email].password = newPassword;
    res.send('Password has been reset');
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    if (users[email]) {
        return res.status(400).send('User already exists');
    }
    users[email] = { password };
    res.send('User registered');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
