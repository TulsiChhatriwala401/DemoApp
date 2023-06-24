import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Scanner.css";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { stop } from "ionicons/icons";
import { useHistory } from "react-router";

const Scanner = () => {
  const [scannedData, setScannedData] = useState("");
  const history = useHistory();

  useEffect(() => {
    prepare();
  }, []);

  const checkPermission = async () => {
    
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
     
      return true;
    }
    return false;
  };


  const prepare = () => {
    BarcodeScanner.prepare();
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  const scanBarcode = async () => {
     checkPermission();
    BarcodeScanner.hideBackground();
    try {
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        alert("Result :" + result.content);
        setScannedData(result.content);
      }
    } catch (error) {
      alert("Error scanning barcode" + error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Scanner</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/qrcode" />
          </IonButtons>
          <IonIcon
            slot="end"
            className="mx-3"
            color="danger"
            onClick={() => {
              stopScan();
            }}
            icon={stop}
          />
        </IonToolbar>
      </IonHeader>
      <div>
      <IonContent className="ion-padding hideBg " >
        <IonButton expand="full" onClick={scanBarcode}>
          Scan Barcode
        </IonButton>
        {scannedData && (
          <div className="result-container">Scanned Data: {scannedData}</div>
        )}
      </IonContent>
      </div>
       
    </IonPage>
  );
};

export default Scanner;
