const sequelize = require('./conn');

function isAuthenticated(): Promise<boolean> {
  return new Promise<boolean>((resolve, _reject) => {
    sequelize.authenticate()
      .then(async () => resolve(true))
      .catch((error: Error) => {
        console.error(error);
        setTimeout(() => resolve(false), 5000);
      });
  });
}

export function autoConnectionDB(): Promise<boolean> {
  return new Promise<boolean>(async (resolve, _reject) => {
    while(!(await isAuthenticated())) {
      console.log('Tentando reconectar no DB');
    }
    /* ==================== Sincroniza tabelas do Banco ==================== */
    const result = await sequelize.sync();
    console.log('Models synchronized with MySQL database', result?.models);

    /* resolve a Promise para liberar novas requisições */
    resolve(true);
  });
}
