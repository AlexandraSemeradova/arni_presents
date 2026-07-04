import { PrimaryButton, SecondaryButton } from "../../Buttons/Buttons";
import DownloadPurchaseLink from "../../Dowloads/DownloadPurchaseLink";
import { OkIcon } from "../../Icons/Icons";

const OkReservationEmailFailContentModal = ({onClose, finalData}) => {
  return (
    <>
    {/* <div className="u-flex u-gap u-fd-col u-ai-c u-jc-c"> */}

      <div>
        <h2 className="u-bold u-uppercase">Úspešná rezervácia 🎉,<br />no email sa nepodarilo odoslať ❌.</h2>
      </div>

      <div> 
        <p className="u-mb-0_5">Darček <span className="u-bold u-uppercase">{finalData.presentData.name}</span> môžeš kúpiť hneď cez tlačidlo nižšie.</p>
        <SecondaryButton
          onClick={() => window.open(`${finalData.presentData.link}`, "_blank")}
          text="Kúpiť ihneď"
        />
      </div>

      <div>
        <p className="u-mb-0_5">Ak chceš objednávku dokončiť neskôr, stiahni si odkaz do svojho zariadenia.</p>
        <DownloadPurchaseLink link={finalData.presentData.link} text="Stiahnuť odkaz na neskôr"/>
      </div>

    {/* </div> */}
    </>
  );
}

export default OkReservationEmailFailContentModal;