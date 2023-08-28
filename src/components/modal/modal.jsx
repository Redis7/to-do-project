import React, { useState,useEffect } from "react";
import "./modal.css"
import axios from "axios";


const EditCardModal = ({ isOpen, card, onSave, onClose }) => {
  const [editedCard, setEditedCard] = useState({ ...card });

  useEffect(() => {
    setEditedCard({ ...card });
  }, [card]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedCard((prevCard) => ({
      ...prevCard,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
    
      const editedCardWithId = {
        ...editedCard,
        id: card.id,
      };

      const response = await axios.post(
        "http://192.168.10.141:8080/todo/task", 
        editedCardWithId
      );

      onSave(response.data); 
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };
  return (
    <div className={`modal ${isOpen ? "open" : "closed"}`}>
      <div className="modal-content">
        <h2>Edit Card</h2>
        <form>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedCard.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={editedCard.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={editedCard.status}
              onChange={handleChange}
            >
              <option value="TODO">TODO</option>
              <option value="DOING">DOING</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
          <div className="button5">
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCardModal;
