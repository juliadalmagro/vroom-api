import Agendamento from '../controllers/AgendamentoController';

export default (app) => {
  app.get('/agendamento/completo', Agendamento.listarAgendamentosCompletos);
  app.get('/agendamento/aluno/:idAluno', Agendamento.listarAgendamentosAluno);
  app.get('/agendamento/instrutor/:idInstrutor', Agendamento.listarAgendamentosInstrutor);
  app.post('/agendamento/persist', Agendamento.persist);
  app.post('/agendamento/persist/:idAgendamento', Agendamento.persist);
  app.delete('/agendamento/destroy/:idAgendamento', Agendamento.destroy);
  app.get('/agendamento', Agendamento.get);
  app.get('/agendamento/:idAgendamento', Agendamento.get);
};
