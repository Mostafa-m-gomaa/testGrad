import { useContext } from "react";
import { AppContext } from "../App";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";

const ThemeChanger = () => {
  const { setTheme, theme } = useContext(AppContext);
  return (
    <button
      className="
    border border-gray flex items-center justify-center w-10 h-10 rounded-full text-2xl"
      onClick={() => {
        if (theme === "dark") {
          setTheme("light");
          localStorage.setItem("theme", "light");
          document.querySelector("html").setAttribute("data-theme", "light");
        } else {
          setTheme("dark");
          localStorage.setItem("theme", "dark");
          document.querySelector("html").setAttribute("data-theme", "dark");
        }
      }}
    >
      {theme === "light" ? (
        <>
          <FaMoon />
        </>
      ) : (
        <>
          <FaSun />
        </>
      )}
    </button>
  );
};

export default ThemeChanger;
