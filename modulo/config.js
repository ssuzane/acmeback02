
/************************************************** menssagem de error *****************************************/

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é valido'};

const ERROR_REQUIERED_FIELDS = {status: false, status_code: 400, message: 'existem campos requiridos que não foram preenchidos, ou ateem os criterios de digitaão'};

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados itens na requisição'};

const ERRO_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possivel fazer a requisição devido a um problema na comunicação  com o banco de dados. Contrate o Administrador!!'};

const ERRO_CONTENT_TYPE = {status: false, status_code: 415, message: 'O content Type encaminhado na requisição não é permitido pelo servior da API. Deve se utilizar a aplication/json'}

const ERRO_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possivel fazer a requisição devido a um problema na camada da API. Contrate o Administrador!!'}



/************************************************ messagem de sucesso ***************************************/

const SUCESS_CREATED_ITEM =   {status: true, status_code: 201, message: 'Item criado com sucesso!!'};
const SUCESS_DELETED_ITEM =   {status: true, status_code: 201, message: 'Item deletado com sucesso!!'};


module.exports ={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_REQUIERED_FIELDS,
    ERRO_INTERNAL_SERVER_DB,
    ERRO_CONTENT_TYPE,
    ERRO_INTERNAL_SERVER,
    SUCESS_CREATED_ITEM,
    SUCESS_DELETED_ITEM
}