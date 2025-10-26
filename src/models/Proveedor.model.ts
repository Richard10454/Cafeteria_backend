import {Model, DataType, Table, Column, HasMany, Default} from 'sequelize-typescript';
import Articulo from './Articulos.model';

@Table({
    tableName: 'Proveedores',
})

class Proveedores extends Model{
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    nombreComercial!: string

    @Column({
        type: DataType.STRING(9),
        allowNull: false,
        unique: true
    })
    rnc: string

    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    fechaRegistro!: Date

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    estado!: boolean

    @HasMany(() => Articulo) 
    articulos!: Articulo[]; 
}

export default Proveedores;