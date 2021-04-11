module.exports = function InvalidIdException(){
  this.status = 400;
  this.message = 'Invalid ID';
}