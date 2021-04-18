const Recipe = require("../models/Recipe")



exports.index = function(req,res){
    Recipe.showAll(req.query, function(recipes){
        return res.render("admin/recipes/listing", {recipes})
    })
}

exports.create = function(req,res){
    Recipe.selectChef(function(chefs){
        return res.render("admin/recipes/create", {chefs})
    })

}

exports.post = function(req,res){
    const keys = Object.keys(req.body)

    const filteredKeys = keys.filter(function(key){
        return key !=='information'
    })

    for(key of filteredKeys){
        if(req.body[key] == ""){
            return res.send(`Preencha o campo (${key}) para continuar!`)
        }
    }

    Recipe.create(req.body, function(){
        return res.redirect("/admin/recipes")
    })

}

exports.show = function (req, res) {
    const recipeIndex = req.params.index;
    
    Recipe.find(recipeIndex, function(recipe){
        return res.render("admin/recipes/recipe", {recipe});
    })
  
}

exports.edit = function(req,res){
    const recipeIndex = req.params.index;

    Recipe.find(recipeIndex, function(recipe){
        Recipe.selectChef(function(chefs){
            return res.render("admin/recipes/edit", {recipe, chefs});
        })
    })
}

exports.put = function(req,res){
    Recipe.update(req.body, function(recipe){
        return res.redirect(`/admin/recipes/${req.body.id}`)
    })
}

exports.delete = function(req,res){
    const { id } = req.body

    Recipe.delete(id, function(){
        return res.redirect("/admin/recipes")
    })
}