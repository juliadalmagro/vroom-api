import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Filmes from './Filmes';
import Salas from './Salas';

const Sessoes = sequelize.define(
  'sessoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    lugares: {
      type: DataTypes.JSONB,
    },
    dataInicio: {
      field: 'data_inicio',
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataFim: {
      field: 'data_fim',
      type: DataTypes.DATE,
      allowNull: false,
    },
    preco: {
      type: DataTypes.FLOAT,
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

Sessoes.belongsTo(Filmes, {
  as: 'filmes',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_filme',
    name: 'idFilme',
    allowNull: false,
  },
});
Sessoes.belongsTo(Salas, {
  as: 'salas',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_sala',
    name: 'idSala',
    allowNull: false,
  },
});

export default Sessoes;
