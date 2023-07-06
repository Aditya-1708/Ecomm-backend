const express = require('express');

const fs=require('fs');

const path=require('path');

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

app.use(bodyParser.json());


function update(){
  fs.writeFile('ADMINS.json',JSON.stringify([ADMINS]),(err)=>{
    if(err){
      console.log(err);
    }
  });
  fs.writeFile('USERS.json',JSON.stringify([USERS]),(err)=>{
    if(err){
      console.log(err);
    }
  });
  fs.writeFile('COURSES.json',JSON.stringify([COURSES]),(err)=>{
    if(err){
      console.log(err);
    }
  });
}


let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  
  update();
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  update();
});

app.post('/admin/courses', (req, res) => {
  // logic to create a course
  update();
});

app.put('/admin/courses/:courseId', (req, res) => {
  // logic to edit a course
  update();
});

app.get('/admin/courses', (req, res) => {
  // logic to get all courses
  update();

});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  update();

});

app.post('/users/login', (req, res) => {
  // logic to log in user
  update();

});

app.get('/users/courses', (req, res) => {
  // logic to list all courses
  update();

});

app.post('/users/courses/:courseId', (req, res) => {
  // logic to purchase a course
  update();

});

app.get('/users/purchasedCourses', (req, res) => {
  // logic to view purchased courses
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
        })
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
      })
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
      })
  }
});
});
