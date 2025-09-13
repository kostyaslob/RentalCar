import css from "./CarDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCarById } from "../../redux/operations";
import { Loader } from "../Loader/Loader";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CarDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { car, loading } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (loading) return <Loader />;
  if (!car) return null;

  const BookingSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    date: Yup.date().required("Required"),
    comment: Yup.string(),
  });

  return (
    <div className={css.detailsContainer}>
      <div className={css.leftWrapper}>
        <img
          className={css.carImage}
          src={car.img}
          alt={`${car.brand} ${car.model}`}
        />

        <Formik
          initialValues={{
            name: "",
            email: "",
            date: "",
            comment: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Booking:", values);
            alert("Booking submitted!");
            resetForm();
          }}
        >
          
        </Formik>
      </div>
    </div>
  );
}
