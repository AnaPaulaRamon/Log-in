let mensajes;
let productos;
let users;

let persistence = 'mongo';

switch(persistence){
    case "mongo":
        const {default:ProductoMongo} = await import ('./productos/productoMongo.js');
        const {default:MensajeMongo} = await import ('./mensajes/mensajeMongo.js');
        const {default:UserMongo} = await import ('./users/userMongo.js');
        mensajes = new MensajeMongo();
        productos = new ProductoMongo();
        users = new UserMongo();
        break;
    default:

}

export {mensajes,productos,users}