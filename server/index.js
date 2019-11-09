import express from 'express'
import bodyParser from 'body-parser'

import useRoutes from './routes'

const app = express();

app.use(bodyParser.json());

useRoutes(app);

app.listen(5000, () => console.log("Server listen on port 5000"));