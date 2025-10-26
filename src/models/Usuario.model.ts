import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
  Index,
  BelongsTo,
  HasMany,
  Default,
} from "sequelize-typescript";
import TiposUsuarios from "./TiposUsuarios.model";
import Facturacion from "./Facturacion.model";

@Table({
  tableName: "Usuarios",
})
class Usuario extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.STRING(11),
    allowNull: false,
    unique: true,
  })
  cedula!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.0,
  })
  limitedeCredito!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fechaRegistro!: Date;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @ForeignKey(() => TiposUsuarios)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  tipoUsuarioId!: number;

  @BelongsTo(() => TiposUsuarios, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  tipoUsuario!: TiposUsuarios;

  // Bloque @HasMany eliminado
  @HasMany(() => Facturacion)
  facturaciones!: Facturacion[];
}

export default Usuario;
