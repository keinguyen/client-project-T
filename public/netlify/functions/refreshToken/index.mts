import { getAuthorization, response } from '../helpers/request';
import { createToken, parseToken, verifyToken } from '../helpers/security';

export default async function (req: Request) {
  try {
    const accessToken = getAuthorization(req);
    const { refreshToken } = await req.json();

    if (!accessToken || !refreshToken) {
      throw new Error();
    }

    const parsedToken = parseToken(accessToken);
    const parsedRefreshToken = parseToken(refreshToken);
    const isValidToken = parsedToken && typeof parsedToken !== 'string';
    const isValidRefreshToken = parsedRefreshToken && typeof parsedRefreshToken !== 'string';

    if (
      !isValidToken
      || !isValidRefreshToken
      || parsedRefreshToken.userId !== parsedToken.userId
      || parsedRefreshToken.role !== parsedToken.role
    ) {
      throw new Error();
    }

    const verifedToken = verifyToken(accessToken);
    const verifedRefreshToken = verifyToken(refreshToken, true);

    if (verifedToken && verifedRefreshToken) {
      return response({
        data: { accessToken, refreshToken },
      });
    }

    if (!verifedRefreshToken) {
      throw new Error();
    }

    const newAccessToken = createToken({
      userId: parsedToken.userId,
      role: parsedToken.role,
    });

    return response({
      data: { accessToken: newAccessToken, refreshToken },
    });
  } catch (err) {
    return response({
      data: { error: 'INVALID_REQUEST' },
      status: 400,
    });
  }
}
