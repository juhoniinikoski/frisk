import { AuthenticationError } from 'apollo-server';
import { getUser } from '../../operations/userOperations';
import { ACCESS_TOKEN_EXPIRATION_TIME } from '../../utils/config';
import signJwt from './signJwt';
import verifyJwt from './verifyJwt';

const subject = 'accessToken';

class AuthService {
  
  accessToken: string

  constructor({ accessToken }: { accessToken: string }) {
    this.accessToken = accessToken;
  }

  async getAuthorizedUserId() {
    if (!this.accessToken) {
      return null;
    }

    // console.log("authservice: " + this.accessToken)

    let tokenPayload;

    try {
      tokenPayload = verifyJwt(this.accessToken, { subject });
    } catch (e) {
      return null;
    }

    return tokenPayload.userId;
  }

  async getAuthorizedUser() {
    const id = await this.getAuthorizedUserId();

    if (!id) {
      return null;
    }

    return await getUser(id);
  }

  async getAuthorizedUserOrFail(error?: string) {
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