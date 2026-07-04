import { PrimaryButton, SecondaryButton } from "../../Buttons/Buttons";
import { OkIcon } from "../../Icons/Icons";

const OkRezervationContentModal = ({onClose, finalData}) => {
  return (
    <>
      <OkIcon specialClass={"u-modal-ok"}/>
      <div>
        <h4 className="u-bold">Rezervácia prebehla úspešne</h4>
        <p>Na tvoj email prave prišli podrobné inštrukcie k rezervácii.</p>
        <p>Ak email nevidíš v Inboxe, pozri záložku <span className="u-bold">Všetky správy</span> aj <span className="u-bold">Spam</span>.</p>
      </div>
      
      <div> 
        <p className="u-mb-0_5">Darček: <span className="u-bold u-uppercase">{finalData.presentData.name}</span> môžeš kúpiť hneď cez tlačidlo nižšie.</p>
        <SecondaryButton
          onClick={() => window.open(`${finalData.presentData.link}`, "_blank")}
          text="Kúpiť ihneď"
        />
      </div>
    </>
  );
}

export default OkRezervationContentModal;