import {Table, Model, Column, DataType, HasMany, Default} from 'sequelize-typescript';
import Articulo from './Articulos.model';

@Table({
    tableName: 'Marcas',
})

class Marcas extends Model {
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    descripcion!: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN,
    })
    estado!: boolean

    @HasMany(() => Articulo) 
    articulos!: Articulo[]; 
}

export default Marcas;