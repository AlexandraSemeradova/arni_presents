export const PrimaryTitle = ({text}) => {
  return (
    <header>
        <h1>{text}</h1>
    </header>
  );
}
export const PrimaryTitleIcon = ({text, icon, specialClass}) => {
  return (
    <header className={`u-flex u-ai-c u-gap ${specialClass}`}>
        {icon}
        <h1>{text}</h1>
    </header>
  );
}
