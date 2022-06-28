import { PushToken } from '../database/models/PushToken';
import { error, output } from '../utils';
import { Errors } from '../utils/error';

export async function registerPushToken(r) {
  const { id } = r.auth.credentials;

  const [token] = await PushToken.findOrCreate({
    where: { userId: id, token: r.payload.token },
    defaults: { userId: id, token: r.payload.token },
  });

  return output({ tokenId: token.id });
}

export async function deletePushToken(r) {
  const token = await PushToken.findOne({
    where: {
      userId: r.auth.credentials.id,
      token: r.payload.token,
    },
  });

  if (!token) {
    return error(Errors.NotFound, 'Push token not registered', {});
  }

  await token.destroy();

  return output();
}
