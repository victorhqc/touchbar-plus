import React, { Component, ReactNode } from 'react';
import { NativeImage } from 'electron';
import isFunction from 'lodash/isFunction';
import { createOcticonImage } from '../../utils';

class Octicon extends Component<OcticonProps, State> {
  constructor(props: OcticonProps) {
    super(props);

    this.state = {
      octicon: null,
    };
  }

  async componentDidMount() {
    const { icon, iconColor } = this.props;

    const octicon = await createOcticonImage({
      icon,
      color: iconColor || '#ffffff',
    });

    this.setState({ octicon });
  }

  async componentDidUpdate(prevProps: OcticonProps) {
    const { icon, iconColor } = this.props;

    if (prevProps.iconColor === iconColor) return;

    const octicon = await createOcticonImage({
      icon,
      color: iconColor || '#ffffff',
    });

    this.setState({ octicon });
  }

  render() {
    const { children } = this.props;
    const { octicon } = this.state;

    if (isFunction(children)) {
      return children({ octicon });
    }

    return <>{this.props.children}</>;
  }
}

export default Octicon;

type WithOcticonFunc = (args: WithOcticonProps) => ReactNode | ReactNode[];

export interface WithOcticonProps {
  octicon: NativeImage | null;
}

export interface OcticonProps {
  iconColor?: string;
  icon: string;
  children?: ReactNode | WithOcticonFunc;
}

interface State {
  octicon: NativeImage | null;
}
