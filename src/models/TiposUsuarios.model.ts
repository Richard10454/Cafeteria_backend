import {Model, Table, DataType, Column, HasMany, Default} from 'sequelize-typescript'
import Usuarios from "./Usuario.model";

@Table({
    tableName: 'TiposUsuarios',
})

class TiposUsuarios extends Model{
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    descripcion!: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true
    })
    estado!: boolean

    @HasMany(() => Usuarios) 
    usuarios!: Usuarios[];
}

export default TiposUsuarios;