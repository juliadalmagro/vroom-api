import { sequelize } from '../config/config';
import Usuario from '../models/UsuariosModel';

const get = async (req, res) => {
  try {
    const id = req.params.idUsuario ? req.params.idUsuario.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Usuario.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Usuario.findOne({ where: { id } });

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
    nomeUsuario, cpfUsuario, emailUsuario, senhaUsuario, usuarioTipoUsuario,
  } = dados;

  const response = await Usuario.create({
    nomeUsuario, cpfUsuario, emailUsuario, senhaUsuario, usuarioTipoUsuario,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Usuario.findOne({ where: { id } });

  if (!response) {
    return res.status(500).send({
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
    const id = req.params.idUsuario ? req.params.idUsuarioa.toString().replace(/\D/g, '') : null;

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
    const id = req.params.idUsuario ? req.params.idUsuario.toString().replace(/\D/g, '') : null;
    if (!id) {
      return res.status(200).send({
        type: 'error',
        message: 'Informe um id para deletar o registro',
        data: [],
      });
    }

    const response = await Usuario.findOne({ where: { id } });

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

const login = async (req, res) => {
  const { emailUsuario, senhaUsuario } = req.body;
  console.log(req.body);

  if (!emailUsuario || !senhaUsuario) {
    return res.status(400).send({
      type: 'error',
      message: 'Email e/ou senha não fornecidos na requisição.',
    });
  }

  try {
    const response = await sequelize.query(
      `SELECT 
        u.id AS "idUsuario",
        u.email AS "emailUsuario",
        u.senha_hash AS "senhaUsuario",
        t.id AS "idTipoUsuario",
        t.nome AS "nomeTipoUsuario"
      FROM usuarios u
      JOIN tipos_usuario t ON u.tipo_id = t.id
      WHERE u.email = :emailUsuario
        AND u.senha_hash = :senhaUsuario;`,
      {
        replacements: { emailUsuario, senhaUsuario },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (response.length === 0) {
      return res.status(404).send({
        type: 'error',
        message: 'Usuário não encontrado ou credenciais inválidas.',
      });
    }

    return res.status(200).send({
      message: 'Usuário autenticado com sucesso!',
      data: response[0],
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao buscar o usuário.',
      error: error.message,
    });
  }
};

const getAluno = async (_, res) => {
  try {
    const response = await Usuario.findAll({
      where: { usuarioTipoUsuario: 1 }
    });
    if (response && response.length > 0) {
      return res.status(200).send({
        message: 'Dados Encontrados!',
        data: response,
      });
    }
    return res.status(404).send({
      type: 'error',
      message: 'Nenhum aluno encontrado.',
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao buscar alunos.',
      error: error.message,
    });
  }
};

const getInstrutor = async (_, res) => {
  try {
    const response = await Usuario.findAll({
      where: { usuarioTipoUsuario: 2 }
    });
    if (response && response.length > 0) {
      return res.status(200).send({
        message: 'Dados Encontrados!',
        data: response,
      });
    }
    return res.status(404).send({
      type: 'error',
      message: 'Nenhum instrutor encontrado.',
    });
  } catch (error) {
    return res.status(500).send({
      type: 'error',
      message: 'Erro ao buscar instrutor.',
      error: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  getAluno,
  getInstrutor,
  login,
};
