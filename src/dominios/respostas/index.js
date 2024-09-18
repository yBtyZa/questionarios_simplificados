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
respostasRouter.post('/:perguntaId', validarSchema(schemaPostResposta), respostasControllers.create)

respostasRouter.delete('/:id', validarSchema(schemaDeleteResposta), respostasControllers.delete)

module.exports = respostasRouter