import { Op } from 'sequelize';
import Sessoes from '../models/Sessoes';
import Salas from '../models/Salas';
import Filmes from '../models/Filmes';
import PadraoLugares from '../models/PadraoLugares';
import { sequelize } from '../config/config';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Sessoes.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Sessoes.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id}`,
        data: [],
      });
    }

    return res.status(200).send({
      type: 'success',
      message: 'Registro carregado com sucesso',
      data: response,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const create = async (dados, res) => {
  const {
    idFilme, idSala, lugares, dataInicio, dataFim, preco,
  } = dados;

  const response = await Sessoes.create({
    idFilme,
    idSala,
    lugares,
    dataInicio,
    dataFim,
    preco,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Sessoes.findOne({ where: { id } });

  if (!response) {
    return res.status(200).send({
      type: 'error',
      message: `Nenhum registro com id ${id} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => {
    response[field] = dados[field];
  });

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${id} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.body.id ? req.body.id.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await Sessoes.findOne({ where: { id } });

    if (!response) {
      return res.status(200).send({
        type: 'error',
        message: `Nenhum registro com id ${id} para deletar`,
        data: [],
      });
    }

    await response.destroy();
    return res.status(200).send({
      type: 'success',
      message: `Registro id ${id} deletado com sucesso`,
      data: [],
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const filtra = (dados) => dados.map((sessoes) => {
  let aux = false;
  sessoes.lugares.forEach((lugar) => {
    if (!lugar.vendido) {
      aux = true;
    }
  });
  if (aux) {
    const auxFilme = sessoes.toJSON();
    return {
      ...auxFilme,
    };
  }
});

const getSessoesDisponiveis = async (req, res) => {
  try {
    const response = await Sessoes.findAll({
      order: [['id', 'asc']],
      include: [{
        model: Filmes,
        as: 'filmes',
        required: true,
        attributes: ['nome', 'duracaoMin'],
      },
      {
        model: Salas,
        as: 'salas',
        required: true,
        attributes: ['observacao'],
      }],
      where: {
        dataInicio: {
          [Op.gt]: new Date(Date.now()),
        },
      },
    });
    const responseFilter = filtra(response);

    return res.status(200).send({
      type: 'success',
      message: 'Registros carregados com sucesso',
      data: responseFilter,
    });
  } catch (error) {
    return res.status(200).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

// const getSessoes = async (req, res) => {
//   try {
//     const dadosSessoes = async (req, res) => {
//       const response = await sequelize.query(`
//       select
//     s.id,
//     f.nome,
//     s2.observacao,
//     s.preco,
//     s.preco * u.valor_atual
// from usuarios_sessoes as u
// inner join sessoes s on s.id = u.id_sessao
// inner join salas s2 on s2.id = s.id_sala
// inner join filmes f on f.id = s.id_filme

//       `).then((a) => a[0]);
//       return res.status(200).send({
//         message: `Nenhum registro com id ${id}`,
//         response,
//     });
//   } catch (error) {
//     return res.status(200).send({
//       type: 'error',
//       message: 'Ops! Ocorreu um erro',
//       error: error.message,
//     });
//   }
// };
export default {
  get,
  persist,
  destroy,
  getSessoesDisponiveis,
};
