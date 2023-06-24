import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import { storage } from "../../main";
const IonicStorage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const storeInputValue = async () => {
    if (inputValue) {
      await storage.set("inputValue", inputValue);
      console.log("Input value stored successfully!");
    }
  };

  const getStoredInputValue = async () => {
    const storedValue = await storage.get("inputValue");
    console.log("Get Stored input value in Ionic Storage:", storedValue);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <div className="d-flex">
            <IonButtons>
              <IonBackButton defaultHref="/"></IonBackButton>
            </IonButtons>
            <IonTitle>Ionic Storage</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-3 mt-5">
          <IonInput
            placeholder="Enter Name"
            fill="outline"
            value={inputValue}
            onIonChange={(e) => setInputValue(e.detail.value!)}
          />
          <IonButton expand="block" className="mt-4" onClick={storeInputValue}>
            Store Input Value
          </IonButton>
          <IonButton
            expand="block"
            className="mt-3"
            onClick={getStoredInputValue}
          >
            Get Stored Value
          </IonButton>{" "}
          <IonButton
            onClick={() => {
              storage.clear();
            }}
            expand="block"
            className="mt-3"
          >
            Clear
          </IonButton>
          <br />
        </div>
      </IonContent>
    </IonPage>
  );
};
export default IonicStorage;
