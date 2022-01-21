import MongoContainer from "../../contenedores/MongoContainer.js";

export default class UserMongo extends MongoContainer{
    constructor(){
        super(
            'users',
            {
                username:{type:String, required:true}
            },{timestamps:true}
        )
    }
}