import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/card";
import "./cardHolder.css";
import photo from "../../assets/7706458.webp";
import EditCardModal from "../modal/modal";

const CardHolder = ({ selectedTab }) => {
  const [cardsData, setCardsData] = useState([]);
  const [editedCard, setEditedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    axios
      .get(`http://192.168.10.141:8080/todo/task/${selectedTab}`)
      .then((response) => {
        setCardsData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedTab]);

  const handleEdit = (card) => {
    setEditedCard(card);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedCard) => {
    try {
      await axios.post(
        "http://192.168.10.141:8080/todo/task",
        updatedCard
      );

      // Update cardsData with updated card values
      const updatedCardsData = cardsData.map((card) =>
        card.id === updatedCard.id ? updatedCard : card
      );
      setCardsData(updatedCardsData);
    } catch (error) {
      console.error("Error saving card:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditedCard(null);
  };


  return (
    <div>
      <div className="text-header">
        {selectedTab === "TODO"
          ? "My TO DO List"
          : selectedTab === "DOING"
          ? "My DOING List"
          : selectedTab === "DONE"
          ? "My DONE List"
          : "My To Do List"}{" "}
      </div>

      {cardsData.length === 0 ? (
        <div className="no-data-container">
          <img src={photo} alt="No data available" />
          <p>No data available for this tab.</p>
        </div>
      ) : (
        <div className="card-holder">
          {cardsData.map((card) => (
            <Card
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              status={card.status}
              category={card.category.name}
              hasRedBg={card.status === "TODO"}
              hasBlueBg={card.status === "DOING"}
              hasGreenBg={card.status === "DONE"}
              onEdit={() => handleEdit(card)}
            />
          ))}
          <EditCardModal
        isOpen={isModalOpen}
        card={editedCard}
        onSave={handleSave}
        onClose={handleCloseModal}
      />
        </div>
      )}
    </div>
  );
};

export default CardHolder;
