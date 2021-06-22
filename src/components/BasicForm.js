import useFormInput from "../Hooks/use-forminput";
import useFormStyle from "../Hooks/use-formstyle";


const BasicForm = (props) => {
  //🔠 first name

  function validateFormatFName(firstName) {
    return firstName.trim() !== "";
  }
  

  const {
    value: firstName,
    hasError: enteredFnameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: fnameChangeHandler,
    valueBlurHandler: fnameBlurHandler,
    reset: fnameReset,
  } = useFormInput(validateFormatFName);

  //🔠 lastname
  function validateFormatLastName(lastName) {
    return lastName.trim() !== "";
  }

  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    valueBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useFormInput(validateFormatLastName);

  //🔠 email 📧
  function validateFormatemailInput(emailInput) {
    const regex = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim;
    return emailInput.match(regex);
  }

  const {
    value: emailInput,
    hasError: emailInputHasError,
    isValid: emailInputIsValid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useFormInput(validateFormatemailInput);

  //🔠 password 🔐
  function validateFormatPasswordInput(passwordInput) {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return passwordInput.match(regexPassword);
  }

  const {
    value: passwordInput,
    hasError: passwordInputHasError,
    isValid: passwordInputIsValid,
    valueChangeHandler: passwordInputChangeHandler,
    valueBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useFormInput(validateFormatPasswordInput);

  //  form control 🎛️
  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailInputIsValid && passwordInputIsValid) {
    formIsValid = true;
  }


  // submit handler control 💜
  function submitHandler(event) {
    event.preventDefault();

    if (!firstNameIsValid && !lastNameIsValid && !emailInputIsValid && !passwordInputIsValid ) {
      return;
    }

    // show values
    console.log("Full name: ", firstName, " ", lastName);
    console.log("Email: ", emailInput);

    // reset first name
    fnameReset();
    lastNameReset();
    emailInputReset();
    passwordInputReset();
  }

  const [firstNameInputClasses] = useFormStyle(enteredFnameHasError);
  const [lastNameInputClasses] = useFormStyle(lastNameHasError);
  const [emailInputClasses] = useFormStyle(emailInputHasError);
  const [passwordInputClasses] = useFormStyle(passwordInputHasError);

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className={firstNameInputClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={fnameChangeHandler}
            onBlur={fnameBlurHandler}
          />

          {enteredFnameHasError && (
            <p style={{ color: "red" }}>Field Must not be empty</p>
          )}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameHasError && (
            <p style={{ color: "red" }}>Last name Must not be empty</p>
          )}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          value={emailInput}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputHasError && (
          <p style={{ color: "red" }}>Email is not valid</p>
        )}
      </div>
      <div className={passwordInputClasses}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={passwordInput}
          onChange={passwordInputChangeHandler}
          onBlur={passwordInputBlurHandler}
          
        />
        {passwordInputHasError && (
          <p style={{ color: "red" }}>Password should have at least 8 characters,at least 1 uppercase letter, 1 lowercase letter, and 1 number</p>
        )}
      </div>

      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
