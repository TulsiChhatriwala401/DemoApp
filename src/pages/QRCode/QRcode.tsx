import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonTitle,
  IonToolbar,
  
} from "@ionic/react";
import { useState } from "react";
import "./QRcode.css";
import { useHistory } from "react-router";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import BarcodeGenerator from "../../components/BarcodeGenerator ";
import { scanCircle } from "ionicons/icons";

const QRCode: React.FC = () => {
  const [qrCodeText, setQrCodeText] = useState<any>("");
  const [barCodeText, setBarCodeText] = useState<any>("");
  const [data, setData] = useState<any>("");
  const history = useHistory();


  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Code Generator</IonTitle>
          <IonIcon
            slot="end"
            onClick={() => {
              history.push("/scanner");
            }}
            className="mx-3"
            icon={scanCircle}
            size="large"
          />
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true}>
        <div className="pt-3 px-2">
          <IonInput
            placeholder="Enter Some Text"
            value={data}
            onIonInput={(e) => {
              setData(e.target.value);
            }}
            fill="outline"
          />

          <IonButton
            onClick={() => {
              data && setQrCodeText(data);
            }}
            className="my-3"
            expand="block"
          >
            Genrate QRCode
          </IonButton>

          <IonButton
            onClick={() => {
              data && setBarCodeText(data);
            }}
            expand="block"
          >
            Genrate BarCode
          </IonButton>

          {data.length > 0 && (
            <div>
              {qrCodeText.length > 0 && <QRCodeGenerator text={qrCodeText} />}
              {barCodeText.length > 0 && (
                <BarcodeGenerator value={barCodeText} />
              )}
            </div>
          )}
        </div>
      </IonContent>
    </>
  );
};
export default QRCode;
