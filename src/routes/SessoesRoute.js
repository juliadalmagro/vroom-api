import sessoes from '../controllers/sessoesController';

export default (app) => {
  app.post('/sessoes/persist', sessoes.persist);
  app.post('/sessoes/persist/:id', sessoes.persist);
  app.post('/sessoes/destroy', sessoes.destroy);
  app.get('/sessoes', sessoes.get);
  app.get('/sessoes/:id', sessoes.get);
  app.get('/sessoesDisponiveis', sessoes.getSessoesDisponiveis);
  app.get('/sessoesDisponiveis/:id', sessoes.getSessoesDisponiveis);
  // app.get('sessoesDisponiveis', sessoes.getDadosSessao);
};
