import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FuelSupplyForm from "./FuelSupplyForm";
export default function TankDetails(props) {
  let { tank } = props;

  const handleUpdateTank = (tk) => {
    props.updateTank(tk);
  };

  return (
    <>
      {tank && (
        <div className="container-detail">
          <h1>{tank.name}</h1>

          <div className="box-identify">
            <p>
              <strong>Identificação: </strong>
              {tank.identify}
            </p>
          </div>

          {tank.description && (
            <div className="box-description">
              <p>
                <strong>Descrição: </strong>
                {tank.description}
              </p>
            </div>
          )}
          <div className="box-capacity">
            <p>
              <strong>Capacidade: </strong>
              {tank.capacity} Lts
            </p>
          </div>
          <div className="box-reservoir">
            <p>
              <strong>Reservatório: </strong>
              {tank.reservoir} Lts{" "}
              <FontAwesomeIcon
                icon="fas fa-circle"
                title="Sair"
                className={
                  "logout-app button-icon " +
                  (tank.low_fuel ? "color-green" : "color-orange")
                }
              />
            </p>
          </div>
          <div className="box-is_active">
            <p>
              <strong>Ativo: </strong>
              <FontAwesomeIcon
                icon="fas fa-circle"
                title="Sair"
                className={
                  "logout-app button-icon " +
                  (tank.is_active ? "color-green" : "color-red")
                }
              />
            </p>
          </div>
          <div className="">
            {
              <FuelSupplyForm
                supply={{
                  tank: tank,
                  employee: "",
                  usedTag: "",
                  litersUsed: "",
                  kmCurrency: 0,
                }}
                updateTank={handleUpdateTank}
              />
            }
          </div>
        </div>
      )}
    </>
  );
}
