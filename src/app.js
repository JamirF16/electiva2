require('dotenv').config();
require('./utils/auth/');
const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
app.use(require('./routes/auth.routes'));

const PORT = process.env.PORT;
app.listen(PORT, ()=>{console.log(`SERVER ON PORT: ${PORT}`)});



