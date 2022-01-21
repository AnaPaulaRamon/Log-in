import { generateMessages, generateProducts } from "../utils.js";
import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://Ana:123@mocksynormalizacion.wf5fj.mongodb.net/mocksynormalizacion?retryWrites=true&w=majority", {useNewUrlParser:true, useUnifiedTopology:true})

export default class MongoContainer{
    constructor(collection,schema,timestamps){
        this.collection = mongoose.model(collection, new mongoose.Schema(schema,timestamps));
    }

    generateProd = async()  => {
        try{
            const newProducts = generateProducts();
            let result = await this.collection.create(newProducts);
            return {status:"success", message:"El documento ha sido añadido exitosamente", payload:result}            
        } catch(err){
            return {status: "error", message: `No se pudo añadir el producto a carpeta inexistente: ${err}`}
        }
    }

    registerMessage = async(mssg) => {
        try{
            const mssgArr = [mssg];
            const newMessages = generateMessages();
            const messages = mssgArr.concat(newMessages);
            let result = await this.collection.create(messages);
            return {status:"success", message:"El mensaje se ha enviado con éxito", messages:result}            
        } catch(err){
            return {status: "error", message: `No se pudo enviar el mensaje: ${err}`}
        }
    }

    logInUser = async(user) => {
        try{
            let result = await this.collection.create(user);
            return {status:"success", message:"El usuario se ha logeado con éxito", messages:result}            
        } catch(err){
            return {status: "error", message: `No se pudo logear al usuario: ${err}`}
        }
    }

    // getUser = async(user) => {
    //     try{
    //         let result = await this.collection.create(user);
    //         return {status:"success", message:"El usuario se ha logeado con éxito", messages:result}            
    //     } catch(err){
    //         return {status: "error", message: `No se pudo logear al usuario: ${err}`}
    //     }
    // }

    getAll = async() =>{
        try{
            let documents = await this.collection.find().lean();
            return {status: "success", payload: documents}
        }catch(err){
            return {status:"error", error: err}
        }
    }


    deleteAll = async() => {
        try {
            await this.collection.deleteMany({});
            return {status: "success", message: "Todos los objetos fueron borrados exitosamente"};
        } catch(err) {
            return {status: "error", message: 'No se pudo borrar los objetos'};
        }
    }
}