import React, { useEffect, useState } from 'react';
import { IonApp, IonContent, IonHeader, IonToolbar, IonTitle, IonList, IonItem, IonLabel, IonNote, IonInput, IonButton } from '@ionic/react';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const Sqlite: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<string>('');

  useEffect(() => {
    const initializeSQLite = async () => {
      const db:any = CapacitorSQLite.createConnection({
        database: 'mydatabase.db',
        version: 1.0,
        encrypted: false,
      });

      await db.open();

      await db.execute('CREATE TABLE IF NOT EXISTS mytable (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, age INTEGER)');

      const selectResult = await db.query('SELECT * FROM mytable');

      const data = selectResult.values.map((row: any) => {
        return { id: row.id, name: row.name, age: row.age };
      });

      setTableData(data);
    };

    initializeSQLite();
  }, []);

  const handleInsert = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const db:any = CapacitorSQLite.createConnection({
      database: 'mydatabase.db',
      version: 1.0,
      encrypted: false,
    });

    await db.open();

    await db.execute('INSERT INTO mytable (name, age) VALUES (?, ?)', [name, age]);

    setName('');
    setAge('');

    const selectResult = await db.query('SELECT * FROM mytable');

    const data = selectResult.values.map((row: any) => {
      return { id: row.id, name: row.name, age: row.age };
    });

    setTableData(data);
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SQLite Example</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleInsert}>
          <IonItem>
            <IonLabel>Name</IonLabel>
            <IonInput type="text" value={name} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>Age</IonLabel>
            <IonInput type="number" value={age} onIonChange={(e) => setAge(e.detail.value!)}></IonInput>
          </IonItem>
          <IonButton expand="full" type="submit">Insert</IonButton>
        </form>
        <IonList>
          {tableData.map((row: any) => (
            <IonItem key={row.id}>
              <IonLabel>{row.name}</IonLabel>
              <IonNote slot="end">{row.age}</IonNote>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonApp>
  );
};

export default Sqlite;
