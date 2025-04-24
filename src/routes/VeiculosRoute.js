import Veiculo from '../controllers/VeiculosController';

export default (app) => {
  app.post('/veiculo/persist', Veiculo.persist);
  app.post('/veiculo/persist/:idVeiculo', Veiculo.persist);
  app.delete('/veiculo/destroy/:idVeiculo', Veiculo.destroy);
  app.get('/veiculo', Veiculo.get);
  app.get('/veiculo/:idVeiculo', Veiculo.get);
};
