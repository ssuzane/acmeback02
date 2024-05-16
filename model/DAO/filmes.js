/* 
 * Autor: Suzane A. hora
 * Objetivo: arquivo responsavel pelo acesso pelo banco de dados SQL, aqui faremos o CRUD na tabela de filmes
 * data: 01;02.24
 * Versão: 1.0
 * 
 ***************************************************/

//import da biblioteca da pasta prisma para manipular os script do SQL
const {PrismaClient} = require('@prisma/client')


//instancia da class prisma client 
const prisma = new PrismaClient();

const insertFilme = async function(dadosFilme){
// função para inserir um filme no BD

        try{

            let sql;

            if(dadosFilme.data_relancamento !='' && dadosFilme.data_relancamento != null && dadosFilme.data_relancamento != undefined){
                
                sql = `insert into tbl_filme (nome,
                    sinopse,
                    duracao,
                    data_lancamento,
                    data_relancamento,
                    foto_capa,
                    valor_unitario,
                    id_classificacao
                     
      ) values(

                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    '${dadosFilme.data_relancamento}',
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}',
                     ${dadosFilme.id_classificacao}
          
)`;
            }else{

                sql = `insert into tbl_filme (nome,
                    sinopse,
                    duracao,
                    data_lancamento,
                    data_relancamento,
                    foto_capa,
                    valor_unitario,
                    id_classificacao
                     
) values(

                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                      null,
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}',
                    ${dadosFilme.id_classificacao}
        
)`;

            }
                
            
                    //$executeRawUnsafe() - serve para executar scripts sem retorno de dados
                    //(insert, updade dele)
                    //$queryRawUnsafe() - serve para executar script com retorno de dados (select)
                                        
                console.log(sql)
                    let result = await prisma.$executeRawUnsafe(sql);                                 
            
                if(result)
                    return true;
                else 
                    return false
                    
        } 
        
        catch(error) {
            console.log(error)
            return false
        }
        
}

// função para atualizar um filme no BD
const uptadeFile = async function (dadosFilme, idfilme){

    try {

        let sql

        if(dadosFilme.data_relancamento == null || dadosFilme.data_relancamento == '' || dadosFilme.data_relancamento == undefined){    
            
            sql = `update tbl_filme set 
                                        nome = '${dadosFilme.nome}',
                                        sinopse = '${dadosFilme.sinopse}',
                                        duracao = '${dadosFilme.duracao}',
                                        data_lancamento = '${dadosFilme.data_lancamento}',
                                        data_relancamento = null,
                                        foto_capa = '${dadosFilme.foto_capa}',
                                        valor_unitario = ${dadosFilme.valor_unitario},
                                        id_classificacao = ${dadosFilme.id_classificacao},
                                        where id = ${idfilme}`
            
        } else {

            sql = `update tbl_filme set 
                                        nome = '${dadosFilme.nome}',
                                        sinopse = '${dadosFilme.sinopse}',
                                        duracao = '${dadosFilme.duracao}',
                                        data_lancamento = '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa = '${dadosFilme.foto_capa}',
                                        valor_unitario = ${dadosFilme.valor_unitario},
                                        id_classificacao = ${dadosFilme.id_classificacao}
                                        where id = ${idfilme}`

        }

        // Executa o sciptSQL no DB (devemos usar o comando execute e não o query)
        // O comando execute deve ser utilizado para INSERT, UPDATE, DELETE

        let resultStatus = await prisma.$executeRawUnsafe(sql)

        // Validação para verificar se o insert funcionou no DB
        if(resultStatus)
            return true
        else
            return false

    } catch (error) {

        return false

    }

}

// função para excluir um filme no BD
const deleteFilmes = async function(id){

   
    try {
        let sql = `delete from tbl_filme where tbl_filme.id = ${id}`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)

        return rsFilmes
    }catch (error) {
        return false
    }


}

// função para listar todos os filmes do BD
const selectAllFilmes = async function(){

    let sql = 'select * from tbl_filme'

    //queryRawUnsafe = para conseguir pegar as concatenações dos scripts

    //nao esqueça do await
    let rsFilmes = await prisma.$queryRawUnsafe(sql)

    
    if(rsFilmes.length > 0)
        return rsFilmes
    else (error)
        return false

}

// função para buscar um filme no BD filtrando pelo ID
const selectById = async function(id){

    try {
        
        let sql = `select * from tbl_filme where id = ${id}`
    
        let rsFilme = await prisma.$queryRawUnsafe(sql)

        return rsFilme

    } catch (error) {
        console.log(error)
        return false;
    }
    

}


// exportando
module.exports = {

    insertFilme,
    uptadeFile,
    deleteFilmes,
    selectAllFilmes,
    selectById
}
