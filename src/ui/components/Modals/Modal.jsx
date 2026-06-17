
import { useState } from "react";
import DetailContentModal from "./ModalContent/DetailContentModal";
import AlreadyReservedContentModal from "./ModalContent/AlreadyReservedContentModal";
import BindingReservationContentModal from "./ModalContent/BindingReservationContentModal";
import OkReservationContentModal from "./ModalContent/OkReservationContentModal"
import NokReservationContentModal from "./ModalContent/NokReservationContentModal"
import "./Modal.css";

const Modal = ({ id, isChecked, setModalContentType, setIsModalOpen, isModalOpen, onClose, contentType }) => {
  if (!isModalOpen) return null;

  return (
    <div className="u-modal-overlay">
      <div className="u-modal u-flex u-gap u-fd-col u-ai-c u-jc-c">
        <button className="u-close-btn" onClick={onClose}>×</button>
          {/* detail about a present + reserve button */}
          {contentType === "detail" &&
            (<DetailContentModal
                id={id}
                isChecked={isChecked}
                setModalContentType={setModalContentType}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />)  
          }
          {/* email + firm reservation button */}
          {contentType === "bindingReservation" &&
            (<BindingReservationContentModal
                id={id}
                currentChecked={isChecked}
                setModalContentType={setModalContentType}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />)
          }   
          {contentType === "alreadyReserved" && (<AlreadyReservedContentModal onClose={onClose}/>)}         {/* already reserved message */}
          {contentType === "okReservation" && (<OkReservationContentModal onClose={onClose} />)}             {/* Thank You */}
          {contentType === "nokReservation" && (<NokReservationContentModal onClose={onClose}/>)}           {/* Somethig Is Wrong */}
      </div>
    </div>
  );
}

export default Modal;