import Fab from "@mui/material/Fab";
import { useState } from "react";
export default function FabIcon() {
  const [open, setOpen] = useState(false);

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          color: "green",
        }}
      ></div>
      <div style={{ textAlign: "center" }}>
        <Fab color="success">s</Fab>
        <Fab color="primary">d</Fab>
      </div>
    </div>
  );
}
