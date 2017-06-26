import {Instance} from "sequelize";

export interface UserAttributes {
  id: number;
  name: string;
  password:string;
  description: string;
}

export interface UserInstance extends Instance<UserAttributes> {
  dataValues: UserAttributes;
}