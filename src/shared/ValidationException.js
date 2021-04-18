module.exports = function ValidationException(errors){
  this.status = 400;
  this.message = 'Invalid Request';
  this.errors = errors;
}