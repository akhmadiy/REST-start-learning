const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let users = [
  {
    id: 1,
    username: 'Abdul',
    position: 'Engineer'
  },
  {
    id: 2,
    username: 'Bilal',
    position: 'Manager'
  }
];

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// localhost:3000/users
app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const newUser = req.body;
  const lasatID = users[users.length - 1].id;

  newUser.id = lasatID + 1;
  users.push(newUser);

  res.json(newUser);
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.json({
      code: 404,
      msg: 'NOT_FOUND'
    });
  }
  res.json(targetUser);
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;

  const { username, position } = req.body;

  if (!username && !position) {
    return res.json({
      code: 400,
      msg: 'BAD_REQUEST'
    });
  }
  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.json({
      code: 404,
      msg: 'NOT_FOUND'
    });
  }

  if (username) {
    targetUser.username = username;
  }
  if (position) {
    targetUser.position = position;
  }

  users = users.map((user) => {
    if (user.id == userId) {
      return targetUser;
    }
    return user;
  });

  res.json(targetUser);
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const targetUser = users.find((user) => user.id == userId);

  if (!targetUser) {
    return res.json({
      code: 404,
      msg: 'NOT_FOUND'
    });
  }

  users = users.filter((user) => user.id != userId)

  res.json(targetUser);
});

const PORT = 3000;
app.listen(3000, () => {
  console.log(`Server started on ${PORT}`);
});