import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "bootstrap/dist/css/bootstrap.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Sqlite from "./pages/SqliteStorage/sqllite";
import IonicStorage from "./pages/IonicStorage/ionicstorage";
import CapacitorStorage from "./pages/CapacitorStorage/CapacitorStorage";
import Map from "./pages/Map/map";
import QRCode from "./pages/QRCode/QRcode";
import Scanner from "./pages/Scanner/Scanner";
import FingerPrint from "./pages/Auth/fingerprint";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/sqlitestorage">
          <Sqlite />
        </Route>
        <Route exact path="/ionicstorage">
          <IonicStorage />
        </Route>
        <Route exact path="/capacitorstorage">
          <CapacitorStorage />
        </Route>
        {/* <Route exact path="/map">
          <Map />
        </Route> */}
        <Route exact path="/qrcode">
          <QRCode />
        </Route>
        <Route exact path="/scanner">
          <Scanner />
        </Route>
        <Route exact path="/auth">
          <FingerPrint/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
