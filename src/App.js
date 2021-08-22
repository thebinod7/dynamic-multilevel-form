import formJSON from './formElement.json';
import sampleJSON from './sampleData.json';

import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

// Only root level questions
const filteredSample = sampleJSON.filter((f) => f.parentID === 'root');

function App() {
  const [elements, setElements] = useState(null);

  const [formFields, setFormFields] = useState(filteredSample);

  useEffect(() => {
    setElements(formJSON[0]);
  }, []);

  const { fields, page_label } = elements ?? {};

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // UID == Clicked item id
  const fetchIDsToRemove = (uid) => {
    let result = [];
    //Reset all child elements
    const found_root = formFields.find((f) => f.id === uid);

    // Fetch items where root id is in parentID i.e. Find all the childs
    const child_elements = formFields.filter(
      (f) => f.parentID === found_root.id
    );

    if (child_elements.length) {
      for (let item of child_elements) {
        const found = formFields.find((f) => f.parentID === item.id);
        //If child is in render fields list, Remove
        if (found) {
          result.push(found.id);
        }
      }
    }
    return result;
  };

  const fetchAndMergeFields = ({ flow, uid, parentID }) => {
    let remove_ids = [];
    // If selected field has no parent i.e. is a root.
    if (parentID === 'root') remove_ids = fetchIDsToRemove(uid);

    const fetchedFields = sampleJSON.filter(
      (f) => f.parentID === uid && f.controlFlow === flow
    );

    // Remove if parentID matches with clicked itme id
    const sanitized_data = formFields.filter((f) => f.parentID !== uid);
    let merged_fields = [...sanitized_data, ...fetchedFields];

    if (remove_ids.length) {
      for (let id of remove_ids) {
        merged_fields = merged_fields.filter((f) => f.id !== id);
      }
    }
    // Finally set to state
    setFormFields(merged_fields);
  };

  const handleChange = (id, event, options) => {
    const { flow, uid, parentID } = options;
    fetchAndMergeFields({ flow, uid, parentID });

    const newElements = { ...elements };
    newElements.fields.forEach((field) => {
      const { field_type, field_id } = field;
      if (id === field_id) {
        switch (field_type) {
          case 'checkbox':
            field['field_value'] = event.target.checked;
            break;

          default:
            field['field_value'] = event.target.value;
            break;
        }
      }
      setElements(newElements);
    });
  };

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h3 style={{ padding: 15 }}>{page_label}</h3>
        <form style={{ display: 'none' }}>
          {fields
            ? fields.map((field, i) => <Element key={i} field={field} />)
            : null}
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </button>
        </form>

        {/* ===SAMPLE QUESTIONS=== */}
        <div id="sample-questions" style={{ padding: 30 }}>
          {formFields.map((field, i) => (
            <Element key={i + 20} field={field} />
          ))}
        </div>
        {/* ===END SAMPLE QUESTIONS=== */}
      </div>
    </FormContext.Provider>
  );
}

export default App;
