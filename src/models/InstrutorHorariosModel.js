import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuario from './UsuariosModel';
import HorariosAula from './HorariosAulaModel';
import DiasSemana from './DiasSemanaModel';

const InstrutorHorarios = sequelize.define(
  'instrutor_horarios',
  {
    idInstrutorHorario: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

InstrutorHorarios.belongsTo(Usuario, {
  as: 'instrutorId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idUsuario',
    field: 'instrutor_id',
  },
  allowNull: false,
});

InstrutorHorarios.belongsTo(DiasSemana, {
  as: 'diaId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idDiaSemana',
    field: 'dia_id',
  },
  allowNull: false,
});

InstrutorHorarios.belongsTo(HorariosAula, {
  as: 'horarioId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'idHorario',
    field: 'horario_id',
  },
  allowNull: false,
});

export default InstrutorHorarios;
