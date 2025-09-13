import css from "./CarCard.module.css";

export default function CarCard({ car }) {
  return (
    <div>
      <img
        className={css.carImg}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
      />
      <div className={css.carDescr}>
        <p>{car.brand}</p>
        <p>{car.model}</p>
        <p>{car.year}</p>
        <p>{car.rentalPrice}</p>
        <p>{car.address}</p>
        <p>{car.rentalCompany}</p>
        <p>{car.type}</p>
        <p>{car.mileage} km</p>
      </div>
      <button className={css.carButton}>Read more</button>
    </div>
  );
}
