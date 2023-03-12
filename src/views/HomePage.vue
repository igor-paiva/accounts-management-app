<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
      </div>

      <h1>{{ message }}</h1>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';

import { ref, onMounted } from 'vue';

import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const message = ref('oxe');

onMounted(async () => {
  try {
    const sqlite = new SQLiteConnection(CapacitorSQLite);

    console.log('sqlite: ', sqlite);

    const db = await sqlite.createConnection(
      'test',
      false,
      'no-encryption',
      1,
      false
    );

    await db?.open();

    console.log("opened: ", db);

    await db?.run('DROP TABLE IF EXISTS tabela;');

    const query = `
      CREATE TABLE IF NOT EXISTS tabela (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );
    `;

    await db?.run(query);

    await db.run("insert into tabela (id, name) values (3, 'igor');");

    db?.query('select id, name from tabela')
      .then((res) => {
        console.log(res);

        message.value = JSON.stringify(res.values && res.values[0]);
      })
      .catch((e) => {
        console.log(e);
        message.value = e.message;
      })
      .finally(() => {
        sqlite.closeConnection('test', false);
      });
  } catch (error: any) {
    console.log(error);
    message.value = error.message;
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
