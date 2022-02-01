import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../../utils/config';

const verifyJwt = (token: string, options: jwt.VerifyOptions) => {
  return jwt.verify(token, JWT_SECRET, options);
};

export default verifyJwt;
