import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonLabel, IonModal, IonNote, IonRow } from '@ionic/react';
import { globeOutline, heartOutline, locationOutline, navigateOutline, phonePortraitOutline } from "ionicons/icons";

interface MarkerInfoWindowProp{
	data:any,
	dismiss:any,
	isOpen:any
}
 const MarkerInfoWindow:React.FC<MarkerInfoWindowProp>  = ({data, dismiss,isOpen}) => {

	return (
		<IonModal
		isOpen={isOpen}
         onDidDismiss={dismiss}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
		>
			<IonGrid className="ion-padding" >

				<IonRow className="ion-margin-bottom">
					<IonCol size="12">
						<IonLabel>
							<h1>{data.title}</h1>
							<IonNote>{data.description}</IonNote>
						</IonLabel>
					</IonCol>
				</IonRow>

				<IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={locationOutline} color="primary" style={{fontSize: "1.5rem"}} />
					</IonCol>

					<IonCol size="10">{data.address}</IonCol>
				</IonRow>

				<IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={globeOutline} color="primary" style={{fontSize: "1.5rem"}} />
					</IonCol>

					<IonCol size="10">{data.website}</IonCol>
				</IonRow>

				<IonRow className="ion-justify-content-start ion-align-items-center">
					<IonCol size="2">
						<IonIcon icon={phonePortraitOutline} color="primary" style={{fontSize: "1.5rem"}} />
					</IonCol>

					<IonCol size="10">{data.phone}</IonCol>
				</IonRow>

				
			</IonGrid>
		</IonModal>
	);
}
export default MarkerInfoWindow;