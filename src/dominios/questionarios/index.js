const { Router } = require('express')
const yup = require('yup')

const QuestionariosControllers = require('./questionarios.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const { garantirAutenticacao, garantirAutenticacaoRBAC } = require('../../middlewares/garantirAutenticacao')

const questionariosRouter = Router()
const questionariosControllers = new QuestionariosControllers()

const schemaPostQuestionario = yup.object({
    body: yup.object({
        titulo: yup.string().required("Titulo é obrigatório"),
        descricao: yup.string().required("Descrição é obrigatório"),
        perguntas: yup.array(
            yup.object({
                descricao: yup.string().required("Descrição da pergunta pergunta é obrigatória")
            })
        )
    }),
})
const schemaDeleteQuestionario = yup.object({
    params: yup.object({
        id: yup.string().uuid("Id informado não é valido!").required("Id é obrigatório")
    }),
})

questionariosRouter.use(garantirAutenticacao)

questionariosRouter.get('/', questionariosControllers.index
    /*
       #swagger.tags = ['Questionarios']
       #swagger.description = 'Endpoint para listar os questionarios'
       
       #swagger.responses[200] = {
           description: 'Questionarios retornados com sucesso!'
       }
       #swagger.responses[500] = {
           description: 'Não foi possível listar os questionarios'
       }
   */
)

questionariosRouter.use(garantirAutenticacaoRBAC('criador'))


questionariosRouter.post('/', validarSchema(schemaPostQuestionario), questionariosControllers.create
/*
   #swagger.tags = ['Questionarios']
   #swagger.description = 'Endpoint para criar um novo questionário'
   #swagger.parameters['novoQuestionario'] = {
       in: 'body',
       description: 'Informações do novo questionário',
       required: true,
       schema: {
           $titulo: 'Questionario de teste',
           $descricao: "Descricão de teste",
           $perguntas: [
               {
                   $descricao: "Pergunta de teste 1"
               },
               {
                   $descricao: "Pergunta de teste 2"
               },
               {
                   $descricao: "Pergunta de teste 3"
               }
           ]
           
       }
   }
   #swagger.responses[201] = {
       description: 'Questionário criado com sucesso!'
   }
   #swagger.responses[400] = {
       description: 'Não foi possível criar o questionário'
   }
   #swagger.responses[500] = {
       description: 'Não foi possível criar o questionário'
   }
*/

)

questionariosRouter
    .delete(
        '/:id',
        validarSchema(schemaDeleteQuestionario),
        questionariosControllers.delete
        /*
        #swagger.tags = ['Questionarios']
        #swagger.description = 'Endpoint para deletar um questionario"
        #swagger.parameters = [
            {
                name: 'id',
                in: 'path',
                description: 'ID do questionario a ser deletado',
                required: true,
                schema: {
                    type: 'string',
                    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                }
            }
        ]
       #swagger.responses[204] = {
            description: 'Questionario excluído com sucesso'
        }
        #swagger.responses[400] = {
            description: 'Não foi possivel deletar o questionario'
        }
        #swagger.responses[500] = {
            description: 'Não foi possível deletar o questionario'
        }
    */
    )

module.exports = questionariosRouter