const { Router } = require('express')
const yup = require('yup')

const RespostasControllers = require('./respostas.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const { garantirAutenticacaoRBAC, garantirAutenticacao } = require('../../middlewares/garantirAutenticacao')

const respostasRouter = Router()
const respostasControllers = new RespostasControllers()

const schemaPostResposta = yup.object({
    body: yup.object({
        conteudo: yup.string().required("Conteudo é obrigatório"),
    }),
    params: yup.object({
        perguntaId: yup.string().uuid("Id informado não é valido!").required("Id é obrigatório")
    }),
})

const schemaDeleteResposta = yup.object({
    params: yup.object({
        id: yup.string().uuid("Id informado não é valido!").required("Id é obrigatório")
    }),
})

respostasRouter.use(garantirAutenticacao, garantirAutenticacaoRBAC('estudante'))
respostasRouter.post('/:perguntaId', validarSchema(schemaPostResposta), respostasControllers.create
    /*
           #swagger.tags = ['Respostas']
           #swagger.description = 'Endpoint para criar uma nova resposta no questionario'
           #swagger.parameters['perguntaId'] = {
               in: 'path',
               description: 'ID da pergunta',
               required: true,
               type: 'string'
           }
           #swagger.parameters['novaResposta'] = {
               in: 'body',
               description: 'Informações do nova resposta',
               required: true,
               schema: {
                   $conteudo: 'Resposta 1',
               }
           }
           #swagger.responses[201] = {
               description: 'Resposta criado com sucesso!'
           }
           #swagger.responses[500] = {
               description: 'Não foi possível criar a resposta'
           }
       */
)

respostasRouter.delete('/:id', validarSchema(schemaDeleteResposta), respostasControllers.delete
    /*
        #swagger.tags = ['Respostas']
        #swagger.description = 'Endpoint para deletar uma resposta'
        #swagger.parameters = [
            {
                name: 'id',
                in: 'path',
                description: 'ID da resposta a ser deletado',
                required: true,
                schema: {
                    type: 'string',
                    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                }
            }
        ]
       #swagger.responses[204] = {
            description: 'Resposta excluída com sucesso'
        }
        #swagger.responses[400] = {
            description: 'Não foi possivel deletar a resposta'
        }
        #swagger.responses[500] = {
            description: 'Não foi possível deletar a resposta'
        }
    */
)

module.exports = respostasRouter