import padraoLugares from '../controllers/padraoLugaresController';

export default (app) => {
  app.post('/padraoLugares/persist', padraoLugares.persist);
  app.post('/padraoLugares/persist/:id', padraoLugares.persist);
  app.post('/padraoLugares/destroy', padraoLugares.destroy);
  app.get('/padraoLugares', padraoLugares.get);
  app.get('/padraoLugares/:id', padraoLugares.get);
};
