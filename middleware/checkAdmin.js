const User = require('models/user').User;
const HttpError = require('error').HttpError;
const log = require('libs/log')(module);

module.exports = (req, res, next) => {
  if (!req.session.user) {
    log.warn('Neavtorizovaniy user pitalsa zayti v admin panel!');
    return next(new HttpError(401, "you are not authorized to view this page!"));
  }
  User.findById(req.session.user, (err, user) => {
    if(err){
      return next(err);
    }
    else if(user == null){
      log.warn('Ne imeyoushiy prav user(no s session) pitalsa zayti v admin panel!');
      return next(new HttpError(401, "you are not authorized to view this page!"));
    }
    else if(user.username == 'admin'){
      log.info('Admin v zdanii!');
      next();
    }
    else{
      log.warn('Ne imeyoushiy prav user pitalsa zayti v admin panel!');
      return next(new HttpError(401, "you are not authorized to view this page!"));
    };
  });
};