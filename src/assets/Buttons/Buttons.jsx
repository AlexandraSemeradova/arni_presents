import './Buttons.css';

export const PrimaryButton = ({onClick, text, disabled}) => {
  return (
    <>
      <button className='primary-btn' onClick={onClick} disabled={disabled}>
        {text}
      </button>
    </>
  );
}

