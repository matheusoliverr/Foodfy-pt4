const Chef = require("../models/Chef")


exports.index = function(req,res){
    Chef.showAll(function(chefs){
        return res.render("admin/chefs/listing", {chefs})
    })
}

exports.create = function(req,res){

    return res.render("admin/chefs/create")
}

exports.post = function(req,res){
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send(`Preencha o campo (${key}) para continuar!`)
        }
    }
    
    Chef.create(req.body, function(){
        return res.redirect("/admin/chefs")
    })
}

exports.show = function (req, res) {
    const chefIndex = req.params.index;
    
    Chef.find(chefIndex, function(chef){
        Chef.recipeFind(chef.id, function(recipes){
            return res.render("admin/chefs/chef", {chef, recipes});
        })
    })
}

exports.edit = function(req,res){
    const chefIndex = req.params.index;
    
    Chef.find(chefIndex, function(chef){
        return res.render("admin/chefs/edit", {chef});
    })
}

exports.put = function(req,res){
    Chef.update(req.body, function(chef){
        return res.redirect(`/admin/chefs/${req.body.id}`)
    })
}

exports.delete = function(req,res){
    if(req.body.total_recipes != 0){
        return res.send("Chefs que possuem receitas cadastradas não podem ser deletados!")
    }


    Chef.delete(req.body.id, function(){
        return res.redirect("/admin/chefs")
    })
}

exports.list = function(req,res){
    Chef.showAll(function(chefs){
        return res.render("site/chefs", { chefs })
    })
}