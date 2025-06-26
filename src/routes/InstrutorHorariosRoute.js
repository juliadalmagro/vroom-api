import InstrutorHorarios from '../controllers/InstrutorHorariosController';

export default (app) => {
  app.post('/instrutor-horarios/persist', InstrutorHorarios.persist);
  app.post('/instrutor-horarios/persist/:idInstrutorHorario', InstrutorHorarios.persist);
  app.delete('/instrutor-horarios/destroy/:idInstrutorHorario', InstrutorHorarios.destroy);
  app.get('/instrutor-horarios', InstrutorHorarios.get);
  app.get('/instrutor-horarios/:idInstrutorHorario', InstrutorHorarios.get);
  app.get('/instrutor-horarios-tudo', InstrutorHorarios.listarInstrutorHorarios);
};
