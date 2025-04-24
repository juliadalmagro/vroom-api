import TiposUsuario from '../controllers/TiposUsuarioController';

export default (app) => {
  app.post('/tipos-usuario/persist', TiposUsuario.persist);
  app.post('/tipos-usuario/persist/:id', TiposUsuario.persist);
  app.delete('/tipos-usuario/destroy/:id', TiposUsuario.destroy);
  app.get('/tipos-usuario', TiposUsuario.get);
  app.get('/tipos-usuario/:id', TiposUsuario.get);
};
