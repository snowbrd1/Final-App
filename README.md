# ***WINDOWS USER***
# AdventureAnywhere

An all encompassing web app designed for adventure travellers who want all the adventure options in one location.

## Notes and comments

Please follow instructions below for installation.

## Installation Instructions for Testing

```**PLEASE NOTE THAT THIS PROJECT WAS CREATED USING MySQL AND VISUAL STUDIO CODE.  POSTMAN WAS USED FOR ALL TESTING**
1.Please clone each repo that I have attached - one is for the backend server(Finalappwebserver), the other for the front end client(Finalappclient)
2.The backend server will be running on port 4000 and the front end on 5000
3.Please create a MySQL database and make sure to notate what you have named it
4.You will need to rename your .env file in your db-config.js file
    (const database = process.env.DB_DATABASE || 'whatever name you created for your databse';)
5.You will need to create a jwt-config.js file and in your secret:
    module.exports = {
    secret: 'put your secret here'
    };
6.Best to open 2 terminals for Finalappclient as well as FinalWebServer
7.You will need to cd into the restful-api-mysql directory in Finalappwebserver and run npm start
8.You will need to cd into the finalapp directory in the other terminal and run npm start
9.Once completed you should now be running on both ports with a successful connection to the database you created.
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
-the site design is to provide a one stop destination for user to pick a country, outfitter or adventure anywhere in the world.  Obvious time constraints will only allow for one country at this time.
```

