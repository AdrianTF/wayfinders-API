# Wayfinders NodeJS and Expres API Rest

## Description
This project is a NodeJS and Express API Rest that was developed as a interdisciplinary project by three students of Multiplatform App Developement Vocation Training (DAM). In addition, an Android app and a [Windows desktop app] have been developed together to make use of this API.

The API serves as one of the integral components of the project, providing a robust and scalable backend system for handling various RESTful API endpoints.

The API also allows for user management, data manipulation, authentication and authorization and data validation. It provides a solid foundation for the other two parts of the project, allowing the Android app and Windows desktop app to interact with the API.

## Features
- User Management: The API allows users to register, login, and manage their profiles. It provides endpoints for user authentication and authorization.
- Data Manipulation: The API supports CRUD operations for managing data.
- Authentication and Authorization: The API utilizes token-based authentication using JSON Web Tokens (JWT) for securing access to protected routes.
- Validation: The API validates incoming requests and enforces data validation rules to ensure data integrity.

## Technologies used
- Node.js: A JavaScript runtime environment used for executing server-side code.
- Express.js: A popular web application framework for Node.js that simplifies the development of robust APIs.
- MongoDB: A NoSQL database used for storing and retrieving data.
- MongoDB Atlas: A fully managed cloud database service provided by MongoDB that offers a solution for deploying, managing, and scaling MongoDB databases in the cloud.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB that provides a higher-level abstraction for interacting with the database.
- JSON Web Tokens (JWT): A standard for token-based authentication, used for securing access to protected routes and resources.
- Bcrypt: A password hashing tool for NodeJS.
- Multer: A middleware for handling multipart/form-data, which is commonly used for uploading files in web applications.

## Installation

[Node.js](https://nodejs.org/) required.

Clone the repository from GitHub:
```sh
git clone https://github.com/AdrianTF/API
```

Navigate to the project directory:
```sh
cd <API-project>
```
Install the dependencies:
```sh
npm i
```

Set up the environment variables:
- Create a .env file in the project root directory.
- Define the required environment variables in the .env file: database connection string, JWT secret and Bcrypt salt.
- Create a config folder inside src and a config.js file containing the following:
```node
module.exports = {
    //AUTH
    TOKEN_SECRET: process.env.TOKEN_SECRET || <ALTERNATIVE SECRET>,
    TOKEN_TIMESPAN: "365d",

    //IMAGES
    DEFAULT_USER_IMAGE: 'uploads/users/default.jpg',

    //ROUTES.
    ROUTE_CATEGORIES: ['senderismo', 'bicicleta', 'kayak'],
    ROUTE_DEFAULT_CATEGORY: 'senderismo',
    ROUTE_DIFFICULTY: ['facil', 'media', 'dificil'],
    ROUTE_PRIVACY: ['privado', 'amigos', 'publico'],

    //USERS
    USER_EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,

    //VALIDATOR
    VALIDATOR_USER_NAME_REGEX: /^[a-zA-ZáéíóúñüÜÁÉÍÓÚÑ\s]+$/,
    VALIDATOR_USER_MAX_USERNAME: 20,
    VALIDATOR_USER_MAX_PASSWORD: 20,

    VALIDATOR_POST_NAME_MAX: 70,
    VALIDATOR_POST_CONTENT_MAX: 500,

    VALIDATOR_COMMENT_CONTENT_MAX: 300,

    //UPLOADER
    UPLOADER_MIDDLEWARE_VALID_MIME: ['image/jpeg', 'image/png', 'image/svg', 'image/jpg']
}
```

Start the application:
```sh
npm start
```

The API will be accessible at http://localhost:3000.

## Project documentation
Full project documentation can be found [here].

## Contributors
- [Adrian Touriño Franco] 
- [David Ferrer Barco]
- [Mario Bellido Jiménez]

[Windows desktop app]: <https://github.com/maxrio21/INTERMODULAR>
[Adrian Touriño Franco]: <https://www.linkedin.com/in/adrian-tourinio/>
[David Ferrer Barco]: <https://github.com/DavidFerrerBarco>
[Mario Bellido Jiménez]: <[Mario Bellido Jiménez]>
[here]: <https://mega.nz/file/s8MxTDAT#VQqv5_uO-6ZXpGeOD9UAR7WzjQIsAir5Kre3nPlIy1Q>