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
  
  get traits() { return this.editing === AnimalType.Dog ? this.dogTraits : this.catTraits; }
  get animals() { return this.editing === AnimalType.Dog ? this.dogs : this.cats; }

  dogs: Animal[] = [];
  cats: Animal[] = [];

  drawerOpen = false;

  commonTraits: Trait[] = [
    { name: 'Keen Sense of Smell', description: 'Cats and Dogs have a highly developed sense of smell, which they use to explore their environment.' }
  ]

  dogTraits: Trait[] = [
    { name: 'Super Smell', description: 'Dogs have an extraordinary sense of smell, far superior to humans.' },
    { name: 'Powerful Bite', description: 'Dogs have powerful jaws and a strong bite, making them effective hunters.' },
    { name: 'Extreme Speed', description: 'Dogs are capable of running at high speeds, making them agile and quick.' },
    ...this.commonTraits
  ];

  catTraits: Trait[] = [
    { name: 'Night Vision', description: 'Cats have excellent night vision, allowing them to see in low light conditions.' },
    { name: 'Agility', description: 'Cats are incredibly agile and can jump great heights and distances.' },
    {  name: 'Sharp Claws', description: 'Cats have sharp retractable claws that they use for climbing and hunting.' },
    ...this.commonTraits
  ];

  onConfirm(updatedAnimalList: Animal[]) {
    if (this.editing === AnimalType.Dog) 
      this.dogs = updatedAnimalList;
    else 
      this.cats = updatedAnimalList;

    this.drawerOpen = false;
  }

  clearAnimals() {
    this.dogs = [];
    this.cats = [];
  }

  openDogs() { 
    this.editing = AnimalType.Dog; 
    this.drawerOpen = true; 
  }

  openCats() {
     this.editing = AnimalType.Cat; 
     this.drawerOpen = true; 
    }

}
