import {userService} from "../services/user-service";
import {UserInstance} from "../models/interfaces/user-interface";
import {Request, Response, Router} from "express";

export const router = Router();

router.post("/register", function(req: Request, res: Response) {
  userService.getUserByName(req.body.name).then(
      function(user:UserInstance){
          if(user==null){
              userService.addUser(req.body).then(function(user: UserInstance) {
                  return res.status(201).send({status:0,user:user,message:"success"});
              }).catch(function (error: Error) {
                  return res.status(409).send(error);
              });
          }else{
              return res.status(201).send({status:6,message:"exists"});
          }
      }
  ).catch((error: Error) => {
    return res.status(500).send(error);
  });
  
});

router.post("/login", function(req: Request, res: Response) {
  userService.getUserByName(req.body.name).then(
      function(user:UserInstance){
          if(user==null){
            return res.status(201).send({status:2,user:user,message:"not exists"});   
          }else{
            if(user.dataValues.password==req.body.password){
                //session部分
                req.session["user"]=user;
                //session.user=user;
                return res.status(201).send({status:0,message:"success"});
            }else{
                return res.status(201).send({status:3,message:"wrong password"});
            } 
          }
      }
  ).catch((error: Error) => {
    return res.status(500).send(error);
  });
  
});