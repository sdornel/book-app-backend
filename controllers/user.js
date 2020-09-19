const { User, Review } = require('../models');
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
const getUser = async obj => { // gets by ID
    return await User.findOne({
        where: obj,
        include: [
            {
                model: Review
            }
        ]
    });
};
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

const login = async (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
      // we get the user with the name and save the resolved promise returned
      let user = await getUser({ email });
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
      // console.log("USER.PASSWORD", user.password) // USER.PASSWORD $2b$12$deJpXZUfs2kQo2DtXoEesuUzZgvtZ4SU2zz0c0G5s.FoV1ETkveFi
      // console.log("PASSWORD", password) // PASSWORD two
      bcrypt.compare(req.body.password, user.password, function(err, results) {
        if (err){
          // handle error
          return response.json({message: "Decryption error"})
        }
        if (results) {
          // Send JWT
          let payload = { id: user.id };
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
          res.json({ msg: 'Login successful!', token: token });
        } else {
          // response is OutgoingMessage object that server response http request
          return response.json({success: false, message: 'Password is incorrect'});
        }
      });
    }
  }
  
  const register = (req, res) => {
    const { name, email, password } = req.body;
    const saltRounds = 12
    if(!email || !password) {
        res.status(422).send({error: 'You must provide both an email and password'})
    }
    bcrypt.hash(password, saltRounds)
    .then((hash) => {
      const password = hash
      createUser({ name, email, password }).then(user =>
      res.json({ user, msg: 'account created successfully' })
      )
      .catch((err) => {
      console.log("ERROR MESSAGE", err)
          res.json({error: 'Error saving user to database'})
      })
    })
  }


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,

    login,
    register,
    getUser
}


// const { User } = require('../models');
// const { response } = require('express');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken');
// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// // ExtractJwt to help extract the token
// let ExtractJwt = passportJWT.ExtractJwt;
// // JwtStrategy which is the strategy for the authentication
// let JwtStrategy = passportJWT.Strategy;
// const config = require('../config/config.json')
// let jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = config.secret;

// const createUser = async ({ name, email, password }) => { 
//   return await User.create({ name, email, password });
// };
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//         // include: [
//         //     {
//         //         model: Review
//         //     }
//         // ]
//     });
//     return res.status(200).json({ users });
//   } catch (error) {
//       return res.status(500).send(error.message);
//   }
// };
// const getUser = async obj => {
//     return await User.findOne({
//     where: obj,
//   });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     // we get the user with the name and save the resolved promise returned
//     let user = await getUser({ email });
//     if (!user) {
//       res.status(401).json({ msg: 'No such user found', user });
//     }
//     // console.log("USER.PASSWORD", user.password) // USER.PASSWORD $2b$12$deJpXZUfs2kQo2DtXoEesuUzZgvtZ4SU2zz0c0G5s.FoV1ETkveFi
//     // console.log("PASSWORD", password) // PASSWORD two
//     bcrypt.compare(req.body.password, user.password, function(err, results) {
//       if (err){
//         // handle error
//         return response.json({message: "Decryption error"})
//       }
//       if (results) {
//         // Send JWT
//         let payload = { id: user.id };
//         let token = jwt.sign(payload, jwtOptions.secretOrKey);
//         res.json({ msg: 'Login successful!', token: token });
//       } else {
//         // response is OutgoingMessage object that server response http request
//         return response.json({success: false, message: 'Password is incorrect'});
//       }
//     });
//   }
// }

// const register = (req, res) => {
//   const { name, email, password } = req.body;
//   const saltRounds = 12
//   if(!email || !password) {
//       res.status(422).send({error: 'You must provide both an email and password'})
//   }
//   bcrypt.hash(password, saltRounds)
//   .then((hash) => {
//     const password = hash
//     createUser({ name, email, password }).then(user =>
//     res.json({ user, msg: 'account created successfully' })
//     )
//     .catch((err) => {
//         res.json({error: 'Error saving user to database'})
//     })
//   })
// }

// const getUserById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await User.findOne({
//             where: { id: id },
//             include: [
//                 {
//                     model: Review
//                 }
//             ]
//         });
//         if (user) {
//             return res.status(200).json({ user });
//         }
//         return res.status(404).send('User with the specified ID does not exist');
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }
// const updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const [updated] = await User.update(req.body, {
//             where: { id: id }
//         });
//         if (updated) {
//             const updatedUser = await User.findOne({ where: { id: id } });
//             return res.status(200).json({ user: updatedUser });
//         }
//         throw new Error('User not found');
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }
// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await User.destroy({
//             where: { id: id }
//         });
//         if (deleted) {
//             return res.status(204).send("User deleted");
//         }
//         throw new Error("User not found");
//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// };

// module.exports = {
//     createUser,
//     getAllUsers,
//     getUserById,
//     updateUser,
//     deleteUser,

//     login,
//     register,

//     getUser
// }