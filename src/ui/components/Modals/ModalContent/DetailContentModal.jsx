import { useState, useEffect } from "react";
import { subscribeToPresentById } from "../../../../core/servises/PresentServices";
import { isObject, transformObjToArray, normalizeBoolean, normalizeString } from "../../../../utils/helpers";
import { reservePresent } from "../../../../utils/actions";
import { PrimaryButton } from "../../Buttons/Buttons";
import { PrimaryLink } from "../../Links/Links";
import { NoImageIcon } from "../../Icons/Icons";
import SpinerModal from "../../Loaders/SpinerModal";
import ErrorMessageModal from "../../ErrorMessages/ErrorMessageModal";
import NothingToShow from "../../NothingToShow/NothingToShow";

const DetailContentModal = ({id, isChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {
  const [present, setPresent] = useState({});
  const [serverStatusModal, setServerStatusModal] = useState(null);
  const [isModalLoader, setIsModalLoader] = useState(true);

  console.log('bol som tu');

   useEffect(() => {
    const unsubscribe = subscribeToPresentById(id, (result) => {
      const {status, data} = result;
      setServerStatusModal(status);
      setPresent(data);
      setIsModalLoader(false);
    });

    return () => unsubscribe();
  }, [id]);

  const safePresent = isObject(present) ? present : {};
  
  return (
    <>
      {(isModalLoader) && (<SpinerModal />)}
      {(!isModalLoader && serverStatusModal === "ERROR") && (<ErrorMessageModal />)}
      {(serverStatusModal === "NO_CONTENT" || safePresent.length === 0) && <NothingToShow tag={"div"} message={"Žiadne položky na zobrazenie."} />}
     {(serverStatusModal === "OK" || safePresent.length !== 0) && (
        (() => {

          const { img_path, name, link, mall, isChecked } = safePresent;

          const sImgPath = normalizeString(img_path) || "";
          const sName = normalizeString(name) || "Bez mena";
          const sLink = normalizeString(link) || "";
          const sMall = normalizeString(mall) || "Nie je možné presmerovať na obchod.";
          const sIsChecked = normalizeBoolean(isChecked);

          return (
            <div className="u-flex u-fd-col u-ai-c u-jc-c u-gap">
              <figure className="u-shadow u-padding u-rounded">
                {sImgPath && <img src={sImgPath} alt={sName} />}
                {!sImgPath && <NoImageIcon />}
              </figure>
              <div className="u-flex u-fd-col u-ai-c u-jc-c">
                <h2 className="u-bold">{sName}</h2>
                <p>Kúpiť na:{" "}
                  {(!sLink && sIsChecked===true) && "Nie je možné presmerovať na obchod."}
                  {(sLink && sIsChecked===true) && <PrimaryLink link={sLink} target="_blank" rel="noopener noreferrer" text={sMall} />}
                  {(sLink && sIsChecked===false) && <span className="u-like-link" onClick={() => (setModalContentType("presentSelectionAtFirst"))}>{sMall}</span> }
                </p>
              </div>
              {!sIsChecked && (
                <PrimaryButton onClick={() => reservePresent(sIsChecked, setModalContentType, isModalOpen, setIsModalOpen)}
                  text="Vybrať"
                />
              )}
            </div>
          );
        })()
      )}
    </>
  );
}

export default DetailContentModal;