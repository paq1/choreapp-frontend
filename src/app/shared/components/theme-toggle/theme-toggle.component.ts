import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  protected readonly isDark = signal(false);
  private readonly document = inject(DOCUMENT);

  constructor() {
    const storage = this.document.defaultView?.localStorage;
    const stored = storage?.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      this.isDark.set(stored === 'dark');
      this.applyTheme(stored);
      return;
    }

    const prefersDark =
      this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    this.isDark.set(prefersDark);
  }

  protected toggleTheme(): void {
    const next = this.isDark() ? 'light' : 'dark';
    this.isDark.set(next === 'dark');
    this.applyTheme(next);
    this.document.defaultView?.localStorage.setItem('theme', next);
  }

  private applyTheme(theme: 'light' | 'dark'): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
