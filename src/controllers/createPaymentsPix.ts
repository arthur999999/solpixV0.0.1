import EfiPay from "sdk-typescript-apis-efi";

const options = {
    sandbox: true,
	client_id: 'Client_Id_40fb9aefbdbb019556b0ffc1bb90abe9b3308a52',
	client_secret: 'Client_Secret_33c3f627d05c6e89aab543aacc5e0c6a51dd286f',
	certificate: __dirname + '/homologacao-502074-solpixhomo.p12'
}

const efipay = new EfiPay(options)


export async function CreatePix (seconds: Number, cpf: string, fullname: string, value: number) {
    const body = {
        calendario: {
            expiracao: seconds,
        },
        devedor: {
            cpf: cpf.replace(/\D/g,''),
            nome: fullname,
        },
        valor: {
            original: (value.toFixed(2)).toString(),
        },
        chave: 'wesolpix@gmail.com', 
        infoAdicionais: [
            {
                nome: 'Pagamento em',
                valor: 'Sol Pix',
            }
        ],
    };

    try {
        
        const response = await efipay.pixCreateImmediateCharge([], body)
        const responsePix = {
            txid: response.txid,
            valor: response.valor,
            devedor: response.devedor,
            chave: response.chave
        }
        return responsePix ;

    } catch (error) {
        
        console.log(error)
    }

   
}

export async function checkThePix(txid: string) {
    const params = {
        txid: txid,
    };

    try {
        const response = await efipay.pixDetailCharge(params)
        const responseVerifyPix = {
            status: response.status,
            valor: response.valor,
            devedor: response.devedor,
        }
        return responseVerifyPix;
    } catch (e) {
        console.log(e)
    }
}


