/* eslint-disable indent */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import env from 'dotenv';

env.config();
const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

// Routes here


app.get('/', (req, res) => {
  res.send(`<h1>Welcome to the ----- Application</h1>
  <h4>Please use PostMan and navigate to <code>/api/v1</code> to use the app</h4>
  <p>For any more info please visit my <a href=''>Github</a> page</P>
  <h4>Thanks  &#x1F600;</h4>`);
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'you have entered an incorrect route',
  });
});

app
  .listen(port, () => console.log(`Welcome, listening on ${port}`))
  .on('error', (err) => {
    if (err.syscall !== 'listen') {
      throw err;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw err;
    }
  });

export default app;