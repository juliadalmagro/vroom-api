import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Usuarios from '../models/Usuarios';

const get = async (req, res) => {
  try {
    const id = req.params.id ? req.params.id.toString().replace(/\D/g, '') : null;

    if (!id) {
      const response = await Usuarios.findAll({
        order: [['id', 'asc']],
      });
      return res.status(200).send({
        type: 'success',
        message: 'Registros carregados com sucesso',
        data: response,
      });
    }

    const response = await Usuarios.findOne({ where: { id } });

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
    nome, email, cpf, estudante, idCargos, passwordHash,
  } = dados;

  const response = await Usuarios.create({
    nome,
    email,
    cpf,
    estudante,
    passwordHash,
    idCargos,
  });

  return res.status(200).send({
    type: 'success',
    message: 'Cadastro realizado com sucesso',
    data: response,
  });
};

const update = async (id, dados, res) => {
  const response = await Usuarios.findOne({ where: { id } });

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

    const response = await Usuarios.findOne({ where: { id } });

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

const register = async (req, res) => {
  try {
    const {
      nome, email, cpf, estudante, idCargos, password,
    } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    Usuarios.create({
      nome,
      email,
      cpf,
      estudante,
      passwordHash,
      idCargos,
    });

    return res.status(201).send({
      message: 'oi',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Usuarios.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error('Usuario ou senha invalidos!');
    }

    const { passwordHash } = user;
    console.log(user);

    const resposta = await bcrypt.compare(password, passwordHash);

    if (resposta) {
      const token = jwt.sign({ userId: user.id, userName: user.nome }, process.env.SECRET_KEY, { expiresIn: '1h' });
      return res.status(200).send({
        token,
      });
    }

    return res.status(400).send({
      message: 'Usuario ou senha invalidos!',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Ops!',
      response: error.message,
    });
  }
};

export default {
  get,
  persist,
  destroy,
  register,
  login,
};
