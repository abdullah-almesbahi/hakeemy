import * as React from 'react';
import { Appbar } from 'react-native-paper';
import Responsive from '../Responsive';

interface AppbarTitleProps {
  title: string;
  goBack?: () => void;
}

const AppbarTitle: React.SFC<AppbarTitleProps> = props => {
  return (
    <Responsive
      small={
        <Appbar.Header>
          {props.goBack ? <Appbar.BackAction onPress={props.goBack} /> : null}

          <Appbar.Content title={props.title} />
          {/* <Appbar.Action icon='magnify' onPress={this._handleSearch} />
            <Appbar.Action icon='dots-vertical' onPress={this._handleMore} /> */}
        </Appbar.Header>
      }
      large={null}
    />
  );
};

export default AppbarTitle;
