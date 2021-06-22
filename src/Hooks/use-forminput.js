import { useReducer } from "react";

const useFormInput = (validateFormat) => {
  // reducer
  const defaultValue = {
    value: "",
    isTouched: false,
  };
  const valueReducer = (state, action) => {
    switch (action.type) {
      case "INPUT":
        return {
          value: action.value,
          isTouched: state.isTouched,
        };
      case "BLUR":
        return {
          value: state.value,
          isTouched: true,
        };
      case "RESET":
        return {
          value: "",
          isTouched: false,
        };
      default:
        return defaultValue;
    }
  };

  const [valueState, despatchValue] = useReducer(valueReducer, defaultValue);

  function valueChangeHandler(event) {
    despatchValue({
      type: "INPUT",
      value: event.target.value,
    });
  }

  function valueBlurHandler() {
    despatchValue({
      type: "BLUR",
    });
  }

  function reset() {
    despatchValue({
      type: "RESET",
    });
  }

  //   value is valid when condition of validateFormat satisfied
  const valueIsValid = validateFormat(valueState.value);
  const valueHasError = valueState.isTouched && !valueIsValid;

  return {
    value: valueState.value,
    hasError: valueHasError,
    isValid: valueIsValid,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useFormInput;
