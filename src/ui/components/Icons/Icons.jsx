import { Info, TriangleAlert, Unplug, CircleCheckBig } from "lucide-react";
import "./Icons.css";

export const InfoIcon = ({specialClass}) => {
  return (
    <>
      <Info className={`u-info-icon ${specialClass || ""}`} />
    </>
  );
}


export const TriangleAlertIcon = ({specialClass}) => {
  return (
    <>
      <TriangleAlert className={`u-triangle_alert-icon ${specialClass || ""}`} />
    </>
  );
}


export const UnplugIcon = ({specialClass}) => {
  return (
    <>
      <Unplug className={`u-unplug-icon ${specialClass || ""}`} />
    </>
  );
}

export const OkIcon = ({specialClass}) => {
  return (
    <>
      <CircleCheckBig className={`u-ok-icon ${specialClass || ""}`} />
    </>
  );
}
