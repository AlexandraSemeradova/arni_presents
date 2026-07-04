import { useState } from "react";
import { InfoIcon } from "../Icons/Icons";
import { PrimaryButton } from "../Buttons/Buttons";
import NothingToShow from "../NothingToShow/NothingToShow";
import {Toggle} from "../Filters/Toggles/Toggle";
import EmailInput from "../Inputs/EmailInput";
import { reservePresent } from "../../../utils/actions";
import { normalizeBoolean, normalizeString } from "../../../utils/helpers";
import "./PresentList.css";

const PresentList = ({
    allPresents,
    setSelectedId,
    isModalOpen,
    setIsModalOpen,
    setModalContentType,
    setSelectedIsChecked,
    serverStatus
}) => {
    const [userEmail, setUserEmail] = useState("");
    const [showOnlyFree, setShowOnlyFree] = useState(false);
    const [isFilterOff, setIsFilterOff] = useState(true);

    const safeAllPresents = Array.isArray(allPresents) ? allPresents : [];

    const filteredGifts = (() => {
        if (userEmail) {
            return safeAllPresents.filter(p => p.reservedByEmail === userEmail);
        }

        if (showOnlyFree) {
            return safeAllPresents.filter(p => !normalizeBoolean(p.isChecked));
        }

        if (isFilterOff) {
            return safeAllPresents;
        }

        return safeAllPresents;
    })();

    const handleEmailFilter = (email) => {
        setUserEmail(email);
        setShowOnlyFree(false);
    }

    const prepareSelection = (id, isChecked) => {
        setSelectedId(id);
        setSelectedIsChecked(isChecked);
    };

    const openDetailModal = (id, isChecked) => {
        prepareSelection(id, isChecked);
        setModalContentType("detail");
        if (!isModalOpen) {
            setIsModalOpen(true);
        }
    };

    const handleReserve = (id, isChecked) => {
        prepareSelection(id, isChecked);
        reservePresent(isChecked, setModalContentType, isModalOpen, setIsModalOpen);
    };

    const clearFilter = () => {
        setIsFilterOff(true);
        setShowOnlyFree (false);
        setUserEmail("");
    }

    return (
        <section className="u-padding-res u-xl-rounded u-bcg-white">
            <div className="u-filters u-flex u-gap u-jc-e u-ai-e u-fw-w">
                <EmailInput onChange={handleEmailFilter} label="Moje rezervácie" placeholder="Zadaj svoj email" validate={false} value={userEmail} name="userEmail" autoComplete="off" />
                <Toggle showOnlyFree={showOnlyFree} setShowOnlyFree={setShowOnlyFree} />
                <PrimaryButton onClick={clearFilter} text="Zrušiť filtre"/>
            </div>
            <div>
                <ul className="u-pseudotable">
                    <li className="u-pseudotable-header">
                        <span className="u-cell u-cell-1">Názov</span>
                        <span className="u-cell u-cell-2">Detail</span>
                        <span className="u-cell u-cell-3">Cena</span>
                        <span className="u-cell u-cell-4">Stav</span>
                        <span className="u-cell u-cell-5"></span>
                    </li>
                    {(serverStatus === "OK" || filteredGifts.length !== 0) && (filteredGifts.map((present, index) => {
                        
                        const { id, name, price, isChecked } = present;

                        const sId = id || (index + 1);
                        const sName = normalizeString(name) || "Bez mena";
                        const sPrice = `${price} €`|| "–" ;
                        const sIsChecked = normalizeBoolean(isChecked);

                        return (
                            <li key={sId} className={`u-status-${sIsChecked}`}>
                                <span className="u-cell u-ai-c u-cell-1">{sName}</span>
                                <span 
                                    className="u-cell u-ai-c u-cell-2"
                                    onClick={() => openDetailModal(sId, sIsChecked)}
                                    title={`Zobrazí detail: ${sName}`}
                                >
                                    <InfoIcon />
                                </span>
                                <span className="u-cell u-ai-c u-cell-3">{sPrice}</span>
                                <span className="u-cell u-ai-c u-cell-4">
                                    {sIsChecked ?
                                        <span>vybraté</span>
                                        :
                                        <span className="u-txt-green u-bold">voľné</span>
                                    }
                                </span>
                                <span className="u-cell u-jc-c u-ai-c u-cell-5">
                                    {!sIsChecked &&
                                        <PrimaryButton
                                        onClick={() => handleReserve(sId, sIsChecked)}
                                        text="Vybrať"
                                        />
                                    }
                                </span>
                            </li>)}))} 
                    {(serverStatus === "NO_CONTENT" || filteredGifts.length === 0) && <NothingToShow tag="li" specialClass="u-cell u-ai-c u-jc-c u-center" message="Žiadne darčeky na zobrazenie." />
                    }
                </ul>
            </div>
        </section>
    );
}

export default PresentList;