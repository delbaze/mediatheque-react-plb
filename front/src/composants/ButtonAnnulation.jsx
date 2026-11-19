import { useNavigate } from "react-router";
function ButtonAnnulation({ titre, url }) {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(url);
  };
  return <button onClick={handleRedirect}>{titre}</button>;
}

export default ButtonAnnulation;
