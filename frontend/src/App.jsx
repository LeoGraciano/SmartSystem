import { useEffect, useState } from "react";
import "./App.css";
import TankList from "./components/TankList";
import TankDetails from "./components/TankDetails";
import TankForm from "./components/TankForm";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLoadingTanks } from "./hooks/useLoadingTanks";

function App() {
  const [tanks, setTanks] = useState([]);
  const [selectedTank, setSelectedTank] = useState(null);
  const [editedTank, setEditedTank] = useState(null);
  const [cookies, , removeCookies] = useCookies(["mr-token"]);
  const [data, loading, error] = useLoadingTanks();

  useEffect(() => {
    if (cookies["mr-token"] === "undefined" || !cookies["mr-token"]) {
      removeCookies(["mr-token"]);
      window.location.href = "/";
    }
  }, [cookies["mr-token"]]);

  useEffect(() => {
    setTanks(data);
  }, [data]);

  const handleLoadEditFormTank = (tank) => {
    setSelectedTank(null);
    setEditedTank(tank);
  };

  const handleLoadNewFormTank = () => {
    const fields = {
      name: "",
      identify: "",
      description: "",
      capacity: 0,
      reservoir: 0,
    };
    setSelectedTank(null);
    setEditedTank(fields);
  };

  const handleTankSelected = (tank) => {
    setEditedTank(null);
    setSelectedTank(tank);
  };

  const handleTankEdited = (tank) => {
    const newTanks = tanks.map((tk) => (tk.uuid === tank.uuid ? tank : tk));
    setTanks(newTanks);
    handleTankSelected(tank);
  };
  const handleTankCreated = (tank) => {
    const newTanks = [...tanks, tank];
    setTanks(newTanks);
    handleTankSelected(tank);
  };
  const handleTankRemoved = (tank) => {
    const newTanks = tanks.filter((tk) => tk.uuid !== tank.uuid);
    setEditedTank(null);
    setSelectedTank(null);
    setTanks(newTanks);
  };
  const handleLogoutUser = () => {
    removeCookies(["mr-token"]);
  };

  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Carregando...</h1>
        </header>
      </div>
    );
  }
  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Erro ao carregando os abastecimentos</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon="fa fa-gas-pump" />
          Abastecimento
        </h1>
        <FontAwesomeIcon
          icon="fas fa-sign-out-alt"
          title="Sair"
          className="logout-app button-icon"
          onClick={handleLogoutUser}
        />
      </header>
      <div className="layout">
        <div className="">
          <TankList
            tanks={tanks}
            selectTank={handleTankSelected}
            editTank={handleLoadEditFormTank}
            removeTank={handleTankRemoved}
          />
          <button type="button" onClick={handleLoadNewFormTank}>
            Novo Tanque
          </button>
        </div>
        <div className="">
          {selectedTank && (
            <TankDetails tank={selectedTank} updateTank={handleTankSelected} />
          )}
          {editedTank && (
            <TankForm
              tank={editedTank}
              updateTank={handleTankEdited}
              newTank={handleTankCreated}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
