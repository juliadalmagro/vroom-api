import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const DiasSemana = sequelize.define(
  'dias_semana',
  {
    idDiaSemana: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    diaSemana: {
      field: 'nome',
      type: DataTypes.STRING(10),
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

export default DiasSemana;
