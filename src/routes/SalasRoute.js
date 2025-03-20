import salas from '../controllers/salasController';

export default (app) => {
  app.post('/salas/persist', salas.persist);
  app.post('/salas/persist/:id', salas.persist);
  app.post('/salas/destroy', salas.destroy);
  app.get('/salas', salas.get);
  app.get('/salas/:id', salas.get);
};
