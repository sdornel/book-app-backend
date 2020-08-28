const db = require("../models");
const Book = db.books;
const Op = db.Sequelize.Op;

// Create and Save a new Book
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }
    
      // Create a Book
      const book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages
    };
      // Save Book in the database
    Book.create(book)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while creating the Book."
        });
    });

};
// Retrieve all Books from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    // const books = await Book.findAll();

    Book.findAll()
    .then(books => {
        res.send(books)
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};

// Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findByPk(id)
    .then(books => {
      res.send(books);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });

};

// Update a Book by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Book.update(req.body, {
        where: {id: id }
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
};

// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Books from the database.
exports.deleteAll = (req, res) => {
    Book.destroy({
        where: {},
        // truncate: false // ???
      })
        .then(nums => {
          res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all tutorials."
          });
        });
};

// // Find all published Books
// exports.findAllPublished = (req, res) => {
  
// };