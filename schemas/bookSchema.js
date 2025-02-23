const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addErrors = require("ajv-errors");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const bookSchema = {
  type: "object",
  properties: {
    title: { 
      type: "string", 
      minLength: 1, 
      errorMessage: "Title is required and must be a non-empty string."
    },
    author: { 
      type: "string", 
      minLength: 1, 
      errorMessage: "Author is required and must be a non-empty string."
    },
    published_year: { 
      type: "integer", 
      minimum: 1450, // Books started getting printed around this time
      maximum: new Date().getFullYear(),
      errorMessage: "Published year must be a valid year between 1450 and the current year."
    },
    isbn: { 
      type: "string", 
      pattern: "^(97(8|9))?\\d{9}(\\d|X)$",
      errorMessage: "ISBN must be a valid 10 or 13-digit number."
    },
    price: { 
      type: "number", 
      minimum: 0, 
      errorMessage: "Price must be a non-negative number."
    },
    stock: { 
      type: "integer", 
      minimum: 0, 
      errorMessage: "Stock must be a non-negative integer."
    }
  },
  required: ["title", "author", "published_year", "isbn", "price", "stock"],
  additionalProperties: false
};

const validateBook = ajv.compile(bookSchema);

module.exports = validateBook;
