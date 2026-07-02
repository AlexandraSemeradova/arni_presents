import { useState } from "react";
import { InfoIcon } from "../Icons/Icons";
import { PrimaryButton } from "../Buttons/Buttons";
import NothingToShow from "../NothingToShow/NothingToShow";
import {Toggle} from "../Toggles/Toggle";
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
    const [showOnlyFree, setShowOnlyFree] = useState(false);

    const safeAllPresents = Array.isArray(allPresents) ? allPresents : [];

    const filteredPresents = showOnlyFree
        ? safeAllPresents.filter(p => !normalizeBoolean(p.isChecked))
        : safeAllPresents;

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

    return (
        <section className="u-padding-res u-xl-rounded u-bcg-white">
            <Toggle showOnlyFree={showOnlyFree} setShowOnlyFree={setShowOnlyFree}/>
            <div>
                <ul className="u-pseudotable">
                    <li className="u-pseudotable-header">
                        <span className="u-cell u-cell-1">Názov</span>
                        <span className="u-cell u-cell-2">Detail</span>
                        <span className="u-cell u-cell-3">Cena</span>
                        <span className="u-cell u-cell-4">Stav</span>
                        <span className="u-cell u-cell-5"></span>
                    </li>
                    {(serverStatus === "OK" || safeAllPresents.length !== 0) && (filteredPresents.map((present, index) => {
                        
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
                    {(serverStatus === "NO_CONTENT" || safeAllPresents.length === 0) && <NothingToShow tag="li" specialClass="u-cell u-ai-c u-jc-c u-center" message="Zoznam je prázdny a nie sú tu žiadne darčeky na zobrazenie." />
                    }
                </ul>
            </div>
        </section>
    );
}

export default PresentList;