const { Respostas } = require('../../database/models/respostas')


class RespostasServices {
   
    async create({ conteudo, perguntaId, usuarioId }) {
        const resposta = await Respostas.create({
            conteudo, 
            perguntaId, 
            usuarioId
        })

        return resposta
    }
    
    // update() {}

    async delete(id) {
        const respostaExiste = await Respostas.findByPk(id)

        if(!respostaExiste) {
            return false
        }

        await respostaExiste.destroy()

        return true
    }
}

module.exports = RespostasServices