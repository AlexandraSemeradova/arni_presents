import "./Buttons.css";

export const PrimaryButton = ({onClick, text, disabled}) => {
  return (
    <>
      <button className="u-btn u-primary-btn" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
}

export const SecondaryButton = ({onClick, text, disabled}) => {
  return (
    <>
      <button className="u-btn u-secondary-btn" onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
}