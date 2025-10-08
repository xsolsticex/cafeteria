import { useState } from "react";
import * as XLSX from "xlsx";

class Producto {
  constructor(nombre, cantidad, precio) {
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precio = precio;
  }
}

let elements = [];

function ItemList({ onDataLoaded, onBudgetChanged }) {
  const [file, setFile] = useState(null);
  const [budget, setBudget] = useState(null);

  const readFile = (file) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet);

      jsonData.forEach((element) => {
        elements.push(new Producto(element["Producto"], 0, element["Precio"]));
      });
      onDataLoaded(elements);
    };

    fileReader.readAsArrayBuffer(file);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.name);
      readFile(selectedFile);
      setFile(selectedFile);
      console.log("Archivo seleccionado:", selectedFile);
    }
  };

  const handleTextChange = (event) => {
    
    let value = Number(event.target.value.slice(0,3));

    onBudgetChanged(value);
  };
  return (
    <div
      className="d-flex w-100 justify-content-between"
      style={{ marginTop: "25px", marginBottom: "25px" }}
    >
      <div className="inputFile">
        <label
          htmlFor="formFile"
          style={{ background: "white", borderRadius: 50, padding: 5 }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/upload.png`}
            alt="upload file icon"
            width={32}
          />
        </label>
        <input
          className="form-control form-control-sm w-50"
          id="formFile"
          type="file"
          onChange={handleFileChange}
          hidden
        ></input>
      </div>

      <input
        type="number"
        min={0}
        max={999}
        onChange={handleTextChange}
        style={{ maxWidth: "80px" }}
      />
    </div>
  );
}

export default ItemList;
