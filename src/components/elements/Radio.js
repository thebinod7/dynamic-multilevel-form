import React, { useContext } from 'react';
import { FormContext } from '../../FormContext';

const Radio = ({
  field_id,
  field_label,
  field_placeholder,
  parentID,
  field_value,
  id,
}) => {
  const { handleChange } = useContext(FormContext);
  return (
    <div className="mb-3">
      <p>{field_label}</p>
      <label class="radio-inline">
        <input
          onChange={(event) =>
            handleChange(field_id, event, { flow: 'Yes', uid: id, parentID })
          }
          type="radio"
          name="optradio"
        />
        Yes
      </label>
      <label class="radio-inline">
        <input
          onChange={(event) =>
            handleChange(field_id, event, { flow: 'No', uid: id, parentID })
          }
          type="radio"
          name="optradio"
        />
        No
      </label>
    </div>
  );
};

export default Radio;
