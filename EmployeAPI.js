Q1. Create Employee Database rest API by referring to the below schema as a sample. You can
add additional fields if required as per your design.
{name:String,
employeeId:Number,
position:String,
Salary:Number,
hasHealthInsurance:Boolean,
} 
create rest API using mongoose
get all employees, add employees, remove employees,update employees


const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: Number,
        required: true
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
        required: true
    },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;

// Get all Employees

app.get('/api/employees', (req, res) => {
    Employee.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(404).json({ success: false }));
});

// Add an Employee

app.post('/api/employees', (req, res) => {
    const newEmployee = new Employee({
        name: req.body.name,
        employeeId: req.body.employeeId,
        position: req.body.position,
        salary: req.body.salary,
        hasHealthInsurance: req.body.hasHealthInsurance
    });

    newEmployee
        .save()
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update an Employee

app.put('/api/employees/:id', (req, res) => {
    Employee.findById(req.params.id)
        .then(employee => {
            employee.name = req.body.name;
            employee.employeeId = req.body.employeeId;
            employee.position = req.body.position;
            employee.salary = req.body.salary;
            employee.hasHealthInsurance = req.body.hasHealthInsurance;

            employee
                .save()
                .then(() => res.json('Employee updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Remove an Employee

app.delete('/api/employees/:id', (req, res) => {
    Employee.findByIdAndDelete(req.params.id)
        .then(() => res.json('Employee deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
