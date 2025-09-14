import css from "./CarDetails.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import { fetchCarById } from "../../redux/operations";
import { Loader } from "../Loader/Loader";

registerLocale("en-GB", enGB);

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
            date: null,
            comment: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={(values, { resetForm }) => {
            const formattedDate = values.date
              ? values.date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "";
            toast.success(`Booking confirmed on ${formattedDate}!`);
            resetForm();
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className={css.form}>
              <h3>Book your car now</h3>
              <p>Stay connected! We are always ready to help you.</p>
              <div className={css.formDiv}>
                <Field className={css.field} name="name" placeholder="Name*" />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.formDiv}>
                <Field
                  className={css.field}
                  name="email"
                  type="email"
                  placeholder="Email*"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.formDiv}>
                <DatePicker
                  selected={values.date}
                  onChange={(value) => setFieldValue("date", value)}
                  placeholderText="Booking date"
                  dateFormat="dd.MM.yyyy"
                  minDate={new Date()}
                  locale="en-GB"
                  className={css.datePicker}
                />
                <ErrorMessage
                  name="date"
                  component="span"
                  className={css.error}
                />
              </div>
              <div className={css.formDiv}>
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Comment"
                  rows="3"
                  className={css.field}
                />
              </div>
              <div className={css.fieldSendBtn}>
                <button className={css.submitBtn} type="submit">
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className={css.rightWrapper}>
        <div className={css.carInfoCont}>
          <div className={css.carInfo}>
            <h3>
              {car.brand} {car.model}, {car.year}
            </h3>
            <span>Id: {car.id.slice(0, 4)}</span>
          </div>
          <div className={css.carDescr}>
            <div className={css.location}>
              <svg width="16" height="16">
                <use href="/sprite.svg#icon-location"></use>
              </svg>
              <span>
                {car.address.split(",")[1]}, {car.address.split(",")[2]}
              </span>
              <span className={css.mileage}>Mileage: {car.mileage} km</span>
            </div>
            <span className={css.price}>${car.rentalPrice}</span>
            <p>{car.description}</p>
          </div>
        </div>

        <div className={css.carInfoWrapper}>
          <div className={css.conditionCont}>
            <p>Rental Conditions: </p>
            <ul>
              {car.rentalConditions.map((cond, i) => (
                <li key={i}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={css.specCont}>
            <p>Car Specifications:</p>
            <ul>
              <li>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-calendar"></use>
                </svg>
                <span>Year: {car.year}</span>
              </li>
              <li>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-car"></use>
                </svg>
                <span>Type: {car.type}</span>
              </li>
              <li>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-fuel"></use>
                </svg>
                <span>Fuel Consumption: {car.fuelConsumption}</span>
              </li>
              <li>
                <svg width="16" height="16">
                  <use href="/sprite.svg#icon-gear"></use>
                </svg>
                <span>Engine Size: {car.engineSize}</span>
              </li>
            </ul>
          </div>
          <div className={css.funcCont}>
            <p>Accessories and functionalities:</p>
            <ul>
              {car.accessories.map((cond, i) => (
                <li key={i}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  <span>{cond}</span>
                </li>
              ))}
              {car.functionalities.map((cond, i) => (
                <li key={i}>
                  <svg width="16" height="16">
                    <use href="/sprite.svg#icon-check-circle"></use>
                  </svg>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
