const express = require('express');
const connection = require('./db');
const userRouter = require('./routes/user.route');
const { auth } = require('./middleware/auth.middleware');
const employeeRouter = require('./routes/employee.route');
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use(auth);
app.use("/employee",employeeRouter);
app.listen(7700, async () => {
    try {
        console.log('server running at port 7700');
        await connection;
    }
    catch (err) {
        console.log(err.message);
    }
})
