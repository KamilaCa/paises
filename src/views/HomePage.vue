<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="ligth">
        <ion-title>Consulta de Países</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item v-for="country in countries" :key="country.name.common" class="country-item">
          <img :src="country.flags.png" alt="Flag" class="flag-image" />
          {{ country.name.common }}
          <!-- Botón para ver detalles del país -->
          <ion-button @click="goToCountryDetails(country.cca3)">Ver Detalles</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { getAllCountries,Country } from "@/services/ServicesCountries";
import {
  IonList,
  IonItem,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonList,
    IonItem,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
  },
  setup() {
    const countries = ref<Country[]>([]);

    onMounted(async () => {
      try {
        countries.value = await getAllCountries();
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    });

    return {
      countries,
    };
  },

  props: {
    countries: Array,
  },

  methods: {
    goToCountryDetails(code: string) {
      this.$router.push({ name: "CountryDetails", params: { code } });
    },
  },
});
</script>

<style scoped lang="scss">
/* Estilos globales para toda la página */
ion-page {
  ion-content {
    background-color: #f5f5f5; /* Color de fondo de la página */
    padding: 20px;
  }
}

/* Estilos para la barra de navegación */
ion-toolbar {
  --background: #2196f3; /* Color de fondo de la barra de navegación */
  --color: #ffffff; /* Color del texto de la barra de navegación */
}

ion-button {
  --background: #4caf50; /* Color de fondo del botón */
  --color: #ffffff; /* Color del texto del botón */
  font-weight: bold;
}

ion-title {
  font-size: 1.5em;
  font-weight: bold;
}

ion-list {
  ion-item {
    transition: background-color 0.3s ease; /* Agrega una transición suave al cambiar el color de fondo */
    cursor: pointer;
  }

  ion-item:hover {
    background-color: #e0e0e0; /* Cambia el color de fondo al pasar el ratón sobre un elemento */
  }
}


/* Estilos para los elementos de la lista */
.country-item {
  border-bottom: 1px solid #ccc; /* Línea divisoria entre elementos de la lista */
  ion-item {
    padding: 10px; /* Espaciado interno de cada elemento de la lista */
    display: flex;
    align-items: center;
    justify-content: space-between;

    ion-label {
      font-size: 1.2em;
      font-weight: bold;
    }
  }
}

/* Estilos para la imagen de la bandera */
.flag-image {
  width: 50px;
  height: auto;
  margin-right: 10px;
}
</style>