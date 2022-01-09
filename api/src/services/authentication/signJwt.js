import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../../utils/config'

const signJwt = (payload, options) => {
  return jwt.sign(payload, JWT_SECRET, options)
}

export default signJwt
