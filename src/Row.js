import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function Row({ row, OnProductAdded }) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    OnProductAdded(qty);
    console.log(qty * row.precio);
  }, [qty, row.precio]);

  return (
    <tr>
      <td>{row.nombre}</td>
      <td className="align-middle">
        <Button
          className="subQty me-4 rounded-circle"
          onClick={() => {
            qty > 0 && setQty(qty - 1);
          }}
        >
          -
        </Button>
        <span className="qty">{qty}</span>
        <Button
          className="addQty ms-4 rounded-circle"
          onClick={() => {
            setQty(qty + 1);
          }}
          
        >
          +
        </Button>
      </td>
    </tr>
  );
}

export default Row;
