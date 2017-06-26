/* tslint:disable:variable-name */

import * as SequelizeStatic from "sequelize";
import {DataTypes, Sequelize} from "sequelize";
import {ArticleAttributes, ArticleInstance} from "./interfaces/article-interface";

export default function(sequelize: Sequelize, dataTypes: DataTypes):
  SequelizeStatic.Model<ArticleInstance, ArticleAttributes> {
  let Article = sequelize.define<ArticleInstance, ArticleAttributes>("Article", {
    id: {type: dataTypes.INTEGER, allowNull: false, primaryKey: true,autoIncrement:true},
    user_id: {type: dataTypes.INTEGER, allowNull: false},
    title: {type: dataTypes.STRING, allowNull: false},
    content: {type: dataTypes.STRING, allowNull: false}
  }, {
    indexes: [],
    classMethods: {},
    timestamps: false
  });

  return Article;
}