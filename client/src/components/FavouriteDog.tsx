import React from "react";
import DogOne from "../assets/dog1.jpg";

const FavouriteDog = () => {
  return (
    <section id="favourite">
      <h1 className="header__title">
        <span className="pink">Favourite</span> Dogs
      </h1>

      <div className="dog__fav">
        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>

        <figure className="dog__fav--wrapper">
          <img src={DogOne} alt="" className="dog__img dog__fav--img" />
        </figure>
      </div>
    </section>
  );
};

export default FavouriteDog;
