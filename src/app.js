const express = require('express');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...
app.post('/login', controllers.login);
app.post('/user', controllers.user);
app.get('/user', middlewares.auth, controllers.getUsers);
app.get('/categories', middlewares.auth, controllers.getCategories);
app.get('/user/:id', middlewares.auth, controllers.getUserById);
app.post('/categories', middlewares.auth, controllers.addCategories);
// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
