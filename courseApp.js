const express=require('express');

const fs = require('fs');

const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

var courseloc=0;

const NameForBackup='miscData.json';

const PathForBackup=path.join(__dirname,NameForBackup);

const app=express();

function update(){//converting from volatile to non volatile
    fs.writeFile(NameForBackup,JSON.stringify(courseloc),(err)=>{
        if(err){
            console.log(err);
        }
    });
}



app.post('/admin/signup',(req,res)=>{//signup
    const fileName='DB.json';
    const fileLoc=path.join(__dirname,fileName);
    fs.readFile(fileLoc,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const DB=JSON.parse([data]);
            const user={
                username:req.headers.username,
                password:req.headers.password,
                courseLocation:courseloc=courseloc+1
            };
            update();
            DB.push(user);
            fs.writeFile(fileName,JSON.stringify(DB),(err)=>{
                if(err){
                    console.log(err);
                }
            });
            res.json({
                message:'Admin created successfully',
            });
        }
    });
});







app.post('/admin/login',(req,res)=>{//authenticate login
    const fileName='DB.json';
    const fileLoc=path.join(__dirname,fileName);
    fs.readFile(fileLoc,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const DB=JSON.parse([data]);
            const login={
                username:req.headers.username,
                password:req.headers.password,
            };
            const backendMatch=DB.find((user)=>{
                user.username===login.username;
            });
            if(backendMatch===undefined){
                res.json({
                    message:'Invalid username'
                });
            }
            else if(backendMatch.password===login.password){
                res.json({
                    message:'logged in successfully ',
                });
            }
        }
    });

});







app.post('/admin/courses',(req,res)=>{//new course creation
    const fileName='DB.json';
    const fileLoc=path.join(__dirname,fileName);
    fs.readFile(fileLoc,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const DB=json.parse([data]);
            const login={
                username:req.headers.username,
                password:req.headers.password,
            };
            const backendMatch=DB.find((user)=>{
                user.username===login.username;
            });
            if(backendMatch===undefined){
                res.json({
                    message:'Invalid username'
                });
            }
            else if(backendMatch.password===login.password){
                const fileNameC='courseDB.json'
                const filelocC=path.join(__dirname,fileNameC)
                fs.readFile(filelocC,'utf8',(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        var courseDB=JSON.parse(data);
                        courseDB[backendMatch.courseLocation].push({
                            title:req.body.title,
                            description:req.body.description,
                            price:req.body.price,
                            imageLink:req.body.imageLink,
                            published:req.body.published
                        });
                    }
                });
            }
        }
    });
});
app.put();//edit courses
app.get();//returns all courses




app.listen(3000,()=>{
    fs.readFile(PathForBackup,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            courseloc=parseInt(data);
        }
    });
});