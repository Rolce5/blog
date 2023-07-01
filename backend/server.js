const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const app = express();


const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const multer = require('multer');





const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog'
});

app.use(cors());

app.get('/api/posts', (req, res) => {
  const sql = 'SELECT * FROM posts';

  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    // console.log(results)
    res.json(results);
  });
});

// Get a single post by ID
app.get('/api/posts/:id', (req, res) => {
  const sql = 'SELECT * FROM posts WHERE id = ?';
  const {id} = req.params;


  connection.query(sql, id, (error, results, fields) => {
    if (error) {
      console.log('Error getting post:', error);
      return res.status(500).json({ error: 'Error getting post' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log(results)

    res.json(results[0]);
  });
});
// app.get('/api/posts/:id', (req, res) => {
//   const sql = 'SELECT * FROM posts WHERE id = ?';
//   const { id } = req.params;

//   connection.query(sql, id, (error, results, fields) => {
//     if (error) {
//       console.log('Error getting post:', error);
//       return res.status(500).json({ error: 'Error getting post' });
//     }

//     if (results.length === 0) {
//       return res.status(404).json({ error: 'Post not found' });
//     }

//     // Modify the result object to include the image attribute
//     const post = {
//       id: results[0].id,
//       title: results[0].title,
//       content: results[0].content,
//       image: results[0].image // Add the image attribute
//     };

//     res.json(post);
//   });
// });


// Configure Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });

app.post('/api/posts', upload.single('image'), (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const image = req.file ? req.file.filename : null;
  // set FOREIGN_KEY_CHECKS=0;
  const sql = 'INSERT INTO posts (title, body, image) VALUES (?, ?, ?)';
  const values = [title, body, image];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log('Error creating post:', error);
      return res.status(500).json({ error: 'Error creating post' });
    }

    res.json({ message: 'Post created successfully' });
  });
});


// Update a post by ID
app.patch('/api/posts/:id', upload.single('image'), (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const image = req.file ? req.file.filename : null;
  const sql = 'UPDATE posts SET title = ?, body = ?, image = ? WHERE id = ?';
  const values = [title, body, image, req.params.id];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log('Error updating post:', error);
      return res.status(500).json({ error: 'Error updating post' });
    }

    res.json({ message: 'Post updated successfully' });
  });
});


// Delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
  const sql = 'DELETE FROM posts WHERE id = ?';
  const values = [req.params.id];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log('Error deleting post:', error);
      return res.status(500).json({ error: 'Error deleting post' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  });
});




// Add a comment to a post by ID
app.post('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const { author, email, text } = req.body;

  if (!author || !email || !text) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const sql = 'INSERT INTO comments (post_id, author, email, text) VALUES (?, ?, ?, ?)';
  const values = [postId, author, email, text];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.log('Error creating comment:', error);
      return res.status(500).json({ error: 'Error creating comment' });
    }

    res.json({ message: 'Comment created successfully' });
  });
});

// Get all comments for a post by ID
app.get('/api/posts/:postId/comments', (req, res) => {
  const postId = req.params.postId;
  const sql = 'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC';

  connection.query(sql, postId, (error, results, fields) => {
    if (error) {
      console.log('Error getting comments:', error);
      return res.status(500).json({ error: 'Error getting comments' });
    }

    res.json(results);
  });
});

connection.connect((err)=>{
    if(err){
        
        throw err
        console.log("Could not connect to database :(")
    return
    };
    
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    
    });
})
