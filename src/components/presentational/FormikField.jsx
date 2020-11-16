import React from 'react';

import { Field, ErrorMessage } from 'formik';
import TextField from '@material-ui/core/TextField';

export default function FormikField({
  required = false,
  id,
  label,
  name,
  type = 'text',
  error,
  InputProps = {},
  multiline = false,
  rows = 0,
  variant = 'standard',
}) {
  return (
    <Field
      autoComplete="off"
      required={required}
      id={id}
      as={TextField}
      label={label}
      name={name}
      fullWidth
      type={type}
      error={error}
      helperText={<ErrorMessage name={name} />}
      InputProps={InputProps}
      multiline={multiline}
      rows={rows}
      variant={variant}
    />
  );
}
