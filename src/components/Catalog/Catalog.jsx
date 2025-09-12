import css from "./Catalog.module.css";
import SearchBar from "./SearchBar/SearchBar";
import CarList from "./CarList/CarList";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

export default function Catalog() {
  return (
    <div className={css.catalogWrapper}>
      <div className={css.catalogContainer}>
        <SearchBar />
        <CarList />
        <LoadMoreBtn />
      </div>
    </div>
  );
}
