import { useState } from "react";
import { togglePresent } from "../../../../core/servises/PresentServices";
import { PrimaryButton } from "../../Buttons/Buttons";
import EmailInput from "../../Inputs/EmailInput";

const BindingReservationContentModal = ({
  id,
  currentChecked,
  data,
  byUserReservedPresents,
  setByUserReservedPresents,
  setModalContentType,
  isModalOpen,
  setIsModalOpen,
  setFinalData
}) => {

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleEmail = (email, { isValid }) => {
    setEmail(email);
    setEmailIsValid(isValid);
  };

  const bindingReservePresent = async () => {
    if (!emailIsValid) return;

    setIsSending(true);

    if (currentChecked === false) {
      const reservedByUser = data.filter(d => d.reservedByEmail === email);
      setByUserReservedPresents(reservedByUser);

      if (reservedByUser.length >= 2) {
        setIsSending(false);
        setModalContentType("userLimitReachedModalContent");
        if (!isModalOpen) setIsModalOpen(true);
        return;
      }

      togglePresent(id, currentChecked, email).then(async result => {
        const { status, data } = result;

        if (status === "OK") {
          setFinalData(data);

          try {
            const emailResponse = await fetch("/api/send-email", {
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

            if (!emailResponse.ok) {
              setIsSending(false);
              setModalContentType("okReservationEmailFail");
              if (!isModalOpen) setIsModalOpen(true);
              return;
            }
          } catch (err) {
            console.error("Email sa nepodarilo odoslať:", err);
            setIsSending(false);
            setModalContentType("okReservationEmailFail");
            if (!isModalOpen) setIsModalOpen(true);
            return;
          }

          setIsSending(false);
          setModalContentType("okReservation");
          if (!isModalOpen) setIsModalOpen(true);
        }

        if (status === "ERROR") {
          setIsSending(false);
          setModalContentType("nokReservation");
          if (!isModalOpen) setIsModalOpen(true);
        }
      });
    } else {
      setIsSending(false);
      setModalContentType("alreadyReserved");
      if (!isModalOpen) setIsModalOpen(true);
    }
  };

  return (
    <>
      <h4>Vyplň prosím svoj email</h4>

      <EmailInput
        onChange={handleEmail}
        label=""
        value={email}
        name="email"
      />

      <p>
        Na tento email ti pošlem potvrdenie o&nbsp;záväznej rezervácii spolu
        s&nbsp;inštrukciami, pre&nbsp;jednoduchší nákup darčeka.
      </p>

      <PrimaryButton
        text={isSending ? "..." : "Záväzne rezervovať"}
        onClick={bindingReservePresent}
        disabled={!emailIsValid || isSending}
      />
    </>
  );
};

export default BindingReservationContentModal;