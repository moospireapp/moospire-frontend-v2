"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import {
  ITextInputField,
  IInputType,
  IInputValidator,
} from "@/app/_types/form-type";
import { useValidator } from "@/app/_hooks";
import "./TextInputField.scss";

const TextInputField = ({
  labelId,
  labelTitle,
  inputType = IInputType.Text,
  inputPlaceholder = "",
  isTextArea = false,
  isRequired = false,
  isDisabled = false,
  placeTextCenter = false,
  hasBottomPadding = true,
  isSmallInputSize = false,
  onInputChange,
  onInputValidated,
  errorHandler,
}: ITextInputField) => {
  const {
    validateRequired,
    validateEmail,
    validateNumberEntry,
    validateFullName,
    validatePasswordStrength,
    validateSingleName,
    validateDateRange,
    validateURL,
  } = useValidator();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const [formValue, setFormValue] = useState<string>("");
  const [formErrorMsg, setFormErrorMsg] = useState<string>("");
  const [isInputValid, setIsInputValid] = useState<boolean>(true);

  const [touched, setTouched] = useState<boolean>(false);

  useEffect(() => {
    if (touched) {
      const isValid = formErrorMsg.length === 0;

      if (onInputValidated) onInputValidated(isValid);
      setIsInputValid(isValid);
    }
  }, [formErrorMsg, touched]);

  const handleIconClick = () => {
    if (
      inputRef.current &&
      !isDisabled &&
      (inputType === IInputType.Date || inputType === IInputType.Time)
    ) {
      if (inputRef.current.showPicker) inputRef.current.showPicker();
      else inputRef.current.click();
    }
  };

  const getInputTypeView = () => {
    const typeView = {
      text: null,
      email: null,
      number: null,
      search: "has-prefix",
      password: "has-suffix",
      date: "has-date-suffix",
      time: "has-date-suffix",
      textarea: "is-text-area",
    };

    return isTextArea ? typeView.textarea : typeView[inputType];
  };

  const getInputType = () => {
    if (inputType !== IInputType.Password) return inputType;
    else return isHidden ? IInputType.Password : IInputType.Text;
  };

  const handleFormInput = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTouched(true);
    const target = event.target as HTMLInputElement;
    const value = target.value;
    setFormValue(value);

    if (errorHandler?.validator) validateInputFields(errorHandler, value);
    if (onInputChange) onInputChange(value);
  };

  const validateInputFields = (
    errorHandler: IInputValidator,
    value: string
  ) => {
    const { validator, range, message } = errorHandler;

    switch (validator) {
      case "validateRequired":
        setFormErrorMsg(validateRequired(value, message));
        break;

      case "validateEmail":
        setFormErrorMsg(validateEmail(value, message));
        break;

      case "validateNumberEntry":
        setFormErrorMsg(validateNumberEntry(value, message));
        break;

      case "validatePasswordStrength":
        setFormErrorMsg(validatePasswordStrength(value));
        break;

      case "validateFullName":
        setFormErrorMsg(validateFullName(value));
        break;

      case "validateSingleName":
        setFormErrorMsg(validateSingleName(value, message));
        break;

      case "validateDateRange":
        setFormErrorMsg(validateDateRange(value, range as number, message));
        break;

      case "validateURL":
        setFormErrorMsg(validateURL(value, message));
        break;

      default:
        setFormErrorMsg("");
        break;
    }
  };

  return (
    <div
      className={`form-block form-text-block ${
        hasBottomPadding ? "mb-8" : "mb-0"
      }`}
    >
      {/* LABEL TEXT */}
      {labelTitle && (
        <label htmlFor={labelId} className="form-label">
          {labelTitle}
        </label>
      )}

      <div className={`form-block-input ${getInputTypeView()}`}>
        {!isTextArea ? (
          <>
            {/* PREFIX ITEM FOR SEARCH FIELD TYPE */}
            {inputType === IInputType.Search && (
              <div className="prefix-item">
                <MagnifyingGlassIcon className="prefix-icon" />
              </div>
            )}

            <input
              type={getInputType()}
              id={labelId}
              ref={inputRef}
              value={formValue}
              className={`form-control ${
                isSmallInputSize ? "form-control-sm" : ""
              } ${placeTextCenter ? "text-center" : ""} ${
                !isInputValid ? "form-control-error" : ""
              }`}
              placeholder={inputPlaceholder}
              required={isRequired}
              disabled={isDisabled}
              onInput={handleFormInput}
              onChange={handleFormInput}
              onPasteCapture={handleFormInput}
              onKeyDown={handleFormInput}
            />

            {/* SUFFIX ITEM FOR PASSWORD FIELD TYPE */}
            {inputType === IInputType.Password && (
              <div
                className="suffix-item"
                onClick={() => setIsHidden(!isHidden)}
              >
                {isHidden ? (
                  <EyeIcon className="suffix-icon" />
                ) : (
                  <EyeSlashIcon className="suffix-icon" />
                )}
              </div>
            )}

            {/* SUFFIX ITEM FOR DATE FIELD TYPE */}
            {inputType === IInputType.Date && (
              <div className="suffix-date-item" onClick={handleIconClick}>
                <CalendarDaysIcon className="suffix-date-icon" />
              </div>
            )}

            {/* SUFFIX ITEM FOR TIME FIELD TYPE */}
            {inputType === IInputType.Time && (
              <div className="suffix-date-item" onClick={handleIconClick}>
                <ClockIcon className="suffix-date-icon" />
              </div>
            )}
          </>
        ) : (
          <>
            {/* TEXT AREA INPUT FIELD */}
            <textarea
              name=""
              id={labelId}
              className="form-control"
              value={formValue}
              placeholder={inputPlaceholder}
              required={isRequired}
              disabled={isDisabled}
              onInput={handleFormInput}
              onChange={handleFormInput}
              onPasteCapture={handleFormInput}
              onKeyDown={handleFormInput}
            ></textarea>
          </>
        )}
      </div>

      {/* VALIDATOR MESSAGE  */}
      {formErrorMsg.length && touched ? (
        <div className="validator-msg">{formErrorMsg}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TextInputField;

// SUITABLE FOR INPUT FIELDS SUCH AS
// - Text input
// - Email input
// - Search input
// - Password input
// - Date input
// - Time input
// - Textarea input
