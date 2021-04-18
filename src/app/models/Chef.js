const db = require("../config/db")
const { iso } = require("../../lib/utils")

module.exports = {
    showAll(callback){
        db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON(chefs.id = recipes.chef_id)
            GROUP BY chefs.id
        `, function(err,results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },

    find(index, callback){
        db.query(`
            SELECT chefs.*, count(recipes.id) AS total_recipes
            FROM chefs
            LEFT JOIN recipes ON(chefs.id = recipes.chef_id)
            WHERE chefs.id = $1
            GROUP BY chefs.id
        `, [index], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    recipeFind(index, callback){
        db.query(`
            SELECT recipes.*
            FROM recipes
            WHERE recipes.chef_id = $1
            ORDER BY recipes.id
        `, [index], function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
        `

        const values = [
            data.name,
            data.avatar_url,
            iso(Date.now())
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    update(data, callback){
        const query = `
            UPDATE chefs SET
                name = ($1),
                avatar_url = ($2)
            WHERE id = $3
        `

        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    delete(id, callback){

        db.query(`
            DELETE FROM chefs
            WHERE id = $1
        `, [id], function(err,results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    }
}