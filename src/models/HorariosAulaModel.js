import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const HorariosAula = sequelize.define(
  'horarios_aula',
  {
    idHorarioAula: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hora: {
      type: DataTypes.TIME,
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

export default HorariosAula;
