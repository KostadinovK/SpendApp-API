const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const db = require('./models/index');
const seeder = require('./config/seeder');
const usersRouter = require('./routes/users');
const currenciesRouter = require('./routes/currencies');
const paymentCategoriesRouter = require('./routes/paymentCategories');
const incomeCategoriesRouter = require('./routes/incomeCategories');
const budgetsRouter = require('./routes/budgets');
const paymentsRouter = require('./routes/payments');
const incomesRouter = require('./routes/incomes');

const app = express();

let whitelist = ['http://127.0.0.1:5501', 'https://kostadinovk.github.io'];

let corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

app.use(cors(corsOptions));

app.use(cookieParser('secret'))
app.use(express.json());

app.set('json replacer', (key, value) => {
    if(key === 'Password') return undefined;
    return value;
});


app.use('/users', usersRouter);
app.use('/currencies', currenciesRouter);
app.use('/paymentCategories', paymentCategoriesRouter);
app.use('/incomeCategories', incomeCategoriesRouter);
app.use('/budgets', budgetsRouter);
app.use('/payments', paymentsRouter);
app.use('/incomes', incomesRouter);

const PORT = 5000;

db.sequelize.sync().then(() => {
    seeder.seedData(db);
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
});