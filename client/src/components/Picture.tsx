import React from "react";

interface Props {
  currentDog: string;
}

const Picture: React.FC<Props> = ({ currentDog }) => {
  return (
    <div className="dog__img--wrapper">
      <img src={currentDog} alt="" className="dog__img dog__main" />
    </div>
  );
};

export default Picture;
