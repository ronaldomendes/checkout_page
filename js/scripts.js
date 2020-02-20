let inputCPF = document.getElementById('cpfUsuario')
let inputSenha = document.getElementById('senhaUsuario')
let inputConfirmaSenha = document.getElementById('confirmarSenhaUsuario')
let inputCEP = document.getElementById('cepUsuario')
let inputCartao = document.getElementById('cartaoUsuario')
let inputCVV = document.getElementById('cvvCartao')
let inputCpfTitularCartao = document.getElementById('cpfTitularCartao')

let minhaUrl = url => `http://viacep.com.br/ws/${url}/json/`
let config = {
    method: 'get'
}

// validando para que o campo receba apenas números
inputCPF.addEventListener('keyup', () => {
    if (isNaN(inputCPF.value)) {
        inputCPF.value = inputCPF.value.substring(0, (inputCPF.value.length - 1))
    }
    if (inputCPF.value.length >= 11) {
        inputCPF.value = inputCPF.value.substring(0, 11)
    }
})

// validando a confirmação de senha
inputConfirmaSenha.addEventListener('keyup', () => {
    if (inputConfirmaSenha.value != inputSenha.value) {
        inputConfirmaSenha.classList.add('border', 'border-danger', 'is-invalid')
        inputSenha.classList.add('border', 'border-danger', 'is-invalid')
    } else {
        inputConfirmaSenha.classList.remove('border', 'border-danger', 'is-invalid')
        inputSenha.classList.remove('border', 'border-danger', 'is-invalid')
        inputConfirmaSenha.classList.add('border', 'border-success', 'is-valid')
        inputSenha.classList.add('border', 'border-success', 'is-valid')
    }
})

// pesquisando um cep com fetch
function buscaCEP(cep) {
    let busca = minhaUrl(cep)
    fetch(busca, config)
        .then((resp) => resp.json())
        .then(json => {
            if (json.erro) {
                inputCEP.classList.remove('border', 'border-success', 'is-valid')
                inputCEP.classList.add('border', 'border-danger', 'is-invalid')
            } else {
                inputCEP.classList.remove('border', 'border-danger', 'is-invalid')
                inputCEP.classList.add('border', 'border-success', 'is-valid')
                document.getElementById('enderecoUsuario').value = json.logradouro
                document.getElementById('bairroUsuario').value = json.bairro
                document.getElementById('cidadeUsuario').value = json.localidade
                document.getElementById('ufUsuario').value = json.uf
            }
        })
}

// validando o campo de CEP
inputCEP.addEventListener('keyup', () => {
    if (isNaN(inputCEP.value)) {
        inputCEP.value = inputCEP.value.substring(0, (inputCEP.value.length - 1))
    }
    if (inputCEP.value.length >= 8) {
        inputCEP.value = inputCEP.value.substring(0, 8)
        buscaCEP(inputCEP.value)
    }
})

// validando o campo de cartão
inputCartao.addEventListener('keyup', () => {
    if (isNaN(inputCartao.value)) {
        inputCartao.value = inputCartao.value.substring(0, (inputCartao.value.length - 1))
    }
    if (inputCartao.value.length >= 16) {
        inputCartao.value = inputCartao.value.substring(0, 16)
    }
})

// validando o campo de chave de segurança
inputCVV.addEventListener('keyup', () => {
    if (isNaN(inputCVV.value)) {
        inputCVV.value = inputCVV.value.substring(0, (inputCVV.value.length - 1))
    }
    if (inputCVV.value.length >= 3) {
        inputCVV.value = inputCVV.value.substring(0, 3)
    }
})

// validando o CPF do titular do cartão
inputCpfTitularCartao.addEventListener('keyup', () => {
    if (isNaN(inputCpfTitularCartao.value)) {
        inputCpfTitularCartao.value = inputCpfTitularCartao.value.substring(0, (inputCpfTitularCartao.value.length - 1))
    }
    if (inputCpfTitularCartao.value.length >= 11) {
        inputCpfTitularCartao.value = inputCpfTitularCartao.value.substring(0, 11)
    }
})
