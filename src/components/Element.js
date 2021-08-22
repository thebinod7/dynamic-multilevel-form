import React from 'react';
import Checkbox from './elements/Checkbox';
import Input from './elements/Input';
import Select from './elements/Select';
import Radio from './elements/Radio';

const Element = ({
  field: {
    field_type,
    field_id,
    field_label,
    field_placeholder,
    field_value,
    field_options,
    parentID,
    id,
  },
}) => {
  switch (field_type) {
    case 'text':
      return (
        <Input
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
        />
      );

    case 'yes_no':
      return (
        <Radio
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          parentID={parentID}
          id={id}
        />
      );

    case 'select':
      return (
        <Select
          field_id={field_id}
          field_label={field_label}
          field_placeholder={field_placeholder}
          field_value={field_value}
          field_options={field_options}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          field_id={field_id}
          field_label={field_label}
          field_value={field_value}
        />
      );

    default:
      return null;
  }
};

export default Element;
