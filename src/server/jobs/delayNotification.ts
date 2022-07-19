import { messageController } from '../controllers/controller.message';
import { Logger } from "../config/pino";

export default async function (payload) {
  Logger.info(payload, 'Executed delayed notification');
  await messageController.executeMessage(payload);
}
