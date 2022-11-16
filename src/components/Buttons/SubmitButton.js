import checkIcon from "../../assets/icons/ph_check-circle.svg";

export default function SubmitButton({ type = "submit", handleClick }) {
  return (
    <button type={type} onClick={() => handleClick()}>
      <img src={checkIcon} alt="submit" />
    </button>
  );
}
