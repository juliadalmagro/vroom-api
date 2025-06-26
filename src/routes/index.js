import StatusAgendamentoRoute from './StatusAgendamentoRoute';
import DiasSemanaRoute from './DiasSemanaRoute';
import TiposUsuarioRoute from './TiposUsuarioRoute';
import UsuarioRoute from './UsuariosRoute';
import VeiculosRoute from './VeiculosRoute';
import HorariosAulaRoute from './HorariosAulaRoute';
import AgendamentosRoute from './AgendamentosRoute';
import InstrutorHorariosRoute from './InstrutorHorariosRoute';

function Routes(app) {
  TiposUsuarioRoute(app);
  DiasSemanaRoute(app);
  StatusAgendamentoRoute(app);
  UsuarioRoute(app);
  VeiculosRoute(app);
  HorariosAulaRoute(app);
  AgendamentosRoute(app);
  InstrutorHorariosRoute(app);
}

export default Routes;
