/**
 * Created by jmartinez on 12/11/17.
 */
import bcrypt from 'bcrypt-nodejs';
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});


//Password hash middleware - hashes password on save or update in mongodb

UserSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(5, function(err, salt){
        if(err) return next(err);
        bcrypt.hash(user.password, salt, null, function(error, hash){
            
            if(error) return next(error);
            user.password = hash;
            next();
        });
    });
    
});


UserSchema.statics = {};

export default mongoose.model("User", UserSchema);