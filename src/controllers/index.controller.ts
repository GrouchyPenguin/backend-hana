import { NextFunction, Request, Response } from 'express';
import migrations from '../services/migrations';

class IndexController {
  public migrationsService = new migrations();

  public index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public runMigrations = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const out = await this.migrationsService.runMigrations();
      res.status(200).json({ data: out });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
