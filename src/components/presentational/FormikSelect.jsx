import React from 'react';

import { Field, ErrorMessage } from 'formik';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';

import MenuItem from '@material-ui/core/MenuItem';

const MaterialUISelectField = ({
  error,
  errorString,
  label,
  children,
  value,
  name,
  onChange,
  onBlur,
}) => (
  <FormControl fullWidth error={error}>
    <InputLabel>{label}</InputLabel>
    <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
      {children}
    </Select>
    <FormHelperText>{errorString}</FormHelperText>
  </FormControl>
);

export default function FormikSelect({
  name, error, items, label,
}) {
  return (
    <Field
      name={name}
      as={MaterialUISelectField}
      label={label}
      error={error}
      errorString={<ErrorMessage name={name} />}
    >
      {items.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Field>
  );
}
