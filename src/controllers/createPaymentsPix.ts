import EfiPay from "sdk-typescript-apis-efi";

const options = {
    sandbox: false,
	client_id: 'Client_Id_89c29e19b8a719ce14b1d7539e56f39ddaf4bb6d',
	client_secret: 'Client_Secret_b8d216f0ffa600d3616f5d834b5a4fd466f55790',
	certificate: __dirname + '/producao-502074-solpix.p12',
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
            original: ((value * 5).toFixed(2)).toString(),
        },
        chave: 'wesolpix@gmail.com'
    };

    try {
        
        const response = await efipay.pixCreateImmediateCharge([], body)
        const responsePix = {
            txid: response.txid,
            valor: response.valor,
            devedor: response.devedor,
            chave: response.chave
        }

        const params = {
            id: response.loc.id.toString()
        }

        const linkResponse = await efipay.pixGenerateQRCode(params)
        return { link: linkResponse.qrcode, responsePix: responsePix }

    } catch (error: any) {
    
        console.log(error)
        throw new Error(error.mensagem);
    }

   
}

export async function checkThePix(txid: string) {
    const params = {
        txid: txid
    };

    try {
        const response = await efipay.pixDetailCharge(params)
        const responseVerifyPix = {
            status: response.status,
            valor: response.valor,
            devedor: response.devedor,
        }
        return responseVerifyPix;
    } catch (error: any) {
        console.log(error)
        throw new Error(error.mensagem);
    }
}


