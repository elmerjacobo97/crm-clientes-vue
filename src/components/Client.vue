<script setup>
import { computed } from 'vue';
const props = defineProps({
  client: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-client-status', 'delete-client']);

const nameClient = computed(() => `${props.client.name} ${props.client.lastname}`)
const statusClient = computed(() => props.client.status);


</script>


<template>
  <tr>
    <td class="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0">
      <p class="font-medium text-gray-600">{{ nameClient }}</p>
      <p class="text-gray-500">{{ client.email }}</p>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <p class="font-bold text-gray-600">{{ client.company }}</p>
      <p class="text-gray-500">{{ client.position }}</p>
    </td>
    <td class="px-3 py-4 text-sm whitespace-nowrap ">
      <!-- :class="{ 'bg-green-500': statusClient === 1, 'bg-red-500': statusClient === 0 }" -->
      <button type="button" class="px-3 py-0.5 text-white rounded-full leading-5  transition-all"
        :class="[statusClient ? 'bg-green-500' : 'bg-red-500']"
        @click="emit('update-client-status', { id: client.id, status: client.status })">
        {{ statusClient ? 'Activo' : 'Inactivo' }}
      </button>
    </td>
    <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
      <!-- params, query, hash -->
      <RouterLink :to="{ name: 'edit-client', params: { id: client.id } }"
        class="mr-5 text-indigo-400 transition hover:text-indigo-500">Editar
      </RouterLink>
      <!-- Puede ser con $emit('delete-client', client.id) or emit('delete-client', client.id) -->
      <button type="button" class="text-red-600 transition hover:text-red-500"
        @click="$emit('delete-client', client.id)">Eliminar</button>
    </td>
  </tr>
</template>


