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

  @Input({required:true}) animal!: Animal;
  @Input({required:true}) availableTraits: Trait[] = [];
  @Input({required:true}) animalType!: AnimalType;
  @Input() open = false;

  @Output() closed = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Animal>();

  get traitsPool(): Trait[] {
    return this.availableTraits.filter(t => !this.newTraits.some(nt => nt.name === t.name));
  }

  newTraits: Trait[] = this.animal?.traits || [] ;

  close() {
    this.closed.emit();
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close();
  }

  onConfirm() {
    this.animal.traits = this.newTraits;
    this.confirm.emit(this.animal);
  }

  // Prevent scroll on body when open (optional)
  ngOnChanges() {
    if (this.open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  addTraitToSelected(trait: Trait) {
    if (this.newTraits && !this.newTraits.some(t => t.name === trait.name)) {
      this.newTraits.push(trait);
    }
  }

  removeTraitFromSelected(trait: Trait) {
    this.newTraits = this.newTraits.filter(t => t.name !== trait.name);
  }
  
  }
