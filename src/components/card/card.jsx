import React from "react";
import "./card.css";
import axios from "axios";

const Card = ({
  id,
  title,
  description,
  status,
  category,
  hasRedBg,
  hasBlueBg,
  hasGreenBg,
}) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://192.168.10.141:8080/todo/task/${id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  let cardClassName = "card";

  if (hasRedBg) {
    cardClassName += " red-border";
  } else if (hasBlueBg) {
    cardClassName += " blue-border";
  } else if (hasGreenBg) {
    cardClassName += " green-border";
  }

  return (
    <div className={cardClassName}>
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <div className="buttons">
          <button className="button1">Edit</button>
          <button className="button2" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="card-values">
        <p className="card-value">Status: {status}</p>
        <p className="card-value">Category: {category}</p>
      </div>
    </div>
  );
};

export default Card;
