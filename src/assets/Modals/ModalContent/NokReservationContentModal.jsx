import { TriangleAlertIcon } from "../../Icons/Icons";
import { PrimaryButton } from "../../Buttons/Buttons";

const NokRezervationContentModal = ({onClose}) => {
  return (
    <>
      <TriangleAlertIcon specialClass={'modal-alert'} />
      <div>
        <p>Ľutujem, niečo sa pokazilo.</p>
        <p>Zopakuj svoju voľbu ešte raz.</p>
      </div>
      <PrimaryButton  text={"Zavrieť"} onClick={onClose}/>
    </>
  );
}

export default NokRezervationContentModal;
