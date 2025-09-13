import css from "./Catalog.module.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../redux/operations.js";
import { setPage } from "../../redux/slice.js";
import { Loader } from "../Loader/Loader";

import SearchBar from "./SearchBar/SearchBar";
import CarList from "./CarList/CarList";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

export default function Catalog() {
  const dispatch = useDispatch();
  const { items, loading, page, limit, filters, totalPages } = useSelector(
    (state) => state.cars
  );

  const hasMore = page < totalPages;

  useEffect(() => {
    dispatch(fetchCars({ page: 1, limit, filters }));
  }, [dispatch, filters]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(setPage(nextPage));
    dispatch(fetchCars({ page: nextPage, limit, filters }));
  };

  return (
    <div className={css.catalogWrapper}>
      <div className={css.catalogContainer}>
        <SearchBar />
        <CarList cars={items} loading={loading && page === 1} />
        {hasMore > 0 && (
          <div className={css.fieldLodeMore}>
            <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />
            {loading && page > 1 && <Loader />}
          </div>
        )}
      </div>
    </div>
  );
}
