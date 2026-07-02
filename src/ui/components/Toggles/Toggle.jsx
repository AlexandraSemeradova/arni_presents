import "./Toggle.css";

export const IOSToggle = ({showOnlyFree, setShowOnlyFree}) => {
  return (
    <div className="u-switch">
      <span className={`u-slider u-show_only_free-${showOnlyFree}`} onClick={() => setShowOnlyFree(prev => !prev)}></span>
    </div>  
  );
}

export const Toggle = ({showOnlyFree, setShowOnlyFree}) => {
  return (
    <div className="u-flex u-jc-e u-padding">
      <span style={{ marginRight: "10px" }}>Zobraziť iba voľné</span>
      <IOSToggle showOnlyFree={showOnlyFree} setShowOnlyFree={setShowOnlyFree} />
    </div>
  );
}


