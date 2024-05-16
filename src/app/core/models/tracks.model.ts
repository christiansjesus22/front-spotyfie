import { artistModel } from "./artistModel";
import { songStorageModel } from "./songStorageModel";
import {storageModel} from "./storageModel"

export interface tracksModel{
    id:number
    name:string;
    album:string;
   //modelo de storageimg --cambiar luego por imgStorage
    storage?:storageModel;
    //modelo de storageSong
    songStorage?:songStorageModel
    //modelo artista --> arreglar
    artist?:artistModel;
    artist_name?:string;
    createdAt?:String;
    //ids para la creacion de tracks 
    mediaId:string;
    songId:string;
}