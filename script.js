// Teste apenas
const modoTeste=false
const modoTesteErro=false

const objEndTeste={   
    bairro:  "Centro",
    cep: "14780-328",
    complemento: "",
    ddd: "17",
    ibge:"3505500",
    localidade: "Barretos",
    logradouro: "Praça Nove de Julho",
    uf: "SP"
}

function Iniciar( document ) {
    
    this.document = document
    
    visibilidadeProgressBar( false )

    const main = this.document.querySelector('main') 
    main.style.display="none"

    // const input_cep = this.document.querySelector('.input-cep')    
    // input_cep.value = "14780328"

    const submit = this.document.querySelector('[wm-submit]')
    submit.addEventListener("click", ProcessarInput, true )

    var elem =  this.document.querySelector("footer")
    elem.style.display="none"

    //submit.onclick = function(e) {
        //Iniciar(e)
    //}

}


function ProcessarInput( e ) {

    e.preventDefault()
    const form  = document.querySelector('.form-cep') // e.target.parentNode
    const formData = new FormData(form)
    
    let dadosJson = requisicaoCep( formData.get('input-cep'),apresentarDadosDoCep
, document)

    
}

function apresentarDadosDoCep( jsonData) {    
    
    const main = this.document.querySelector('main') 
    
    let campoLogradouro = this.document.querySelector('.logradouro')    
    
    if (jsonData.logradouro===undefined)
    {
        main.style.display="none"    
        tratarErro("Não foi possível identificar o endereço deste CEP.")
    }
    else
    {
        main.style.display="block"    

        campoLogradouro.innerHTML = jsonData.logradouro

        let campoComplemento = this.document.querySelector(".complemento")
        if (jsonData.complemento !="")
        {
            campoComplemento.style.display = "block"
            campoComplemento.innerHTML = jsonData.complemento
        }
        else
        {
            campoComplemento.style.display = "none"
        }

        let campoLocalidade = this.document.querySelector(".localidade")
        campoLocalidade.innerHTML = jsonData.localidade
        
        let campoUf = this.document.querySelector(".uf")
        campoUf.innerHTML = jsonData.uf

        let campoBairro = this.document.querySelector(".bairro")
        campoBairro.innerHTML = jsonData.bairro

        let campoDdd = this.document.querySelector(".ddd")
        campoDdd.innerHTML =  jsonData.ddd

        let campoIbge = this.document.querySelector(".ibge")
        campoIbge.innerHTML =  jsonData.ibge
    }
    
}

function visibilidadeProgressBar( visivel )
{
    this.document.getElementById("myBar")
        .style.display= visivel ? "block" : "none"
    
}

async function ativarProgressBar()
{
    visibilidadeProgressBar( true )
    
    var elem = this.document.getElementById("myBar");    
    var width = 1;
    for (let width = 0; width < 100; width++) {            
        elem.style.width = width + "%";
        await sleep(10)
    }        
    visibilidadeProgressBar( false )

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function filtrarSomenteDigitosNumericos(cep) {
    return cep.replace(/\D/g, '')
}

async function requisicaoCep(cep, apresentarDadosDoCep
) {
    cep = filtrarSomenteDigitosNumericos(cep)
    
    if (cep!="" && cep.length==8)
    {

        let url = 'https://viacep.com.br/ws/' + cep + '/json';    
        
        await ativarProgressBar()              

        if (modoTeste)
        {

            if (modoTesteErro)
            {
                tratarErro( "Erro")
                return ""
                
            }

            apresentarDadosDoCep(objEndTeste)

            return ""
        }
        

        fetch(url)           
            .then(response => {
                if (response.ok) {            
                    return response.json()
                }
                else
                {
                    ThrowException()
                }
            })
            .then (data=> {
                apresentarDadosDoCep(data)
                
            })
            .catch( error => {
                tratarErro( `Erro do servidor: ${error}. <br>Possiveis causas: servidor viacep offline, serviços em manutenção, erro de compatibilidade. Aguarde e tente mais tarde.`)
        })
    }
}

function tratarErro(error) {
    var elem =  this.document.querySelector("footer")
    elem.style.display="block"    
    console.log(error)
    elem.innerHTML = error
}

function ThrowException() {
    throw new Error("Falha na requisição da API")
}

function copiarParaClipboard( divConteudo) {
    var range = this.document.createRange()

    let divx = this.document.querySelector(divConteudo)

    range.selectNode( divx )

    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    this.document.execCommand("copy")
    window.getSelection().removeAllRanges()
    EfeitoAnimarAtivar(divx)
    
}

function EfeitoAnimarAtivar( container) {
    
    id1=setInterval(() => {
        container.style.fontSize="30px"        
        clearInterval(id1)
    }, 100)
    
    id2=setInterval(() => {
        container.style.fontSize="25px"        
        clearInterval(id2)
    }, 500)


}
