import { DataTypes, Model } from "sequelize";
import { sequelize } from "../utils/db";

export const MIN_TOKEN = 0.45

//User model interface
interface UserAttributes {
    id?:number
    username:string
    password:string
    tokens:number
    isAdmin:boolean
}

class User extends Model<UserAttributes> implements UserAttributes {
    public id!:number
    public username!: string;
    public password!: string;
    public tokens!: number;
    public isAdmin!: boolean;
}

User.init(
    {
        // Model attributes are defined here
        id:{
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate : {
                isEmail:true // checks for email format (foo@bar.com)
            }
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        tokens:{
            type: DataTypes.FLOAT,
            defaultValue:MIN_TOKEN  // allowNull defaults to true
        },
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: true,
        modelName: 'user'
    }
)

export default User