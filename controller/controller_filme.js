/**************************************************************************************************** 
 * Autor: Suzane A. hora
 * Objetivo: arquivo resposanvel pela validação, consistencia das requisições da API de filmes
 * data: 01.02.24
 * Versão: 1.0
 * 
 *****************************************************************************************************/


//imports dos arqquivos DAO que fara a conexão com banco de dados
const filmeDAO = require('../model/DAO/filmes.js')
const message = require('../modulo/config.js')


// função para validar e inserir um novo filme 
const setInserirNovoFilme = async function(dadosFilmes, contentType){

    try{
        console.log(contentType)
        if(String(contentType).toLowerCase() == 'application/json') {

            //criar o objeto json 
            let novoFilmeJSON = {}
        
            if(dadosFilmes.nome == ''                 || dadosFilmes.nome == undefined             ||dadosFilmes.nome == null             || dadosFilmes.nome.length > 80             || 
            dadosFilmes.sinopse == ''                 || dadosFilmes.sinopse == undefined          ||dadosFilmes.sinopse == null          || dadosFilmes.sinopse.length > 65000       ||
            dadosFilmes.duracao == ''                 || dadosFilmes.duracao == undefined          || dadosFilmes.duracao == null         || dadosFilmes.duracao.length > 8           ||
            dadosFilmes.data_lancamento == ''         || dadosFilmes.data_lancamento == undefined  ||dadosFilmes.data_lancamento == null  || dadosFilmes.data_lancamento.length != 10 ||
            dadosFilmes.foto_capa == ''               || dadosFilmes.foto_capa == undefined        ||dadosFilmes.foto_capa == null        || dadosFilmes.foto_capa.length > 200       ||
            dadosFilmes.valor_unitario.legth > 6      || dadosFilmes.id_classificacao == ''        ||dadosFilmes.id_classificacao == null || dadosFilmes.id_classificacao > 12        || dadosFilmes.id_classificacao == undefined

            ){
        
                
                return message.ERROR_REQUIERED_FIELDS; //400
            }else{
        
            
                let validaStatus = false
        
                //validação da data de relançamento , ja que ela não é obrigatorio no banco de dados 
                if(dadosFilmes.data_relancamento != null && dadosFilmes.data_relancamento !='' && dadosFilmes.data_relancamento !=undefined){
        
                     //Validar para verificar as a data esta com a data de digitos correto
                if(dadosFilmes.data_relancamento.length != 10){
        
                    
                    return message.ERROR_REQUIERED_FIELDS; // 400
                }else{
                    validaStatus = true
            
                }
                
            }else{
                validaStatus = true
        
            }
        
            //validaçãopara verificar s podemos encaminhar os dados para o DAO
            if(validaStatus){
                let novoFilme = await filmeDAO.insertFilme(dadosFilmes);
        
                //validação para verifivar se o DAO inseriu os dados do BD
                if(novoFilme){
        
                    //Criar o Json de retorno dos dados //201
                    novoFilmeJSON.filme = dadosFilmes
                    novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message
        
                    return novoFilmeJSON; //201
                }else{
                    return message.ERRO_INTERNAL_SERVER_DB; //500
                }
                
             }
                
           }
        
          }else{
            return message.ERRO_CONTENT_TYPE // 415
          }
    
    }catch(error){
        return message.ERRO_CONTENT_TYPE // 500
    }

}

