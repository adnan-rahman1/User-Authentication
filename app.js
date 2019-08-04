const express = require('express');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');

const morgan = require('morgan');
const dotenv = require('dotenv');

// Controller
const homeController = require('./controller/homeController');
const loginController = require('./controller/signInController');
const registerController = require('./controller/signUpController');
const authController = require('./controller/authController');
// END

const app = express();

dotenv.config();
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

// Database Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => console.log('database connected successfully'))
  .catch(err => console.log('failed to connect to the database'));
// END


app.get('/', authController, homeController);
app.get('/signup', registerController);
app.use('/signin', authController, loginController);


const port = 4000 | process.env.PORT;
app.listen(port, () => console.log(`Server is running at port ${port}`))