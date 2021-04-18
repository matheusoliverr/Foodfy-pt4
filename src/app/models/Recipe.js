const db = require("../config/db")
const { iso } = require("../../lib/utils")

module.exports = {
    showAll(pageQuery, callback){
        const { filter } = pageQuery

        let query = `
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
            
        `

        if(filter){

            query = `${query}
            WHERE recipes.title ILIKE '%${filter}%'
            `
        }



        db.query(query, function(err,results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },

    find(index, callback){
        db.query(`
            SELECT recipes.*, chefs.name AS chef_name
            FROM recipes
            LEFT JOIN chefs ON(recipes.chef_id = chefs.id)
            WHERE recipes.id = ${index}
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    create(data, callback){
        const query = `
            INSERT INTO recipes (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            iso(Date.now())
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    },

    selectChef(callback){
        db.query(`
            SELECT *
            FROM chefs
        `, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows)
        })
    },

    update(data, callback){
        const query = `
            UPDATE recipes SET
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7
        `

        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) throw `Database Error! ${err}`

            callback(results.rows[0])
        })
    },

    delete(id, callback){
        db.query(`
            DELETE FROM recipes
            WHERE id = $1
        `, [id], function(err,results){
            if(err) throw `Database Error! ${err}`

            callback()
        })
    }
}