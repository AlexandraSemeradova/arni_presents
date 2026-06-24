export const reservePresent = (currentChecked, setModalContentType, isModalOpen, setIsModalOpen) => {
    if(currentChecked === false) {
        setModalContentType('bindingReservation');
        if(!isModalOpen) {
            setIsModalOpen(true);
        }
    } else {
        // toto tu je pre istotu, keby si niekto vedel odblokovat tie tlacidla. normalne su schovate ak currentChecked = true
        setModalContentType('alreadyReserved');
        if(!isModalOpen) {
            setIsModalOpen(true);
        }
    }
};