import https from 'https';
import fs from 'fs';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import trackingRoutes from './routes/tracking.js';

dotenv.config();
const app = express();

const port = 8088;
const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
};

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the tracking routes
app.use('/tracking', trackingRoutes);

const server = https.createServer(httpsOptions, app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
