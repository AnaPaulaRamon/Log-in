import MongoContainer from "../../contenedores/MongoContainer.js";

export default class MensajeMongo extends MongoContainer{
    constructor(){
        super(
            'mensajes',
            {
                author: {
                    id:{type:String, required:true},
                    nombre: {type:String, required:true},
                    apellido:{type:String, required:true},
                    edad:{type:Number, required:true},
                    alias:{type:String, required:true},
                    avatar:{type:String, required:false},
                },
                text:{type:String, required:true}
            },{timestamps:true}
        )
    }
}