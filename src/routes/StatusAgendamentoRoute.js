import StatusAgendamentoController from '../controllers/StatusAgendamentoController';

export default (app) => {
  app.post('/status-agendamento/persist', StatusAgendamentoController.persist);
  app.post('/status-agendamento/persist/:idStatusAgendamento', StatusAgendamentoController.persist);
  app.delete('/status-agendamento/destroy/:idStatusAgendamento', StatusAgendamentoController.destroy);
  app.get('/status-agendamento', StatusAgendamentoController.get);
  app.get('/status-agendamento/:idStatusAgendamento', StatusAgendamentoController.get);
};
