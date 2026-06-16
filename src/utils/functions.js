import { db } from "../firebase";
import { ref, update } from "firebase/database";
import { togglePresent } from "./services";

export const reservePresent = (currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {
    console.log('reserve_present')
        if(currentChecked === false) {
            setModalContentType('bindingReservation');
            if(isModalOpen === false) {
                setIsModalOpen(true);
            }
        } else {
            // toto tu je pre istotu, keby si niekto vedel odblokovat tie tlacidla. normalne su schovate ak currentChecked = true
            setModalContentType('alreadyReserved');
            if(isModalOpen === false) {
                setIsModalOpen(true);
            }
        }
    };

export const bindingReservePresent = (id, currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {
    if(currentChecked === false) {
        togglePresent(id, currentChecked).then(result => {
            const {data, status} = result;

            if (status === 200) {
                // -posli email s instrukciami
                setModalContentType('okReservation'); // - zobraz: "dakujem" okno
                if(isModalOpen === false) {
                    setIsModalOpen(true);
                }
            }
            if (status === 404 || status === 500) {
                setModalContentType('NokReservation'); // - zobraz: "nok" okno
                if(isModalOpen === false) {
                    setIsModalOpen(true);
                }
            }
        })
    } else {
        setModalContentType('alreadyReserved'); // - zobraz: "uz rezervovane" okno
        if(isModalOpen === false) {
            setIsModalOpen(true);
        }
    }
}

export const isObject = value =>
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value);