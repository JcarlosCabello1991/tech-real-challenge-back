import fetch from 'node-fetch'
import dotenv from 'dotenv'
import connect from '../../../db/db';
import { HydratedDocument, Model } from "mongoose";
import uploadToCloudinary from '../../../utils/cloudinary/cloudinary'

dotenv.config();

// const API_KEY = "fW7RJcKvDd32fjsk00q62a1pLunvgQoM";
const API_KEY = process.env.API_KEY;

export const getGifs = async (payload:string) => {
  let response: any={};
  if(payload == "trendings")response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&tag=&rating=g`)
  if(payload == "reactions")response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=reactions&limit=50&offset=0&rating=g&lang=en`)
  if(payload == "sports") response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=sports&limit=50&offset=0&rating=g&lang=en`)
  const data = await response.json();
  return data;
}

//Getting data from our DataBase Gifs
export const getGifsFromDB = async <T>(model:Model<T>, payload:string) => {
  let response:any = await model.find({});

  if(response.length == 0) {
    response = await getGifs(payload);
    //Here im going to push in the dataBase all the gifes received from giphy API
    response.data.map((resp:any) => {
      model.create({typeData:resp.type, image: resp.images.preview_gif.url, id: resp.id, name: resp.title})
    })
  }
  //Si la response no tiene nada entonces llamamos a getGifs y devolvemos esa informacion
  return response;
}

export const addGifsToDB = async <T>(model:Model<T>, payload:{typeData:string, name:string, image:string | undefined, id:string}) => {
  const { image } = payload;
  const secure_url: string | undefined = await uploadToCloudinary(image)
  payload.image = secure_url;
  const response = await model.create(payload);
  //Cloudinary
  return response;
}

export const deleteGifFromDB = async <T>(model:Model<T>, id:string | undefined) => {
  let response:any = await model.find({});

  let gifToDelete:string = "";

  response.map((resp:any) => {
    if(resp.id == id) {
      gifToDelete = resp._id;
    }
  })
  response = await model.findByIdAndDelete(gifToDelete);
  return response;  
}

export const updateGifFromDB = async <T>(model:Model<T>, body:{typeData:string, name:string, image: string | undefined, id: string}) => {
  let response:any = await model.find({});

  let gifToUpdate:string = "";

  response.map((resp:any) => {
    if(resp.id == body.id) {
      gifToUpdate = resp._id;
    }
  })
  if(body.image?.split(':')[0] != "https"){
    const secure_url: string | undefined = await uploadToCloudinary(body.image)
    body.image = secure_url;
  }
  response = await model.findByIdAndUpdate(gifToUpdate,{$set:{typeData:body.typeData, name: body.name, image: body.image, id: body.id}});
  return response; 
}