const express = require('express');
const bodyParser = require('body-parser');
let books = [];
let idCount = 1;

const app = express();

// app.use(bodyParser.json());
app.use(express.json({extended: false}))
app.use(bodyParser.urlencoded({ extended: true }));
// similar to query strings

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
});

app.get('/book', (req, res)=> {
  res.json(books)
})
// RIGHT HERE RADU
app.post('/book', (req, res) => {
  let newBook = {
    id:   idCount++,
    author: req.body.author,
    title: req.body.title
  }
  if(books.find(b => b.title == newBook.title && b.author == newBook.author)) {
    return res.status(400).json({msg: `Bad Request`})
  }
  if(!newBook.id) res.status(400).json({msg: `ID required`})
  books.push(newBook);
  res.json(newBook)
})

app.put('/book/:id', (req, res) => {
  let id = req.params.id;
  let theBook = books.find(b => b.id == id)
  // Object.assign(theBook, req.body);
  theBook = {
    id,
    author: req.body.author,
    title: req.body.title
  }
  res.json(theBook)

})

app.delete('/book/:id', (req, res) => {
  let id = req.params.id;
  let bookIndex = books.findIndex(b => b.id == id);
  if(!bookIndex) {
    return res.status(400).json({msg: `ID NOT FOUND`})
  }
  books.slice(bookIndex, 1);
  res.json({msg: `Book Deleted`})
})

app.listen(3000, () => console.log('AMBER SERVER'));

//every request is independant of another
