import { Injectable, signal } from '@angular/core';

export interface ProfilData {
  firstName: string;
  lastName:  string;
  title:     string;
  location:  string;
  bio:       string;
}

export interface ContactData {
  email:    string;
  phone:    string;
  linkedin: string;
  github:   string;
}

const PROFIL_KEY  = 'portfolio_profil';
const CONTACT_KEY = 'portfolio_contact';

const DEFAULT_PROFIL: ProfilData = {
  firstName: 'Israe',
  lastName:  '',
  title:     'Développeuse Full-Stack · Angular & Node.js',
  location:  'Casablanca, Maroc',
  bio:       "Étudiante en génie logiciel passionnée par le développement web, les applications modernes et les nouvelles technologies.",
};

const DEFAULT_CONTACT: ContactData = {
  email:    'sana@devfolio.ma',
  phone:    '+212 6 00 00 00 00',
  linkedin: 'https://linkedin.com/in/sana-alaoui',
  github:   'https://github.com/sana-alaoui',
};

@Injectable({ providedIn: 'root' })
export class ProfilService {

  // ── Signals initialisés depuis localStorage ──
  profil  = signal<ProfilData>(this.loadProfil());
  contact = signal<ContactData>(this.loadContact());

  // ── Chargement ──
  private loadProfil(): ProfilData {
    try {
      const saved = localStorage.getItem(PROFIL_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PROFIL;
    } catch {
      return DEFAULT_PROFIL;
    }
  }

  private loadContact(): ContactData {
    try {
      const saved = localStorage.getItem(CONTACT_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CONTACT;
    } catch {
      return DEFAULT_CONTACT;
    }
  }

  // ── Sauvegarde ──
  updateProfil(data: ProfilData): void {
    this.profil.set(data);
    try { localStorage.setItem(PROFIL_KEY, JSON.stringify(data)); } catch {}
  }

  updateContact(data: ContactData): void {
    this.contact.set(data);
    try { localStorage.setItem(CONTACT_KEY, JSON.stringify(data)); } catch {}
  }

  // ── Reset ──
  reset(): void {
    localStorage.removeItem(PROFIL_KEY);
    localStorage.removeItem(CONTACT_KEY);
    this.profil.set(DEFAULT_PROFIL);
    this.contact.set(DEFAULT_CONTACT);
  }
}