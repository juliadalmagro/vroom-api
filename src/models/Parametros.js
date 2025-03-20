import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Parametros = sequelize.define(
  'parametros',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chave: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    valor: {
      type: DataTypes.STRING(255),
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

export default Parametros;
