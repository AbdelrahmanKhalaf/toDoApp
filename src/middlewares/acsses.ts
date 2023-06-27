import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "./auth";
export const checkRole =
  (...roles: Array<any>) =>
  (req: Request, res: Response, next: NextFunction) => {  
    
    if (!roles.includes((req as AuthenticatedRequest).user!.role)) {
    return res.status(403).send({error_en:"Access Forbidden!! " , error_ar:"الوصول ممنوع !!"});
    }
 return   next();
  };
