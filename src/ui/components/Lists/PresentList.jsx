import { useState, useEffect } from 'react';
import { reservePresent } from '../../../utils/functions';
import {InfoIcon} from '../Icons/Icons';
import { PrimaryButton } from '../Buttons/Buttons';
import './PresentList.css';

const PresentList = ({allPresents, setSelectedId, isModalOpen, setIsModalOpen, setModalContentType, setSelectedIsChecked}) => {

    const prepareIdAndIsChecked = (id, isChecked) => {
        setSelectedId(id);
        setSelectedIsChecked(isChecked);
    };

    const openDetailModal = (id, isChecked) => {
        prepareIdAndIsChecked(id, isChecked);
        setModalContentType('detail');
        if(isModalOpen === false) {
            setIsModalOpen(true);
        }
    };

    return (
        <section>
            <ul className="u-pseudotable">
                <li>
                    <span className="u-cell u-cell-1">Názov</span>
                    <span className="u-cell u-cell-2">Detail</span>
                    <span className="u-cell u-cell-3">Cena</span>
                    <span className="u-cell u-cell-4">Stav</span>
                    <span className="u-cell u-cell-5"></span>
                </li>
                {allPresents.map(({ id, name, price, isChecked }, index) => (
                        <li key={index} className={`u-status-${isChecked}`}>
                            <span className="u-cell u-ai-c u-cell-1">{name}</span>
                            <span 
                                className="u-cell u-ai-c u-cell-2"
                                onClick={() => openDetailModal(id, isChecked)}
                                title={`Zobrazí detail: ${name}`}
                            >
                                <InfoIcon />
                            </span>
                            <span className="u-cell u-ai-c u-cell-3">{price} €</span>
                            <span className="u-cell u-ai-c u-cell-4">{isChecked ? <span>vybraté</span> : <span className='u-txt-green u-bold'>voľné</span>}</span>
                            <span className="u-cell u-jc-c u-ai-c u-cell-5">
                                {isChecked=== false ?
                                    <PrimaryButton
                                    key={id}
                                    onClick={() => {
                                                    prepareIdAndIsChecked(id, isChecked);
                                                    reservePresent(isChecked, setModalContentType, isModalOpen, setIsModalOpen);
                                                }}
                                    text='Vybrať'
                                    />
                                    :
                                    <></>
                                }
                            </span>
                        </li>))}
            </ul>
        </section>
    );
}

export default PresentList;
