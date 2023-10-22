<script setup>
import { FormKit } from "@formkit/vue";
import RouterLink from "../components/ui/RouterLink.vue";
import HeadingTitle from "../components/ui/HeadingTitle.vue";
import { useRouter } from "vue-router";
import ClientService from "../services/ClientService";

defineProps({
  title: {
    type: String,
  },
});

// const route = useRoute(); // Info de la ruta
const router = useRouter(); // Navegar a otra ruta

const handleSubmit = async (data) => {
  try {
    data.status = 1;
    await ClientService.addClient(data);

    // Redirect to home page
    router.push({ name: 'home' }); // Or router.push('/');
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
        <FormKit type="form" submit-label="Agregar cliente" incomplete-message="Por favor llena todos los campos"
          @submit="handleSubmit">
          <FormKit type="text" label="Nombre" name="name" placeholder="Nombre del cliente" validation="required"
            :validation-messages="{
              required: 'Este campo es requerido',
            }" />

          <FormKit type="text" label="Apellido" name="lastname" placeholder="Apellido del cliente" validation="required"
            :validation-messages="{
              required: 'Este campo es requerido',
            }" />

          <FormKit type="email" label="Email" name="email" placeholder="Email del cliente" validation="required|email"
            :validation-messages="{
              required: 'Este campo es requerido',
              email: 'Email invalido',
            }" />

          <FormKit type="text" label="Teléfono" name="phone" placeholder="Teléfono - 999 999 999"
            validation="?matches:/^[0-9]{3} [0-9]{3} [0-9]{3}$/" :validation-messages="{
              matches: 'Teléfono invalido',
            }" />

          <FormKit type="text" label="Empresa" name="company" placeholder="Nombre de la Empresa" />

          <FormKit type="text" label="Puesto" name="position" placeholder="Puesto del cliente" />

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
