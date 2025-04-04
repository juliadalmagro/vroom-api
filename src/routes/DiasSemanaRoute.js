import DiasSemana from '../models/DiasSemanaModel';

export default (app) => {
  app.post('/dias-semana/persist', DiasSemana.persist);
  app.post('/dias-semana/persist/:id', DiasSemana.persist);
  app.post('/dias-semana/destroy', DiasSemana.destroy);
  app.get('/dias-semana', DiasSemana.get);
  app.get('/dias-semana/:id', DiasSemana.get);
};
