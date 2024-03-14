const sqlite = require('sqlite3');

// Open the database connection
const db = new sqlite.Database('./Database/DB.sqlite', (err) => {
    if (err) console.error(err.message);
    
});

module.exports = {
    getData: function (query, params) {
        return new Promise((resolve, reject) => {
            db.all(query, params, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    },

    getOne: function (query, params) {
        return new Promise((resolve, reject) => {
            db.get(query, params, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    
                    resolve(results);
                }
            });
        });
    },

    executeQuery: function (query, params) {
        return new Promise((resolve, reject) => {
            db.run(query, params, (err) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    },

    // Example Call
    // await db.executeTransaction(async () => {
        // await db.executeQuery(sql, [params]);
    // });
    executeTransaction: function (QueriesFunctionList) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN', (err) => {
                    if (err) reject(err);
                    QueriesFunctionList().then(() => {
                        db.run('COMMIT', (err) => {
                            if (err) reject(err);
                            resolve()
                        });
                    }).catch((error) => {
                        
                        db.run('ROLLBACK');
                        reject(error);
                    });
                });
            });
        });
    },
}