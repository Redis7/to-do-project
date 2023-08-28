import React, { useState, useEffect } from "react";
import "./form.css"; 
import axios from "axios";


const FormComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOption1, setSelectedOption1] = useState("");
  const [category, setCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


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
  const saveCategory = async () => {
    try {
     
      const response = await axios.post("http://192.168.10.141:8080/todo/category", {
        name: name,
      });

      console.log("Category saved:", response.data);
      closeModal(); 
      window.location.reload();
    } catch (error) {
      console.error("Error saving category:", error);
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
            rows={3} 
            style={{ resize: "vertical" }} 
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
  <div style={{ display: 'flex', alignItems: 'center', flexDirection:'row-reverse'}}>
    <button
      type="button"
      onClick={openModal}
      style={{
        marginRight: '10px', 
        padding: '4px 8px', 
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        height:'35px'
        
      }}
    >
      Add
    </button>
    <select value={selectedOption1} onChange={handleSelectChange1}>
      <option value="" disabled>
        Select a Category
      </option>
      {category.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
</div>
        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
       {isModalOpen && (
        <div className="modal5">
          <div className="modal-content5">
            <h2>Add Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={handleInput1Change}
            />
            <div style={{ marginTop: '20px', marginBottom:'20px', display: 'flex', gap: '10px' ,justifyContent: 'center'}}>
  <button
    onClick={closeModal}
    style={{
      padding: '8px 20px',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Cancel
  </button>
  <button
    onClick={saveCategory}
    style={{
      padding: '8px 20px',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
    }}
  >
    Save
  </button>
</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormComponent;



