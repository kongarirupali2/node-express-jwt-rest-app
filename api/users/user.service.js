const { create } = require("json-server");
const pool = require("../../config/database");
module.exports = {
    create: (data, callback) => {
        pool.query(
            `insert into users
            (firstName, lastName, gender, email, password, number)
            values (?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id,
            ],
            (error, results, fields) => {
                if(error) {
                    console.log(error);
                    return callback(error);
                }
                return callback(null, results);
            }
        );

    },
    getUsers: (callback) => {
        pool.query(
            `select id, firstName, lastName, gender, email, number from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserById: (id, callback) => {
        pool.query(
            `select id, firstName, lastName, gender, email, number from where id=?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    updateUser: (data, callback) => {
        pool.query(
            `update users set firstName=?, lastName=?, gender=?, email=?, number=? where id=?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.number,
                data.id,
            ],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    deleteUser: (data, callback) => {
        pool.query(
            `delete from users where id=?`,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
    getUserByEmail: (email, callback) => {
        pool.query(
            `select email, password from users where email=?`,
            [email], 
            (error, results, fields) => {
                if (error) {
                    console.log(error);
                    return callback(error);
                }   
                return callback(null, results[0]);
            }
        );
    },
};