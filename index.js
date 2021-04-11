const sequelize = require('./src/config/database');
const User = require('./src/user/User');
const Article = require('./src/article/Article');
const app = require('./src/app');


sequelize.sync({ force: true }).then(async () => {
  for(let i = 1; i <= 15; i++){
    const user = {
      username: `user${i}`,
      email: `user${i}@mail.com`,
      password: 'P4ssword'
    }
    await User.create(user);
    const article = {
      content: `article content ${i}`
    }
    await Article.create(article);
  }
});



app.listen(3000, () => {
  console.log("app is running");
});
