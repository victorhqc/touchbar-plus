import { createLogger, format, transports } from 'winston';
const { combine, timestamp, splat, errors, prettyPrint } = format;

const level = 'debug';

const logger = createLogger({
  level,
  format: combine(timestamp(), splat(), errors(), prettyPrint()),
  defaultMeta: { service: 'touchbar-plus' },
  transports: [],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.File({ filename: 'error.log', level: 'error' }));
  logger.add(new transports.File({ filename: 'combined.log' }));
  logger.add(new transports.Console());
}

export default logger;
