import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
dotenv.config();

const port = process.env.PORT || 3333;



app.listen(port,()=>{console.log(`server running at port:  ${port}`)});
