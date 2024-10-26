import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

type gameStatus = 'created'|'in_progess'|'won'|'lost'

interface GameAttributes {
    id?:number
    userId:number
    aiLevel:number
    status?:gameStatus
    boardObj:object
}

class Game extends Model<GameAttributes> implements GameAttributes{
    public id!:number
    public userId!:number
    public aiLevel!:number
    public status!:gameStatus
    public boardObj!:object
}

Game.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull: false,
            references: {       //foreign key userId
                model:'users',
                key:'id'
            }
        },
        aiLevel:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'created',
        },
        boardObj:{
            type: DataTypes.JSONB,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: 'games',
        timestamps: true,
        modelName: 'game'
    }
)

export default Game