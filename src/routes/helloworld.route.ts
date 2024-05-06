import { Request, Response, Router } from 'express';

const router = Router();

router.get('/helloworld', async (req: Request, res: Response) => {
  res.json({ message: 'Hello world' });
});

export default router;
