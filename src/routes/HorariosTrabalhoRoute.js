import HorarioTrabalho from '../controllers/HorariosTrabalhoController';

export default (app) => {
  app.post('/horario-trabalho/persist', HorarioTrabalho.persist);
  app.post('/horario-trabalho/persist/:idHorarioTrabalho', HorarioTrabalho.persist);
  app.delete('/horario-trabalho/destroy/:idHorarioTrabalho', HorarioTrabalho.destroy);
  app.get('/horario-trabalho', HorarioTrabalho.get);
  app.get('/horario-trabalho/:idHorarioTrabalho', HorarioTrabalho.get);
};
