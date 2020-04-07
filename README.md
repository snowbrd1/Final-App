# AdventureAnywhere

An all encompassing web app designed for adventure travellers who want all the adventure options in one location.

## Notes and comments

Currently, the backend server has not been uploaded so this will only allow access to the front end.  Please follow instructions below for front end install(server side included instructions as this will be part of final README).

## Installation Instructions for Testing

```**PLEASE NOTE THAT THIS PROJECT WAS CREATED USING MySQL AND VISUAL STUDIO CODE.  POSTMAN WAS USED FOR ALL TESTING**
1.Please clone each repo that I have attached - one is for the backend server(Finalappwebserver), the other for the front end client(Finalapp)
2.You will need to run npm install for the FinalApp as well as FinalAppWebServer(best to open 2 terminals)
3.The backend server will be running on port 4000 and the front end on 5000
4.Please create a MySQL database and make sure to notate what you have named it
5.You will need to rename your .env file in your db-config.js file
    (const database = process.env.DB_DATABASE || 'whatever name you created for your databse';)
6.You will need to create a jwt-config.js file and in your secret:
    module.exports = {
    secret: 'put your secret here'
    };
7.You will need to cd into the restful-api-mysql directory in the API terminal and run node src/index.js
8.You will need to cd into the fnalapp directory in the other terminal and run node server/index.js
9.Once completed you should now be running on both ports with a successful connectio to the database you created.
```

## Resources Used

```
-MySQL
-Visual Studio Code
-Xampp Control Panel
-Postman
-Node.js
```

## Goal
```
-Successful completion of web token authorization and registration
-Provide user with links to a country, several adventures and outfitter links
-possibly embed a video element
-the site design is to provide a one stop destination for users to pick a country, outfitter or adventure anywhere in the world.  Obvious time constraints will only allow for one country at this time.
```

