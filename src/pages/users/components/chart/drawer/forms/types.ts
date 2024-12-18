export type EditableFormFieldProps = {
  fieldName: string;
  initialValue: string;
  onSubmit: (fieldName: string, value: string) => void;
};
