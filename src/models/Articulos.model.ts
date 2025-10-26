import {Model, Table, Column, DataType, ForeignKey, Index, BelongsTo, HasMany, Default} from 'sequelize-typescript'
import Marcas from './Marca.model'
import Proveedores from './Proveedor.model'
import Facturacion from './Facturacion.model'

@Table({
    tableName: 'Articulos',
})

class Articulo extends Model{
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    descripcion!: string

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    costo!: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    existencia!: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    estado!: boolean

    @ForeignKey(() => Marcas)
    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    marcaId!: number
    @BelongsTo(() => Marcas, {
        onDelete: 'RESTRICT', // opcional: define el comportamiento al eliminar un Marca
        onUpdate: 'CASCADE' // opcional: define el comportamiento al actualizar un Marca
    })
    marca!: Marcas

    @ForeignKey(() => Proveedores)
    @Index
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    provedorID!: number
    @BelongsTo(() => Proveedores, {
        onDelete: 'RESTRICT', // opcional: define el comportamiento al eliminar un Proveedor
        onUpdate: 'CASCADE' // opcional: define el comportamiento al actualizar un Proveedor
    })
    proveedor!: Proveedores

    @HasMany(() => Facturacion) 
    facturaciones!: Facturacion[];
}

export default Articulo;