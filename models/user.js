const mongoose = require('mongoose');
const crypto = require('crypto'); // to gen pass
//const uuidv1 = require('uuid');   // to gen uniq string
var uuidv1 = require('uuidv1');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        trim : true, // cut the spaces
        require: true,
        maxlength: 32
    },
    email : {
        type: String,
        trim : true, 
        require: true,
        unique: true
    },
    hashed_password : {
        type: String,
        trim : true 
    },
    about : {
        type: String,
        trim : true 
    },
    salt : String,  // uniq string to clac the has-pass
    role : {
        type : Number, // 0 || 1 , standard user || Admin
        default : 0
    },
    history : {
        type : Array,
        default : []
    }
},{timestamps : true})




// Virtual field
userSchema.virtual('password')
.set(function(password){ // password from client side
    this._password = password
    this.salt = uuidv1() // give us a random string
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

userSchema.methods = { // In this place you can add own methods to the user schema
   
    authenticate: function (plainText){
       return this.encryptPassword(plainText) === this.hashed_password;
    },
   
   
   
    encryptPassword : function(password){
        if(!password) return '';
        try {
            return crypto.createHmac('sha1',this.salt)
                                    .update(password)
                                    .digest('hex')
        }catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema); // User based userSchema
