const { Router } = require('express')
const yup = require('yup')

const SessionsControllers = require('./sessions.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')

const sessionsRouter = Router()
const sessionsControllers = new SessionsControllers()

const schemaPostSession = yup.object({
    body: yup.object({
        email: yup.string().email("E-mail informado não é valido").required("Email é obrigatório"),
        senha: yup.string().required("Senha é obrigatória"),
    }),
})

sessionsRouter.post('/', validarSchema(schemaPostSession), sessionsControllers.create
    /*
       #swagger.tags = ['Sessions']
       #swagger.description = 'Endpoint para logar em uma nova sessão'
       #swagger.parameters['novaSessao'] = {
           in: 'body',
           description: 'Informações do nova sessaão',
           required: true,
           schema: {
               $email: 'email@teste.com',
               $senha: "1234",
           }
       }
       #swagger.responses[200] = {
           description: 'Sessão logada com sucesso'
       }
       #swagger.responses[400] = {
           description: 'Email/Senha inválida'
       }
       #swagger.responses[500] = {
           description: 'Não foi possível criar a sessão'
       }
   */
)

module.exports = sessionsRouter