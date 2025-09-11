import css from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <main className={css.container}>
        <Outlet />
      </main>
    </>
  );
}
