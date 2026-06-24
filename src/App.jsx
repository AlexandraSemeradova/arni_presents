import { useEffect, useState } from "react";
import { subscribeToPresents } from "./core/servises/PresentServices";
import Spiner from "./ui/components/Loaders/Spiner";
import Modal from "./ui/components/Modals/Modal";
import ErrorMessage from "./ui/components/ErrorMessages/ErrorMessage";
import PresentList from "./ui/components/Lists/PresentList";
import "./App.css";

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIsChecked, setSelectedIsChecked] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPresents, setAllPresents] = useState([]);
  const [serverStatus, setServerStatus] = useState(null);
  const [modalContentType, setModalContentType] = useState(null);
  const [isLoader, setIsLoader] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToPresents((result) => {
      const {status, data} = result;
      setServerStatus(status)
      setAllPresents(data);
      setIsLoader(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      {(isLoader) && (<Spiner />)}
      {(!isLoader && serverStatus === 'ERROR') && (<ErrorMessage />)}
      {(!isLoader && serverStatus !== 'ERROR') &&
        (<>
          <PresentList
            allPresents={allPresents}
            setSelectedId={setSelectedId}
            setSelectedIsChecked={setSelectedIsChecked}
            setModalContentType={setModalContentType}
            setIsModalOpen={setIsModalOpen}
            isModalOpen={isModalOpen}
            serverStatus={serverStatus}
          />
          <Modal
            id={selectedId} 
            isChecked={selectedIsChecked}
            isModalOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            contentType={modalContentType}
            setModalContentType={setModalContentType}
          />
        </>)
      }
    </div>
  );
}

