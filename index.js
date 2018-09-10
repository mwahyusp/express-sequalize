//--------------------------------------------------------------------------------------------------
//App Config
const PORT = 3000;

//--------------------------------------------------------------------------------------------------
//Load package dependency
const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded

//--------------------------------------------------------------------------------------------------
//Sequelize config
const Sequelize = require('sequelize');
const sequelize = new Sequelize('employees', 'root', 'myrootpassword', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
});

//--------------------------------------------------------------------------------------------------
//Create SequelizeJs Model
const Employees = sequelize.define('employees', {
    emp_no: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    birth_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING(14),
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING(16),
        allowNull: false
    },
    gender: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false
    },
    hire_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: false
});


//--------------------------------------------------------------------------------------------------
//API Response
app.get("/", (req, res) => {
    res.send({
        name: "API Project 3",
        version: "1.0.0",
        author: "John Doe"
    });
});

app.get("/employees", (req, res) => {
    Employees.findAll({
        limit: 100
    }).then(employee => {
        if (employee === null) {
            return res.send({
                message: "data not fund"
            })
        }
        res.send({
            data: employee
        })
    })
});

app.get("/employees/:emp_no", (req, res) => {
    req.params.emp_no = JSON.parse(req.params.emp_no)
    Employees.findOne({
        where: {
            emp_no: req.params.emp_no
        }
    }).then(employee => {
        if (employee === null) {
            return res.send({
                message: "data not fund"
            })
        }

        res.send({
            data: employee
        })
    })
});

//Run app and console log notif
app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`))