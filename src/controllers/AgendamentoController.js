import { sequelize } from '../config/config';
import Agendamentos from '../models/AgendamentosModel';

const get = async (req, res) => {
  try {
    const id = req.params.idAgendamento ? req.params.idAgendamento.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Agendamentos.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Agendamentos.findOne({ where: { id } });

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
    data, idHorario, idAluno, idInstrutor, idVeiculo,
  } = dados;

  const response = await Agendamentos.create({
    data, idHorario, idAluno, idInstrutor, idVeiculo,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (idAgendamento, dados, res) => {
  const response = await Agendamentos.findOne({ where: { idAgendamento } });

  if (!response) {
    return res.status(500).send({
      type: 'error',
      message: `Nenhum registro com id ${idAgendamento} para atualizar`,
      data: [],
    });
  }

  Object.keys(dados).forEach((field) => {
    response[field] = dados[field];
  });

  await response.save();
  return res.status(200).send({
    type: 'success',
    message: `Registro id ${idAgendamento} atualizado com sucesso`,
    data: response,
  });
};

const persist = async (req, res) => {
  try {
    const id = req.params.idAgendamento ? req.params.idAgendamento.toString().replace(/\D/g, '') : null;

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
    const id = req.params.idAgendamento ? req.params.idAgendamento.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(500).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await Agendamentos.findOne({ where: { id } });

    if (!response) {
      return res.status(500).send({
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
    return res.status(500).send({
      type: 'error',
      message: 'Ops! Ocorreu um erro',
      error: error.message,
    });
  }
};

const listarAgendamentosCompletos = async (_, res) => {
  const response = await sequelize.query(
    `SELECT
      ag.id as "idAgendamento",
      aluno.id as "idAluno",
      aluno.nome as "nomeAluno",
      aluno.cpf as "cpfAluno",
      instrutor.id as "idInstrutor",
      instrutor.nome as "nomeInstrutor",
      v.id as "idVeiculo",
      v.modelo as "modeloVeiculo",
      v.placa as "placaVeiculo",
      ag.data,
      to_char(ag.data, 'Day') as "diaSemana",
      ha.id as "idHorario",
      ha.hora as "horario"
    FROM agendamentos ag
    JOIN usuarios aluno ON ag.aluno_id = aluno.id
    JOIN usuarios instrutor ON ag.instrutor_id = instrutor.id
    LEFT JOIN veiculos v ON ag.veiculo_id = v.id
    JOIN horarios_aula ha ON ag.horario_id = ha.id
    ORDER BY ag.data asc, ha.hora ASC;`
  ).then((r) => r[0]);

  if (response) {
    return res.status(200).send({
      message: 'Agendamentos encontrados!',
      data: response,
    });
  }

  return res.status(500).send({
    type: 'error',
    message: 'Retorno não identificado.',
  });
};

const listarAgendamentosAluno = async (req, res) => {
  const { idAluno } = req.params;

  if (!idAluno) {
    return res.status(400).send({
      type: 'error',
      message: 'ID do aluno não fornecido na requisição.',
    });
  }

  try {
    const response = await sequelize.query(
      `SELECT
        ag.id as "idAgendamento",
        aluno.id as "idAluno",
        aluno.nome as "nomeAluno",
        aluno.cpf as "cpfAluno",
        instrutor.id as "idInstrutor",
        instrutor.nome as "nomeInstrutor",
        v.id as "idVeiculo",
        v.modelo as "modeloVeiculo",
        v.placa as "placaVeiculo",
        ag.data,
        to_char(ag.data, 'Day') as "diaSemana",
        ha.id as "idHorario",
        ha.hora as "horario"
      FROM agendamentos ag
      JOIN usuarios aluno ON ag.aluno_id = aluno.id
      JOIN usuarios instrutor ON ag.instrutor_id = instrutor.id
      LEFT JOIN veiculos v ON ag.veiculo_id = v.id
      JOIN horarios_aula ha ON ag.horario_id = ha.id
      WHERE aluno.id = :idAluno
      ORDER BY ag.data asc, ha.hora ASC;`,
      {
        replacements: { idAluno },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).send({
      message: 'Agendamentos encontrados!',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao buscar agendamentos.',
      error: error.message,
    });
  }
};

const listarAgendamentosInstrutor = async (req, res) => {
  const { idInstrutor } = req.params;

  if (!idInstrutor) {
    return res.status(400).send({
      type: 'error',
      message: 'ID do instrutor não fornecido na requisição.',
    });
  }

  try {
    const response = await sequelize.query(
      `SELECT
        ag.id as "idAgendamento",
        aluno.id as "idAluno",
        aluno.nome as "nomeAluno",
        aluno.cpf as "cpfAluno",
        instrutor.id as "idInstrutor",
        instrutor.nome as "nomeInstrutor",
        v.id as "idVeiculo",
        v.modelo as "modeloVeiculo",
        v.placa as "placaVeiculo",
        ag.data,
        to_char(ag.data, 'Day') as "diaSemana",
        ha.id as "idHorario",
        ha.hora as "horario"
      FROM agendamentos ag
      JOIN usuarios aluno ON ag.aluno_id = aluno.id
      JOIN usuarios instrutor ON ag.instrutor_id = instrutor.id
      LEFT JOIN veiculos v ON ag.veiculo_id = v.id
      JOIN horarios_aula ha ON ag.horario_id = ha.id
      WHERE instrutor.id = :idInstrutor
      ORDER BY ag.data asc, ha.hora ASC;`,
      {
        replacements: { idInstrutor },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).send({
      message: 'Agendamentos encontrados!',
      data: response,
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao buscar agendamentos.',
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  listarAgendamentosCompletos,
  listarAgendamentosAluno,
  listarAgendamentosInstrutor,
};
