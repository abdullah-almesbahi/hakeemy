import * as React from 'react';
import { Appbar } from 'react-native-paper';
import makeGrid from '../Grid';

const Grid = makeGrid(16); // gutter size

interface HeaderWrapperProps {
  style?: any;
}

const HeaderWrapper: React.SFC<HeaderWrapperProps> = props => {
  return (
    <Appbar.Header style={props.style}>
      <Grid.Container style={{ overflow: 'hidden' }}>
        <Grid.Row>
          <Grid.Col style={{ flexDirection: 'row', alignItems: 'center' }}>
            {props.children}
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </Appbar.Header>
  );
};

export default HeaderWrapper;
