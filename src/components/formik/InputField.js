import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rebass/forms';
import Field from './Field';

const InputField = ({
  field,
  form,
  label,
  sublabel,
  helpText,
  labelProps,
  ...otherProps
}) => {
  return (
    <Field
      form={form}
      name={field.name}
      label={label}
      sublabel={sublabel}
      helpText={helpText}
      labelProps={labelProps}
      render={({ hasError }) => (
        <Input
          variant={hasError ? 'invalidInput' : 'input'}
          {...field}
          {...otherProps}
        />
      )}
    />
  );
};

InputField.propTypes = {
  field: PropTypes.object,
  form: PropTypes.object,
  label: PropTypes.string,
  sublabel: PropTypes.string,
  helpText: PropTypes.string,
  labelProps: PropTypes.object,
  submitCount: PropTypes.number
};

export default InputField;
