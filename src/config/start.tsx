import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { logger } from '../utils';

export default function start(element: Element): void {
  logger.debug('Start config');
  render(<App />, element);
}
