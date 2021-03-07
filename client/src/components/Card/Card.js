import React from "react";
import "./Card.scss";
import PersonIcon from "@material-ui/icons/Person";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";

function Card(props) {
  const milliseconds = props.card.createdAt;
  const colors = [
    "pink",
    "PaleGreen",
    "LightBlue",
    "aquamarine",
    "Thistle",
    "Moccasin",
  ];
  const randomIndex = Math.floor(Math.random() * 6);
  return (
    <div
      className="card"
      style={{
        border: `1px solid ${colors[randomIndex]}`,
      }}
    >
      <div className="userInfo">
        <PersonIcon />
        <p>{props.card.user.fullName}</p>
      </div>
      <div className="statusContent">
        {props.card.text ? (
          <p
            className="statusText"
            style={{
              backgroundColor: `${colors[randomIndex]}`,
            }}
          >
            {props.card.text}
          </p>
        ) : (
          <img src={props.card.imageUrl} alt="restaurantPicture" />
        )}
        <p className="time">
          {new Date(parseInt(milliseconds))
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5)}
        </p>
      </div>
      <div className="reactions">
        <div className="like">
          <ThumbUpIcon />
          <p>{props.card.likes}</p>
        </div>
        <div className="love">
          <FavoriteIcon />
          <p>{props.card.favs}</p>
        </div>
        <div className="share">
          <ShareIcon />
          <p>{props.card.shares}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
