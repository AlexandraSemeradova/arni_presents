import { TriangleAlertIcon } from "../../Icons/Icons";
import { PrimaryButton } from "../../Buttons/Buttons";

const NokRezervationContentModal = ({onClose}) => {
  return (
    <>
      <TriangleAlertIcon specialClass={"u-modal-alert"} />
      <div>
        <h4>Ľutujem, niečo sa pokazilo.</h4>
        <p>Zopakuj svoju voľbu ešte raz.</p>
      </div>
      <PrimaryButton  text={"Zavrieť"} onClick={onClose}/>
    </>
  );
}

export default NokRezervationContentModal;