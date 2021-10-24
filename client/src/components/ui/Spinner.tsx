import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Spinner = () => {
  return (
    <div className="dog__img--loading">
      <FontAwesomeIcon icon={faSpinner} className="spinner" />
    </div>
  );
};

export default Spinner;
