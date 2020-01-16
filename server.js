const express = require('express');
const mongoose = require('mongoose');
const myRouter = require('./routes/index');

console.log(process.env.NODE_ENV)

const keys = require('./config/index');

mongoose.connect(keys.mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log(`Connected to database successfully ${keys.mongo_uri}`))
  .catch(console.log)

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', express.static('./public'))

// serve static folder
app.use('/uploads', express.static('./uploads'))

app.use('/api', myRouter); // localhost:5000/api
app.use('/docs', require('./routes/docs'));

const port = process.env.PORT || keys.port;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})