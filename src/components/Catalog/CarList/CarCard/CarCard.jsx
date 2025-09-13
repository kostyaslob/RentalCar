import css from "./CarCard.module.css";
import { Link } from "react-router-dom";

export default function CarCard({ car }) {
  return (
    <div className={css.carCard}>
      <div className={css.carImageCont}>
        <img
          className={css.carImg}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />
        <button className={css.favBtn}>❤</button>
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
