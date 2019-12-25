const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const seeder = require('./config/seeder');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.set('json replacer', (key, value) => {
    if(key === 'Password') return undefined;
    return value;
});


app.use('/users', usersRouter);

const PORT = 5000;

db.sequelize.sync().then(() => {
    seeder.seedData(db);
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
});