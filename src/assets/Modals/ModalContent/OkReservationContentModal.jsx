import { PrimaryButton } from "../../Buttons/Buttons";
import { OkIcon } from "../../Icons/Icons";

const OkRezervationContentModal = ({onClose}) => {
  return (
    <>
      <OkIcon specialClass={'modal-ok'}/>
      <div>
        <h2 className="bold">Rezervácia prebehla úspešne</h2>
        <p>Na tvoj email prave prišli podrobné inštrukcie k rezervácii.</p>
      </div>
      <PrimaryButton  text={"Návrat na zoznam"} onClick={onClose}/>
    </>
  );
}

export default OkRezervationContentModal;
