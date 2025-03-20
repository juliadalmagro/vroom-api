import UsuariosSessoesRoute from './UsuariosSessoesRoute';
import CargosRoute from './CargosRoute';
import FilmesRoute from './FilmesRoute';
import PadraoLugaresRoute from './PadraoLugaresRoute';
import ParametrosRoute from './ParametrosRoute';
import SalasRoute from './SalasRoute';
import UsuariosRoute from './UsuariosRoute';
import SessoesRoute from './SessoesRoute';

function Routes(app) {
  CargosRoute(app);
  ParametrosRoute(app);
  UsuariosRoute(app);
  FilmesRoute(app);
  PadraoLugaresRoute(app);
  SalasRoute(app);
  SessoesRoute(app);
  UsuariosSessoesRoute(app);
}

export default Routes;
