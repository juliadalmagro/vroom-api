import jwt from 'jsonwebtoken';
import Usuarios from '../models/Usuarios';
import Cargos from '../models/Cargos';

export default async (req, res, next) => {
  try {
    const token = req.headers.authorization || null;
    if (!token || token === 'Bearer') {
      return res.status(401).send({
        message: 'Não autorizado',
      });
    }
    const [_, tokenLimpo] = token.split(' ');
    const decodedToken = jwt.verify(tokenLimpo, process.env.SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).send({
        message: 'Não autorizado!',
      });
    }
    if (decodedToken.exp < (Date.now() / 1000)) {
      return res.status(401).send({
        message: 'Token expirado, faça login!',
      });
    }
    console.log(1);
    const usuarios = await Usuarios.findOne({
      where: {
        id: decodedToken.userId,
      },
      include: [{
        model: Cargos,
        as: 'cargos',
        required: true,
        attributes: ['descricao'],
      }],
    });
    if (usuarios.cargos.descricao != 'Admin' && usuarios.cargos.descricao != 'admin') {
      return res.status(401).send({
        message: 'Não é Admin!',
      });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      message: error.message,
    });
  }
};
