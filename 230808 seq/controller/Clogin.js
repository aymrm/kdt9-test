// const Mlogin = require("../model/Mlogin");

const models = require("../models");
const op = require("sequelize");

exports.main = (req,res)=>{
    res.render("index");
}

exports.registerMain = (req,res)=>{
    res.render("register");
}

exports.registerId = (req,res)=>{
    models.Login.create({
        userid:req.body.userid,
        name: req.body.name,
        pw:req.body.pw
    }).then(result=>{
        res.send({
            userid:result.dataValues.userid,
            result:true,
        })
    })
}

exports.userMain = (req,res)=>{
    res.render("login");
}

exports.userLogin = (req,res)=>{
    models.Login.findOne({
        where:{
            userid:req.body.userid,
            pw:req.body.pw
        }}).then(data=>{
            res.send({
                userid:data.dataValues.userid,
                result:true
            })
        })
}

exports.postProfile=(req,res)=>{
    models.Login.findOne({
        where:{userid:req.body.userid}
    }).then(result=>{
        console.log("result.dataValues",result.dataValues);
        res.render("profile",{data:result.dataValues})
    })
}

exports.editProfile=(req,res)=>{
    models.Login.update(
        {
           userid:req.body.userid,
           pw:req.body.pw,
           name:req.body.name 
        },
        {
            where:{id:req.body.id}
        }
    )
}

exports.deleteProfile=(req,res)=>{
    models.Login.destroy({
        where:{id:req.body.id}
    }).then(result=>{
        res.send({result:true});
    })
}

exports.findAll=(req,res)=>{
    models.Login.findAll({
        attributes:["name","userid"],
        where:{id:{[Op.gte]:2}},
        // Op.gt(초과), Op.gte(이상) , Op.lt(미만) , Op.ne(같지 않은)
        // Op.or(또는), Op.in(배열 요소중 하나) , Op.notIn(배열요소와 모두 다른)
        order:[["id","DESC"]],
        limit:1,
        offset:1,
    }).then(result=>{
        console.log("findall",result);
    })
}