import { createLogger, format, transports } from 'winston';
const { combine, timestamp, splat, errors, prettyPrint } = format;

const level = 'debug';

const logger = createLogger({
  level,
  format: combine(timestamp(), splat(), errors(), prettyPrint()),
  defaultMeta: { service: 'touchbar-plus' },
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default logger;
