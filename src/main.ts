import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { defineCustomElements as jeepSqlite, applyPolyfills } from "jeep-sqlite/loader";
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

applyPolyfills().then(() => {
  jeepSqlite(window);
});

window.addEventListener('DOMContentLoaded', async () => {
  const platform = Capacitor.getPlatform();
  const sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite)

  const app = createApp(App)
    .use(IonicVue)
    .use(router);

  try {
    if(platform === "web") {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqlite = document.createElement('jeep-sqlite');
      document.body.appendChild(jeepSqlite);
      await customElements.whenDefined('jeep-sqlite');
      // Initialize the Web store
      await sqlite.initWebStore();
    }
    // // here you can initialize some database schema if required

    // // example: database creation with standard SQLite statements 
    // const ret = await sqlite.checkConnectionsConsistency();
    // const isConn = (await sqlite.isConnection("test", false)).result;
    // let db: SQLiteDBConnection
    // if (ret.result && isConn) {
    //   db = await sqlite.retrieveConnection("test", false);
    // } else {
    //   db = await sqlite.createConnection("test", false, "no-encryption", 1, false);
    // }

    // await db.open();

    // const query = `
    // CREATE TABLE IF NOT EXISTS tabela (
    //   id INTEGER PRIMARY KEY NOT NULL,
    //   name TEXT NOT NULL
    // );
    // `
    // const res = await db.execute(query);

    // if(res.changes && res.changes.changes && res.changes.changes < 0) {
    //   throw new Error(`Error: execute failed`);
    // }

    // // await db.execute("insert into tabela (id, name) values (3, 'igor');");

    // // db.execute('select * from tabela')
    // // .then((res) => {
    // //   console.log(res);
    // // })
    // // .catch((e) => {
    // //   console.log(e);
    // // });

    // await sqlite.closeConnection("test", false);

    router.isReady().then(() => {
      app.mount('#app');
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    throw new Error(`Error: ${err}`)
  }
});
