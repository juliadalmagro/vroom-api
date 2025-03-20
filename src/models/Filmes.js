import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const Filmes = sequelize.define(
  'filmes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    autor: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duracaoMin: {
      field: 'duracao_min',
      type: DataTypes.INTEGER,
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

export default Filmes;
