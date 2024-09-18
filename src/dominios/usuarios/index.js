const { Router } = require('express')
const yup = require('yup')

const UsuariosControllers = require('./usuarios.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const usuarioRouter = Router()
const usuariosControllers = new UsuariosControllers()

const schemaPostUsuario = yup.object({
    body: yup.object({
        nome: yup.string().required("Nome é obrigatório"),
        sobrenome: yup.string(),
        email: yup.string().email("E-mail informado não é valido").required("Email é obrigatório"),
        senha: yup.string().min(3, "Minimo de 3 caracteres").max(16, "Maximo de 16 caracteres").required("Senha é obrigatória"),
        permissao: yup.string().oneOf(['criador', 'estudante']).required("Permissão é obrigatória"),
    }),
})

usuarioRouter.get('/', usuariosControllers.index
    /*
       #swagger.tags = ['Usuarios']
       #swagger.description = 'Endpoint para listar os usuarios'
       
       #swagger.responses[200] = {
           description: 'Usuarios retornados com sucesso!'
       }
       #swagger.responses[500] = {
           description: 'Não foi possível listar os usuarios'
       }
   */
 )

usuarioRouter.post('/', validarSchema(schemaPostUsuario), usuariosControllers.create
    /*
       #swagger.tags = ['Usuarios']
       #swagger.description = 'Endpoint para criar um novo usuario'
       #swagger.parameters['novoUsuario'] = {
           in: 'body',
           description: 'Informações do novo usuario',
           required: true,
           schema: {
               $nome: 'Nome de teste',
               $sobrenome: "Sobrenome de teste",
               $email: "XtGZi@example.com",
               $senha: "12345678",
               $permissao: "criador"
           }
       }
       #swagger.responses[201] = {
           description: 'Usuario criado com sucesso!'
       }
       #swagger.responses[400] = {
           description: 'Usuário já possui cadastro'
       }
       #swagger.responses[500] = {
           description: 'Não foi possível criar o usuario'
       }
   */
)

usuarioRouter.delete('/:id', usuariosControllers.delete
    /*
        #swagger.tags = ['Usuarios']
        #swagger.description = 'Endpoint para deletar um usuario'"
        #swagger.parameters = [
            {
                name: 'id',
                in: 'path',
                description: 'ID do usuario a ser deletado',
                required: true,
                schema: {
                    type: 'string',
                    example: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
                }
            }
        ]
       #swagger.responses[204] = {
            description: 'Usuario excluído com sucesso'
        }
        #swagger.responses[400] = {
            description: 'Não foi possivel deletar o usuario'
        }
        #swagger.responses[500] = {
            description: 'Não foi possível deletar o usuario'
        }
    */
)


module.exports = usuarioRouter