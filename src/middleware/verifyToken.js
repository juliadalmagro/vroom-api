import jwt from 'jsonwebtoken';
import Cargos from '../models/Cargos';
import Usuarios from '../models/Usuarios';

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
    const usuario = await Usuarios.findOne({
      where: {
        id: decodedToken.userId,
      },
    });
    if (!usuario) {
      return res.status(401).send({
        message: 'Conta Incorreta!',
      });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).send({
      message: 'Opss!',
    });
  }
};
