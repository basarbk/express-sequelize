const User = require('./User');
const UserNotFoundException = require('./UserNotFoundException');

const create = async (body) => {
  await User.create(body);
}

const getUsers = async (pagination) => {
  const { page, size } = pagination;

  const usersWithCount = await User.findAndCountAll({
    limit: size,
    offset: page * size
  });
  return {
    content: usersWithCount.rows,
    totalPages: Math.ceil(usersWithCount.count / Number.parseInt(size))
  };
}

const getUser = async (id) => {
  const user = await User.findOne({where: {id: id}});
  if(!user) {
    throw new UserNotFoundException();
  }
  return user;
}

module.exports = {
  create,
  getUsers,
  getUser
}