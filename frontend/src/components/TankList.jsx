import APISupply from "../services/api-tanks";
import { useCookies } from "react-cookie";

import {
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

export default function TankList(props) {
  const { tanks } = props;
  const [cookies] = useCookies(["mr-token"]);
  const handleSelectTank = (tank) => () => {
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
    <div>
      {tanks &&
        tanks.map((tank) => (
          <ListItemButton key={tank.uuid} onClick={handleSelectTank(tank)}>
            <ListItemText primary={tank.name} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditTank(tank)}
              >
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                color="error"
                onClick={() => handleRemoveTank(tank)}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItemButton>
        ))}
    </div>
  );
}
