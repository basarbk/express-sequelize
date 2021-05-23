const UserService = require('../user/UserService');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization) {
    const encoded = authorization.substring(6);
    const decoded = Buffer.from(encoded, 'base64').toString('ascii');
    const [email, password] = decoded.split(':');
    const authenticatedUser = await UserService.findByEmail(email);
    const match = await bcrypt.compare(password, authenticatedUser.password);
    if(match){
      req.authenticatedUser = authenticatedUser;
    }
  }
  next();
}