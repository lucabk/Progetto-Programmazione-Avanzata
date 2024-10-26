import User, { MIN_TOKEN } from "./users";
import Game from "./game";

//One-To-Many relationships
User.hasMany(Game)
Game.belongsTo(User)

export {
    User,
    Game,

    MIN_TOKEN
}