const mysql = require("mysql");

const conn = mysql.createConnection({
    host:"localhost",
    user:"aymrm",
    password:"1234",
    database:"kdt9",
    port:3306
})
conn.connect((err)=>{
    if(err){
        console.log("error");
        return;
    }
    console.log("connect");
})

exports.duplicateId=(data)=>{
    const query =`SELECT userid FROM user where userid="${data.userid}"`;
    let flag = true;
    conn.query(query,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }
        if(rows.length>0){
            flag=false;
        }
    })
    return flag;
}

exports.registerId = (data,cb)=>{
    if(!this.duplicateId(data)){
        cb(false);
    }
    const query = `INSERT INTO user (userid,name,pw) VALUES ("${data.userid}","${data.name}","${data.pw}")`
    console.log(query);
    conn.query(query,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log("rows",rows);
        cb(true);
    })
}

exports.postProfile = (data,cb)=>{
    const query =`SELECT * FROM user where userid="${data.userid}"`;
    console.log(query);
    conn.query(query,(err,rows)=>{
        console.log("post row",rows);
        if(err){
            console.log(err);
            return;
        }
        cb(rows);
    })
}

exports.userLogin = (data,cb)=>{
    console.log("data",data);
    const query = `SELECT userid , pw FROM user where userid="${data.userid}" and pw="${data.pw}"`
    conn.query(query,(err,rows)=>{
        if(err){
            console.log(err);
            return;
        }
        if(rows.length==0){
            cb(false)
            return;
        }
        console.log("rows",rows[0]);
        cb(true);
    })
}

exports.editProfile = (data,cb)=>{
    const query = `UPDATE user SET userid="${data.userid}", pw="${data.pw}" , name="${data.name}" WHERE id=${data.id}`;
    conn.query(query,(err,rows)=>{
        cb();
    })
}

exports.deleteProfile = (id,cb)=>{
    const query = `DELETE FROM user WHERE id=${id}`;
    conn.query(query,(err,rows)=>{
        cb();
    })
}