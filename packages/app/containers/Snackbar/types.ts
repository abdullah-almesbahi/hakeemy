import { SHOW_SNACKBAR, HIDE_SNACKBAR, hideSnackbar } from './ducks';
import { StyleProp, ViewStyle } from 'react-native';
import { Theme } from 'react-native-paper';

export interface SnackbarProps extends initialStateSnackbarType {
  hideSnackbar: typeof hideSnackbar;
  snackbar: initialStateSnackbarType;
  children: any;
  /**
   * Label and press callback for the action button. It should contain the following properties:
   * - `label` - Label of the action button
   * - `onPress` - Callback that is called when action button is pressed.
   */
  action?: {
    label: string;
    accessibilityLabel?: string;
    onPress: () => any;
  };
  /**
   * Callback called when Snackbar is dismissed. The `visible` prop needs to be updated when this is called.
   */
  onDismiss: () => any;
  /**
   * Text content of the Snackbar.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * @optional
   */
  theme: Theme;
}

export interface initialStateSnackbarType {
  message: string;
  /**
   * Whether the Snackbar is currently visible.
   */
  visible: boolean;

  /**
   * The duration for which the Snackbar is shown.
   */
  duration?: number;
}

export interface showSnackbarAction {
  type: typeof SHOW_SNACKBAR;
  message: string;
}

export interface hideSnackbarAction {
  type: typeof HIDE_SNACKBAR;
}

export type SnackbarActionTypes = showSnackbarAction | hideSnackbarAction;
