import css from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchBrands } from "../../../redux/operations";
import { setFilters } from "../../../redux/slice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { brands } = useSelector((state) => state.cars);

  const [selectedBrands, setSelectedBrands] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const priceOptions = [30, 40, 50, 60, 70, 80].map((val) => ({
    value: val,
    label: `To $${val}`,
  }));

  const brandsOptions = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      setFilters({
        brand: selectedBrands?.value === "All cars" ? "" : selectedBrands?.value || "",
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

      <button type="submit" className={css.searchBtn}>
        Search
      </button>
    </form>
  );
}
