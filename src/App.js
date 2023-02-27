import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css';

const segmentSchemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" }
];

const SaveSegmentPopup = ({ onSave }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [showAddSchema, setShowAddSchema] = useState(false);
  const [modalShow, setModalShow] = useState(false);


  const handleSchemaSelect = (event) => {
    const selectedSchema = segmentSchemaOptions.find(
      (option) => option.value === event.target.value
    );
    setSelectedSchemas((prevSelectedSchemas) => [
      ...prevSelectedSchemas,
      selectedSchema
    ]);
    event.target.value = "";
  };

  const handleSchemaRemove = (schemaToRemove) => {
    setSelectedSchemas((prevSelectedSchemas) =>
      prevSelectedSchemas.filter((schema) => schema !== schemaToRemove)
    );
  };

  const handleSegmentSave = () => {
    onSave({ segmentName, selectedSchemas });
    setSegmentName("");
    setSelectedSchemas([]);
  };

  const handleCancel = () => {
    setSegmentName("");
    setSelectedSchemas([]);
  };

  return (
    <div className="container">
      <Button  style={{ textAlign: "center" }} variant="info" onClick={() => setModalShow(true)}>Save segment</Button>
      {modalShow && (

<Modal
  size="lg"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  show={modalShow}
  onHide={() => setModalShow(false)}>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Saving Segment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="col">
          <label className="form-label">
            Segment name:
            <input
            className="form-control"
              type="text"
              value={segmentName}
              onChange={(event) => setSegmentName(event.target.value)}
            />
          </label>
          </div>

        <div className="col">
          <label className="form-label">
            Add schema to segment:
          </label>

            <select className="form-control" onChange={handleSchemaSelect}>
              <option value="">Select a schema</option>
              {segmentSchemaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            </div>

            {selectedSchemas.length > 0 && (
              <div style={{ border: "1px solid blue", padding: "10px", marginTop: "10px"}}>
                {selectedSchemas.map((schema) => (
                  <div key={schema.value}>
                    {schema.label}
                    <img width="10px" height="10px" style={{ marginLeft: "8px" }}  onClick={() => handleSchemaRemove(schema)} src="data:image/png;base64,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"></img>
                  </div>
                ))}
              </div>
            )}
            <label className="form-label">
            <a href="#" onClick={() => setShowAddSchema(true)}>
              + Add new schema
            </a></label>
            {showAddSchema && (
              <div style={{ display: "flex" }}>
                <select className="form-control"  style={{ marginRight: "8px" }} onChange={handleSchemaSelect}>
                  <option value="">Select a schema</option>
                  {segmentSchemaOptions
                    .filter(
                      (option) =>
                        !selectedSchemas.some(
                          (selectedSchema) =>
                            selectedSchema.value === option.value
                        )
                    )
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <Button variant="info" onClick={() => setShowAddSchema(false)}>Add</Button>
              
          
          </div>
            )
                    }
        
        </Modal.Body>
        <Modal.Footer>
          
        <Button  variant="danger" onClick={handleCancel}>Cancel</Button>
        <Button variant="success" onClick={handleSegmentSave}>Save</Button>

        </Modal.Footer>
        </Modal>
      )}
    </div>
    

    
  );
};

const App = () => {
  const handleSegmentSave = (data) => {
    console.log(data);
    // Send data to server here
  };

  return <SaveSegmentPopup onSave={handleSegmentSave} />;
};

export default App
