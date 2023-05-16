const Card = (props) => {
  return (
      <div>
          <div className={'border border-1 rounded-2 row mb-5 overflow-hidden'}>
              {props.children}
          </div>
      </div>
  );
}

export default Card;