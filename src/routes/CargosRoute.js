import cargos from '../controllers/cargosController';

export default (app) => {
  app.post('/cargos/persist', cargos.persist);
  app.post('/cargos/persist/:id', cargos.persist);
  app.post('/cargos/destroy', cargos.destroy);
  app.get('/cargos', cargos.get);
  app.get('/cargos/:id', cargos.get);
};
