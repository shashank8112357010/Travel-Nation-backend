const { response, request } = require('express');
const express = require('express');
const connection = require('../connection');
const router = express.Router();

//Add packages for admin
router.post('/add', (request, response, next) => {
    let data = request.body;
    var query = "insert into packages(package_title, package_type, rating, average_rating, old_pricr, new_price, package_duration, discount, location) values(?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(query, [data.package_title, data.package_type, data.rating, data.average_rating, data.old_pricr, data.new_price, data.package_duration, data.discount, data.location], (error, result) => {
        if (!error) {
            return response.status(200).json({
                message: 'New package added successfully !',
                success: true,

            })
        }
        else {
            return response.status(500).json({
                message: 'Package cannot be added',
                error:error,
                success: false
            })
        }
    })
})

//Get all packages for admin
router.get('/view', (request, response, next) => {
    var query = "select id, package_title, package_title, rating, average_rating, old_pricr, new_price, package_duration, discount, location from packages";
    connection.query(query, (error, result) => {
        if (!error) {
            return response.status(200).json({
                message: 'Packages fetched successfully !',
                success: true,
                result: result,
            })
        }
        else {
            return response.status(500).json(error)
        }
    })
})

//Delete package for admin
router.delete('/delete/:id', (request, response, next) => {
    const id = request.params.id;
    var query = "delete from packages where id = ?";
    connection.query(query, [id], (error, result) => {
        if (!error) {
            if (result.affectedRows == 0) {
                return response.status(404).json({
                    message: "Package not found",
                    success: false
                })
            }
            return response.status(200).json({
                message: "Package deleted successfully",
                success: true
            })
        } else {
            return response.status(500).json(error);
        }
    })
})

//Update package for admin
router.patch('/edit/:id', (request, response, next) => {

    console.log('body ----------------------', request.body);
    var id = request.params.id
    let data = request.body;
    console.log('Data ----------------', data);
    var query = "update packages set package_title = ?, package_type = ?, rating = ?, average_rating = ?, old_pricr = ?, new_price = ?, package_duration = ?, discount = ?, location = ? where id = ?"
    console.log('Query returned ----------------------');
    connection.query(query, [data.package_title, data.package_type, data.rating, data.average_rating, data.old_pricr, data.new_price, data.package_duration, data.discount, data.location, id], (error, result) => {
        console.log('res ------------------------------', result);
        if (! error) {
            if(result.affectedRows == 0) {
                return response.status(400).json({
                    message: 'Package not found !',
                    success: false
                })
            }
            console.log(connection.query);
            return response.status(200).json({
                message: 'Current package updated successfully !',
                success: true
            })
        }
        else {
            return response.status(500).json(error)
        }
    })
})

module.exports = router;