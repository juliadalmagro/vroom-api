import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuario from './UsuariosModel';
import Veiculo from './VeiculosModel';
import StatusAgendamento from './StatusAgendamentoModel';

const Agendamentos = sequelize.define(
  'agendamentos',
  {
    idAgendamento: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataAgendamento: {
      field: 'data',
      type: DataTypes.DATE,
      allowNull: false,
    },
    horarioAgendamento: {
      field: 'horario',
      type: DataTypes.TIME,
      allowNull: false,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

Agendamentos.belongsTo(Usuario, {
  as: 'alunoId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idAluno',
    field: 'aluno_id',
  },
  allowNull: false,
});

Agendamentos.belongsTo(Usuario, {
  as: 'instrutorId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idInstrutor',
    field: 'instrutor_id',
  },
  allowNull: false,
});

Agendamentos.belongsTo(Veiculo, {
  as: 'veiculoId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idVeiculo',
    field: 'veiculo_id',
  },
  allowNull: false,
});

Agendamentos.belongsTo(StatusAgendamento, {
  as: 'statusId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idStatus',
    field: 'status_id',
  },
  allowNull: false,
});

export default Agendamentos;
