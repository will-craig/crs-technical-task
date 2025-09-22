import { Component, EventEmitter, HostListener, inject, Input, Output, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  constructor() { }

  @Input({required:true}) animal!: Animal;
  @Input({required:true}) availableTraits: Trait[] = [];
  @Input() open = false;

  @Output() closed = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Animal>();

  traitFilter: string = '';
  traitSort: 'asc' | 'desc' = 'asc';

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly title = signal('Animal Editor');
  
  get filteredSortedTraitsPool(): Trait[] {
    //available traits pool are traits not already selected
    let pool = this.availableTraits.filter(t => !this.selectedTraits.some(nt => nt.name === t.name)) ?? [];
    //apply filter where name includes filter text
    if (this.traitFilter && this.traitFilter.trim()) {
      pool = pool.filter((t: Trait) => t.name.toLowerCase().includes(this.traitFilter.trim().toLowerCase()));
    }
    //apply sort
    pool = [...pool].sort((a: Trait, b: Trait) => this.traitSort === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    return pool;
  }


  selectedTraits: Trait[] = [];

  moveTraitUp(index: number) {
    if (index > 0) {
      const temp = this.selectedTraits[index - 1];
      this.selectedTraits[index - 1] = this.selectedTraits[index];
      this.selectedTraits[index] = temp;
    }
  }

  moveTraitDown(index: number) {
    if (index < this.selectedTraits.length - 1) {
      const temp = this.selectedTraits[index + 1];
      this.selectedTraits[index + 1] = this.selectedTraits[index];
      this.selectedTraits[index] = temp;
    }
  }

  close() {
    this.selectedTraits = [];
    this.closed.emit();
  }

  // Close on ESC
  @HostListener('document:keydown.escape')
  onEsc() {
    if (this.open) this.close();
  }

  onConfirm() {
    this.animal.traits = this.selectedTraits;
    this.selectedTraits = [];
    this.confirm.emit(this.animal);
  }

  // Prevent scroll on body when open (optional)
  ngOnChanges() {
    if (!this.isBrowser) return; 
  
    if (this.open) {
      document.body.style.overflow = 'hidden';
      // Sync selectedTraits with animal.traits when editor opens
      this.selectedTraits = [...(this.animal?.traits ?? [])];
    } else {
      document.body.style.overflow = '';
    }
  }

  addTraitToSelected(trait: Trait) {
    if (this.selectedTraits && !this.selectedTraits.some(t => t.name === trait.name)) {
      this.selectedTraits.push(trait);
    }
  }

  removeTraitFromSelected(trait: Trait) {
    this.selectedTraits = this.selectedTraits.filter(t => t.name !== trait.name);
  }
  addAllTraits() {
    const missingTraits = this.availableTraits.filter(t => !this.selectedTraits.some(nt => nt.name === t.name));
    this.selectedTraits.push(...missingTraits);
  }

  clearAllTraits() {
    this.selectedTraits = [];
  }
}