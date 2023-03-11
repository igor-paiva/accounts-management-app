<template>
  <ion-app>
    <ion-router-outlet />

    <h1>
      {{ message }}
    </h1>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { ref, defineComponent, onMounted, getCurrentInstance } from 'vue';

import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';
// import { SQLiteDBConnection, SQLiteHook } from 'vue-sqlite-hook/dist';

// const app = getCurrentInstance();

const message = ref('');

// const sqlite: SQLiteHook = app?.appContext.config.globalProperties.$sqlite;

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

    await db?.run('DROP TABLE tabela;');

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
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error: any) {
    console.log(error);
    message.value = error.message;
  }

  // await CapacitorSQLite.open({ database: 'test' });

  // const a = await CapacitorSQLite.getDatabaseList();

  // console.log(a);
  // message.value = a.values?.join(', ') || '';

  // CapacitorSQLite.close({ database: 'test' });



  // try {
  //   console.log(' Starting testDatabaseNoEncryption');
  //   message.value = ' Starting testDatabaseNoEncryption';
    
  //   const db: SQLiteDBConnection = await sqlite.createConnection("NoEncryption");

  //   console.log("after createConnection");
  //   message.value = "after createConnection";


  //   await db.open();

  //   console.log("> open 'NoEncryption' successful\n");
  //   message.value = "> open 'NoEncryption' successful\n";

    // // Drop tables if exists
    // let res: any = await db.execute(dropTablesTablesNoEncryption);

    // if(res.changes.changes !== 0 &&
    //             res.changes.changes !== 1){
    //     errMess = `Execute dropTablesTablesNoEncryption changes < 0`;
    //     return false;
    // } 
    // setLog(log.value.concat(" Execute1 successful\n"));
    
    // // Create tables
    // res = await db.execute(createTablesNoEncryption);
    // if (res.changes.changes < 0) {
    //     errMess = `Execute createTablesNoEncryption changes < 0`;
    //     return false;
    // }
    // setLog(log.value.concat(" Execute2 successful\n"));
    // // Insert two users with execute method
    // res = await db.execute(importTwoUsers);
    // if (res.changes.changes !== 2) {
    //     errMess = `Execute importTwoUsers changes != 2`;
    //     return false;
    // }
    // setLog(log.value.concat(" Execute3 successful\n"));
    // // Select all Users
    // res = await db.query("SELECT * FROM users");
    // if(res.values.length !== 2 ||
    // res.values[0].name !== "Whiteley" ||
    //             res.values[1].name !== "Jones") {
    //     errMess = `Query not returning 2 values`;
    //     return false;
    // }
    // setLog(log.value.concat(" Select1 successful\n"));
    // // add one user with statement and values              
    // let sqlcmd = "INSERT INTO users (name,email,age) VALUES (?,?,?)";
    // let values: Array<any>  = ["Simpson","Simpson@example.com",69];
    // res = await db.run(sqlcmd,values);
    // if(res.changes.changes !== 1 ||
    //                 res.changes.lastId !== 3) {
    //     errMess = `Run lastId != 3`;
    //     return false;
    // }
    // setLog(log.value.concat(" Run1 successful\n"));
    // // add one user with statement              
    // sqlcmd = `INSERT INTO users (name,email,age) VALUES `+
    //                 `("Brown","Brown@example.com",15)`;
    // res = await db.run(sqlcmd);
    // if(res.changes.changes !== 1 ||
    //             res.changes.lastId !== 4) {
    //     errMess = `Run lastId != 4`;
    //     return false;
    // }
    // setLog(log.value.concat(" Run2 successful\n"));
    // // Select all Users
    // res = await db.query("SELECT * FROM users");
    // if(res.values.length !== 4) {
    //     errMess = `Query not returning 4 values`;
    //     return false;
    // }
    // setLog(log.value.concat(" Select2 successful\n"));
    // // Select Users with age > 35
    // sqlcmd = "SELECT name,email,age FROM users WHERE age > ?";
    // values = ["35"];
    // res = await db.query(sqlcmd,values);
    // if(res.values.length !== 2) {
    //     errMess = `Query > 35 not returning 2 values`;
    //     return false;
    // }
    // setLog(log.value
    //         .concat(" Select with filter on age successful\n"));
    // // Close Connection NoEncryption        
  //   await sqlite.closeConnection("NoEncryption"); 
            
  //   // setLog(log.value
  //   //     .concat("* Ending testDatabaseNoEncryption *\n"));
  //   return true;
  // } catch (err) {
  //   console.error(err);

  //   return false;
  // }
});
</script>
