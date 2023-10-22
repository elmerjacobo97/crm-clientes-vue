<script setup>
import { onMounted, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { FormKit } from "@formkit/vue";
import RouterLink from "../components/ui/RouterLink.vue";
import HeadingTitle from "../components/ui/HeadingTitle.vue";
import ClientService from "../services/ClientService";

defineProps({
  title: {
    type: String,
  },
});

const router = useRouter(); // Navegar a otra ruta
const route = useRoute(); // recuperar información de la ruta

const { id } = route.params; // El id es el mismo que defines en la ruta.

const formData = reactive({});

onMounted(async () => {
  try {
    const { data } = await ClientService.getClient(id);
    // formData.name = data.name;
    // formData.lastname = data.lastname;
    // formData.email = data.email;
    // formData.phone = data.phone;
    // formData.company = data.company;
    // formData.position = data.position;

    Object.assign(formData, data);
  } catch (error) {
    console.log(error);
  }
})

const handleSubmit = async (data) => {
  try {
    // data.status = 1;
    try {
      await ClientService.updateClient(id, data);
      router.push({ name: 'home' });
    } catch (error) {
      console.log('Error', error);
    }
  } catch (error) {
    console.log('Error', error);
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <HeadingTitle>{{ title }}</HeadingTitle>
      <RouterLink to="home">Volver</RouterLink>
    </div>

    <div class="mx-auto my-5 bg-gray-900 shadow-sm">
      <div class="px-5 py-10 mx-auto md:w-2/3">
        <!-- :actions="false" -->
        <FormKit type="form" submit-label="Guardar cambios" incomplete-message="Por favor llena todos los campos"
          :value="formData" @submit="handleSubmit">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del cliente" validation="required"
            v-model="formData.name" :validation-messages="{
              required: 'Este campo es requerido',
            }" />

          <FormKit type="text" label="Apellido" name="lastname" placeholder="Apellido del cliente" validation="required"
            v-model="formData.lastname" :validation-messages="{
              required: 'Este campo es requerido',
            }" />

          <FormKit type="email" label="Email" name="email" placeholder="Email del cliente" validation="required|email"
            v-model="formData.email" :validation-messages="{
              required: 'Este campo es requerido',
              email: 'Email invalido',
            }" />

          <FormKit type="text" label="Teléfono" name="phone" placeholder="Teléfono - 999 999 999"
            v-model="formData.phone" validation="?matches:/^[0-9]{3} [0-9]{3} [0-9]{3}$/" :validation-messages="{
              matches: 'Teléfono invalido',
            }" />

          <FormKit type="text" label="Empresa" name="company" placeholder="Nombre de la Empresa"
            v-model="formData.company" />

          <FormKit type="text" label="Puesto" name="position" placeholder="Puesto del cliente"
            v-model="formData.position" />

          <!-- <FormKit type="submit" label="Agregar cliente" /> -->
        </FormKit>
      </div>
    </div>
  </div>

  <!-- 


    validation-visibility="live"
   -->
</template>

<style>
[data-invalid] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}

.formkit-wrapper {
  max-width: 100%;
}

.formkit-label {
  color: #f2f2f2;
}

.formkit-help {
  color: #8e8e8e;
}

.formkit-input {
  color: #f2f2f2;
}
</style>
