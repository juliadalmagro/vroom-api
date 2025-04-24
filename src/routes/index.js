import StatusAgendamentoRoute from './StatusAgendamentoRoute';
import DiasSemanaRoute from './DiasSemanaRoute';
import TiposUsuarioRoute from './TiposUsuarioRoute';
import UsuarioRoute from './UsuariosRoute';
import VeiculosRoute from './VeiculosRoute';
import HorariosTrabalhoRoute from './HorariosTrabalhoRoute';
import AgendamentosRoute from './AgendamentosRoute';

function Routes(app) {
  TiposUsuarioRoute(app);
  DiasSemanaRoute(app);
  StatusAgendamentoRoute(app);
  UsuarioRoute(app);
  VeiculosRoute(app);
  HorariosTrabalhoRoute(app);
  AgendamentosRoute(app);
}

export default Routes;
