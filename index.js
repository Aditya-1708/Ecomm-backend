const express = require('express');

const fs=require('fs');

const path=require('path');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(bodyParser.json());

const secretKey='hellofreakbitches';


function update(){
  fs.writeFileSync('ADMINS.json',JSON.stringify(ADMINS),(err)=>{
    if(err){
      console.log(err);
    }
  });
  fs.writeFileSync('USERS.json',JSON.stringify(USERS),(err)=>{
    if(err){
      console.log(err);
    }
  });
  fs.writeFileSync('COURSES.json',JSON.stringify(COURSES),(err)=>{
    if(err){
      console.log(err);
    }
  });
}


let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes



function authenticate(decoded){
  ADMINS.forEach((ADMIN)=>{
    if(ADMIN.username===decoded.username&&ADMIN.password===decoded.password){
      return true;
    }
  });
}


function indexOf(decoded,ARR){
  for(var i=0;i<=ARR.length;i++){
    if(decoded.username===ARR[i].username){
      return i;
    }
  }
  return undefined;
}


app.post('/admin/signup', (req, res) => {// logic to sign up admin
  const newAdmin={
    username:req.body.username,
    password:req.body.password
  }
  const token=jwt.sign(newAdmin,secretKey);
  res.json({
    message:"signup is successful",
    token:token
  });
  ADMINS.push(newAdmin);
  update();
});





app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const newAdmin={
    username:req.headers.username,
    password:req.headers.password
  }
  const admin=ADMINS.find((admin)=>{
    return admin.username===newAdmin.username&&admin.password===newAdmin.password;
  });
  if(admin===undefined){
    res.status(404).json({message:"Invalid username or password"});
  }
  else{
    const token=jwt.sign(newAdmin,secretKey);
    res.json({
      message:"LOGIN successful!",
      token:token
  })
  }
});




app.post('/admin/courses', (req, res) => {
  // logic to create a course
  const sentToken=(req.body.Authorization);
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      res.status(404).send("UNAUTHORIZED");
    }
    else{
      const verification=authenticate(decoded);
      if(verification===true){
        res.status(404).send("username or password is wrong bro");
      }
      else{
        const newCourse={ 
          title:req.body.title, 
          description:req.body.description,
          price:req.body.price, 
          imageLink:req.body.imageLink ,
          published:req.body.published ,
          courseOwner:ADMINS[indexOf(decoded,ADMINS)].username,
          courseId:Math.floor(1000000*Math.random())
        }
        COURSES.push(newCourse);
        res.status(200).json({
          message:"Course created successfully",
          courseId:newCourse.courseId
        });
      }
    }
  });
  update();
});




app.put('/admin/courses/:courseId', (req, res) => {
  const sentToken=(req.body.Authorization);
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      res.sendStatus(404).send("Unauthorized");
    }
    else{
      const verification=authenticate(decoded);
      if(verification===false){
        res.sendStatus(404).send("Unauthorized");
      }
      else{
        COURSES.forEach((COURSE)=>{
          console.log(COURSE);
          if(COURSE.courseId===req.params.courseId){
            const COURSE={
              title:req.body.title,
              description:req.body.description,
              price:req.body.price,
              imageLink:req.body.imageLink,
              published:req.body.published,
              courseId:COURSE.courseId
            };
            console.log(COURSE);
          }
        });
        res.status(200).send("course updated Successfully");
      }
    }
  });
  // logic to edit a course
  update();
});




app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  const sentToken=(req.body.Authorization);
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      res.sendStatus(404).send("Unauthorized");
    }
    else{
      var courseArray=[];
      COURSES.forEach((element)=>{
        if(element.courseOwner===decoded.username){
          COURSES.push(element);
        }
      });
      res.status(200).json({courses:courseArray})
    }
  });
});





// User routes
app.post('/users/signup', (req, res) => {
  const newUser={
    username:req.headers.username,
    password:req.headers.password,
    courseList:[]
  }
  const tokenCre={
    username:newUser.username,
    password:newUser.password
  }
  const token=jwt.sign(tokenCre,secretKey);
  res.json({
    message:"signup is successful",
    token:token
  });
  USERS.push(newUser);
  update();
  // logic to sign up user
});





app.post('/users/login', (req, res) => {
  // logic to log in user
  const newUser={
    username:req.headers.username,
    password:req.headers.password
  }
  const user=USERS.find((user)=>{
    return user.username===newUser.username&&user.password===nwUser.password;
  });
  if(user===undefined){
    res.status(404).json({message:"Invalid username or password"});
  }
  else{
    const token=jwt.sign(newUser,secretKey);
    res.json({
      message:"LOGIN successful!",
      token:token
  })
  }
  update();
});




app.get('/users/courses', (req, res) => {
  // logic to list all courses
  const courses=COURSES;
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      console.log(err);
    }
    else{
      const verification=authenticate(decoded);
      if(verification===false){
        res.sendStatus(404);
      }
      else{
        res.status(200).json({courses:courses});
      }
    }
  });
});



app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  const sentToken=(req.body.Authorization);
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      console.log(err);
    }
    else{
      const verification=authentication(decoded);
      if(verification===false){
        res.status(404);
      }
      else{
        const userIndex=indexOf(decoded,USERS);
        USERS[userIndex].courseList.push(req.params.courseId);
      }
    }
  });
  update();
});



app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
  const sentToken=req.body.authoriation;
  jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      res.sendStatus(404);
    }
    else{
      const userIndex=indexOf(decoded,USERS);
      const boughtCourses=[];
      USERS[userIndex].courseList.forEach((courseId)=>{
        boughtCourses.push(COURSES.find((element)=>{
          if(element.courseId===courseId)
          {
            return element;
          }
        }));
      });
    }
  });
  update();
});



app.listen(3000, () => {
  console.log('Server is listening on port 3000');
  fs.readFile(path.join(__dirname,'ADMINS.json'),'utf8',(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        const admins=JSON.parse(data);
        admins.forEach((element)=>{
          ADMINS.push(element);
        });
    }
});
fs.readFile(path.join(__dirname,'USERS.json'),'utf8',(err,data)=>{
  if(err){
      console.log(err);
  }
  else{
      const users=JSON.parse(data);
      users.forEach((element)=>{
        USERS.push(element);
      });
  }
});
fs.readFile(path.join(__dirname,'COURSES.json'),'utf8',(err,data)=>{
  if(err){
      console.log(err);
  }
  else{
      const courses=JSON.parse(data);
      courses.forEach((element)=>{
        COURSES.push(element);
      });
  }
});
});
