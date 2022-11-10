export default function GuestNameInput({ defaultName = null }) {
  return (
    <input
      name="newName"
      id="newName"
      type="text"
      //this pattern prevents users from submiting empty whitespace-filled names (from stackoverflow)
      pattern=".*[^\s]{1,}.*"
      minLength={1}
      maxLength={40}
      defaultValue={defaultName}
      required
    />
  );
}
