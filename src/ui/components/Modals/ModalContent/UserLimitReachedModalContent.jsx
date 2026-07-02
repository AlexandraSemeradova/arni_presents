import { PrimaryButton } from "../../Buttons/Buttons";
import { TriangleAlertIcon } from "../../Icons/Icons";

const UserLimitReachedModalContent = ({byUserReservedPresents, onClose}) => {
  return (
    <>
    <TriangleAlertIcon specialClass={"u-modal-alert"}/>
      <div>
        <p className="u-bold">Limit 2 darčekov</p>
        <p> Už máš rezervované dva darčeky. Ďalší už nie je možné vybrať.</p>
      </div>
      <PrimaryButton text={"Zavrieť"} onClick={onClose}/>
    </>
  );
}

export default UserLimitReachedModalContent;