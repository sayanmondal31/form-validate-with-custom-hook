const useFormStyle = (fieldHasError) => {
  const fieldClsses = fieldHasError ? "form-control invalid" : "form-control";

  return [fieldClsses];
};

export default useFormStyle;
