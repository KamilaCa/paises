import axios from "axios";

export interface Country {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  flags: {
    png: string;
  };
  borders: string[];
  code: string;
  cca3: string;
  languages: string[];
  timezones: string[];
}

export async function getAllCountries(): Promise<Country[]> {
    try {
        const response = await axios.get<Country[]>(
            "https://restcountries.com/v3.1/all"
        );
        return response.data;
    } catch (error) {
        console.error("Error al listar todos los paises:", error);
        throw error;
    }
}

export async function getCountryDetails(code: string): Promise<Country[]> {
    try {
        const response = await axios.get<Country[]>(
            `https://restcountries.com/v3.1/alpha/${code}`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching country details:", error);
        throw error;
    }
}
