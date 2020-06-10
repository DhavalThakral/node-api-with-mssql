module.exports = (router) => {
    const emp = require('../controllers/EmployeeController');

    router.route('/emp')
        .get(emp.getAllEmployees)
        .post(emp.addNewEmployee);

    router.route('/emp/:Id')
        .put(emp.updateEmployeeDetails)
        .delete(emp.deleteEmployee)
        .get(emp.getEmployeeById)
}