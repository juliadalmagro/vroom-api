import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const StatusAgendamento = sequelize.define(
  'status_agendamento',
  {
    idStatusAgendamento: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      field: 'nome',
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },

);

export default StatusAgendamento;
