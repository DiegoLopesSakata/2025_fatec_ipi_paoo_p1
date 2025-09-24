require('dotenv').config()
const axios = require('axios')

const { 
    PROTOCOL, 
    BASE_URL_GEO, 
    APPID, 
    Q,
    LIMIT,
} = process.env

const URL = `${PROTOCOL}://${BASE_URL_GEO}?q=${Q}&limit=${LIMIT}&appid=${APPID}`

//DISPARANDOA REQUISIÇÃO HTTPS
const promiseResultante = axios.get(URL)

const pesquisa = promiseResultante
.then((resposta) => {
    const list = resposta.data
    return list
})
.then((resposta) => {
    //exibir longitude e latitude da cidade
    resposta.forEach(pesquisa => {
        console.log(`Cidade: ${pesquisa.name}`)
        console.log(`Latitude: ${pesquisa.lat}`)
        console.log(`Longitude: ${pesquisa.lon}`)

        previsao(pesquisa)
    });
})
.catch((erro) => {
    console.log(`Erro: ${erro}`)
})

async function previsao(pesquisa){
    try{
        const { 
            PROTOCOL, 
            BASE_URL_WEATHER, 
            APPID,
            UNITS,
            IDIOM: LANG
        } = process.env
        
        const URL2 = `${PROTOCOL}://${BASE_URL_WEATHER}?lat=${pesquisa.lat}&lon=${pesquisa.lon}&units=${UNITS}&lang=${LANG}&appid=${APPID}`
        
        const promiseResultante2 = await axios.get(URL2)

        console.log(`Sensacao termica: ${promiseResultante2.data.main.feels_like}º celsius`)
        console.log(`Descricao: ${promiseResultante2.data.weather[0].description}`)
    }
    catch(err){
        console.log(`Erro: ${err}`)
    }
    
}