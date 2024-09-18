const RespostasService = require('./respostas.services')

const respostasService = new RespostasService()

class RespostaControllers {

    /**
         * 
         * @param {import('express').Request} request 
         * @param {import('express').Response} response 
         * @returns 
     */
    async create(request, response) {
        const { body } = request
        const { perguntaId } = request.params
        const { id } = request.usuario

        const Questionarios = await respostasService.create({
            ...body,
            perguntaId,
            usuarioId: id
        })

        return response.status(201).json(Questionarios)
    }

    /**
         * 
         * @param {import('express').Request} request 
         * @param {import('express').Response} response 
         * @returns
     */
    async delete(request, response) {
        const { id } = request.params
        
        const apagou = await respostasService.delete(id)
        
        if(!apagou) {
            return response.status(400).json({ message: "Não foi possivel apagar"})
        }

        return response.status(204).end()
    }

}

module.exports = RespostaControllers