import filmes from '../controllers/filmesController';

export default (app) => {
  app.post('/filmes/persist', filmes.persist);
  app.post('/filmes/persist/:id', filmes.persist);
  app.post('/filmes/destroy', filmes.destroy);
  app.get('/filmes', filmes.get);
  app.get('/filmes/:id', filmes.get);
};
