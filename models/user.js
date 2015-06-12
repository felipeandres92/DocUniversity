'use strict'

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;
 
var UserSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    user: { type: String, required: true }
});

UserSchema.pre(save, function(next) {
    var user = this;
 
// only hash the user if it has been modified (or is new)
if (!user.isModified('user')) return next();
 
// generate a salt
bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
 
    // hash the user using our new salt
    bcrypt.hash(user.user, salt, function(err, hash) {
        if (err) return next(err);
 
        // override the cleartext user with the hashed one
        user.user = hash;
        next();
    });
});
 
 
});
 
UserSchema.methods.compareUser = function(candidateUser, cb) {
    bcrypt.compare(candidateUser, this.user, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);
