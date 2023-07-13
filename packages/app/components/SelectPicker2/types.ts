export interface SelectPickerOptions {
  value: string;
  label: string;
  description?: string;
}

export interface SelectPickerProps {
  label: string;
  placeholder: string;
  onSelect: (picked: string) => {};
  selected: string;
  showFilter?: boolean;
  showAdd?: boolean;
  showAddPress?: () => void;
  options: Array<SelectPickerOptions>;
}

export interface ModalPickerProps {
  options: Array<SelectPickerOptions>;
  onSelect: (value: string) => void;
  onCancel: () => void;
  placeholderText?: string;
  placeholderTextColor?: string;
  androidUnderlineColor?: string;
  cancelButtonText?: string;
  title?: string;
  noResultsText?: string;
  visible?: boolean;
  showFilter?: boolean;
  modal?: object;
  selectedOption?: string;
  renderOption?: (rowData: any, any) => void;
  // renderCancelButton: () => void,
  renderList?: () => void;
  listViewProps?: object;
  filterTextInputContainerStyle?: any;
  filterTextInputStyle?: any;
  cancelContainerStyle?: any;
  cancelButtonStyle?: any;
  cancelButtonTextStyle?: any;
  titleTextStyle?: any;
  overlayStyle?: any;
  listContainerStyle?: any;
  optionTextStyle?: any;
  selectedOptionTextStyle?: any;
  keyboardShouldPersistTaps?: string;

  showAdd?: boolean;
  showAddPress?: () => void;
}
