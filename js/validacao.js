export function valida(input){
    const tipoDeInput = input.dataset.tipo

    if (validadores[tipoDeInput]){
        validadores[tipoDeInput] (input)
    }
    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = ""

    } else {
        input.parentElement.classList.add('input-container--invalido')
        input.parentElement.querySelector('.input-mensagem-erro').innerHTML = mostraMensagemDeErro(tipoDeInput, input)

    }

    const tiposDeErro = [
        'valuemissing',
        'typeMismatch',
        'patternMismatch',
        'CustomError'
    ]


    const mensagensDeErro = {
        nome:{
            valueMissing: 'O campo não pode estar vazio, favor preencher'
        },
        email: {
            valueMissing: 'O campo de email não pode estar vazio, favor preencher',
            typeMismatch: 'O email digita não é valido'
        },
        senha:{
            valueMissing: 'O campo de senha não pode estar vazio',
            patternMismatch: '"A senha deve conter entre 6 a 12 caracteres, deve conter pelo menos uma letra maiúscula, um número e não deve conter símbolos'
        },
        dataNascimento: {
            valueMissing: 'O campo de data de nascimento, não pode estar vazio, favor preencher',
            customError: 'Você deve ser maio de 18 anos para de cadastrar'
        }

    }
}

function mostraMensagemDeErro (tipoDeInput, input) {
    let mensagem = ""
    tiposDeErro.forEach(erro => {
        if(input.validity[erro]){
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    });

    return mensagem;
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

function validaDataNascimento (input){
    const dataRecebida = new Date(input.value)
    let mensagem = "";

    if (!maiorQue18(dataRecebida)){
    mensagem = "Você tem que ser maior que 18 anos para se cadastrar"
}


    input.setCustomValidity(mensagem)

}

function maiorQue18 (data){
    const dataAtual = new Date()
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate())

    return dataMais18 <= dataAtual

}