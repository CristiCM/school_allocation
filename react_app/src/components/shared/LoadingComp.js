import Spinner from 'react-bootstrap/Spinner';

function LoadingComp({message}) {
  return (
    <>
      <span>{message}</span>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">{}</span>
      </Spinner>
    </>
  );
}

export default LoadingComp;