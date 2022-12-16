import axios from "axios";

const api = axios.create({
  baseURL: "https://siddproject.azurewebsites.net",
});

const endpoints = {
  user: {
    login: `/loginapp`,
    insertPatient: `/insertPatient`,
    getPatients: `/getPatients`,
  },
  app: {
    insertAcolhimento: `/insertAcolhimento`,
    insertUnity: `/insertUnity`,
    insertPfeffer: `/insertPfeffer`,
    insertCDR: `/insertCDR`,
    insertGDS: `/insertGDS`,
    insertMoCA: `/insertMoCA`,
    insertMEEM: `/insertMEEM`,
    getSintomas: `/getSintomas`,
    insertTesteSintoma: `/insertTesteSintoma`,
  }
}

export { api, endpoints };