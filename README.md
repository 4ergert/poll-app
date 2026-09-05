# Poll App

Eine Angular-Webanwendung zum Erstellen und Anzeigen von Umfragen. Die Startseite bietet eine Umfrageübersicht, eine Liste bald endender Umfragen und einen Dialog zum Anlegen neuer Umfragen.

## Funktionen

- Anzeigen aktiver und vergangener Umfragen
- Hervorheben bald endender Umfragen
- Erstellen neuer Umfragen mit Fragen und Antwortoptionen
- Speichern und Abrufen von Umfragen über Supabase

## Voraussetzungen

- [Node.js](https://nodejs.org/)
- npm

## Installation

```bash
npm install
```

## Lokale Entwicklung

Den Entwicklungsserver starten:

```bash
npm start
```

Anschließend ist die Anwendung unter `http://localhost:4200/` erreichbar. Änderungen am Quellcode werden automatisch neu geladen.

## Produktions-Build

```bash
npm run build
```

Der optimierte Build wird unter `dist/poll-app/` erstellt.

## Projektstruktur

```text
src/
├── app/
│   ├── components/
│   │   ├── create-new-survey/  # Dialog zum Anlegen einer Umfrage
│   │   ├── home/               # Startseite, Header und Umfrageansichten
│   │   └── shared/             # Wiederverwendbare Komponenten, Modelle und Services
│   ├── app.routes.ts           # Routen der Anwendung
│   └── app.config.ts           # Anwendungs-Konfiguration
├── styles/                     # Globale SCSS-Styles
└── styles.scss                 # Globaler Style-Einstiegspunkt
```

## Technologien

- Angular 21
- TypeScript
- SCSS
- Supabase

## Weitere Befehle

Einen Entwicklungs-Build mit aktivem Watch-Modus erstellen:

```bash
npm run watch
```

Weitere Angular-CLI-Befehle sind über `npx ng --help` verfügbar.
