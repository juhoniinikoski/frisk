import { AuthenticationError } from 'apollo-server';
import { Jwt } from 'jsonwebtoken';
import { ACCESS_TOKEN_EXPIRATION_TIME } from '../../utils/config';
import { loaders } from '../loaders/dataloaders';
import signJwt from './signJwt';
import verifyJwt from './verifyJwt';

const subject = 'accessToken';

interface JwtPayload extends Jwt {
  userId: string | number
}

class AuthService {

  accessToken: string;

  constructor({ accessToken }: {accessToken: string}) {
    this.accessToken = accessToken;
  }

  getAuthorizedUserId() {
    if (!this.accessToken) {
      return null;
    }

    let tokenPayload;

    try {
      tokenPayload = verifyJwt(this.accessToken, { subject }) as JwtPayload;
    } catch (e) {
      return null;
    }

    return tokenPayload.userId;
  }

  async getAuthorizedUser() {
    const id = this.getAuthorizedUserId();

    if (!id) {
      return null;
    }

    return await loaders.user.load(id);
  }

  async getAuthorizedUserOrFail(error?: Error) {
    const normalizedError =
      error || new AuthenticationError('Authorization is required');

    const user = await this.getAuthorizedUser();

    if (!user) {
      throw normalizedError;
    }

    return user;
  }

  createAccessToken(userId: string | number) {
    const expiresAt = new Date(Date.now() + ACCESS_TOKEN_EXPIRATION_TIME);

    return {
      accessToken: signJwt(
        { userId },
        {
          expiresIn: expiresAt.getDate() - new Date().getDate(),
          subject,
        },
      ),
      expiresAt,
    };
  }
}

export default AuthService;
