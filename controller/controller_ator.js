/**************************************************************************************************** 
 * Autor: Suzane A. hora
 * Objetivo: arquivo resposanvel pela validação, consistencia das requisições da API de filmes
 * data: 01.02.24
 * Versão: 1.0
 * 
 *****************************************************************************************************/

const atorDAO = require('../model/DAO/ator.js')
const message = require('../modulo/config.js')

//listar todos os atores
const getListarAtores = async function(){

    let atoresJSON = {}

    let dadosAtores = await atorDAO.selectAllActors()

    if(dadosAtores) {

        atoresJSON.atores = dadosAtores
        atoresJSON.quantidade = dadosAtores.legth
        atoresJSON.status_code = 200

        return atoresJSON
    }else{
        return false
    }

}

const getBuscarAtor = async function(id) {
    let idAtor = id

    let atoreJSON = {}

    if(idAtor == '' || idAtor == undefined || isNaN(idAtor)) {
        return message.ERROR_INVALID_ID
    }else {
        let dadosAtor = await atorDAO.selectByIdActors(idAtor)

        if(dadosAtor) {
            if(dadosAtor.length > 0){
                atoreJSON.filme = dadosAtor
                atoreJSON.status_code = 200

                return atoreJSON
            }else
            return message.ERROR_NOT_FOUND
        }else {
            return message.ERRO_INTERNAL_SERVER_DB
        }
    }
}

const setIserirNovoAtor = async function (dadosAtor, contentType) {

    try {

        if (String(contentType).toLowerCase() === 'application/json') {

            let novoAtorJSON = {};

            console.log(dadosAtor)
            if (dadosAtor.nome === ''        || dadosAtor.nome === undefined            || dadosAtor.nome === null            || dadosAtor.nome.length > 100             ||
            dadosAtor.foto === ''            || dadosAtor.foto === undefined            || dadosAtor.foto === null            || dadosAtor.foto.length > 800             ||
            dadosAtor.biografia === ''       || dadosAtor.biografia === undefined       || dadosAtor.biografia === null       || dadosAtor.biografia.length > 400        ||
            dadosAtor.data_nascimento === '' || dadosAtor.data_nascimento === undefined || dadosAtor.data_nascimento === null || dadosAtor.data_nascimento.length !== 10 ||
            dadosAtor.id_sexo === ''         || dadosAtor.id_sexo === null              || dadosAtor.id_sexo > 2              || dadosAtor.id_sexo === undefined
        )
            
            {
                return message.ERROR_REQUIERED_FIELDS; // 400
            } else {
                let validaStatus = false;

                if (dadosAtor.data_nascimento.length !== 10) {
                    return message.ERROR_REQUIERED_FIELDS; // 400
                } else {
                    validaStatus = true;
                }
        
            if (validaStatus) {
                let novoAtor = await atorDAO.insertAtor(dadosAtor);
    
                if (novoAtor) {
                    novoAtorJSON.ator = dadosAtor;
                    novoAtorJSON.status = message.SUCESS_CREATED_ITEM.status;
                    novoAtorJSON.status_code = message.SUCESS_CREATED_ITEM.status_code;
                    novoAtorJSON.message = message.SUCESS_CREATED_ITEM.message;
    
                    return novoAtorJSON; // 201
                } else {
                    return message.ERRO_INTERNAL_SERVER_DB; // 500
                }

            } else {
                return message.ERRO_CONTENT_TYPE; // 415
            }
        }

        }

    } catch (error) {
        console.error('Erro ao inserir novo ator:', error);
        
        return message.ERRO_INTERNAL_SERVER_DB; // 500 (
    }
}

const setAtualizarAtor = async function (dadosAtor,contentType, idAtor){
    
    try {
        if(String(contentType).toLowerCase() == 'application/json'){

            let resultDadosAtor = {}

            if(idAtor == ''                 || idAtor == undefined                    ||
            dadosAtor.nome == ''            || dadosAtor.nome == undefined            || dadosAtor.nome.length > 100           ||
            dadosAtor.foto == ''            || dadosAtor.foto == undefined            || dadosAtor.foto.length > 800           ||
            dadosAtor.biografia == ''       || dadosAtor.biografia == undefined       || dadosAtor.biografia.length > 400      ||
            dadosAtor.data_nascimento == '' || dadosAtor.data_nascimento == undefined || dadosAtor.data_nascimento.length > 10 ||
            dadosAtor.id_sexo == ''         || dadosAtor.id_sexo == undefined         || dadosAtor.id_sexo.legth > 2           || dadosAtor.id_sexo == null   
            ){
                return message.ERROR_REQUIERED_FIELDS // 400

            }else{
                let dadosValidated = false

                if(dadosAtor.data_nascimento.length > 10)
                    return message.ERROR_REQUIERED_FIELDS // 400
                else
                    dadosValidated = true

            if(dadosValidated){

                let atorAtualizado = await atorDAO.updadeActors(dadosAtor, idAtor)

                dadosAtor.id = idAtor

                if(atorAtualizado){
                    resultDadosAtor.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosAtor.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosAtor.Sucess_message = message.SUCESS_CREATED_ITEM.message
                    resultDadosAtor.ator = dadosAtor

                    return resultDadosAtor
                }else{
                    return message.ERRO_INTERNAL_SERVER_DB //500
                }
            
            }else{
                    return message.ERROR_REQUIERED_FIELDS // 400
                }
            }

            }else{
                return message.ERRO_CONTENT_TYPE // 415
            }

    }catch(error) {

        console.log(error)
        return message.ERRO_INTERNAL_SERVER // 500
    
    }
}



module.exports = {
    getListarAtores,
    getBuscarAtor,
    setIserirNovoAtor,
    setAtualizarAtor
}