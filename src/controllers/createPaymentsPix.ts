import EfiPay from "sdk-typescript-apis-efi";

const options = {
    sandbox: true,
	client_id: 'seuClientId',
	client_secret: 'seuClientSecret',
	certificate: 'caminhoAteOCertificadoPix'
}


export function CreatePix (seconds: Number, cpf: string, fullname: string, value: string) {
    const body = {
        calendario: {
            expiracao: seconds,
        },
        devedor: {
            cpf: cpf.replace(/\D/g,''),
            nome: fullname,
        },
        valor: {
            original: value,
        },
        chave: 'cd74dc5d-9a99-4a1a-bda4-6588cf707796', // Informe sua chave Pix cadastrada na efipay	//o campo abaixo é opcional
        infoAdicionais: [
            {
                nome: 'Pagamento em',
                valor: 'Sol-Pix',
            },
            {
                nome: 'Pedido',
                valor: 'NUMERO DO PEDIDO DO CLIENTE',
            },
        ],
    };
}


