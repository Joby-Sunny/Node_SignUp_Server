1. DESCRIPTION

   This is a simple api server with following functionalities

   - User Register using email and password.
   - User Login using email and password.
   - Authentication of user using **jwt** tokens.
   - Database management using **sequelize** **ORM**.

2. HOW TO SETUP

   - Clone the repo.
   - Install dependencies using **npm** **install**.
   - Install and setup mysql in your system.
   - Create a database of your choice and update databasename and
     usercredentials on **/config/config.json**.
   - Install **sequelize-cli** using command **npm** **install** **-g**
     **sequelize-cli**.
   - Migrate the tables using **sequelize** **db:migrate**.
     - This creates the tables in your database. You can manually query
       database to see table.
   - Now you can simple start the server using **npm** **start** and test
     the routes.

3. SAMPLE CURL REQUESTS

   3.1 Checking out default `/` route.

   - Request

   ```
   curl -X POST http://localhost:8000/api/ | json_pp
   ```

   - Response

   ```
   {
       "message" : "You reached the server."
   }
   ```

   3.2 Successful User Registration, `/signup` route.

   - Request

   ```
   curl -X POST -H "Content-Type: application/json" -d '{"email":"testuser@yopmail.com","password":"Password@123"}' http://localhost:8000/api/signup | json_pp
   ```

   - Response

   ```
   {
       "message" : "User signup successful.",
       "data" : {
           "isActive" : true,
           "email" : "testuser@yopmail.com",
           "id" : 3,
           "password" : "Password@123",
           "updatedAt" : "2019-10-30T18:23:19.155Z",
           "createdAt" : "2019-10-30T18:23:19.155Z"
           },
        "error" : false
    }
   ```

   3.3 Password incorrect on Login, `/login` route.

   - Request

   ```
   curl -X POST -H "Content-Type: application/json" -d '{"email":"testuser@yopmail.com","password":"password"}' http://localhost:8000/api/login | json_pp
   ```

   - Response

   ```
   {
       "data" : {
           "message" : "Password is incorrect."
        },
        "error" : true,
        "message" : "Password is incorrect."
    }
   ```

   3.4 Successful Login and token generation, `/login` route.

   - Request

   ```
   curl -X POST -H "Content-Type: application/json" -d '{"email":"testuser@yopmail.com","password":"Password@123"}' http://localhost:8000/api/login | json_pp
   ```

   - Response

   ```
   {
       "data" : {
           "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJlbWFpbCI6InRlc3R1c2VyQHlvcG1haWwuY29tIn0sImlhdCI6MTU3MjQ2MDE4NiwiZXhwIjoxNTcyNDk2MTg2fQ.-4g88Q9MxVBbr5gvwMA5v0FVpUjPx9wIlAHrUo7hCrU",
           "email" : "testuser@yopmail.com"
        },
        "error" : false,
        "message" : "User Login Successful"
    }
   ```

   3.5 Fetching User Details with token, `/userdetails` route.

   - Request

   ```
   curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjozLCJlbWFpbCI6InRlc3R1c2VyQHlvcG1haWwuY29tIn0sImlhdCI6MTU3MjQ2MDE4NiwiZXhwIjoxNTcyNDk2MTg2fQ.-4g88Q9MxVBbr5gvwMA5v0FVpUjPx9wIlAHrUo7hCrU" http://localhost:8000/api/userdetails | json_pp
   ```

   - Response

   ```
   {
       "message" : "User details fetched successfully",
       "data" : {
           "id" : 3,
           "email" : "testuser@yopmail.com",
           "createdAt" : "2019-10-30T18:23:19.000Z",
           "isActive" : true,
           "updatedAt" : "2019-10-30T18:23:19.000Z",
           "password" : "Password@123"
        },
        "error" : false
    }
   ```

   3.6 Fetching User Details without token, `/userdetails` route.

   - Request

   ```
   curl http://localhost:8000/api/userdetails | json_pp
   ```

   - Response

   ```
   {
       "data" : {},
       "error" : true,
       "message" : "User is not authenticated"
    }
   ```



