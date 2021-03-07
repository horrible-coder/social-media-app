import { useQuery } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React from "react";
import { getCardsQuery } from "../../queries/queries";
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import "./Home.scss";
import Loader from "../../assets/loader.gif";

function Home() {
  const { loading, data } = useQuery(getCardsQuery);
  return (
    <div className="home">
      <Navbar />
      <div className="cardsContainer">
        {loading ? (
          <img src={Loader} alt="loader" id="loader" />
        ) : (
          <>
            {data.cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default graphql(getCardsQuery)(Home);
