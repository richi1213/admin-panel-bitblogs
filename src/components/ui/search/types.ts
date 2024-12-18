import { InputHTMLAttributes } from 'react';

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export type FormValues = {
  searchText: string;
  className?: string;
};
