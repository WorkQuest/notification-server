import pino from "pino";

export const Logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'hostName',
      translateTime: "dd-mm-yyyy HH:MM:ss",
    }
  }
});