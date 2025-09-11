import css from "./Catalog.module.css";

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
