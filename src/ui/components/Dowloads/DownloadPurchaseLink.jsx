import { PrimaryButton } from "../Buttons/Buttons";

const DownloadPurchaseLink = ({link, text}) => {
  
  const handleDownload = () => {
    const purchaseUrl = `${link}`;

    const content = `[InternetShortcut]
                    URL=${purchaseUrl}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "arnold-darcek.url";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <PrimaryButton onClick={handleDownload} text={text} />
  );
}

export default DownloadPurchaseLink;
