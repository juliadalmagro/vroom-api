import parametros from '../controllers/parametrosController';

export default (app) => {
  app.post('/parametros/persist', parametros.persist);
  app.post('/parametros/persist/:id', parametros.persist);
  app.post('/parametros/destroy', parametros.destroy);
  app.get('/parametros', parametros.get);
  app.get('/parametros/:id', parametros.get);
};
