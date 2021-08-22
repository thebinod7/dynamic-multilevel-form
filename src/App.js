import formJSON from './formElement.json';
import sampleJSON from './sampleData.json';

import { useState, useEffect } from 'react';
import Element from './components/Element';
import { FormContext } from './FormContext';

const filteredSample = sampleJSON.filter((f) => f.parentID === null);

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

  const fetchAndMergeFields = (flow, uid) => {
    console.log({ uid });
    const fetchedFields = sampleJSON.filter(
      (f) => f.parentID === uid && f.controlFlow === flow
    );

    const sanitized_data = formFields.filter((f) => f.parentID !== uid);

    const merged_fields = [...sanitized_data, ...fetchedFields];
    setFormFields(merged_fields);
  };

  const handleChange = (id, event, options) => {
    const { flow, uid } = options;
    fetchAndMergeFields(flow, uid);

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

  console.log('=========>', formFields);

  return (
    <FormContext.Provider value={{ handleChange }}>
      <div className="App container">
        <h3>{page_label}</h3>
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
        <div id="sample-questions">
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
