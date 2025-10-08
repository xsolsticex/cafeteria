import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import AlertHeading from "react-bootstrap/esm/AlertHeading";
import Button from "react-bootstrap/Button";
import { createPortal } from "react-dom";

function AlertMessage({show,onShowAlert}) {
  

  return createPortal(
    <div className={`alertMessage ${show ? '' : 'hidden'}`} id="alertMessage">
      <Alert show={show} variant="success">
        <AlertHeading>My Alert</AlertHeading>
        <p>Has superado el limte del presupuesto</p>
        <Button onClick={() => onShowAlert(false)} variant="outline-success">
          Close me
        </Button>
      </Alert>
    </div>,
    document.body
  );
}

export default AlertMessage;
