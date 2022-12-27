import firebird from "node-firebird";
import * as dotenv from 'dotenv';
dotenv.config();

const dbOptions = {
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    lowercase_keys: true, // set to true to lowercase keys
    role: null,            // default    
    pageSize: 4096        // default when creating database
};

function executeQuery(ssql, params, callback) {

    firebird.attach(dbOptions, function (err, db) {

        if (err) {
            return callback(err, []);
        }

        db.query(ssql, params, function (err, result) {

            db.detach();

            if (err) {
                return callback(err, []);
            } else {
                return callback(undefined, result);
            }
        });

    });
}

export { executeQuery };