import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";
import { GameStatus } from "../utils/type";

interface GameAttributes {
    id?:number
    userId:number
    aiLevel:number
    status?:GameStatus
    boardObj:object
}

class Game extends Model<GameAttributes> implements GameAttributes{
    public id!:number
    public userId!:number
    public aiLevel!:number
    public status!:GameStatus
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
            defaultValue: GameStatus.IN_PROGRESS,
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