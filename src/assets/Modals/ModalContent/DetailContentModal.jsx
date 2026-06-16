import { useState, useEffect } from "react";
import { subscribeToPresentById } from "../../../utils/services";
import { reservePresent } from "../../../utils/functions";
import { PrimaryButton } from "../../Buttons/Buttons";
import SpinerModal from "../../Loaders/SpinerModal";
import ErrorMessageModal from "../../ErrorMessages/ErrorMessageModal";

const DetailContentModal = ({id, isChecked, setModalContentType, isModalOpen, setIsModalOpen}) => {
  const [present, setPresent] = useState(null);
  const [serverStatusModal, setServerStatusModal] = useState(null);

   useEffect(() => {
    const unsubscribe = subscribeToPresentById(id, (result) => {
      const {status, data} = result;
      setServerStatusModal(status);
      setPresent(data);
    });

    return () => unsubscribe();
  }, [id]);

  return (
    <>
      {present !== null ?
        serverStatusModal === 'OK'
        ?
        <>
          <figure className="u-shadow u-padding u-rounded">
            <img src={present.img_path} alt={present.name} />
          </figure>
        <div className="u-flex u-fd-col u-ai-c u-jc-c">
          <h2 className="u-bold">{present.name}</h2>
          <p>Dostupné na: <a href={present.link} target="_blank" rel="noopener noreferrer" className="u-primaryLink">{present.mall}</a></p>
        </div>
        {isChecked=== false ? <PrimaryButton
                                key={id}
                                onClick={() => reservePresent(isChecked, setModalContentType, isModalOpen, setIsModalOpen)}
                                text='Vybrať'
                              />
                              :
                              <></>
        }
        </>
        :
        <>
          <ErrorMessageModal />
        </>
      :
      <>
        <SpinerModal />
      </>
      }
    </>
  );
}

export default DetailContentModal;
