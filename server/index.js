const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const app = express();

const server = app.listen(PORT, () => console.log(`listening on the port ${PORT}`));

module.exports = app;

app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// Handling 404
app.use((req, res, next) => (
  path.extname(req.path).length > 0
    ? res.status(404).send('Not found')
    : next()
));

// Send index.html
app.use('*', (req, res, next) => 
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// Error handling
app.use((err, req, res, next) => 
  res.status(err.status || 500)
    .send(err.message || 'Internal server error.')
);

