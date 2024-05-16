/* 
 * Autor: Suzane A. hora
 * Objetivo: arquivo responsavel pelo acesso pelo banco de dados SQL, aqui faremos o CRUD na tabela de filmes
 * data: 01;02.24
 * Versão: 1.0
 * 
 ***************************************************/

//import da biblioteca da pasta prisma para manipular os script do SQL
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient();

//função para listar todos os atores do BD
const selectAllActors = async function(){


        let sql = 'select * from tbl_ator'

        //queryRawUnsafe = para conseguir pegar as concatenações dos scripts
    
        //nao esqueça do await
        let rsAtor = await prisma.$queryRawUnsafe(sql)
    
        //validação para retornar os dados.
        if(rsAtor.length > 0)
            return rsAtor
        else (error)
            return false

}

const selectByIdActors = async function(id){

     try {
        let sql = `select * from tbl_ator where id = ${id}`

        let rsAtor = await prisma.$queryRawUnsafe(sql)
        
        return rsAtor
     }catch(error){
        return false;
     }
}

const insertAtor = async function(dadosAtor){
    try{

        let sql

        if(dadosAtor){
            sql = `insert into tbl_ator (
                nome,
                foto,
                biografia,
                data_nascimento,
                id_sexo
            ) values(

                '${dadosAtor.nome}',
                '${dadosAtor.foto}',
                '${dadosAtor.biografia}',
                '${dadosAtor.data_nascimento}',
                '${dadosAtor.id_sexo}'


            )`
        } 

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false


    } catch(erro){
        console.log(erro)
        return false
    }
}

const updadeActors = async function(dadosAtor, idAtor){
    try {
        let sql

        if(dadosAtor){
            sql = `update tbl_ator set
                                 nome = '${dadosAtor.nome}',
                                 foto = '${dadosAtor.foto}',
                                 biografia = '${dadosAtor.biografia}',
                                 data_nascimento = '${dadosAtor.data_nascimento}',
                                 id_sexo = '${dadosAtor.id_sexo}'
                                 where id = '${idAtor}'
                        
                                 `
        }

        let resultStatus = await prisma.$executeRawUnsafe(sql)

        if(resultStatus)
              return true

        else
             return false

    }catch(error) {
        console.log(error)
        return false
    }
}

const deleteActors = async function(id){

    try {
        
        let sql = `delete from tbl_ator where tbl_ator.id = ${id}`
        
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    }catch(error) {
        return false
    }
}

const selectbyActorsGenero = async function(id){

    try {
       let sql = `select * from tbl_genero join tbl_ator on tbl_genero.id = tbl_ator.id_sexo where tbl_ator.id = ${id}`

       let rsAtor = await prisma.$queryRawUnsafe(sql)
       
       return rsAtor
    }catch(error){
       return false;
    }
}



module.exports = {
    selectAllActors,
    selectByIdActors,
    insertAtor,
    updadeActors,
    deleteActors,
    selectbyActorsGenero
}