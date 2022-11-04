import { Request, Response, NextFunction } from "express"
import { addGifsToDB, deleteGifFromDB, getGifs, getGifsFromDB, updateGifFromDB } from "./controller/ApiGif/apigif"
import database from '../models/index'

export const routerGifs = (app:any) => {

  app.get('/gifsDB/:category', async (req: Request, res: Response, _next:NextFunction) => {
    const payload = req.params.category;
    try{
      let response:[]=[];

      if(req.params.category == "trending")response = await getGifsFromDB(database.Gif, payload);
      if(req.params.category == "reactions")response = await getGifsFromDB(database.Reaction, payload);
      if(req.params.category == "sports")response = await getGifsFromDB(database.Sport, payload);

      res.status(200).send({ok:true, msg:response})
    }catch(error){
      res.status(400).send({ok:false, msg: error})
    }    
  })

  app.post('/gifsDB/upload', async (req: Request, res: Response, _next:NextFunction) => {
    const payload = req.body;
    console.log(payload);
    const response = await addGifsToDB(database.Gif, payload);
    res.status(200).send({ok:true, msg:response})
  })

  app.delete('/gifsDB/delete/:id',  async (req: Request, res: Response, _next:NextFunction) => {
    const id: string | undefined = req.params.id;

    const response = await deleteGifFromDB(database.Gif, id);

    res.status(200).send({ok:true, msg: response});
  })

  app.patch('/gifsDB/update',  async (req: Request, res: Response, _next:NextFunction) => {
    const response = await updateGifFromDB(database.Gif, req.body)

    res.status(200).send({ok:true, msg: response});
  })
}