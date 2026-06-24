import ErrorMessageIlustration from "../../../assets/images/error_ilustration.png";
import "./ErrorMessages.css";

const ErrorMessageModal = () => {
   return (
    <div className="u-error-msg-modal">
        <figure>
            <img
                src={ErrorMessageIlustration}
                alt="Error illustration"
                className="u-error-img"
            />
        </figure>
      <h1>Oops.</h1>
      <p>Služba je momentálne nedostupná.</p>
      <p>Pracujeme na jej opätovnom sprístupnení.</p>
    </div>
  );
}

export default ErrorMessageModal;