const express = require('express');
const EmployeeModel = require('../model/employee.model');
const employeeRouter = express.Router();
const jwt = require('jsonwebtoken');

employeeRouter.get("/", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "mock12");
        console.log(decoded);
        res.send(decoded);
        if (decoded) {
            const emp = await EmployeeModel.find({ "userId": decoded.employeeUserId });
            res.status(200).send({ "msg": emp })
        }
    } catch (err) {
        console.log(err);
        res.status(400).send({ "Msg": err.message });
    }
});

employeeRouter.post("/add",async(req,res)=>{
    try{
        const employees = new EmployeeModel(req.body);
        await employees.save();
        res.status(200).send({"msg":"employee has been posted successfully"})
    }
    catch(e){console.log(e);}
})

employeeRouter.patch("/update/:empId",async(req,res)=>{
    const { empId } = req.params;
    const payload = req.body;
    try {
        const emp = EmployeeModel.updateOne({ _id: empId }, payload);
        await emp.save();
        res.status(200).send({ "msg": "employee has been Updated successfully" })
    }
    catch (err) {
        res.status(400).send({ "msg": err.message })
    } 
})

employeeRouter.delete("/delete/:empId", async (req, res) => {
    const { empId } = req.params;
    try {
        await EmployeeModel.deleteOne({ _id: empId });
        res.status(200).send({ "msg": "employee has been Deleted successfully" })
    }
    catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

module.exports = employeeRouter;