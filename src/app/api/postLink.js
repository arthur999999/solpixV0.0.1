import axios from "axios";


export async function postLink(name, cpf, link){
    const response = await axios.post('/parseUrl', {
        url: link,
        name: name,
        cpf: cpf
    })

    return response
}