const express=require('express');

const fs = require('fs');

const path = require('path');



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
    const fileName='DBadmin.json';
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
    const fileName='DBadmin.json';
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
    const fileName='DBadmin.json';
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
                const fileNameC='DBCourseAdmin.json'
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
                            published:req.body.published,
                            courseId:(int)(Math.random()*1000000)
                        });
                    }
                });
            }
        }
    });
});





app.put('/admin/courses/:courseId',(req,res)=>{//edit courses
    const fileName='DBAdmin.json';
    const fileLoc=path.join(__dirname,fileName);
    fs.readFile(fileLoc,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            var DB=JSON.parse(data);
            const backendMatch=DB.find((user)=>{
                user.username===login.username;
            });
            if(backendMatch===undefined){
                res.json({
                    message:'Invalid username'
                });
            }
            else if(backendMatch.password===login.password){
                const fileNameC='DBCourseAdmin.json'
                const filelocC=path.join(__dirname,fileNameC)
                fs.readFile(filelocC,'utf8',(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        var courseDB=JSON.parse(data);
                        const courselist=courseDB[backendMatch.courseLocation];
                        courselist.forEach((course)=>{
                            if(course.id===req.params.id){
                                course.title=req.body.title;
                                course.description=req.body.description;
                                course.price=req.body.price;
                                course.imageLink=req.body.imageLink;
                                course.published=req.body.published;
                                res.json({
                                message:'Course updated successfully'
                                });
                            }
                        });
                    }
                });
            }
        }
    });
});





app.get('/admin/courses',(req,res)=>{
    const fileName='DBAdmin.json';
    const fileLoc=path.join(__dirname,fileName);
    const AdminUserName=req.headers.username;
    const AdminPassword=req.headers.password;
    fs.readFile(fileLoc,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }
        else{
            const AdminDB=JSON.parse([data]);
            const Admin=AdminDB.find((element)=>{
                (element.username===AdminUserName&&element.password===AdminPassword)
            });
            if(Admin===undefined){
                console.log("Invalid Username or Password");
            }
            else{
                const fileNameC='DBCourseAdmin.json'
                const filelocC=path.join(__dirname,fileNameC)
                fs.readFile(filelocC,'utf8',(err,data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        var courseDB=JSON.parse(data);
                        const courselist=courseDB[backendMatch.courseLocation];
                        courselist.forEach((course)=>{
                            if(course.id===Admin.courseloc){
                                res.json({
                                    courses:
                                });
                            }
                        });
                    }
            });
        }
    }
});
});//returns all courses



app.post('/users/signup',(req,res)=>{//user login

});
app.post('/users/login',(req,res)=>{//user login

});
app.get('/users/courses',(req,res)=>{//course list

});
app.post('/users/courses/:courseId',(req,res)=>{//course purchase

});
app.get('/users/purchasedCourses',(req,res)=>{//lists all the purchased courses

});




app.listen(3000,()=>{
    
});