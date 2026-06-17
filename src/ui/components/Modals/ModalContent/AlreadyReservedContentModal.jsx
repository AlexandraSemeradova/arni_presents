import { PrimaryButton } from "../../Buttons/Buttons";
import { TriangleAlertIcon } from "../../Icons/Icons"

const AlreadyRezervedContentModal = ({onClose}) => {
  return (
    <>
    <TriangleAlertIcon specialClass={'u-modal-alert'}/>
      <div>
        <p>Ups, je mi ľúto, ale niekto ťa predbehol.</p>
        <p>Tento darček je už <span className="u-bold">rezervovaný</span>.</p>
      </div>
      <PrimaryButton  text={"Zavrieť"} onClick={onClose}/>
    </>
  );
}

export default AlreadyRezervedContentModal;
