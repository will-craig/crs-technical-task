import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Animal } from './domain/models/animal.model';
import { Trait } from './domain/models/traits.model';
import { AnimalType } from './domain/enums/animal-types.enum';
import { CommonModule } from '@angular/common';
import { Editor } from "./components/editor/editor";


@Component({
  selector: 'app-root',
  imports: [CommonModule, Editor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('crs-technical-task');

  constructor() { }

  editing: AnimalType = AnimalType.Dog;
  
  get traits() { return this.editing === AnimalType.Dog ? this.availableDogTraits : this.availableCatTraits; }
  get animal() { return this.editing === AnimalType.Dog ? this.dog : this.cat; }

  dog: Animal = { id: 1, type: AnimalType.Dog, traits: [] };
  cat: Animal = { id: 2, type: AnimalType.Cat, traits: [] };

  drawerOpen = false;

  commonTraits: Trait[] = [
    { name: 'Keen Sense of Smell', description: 'Cats and Dogs have a highly developed sense of smell, which they use to explore their environment.' },
    { name: 'Leadership', description: 'Both cats and dogs can exhibit leadership qualities within their social groups.' },
    { name: 'Lockpicking', description: 'Cats and Dogs are skilled at manipulating objects with their paws and mouths, allowing them to open containers and doors.' },
    { name: 'Advanced recon and infiltration', description: 'Cats and Dogs are adept at stealth and can move quietly to avoid detection, making them excellent at solo sneaking missions.' }
  ]

  availableDogTraits: Trait[] = [
    { name: 'Powerful Bite', description: 'Dogs have powerful jaws and a strong bite, making them effective hunters.' },
    { name: 'Extreme Speed', description: 'Dogs are capable of running at high speeds, making them agile and quick.' },
    { name: 'Loyalty', description: 'Dogs are known for their loyalty and strong bond with humans.' },

    ...this.commonTraits
  ];

  availableCatTraits: Trait[] = [
    { name: 'Night Vision', description: 'Cats have excellent night vision, allowing them to see in low light conditions.' },
    { name: 'Agility', description: 'Cats are incredibly agile and can jump great heights and distances.' },
    {  name:'Sharp Claws', description: 'Cats have sharp retractable claws that they use for climbing and hunting.' },
    ...this.commonTraits
  ];

  onConfirm(updatedAnimal: Animal) {
    if (this.editing === AnimalType.Dog) 
      this.dog = updatedAnimal;
    else 
      this.cat = updatedAnimal;

    this.drawerOpen = false;
  }

  clearAnimalTraits() {
    this.dog.traits = [];
    this.cat.traits = [];
  }

  openDogs() {
    this.editing = AnimalType.Dog;
    this.drawerOpen = true;
  }

  openCats() {
    this.editing = AnimalType.Cat;
    this.drawerOpen = true;
  }

  openEditorForAnimal(animal: Animal) {
    this.editing = animal.type;
    this.drawerOpen = true;
  }

}
