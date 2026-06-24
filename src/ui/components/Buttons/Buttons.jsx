import "./Buttons.css";

export const PrimaryButton = ({onClick, text, disabled}) => {
  return (
    <>
      <button className="u-primary-btn" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
}