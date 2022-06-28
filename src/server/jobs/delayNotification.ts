import { messageController } from '../controllers/controller.message';

export default async function (payload) {
  await messageController.executeMessage(payload);
}
