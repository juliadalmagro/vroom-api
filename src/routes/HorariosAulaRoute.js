import HorariosAula from '../controllers/HorariosAulaController';

export default (app) => {
  app.post('/horario-aula/persist', HorariosAula.persist);
  app.post('/horario-aula/persist/:idHorarioAula', HorariosAula.persist);
  app.delete('/horario-aula/destroy/:idHorarioAula', HorariosAula.destroy);
  app.get('/horario-aula', HorariosAula.get);
  app.get('/horario-aula/:idHorarioAula', HorariosAula.get);
};
