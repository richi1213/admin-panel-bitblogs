export const handleUserFieldSubmit = (
  fieldName: string,
  value: string,
  updateFunctions: {
    updateEmail: (value: string) => void;
    updateFullNameEn: (value: string) => void;
    updateFullNameKa: (value: string) => void;
    updateUsername: (value: string) => void;
  },
) => {
  switch (fieldName) {
    case 'email':
      updateFunctions.updateEmail(value);
      break;
    case 'fullNameEn':
      updateFunctions.updateFullNameEn(value);
      break;
    case 'fullNameKa':
      updateFunctions.updateFullNameKa(value);
      break;
    case 'userName':
      updateFunctions.updateUsername(value);
      break;
    default:
      break;
  }
};
