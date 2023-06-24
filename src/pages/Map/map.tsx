import { GoogleMap } from "@capacitor/google-maps";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {useRef, useState } from "react";
import MarkerInfoWindow from "../../components/MarkerInfoWindow";
import { markers } from "../../data";
import "./map.css";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [showBottomSheet, setShowBottmSheet] = useState(false);

  console.log("Selected Markers:--", selectedMarker);

  // const [present, dismiss] = useIonModal(MarkerInfoWindow, {
  //   marker: selectedMarker,
  // });

  const [mapConfig, setMapConfig] = useState({
    center: {
      lat: markers[0].lat,
      lng: markers[0].lng,
    },
    zoom: 15,
  });
  let newMap: GoogleMap;

  const markerClick = (marker: any) => {
    setSelectedMarker(
      markers.filter(
        (m) => m.lat === marker.latitude && m.lng === marker.longitude
      )[0]
    );
    setShowBottmSheet(true);
  };

  async function createMap() {
    if (!mapRef.current) return;

    newMap = await GoogleMap.create({
      id: "my-map",
      element: mapRef.current,
      apiKey: "AIzaSyCpHNYRqY99GsVJPQpgJxt5i7RNGA7wxk4",
      config: mapConfig,
    });
    addMapMarkers();
    newMap.setOnMarkerClickListener((marker: any) => markerClick(marker));
  }

  const addMapMarker = async (marker: any) => {
    await newMap.addMarker({
      coordinate: {
        lat: marker?.lat,
        lng: marker?.lng,
      },
      title: marker?.title,
    });
  };

  const addMapMarkers = () => markers.forEach((marker) => addMapMarker(marker));

  // useEffect(() => {
  //   createMap();
  // }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>MAP</IonTitle>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="component-wrapper">
          <capacitor-google-map
            ref={mapRef}
            style={{
              display: "inline-block",
              width: "100%",
              height: 685,
            }}
          ></capacitor-google-map>
          <IonButton expand="block" onClick={() => createMap()}>
            Open Map
          </IonButton>
        </div>
        {selectedMarker ? (
          <MarkerInfoWindow
            isOpen={showBottomSheet}
            data={selectedMarker}
            dismiss={() => {
              setShowBottmSheet(false);
            }}
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default MyMap;
