import { useState, useEffect } from 'react';
// import { getAllPresents } from '../../utils/services';
import { reservePresent } from '../../utils/functions';
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
            <ul className="pseudotable">
                <li>
                    <span className="cell cell-1">Názov</span>
                    <span className="cell cell-2">Detail</span>
                    <span className="cell cell-3">Cena</span>
                    <span className="cell cell-4">Stav</span>
                    <span className="cell cell-5"></span>
                </li>
                {allPresents.map(({ id, name, price, isChecked }, index) => (
                        <li key={index} className={`status-${isChecked}`}>
                            <span className="cell ai-c cell-1">{name}</span>
                            <span 
                                className="cell ai-c cell-2"
                                onClick={() => openDetailModal(id, isChecked)}
                                title={`Zobrazí detail: ${name}`}
                            >
                                <InfoIcon />
                            </span>
                            <span className="cell ai-c cell-3">{price} €</span>
                            <span className="cell ai-c cell-4">{isChecked ? <span>vybraté</span> : <span className='txt-green bold'>voľné</span>}</span>
                            <span className="cell jc-c ai-c cell-5">
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
