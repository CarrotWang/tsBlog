import {logger} from "../utils/logger";
import {models, sequelize} from "../models/index";
import {UserAttributes, UserInstance} from "../models/interfaces/user-interface";
import {Transaction} from "sequelize";
import {Request} from "express";

export class UserService {
    addUser(userAttributes: UserAttributes): Promise<UserInstance> {
        let promise=new Promise<UserInstance>(function(resolve: Function, reject: Function){
            sequelize.transaction(
                function(t: Transaction){
                    return models.User.create(userAttributes).then((user: UserInstance) => {
                        console.log(userAttributes.name);
                        logger.info(`Created user with name ${userAttributes.name}.`);
                        resolve(user);
                    }).catch((error: Error) => {
                        logger.error(error.message);
                        reject(error);
                    });
                }
            );
        });

        return promise;
    }

    getUserByName(userName:string):Promise<UserInstance>{
        let promise=new Promise<UserInstance>(function(resolve: Function, reject: Function){
            sequelize.transaction(
                function(t: Transaction){
                    return models.User.findOne({where: {name: userName}}).then((user: UserInstance) => {
                        logger.info(`Created user with name ${user}.`);
                        resolve(user);
                    }).catch((error: Error) => {
                        logger.error(error.message);
                        reject(error);
                    });
                }
            );
        });

        return promise;
    }
}

export const userService = new UserService();