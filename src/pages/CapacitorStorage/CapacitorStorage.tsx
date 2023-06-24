import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { Preferences } from "@capacitor/preferences";

const CapacitorStorage: React.FC = () => {
  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [serchValue, setSearchValue] = useState<any>("");
  const [displayData, setDisplayData] = useState<any>("");

  const [data, setData] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getValueByKey = async () => {
    const { value } = await Preferences.get({ key: serchValue });

    setDisplayData(value);
  };

  const getData = async () => {
    const keys: any = await Preferences.keys();

    const storedData = await Promise.all(
      keys?.map(async (key: any) => {
        const { value } = await Preferences.get({ key });
        return { key, value };
      })
    );

    setData(storedData);
  };

  const storeData = async () => {
    if (key && value) {
      await Preferences.set({ key, value });
      setData([...data, { key, value }]);
      setKey("");
      setValue("");
    }
  };

  const removeData = async (keyData: string) => {
    await Preferences.remove({ key: keyData });
    setData(data.filter((item) => item.key !== keyData));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <div className="d-flex">
            <IonButtons>
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>Capacitor Preference</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="mx-2 my-3">
          <IonInput
            fill="outline"
            value={key}
            placeholder="Key"
            onIonInput={(e: any) => {
              setKey(e.target.value);
            }}
          />
          <IonInput
            className="mt-2"
            value={value}
            fill="outline"
            placeholder="Value"
            onIonInput={(e: any) => {
              setValue(e.target.value);
            }}
          />
          <IonButton
            onClick={() => {
              storeData();
            }}
            className="mt-3"
            expand="block"
          >
            Save
          </IonButton>
          <div className="d-flex mt-4 align-items-center">
            <IonInput
              placeholder="Enter Key Value"
              fill="outline"
              className="me-3"
              style={{ width: "75%" }}
              value={serchValue}
              onIonInput={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <IonButton onClick={() => getValueByKey()} slot="end">
              View
            </IonButton>
          </div>
        </div>

        <IonList>
          {displayData ? (
            <IonItem>
              {serchValue}:{displayData}
              <IonButton
                onClick={() => removeData(serchValue)}
                color="danger"
                slot="end"
              >
                Delete
              </IonButton>
            </IonItem>
          ) : null}

          {data.map((item, index) => (
            <IonItem key={index}>
              <IonText>
                Key: {item.key}, Value: {item.value}
              </IonText>
              <IonButton
                onClick={() => removeData(item.key)}
                color="danger"
                slot="end"
              >
                Delete
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default CapacitorStorage;
