import { Component, ElementRef, HostListener, output, viewChildren } from '@angular/core';
import { SURVEY_CATEGORIES } from '../../../shared/utils/survey-categories';

@Component({
  selector: 'dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
  styleUrl: './dropdown-menu.scss',
})
/** Accessible category selector that emits the selected survey category. */
export class DropdownMenu {
  readonly categories = SURVEY_CATEGORIES;
  readonly categorySelected = output<string>();
  readonly categoryOptions = viewChildren<ElementRef<HTMLElement>>('categoryOption');
  isOpen = false;
  selectedCategory = '';

  get selectedCategoryLabel() {
    return this.categories.find((category) => category.value === this.selectedCategory)?.label ?? 'Sort by categories';
  }

  /** Closes the listbox when the user interacts outside this component. */
  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent) {
    if (event.target instanceof Node && !this.host.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private readonly host: ElementRef<HTMLElement>) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  /** Selects a category and closes the listbox. */
  selectCategory(category: (typeof SURVEY_CATEGORIES)[number]) {
    this.selectedCategory = category.value;
    this.isOpen = false;
    this.categorySelected.emit(category.value);
  }

  /** Handles listbox keyboard navigation from the trigger button. */
  onTriggerKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.openAndFocusOption(0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.openAndFocusOption(this.categories.length - 1);
    } else if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }

  /** Handles keyboard selection and navigation within the listbox. */
  onOptionKeyDown(event: KeyboardEvent, index: number) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusOption((index + 1) % this.categories.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusOption((index - 1 + this.categories.length) % this.categories.length);
        break;
      case 'Home':
        event.preventDefault();
        this.focusOption(0);
        break;
      case 'End':
        event.preventDefault();
        this.focusOption(this.categories.length - 1);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectCategory(this.categories[index]);
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        break;
    }
  }

  private openAndFocusOption(index: number) {
    this.isOpen = true;
    queueMicrotask(() => this.focusOption(index));
  }

  private focusOption(index: number) {
    this.categoryOptions()[index]?.nativeElement.focus();
  }
}
