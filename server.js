const express = require('express');
const app = express();
const jsonParser = express.json();

app.set('json spaces', 2)

let db = {
  cards: [
    {
      text: 'some card',
      id: 0,
      userId: 1,
      state: 'new'
    }
  ],
  cardIndex: 1,
  users: [
    { login: 'ivan', id: 1, password: 'qwe' },
    { login: 'nikolay', id: 2, password: 'qwe' },
    { login: 'stepan', id: 3, password: 'qwe' },
  ]
}

function resolveCors(res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
} 

app.use('/card', jsonParser, function (req, res) {
  resolveCors(res);
  console.log({ alert: 'onRequest', method: req, params: req.params, body: req.body });
  let card;
  switch (req.method) {
    case 'GET':
      res.json(db.cards)
      break;
    case 'PUT':
      card = {
        text: req.body.text,
        id: db.cardIndex++,
        userId: db.users.find(user => user.login === req.body.user).id
      };
      db.cards.push(card);
      res.json({ result: 'success', card: db.card });
      break;
    case 'POST':
      card = db.cards.find(card => card.id === req.body.id).text = req.body.text;
      res.json({ result: 'success', card: db.card });
      break;
    case 'DELETE':
      db.cards = db.cards.filter(card => card.id !== req.body.id);
      res.json({ result: 'success' });
      break;
    default:
      console.log('error request', req.method, req.url);
  }
  console.log('cards: ', db.cards);
});

app.use('/db', jsonParser, function (req, res) {
  resolveCors(res);
  res.json(db);
});

// app.use('/user', jsonParser, function (req, res) {
//   resolveCors(res);
//   switch (req.method) {
//     case 'GET':
//       break;
//     case 'PUT':
//       cards.push(req.body.title);
//       break;
//     case 'DELETE':
//       cards = cards.filter(item => item !== req.body.title);
//       break;
//     default:
//       console.log('error request', req.method, req.url);
//   }
//   console.log('cards: ', cards);
//   res.json(cards);  
// });

// app.use('/authorization', jsonParser, function (req, res) {
//   resolveCors(res);
//   switch (req.method) {
//     case 'POST':
//       cards.push(req.body.title);
//       break;
//     default:
//       console.log('error request', req.method, req.url);
//   }
//   console.log('authorization: ', cards);
//   res.json(cards);  
// });

app.listen(3000, function () {
  console.log('ExpressJs server run on 3000 port');
});
