import backIcon from "../assets/icons/arrow-left-circle.svg";
import checkIcon from "../assets/icons/ph_check-circle.svg";

export default function BasicButton({ description, handleClick }) {
  return (
    <button
      type={description === "submit" ? "submit" : "button"}
      onClick={handleClick}
    >
      {description === "submit" && <img src={checkIcon} alt="submit" />}
      {description === "back" && <img src={backIcon} alt="go back arrow" />}
    </button>
  );
}
