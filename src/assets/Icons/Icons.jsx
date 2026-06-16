import { Info, TriangleAlert, Unplug, CircleCheckBig } from "lucide-react";
import "./Icons.css";

export const InfoIcon = ({specialClass}) => {
  return (
    <>
      <Info className={`info-icon ${specialClass || ""}`} />
    </>
  );
}


export const TriangleAlertIcon = ({specialClass}) => {
  return (
    <>
      <TriangleAlert className={`triangle_alert-icon ${specialClass || ""}`} />
    </>
  );
}


export const UnplugIcon = ({specialClass}) => {
  return (
    <>
      <Unplug className={`unplug-icon ${specialClass || ""}`} />
    </>
  );
}

export const OkIcon = ({specialClass}) => {
  return (
    <>
      <CircleCheckBig className={`ok-icon ${specialClass || ""}`} />
    </>
  );
}
