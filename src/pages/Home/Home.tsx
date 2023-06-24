import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import "./Home.css";
import { add, fingerPrint, map, qrCode } from "ionicons/icons";

const Home: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const storeValue = async (value: any) => {
    try {
      localStorage.setItem("MyLocalstorageData", JSON.stringify(value));
      console.log(
        "Value stored successfully in LocalStorage!",
        localStorage.getItem("MyLocalstorageData")
      );
    } catch (error) {
      console.error("Error storing value:", error);
    }
  };

  const handleSave = () => {
    storeValue(inputValue);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Local Storage</IonTitle>
          <IonIcon
            onClick={() => {
              history.push("/map");
            }}
            slot="end"
            size="small"
            className="mx-3"
            icon={map}
          />
          <IonIcon
            onClick={() => {
              history.push("/qrcode"), history.go(0);
            }}
            icon={qrCode}
            className="mx-3"
            size="small"
            slot="end"
          />
          <IonIcon
            onClick={() => {
              history.push("/auth"), history.go(0);
            }}
            icon={fingerPrint}
            slot="end"
            size="small"
            className="mx-3"
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-2 mt-5 justify-content-center d-flex flex-column">
          <IonInput
            placeholder="Enter Some Value"
            fill="outline"
            value={inputValue}
            onIonChange={handleInputChange}
          />
        </div>
        <IonButton expand="block" className="mx-2 mt-5" onClick={handleSave}>
          Save
        </IonButton>
        <IonButton
          expand="block"
          className="mx-2 mt-3"
          onClick={() => {
            history.push("/ionicstorage");
          }}
        >
          Go to Ionic Storage
        </IonButton>
        <IonButton
          onClick={() => {
            history.push("/capacitorstorage");
          }}
          className="mx-2 mt-3"
          expand="block"
        >
          Go to Capacitor Prefrence
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
