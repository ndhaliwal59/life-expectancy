import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Handle OPTIONS preflight
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', [
      'https://life-expectancy-theta.vercel.app',
      'https://life-expectancy-git-main-nishan-dhaliwals-projects.vercel.app'
    ]);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'x-auth-token, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
    return; // Explicit return after sending response
  }

  const token = req.header('x-auth-token');
  
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return; // Remove value return
  }
  
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'defaultsecret'
    ) as DecodedToken;
    
    (req as any).user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(401).json({ message: 'Token is not valid' });
    // No explicit return needed
  }
};

export default authMiddleware;
