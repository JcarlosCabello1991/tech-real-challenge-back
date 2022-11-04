import express,{ Router } from 'express'
import cors from 'cors'
import { routerGifs } from './router/router';
import dotenv from 'dotenv'

dotenv.config();

// const app = express();

export default async(app) => {
  app.use(cors({
    origin:'*'
  }))

  const router = Router();

  app.use(router);
  app.use(express.json({ limit: "50mb" }));

  routerGifs(app);

  app.listen(process.env.PORT_SERVER || 4000, () => {
    console.log("Server running");
  })
}