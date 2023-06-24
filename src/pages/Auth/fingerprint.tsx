import { IonButton } from "@ionic/react";
import {
  AvailableResult,
  BiometryType,
  NativeBiometric,
} from "capacitor-native-biometric";
const FingerPrint = () => {
  const setCridential = () => {
    console.log("set Cridential");
    // Save user's credentials
    NativeBiometric.setCredentials({
      username: "username",
      password: "password",
      server: "www.example.com",
    }).then();
  };

  const deleteCridential = () => {
    console.log("delete Cridential");
    // Delete user's credentials
    NativeBiometric.deleteCredentials({
      server: "www.example.com",
    });
  };

  const CheckCridential = () => {
    console.log("Check Cridential");
    NativeBiometric.isAvailable().then((result: AvailableResult) => {
      const isAvailable = result.isAvailable;
      alert("RESULT " + JSON.stringify(result));
      // const isFaceId=result.biometryType==BiometryType.FACE_ID;
      // const isFaceId = result.biometryType == BiometryType.FACE_ID;

      if (isAvailable) {
        // Get user's credentials
        NativeBiometric.getCredentials({
          server: "www.example.com",
        }).then((credentials) => {
          alert("CREDENTIAL " + JSON.stringify(credentials));
          // Authenticate using biometrics before logging the user in
          NativeBiometric.verifyIdentity({
            reason: "For easy log in",
            
            title: "Log in",
            subtitle: "Maybe add subtitle here?",
            description: "Maybe a description too?",
          })
            .then(() => {
              //     // Authentication successful
              alert("SUCCESS!!");
              //     // this.login(credentials.username, credentials.password);
            })
            .catch((err) => {
              //   // Failed to authenticate
              alert("FAIL!");
            });
        });
      }
    });
  };

  return (
    <div className="gap-2 px-2 py-2 d-flex flex-column  justify-content-center h-100">
      <IonButton
        onClick={() => {
          CheckCridential();
        }}
        expand="block"
      >
        Check Cridential
      </IonButton>
  
      <IonButton onClick={()=>{setCridential()}} expand="block">Set Cridential</IonButton>
      <IonButton onClick={()=>{deleteCridential()}} expand="block">Delete Cridential</IonButton>
    </div>
  );
};
export default FingerPrint;
