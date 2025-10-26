import {Column, DataType, Table, Model, HasMany, Default} from 'sequelize-typescript';
import Facturacion from './Facturacion.model';

@Table({
    tableName: 'Empleados',
})

class Empleado extends Model {
    @Column({
        type: DataType.STRING(40),
        allowNull: false,
    })
    nombre!: string

    @Column({
        type: DataType.STRING(11),
        allowNull: false,
        unique: true,
    })
    cedula!: string 

    @Column({
        type: DataType.STRING(20),
        allowNull: false
    })
    tandaLabor!: string

    @Column({
        type: DataType.DECIMAL(5,2), // EJ: 10.5
        allowNull: false
    })
    porcentajeComision!: number

    @Column({
        type: DataType.DATE(),
        allowNull: false
    })
    fechaIngreso!: Date

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    estado!: boolean

    @HasMany(() => Facturacion) 
    facturaciones!: Facturacion[];
}

export default Empleado;