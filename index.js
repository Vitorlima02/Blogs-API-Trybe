const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const categoryController = require('./controllers/categoryController');
const blogPostController = require('./controllers/blogPostController');
const auth = require('./middlewares/auth');

const app = express();

app.use(bodyParser.json());

app.route('/user').post(userController.createUser);
app.route('/login').post(userController.userLogin);
app.route('/user').get(auth, userController.userGetAll);
app.route('/user/:id').get(auth, userController.getUserById);
app.route('/categories').post(auth, categoryController.createCategory);
app.route('/categories').get(auth, categoryController.categoryGetAll);
app.route('/post').post(auth, blogPostController.createBlogPost);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
