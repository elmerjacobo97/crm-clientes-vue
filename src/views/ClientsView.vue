<script setup>
import { onMounted, ref, computed } from "vue";
import HeadingTitle from "../components/ui/HeadingTitle.vue";
import RouterLink from "../components/ui/RouterLink.vue";
import Client from "../components/Client.vue";
import ClientService from "../services/ClientService";

defineProps({
  title: {
    type: String,
  },
});

const existingClients = computed(() => clients.value.length > 0);

const clients = ref([]);

onMounted(() => {
  getClients();
});

const getClients = async () => {
  try {
    const { data } = await ClientService.getClients();
    clients.value = data;
  } catch (error) {
    console.log(error);
  }
};

// Actualizar el estado del cliente
const updateClientStatus = ({ id, status }) => {
  try {
    // Cambiar el estado del cliente, si esta como 1 lo cambia a 0, si esta como 0 lo cambia a 1
    ClientService.updateStatusClient(id, !status);

    // Actualizar en la vista.
    const idx = clients.value.findIndex((client) => client.id === id);
    clients.value[idx].status = !status;
  } catch (error) {
    console.log('Error', error);
  }
}

// Eliminar un cliente
const deleteClient = (id) => {
  try {
    ClientService.deleteClient(id);

    // Actualizar en la vista.
    clients.value = clients.value.filter((client) => client.id !== id);
  } catch (error) {
    console.log('Error', error);
  }
}


</script>

<template>
  <div class="flex items-center justify-between">
    <HeadingTitle>{{ title }}</HeadingTitle>
    <RouterLink to="new-client">Nuevo cliente</RouterLink>
  </div>
  <div v-if="existingClients" class="flow-root p-5 mx-auto mt-10 bg-gray-900 shadow">
    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <table class="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-300">Nombre</th>
              <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-300">Empresa</th>
              <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-300">Estado</th>
              <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody class="bg-gray-900 divide-y divide-gray-800">
            <Client v-for="client in clients" :key="client.id" :client="client" @update-client-status="updateClientStatus"
              @delete-client="deleteClient" />
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <p v-else class="mt-5 text-2xl text-center text-gray-300">No hay clientes</p>
</template>
