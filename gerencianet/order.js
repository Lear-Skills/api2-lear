const Gerencianet = require('gn-api-sdk-node')

options = {
    // PRODUÇÃO = false
	// HOMOLOGAÇÃO = true
	sandbox: false,
	client_id: 'seuClientId',
	client_secret: 'seuClientSecret',
	certificate: 'caminhoAteOCertificadoPix',
}

const gerencianet = new Gerencianet(options)

async function createCharge(expDate, CPF, fullname, price,){
    let body = {
        calendario: {
            expiracao: expDate,
        },
        devedor: {
            cpf: CPF.replace(/\D/g,''),
            nome: fullname,
        },
        valor: {
            original: price.toFixed(2),
        },
        chave: 'SUACHAVEPIX', // Informe sua chave Pix cadastrada na gerencianet	
    }


    const response = await gerencianet.pixCreateImmediateCharge([], body);
    return response
    //retorna os dados da cobrança

}

async function generateQRCode(charge){
    let params = {
        id: charge.loc.id,
    }
    const response = await gerencianet.pixGenerateQRCode(params);   
    return response
    //Desse response sai um JSON Result com
    //result: {qrcode / imagemQrCode}
    //o primeiro para copiar e colar, e o  segundo a imagem png
}
//Para coletar a id da transação, pegue o charge.txid
// com essa informação podemos confirmar se o pagamento foi efetuado ou não