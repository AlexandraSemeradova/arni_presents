import "./Links.css";

export const PrimaryLink = ({link, target = "_blank", rel ="noopener noreferrer", specialClass, text}) => {
  return (
    <>
      <a href={link} target={target} rel={rel} className={`u-primaryLink ${specialClass}`}>{text}</a>
    </>
  );
}
