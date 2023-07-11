const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Peoples = sequelize.define("peoples", {
    people_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name : {type: DataTypes.STRING, allowNull: false },
    last_name : {type: DataTypes.STRING, allowNull: false  },
    birthday : {type: DataTypes.DATE, allowNull: false  },
    gender : {type: DataTypes.STRING, allowNull: false  },
    height : {type: DataTypes.INTEGER, allowNull: false  },
    weight : {type: DataTypes.INTEGER, allowNull: false  },
    

},{timestamps: false})

const Phones = sequelize.define("phones", {
    phone_id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    phone_number : {type: DataTypes.STRING, unique: true, allowNull: false  },
    people_id : {type: DataTypes.INTEGER, allowNull: false  },
    assignment : {type: DataTypes.DATE, allowNull: false  },
},{timestamps: false})

Peoples.hasMany(Phones, { foreignKey: "people_id" });
Phones.belongsTo(Peoples, { foreignKey: "people_id" });

module.exports = {
    Phones,
    Peoples
}

