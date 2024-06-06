import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import APISupply from "../services/api-tanks";
import { useCookies } from "react-cookie";

export default function TankList(props) {
  const { tanks } = props;
  const [cookies] = useCookies(["mr-token"]);
  const handleSelectTank = (tank) => (event) => {
    props.selectTank(tank);
  };

  const handleEditTank = (tank) => {
    props.editTank(tank);
  };

  const handleRemoveTank = async (tank) => {
    await APISupply.deleteTank(tank.uuid, cookies["mr-token"])
      .then(() => props.removeTank(tank))
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      {tanks &&
        tanks.map((tank) => {
          return (
            <div className="tank-item" key={tank.uuid}>
              <h2 onClick={handleSelectTank(tank)} className="title">
                {tank.name}
              </h2>
              <FontAwesomeIcon
                icon="fas fa-edit"
                onClick={() => handleEditTank(tank)}
                className="button-icon"
                title="Editar"
              />
              <FontAwesomeIcon
                icon="fas fa-trash"
                onClick={() => handleRemoveTank(tank)}
                className="button-icon"
                title="Deletar"
              />
            </div>
          );
        })}
    </div>
  );
}
