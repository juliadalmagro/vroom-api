import usuariosSessoesController from '../controllers/usuariosSessoesController';

export default (app) => {
  app.post('/usuariosSessoes/persist', usuariosSessoesController.persist);
  app.post('/usuariosSessoes/persist/:id', usuariosSessoesController.persist);
  app.post('/usuariosSessoes/destroy', usuariosSessoesController.destroy);
  app.get('/usuariosSessoes', usuariosSessoesController.get);
  app.get('/usuariosSessoes/:id', usuariosSessoesController.get);
};
