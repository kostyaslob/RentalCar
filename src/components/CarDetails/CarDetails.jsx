// import css from "./CarDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/operations";
import { Loader } from "../Loader/Loader";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  
  return (
    <div>
      <h1>
        {car.brand} {car.model}
      </h1>
      <img src={car.img} alt={`${car.brand} ${car.model}`} />
    </div>
  );
}
