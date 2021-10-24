import React from "react";
import Spinner from "./Spinner";

interface Props {
  currentDog: string;
  loading: boolean;
}

const Picture: React.FC<Props> = ({ currentDog, loading }) => {
  return (
    <div className="dog__img--wrapper">
      {/* If we're not loading then show the dog, otherwise show the spinner animation */}
      {!loading ? (
        <img src={currentDog} alt="" className="dog__img dog__main" />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Picture;
