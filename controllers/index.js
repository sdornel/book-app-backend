const { User, Review, Book } = require('../models');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
const config = require('../config/config.json')
const bcrypt = require('bcrypt')

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.secret;

// lets create strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  let user = getUserById({ id: jwt_payload.id });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

const createUser = async (req, res) => {
    console.log("DFDLJF", req.body) // undefined
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            user,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Review
                }
            ]
        });
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            where: { id: id },
            include: [
                {
                    model: Review
                }
            ]
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await User.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedUser = await User.findOne({ where: { id: id } });
            return res.status(200).json({ user: updatedUser });
        }
        throw new Error('User not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("User deleted");
        }
        throw new Error("User not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

const getUser = async obj => {
    return await User.findOne({
    where: obj,
  });
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
      // we get the user with the name and save the resolved promise returned
      let user = await getUser({ email });
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
    //   console.log("USER.PASSWORD", user.password) // USER.PASSWORD $2b$12$deJpXZUfs2kQo2DtXoEesuUzZgvtZ4SU2zz0c0G5s.FoV1ETkveFi
    //   console.log("PASSWORD", req.body.password) // PASSWORD two
      bcrypt.compare(req.body.password, user.password, function(err, results) {
        if (err){
          // handle error
          return res.json({message: "Decryption error"})
        }
        if (results) {
          // Send JWT
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: 'Login successful!', token: token });
        } else {
          // response is OutgoingMessage object that server response http request
          return res.json({success: false, message: 'Password is incorrect'});
        }
      });
    }
}

const signUp = (req, res, next) => {
    const { name, email, password } = req.body;
    const saltRounds = 12
    if(!email || !password) {
      res.status(422).send({error: 'You must provide both an email and password'})
    }
    bcrypt.hash(password, saltRounds)
    .then((hash) => {
        req.body.password = hash
    createUser(req, res).then(user =>
        res.json({ user, msg: 'account created successfully' })
      )
      .catch((err) => {
        console.log("ERROR MESSAGE", err)
          res.json({error: 'Error saving user to database'})
      })
    })
}  

const verifyUser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({
            where: { email: email },
            include: [
                {
                    model: Review
                }
            ]
        });
        if (user) {
            return res.status(200).json({ user });
        }
        return res.status(404).send('User verification failed');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        return res.status(201).json({
            review,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll()
        return res.status(200).json({ reviews });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}
const getReviewById = async (req, res) => {
    try {
        const review = await Review.findOne({
            where: { id: id},
        })
        if (review) {
            return res.status(200).json({ review });
        }
        return res.status(404).send('Review with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Review.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedReview = await Review.findOne({ where: { id: id } });
            return res.status(200).json({ review: updatedReview });
        }
        throw new Error('Review not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteReview = async (req, res) => { 
    try {
        const { id } = req.params;
        const deleted = await Review.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Review deleted");
        }
        throw new Error("Review not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        return res.status(201).json({
            book,
        });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll({
            include: [
                {
                    model: Review
                }
            ]
        });
        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findOne({
            where: { id: id },
            include: [
                {
                    model: Review
                }
            ]
        });
        if (book) {
            return res.status(200).json({ book });
        }
        return res.status(404).send('Book with the specified ID does not exist');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Book.update(req.body, {
            where: { id: id }
        });
        if (updated) {
            const updatedBook = await Book.findOne({ where: { id: id } });
            return res.status(200).json({ review: updatedBook });
        }
        throw new Error('Book not found');
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Book.destroy({
            where: { id: id }
        });
        if (deleted) {
            return res.status(204).send("Book deleted");
        }
        throw new Error("Book not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,

    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview,

    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,

    signUp,
    signIn,
}