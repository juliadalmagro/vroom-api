import Usuario from '../controllers/UsuariosController';

export default (app) => {
  app.post('/usuario/login', Usuario.login);
  app.post('/usuario/persist', Usuario.persist);
  app.post('/usuario/persist/:idUsuario', Usuario.persist);
  app.delete('/usuario/destroy/:idUsuario', Usuario.destroy);
  app.get('/usuario', Usuario.get);
  app.get('/usuario/aluno', Usuario.getAluno);
  app.get('/usuario/instrutor', Usuario.getInstrutor);
  app.get('/usuario/:idUsuario', Usuario.get);
};
