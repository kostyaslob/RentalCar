import css from "./CarList.module.css";
import CarCard from "./CarCard/CarCard";

export default function CarList({cars}) {
  return (
    <ul className={css.carsList}>
      {cars.map((car) => (
        <li className={css.carItem} key={car.id}>
          <CarCard car={car} />
        </li>        
      ))}
    </ul>
  )
}
