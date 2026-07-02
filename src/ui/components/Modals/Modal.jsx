
import {useState } from "react";
import DetailContentModal from "./ModalContent/DetailContentModal";
import AlreadyReservedContentModal from "./ModalContent/AlreadyReservedContentModal";
import BindingReservationContentModal from "./ModalContent/BindingReservationContentModal";
import OkReservationContentModal from "./ModalContent/OkReservationContentModal";
import NokReservationContentModal from "./ModalContent/NokReservationContentModal";
import OkReservationEmailFailContentModal from "./ModalContent/OkReservationEmailFailContentModal";
import PresentSelectionAtFirstContentModal from "./ModalContent/PresentSelectionAtFirstContentModal";
import UserLimitReachedModalContent from "./ModalContent/UserLimitReachedModalContent";
import "./Modal.css";

const Modal = ({
  id,
  isChecked,
  data,
  setByUserReservedPresents,
  setModalContentType,
  setIsModalOpen,
  isModalOpen,
  onClose,
  contentType
}) => {
  if (!isModalOpen) return null;

  const [finalData, setFinalData] = useState({});

  return (
    <div className="u-modal-overlay">
      <div className="u-modal u-flex u-gap u-fd-col u-ai-c u-jc-c">
        <button className="u-close-btn" onClick={onClose}>×</button>
          {/* Detail about a present + reserve button */}
          {contentType === "detail" &&
            (<DetailContentModal
                id={id}
                isChecked={isChecked}
                setModalContentType={setModalContentType}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />)  
          }
          {/* Email + firm reservation button */}
          {contentType === "bindingReservation" &&
            (<BindingReservationContentModal
                id={id}
                currentChecked={isChecked}
                data={data}
                setByUserReservedPresents={setByUserReservedPresents}
                setModalContentType={setModalContentType}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setFinalData={setFinalData}
              />)
          }
          {/* Already reserved message */}
          {contentType === "alreadyReserved" && (<AlreadyReservedContentModal onClose={onClose}/>)}
          {/* Thank You - all correct */}
          {contentType === "okReservation" && (<OkReservationContentModal onClose={onClose} finalData={finalData} />)}
          {/* Thank You - reservation ok, but no Email*/}
          {contentType === "okReservationEmailFail" && (<OkReservationEmailFailContentModal onClose={onClose} finalData={finalData} />)}
          {/* Something Went Wrong - all bad */}
          {contentType === "nokReservation" && (<NokReservationContentModal onClose={onClose}/>)}
          {/* At first, user have to pick a present to unblock link to store */}
          {contentType === "presentSelectionAtFirst" && (<PresentSelectionAtFirstContentModal onClose={onClose}/>)}
          {/* User reached a present limit */}
          {contentType === "userLimitReachedModalContent" && (<UserLimitReachedModalContent onClose={onClose}/>)}
      </div>
    </div>
  );
}

export default Modal;