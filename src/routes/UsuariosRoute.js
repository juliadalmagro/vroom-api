import usuarios from '../controllers/usuariosController';
import verifyToken from '../middleware/verifyToken';
import verifyAdmin from '../middleware/verifyAdmin';

export default (app) => {
  app.post('/usuarios/persist', usuarios.persist);
  app.post('/usuarios/persist/:id', usuarios.persist);
  app.post('/usuarios/destroy', usuarios.destroy);
  app.get('/usuarios', usuarios.get);
  app.get('/usuarios/:id', usuarios.get);
  app.post('/usuarios/register', verifyToken, verifyAdmin, usuarios.register);
  app.post('/usuarios/login', usuarios.login);
};
