const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//mongoose info for Movies
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: {
    name: String,
    description: String,
  },
  director: {
    name: String,
    bio: String,
    born: String,
    death: String,
  },
  imagePath: String,
  featured: Boolean,
});

// mongoose inf for Users
const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  birthday: Date,
  favoriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

//bcrypt hashing
userSchema.statics.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const Movie = mongoose.model('Movie', movieSchema);
const User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
