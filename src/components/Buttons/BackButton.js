import backIcon from "../../assets/icons/arrow-left-circle.svg";

export default function BackButton({ handleClick }) {
  return (
    <button type="button" onClick={handleClick}>
      <img src={backIcon} alt="go back arrow" />
    </button>
  );
}
