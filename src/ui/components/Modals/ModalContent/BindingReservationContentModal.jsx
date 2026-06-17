import { useState } from "react";
import { PrimaryButton } from "../../Buttons/Buttons";
import {bindingReservePresent} from "../../../../utils/functions";
import EmailInput from "../../Inputs/Inputs";

const BindingReservationContentModal = ({id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {

  const [emailIsValid, setEmailIsValid] = useState(false); 

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
