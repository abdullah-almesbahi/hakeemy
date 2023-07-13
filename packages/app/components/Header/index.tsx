import React from 'react';
import { Appbar } from 'react-native-paper';
import { ROUTE_SETTINGS } from '../../utils/constants';
import { push } from 'connected-react-router';
import HeaderWrapper from '../HeaderWrapper';

interface HeaderProps {
  left?: any;
  right?: any;
  push: typeof push;
  title: string;
  style?: any;
}

const Header: React.SFC<HeaderProps> = props => {
  return (
    <HeaderWrapper style={props.style}>
      {props.left}
      <Appbar.Content color='black' title={props.title} />
      {props.right ? props.right : props.children}
    </HeaderWrapper>
  );
};

export default Header;
