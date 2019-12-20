import React, { FC } from 'react';
import styled from '@emotion/styled';

import TouchBar from './components/TouchBar';
import Button from './components/Button';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const Content = styled.div`
  flex: 1 0 auto;
`;

const Footer = styled.div`
  flex-shrink: 0;
`;

const App: FC = () => (
  <Wrapper>
    <Content />
    <Footer>
      <TouchBar>
        <Button>Hello world!</Button>
        <Button>Another Button</Button>
      </TouchBar>
    </Footer>
  </Wrapper>
);

export default App;
