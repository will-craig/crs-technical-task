import { Component, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Trait } from '../../domain/models/traits.model';
import { Animal } from '../../domain/models/animal.model';
import { AnimalType } from '../../domain/enums/animal-types.enum';

@Component({
  selector: 'app-editor',
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css'
})
export class Editor {
  protected readonly title = signal('Animal Editor');

  constructor() { }

  @Input({required:true}) animals: Animal[] = [];
  @Input({required:true}) availableTraits: Trait[] = [];
  @Input({required:true}) animalType!: AnimalType;
  @Input() open = false;

  @Output() closed = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Animal[]>();

  newAnimal: Animal = { id: 1, name: '', type: this.animalType, traits: [] };

  close() {
    this.closed.emit();
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close();
  }

  onConfirm() {
    this.confirm.emit(this.animals);
  }

  // Prevent scroll on body when open (optional)
  ngOnChanges() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  createNewAnimal() {
    this.newAnimal = { id: this.animals.length + 1, name: '', type: this.animalType, traits: [] };
  }

  removeAnimal(animal: Animal) {
    this.animals = this.animals.filter(a => a.id !== animal.id);
  }

  saveNewAnimal() {
    if (this.newAnimal) {
      // Assign a unique id
      this.newAnimal.id = this.animals.length + 1;
      this.animals.push({ ...this.newAnimal });
      this.close();
      // Reset form for next open
      this.newAnimal = { id: 1, name: '', type: this.animalType, traits: [] };
    }
  }

  cancelNewAnimal() {
    this.close();
    this.newAnimal = { id: 1, name: '', type: this.animalType, traits: [] };
  }

  addAllTraits() {
    if (this.newAnimal) {
      this.newAnimal.traits = this.availableTraits;
    }
  }

  addTrait(trait: Trait) {
    if (this.newAnimal && !this.newAnimal.traits.includes(trait)) {
      this.newAnimal.traits.push(trait);
    }  
  }
  
  removeTrait(trait: Trait) {
    if (this.newAnimal) {
      this.newAnimal.traits = this.newAnimal.traits.filter(t => t.name !== trait.name);
    } 
  }

  removeAllTraits() {
    if (this.newAnimal) {
      this.newAnimal.traits = [];
    }
  }
  
  }
