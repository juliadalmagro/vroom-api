import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Veiculo = sequelize.define(
  'veiculos',
  {
    idVeiculo: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modeloVeiculo: {
      field: 'modelo',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    placaVeiculo: {
      field: 'placa',
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

export default Veiculo;
