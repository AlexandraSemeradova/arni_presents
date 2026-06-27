import { useState } from "react";
import { togglePresent } from "../../../../core/servises/PresentServices";
import { PrimaryButton } from "../../Buttons/Buttons";
import EmailInput from "../../Inputs/Inputs";

const BindingReservationContentModal = ({id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

const bindingReservePresent = async (id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {
  if (currentChecked === false) {
    togglePresent(id, currentChecked).then(async result => {
      const { status, data } = result; // ← presentData musí vrátiť togglePresent

      console.log(result.data.presentData);
    //   const presentData = {name: 'DARCEK', link: 'LINK', mall: 'MALL', price: 'PRICE'}

      if (status === "OK") {
        // Odoslanie emailu
        try {
          await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              presentName: data.presentData.name || "Bez mena: chyba!",
              presentLink: data.presentData.link || "Bez linku: chyba!",
              presentMall: data.presentData.mall || "Bez názvu obchodu: chyba!",
              presentPrice: data.presentData.price || "Bez ceny: chyba!",
            }),
          });
        } catch (err) {
          console.error("Email sa nepodarilo odoslať:", err);
          // Email zlyhá potichu — rezervácia je stále OK
        }

        setModalContentType("okReservation");
        if (!isModalOpen) setIsModalOpen(true);
      }

      if (status === "ERROR") {
        setModalContentType("nokReservation");
        if (!isModalOpen) setIsModalOpen(true);
      }
    });
  } else {
    setModalContentType("alreadyReserved");
    if (!isModalOpen) setIsModalOpen(true);
  }
};

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