// função para validar e atualizar um filme 
const setAtulizarFilme = async function(dadosFilme, contentType, idFilme){

    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosFilme = {}
        
            //Validação para tratar campos obrigatórios e quantide de caracteres
            if( idFilme == ''                             || idFilme == undefined                      ||
                dadosFilme.nome == ''                     || dadosFilme.nome == undefined              || dadosFilme.nome.length > 80               ||
                dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined           || dadosFilme.sinopse.length > 65535         || 
                dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined           || dadosFilme.duracao.length > 8             || 
                dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined   || dadosFilme.data_lancamento.length > 10    || 
                dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined         || dadosFilme.foto_capa.length > 200         ||
                dadosFilme.valor_unitario.length > 5      || dadosFilme.id_classificacao == ''         || dadosFilme.id_classificacao == null      || dadosFilme.id_classificacao > 12  ||
                dadosFilme.id_classificacao == undefined      
             ){
                
                return message.ERROR_REQUIERED_FIELDS // 400
                
            }else{
                
                let dadosValidated = false
        
                // Validação de digitação para data de relancamento que não é um campo obrigatório
                if  (   dadosFilme.data_relancamento != null &&
                        dadosFilme.data_relancamento != ''   &&
                        dadosFilme.data_relancamento != undefined 
                    ){    
        
                        if(dadosFilme.data_relancamento.length != 10)
                            return message.ERROR_REQUIERED_FIELDS// 400
                        else
                            dadosValidated = true
        
                } else {
                    dadosValidated = true
                }
        
                if(dadosValidated){
        
                    //Envia os dados para a model inserir no BD
                    let filmeAtualizado = await filmeDAO.uptadeFile(dadosFilme, idFilme)
                                           
                    // Adiciona o ID do Filme no JSON para retornar
                    dadosFilme.id = idFilme

                    //Valida se o BD inseriu corretamente os dados
                    if(filmeAtualizado){
                        resultDadosFilme.status = message.SUCESS_CREATED_ITEM.status
                        resultDadosFilme.status_code = message.SUCESS_CREATED_ITEM.status_code
                        resultDadosFilme.Sucess_message = message.SUCESS_CREATED_ITEM.message
                        resultDadosFilme.filme = dadosFilme

                        return resultDadosFilme
                    }else {

                        return message.ERRO_INTERNAL_SERVER_DB // 500

                    }
        
        
                } else {

                    return message.ERROR_REQUIERED_FIELDS // 400

                }
                
            }
    
        }else{
            return message.ERRO_CONTENT_TYPE // 415
        }

    } catch (error) {

        //console.log(error)
        message.ERRO_INTERNAL_SERVER // 500
    }

}

// função para validar e exclui um filme 
const setExcluirFilme = async function(id){

    try {
        let idFilme = id

        //Validação para verificar se o ID é válido (vazio, indefinido ou não numérico)
        if (idFilme == '' || idFilme == undefined || isNaN(idFilme) || idFilme == null) {
            return message.ERROR_INVALID_ID //400
        } else {
            
            let filmeId = await filmeDAO.selectById(idFilme)

            if(filmeId.length > 0) {

                let filmeDeletado = await filmeDAO.deleteFilmes(idFilme)
                
                if(filmeDeletado){
                    return message.SUCESS_DELETED_ITEM //200
                }else{
                    return message.ERRO_INTERNAL_SERVER_DB //500
                }
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }
       } catch (error) {
        return message.ERRO_INTERNAL_SERVER //500
       }


}

// função para retornar todos os filmes
const getListarFilmes = async function(){

    //cria o objeto JSON chama a função do DAO para retornar os dados da tabela filme 
    let filmesJSON = {}

    //chamar a função para chamar todos os filmes
    let dadosFilmes = await filmeDAO.selectAllFilmes()

    //vailidação para verificar se existem dados dos filmes 
    if(dadosFilmes ){

        //cria um JSON para devolve o app 
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.legth
        filmesJSON.status_code = 200

        return filmesJSON

    }else{
        return false
    }
       

}

// função para buscar um filme pelo ID
const getBuscarFilmes = async function(id){
    let filmesJson = {}

    let dadosFilmes = await filmeDAO.selectById(id)

    if (dadosFilmes) {
        if (dadosFilmes.length > 0) {
            filmesJson.filmes = dadosFilmes
            filmesJson.quantidade = dadosFilmes.length
            filmesJson.status_code = 200

            return filmesJson

        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERRO_INTERNAL_SERVER_DB
    }
}

// função para buscar filme pelo id v2
const getBuscarFilme = async function(id) {
    let idFilme = id

    let filmeJson = {}

    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosFilme = await filmeDAO.selectById(idFilme)

        if (dadosFilme) {

            if (dadosFilme.length > 0) {
                filmeJson.filme = dadosFilme
                filmeJson.status_code = 200

                return filmeJson

            } else
                return message.ERROR_NOT_FOUND
        } else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}



module.exports = {
    setInserirNovoFilme,
    setAtulizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilmes,
    
}
