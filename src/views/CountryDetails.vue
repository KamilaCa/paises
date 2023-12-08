<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Detalles del País</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>Nombre:</ion-label>
          <ion-text>{{ countryDetails?.name?.common }}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Capital:</ion-label>
          <ion-text>{{ countryDetails?.capital?.[0] }}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Población:</ion-label>
          <ion-text>{{ countryDetails?.population }}</ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Fronteras:</ion-label>
          <ion-text>
            <ul>
              <li v-for="border in countryDetails?.borders" :key="border">
                {{ border }}
              </li>
            </ul>
          </ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Idiomas Oficiales:</ion-label>
          <ion-text>
            <ul>
              <li v-for="language in countryDetails?.languages" :key="language">
                {{ language }}
              </li>
            </ul>
          </ion-text>
        </ion-item>
        <ion-item>
          <ion-label>Zonas Horarias:</ion-label>
          <ion-text>
            <ul>
              <li v-for="timezone in countryDetails?.timezones" :key="timezone">
                {{ timezone }}
              </li>
            </ul>
          </ion-text>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getCountryDetails, Country } from "@/services/ServicesCountries";
import {
  IonList,
  IonItem,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonLabel,
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
    IonText,
    IonLabel,
  },
  data() {
    return {
      countryDetails: null as Country | null,
    };
  },
  methods: {
    async fetchCountryDetails() {
      try {
        // Obtener el código del país desde los parámetros de la ruta
        const code = this.$route.params.code;

        // Convertir a cadena si es una matriz de cadenas
        const countryCode = Array.isArray(code) ? code[0] : code;

        const response = await getCountryDetails(countryCode);
        this.countryDetails = response[0];
      } catch (error) {
        console.error("Error obteniendo detalles del país:", error);
      }
    },
  },
  mounted() {
    // Llamar a la función para obtener los detalles del país
    this.fetchCountryDetails();
  },
});
</script>

<style lang="scss" scoped>
ion-toolbar {
  --background: #3880ff;
  --color: #fff;
}

ion-title {
  font-size: 1.5rem;
}

ion-list {
  padding: 10px;
  ion-item {
    margin-bottom: 10px;
  }

  ion-label {
      font-weight: bold;
    }

    ion-text {
      font-size: 1.2rem;
  }

  ul{
    list-style: none;
    padding-left: 20px;
  }
}
</style>