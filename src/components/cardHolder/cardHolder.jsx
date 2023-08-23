import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../card/card";
import "./cardHolder.css";

const CardHolder = () => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.10.141:8080/todo/task")
      .then((response) => {
        setCardsData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div className="text-header">My to do list</div>
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
          />
        ))}
      </div>
    </div>
  );
};

export default CardHolder;
