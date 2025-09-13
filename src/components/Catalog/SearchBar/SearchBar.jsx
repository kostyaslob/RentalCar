import css from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchBrands } from "../../../redux/operations";
import { setFilters } from "../../../redux/slice";
import { Loader } from "../../Loader/Loader";
import toast from "react-hot-toast";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { brands, items, loading } = useSelector((state) => state.cars);

  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (!loading && items.length === 0 && searchTriggered) {
      toast.error("No cars found for your search");
      setSearchTriggered(false);
    }
  }, [loading, items, searchTriggered]);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const priceOptions = [30, 40, 50, 60, 70, 80, 90, 100].map((val) => ({
    value: val,
    label: val,
  }));

  const brandsOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTriggered(true);
    dispatch(
      setFilters({
        brand:
          selectedBrands?.value === "All cars"
            ? ""
            : selectedBrands?.value || "",
        rentalPrice: selectedPrice?.value || "",
        minMileage: minMileage || "",
        maxMileage: maxMileage || "",
      })
    );

    setSelectedBrands(null);
    setSelectedPrice(null);
    setMinMileage("");
    setMaxMileage("");
  };

  return (
    <form className={css.searchBar} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label htmlFor="brand">Car brand</label>
        <Select
          id="brand"
          options={brandsOptions}
          value={selectedBrands}
          onChange={setSelectedBrands}
          placeholder="Choose a brand"
          classNamePrefix="react-select"
        />
      </div>
      <div className={css.field}>
        <label htmlFor="price">Price / 1 hour</label>
        <Select
          id="price"
          options={priceOptions}
          value={selectedPrice}
          onChange={setSelectedPrice}
          placeholder="Choose a price"
          classNamePrefix="react-select"
          getOptionLabel={(option) => option.label}
          formatOptionLabel={(option, { context }) =>
            context === "value" ? `To $${option.label}` : option.label
          }
        />
      </div>
      <div className={css.field}>
        <label>Car mileage / km</label>
        <div className={css.mileage}>
          <input
            type="number"
            value={minMileage}
            onChange={(event) => setMinMileage(event.target.value)}
            placeholder="From"
          />
          <input
            type="number"
            value={maxMileage}
            onChange={(event) => setMaxMileage(event.target.value)}
            placeholder="To"
          />
        </div>
      </div>

      <div className={css.fieldBtn}>
        <button type="submit" className={css.searchBtn} disabled={loading}>
          Search
        </button>
        {loading && <Loader />}
      </div>
    </form>
  );
}
