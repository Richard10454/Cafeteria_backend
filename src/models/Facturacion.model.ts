import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  Index,
  BelongsTo,
  Default,
} from "sequelize-typescript";
import Empleados from "./Empleado.model";
import Articulos from "./Articulos.model";
import Usuario from "./Usuario.model";

@Table({
  tableName: "Facturacion",
})
class Facturacion extends Model {
  @Column({
    type: DataType.BIGINT(),
    allowNull: false,
  })
  noFactura!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fechaVenta!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  montoArticulos!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  unidadesVendidas!: number;

  @Column({
    type: DataType.STRING(300),
    allowNull: true,
  })
  comentarios!: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  estado!: boolean;

  @ForeignKey(() => Empleados)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  empleadoId!: number;
  @BelongsTo(() => Empleados, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  empleado!: Empleados;

  @ForeignKey(() => Articulos)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  articuloId!: number;
  @BelongsTo(() => Articulos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  articulo!: Articulos;

  @ForeignKey(() => Usuario)
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  usuarioId!: number;
  @BelongsTo(() => Usuario, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  usuario!: Usuario;
}

export default Facturacion;
