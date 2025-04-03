import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';

const TiposUsuarioModel = sequelize.define(
  'tipos_usuario',
  {
    idTipoUsuario: {
      field: 'id',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoUsuario: {
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

export default TiposUsuarioModel;
