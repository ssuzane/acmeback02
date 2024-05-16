/**
 * Autor: suzane A. Hora
 * objetivo:
 * data:01.02.024
 * versão: 1.0
 */


var acmeFilme = require('../model/filmes.js')


//Função que lista todos os filmes e suas informações
const getListaDeFilmes = function () {
    let filmes = acmeFilme.filmes.filmes;
    let filmesArray = [];
    let listaFilmes = {};

    filmes.forEach(function (getFilmes) {
        let filmeInfo = {
            id: getFilmes.id,
            nome: getFilmes.nome,
            sinopse: getFilmes.sinopse,
            duracao: getFilmes.duracao,
            data_lancamento: getFilmes.data_lancamento,
            data_relancamento: getFilmes.data_relancamento,
            foto_capa: getFilmes.foto_capa,
            valor: getFilmes.valor_unitario
            
        };

        filmesArray.push(filmeInfo);
    });

    listaFilmes.filmes = filmesArray;

    return listaFilmes;
};

//Função que lista os filmes e suas informações com base em um critério(ID)
const getFilme = function (id) {

   //Recebe o ID do Filme
   let idFilme = id;
   //Cria o objeto JSON
   let filmesJSON = {};

   //Validação para verificar se o ID é válido 
       //(vazio, indefinido ou não numérico)
   if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
       return message.ERROR_INVALID_ID; //400
   }else{

       //Encaminha o ID para o DAO buscar no Banco de dados
       let dadosFilme =  filmeDAO.selectByIdFilme(idFilme);

       //Verifica se o DAO retornou dados
       if(dadosFilme){

           //Validação para verificar a quantidade de itens retornados
           if(dadosFilme.length > 0){
               //Cria o JSON para retorno
               filmesJSON.filme = dadosFilme;
               filmesJSON.status_code = 200;

               return filmesJSON;
           }else{
               return message.ERROR_NOT_FOUND; //404
           }
       }else{
           return message.ERROR_INTERNAL_SERVER_DB; //500
       }
   }
   
};



module.exports = {
    getListaDeFilmes,
    getFilme
};