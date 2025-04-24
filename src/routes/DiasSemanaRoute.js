import DiasSemanaController from '../controllers/DiasSemanaController';

export default (app) => {
  app.post('/dias-semana/persist', DiasSemanaController.persist);
  app.post('/dias-semana/persist/:idDiaSemana', DiasSemanaController.persist);
  app.delete('/dias-semana/destroy/:idDiaSemana', DiasSemanaController.destroy);
  app.get('/dias-semana', DiasSemanaController.get);
  app.get('/dias-semana/:idDiaSemana', DiasSemanaController.get);
};
