import crmClientsApi from '../api/crmClientsApi'

export default {
  getClients() {
    return crmClientsApi.get('/clients')
  },
  addClient(client) {
    return crmClientsApi.post('/clients', client)
  },
  getClient(id) {
    return crmClientsApi.get(`/clients/${id}`)
  },
  updateClient(id, client) {
    // return crmClientsApi.put(`/clients/${id}`, client) // Actualiza y reemplaza
    return crmClientsApi.patch(`/clients/${id}`, client) // Actualiza parcialmente
  },
  deleteClient(id) {
    return crmClientsApi.delete(`/clients/${id}`)
  },
  updateStatusClient(id, status) {
    // status, es la columna de la tabla, !status es data
    return crmClientsApi.patch(`/clients/${id}`, { status })
  }
}
