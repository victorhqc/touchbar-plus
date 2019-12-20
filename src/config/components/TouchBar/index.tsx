import React, { FC } from 'react';
import { TouchBar, Wrapper } from './styled';

const TouchBarComponent: FC<Props> = ({ children }) => (
  <Wrapper>
    <TouchBar>{children}</TouchBar>
  </Wrapper>
);

type Props = {};

export default TouchBarComponent;
