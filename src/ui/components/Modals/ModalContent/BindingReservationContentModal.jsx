import { useState } from "react";
import { togglePresent } from "../../../../core/servises/PresentServices";
import { PrimaryButton } from "../../Buttons/Buttons";
import EmailInput from "../../Inputs/Inputs";

const BindingReservationContentModal = ({id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

 const bindingReservePresent = async (id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {  
  if(currentChecked === false) {   
      togglePresent(id, currentChecked).then(async result => {
          const {status} = result;

          if (status === "OK") {
            console.log(email);
              await fetch("/api/sendReservationEmail", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      email: email,
                      presentName: 'AHOJ'
                  })
              });

              setModalContentType("okReservation");
              if(!isModalOpen) setIsModalOpen(true);
          }

          if (status === "ERROR") {
              setModalContentType("nokReservation");
              if(!isModalOpen) setIsModalOpen(true);
          }
      })
  } else {
      setModalContentType("alreadyReserved");
      if(!isModalOpen) setIsModalOpen(true);
  }
}

  return (
    <>
        <h2>Vyplň prosím svoj email</h2>
        <EmailInput setEmailIsValid={setEmailIsValid} setEmail={setEmail}/>
        <p className="u-small">Na tento email ti pošlem potvrdenie o&nbsp;záväznej rezervácii spolu s&nbsp;inštrukciami, pre&nbsp;jednoduchší nákup darčeka.</p>
        <PrimaryButton
          text={"Záväzne rezervovať"}
          onClick={() => bindingReservePresent(id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen, email)}
          disabled={!emailIsValid}
          />
    </>
  );
}

export default BindingReservationContentModal;