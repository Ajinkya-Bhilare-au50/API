Q1. Create Employee Database API by referring to the below schema as a sample. You can
add additional fields if required as per your design.
{name:String,
employeeId:Number,
position:String,
Salary:Number,
hasHealthInsurance:Boolean,
} 
1. Based on the above sample schema, create a Mongoose Schema and Model.
2. After creating the required models, create a REST API for TODO APP. Using the API, an
end-user should be able to do all the CRUD operations(Add Employee, Edit Employee, Delete
Employee, Get All Employee data, etc. 
3. When the employee data is added has Health Insurance should always be false. Create a
separate PUT route ‘/employee/:employeeId/update Insurance’ to change the value from false to
true and vice-versa. 

Answer:

1. Based on the above sample schema, create a Mongoose Schema and Model:

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: Number,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    hasHealthInsurance: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

2. After creating the required models, create a REST API for TODO APP. Using the API, an end-user should be able to do all the CRUD operations(Add Employee, Edit Employee, Delete Employee, Get All Employee data, etc.

// Add Employee
router.post("/", (req, res) => {
    const { name, employeeId, position, salary } = req.body;

    const employee = new Employee({
        name,
        employeeId,
        position,
        salary,
    });

    employee.save()
        .then(() => res.status(201).json({ message: "Employee has been added successfully" }))
        .catch(err => res.status(400).json({ message: err.message }));
});

// Edit Employee
router.put("/:employeeId", (req, res) => {
    const { name, employeeId, position, salary } = req.body;

    Employee.findByAndUpdate(
        { employeeId }, 
        { name, position, salary },
        { new: true }
    )
        .then(employee => res.status(200).json({ message: "Employee has been updated successfully" }))
        .catch(err => res.status(400).json({ message: err.message }));
});

// Delete Employee
router.delete("/:employeeId", (req, res) => {
    const { employeeId } = req.params;

    Employee.findByAndDelete({ employeeId })
        .then(() => res.status(200).json({ message: "Employee has been deleted successfully" }))
        .catch(err => res.status(400).json({ message: err.message }));
});

// Get All Employee Data
router.get("/", (req, res) => {
    Employee.find()
        .then(employees => res.status(200).json({ data: employees }))
        .catch(err => res.status(400).json({ message: err.message }));
});

3. When the employee data is added has Health Insurance should always be false. Create a separate PUT route ‘/employee/:employeeId/update Insurance’ to change the value from false to true and vice-versa.

router.put("/:employeeId/updateInsurance", (req, res) => {
    const { employeeId } = req.params;
    const { hasHealthInsurance } = req.body;

    Employee.findByAndUpdate(
        { employeeId },
        { hasHealthInsurance },
        { new: true }
    )
        .then(employee => res.status(200).json({ message: "Insurance status has been updated successfully" }))
        .catch(err => res.status(400).json({ message: err.message }));
});
