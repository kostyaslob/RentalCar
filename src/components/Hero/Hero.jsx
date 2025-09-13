import css from "./Hero.module.css";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className={css.heroWrapper}>
      <div className={css.heroContainer}>
        <h1 className={css.heroTitle}>Find your perfect rental car</h1>
        <h2 className={css.heroSubTitle}>
          Reliable and budget-friendly rentals for any journey
        </h2>
        <Link className={css.viewCatalogBtn} to="/catalog">View Catalog</Link>
      </div>
    </div>
  );
}
