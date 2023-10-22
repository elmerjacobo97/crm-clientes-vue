import axios from 'axios'

const crmClientsApi = axios.create({
  baseURL: 'http://localhost:4000'
})

export default crmClientsApi
