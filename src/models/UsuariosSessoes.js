import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config';
import Usuarios from './Usuarios';
import Sessoes from './Sessoes';

const UsuariosSessoes = sequelize.define(
  'usuarios_sessoes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valorAtual: {
      field: 'valor_atual',
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

UsuariosSessoes.belongsTo(Sessoes, {
  as: 'sessoes',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_sessao',
    name: 'idSessao',
    allowNull: false,
  },
});

UsuariosSessoes.belongsTo(Usuarios, {
  as: 'usuarios',
  onDelete: 'no action',
  onUpdate: 'no action',
  foreignKey: {
    field: 'id_usuario',
    name: 'idUsuario',
    allowNull: false,
  },
});

export default UsuariosSessoes;
