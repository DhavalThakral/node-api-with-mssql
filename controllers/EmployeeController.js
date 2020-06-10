const { sql,poolPromise } = require('../database/db');
const fs = require('fs');

var rawData = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawData);

class EmployeeController {
    async getAllEmployees(req, res){
        try{
            const pool = await poolPromise;
            const result = await pool.request().query(queries.getAllData)
            res.json(result.recordset)
        } catch(error) {
            res.status(500)
            res.send(error.message)
        }
    }

    async addNewEmployee(req,res) {
        try{
            if(req.body.name != null && req.body.city != null) {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('Name',sql.VarChar, req.body.name)
                    .input('City',sql.VarChar, req.body.city)
                    .query(queries.addNewEmployee)
                    res.json(result)
            } else {
                res.status(400).send({
                    message : 'Please fill all the details!!!0'
                })
            }
        } catch(error) {
            res.status(500).send({
                message : error.message
            })
        }
    }

    async updateEmployeeDetails(req,res) {
        try {
            if(!req.body && !req.params.Id) {
                res.status(400).send({
                    message : 'Details can not be empty!!'
                });
            } else {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('id',sql.UniqueIdentifier, req.params.Id)
                    .input('name',sql.VarChar, req.body.name)
                    .input('city',sql.VarChar, req.body.city)
                    .query(queries.updateEmployee)
                    res.json(result)
            }
        } catch(error) {
            res.status(500).send({
                message : error.message
            })
        }
    }

    async deleteEmployee(req,res) {
        try {
            if(!req.body) {
                res.status(400).send({
                    message : 'Details can not be empty!!!'
                });
            } else {
                const pool = await poolPromise
                const result = await pool.request()
                    // .input('name',sql.VarChar, req.body.name)
                    .input('id',sql.UniqueIdentifier, req.params.Id)
                    .query(queries.deleteEmployee)
                    res.json(result);
            }
        } catch(error) {
            res.status(500).send({
                message : error.message
            })
        }
    }

    async getEmployeeById(req,res) {
        try{
            if(!req.params.Id) {
                res.status(400).send({
                    message : 'Id must be required!!!'
                });
            } else {
                const pool = await poolPromise
                const result = await pool.request()
                    .input('id',sql.UniqueIdentifier, req.params.Id)
                    .query(queries.getEmployeeById)
                    res.json(result.recordset)
            }
        } catch(error) {
            res.status(500).send({
                message : error.message
            })
        }
    }
}

const controller = new EmployeeController()
module.exports = controller;