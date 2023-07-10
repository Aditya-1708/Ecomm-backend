## Create a course selling website

### Description
Functionally the same as 02-course-app-easy. Routes are the same as well.
But now you need to store data in files vs in memory.
Create separate files for each entity (admin, user, course, purchase).

## Routes
### Admin Routes:
 - POST /admin/signup
   Description: Creates a new admin account.
   Input: { username: 'admin', password: 'pass' }
   Output: { message: 'Admin created successfully', token: 'jwt_token_here' }
 - POST /admin/login
   Description: Authenticates an admin. It requires the admin to send username and password in the headers.
   Input: Headers: { 'username': 'admin', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
 - POST /admin/courses
   Description: Creates a new course.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: 
   Output: { message: 'Course created successfully', courseId: 1 }
 - PUT /admin/courses/:courseId
   Description: Edits an existing course. courseId in the URL path should be replaced with the ID of the course to be edited.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }, Body: { title: 'updated course title', description: 'updated course description', price: 100, imageLink: 'https://updatedlinktoimage.com', published: false }
   Output: { message: 'Course updated successfully' }
 - GET /admin/courses
   Description: Returns all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
   User Routes:

### User routes
 - POST /users/signup
   Description: Creates a new user account.
   Input: { username: 'user', password: 'pass' }
   Output: { message: 'User created successfully', token: 'jwt_token_here' }
 - POST /users/login
   Description: Authenticates a user. It requires the user to send username and password in the headers.
   Input: Headers: { 'username': 'user', 'password': 'pass' }
   Output: { message: 'Logged in successfully', token: 'jwt_token_here' }
 - GET /users/courses
   Description: Lists all the courses.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
 - POST /users/courses/:courseId
   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { message: 'Course purchased successfully' }
 - GET /users/purchasedCourses
   Description: Lists all the courses purchased by the user.
   Input: Headers: { 'Authorization': 'Bearer jwt_token_here' }
   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }
jwt.verify(sentToken,secretKey,(err,decoded)=>{
    if(err){
      console.log(err);
    }
    else{
      const username=decoded.username;
      const password=decoded.password;
      const ADMIN=ADMINS.find((element)=>{
        return element.username===username&&element.password===password;
      });
      if(ADMIN===undefined){
        res.status(404).send("USER NOT FOUND");
      }
      else{
        const newCourse={ 
          title:req.body.title, 
          description:req.body.description,
          price:req.body.price, 
          imageLink:req.body.imageLink ,
          published:req.body.published ,
          courseOwner:ADMIN.username
        }
        COURSES.push(newCourse);
      }
    }
  });v