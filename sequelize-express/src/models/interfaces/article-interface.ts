import {Instance} from "sequelize";

export interface ArticleAttributes {
  id:number;
  user_id:number;
  title: string;
  content: string;
}

export interface ArticleInstance extends Instance<ArticleAttributes> {
  dataValues: ArticleAttributes;
}