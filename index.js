require('dotenv').config()
const axios = require('axios')

const { 
  PROTOCOL, 
  BASE_URL_GEO, 
  APPID, 
  Q,
  LIMIT
} = process.env

const URL = `${PROTOCOL}://${BASE_URL_GEO}?q=${Q}&limit=${LIMIT}&appid=${APPID}`

//DISPARANDOA REQUISIÇÃO HTTPS
const promiseResultante = axios.get(URL)

promiseResultante
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
    });
})
.catch((erro) => {
    console.log(`Erro: ${erro}`)
})
