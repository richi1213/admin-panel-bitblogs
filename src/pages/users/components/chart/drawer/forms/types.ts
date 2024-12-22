export type EditableFormFieldProps = {
  fieldName: string;
  initialValue: string | undefined;
  onSubmit: (fieldName: string, value: string) => void;
};
