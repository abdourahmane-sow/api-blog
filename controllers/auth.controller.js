const User = require("../models/User");
const bcrypt = require("bcrypt");

/**
 * ==============================
 * Register controller
 * ==============================
 */
module.exports.register = async(req,res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPass,
        });
        const user = newUser.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(500).json(err);
      }
}

/**
 * ==============================
 * Login controller
 * ==============================
 */
module.exports.login = async(req,res) => {
    try{
        const user = await User.findOne({username:req.body.username});
        if (!user) return res.status(400).json("Wrong username");
        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) return res.status(401).json("Wrong password");
        const {password, ...other} = user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
}