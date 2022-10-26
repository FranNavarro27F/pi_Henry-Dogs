//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const { getTemperaments } = require("./src/controllers/Temperaments/index.js");
const {
  PGDATABASE,
  PGHOST,
  PGPORT,
  PGUSER,
  PGPASSWORD
} = process.env;
//corroborando si las variables de entorno andan o no en deploy
const PORT= 3001;

// Syncing all the models at once.
conn.sync({ alter: true }).then( () => {

  server.listen(process.env.PORT || PORT, async () => {
    
    await getTemperaments();
    const port= process.env.PGPORT ? process.env.PGPORT : PORT;
    
    console.log(`++listening at ${port}++`); // eslint-disable-line no-console
    console.log(
      PGDATABASE,
      PGHOST,
      PGPORT,
      PGUSER,
      PGPASSWORD
      
    )
  });
});
 