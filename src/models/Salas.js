import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import PadraoLugares from './PadraoLugares';

const Salas = sequelize.define(
  'salas',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    observacao: {
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

Salas.belongsTo(PadraoLugares, {
  as: 'padrao_lugares',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_padrao_lugares',
    name: 'idPadraoLugares',
    allowNull: false,
  },
});

export default Salas;
