import css from "./SearchBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import { fetchBrands } from "../../../redux/operations";
import { setFilters } from "../../../redux/slice";
import { Loader } from "../../Loader/Loader";
import toast from "react-hot-toast";

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <svg width="16" height="16">
      <use href="/sprite.svg#icon-chevron-down"></use>
    </svg>
  </components.DropdownIndicator>
);

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

  const formatNumber = (value) => {
    if (!value) return "";
    const numericValue = value.toString().replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTriggered(true);

    const cleanNumber = (value) => (value ? value.replace(/\s/g, "") : "");

    dispatch(
      setFilters({
        brand:
          selectedBrands?.value === "All cars"
            ? ""
            : selectedBrands?.value || "",
        rentalPrice: selectedPrice?.value || "",
        minMileage: cleanNumber(minMileage) || "",
        maxMileage: cleanNumber(maxMileage) || "",
      })
    );

    setSelectedBrands(null);
    setSelectedPrice(null);
    setMinMileage("");
    setMaxMileage("");
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: "204px",
      borderRadius: "12px",
    }),
    menu: (provided) => ({
      ...provided,
      border: "1px solid #f7f7f7",
      borderRadius: "12px",
      width: "204px",
      height: "272px",
      boxShadow: "0 4px 36px 0 rgba(0, 0, 0, 0.02)",
      background: "#fff",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: "272px",
    }),
    option: (provided, state) => ({
      ...provided,
      fontFamily: `"Manrope", sans-serif`,
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "125%",
      color: state.isSelected ? "#000000" : "#8d929a",
      backgroundColor: state.isSelected
        ? "#fff"
        : state.isFocused
        ? "#f5f5f5"
        : "#fff",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#000000",
      fontFamily: `"Manrope", sans-serif`,
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: "125%",
    }),
  };

  return (
    <form className={css.searchBar} onSubmit={handleSubmit}>
      <div className={css.field}>
        <label htmlFor="brand">Car brand</label>
        <Select
          id="brand"
          options={brandsOptions}
          components={{ DropdownIndicator }}
          value={selectedBrands}
          onChange={setSelectedBrands}
          placeholder="Choose a brand"
          classNamePrefix="react-select"
          styles={customSelectStyles}
        />
      </div>
      <div className={css.field}>
        <label htmlFor="price">Price / 1 hour</label>
        <Select
          id="price"
          options={priceOptions}
          components={{ DropdownIndicator }}
          value={selectedPrice}
          onChange={setSelectedPrice}
          placeholder="Choose a price"
          classNamePrefix="react-select"
          styles={customSelectStyles}
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
            type="text"
            value={minMileage}
            onChange={(event) =>
              setMinMileage(formatNumber(event.target.value))
            }
            placeholder="From"
          />
          <input
            type="text"
            value={maxMileage}
            onChange={(event) =>
              setMaxMileage(formatNumber(event.target.value))
            }
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
