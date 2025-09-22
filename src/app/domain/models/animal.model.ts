import { Trait } from "./traits.model";
import { AnimalType } from "../enums/animal-types.enum";

export interface Animal {
  id: number;
  type: AnimalType;
  traits: Trait[];
}

