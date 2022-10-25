import { useNavigate } from "react-router-dom";

export default function CreateGuest() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Add a guest</h2>
      <form>
        <label>Name: </label>
        <input type="text" />
        <button>Submit</button>
        <button onClick={() => navigate("/home")}>Back</button>
      </form>
    </>
  );
}
