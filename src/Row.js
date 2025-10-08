import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

function Row({ row, OnProductAdded, budget }) {
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
            if (budget > 0) {
              qty > 0 && setQty(qty - 1);
            }
          }}
        >
          -
        </Button>
        <input
          className="qty"
          value={qty}
          min={0}
          max={999}
          maxLength={3}
          onChange={(e) => setQty(Number(e.target.value))}
          style={{ border: "none", background: "transparent", width: 30 }}
        ></input>
        {/* <span className="qty" contentEditable onKeyDown={e => e.key === 'Enter' && e.preventDefault()}>{qty}</span> */}
        <Button
          className="addQty ms-4 rounded-circle"
          
          onClick={() => {
            if (budget > 0) {
              setQty(qty + 1);
            }
          }}
        >
          +
        </Button>
      </td>
    </tr>
  );
}

export default Row;
