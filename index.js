const express = require("express");
const sequelize = require('./database');
const User = require('./User');

sequelize.sync({ force: true }).then(async () => {
  for(let i = 1; i <= 25; i++){
    const user = {
      username: `user${i}`,
      email: `user${i}@mail.com`,
      password: 'P4ssword'
    }
    await User.create(user);
  }
});

const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
  await User.create(req.body);
  res.send("success");
})

app.get('/users', async (req, res) => {
  const { page, size } = req.query;
  const usersWithCount = await User.findAndCountAll({
    limit: size,
    offset: page * size
  });
  res.send({
    content: usersWithCount.rows,
    totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
  });
})

app.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  res.send(user);
})

app.put('/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({where: {id: id}});
  user.username = req.body.username;
  await user.save();
  res.send('updated');
})

app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  await User.destroy({where: {id: id}});
  res.send('removed');
})

app.listen(3000, () => {
  console.log("app is running");
});
