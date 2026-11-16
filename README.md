# SILK-by-VPanda-Studio
SILK (Spatial Infrastructure &amp; Line Keeper) by VPanda Studio — interactive GIS web application for railway signaling (SRK), power, and GSM-R telecom asset management with offline JSON sync and maintenance logbook.

<div align="center">
  <img src="SILK/assets/SILK_Logo.png" alt="SILK by VPanda Logo" width="250" />
  <h1>SILK by VPanda</h1>
  <img src="SILK/assets/SILK_Logo.png" alt="SILK by VPanda Logo" width="250" />
  <p><strong>Spatial Infrastructure &amp; Line Keeper</strong></p>
  <p>
    Interactive GIS &amp; Maintenance Management Web Application for Railway Signaling (SRK), Power, and Telecom Infrastructure.
  </p>
</div>

## Overview

**SILK (Spatial Infrastructure & Line Keeper)** is a lightweight, browser-based GIS asset management and maintenance logbook application designed for railway signaling (SRK), power supply, and GSM-R telecommunication teams.

The application features a **hybrid architecture**: on startup, it attempts to synchronize with a configured REST/JSON server endpoint and seamlessly falls back to **100% offline local mode** using local `.json` database files and browser storage (`localStorage`).

## Key Features

- **19 Specialized Railway Asset & Building Categories:**
  - Signal Boxes (*Nastawnia*) & Local Control Centers (*LCS*)
  - Railway Turnouts & Point Machines (*Rozjazdy / Napędy EOR*)
  - Interlocking Controllers (*Sterowniki SRK / PLC*), Color-Light Signals (*Semafory*), Shunting/Distant Signals (*Tarcze Tm/To*)
  - Trackside Train Protection: AWS/SHP Track Magnets, ETCS Eurobalises, Axle Counters (*Liczniki osi*), Level Crossing Protection (*SSP*)
  - Wayside Cabinets, LV Power Switchgear (*Szafy energetyczne*), Overhead Catenary Masts (*Słupy trakcyjne*), Electric Point Heating (*EOR*), Derailers (*Wykolejnice*), WILD/DSAT Detectors
  - GSM-R Telecom Towers & Underground Cable Manholes (*Studzienki telekomunikacyjne*)
- **Maintenance & Fault Logbook:** Chronological service history per asset with date, time, technician signature, operational status (`Operational`, `Monitor`, `Fault`), and compressed JPEG photo attachments stored directly in JSON.
- **Direct GPS Navigation:** One-click integration with **Google Maps Directions** to route field technicians directly to any trackside asset.
- **Multi-Layer Map View:** Switch between Street/Rail Map (Esri), High-Resolution Satellite Imagery (Esri World Imagery), and Topographic Rail Map (OpenTopoMap) — no API keys required.
- **Bilingual Interface:** Instant switching between **Polish (PL — default)** and **English (EN)**.
- **Hybrid Server & Local `.JSON` File Sync:** Direct read/write to local `.json` files via the File System Access API (with automatic download fallback) plus optional REST API synchronization.

## Project Structure

```text
SILK-by-VPanda/
├── index.html          # Main standalone application (HTML5, Tailwind CSS, Leaflet.js)
├── assets/
│   ├── SILK_Logo.png   # Application & splash screen logo
│   └── favicon.ico     # Browser tab icon
├── .gitignore          # Prevents accidental upload of sensitive .json asset files
├── LICENSE             # MIT License
└── README.md           # Project documentation
