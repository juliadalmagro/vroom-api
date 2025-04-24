import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import DiasSemana from './DiasSemanaModel';
import Usuario from './UsuariosModel';

const HorariosTrabalho = sequelize.define(
  'horarios_trabalho',
  {
    idHorarioTrabalho: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    horaInicioHorarioTrabalho: {
      field: 'hora_inicio',
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFimHorarioTrabalho: {
      field: 'hora_fim',
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

HorariosTrabalho.belongsTo(DiasSemana, {
  as: 'diaId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idDiaSemana',
    field: 'dia_id',
  },
});

HorariosTrabalho.belongsTo(Usuario, {
  as: 'instrutorId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idInstrutor',
    field: 'instrutor_id',
  },
});

export default HorariosTrabalho;
