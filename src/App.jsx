import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue, update } from "firebase/database";
import { getAllPresents, subscribeToPresents } from "./utils/services";
import Spiner from "./assets/Loaders/Spiner";
import Modal from "./assets/Modals/Modal";
import ErrorMessage from "./assets/ErrorMessages/ErrorMessage";
import PresentList from "./assets/Lists/PresentList";
import './App.css'

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIsChecked, setSelectedIsChecked] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPresents, setAllPresents] = useState(null);
  const [serverStatus, setServerStatus] = useState(null);
  const [modalContentType, setModalContentType] = useState('detail');

      useEffect(() => {
        const unsubscribe = subscribeToPresents((result) => {
          const {status, data} = result;
          // console.log('status');
          // console.log(status);
          setServerStatus(status)
          setAllPresents(data);
        });

        return () => unsubscribe();
    }, []);


  return (
    <div className="app">
    {allPresents !== null ?
      serverStatus === 'OK' ? 
      <>
        <PresentList
            allPresents={allPresents}
            setSelectedId = {setSelectedId}
            setSelectedIsChecked = {setSelectedIsChecked}
            setModalContentType={setModalContentType}
            setIsModalOpen = {setIsModalOpen}
            isModalOpen = {isModalOpen}
          />
          <Modal
            id={selectedId} 
            isChecked={selectedIsChecked}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            contentType={modalContentType}
            setModalContentType={setModalContentType}
          />
      </>
      :
      <>
        <ErrorMessage />
      </> 
    :
    <>
      <Spiner />
    </>
    }
      
    </div>
  );
}

