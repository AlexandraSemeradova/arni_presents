import { PrimaryButton } from "../../Buttons/Buttons";
import { TriangleAlertIcon } from "../../Icons/Icons";

const PresentSelectionAtFirstContentModal = ({onClose}) => {
  return (
    <>
    <TriangleAlertIcon specialClass={"u-modal-alert"}/>
      <div>
        <p className="u-bold">Aby si sa mohol/a presmerovať na&nbsp;obchod,</p>
        <p>je nutné spraviť najskôr rezerváciu darčeka cez&nbsp;tlačidlo <span className="u-bold">Vybrať</span>.</p>
      </div>
      <PrimaryButton text={"Zavrieť"} onClick={onClose}/>
    </>
  );
}

export default PresentSelectionAtFirstContentModal;