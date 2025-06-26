import InstrutorHorarios from '../models/InstrutorHorariosModel';
import { sequelize } from '../config/config';

const get = async (req, res) => {
  try {
    const id = req.params.idInstrutorHorario ? req.params.idInstrutorHorario.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await InstrutorHorarios.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await InstrutorHorarios.findOne({ where: { id } });

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
    idUsuario,
    idDiaSemana,
    idHorario,
  } = dados;

  const response = await InstrutorHorarios.create({
    idUsuario,
    idDiaSemana,
    idHorario,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (idInstrutorHorario, dados, res) => {
  const response = await InstrutorHorarios.findOne({ where: { idInstrutorHorario } });

  if (!response) {
    return res.status(500).send({
      type: 'error',
      message: `Nenhum registro com id ${idInstrutorHorario} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => {
    response[field] = dados[field];
  });

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${idInstrutorHorario} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.idInstrutorHorario ? req.params.idInstrutorHorario.toString().replace(/\D/g, '') : null;

    if (!id) {
      return await create(req.body, res);
    }

    return await update(id, req.body, res);
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error,
    });
  }
};

const destroy = async (req, res) => {
  try {
    const id = req.params.idInstrutorHorario ? req.params.idInstrutorHorario.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await InstrutorHorarios.findOne({ where: { id } });

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

const listarInstrutorHorarios = async (_, res) => {
  const response = await sequelize.query(
    `SELECT 
          ih.id           AS "idInstrutor",
          u.id            AS "idUsuario",
          u.nome          AS "nomeUsuario",
          u.cpf           AS "cpfUsuario",
          d.id            AS "idDiaSemana",
          d.nome          AS "diaSemana",
          h.id            AS "idHorario",
          h.id            AS "idHorarioAula",
          h.hora          AS "hora"
      FROM instrutor_horarios ih
      JOIN usuarios u      ON ih.instrutor_id = u.id
      JOIN dias_semana d   ON ih.dia_id = d.id
      JOIN horarios_aula h ON ih.horario_id = h.id
      ORDER BY u.nome, d.id, h.hora;
  `).then((a) => a[0]);
  if (response) {
    return res.status(201).send({
      message: 'Dados Encontrados!',
      data: response,
    });
  }
  return res.status(500).send({
    type: 'error',
    message: 'Retorno não identificado.',
  });
};

export default {
  get,
  persist,
  destroy,
  listarInstrutorHorarios,
};
