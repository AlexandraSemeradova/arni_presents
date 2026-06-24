import "./Links.css";

export const PrimaryLink = ({link, target, rel, specialClass, text}) => {
  return (
    <>
      <a href={link} target={target} rel={rel} className={specialClass}>{text}</a>
    </>
  );
}
