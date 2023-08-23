import React, { useState, useEffect } from "react";
import "./form.css"; // Import the CSS file for styling
import axios from "axios";

const FormComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.10.141:8080/todo/category")
      .then((response) => {
        setCategory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleInput1Change = (e) => {
    setName(e.target.value);
  };

  const handleInput2Change = (e) => {
    setDescription(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const handleSelectChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = axios.post("http://192.168.10.141:8080/todo/task", {
        title: name,
        description: description,
        status: selectedOption,
        category: { id: selectedOption1 },
      });

      console.log("Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>To do</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={name}
            placeholder="Title"
            onChange={handleInput1Change}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={handleInput2Change}
            rows={3} // Specify the number of rows (lines)
            style={{ resize: "vertical" }} // Allow vertical resizing
          />
        </div>
        <div className="form-group select-group">
          <label>Status</label>
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="" disabled>
              Select a Status
            </option>
            <option value="TODO">TODO</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </select>
          <label>Category</label>
          <select value={selectedOption1} onChange={handleSelectChange1}>
            <option value="" disabled>
              Select a Category
            </option>
            {category.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
            <option value="">Add Category</option>
          </select>
        </div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
