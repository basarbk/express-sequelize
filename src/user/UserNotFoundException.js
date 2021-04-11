module.exports = function UserNotFoundException(){
  this.status = 404;
  this.message = 'User not found';
}