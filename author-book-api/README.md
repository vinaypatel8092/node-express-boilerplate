# nodejs-boiler-mysql-express
<!-- https://github.com/sutharms/nodejs-boiler-mysql-express -->

Setup an environment with Nodejs Boilerplate mongodb express

package.json:
start - npm start
dev - npm run dev

dependencies -
npm i express body-parser dotenv mongoose

dev dependencies -
npm i nodemon -D


author-book-api-class-based
│   .gitignore
│   package.json
│   README.md
│   app.js
│   .env
│   index.js
├───config
│       db
│           dbConnection.js
├───app
│   ├───components
│   │       index.js
│   │       author
│   │           author.controller.js
│   │           author.services.js
│   │           author.routes.js
│   │           index.js
│   │       book
│   │           book.services.js
│   │           book.routes.js
│   │           book.controller.js
│   │           index.js
│   ├───middlewares
│   │       errorHandler.js
│   ├───models
│   │       authorModel.js
│   │       bookModel.js
│   ├───utils
│           asyncHandler.js
