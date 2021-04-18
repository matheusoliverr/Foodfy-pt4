const Recipe = require("../models/Recipe")

exports.index = function(req,res){
    
    Recipe.showAll(req.query, function(recipes){
        return res.render("site/foodfy", {recipes})
    })
}

exports.show = function (req, res) {
    const recipeIndex = req.params.index;

    Recipe.find(recipeIndex, function(recipe){
        return res.render("site/recipe", {recipe})
    })  
}

exports.about = function(req,res){
    return res.render("site/about")
}

exports.list = function(req,res){
    Recipe.showAll(req.query, function(recipes){
        return res.render("site/recipes", {recipes, filter: req.query.filter})
    })
}