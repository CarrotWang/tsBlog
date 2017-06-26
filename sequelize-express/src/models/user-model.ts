/* tslint:disable:variable-name */

import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {UserAttributes, UserInstance} from "./interfaces/user-interface";

export default function(sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<UserInstance, UserAttributes> {
  let User = sequelize.define<UserInstance, UserAttributes>("User", {
    id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true},
    password: {type: dataTypes.STRING, allowNull: false},
    name: {type: dataTypes.STRING, allowNull: false},
    description: {type: dataTypes.TEXT, allowNull: true}
  }, {
    indexes: [],
    classMethods: {},
    timestamps: false
  });

  return User;
}