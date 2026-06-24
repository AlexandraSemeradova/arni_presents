const NothingToShow = ({ tag: Tag, specialClass, message }) => {
  return (
    <Tag className={specialClass}>
      {message}
    </Tag>
  );
};

export default NothingToShow;