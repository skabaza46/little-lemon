import { useRef, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const tableName = "little_lemon"
const db = SQLite.openDatabase(tableName);



export const createTable = async () => {

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        // tx.executeSql(
        //     'DROP TABLE menuitems;'
        //   );
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text, description text, image text);'
        );
      },
      reject,
      resolve
    );
  });
}

export const dropDatabase = () => {
    db.closeAsync()
    db.deleteAsync()
}


export const dropTable = async () => {
    db.transaction((tx) => {
        tx.executeSql(`drop table ${tableName}`)
    });
  }

export const getMenuItems = async ()=>{
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        console.log(rows._array)
        resolve(rows._array);
      });
    });
  });
}

export const saveMenuItems = (menuItems)=>{
    console.log(menuItems)
    const sql_query = `insert into menuitems (uuid, title, price, category, description, image) values ${menuItems.map((item) =>
        `('${item.id}', '${item.title}', '${item.price}', '${item.category}', '${item.description}', '${item.image}')`).join(', ')}`


    db.transaction((tx) => {
        tx.executeSql(sql_query);

    }, (error)=>{
        console.log(error)
    });


  const data = getMenuItems()
  console.log(`data: ${JSON.stringify(data)}`)
}


export const filterByQueryAndCategories = async (query, activeCategories)=>{

  var cleanedActiveCategories = Array.from(activeCategories).map((value)=>`'${value}'`)


  let sqlQuery = `SELECT * FROM menuitems WHERE category IN (${cleanedActiveCategories})`;

  if (query.length > 0){
    sqlQuery = `SELECT * FROM menuitems WHERE title LIKE '%${query}%' AND category IN (${cleanedActiveCategories})`;
  }


  const menuItems =  new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(sqlQuery, [], (_, { rows }) => {
        resolve(rows._array);
      }, (error)=> {

        console.log(error)
      });
    });
  });

  return menuItems
}


export const useUpdateEffect = (effect, dependencies = [])=>{
    const isInitialMount = useRef(true);

    useEffect(() => {
      if (isInitialMount.current) {
        isInitialMount.current = false;
      } else {
        return effect();
      }
    }, dependencies);
  }