import { useState } from "react";
import { togglePresent } from "../../../../core/servises/PresentServices";
import { PrimaryButton } from "../../Buttons/Buttons";
import EmailInput from "../../Inputs/Inputs";

const BindingReservationContentModal = ({id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {

  const [emailIsValid, setEmailIsValid] = useState(false);

  const bindingReservePresent = (id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {  
    if(currentChecked === false) {   
        togglePresent(id, currentChecked).then(result => {
            const {status} = result;

            if (status === "OK") {
                // - TODO: send email with instructions 
                setModalContentType("okReservation"); // - show: "ok reservation, alias thank you" modal
                if(!isModalOpen) {
                    setIsModalOpen(true);
                }
            }
            if (status === "ERROR") {
                setModalContentType("nokReservation"); // - show: "nok reservation" modal
                if(!isModalOpen) {
                    setIsModalOpen(true);
                }
            }
        })
    } else {
        setModalContentType("alreadyReserved"); // - show: "already reserved" modal
        if(!isModalOpen) {
            setIsModalOpen(true);
        }
    }
  }

  return (
    <>
        <h2>Vyplň prosím svoj email</h2>
        <EmailInput setEmailIsValid={setEmailIsValid} />
        <p className="u-small">Na tento email ti pošlem potvrdenie o&nbsp;záväznej rezervácii spolu s&nbsp;inštrukciami, pre&nbsp;jednoduchší nákup darčeka.</p>
        <PrimaryButton
          text={"Záväzne rezervovať"}
          onClick={() => bindingReservePresent(id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen)}
          disabled={!emailIsValid}
          />
    </>
  );
}

export default BindingReservationContentModal;