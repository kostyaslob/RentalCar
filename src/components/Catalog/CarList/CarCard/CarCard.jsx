import css from "./CarCard.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorites } from "../../../../redux/favoritesSlice";

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.includes(car.id);


  return (
    <div className={css.carCard}>
      <div className={css.carImageCont}>
        <img
          className={css.carImg}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
        <button
          className={css.favBtn}
          onClick={() => dispatch(toggleFavorites(car.id))}
        >
          <svg
            width="16"
            height="15"
            className={isFavorite ? css.favIconActive : css.favIconDef}
          >
            <use
              href={`/sprite.svg#${
                isFavorite ? "icon-heart-active" : "icon-heart-default"
              }`}
            ></use>
          </svg>
        </button>
      </div>
      <div className={css.carInfoCont}>
        <div className={css.carInfo}>
          <h3>
            {car.brand} <span className={css.model}>{car.model}</span>,{" "}
            {car.year}
          </h3>
          <span className={css.price}>${car.rentalPrice}</span>
        </div>
        <div className={css.carDescr}>
          <div>
            <span>{car.address.split(",")[1]}</span>
            <span>{car.address.split(",")[2]}</span>
            <span>{car.rentalCompany}</span>
          </div>
          <div>
            <span>{car.type}</span>
            <span>{car.mileage.toLocaleString()} km</span>
          </div>
        </div>
      </div>

      <Link className={css.readMoreBtn} to={`/catalog/${car.id}`}>
        Read more
      </Link>
    </div>
  );
}
