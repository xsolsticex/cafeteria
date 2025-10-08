import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ItemList from "./DropDown";
import { useEffect, useState } from "react";
import Row from "./Row";
import Progress from "./Progress";
function MainContent() {
  const [data, setData] = useState([]);
  const [qty, setQty] = useState(0);
  const [presupuesto, setPresupuesto] = useState(100); // ejemplo: máximo del progress
  const [cantidades, setCantidades] = useState({});
  const [progress, setProgress] = useState(0);
  const [budget, setBudget] = useState(0);
  const [progrssColor, setColor] = useState("black");

  useEffect(() => {
    if (!data || data.length === 0) return; // <-- evita NaN cuando aún no hay productos
    console.log(budget);
    if (Number(budget) === 0) return;
    let val = 0;
    for (const key in cantidades) {
      const unidades = cantidades[key] || 0;
      if (data[key]) {
        val += unidades * (data[key].precio || 0);
      }
    }
    setProgress(val);
  }, [cantidades, data, budget]);

useEffect(() => {
  const numBudget = Number(budget);

  if (numBudget === 0) {
    setProgress(0);
    setColor("transparent");
    return;
  }

  // Mantener la proporción del progreso si cambia el budget
  setProgress((prev) => Math.min(prev, numBudget));

  if (progress >= numBudget - 10) {
    setColor("#f78f8fff"); // rojo: casi al límite
  } else if (progress >= numBudget / 2) {
    setColor("#f7c68fff"); // naranja: sobre mitad
  } else {
    setColor("#7aa0f3ff"); // azul: tranquilo
  }
}, [budget, progress]);

  const total = data.reduce((acc, row, i) => {
    const qty = cantidades[i] || 0;
    return acc + qty * row.precio;
  }, 0);

  const updateCantidad = (i, nuevaCantidad) => {
    setCantidades((prev) => ({ ...prev, [i]: nuevaCantidad }));
  };
  return (
    <Container className="d-flex flex-column align-items-start vw-100 pb-5">
      <ItemList
        className="w-50"
        onDataLoaded={setData}
        onBudgetChanged={setBudget}
      />

      <Table striped bordered hover className="w-100 text-center mt-2 mb-4">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <Row
              key={i}
              row={row}
              OnProductAdded={(qty) => updateCantidad(i, qty)}
              budget={budget}
            />
          ))}
        </tbody>
      </Table>

      <Progress
        value={progress}
        maxValue={budget}
        color={progrssColor}
        className=" d-flex progress-sticky justify-content-center"
      />
    </Container>
  );
}

export default MainContent;
