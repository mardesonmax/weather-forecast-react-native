import { WeatherDTO } from './WeatherDTO';

export interface WeatherTemperatureDTO extends WeatherDTO {
  description: string;
  temp: number;
  temp_min: number;
  temp_max: number;
}
