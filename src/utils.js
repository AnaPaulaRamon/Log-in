import {fileURLToPath} from 'url';
import {dirname} from 'path'; 
import fs from 'fs';
import moment from 'moment';
import faker from 'faker';

const filename= fileURLToPath(import.meta.url);
const __dirname = dirname(filename); 

export async function saveMsg(str) {
    try{
        let data = await fs.promises.readFile(__dirname+'/files/messages.txt', 'utf-8');
        console.log('esto resulta de leer', data);
        let dataObj = JSON.parse(data);
        let horario = moment();
        horario = horario.format('DD/MM/YYYY HH:mm:ss');

        let objNew = {
            user: str.user,
            message: str.message,
            date: horario
        }

        dataObj.push(objNew);
            try{
                await fs.promises.writeFile(__dirname+'/files/messages.txt', JSON.stringify(dataObj, null, 2));
                return {status: "success", message: "El mensaje se añadio con exito", data: dataObj}
            } catch(err) {
                return {status: "error", message: "No se pudo añadir el mensaje ", err};
            }
        
    } catch(err){
        let horario = moment();
        horario = horario.format('YYYY-MM-DD HH:mm');


        let objNew = {
            user: str.user,
            message: str.message,
            date: horario
        }
        try {
            await fs.promises.writeFile(__dirname+'/files/messages.txt', JSON.stringify([objNew], null, 2));
            return {status:"success", message: "El mensaje se añadio con exito"};
        } catch(err) {
            return {status: "error", message: `No se pudo añadir el mensaje a carpeta inexistente: `, err}
        }
}
}


export const generateProducts = () => {
    let products= [];
    for(let i = 0; i < 5; i++) {
        products.push({
            nombre:faker.commerce.productName(),
            precio:faker.commerce.price(14, 34, 2, '$'),
            thumbnail:faker.image.food(),
        })
    }
    return products;
}

export const generateMessages = () => {
    let messages = [];
    for(let i = 0; i < 4; i++) {
        messages.push({
            author:{
                id: faker.internet.email(),
                nombre:faker.name.firstName(),
                apellido:faker.name.lastName(),
                edad:faker.commerce.price(18, 64, 0, null),
                alias:faker.name.findName(),
                avatar:faker.image.imageUrl()
            },
            text:faker.lorem.sentence()
        })

    }
   // console.log('estos son los mensajes envidos', messages)
    return messages;
}

export default __dirname;