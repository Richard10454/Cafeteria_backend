import {Model, Table, DataType, Column, ForeignKey, BelongsTo, Index, Default} from 'sequelize-typescript';
import Campus from './Campus.model';

@Table({
    tableName: 'Cafeterias',
})

class Cafeteria extends Model {

    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    descripcion!: string
    
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    encargado!: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    estado!: boolean

    @ForeignKey(() => Campus) // para definir la relación de clave foránea
    @Index // para optimizar las consultas por clave foránea
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    campusId!: number
    @BelongsTo(() => Campus, { // para definir la relación inversa
        onDelete: 'CASCADE', // opcional: define el comportamiento al eliminar un Campus
        onUpdate: 'CASCADE' // opcional: define el comportamiento al actualizar un Campus
    })
    campus!: Campus

}

export default Cafeteria;