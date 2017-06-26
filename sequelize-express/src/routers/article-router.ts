import {articleService} from "../services/article-service";
import {ArticleInstance} from "../models/interfaces/article-interface";
import {Request, Response, Router} from "express";

export const router = Router();
router.post("/addArticle", function(req: Request, res: Response) {
        articleService.addArticle(req.body,req).then(function(article: ArticleInstance) {
            return res.status(201).send({status:0,article:article,message:"success"});
        }).catch(function (error: Error) {
            return res.status(409).send(error);
        });
});
router.post("/getArticles", function(req: Request, res: Response) {
    var id:number=Number(req.param("id"));
    var pageNum:number=Number(req.param("pageNum"));
    var pageSize:number=Number(req.param("pageSize"));
    articleService.getArticleList(id,pageNum,pageSize).then(function(articlelist: Array<ArticleInstance>) {
        return res.status(201).send({status:0,article:articlelist,message:"success"});
    }).catch(function (error: Error) {
        return res.status(409).send(error);
    });
});