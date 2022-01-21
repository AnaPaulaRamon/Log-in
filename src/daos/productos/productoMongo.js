import MongoContainer from "../../contenedores/MongoContainer.js";

export default class ProductoMongo extends MongoContainer{
    constructor(){
        super(
            'productos',
            {
                nombre: {type:String, required:true},
                precio:{type:String, required:true},
                thumbnail:{type:String, required:true},
            },{timestamps:false}
        )
    }
}