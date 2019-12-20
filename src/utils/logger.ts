import { createLogger, format, transports } from 'winston';
const { combine, timestamp, splat, errors, prettyPrint } = format;

const level = 'debug';

const logger = createLogger({
  level,
  format: combine(timestamp(), splat(), errors(), prettyPrint()),
  defaultMeta: { service: 'touchbar-plus' },
  transports: [new transports.File({ filename: 'touchbar-plus.error.log', level: 'error' })],
});

if (process.env.DEBUG === '1' || process.env.DEBUG === 'true') {
  logger.add(new transports.File({ filename: 'touchbar-plus.combined.log' }));
  logger.add(new transports.Console());
}

export default logger;
