export enum IInputType {
  Text = "text",
  Email = "email",
  Password = "password",
  Date = "date",
  Time = "time",
  Number = "number",
  Search = "search",
}

export enum ISelectType {
  Single = "single",
  Multi = "multiple",
}

export interface IInputValidator {
  validator: string;
  range?: number;
  message?: string;
}

export interface ITextInputField {
  labelId?: string;
  labelTitle?: string;
  inputType: IInputType;
  inputValue?: string | number;
  inputPlaceholder?: string;
  isTextArea?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  placeTextCenter?: boolean;
  hasBottomPadding?: boolean;
  isSmallInputSize?: boolean;
  onInputChange?: (value: string) => void;
  onInputValidated?: (value: boolean) => void;
  errorHandler?: IInputValidator;
}

export interface IPhoneInputField {
  labelTitle?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onInputChange?: (value: string) => void;
}

export interface ISelectInputField {
  labelTitle?: string;
  inputPlaceholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  onSelectChange?: (value: string) => void;
}

export interface ISelectDropdown {
  selectData: any[];
  selectType: ISelectType;
  onSelectChange?: (value: string) => void;
}

export interface ICountryItem {
  country: string;
  dialing_code: string;
  code: string;
  flag: string;
  currency?: {
    sign: string;
    short: string;
    long: string;
    description: string;
  };
}
