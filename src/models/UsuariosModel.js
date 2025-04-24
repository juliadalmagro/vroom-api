import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import TiposUsuarioModel from './TiposUsuarioModel';

const Usuario = sequelize.define(
  'usuarios',
  {
    idUsuario: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeUsuario: {
      field: 'nome',
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cpfUsuario: {
      field: 'cpf',
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    emailUsuario: {
      field: 'email',
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    senhaUsuario: {
      field: 'senha_hash',
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

Usuario.belongsTo(TiposUsuarioModel, {
  as: 'TipoId',
  onUpdate: 'NO ACTION',
  onDelete: 'NO ACTION',
  foreignKey: {
    name: 'usuarioTipoUsuario',
    field: 'tipo_id',
  },
});

export default Usuario;
