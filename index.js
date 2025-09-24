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

const promiseResultante = axios.get(URL)

const pesquisa = promiseResultante
.then((resposta) => {
    const list = resposta.data
    return list
})
.then((resposta) => {
    resposta.forEach(cidade => {
        console.log(`Cidade: ${cidade.name}`)
        console.log(`Latitude: ${cidade.lat}`)
        console.log(`Longitude: ${cidade.lon}`)

        previsao(cidade)
        news()
    });
})
.catch((erro) => {
    console.log(`Erro: ${erro}`)
})

async function previsao(cidade){
    try{
        const { 
            PROTOCOL, 
            BASE_URL_WEATHER, 
            APPID,
            UNITS,
            IDIOM: LANG
        } = process.env
        
        const URL2 = `${PROTOCOL}://${BASE_URL_WEATHER}?lat=${cidade.lat}&lon=${cidade.lon}&units=${UNITS}&lang=${LANG}&appid=${APPID}`
        
        const promiseResultante2 = await axios.get(URL2)

        console.log(`Sensacao termica: ${promiseResultante2.data.main.feels_like}º celsius`)
        console.log(`Descricao: ${promiseResultante2.data.weather[0].description}`)
    }
    catch(err){
        console.log(`Erro: ${err}`)
    }

}

async function news(){
    try{
        const {
            PROTOCOL,
            BASE_URL_NEWS,
            APIKEY_NEWS,
            Q,
            FROM,
            SORTBY
        } = process.env

        const URL3 = `${PROTOCOL}://${BASE_URL_NEWS}?q=${Q}&from=${FROM}&sortBy=${SORTBY}&apiKey=${APIKEY_NEWS}`
        
        const promiseResultante3 = await axios.get(URL3)

        const articles = promiseResultante3.data.articles

        console.log(`Noticias:`)

        articles.forEach((artigo, i) => {
            console.log(`\nArtigo ${i + 1}`)
            console.log(artigo)
        })
    }
    catch(err){
        console.log(`Erro: ${err}`)
    }
}