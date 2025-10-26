import {Table, Column, Model, DataType, HasMany, Default} from 'sequelize-typescript';
import Cafeteria from './Cafeteria.model';

@Table({
    tableName: 'Campus',
})

class Campus extends Model {
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

    @HasMany(() => Cafeteria)
    cafeterias!: Cafeteria[];
}

export default Campus;