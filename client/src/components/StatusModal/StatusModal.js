import { useMutation } from "@apollo/client";
import { graphql } from "@apollo/client/react/hoc";
import React, { useState } from "react";
import Modal from "react-modal";
import { addCardMutation, getCardsQuery } from "../../queries/queries";
import { flowRight as compose } from "lodash";
import "./StatusModal.scss";

Modal.setAppElement("#root");
const LS_PREFIX = "status-share-";

function StatusModal({ show, onHide }) {
  const [imageActive, setImageActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [statusText, setStatusText] = useState("");
  const userId = localStorage.getItem(LS_PREFIX + "id");
  const [addCard] = useMutation(addCardMutation);

  const handleImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleStatusText = (e) => {
    setStatusText(e.target.value);
  };
  const handleSubmit = () => {
    addCard({
      variables: { imageUrl: imageUrl, text: statusText, userId: userId },
      refetchQueries: [{ query: getCardsQuery }],
    });
    setImageUrl("");
    setStatusText("");
    onHide();
  };
  return (
    <div className="statusModal">
      <Modal isOpen={show} onRequestClose={onHide}>
        {!imageActive ? (
          <>
            <input
              type="text"
              value={statusText}
              onChange={handleStatusText}
              placeholder="Text"
              maxLength="100"
            />
            <p>
              Want to add image?{" "}
              <span onClick={() => setImageActive(true)}>Switch to Image</span>
            </p>
          </>
        ) : (
          <>
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrl}
              placeholder="Image URL"
            />
            <p>
              Want to add text?{" "}
              <span onClick={() => setImageActive(false)}>Switch to Text</span>
            </p>
          </>
        )}
        <button onClick={handleSubmit}>Add</button>
      </Modal>
    </div>
  );
}

export default compose(
  graphql(getCardsQuery),
  graphql(addCardMutation)
)(StatusModal);
