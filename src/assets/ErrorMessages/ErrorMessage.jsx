import ErrorMessageIlustration from '../../images/error_ilustration.png';
import './ErrorMessages.css'

const ErrorMessage = () => {
   return (
    <div className="u-error-msg">
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


export default ErrorMessage;
