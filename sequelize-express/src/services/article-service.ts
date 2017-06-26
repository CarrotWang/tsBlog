import {logger} from "../utils/logger";
import {models, sequelize} from "../models/index";
import {ArticleAttributes, ArticleInstance} from "../models/interfaces/article-interface";
import {Transaction} from "sequelize";
import {Request} from "express";
export class ArticleService {
    addArticle(articleAttributes: ArticleAttributes,req:Request): Promise<ArticleInstance> {
        articleAttributes.user_id=req.session["user"].id;
        console.log("aaaa"+req.session["user"].id);
        let promise=new Promise<ArticleInstance>(function(resolve: Function, reject: Function){
            sequelize.transaction(
                function(t: Transaction){
                    return models.Article.create(articleAttributes).then((article: ArticleInstance) => {
                        console.log(articleAttributes.title);
                        logger.info(`Created article with title ${articleAttributes.title}.`);
                        resolve(article);
                    }).catch((error: Error) => {
                        logger.error(error.message);
                        reject(error);
                    });
                }
            );
        });

        return promise;
    }


    getArticleList(id:number,pageNum:number,pageSize:number): Promise<Array<ArticleInstance>> {
        let promise = new Promise<Array<ArticleInstance>>((resolve: Function, reject: Function) => {
            sequelize.transaction((t: Transaction) => {
                return models.Article.findAll({where: {user_id: id}}).then((articles: Array<ArticleInstance>) => {
                    resolve(articles);
                }).catch((error: Error) => {
                    logger.error(error.message);
                    reject(error);
                });
            });
        });

        return promise;
    }

}

export const articleService = new ArticleService();