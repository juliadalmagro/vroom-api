import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Cargos from './Cargos';

const Usuarios = sequelize.define(
  'usuarios',
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
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    estudante: {
      type: DataTypes.BOOLEAN,
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.TEXT,
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

Usuarios.belongsTo(Cargos, {
  as: 'cargos',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_cargos',
    name: 'idCargos',
    allowNull: false,
  },
});

export default Usuarios;
