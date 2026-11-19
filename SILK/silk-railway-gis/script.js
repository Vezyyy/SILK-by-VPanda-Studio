// =========================================================================
// 1. KONFIGURACJA LOGO Z FOLDERU ASSETS (SILK_Logo) I TŁUMACZENIA
// =========================================================================
const DEFAULT_SERVER_ENDPOINT = '';
let currentLang = 'pl';

function handleAssetLogoFallback(imgEl) {
    const step = parseInt(imgEl.dataset.fallbackStep || '0', 10);
    const candidates = [
        'assets/SILK_Logo.svg',
        'assets/SILK_Logo.jpg',
        'assets/SILK_Logo.jpeg',
        'assets/SILK_Logo.webp'
    ];
    if (step < candidates.length) {
        imgEl.dataset.fallbackStep = String(step + 1);
        imgEl.src = candidates[step];
    } else {
        imgEl.onerror = null;
        imgEl.outerHTML = `
            <svg class="w-full h-full" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 48V16M42 48V16" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
                <path d="M16 42h32M16 32h32M16 22h32" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
                <circle cx="22" cy="16" r="3.5" fill="#10b981"/>
                <circle cx="42" cy="16" r="3.5" fill="#3b82f6"/>
            </svg>
        `;
    }
}

const I18N = {
    pl: {
        splashStep1: '1. Ładowanie modułów mapy i logo aplikacji',
        splashStep2Connecting: '2. Próba nawiązania połączenia z serwerem...',
        splashStep2Success: '2. Połączono z serwerem — pobrano aktualne dane SRK',
        splashStep2Fallback: '2. Brak odpowiedzi serwera — przełączanie na tryb lokalny (.JSON)',
        splashStep3Wait: '3. Przygotowanie przestrzeni roboczej przed uruchomieniem',
        splashStep3Ready: '3. Gotowe! Uruchamianie mapy (dane lokalne + plik .JSON)',
        splashStep3ReadyOnline: '3. Gotowe! Uruchamianie mapy (synchronizacja z serwerem)',
        splashStatusInit: 'Inicjalizacja systemu SILK by VPanda...',
        splashStatusConnecting: 'Łączenie z serwerem ewidencji SRK...',
        splashStatusOfflineReady: 'Tryb lokalny aktywny — wczytano dane z pamięci / pliku .JSON. Uruchamianie...',
        splashStatusOnlineReady: 'Połączono z serwerem! Uruchamianie mapy...',
        loginModalTitle: 'Logowanie do systemu SILK',
        loginOfflineDesc: 'Brak połączenia z serwerem — możesz uruchomić aplikację lokalnie na pliku .JSON za pomocą przycisku poniżej.',
        demoModeBtn: 'Tryb Demo',
        loginUserLabel: 'Login / Użytkownik *',
        loginUserPlaceholder: 'Wpisz login...',
        loginPassLabel: 'Hasło *',
        serverSettingsBtn: 'Ustawienia serwera',
        loginBtn: 'Zaloguj',
        serverPillOnline: 'Serwer online',
        serverPillLocal: 'Tryb lokalny (.JSON)',
        serverModalTitle: 'Połączenie z serwerem i tryb lokalny (.JSON)',
        serverUrlLabel: 'Adres URL serwera API / zdalnego pliku JSON (opcjonalnie)',
        serverUrlHint: 'Serwer powinien zwracać tablicę JSON urządzeń lub obiekt {"devices": [...]} (GET) oraz przyjmować aktualizacje metodą POST/PUT. Jeśli serwer nie odpowiada, aplikacja automatycznie działa na pliku lokalnym .JSON.',
        useLocalOnlyBtn: 'Tylko tryb lokalny',
        testAndSaveServerBtn: 'Zapisz i połącz z serwerem',
        serverFooterBtn: 'Serwer / Offline',
        termsModalTitle: 'Warunki korzystania i bezpieczeństwo danych',
        termsModalSubtitle: 'SILK by VPanda — Spatial Infrastructure & Line Keeper',
        termsCriticalHeader: '⚠ OSTRZEŻENIE DOTYCZĄCE INFRASTRUKTURY KRYTYCZNEJ',
        termsCriticalBody: 'Zabrania się przekazywania, udostępniania osobom nieuprawnionym oraz publikowania w sieci (w tym w publicznych repozytoriach) plików .JSON zawierających rzeczywiste współrzędne, parametry techniczne, zdjęcia lub statusy awarii obiektów i urządzeń kolejowej infrastruktury krytycznej.',
        termsRule1: 'Aplikacja przy starcie próbuje nawiązać połączenie ze skonfigurowanym serwerem, a w przypadku jego braku automatycznie przełącza się w bezpieczny tryb lokalny (plik silk_assets.json oraz pamięć lokalna urządzenia).',
        termsRule2: 'Użytkownik ponosi pełną odpowiedzialność za właściwe zabezpieczenie, przechowywanie i poufność lokalnych plików eksportu .JSON zgodnie z obowiązującymi przepisami prawa oraz wewnętrznymi regulacjami bezpieczeństwa.',
        termsRule3: 'Korzystanie z aplikacji oznacza akceptację powyższych zasad bezpieczeństwa i warunków użytkowania.',
        termsCheckboxLabel: 'Akceptuję warunki korzystania i zobowiązuję się nie przekazywać ani nie udostępniać publicznie plików .JSON z danymi infrastruktury krytycznej.',
        termsAcceptBtn: 'Akceptuję i przechodzę do mapy',
        termsFooterBtn: 'Warunki',
        menuBtn: 'Menu',
        menuTooltip: 'Pokaż lub schowaj panel boczny z listą obiektów i urządzeń',
        logoTooltip: 'Logo aplikacji: assets/SILK_Logo (kliknij, aby podmienić lokalnie)',
        openJsonBtn: 'Scal / Otwórz JSON',
        openFileTooltip: 'Wczytaj plik .json z dysku, scal z obecną bazą i podepnij do autozapisu',
        newJsonBtn: 'Nowy JSON',
        newFileTooltip: 'Utwórz czysty plik bazy danych .json na dysku',
        saveJsonBtn: 'Zapisz JSON',
        saveFileTooltip: 'Zapisz zmiany do pliku bazy danych .json',
        addDeviceBtn: '+ Dodaj obiekt / urządzenie',
        addDeviceBtnShort: '+ Dodaj',
        expandListBtn: 'Rozwiń listę SRK',
        devicesHeader: 'Obiekty i urządzenia SRK',
        showAllBtn: 'Pokaż wszystkie',
        collapseBtn: '✕ Zwiń',
        searchPlaceholder: 'Szukaj nastawni, LCS, kontenera, przejazdu, km...',
        allTypesOption: 'Wszystkie obiekty i urządzenia kolejowe (21 typów)',
        filterAll: 'Wszystkie',
        filterOk: 'Sprawne',
        filterWarn: 'Monitorować',
        filterFault: 'Awaria',
        backToListBtn: 'Lista',
        editBtn: 'Edytuj',
        deleteBtn: 'Usuń',
        changePhotoBtn: 'Zmień zdjęcie',
        navigateGoogleMapsBtn: 'Nawiguj (Google Maps)',
        techDataHeader: 'Dane techniczne, kilometraż i nr inwentarzowy',
        noTechDesc: 'Brak dodatkowego opisu technicznego.',
        repairLogTitle: 'Dziennik napraw i usterek SRK',
        nowBtn: 'Teraz',
        roleLabel: 'Stanowisko / Rola *',
        authorLabel: 'Autor wpisu / Stanowisko *',
        authorPlaceholder: 'np. Jan Kowalski (Automatyk)',
        statusAfterLabel: 'Status po czynnościach',
        dateLabel: 'Data *',
        timeLabel: 'Godzina *',
        noteContentLabel: 'Opis usterki i wykonanych czynności *',
        notePlaceholder: 'np. Przegląd urządzeń nastawczych w budynku nastawni / LCS, regulacja suwaków kontrolnych napędu EOR.',
        notePhotoLabel: 'Zdjęcie usterki / serwisu (opcjonalnie)',
        addEntryBtn: 'Dodaj wpis i zapisz w pliku',
        serviceHistoryTitle: 'Historia czynności serwisowych',
        mapQuickHint: 'Kliknij dowolne miejsce na mapie, aby dodać Nastawnię, LCS, kontener lub urządzenie',
        mapClickBannerText: 'Kliknij miejsce na mapie, aby ustawić pozycję GPS obiektu',
        cancelBtn: 'Anuluj',
        mapLayersBtn: 'Warstwa mapy',
        layerStreet: 'Mapa (Esri)',
        layerSat: 'Satelita (Esri)',
        layerTopo: 'Tory / Topo',
        modalAddTitle: 'Dodaj obiekt lub urządzenie kolejowe',
        modalEditTitle: 'Edytuj obiekt:',
        modalSubtitle: 'Wybierz kategorię obiektu lub urządzenia SRK i zapisz w bazie danych .json',
        formTypeLabel: '1. Typ obiektu lub urządzenia kolejowego *',
        formNameLabel: '2. Nazwa obiektu / urządzenia kolejowego *',
        formNamePlaceholder: 'np. Nastawnia dysponująca Gd / Kontener SRK / Przejazd niestrzeżony',
        formInvLabel: 'Oznaczenie / Nr inwent.',
        formInvPlaceholder: 'np. Gd / K-SRK-1 / Rz-12',
        formStatusLabel: 'Status obiektu',
        formLatLabel: 'Szerokość GPS (Lat) *',
        formLngLabel: 'Długość GPS (Lng) *',
        pickOnMapBtn: 'Wskaż na mapie',
        formPhotoLabel: 'Zdjęcie budynku / urządzenia z dysku (opcjonalnie — zapisywane jako Base64 w pliku JSON)',
        formDescLabel: 'Opis techniczny / Kilometraż',
        formDescPlaceholder: 'np. Budynek nastawni dysponującej Gd, urządzenia komputerowe Ebilock 950, linia 009 km 326,450',
        saveDeviceBtn: 'Zapisz obiekt w pliku',
        saveEditBtn: 'Zapisz zmiany w pliku',
        emptyTitle: 'Brak obiektów i urządzeń na mapie',
        emptyDesc: 'Kliknij dowolne miejsce na mapie, aby dodać <strong>Nastawnię</strong>, <strong>LCS</strong>, <strong>kontener</strong> lub <strong>przejazd</strong>, albo scal plik <code>.json</code>.',
        emptyAddBtn: '+ Dodaj pierwszy obiekt kolejowy',
        emptyOpenBtn: 'Scal / Otwórz plik .json',
        noFilterTitle: 'Brak obiektów spełniających kryteria',
        noFilterDesc: 'Zmień wyszukiwaną frazę lub filtr typu/statusu.',
        lastEntryPrefix: 'Ostatni wpis:',
        noNotesItem: 'Brak wpisów w dzienniku napraw',
        noNotesHistoryTitle: 'Brak wpisów w dzienniku napraw dla tego obiektu.',
        noNotesHistoryDesc: 'Użyj formularza powyżej, aby zarejestrować czynność serwisową.',
        technicianPrefix: 'Autor / Stanowisko:',
        photoPlaceholderHint: 'Kliknij „Zmień zdjęcie”, aby dodać fotografię obiektu',
        statusOk: 'Sprawny',
        statusWarn: 'Monitorować',
        statusFault: 'Awaria',
        statusOkOpt: 'Sprawny (Zielony)',
        statusWarnOpt: 'Monitorować (Pomarańczowy)',
        statusFaultOpt: 'Awaria (Czerwony)',
        badgeConnected: 'Połączono:',
        badgeAutosave: 'autozapis',
        badgeFile: 'Plik:',
        badgeUnsaved: 'Niezapisane zmiany',
        badgeClickSave: 'kliknij Zapisz',
        badgeDisconnectedCached: 'Plik lokalny / pamięć',
        badgeDisconnectedEmpty: 'Plik lokalny / pamięć',
        gpsBtn: '📍 GPS',
        gpsActive: 'GPS aktywny',
        addAtGpsBtn: '+ Dodaj w miejscu GPS',
        gpsError: 'Brak sygnału GPS lub brak zgody na lokalizację',
        gpsBannerText: 'Twoja pozycja GPS jest śledzona na mapie',
        savedDbToast: 'Zapisano plik bazy danych .json'
    },
    en: {
        splashStep1: '1. Loading map modules and application logo',
        splashStep2Connecting: '2. Attempting to connect to the server...',
        splashStep2Success: '2. Connected to server — latest asset data fetched',
        splashStep2Fallback: '2. Server unreachable — switching to local mode (.JSON)',
        splashStep3Wait: '3. Preparing workspace before launch',
        splashStep3Ready: '3. Ready! Launching map (local storage + .JSON file)',
        splashStep3ReadyOnline: '3. Ready! Launching map (server sync active)',
        splashStatusInit: 'Initializing SILK by VPanda...',
        splashStatusConnecting: 'Connecting to railway asset server...',
        splashStatusOfflineReady: 'Local mode active — loaded from local storage / .JSON file. Launching...',
        splashStatusOnlineReady: 'Connected to server! Launching map...',
        loginModalTitle: 'Sign in to SILK System',
        loginOfflineDesc: 'No server connection — you can launch the app locally using .JSON storage with the button below.',
        demoModeBtn: 'Demo Mode',
        loginUserLabel: 'Username *',
        loginUserPlaceholder: 'Enter username...',
        loginPassLabel: 'Password *',
        serverSettingsBtn: 'Server Settings',
        loginBtn: 'Sign In',
        logoutBtn: 'Log out',
        logoutTooltip: 'Sign out of the system',
        serverPillOnline: 'Server Online',
        serverPillLocal: 'Local Mode (.JSON)',
        serverModalTitle: 'Server Connection & Local Mode (.JSON)',
        serverUrlLabel: 'Server API / Remote JSON URL (optional)',
        serverUrlHint: 'The server should return a JSON array of assets or {"devices": [...]} (GET) and accept updates via POST/PUT. If unreachable, the app runs locally using .JSON files.',
        useLocalOnlyBtn: 'Local Mode Only',
        testAndSaveServerBtn: 'Save & Connect to Server',
        serverFooterBtn: 'Server / Offline',
        termsModalTitle: 'Terms of Use & Critical Infrastructure Security Warning',
        termsModalSubtitle: 'SILK by VPanda — Spatial Infrastructure & Line Keeper',
        termsCriticalHeader: '⚠ CRITICAL INFRASTRUCTURE SECURITY WARNING',
        termsCriticalBody: 'It is strictly prohibited to transfer, share with unauthorized third parties, or publicly upload (including to public GitHub repositories) .JSON files containing real GPS coordinates, technical parameters, photographs, or fault logs of railway critical infrastructure.',
        termsRule1: 'On startup, the app attempts to connect to the configured server, and if unavailable, automatically switches to secure local mode (silk_assets.json file and browser local storage).',
        termsRule2: 'The user assumes full responsibility for securing, storing, and maintaining confidentiality of exported .JSON files in compliance with applicable laws and internal security regulations.',
        termsRule3: 'Using this application constitutes acceptance of these security rules and terms of use.',
        termsCheckboxLabel: 'I accept the terms of use and agree NOT to share or publicly distribute .JSON files containing critical infrastructure data.',
        termsAcceptBtn: 'I Accept & Continue to Map',
        termsFooterBtn: 'Terms',
        menuBtn: 'Menu',
        menuTooltip: 'Show or hide the railway assets sidebar',
        logoTooltip: 'App logo: assets/SILK_Logo (click to override locally)',
        openJsonBtn: 'Merge / Open JSON',
        openFileTooltip: 'Load .json from disk, merge with current assets, and link for auto-save',
        newJsonBtn: 'New JSON',
        newFileTooltip: 'Create a new empty .json database file on disk',
        saveJsonBtn: 'Save JSON',
        saveFileTooltip: 'Save all changes to .json database file',
        addDeviceBtn: '+ Add Asset',
        addDeviceBtnShort: '+ Add',
        expandListBtn: 'Expand Asset List',
        devicesHeader: 'Railway Buildings & Assets',
        showAllBtn: 'Fit all',
        collapseBtn: '✕ Hide',
        searchPlaceholder: 'Search signal box, LCS, container, crossing, km...',
        allTypesOption: 'All Railway Buildings, Signaling & Telecom Assets (21 types)',
        filterAll: 'All',
        filterOk: 'Operational',
        filterWarn: 'Monitor',
        filterFault: 'Fault',
        backToListBtn: 'List',
        editBtn: 'Edit',
        deleteBtn: 'Delete',
        changePhotoBtn: 'Change photo',
        navigateGoogleMapsBtn: 'Navigate (Google Maps)',
        techDataHeader: 'Technical Specifications, Mileage & Asset ID',
        noTechDesc: 'No additional technical description provided.',
        repairLogTitle: 'Maintenance & Fault Logbook',
        nowBtn: 'Now',
        roleLabel: 'Role / Position *',
        authorLabel: 'Author / Position *',
        authorPlaceholder: 'e.g. John Doe (Signaling Engineer)',
        statusAfterLabel: 'Status after service',
        dateLabel: 'Date *',
        timeLabel: 'Time *',
        noteContentLabel: 'Fault & Maintenance Description *',
        notePlaceholder: 'e.g. Signal box / LCS interlocking rack inspection, point machine detection rods adjusted.',
        notePhotoLabel: 'Fault / service photo (optional)',
        addEntryBtn: 'Add Log Entry & Save',
        serviceHistoryTitle: 'Maintenance & Fault History',
        mapQuickHint: 'Click anywhere on the map to add a Signal Box, LCS Center, Container, or Railway Asset',
        mapClickBannerText: 'Click on the map to set the GPS position of the building / asset',
        cancelBtn: 'Cancel',
        mapLayersBtn: 'Map Layer',
        layerStreet: 'Street Map (Esri)',
        layerSat: 'Satellite (Esri)',
        layerTopo: 'Rail / Topo',
        modalAddTitle: 'Add Railway Building or Asset',
        modalEditTitle: 'Edit Asset:',
        modalSubtitle: 'Select a building, container, crossing, or signaling asset and save to .json',
        formTypeLabel: '1. Building or Asset Type *',
        formNameLabel: '2. Building / Asset Name *',
        formNamePlaceholder: 'e.g. Main Signal Box Gd / SRK Container / Passive Crossing',
        formInvLabel: 'Code / Asset ID',
        formInvPlaceholder: 'e.g. Gd / K-SRK-1 / T-12',
        formStatusLabel: 'Operational Status',
        formLatLabel: 'Latitude (GPS) *',
        formLngLabel: 'Longitude (GPS) *',
        pickOnMapBtn: 'Pick on map',
        formPhotoLabel: 'Building / Asset Photo from disk (optional — stored as Base64 in JSON file)',
        formDescLabel: 'Technical Description / Line Mileage',
        formDescPlaceholder: 'e.g. Main Signal Box building, Ebilock 950 computer interlocking, Line 009 km 326.450',
        saveDeviceBtn: 'Save Asset to File',
        saveEditBtn: 'Save Changes to File',
        emptyTitle: 'No railway buildings or assets on the map yet',
        emptyDesc: 'Click anywhere on the map to add a <strong>Signal Box</strong>, <strong>LCS Center</strong>, <strong>container</strong>, or <strong>crossing</strong>, or merge a <code>.json</code> file.',
        emptyAddBtn: '+ Add First Railway Asset',
        emptyOpenBtn: 'Merge / Open .json file',
        noFilterTitle: 'No matching assets found',
        noFilterDesc: 'Try adjusting your search query or type/status filter.',
        lastEntryPrefix: 'Last entry:',
        noNotesItem: 'No maintenance entries yet',
        noNotesHistoryTitle: 'No maintenance or fault entries for this asset.',
        noNotesHistoryDesc: 'Use the form above to record a maintenance action.',
        technicianPrefix: 'Author / Role:',
        photoPlaceholderHint: 'Click "Change photo" to upload a building or asset photograph',
        statusOk: 'Operational',
        statusWarn: 'Monitor',
        statusFault: 'Fault',
        statusOkOpt: 'Operational (Green)',
        statusWarnOpt: 'Monitor (Amber)',
        statusFaultOpt: 'Fault (Red)',
        badgeConnected: 'Linked:',
        badgeAutosave: 'auto-save',
        badgeFile: 'File:',
        badgeUnsaved: 'Unsaved changes',
        badgeClickSave: 'click Save',
        badgeDisconnectedCached: 'Local file / storage',
        badgeDisconnectedEmpty: 'Local file / storage',
        gpsBtn: '📍 GPS',
        gpsActive: 'GPS Active',
        addAtGpsBtn: '+ Add at GPS',
        gpsError: 'GPS signal unavailable or location permission denied',
        gpsBannerText: 'Your GPS position is tracked on the map',
        savedDbToast: 'Saved .json database file'
    }
};

function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || I18N.pl[key] || key;
}

// =========================================================================
// 2. KATALOG 21 OBIEKTÓW I URZĄDZEŃ KOLEJOWYCH
// =========================================================================
const DEVICE_ICONS = {
    kontener: {
        pl: 'Kontener techniczny / Szafa aparaturowa',
        en: 'Technical Container / Equipment Shelter',
        hint_pl: 'Wolnostojący kontener techniczny lub budynek kontenerowy SRK / telefoniczny.',
        hint_en: 'Modular equipment shelter or technical container.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 6v12M17 6v12"/><path d="M10 12h4"/></svg>`
    },
    przejazd_pasywny: {
        pl: 'Przejazd kolejowo-drogowy (Nie-SSP)',
        en: 'Level Crossing (Non-SSP)',
        hint_pl: 'Przejazd niestrzeżony (krzyż św. Andrzeja, brak zapór/SSP).',
        hint_en: 'Passive level crossing with St. Andrew’s cross (non-SSP).',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M4.5 5.5l15 13"/><path d="M19.5 5.5l-15 13"/><path d="M12 11v8"/></svg>`
    },
    nastawnia: {
        pl: 'Nastawnia (dysponująca / wykonawcza)',
        en: 'Signal Box / Interlocking Tower',
        hint_pl: 'Budynek nastawni kolejowej z oknami nastawczymi.',
        hint_en: 'Railway signal box building with observation windows.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M3 10l9-6 9 6"/>
            <path d="M5 10v10h14V10"/>
            <rect x="7" y="12" width="10" height="3.5" rx="0.6" fill="currentColor" fill-opacity="0.3"/>
            <path d="M10.5 12v3.5M13.5 12v3.5M9 20v-2.5h6V20"/>
        </svg>`
    },
    lcs: {
        pl: 'LCS (Lokalne Centrum Sterowania)',
        en: 'LCS (Local Control Center)',
        hint_pl: 'Budynek Lokalnego Centrum Sterowania ruchem kolejowym ze stanowiskami.',
        hint_en: 'Local Control Center (LCS) building with dispatching consoles.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="16" rx="2"/>
            <rect x="6" y="7" width="5" height="4" rx="0.6" fill="currentColor" fill-opacity="0.3"/>
            <rect x="13" y="7" width="5" height="4" rx="0.6" fill="currentColor" fill-opacity="0.3"/>
            <path d="M6 15h12M8 18h8" stroke-width="1.8"/>
        </svg>`
    },
    rozjazd: {
        pl: 'Rozjazd kolejowy',
        en: 'Railway Turnout / Switch',
        hint_pl: 'Ikona torów z podkładami i iglicą rozjazdu.',
        hint_en: 'Track rails with sleepers and turnout switch blade.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M5 20V4"/><path d="M9 20V4"/>
            <path d="M9 15C11 11 13.5 8 18 4"/><path d="M12.5 14.5C14.5 11.5 16.5 9.5 20 6"/>
            <path d="M4 18h6M4 14h6M4 10h6M4 6h6" stroke-width="1.5"/>
            <path d="M12 12l2.5 1.5M14.5 9l2.5 1.5" stroke-width="1.5"/>
        </svg>`
    },
    rozjazd_naped: {
        pl: 'Rozjazd z napędem EOR',
        en: 'Turnout with Point Machine',
        hint_pl: 'Ikona rozjazdu z obudową napędu elektrycznego i cięgnem.',
        hint_en: 'Turnout with electric point machine housing and drive rod.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M9 20V4"/><path d="M12.5 20V4"/>
            <path d="M12.5 14C14.5 10.5 16.5 7.5 20 4.5"/><path d="M15.5 14.5C17 12 18.5 10 21 8"/>
            <rect x="2.5" y="11" width="5" height="6" rx="1" fill="currentColor" fill-opacity="0.25"/>
            <path d="M7.5 14h3.5"/><path d="M4.5 12.5l1 1.5h-1.5l1 1.5" stroke-width="1.5"/>
        </svg>`
    },
    kontroler_srk: {
        pl: 'Kontroler / Sterownik SRK (PLC)',
        en: 'Interlocking Controller / SRK PLC',
        hint_pl: 'Ikona kasety sterownika zależnościowego z modułami I/O i diodami.',
        hint_en: 'Interlocking controller rack with I/O modules and status LEDs.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="3.5" y="3" width="17" height="18" rx="2"/>
            <path d="M3.5 9h17M3.5 15.5h17" stroke-width="1.5"/>
            <rect x="6" y="5" width="3" height="2.4" rx="0.4" fill="currentColor" fill-opacity="0.3"/>
            <rect x="10.5" y="5" width="3" height="2.4" rx="0.4" fill="currentColor" fill-opacity="0.3"/>
            <rect x="15" y="5" width="3" height="2.4" rx="0.4" fill="currentColor" fill-opacity="0.3"/>
            <rect x="6" y="11" width="5" height="2.8" rx="0.5" fill="currentColor" fill-opacity="0.3"/>
            <rect x="13" y="11" width="5" height="2.8" rx="0.5" fill="currentColor" fill-opacity="0.3"/>
            <circle cx="7" cy="18.2" r="0.9" fill="currentColor"/>
            <circle cx="10" cy="18.2" r="0.9" fill="currentColor"/>
            <circle cx="13" cy="18.2" r="0.9" fill="currentColor"/>
            <path d="M15.5 18.2h2.5" stroke-width="1.8"/>
        </svg>`
    },
    semafor: {
        pl: 'Semafor świetlny',
        en: 'Main Color-Light Signal',
        hint_pl: 'Ikona masztu semafora kolejowego z komorami sygnałowymi.',
        hint_en: 'Railway signal mast with color-light aspects.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="8.5" y="2.5" width="7" height="14.5" rx="3.5"/>
            <circle cx="12" cy="6.2" r="1.3" fill="currentColor"/>
            <circle cx="12" cy="9.8" r="1.3"/>
            <circle cx="12" cy="13.4" r="1.3" fill="currentColor" fill-opacity="0.35"/>
            <path d="M12 17v4.5M8.5 21.5h7"/>
        </svg>`
    },
    tarcza: {
        pl: 'Tarcza manewrowa / ostrzegawcza (Tm / To)',
        en: 'Shunting / Distant Signal (Tm / To)',
        hint_pl: 'Ikona tarczy sygnalizacyjnej manewrowej lub ostrzegawczej.',
        hint_en: 'Shunting or distant signal indicator board.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <polygon points="12,2.5 19,9.5 12,16.5 5,9.5" fill="currentColor" fill-opacity="0.2"/>
            <circle cx="12" cy="7.2" r="1.2" fill="currentColor"/>
            <circle cx="12" cy="11.8" r="1.2" fill="currentColor"/>
            <path d="M12 16.5v5M8.5 21.5h7"/>
        </svg>`
    },
    shp: {
        pl: 'SHP (Rezonator torowy)',
        en: 'SHP / AWS Track Magnet',
        hint_pl: 'Ikona rezonatora torowego SHP zamocowanego przy szynie.',
        hint_en: 'Trackside SHP / AWS inductor mounted next to the rail.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M5 3v18M10 3v18"/>
            <rect x="13" y="8" width="7" height="8" rx="1.5" fill="currentColor" fill-opacity="0.25"/>
            <path d="M10 10h3M10 14h3"/>
        </svg>`
    },
    balisa: {
        pl: 'Balisa ETCS / Eurobalisa',
        en: 'ETCS Balise / Eurobalise',
        hint_pl: 'Ikona płyty Eurobalisy ETCS w osi toru między szynami.',
        hint_en: 'ETCS Eurobalise transponder mounted between rails.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M5 3v18M19 3v18"/>
            <rect x="8" y="8" width="8" height="8" rx="1.2" fill="currentColor" fill-opacity="0.25"/>
            <path d="M10 10l4 4M14 10l-4 4"/>
        </svg>`
    },
    licznik_osi: {
        pl: 'Licznik osi / Obwód torowy',
        en: 'Axle Counter / Track Circuit',
        hint_pl: 'Ikona szyny z głowicą czujnika koła i puszką przytorową.',
        hint_en: 'Rail wheel sensor head and trackside connection box.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M3 16h18"/><path d="M3 19h18" stroke-width="1.5"/>
            <rect x="7" y="10" width="10" height="6" rx="1.2" fill="currentColor" fill-opacity="0.25"/>
            <path d="M9.5 7.5a3.5 3.5 0 015 0" stroke-width="1.7"/>
            <path d="M7.5 5.2a6.5 6.5 0 019 0" stroke-width="1.5"/>
        </svg>`
    },
    przejazd_ssp: {
        pl: 'Przejazd kolejowo-drogowy (SSP)',
        en: 'Level Crossing Protection (SSP)',
        hint_pl: 'Ikona rogatki przejazdowej z krzyżem św. Andrzeja.',
        hint_en: 'Automatic level crossing barrier with St. Andrew’s cross.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M4.5 5.5l5 5M9.5 5.5l-5 5" stroke-width="2.2"/>
            <path d="M7 10.5v10"/>
            <rect x="4" y="15" width="6" height="5.5" rx="1" fill="currentColor" fill-opacity="0.25"/>
            <path d="M10 16.5l10.5-4.5" stroke-width="2.4"/>
            <circle cx="15.5" cy="14.3" r="1" fill="currentColor"/>
        </svg>`
    },
    szafa_srk: {
        pl: 'Szafa przytorowa / Zasilacz SRK',
        en: 'Trackside Signaling Cabinet (SRK)',
        hint_pl: 'Ikona szafy kablowej przytorowej SRK.',
        hint_en: 'Trackside signaling relay and cable cabinet.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="5" y="3" width="14" height="16" rx="1.5"/>
            <path d="M12 3v16M9 10v2M15 10v2M7 19v2M17 19v2"/>
        </svg>`
    },
    szafa_energetyczna: {
        pl: 'Szafa energetyczna / Rozdzielnica NN',
        en: 'Power Cabinet / LV Switchgear',
        hint_pl: 'Ikona szafy energetycznej i rozdzielnicy zasilającej NN.',
        hint_en: 'Railway power distribution cabinet and LV switchgear.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="5" y="2.5" width="14" height="19" rx="2"/>
            <path d="M12.8 7l-3.6 5h3.2l-1.2 5 3.8-5.2h-3.2L12.8 7z" fill="currentColor" fill-opacity="0.45"/>
            <path d="M8 19h8" stroke-width="1.6"/>
        </svg>`
    },
    wieza_tel: {
        pl: 'Wieża telekomunikacyjna (GSM-R)',
        en: 'GSM-R Telecom Tower',
        hint_pl: 'Ikona kratownicowego masztu radiowego GSM-R z antenami.',
        hint_en: 'Lattice GSM-R radio mast with sector antennas.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M12 5L7 21M12 5l5 16M8.5 16h7M9.8 11.5h4.4"/>
            <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
            <path d="M7.5 3.5a6 6 0 000 5M16.5 3.5a6 6 0 010 5"/>
        </svg>`
    },
    studzienka_tel: {
        pl: 'Studzienka telekomunikacyjna / Kablowa',
        en: 'Telecom / Cable Manhole',
        hint_pl: 'Ikona pokrywy studni kablowej telekomunikacyjnej SK-1 / SK-2.',
        hint_en: 'Underground fiber-optic and telecom cable manhole.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <rect x="4" y="5" width="16" height="14" rx="2"/>
            <rect x="7" y="8" width="10" height="8" rx="1" fill="currentColor" fill-opacity="0.2"/>
            <path d="M12 8v8M7 12h10"/>
        </svg>`
    },
    slup_trakcyjny: {
        pl: 'Słup sieci trakcyjnej / Odłącznik',
        en: 'OCS Mast / Line Disconnector',
        hint_pl: 'Ikona słupa trakcyjnego z wysięgnikiem i odłącznikiem sieci.',
        hint_en: 'Overhead catenary mast with cantilever and section disconnector.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M6 3v18M4 21h4"/><path d="M6 7h13M6 12l9-5"/><path d="M15 7v5"/>
        </svg>`
    },
    dsat: {
        pl: 'DSAT (Detekcja Stanów Awaryjnych Taboru)',
        en: 'WILD / Hot Axle Box Detector (DSAT)',
        hint_pl: 'Ikona bramki przytorowej czujników DSAT.',
        hint_en: 'Wayside rolling stock fault & hot axle box detection portal.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M4 19h16"/><path d="M6 19V7l6-3 6 3v12"/>
            <circle cx="12" cy="12" r="2.5" fill="currentColor" fill-opacity="0.25"/>
        </svg>`
    },
    ogrzewanie_eor: {
        pl: 'Elektryczne Ogrzewanie Rozjazdów (EOR)',
        en: 'Electric Point Heating (EOR)',
        hint_pl: 'Ikona szyny z grzałką i symbolem grzania EOR.',
        hint_en: 'Rail heating elements for winter turnout protection.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M3 16h18"/><path d="M4 19h16" stroke-width="2.4"/>
            <path d="M7 12c-1-1.5 1-3 0-4.5"/><path d="M12 12c-1-1.5 1-3 0-4.5"/><path d="M17 12c-1-1.5 1-3 0-4.5"/>
            <path d="M5 13.5h14" stroke-width="1.5" stroke-dasharray="2 2"/>
        </svg>`
    },
    wykolejnica: {
        pl: 'Wykolejnica / Rygiel zwrotnicowy',
        en: 'Derailer / Facing Point Lock',
        hint_pl: 'Ikona szyny z blokadą wykolejnicy / ryglem.',
        hint_en: 'Track derailer block or mechanical switch lock.',
        svg: `<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
            <path d="M3 17h18"/><path d="M4 20h16" stroke-width="1.5"/>
            <polygon points="7,17 11,9 16,13 15,17" fill="currentColor" fill-opacity="0.3"/>
            <path d="M11 9l4-4M13.5 4.5h3v3"/>
        </svg>`
    }
};

const STATUS_STYLES = {
    OK: {
        circleBg: '#10b981',
        badgeClass: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
    },
    WARN: {
        circleBg: '#f59e0b',
        badgeClass: 'bg-amber-100 text-amber-800 border border-amber-200'
    },
    FAULT: {
        circleBg: '#ef4444',
        badgeClass: 'bg-rose-100 text-rose-800 border border-rose-200'
    }
};

function getStatusLabel(statusKey) {
    if (statusKey === 'WARN') return t('statusWarn');
    if (statusKey === 'FAULT') return t('statusFault');
    return t('statusOk');
}

function getDeviceTypeLabel(typeKey) {
    const cfg = DEVICE_ICONS[typeKey] || DEVICE_ICONS.rozjazd;
    return currentLang === 'en' ? cfg.en : cfg.pl;
}

function getDeviceTypeHint(typeKey) {
    const cfg = DEVICE_ICONS[typeKey] || DEVICE_ICONS.rozjazd;
    return currentLang === 'en' ? cfg.hint_en : cfg.hint_pl;
}

// =========================================================================
// 3. STAN APLIKACJI, LOGOWANIE, SERWER I PLIK LOKALNY (.json)
// =========================================================================
const LOCAL_BACKUP_KEY = 'silk_vpanda_assets_v1';
const AUTHOR_STORAGE_KEY = 'silk_vpanda_author_v1';
const ROLE_STORAGE_KEY = 'silk_vpanda_role_v1';
const LOGO_STORAGE_KEY = 'silk_vpanda_custom_logo_v1';
const LANG_STORAGE_KEY = 'silk_vpanda_lang_v1';
const TERMS_ACCEPTED_KEY = 'silk_vpanda_terms_accepted_v1';
const SERVER_URL_STORAGE_KEY = 'silk_vpanda_server_url_v1';
const LOGGED_USER_STORAGE_KEY = 'silk_vpanda_logged_user_v1';

let devices = [];
let selectedDeviceId = null;
let activeStatusFilter = 'ALL';

let serverEndpointUrl = '';
let isServerConnected = false;
let loggedInUser = '';

let connectedFileHandle = null;
let connectedFileName = 'silk_assets.json';
let unsavedChangesCount = 0;
let lastFileUiState = 'empty_start';

let leafletMap = null;
let tileLayers = {};
let leafletMarkers = {};
let draftClickMarker = null;
let isPickingMapCoords = false;
let formDevicePhotoBase64 = '';
let notePhotosBase64 = [];
let isDrawerOpen = true;

// =========================================================================
// 4. SEKWENCJA STARTOWA: LOGO -> PRÓBA POŁĄCZENIA Z SERWEREM -> LOGOWANIE
// =========================================================================
window.addEventListener('DOMContentLoaded', async () => {
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    if (savedLang === 'en' || savedLang === 'pl') {
        currentLang = savedLang;
    }

    const savedLogo = localStorage.getItem(LOGO_STORAGE_KEY);
    if (savedLogo) {
        applyCustomLogoToDOM(savedLogo);
    }

    serverEndpointUrl = (localStorage.getItem(SERVER_URL_STORAGE_KEY) ?? DEFAULT_SERVER_ENDPOINT).trim();
    loggedInUser = (localStorage.getItem(LOGGED_USER_STORAGE_KEY) || '').trim();

    applyLanguageToUI();
    updateLoggedInUserBadge();
    initLeafletMap();
    setNowInNoteForm();

    const savedAuthor = localStorage.getItem(AUTHOR_STORAGE_KEY);
    if (savedAuthor) {
        document.getElementById('noteAuthor').value = savedAuthor;
    }
    const savedRole = localStorage.getItem(ROLE_STORAGE_KEY);
    if (savedRole) {
        const roleSel = document.getElementById('noteAuthorRole');
        if (roleSel) {
            roleSel.value = savedRole;
            onRoleSelectChange();
        }
    }

    if (window.innerWidth < 640) {
        closeDrawer();
    } else {
        openDrawer();
    }

    window.addEventListener('resize', () => {
        if (leafletMap) leafletMap.invalidateSize();
    });

    await runStartupSequence();
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function tryConnectAndFetchFromServer(url) {
    if (!url) return null;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) return null;
        const parsed = await response.json();
        const rawList = Array.isArray(parsed) ? parsed : (Array.isArray(parsed.devices) ? parsed.devices : null);
        if (!rawList) return null;
        return rawList.map((item, idx) => normalizeDevice(item, idx));
    } catch (err) {
        clearTimeout(timeoutId);
        return null;
    }
}

async function syncChangesToServerIfConnected() {
    if (!isServerConnected || !serverEndpointUrl) return false;
    try {
        const res = await fetch(serverEndpointUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system: 'SILK by VPanda',
                updatedAt: new Date().toISOString(),
                user: loggedInUser || 'Demo',
                devices: devices
            })
        });
        return res.ok;
    } catch (e) {
        isServerConnected = false;
        updateServerPillUI();
        updateLoginModalState();
        return false;
    }
}

async function runStartupSequence() {
    const bar = document.getElementById('splashProgressBar');
    const step2Icon = document.getElementById('splashStep2Icon');
    const step2Text = document.getElementById('splashStep2Text');
    const step3Icon = document.getElementById('splashStep3Icon');
    const step3Text = document.getElementById('splashStep3Text');
    const statusText = document.getElementById('splashStatusText');

    bar.style.width = '38%';
    step2Text.textContent = t('splashStep2Connecting');
    statusText.textContent = t('splashStatusConnecting');
    await sleep(550);

    bar.style.width = '72%';
    const serverDevices = await tryConnectAndFetchFromServer(serverEndpointUrl);

    if (serverDevices !== null) {
        isServerConnected = true;
        devices = serverDevices;
        cacheToLocalStorage();

        step2Icon.className = 'w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold';
        step2Icon.textContent = '✓';
        step2Text.className = 'text-xs text-emerald-300 font-semibold';
        step2Text.textContent = t('splashStep2Success');

        step3Icon.className = 'w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold';
        step3Icon.textContent = '✓';
        step3Text.className = 'text-xs text-white font-semibold';
        step3Text.textContent = t('splashStep3ReadyOnline');
        statusText.textContent = t('splashStatusOnlineReady');
        updateFileStatusUI('connected_saved');
    } else {
        isServerConnected = false;
        loadInitialData();

        step2Icon.className = 'w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold';
        step2Icon.textContent = '!';
        step2Text.className = 'text-xs text-amber-300 font-semibold';
        step2Text.textContent = t('splashStep2Fallback');

        step3Icon.className = 'w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold';
        step3Icon.textContent = '✓';
        step3Text.className = 'text-xs text-white font-semibold';
        step3Text.textContent = t('splashStep3Ready');
        statusText.textContent = t('splashStatusOfflineReady');
    }

    updateServerPillUI();
    renderAll();
    if (devices.length > 0) fitMapToAllDevices();

    bar.style.width = '100%';
    await sleep(850);

    const splash = document.getElementById('splashScreen');
    if (splash) splash.classList.add('splash-hidden');
    if (leafletMap) leafletMap.invalidateSize();

    if (localStorage.getItem(TERMS_ACCEPTED_KEY) !== 'true') {
        document.getElementById('termsModal').classList.remove('hidden');
    } else if (!loggedInUser) {
        openLoginModal();
    }
}

function updateLoginModalState() {
    const userInput = document.getElementById('loginUsernameInput');
    const passInput = document.getElementById('loginPasswordInput');
    const notice = document.getElementById('loginOfflineNotice');

    if (userInput) userInput.value = '';
    if (passInput) passInput.value = '';

    if (!isServerConnected) {
        if (notice) notice.classList.remove('hidden');
    } else {
        if (notice) notice.classList.add('hidden');
    }
}

function openLoginModal() {
    updateLoginModalState();
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLoginModal() {
            document.getElementById('loginModal').classList.add('hidden');
        }

        function logoutUser() {
            loggedInUser = '';
            localStorage.removeItem(LOGGED_USER_STORAGE_KEY);
            updateLoggedInUserBadge();
            openLoginModal();
            showToast(
                currentLang === 'en' ? 'You have been logged out.' : 'Wylogowano z systemu.',
                'info'
            );
        }

function updateLoggedInUserBadge() {
    const badgeText = document.getElementById('currentUserBadgeText');
    if (badgeText) {
        badgeText.textContent = loggedInUser || t('demoModeBtn');
    }
}

function enterDemoMode() {
    loggedInUser = t('demoModeBtn');
    localStorage.setItem(LOGGED_USER_STORAGE_KEY, loggedInUser);
    updateLoggedInUserBadge();
    closeLoginModal();
    if (leafletMap) leafletMap.invalidateSize();
    showToast(
        currentLang === 'en' ? 'Demo Mode enabled (local .JSON).' : 'Uruchomiono Tryb Demo (lokalny plik .JSON).',
        'info'
    );
}

async function handleLoginSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsernameInput').value.trim();
    const password = document.getElementById('loginPasswordInput').value;

    if (!username || !password) return;

    if (!isServerConnected || !serverEndpointUrl) {
        showToast(
            currentLang === 'en'
                ? 'No server configured — use "Demo Mode" button.'
                : 'Brak połączenia z serwerem — użyj przycisku „Tryb Demo”.',
            'info'
        );
        return;
    }

    try {
        const loginUrl = serverEndpointUrl.replace(/\/+$/, '') + '/login';
        const res = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            showToast(currentLang === 'en' ? 'Invalid server credentials.' : 'Błędny login lub hasło na serwerze.', 'error');
            return;
        }
    } catch (e) {
        isServerConnected = false;
        updateServerPillUI();
        updateLoginModalState();
        showToast(
            currentLang === 'en'
                ? 'Server unreachable — switch to Demo Mode.'
                : 'Serwer nie odpowiada — możesz wejść w Trybie Demo.',
            'error'
        );
        return;
    }

    loggedInUser = username;
    localStorage.setItem(LOGGED_USER_STORAGE_KEY, loggedInUser);
    updateLoggedInUserBadge();

    const authorInput = document.getElementById('noteAuthor');
    if (authorInput && !authorInput.value.trim()) {
        const role = document.getElementById('noteAuthorRole').value;
        authorInput.value = role && role !== 'Inny' ? `${loggedInUser} (${role})` : loggedInUser;
    }

    closeLoginModal();
    if (leafletMap) leafletMap.invalidateSize();
    showToast(
        currentLang === 'en' ? `Logged in as ${loggedInUser}` : `Zalogowano jako ${loggedInUser}`,
        'success'
    );
}

function updateServerPillUI() {
    const pill = document.getElementById('serverStatusPill');
    const dot = document.getElementById('serverStatusDot');
    const text = document.getElementById('serverStatusText');
    if (!pill) return;

    if (isServerConnected) {
        pill.className = 'hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer shrink-0';
        dot.className = 'w-2 h-2 rounded-full bg-emerald-500 shrink-0';
        text.textContent = t('serverPillOnline');
    } else {
        pill.className = 'hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition cursor-pointer shrink-0';
        dot.className = 'w-2 h-2 rounded-full bg-amber-500 shrink-0';
        text.textContent = t('serverPillLocal');
    }
}

function openServerConfigModal() {
    document.getElementById('serverEndpointInput').value = serverEndpointUrl;
    const statusBox = document.getElementById('serverModalCurrentStatus');
    statusBox.textContent = isServerConnected
        ? `Status: ${t('serverPillOnline')} (${serverEndpointUrl})`
        : `Status: ${t('serverPillLocal')} (${connectedFileName})`;
    document.getElementById('serverConfigModal').classList.remove('hidden');
}

function closeServerConfigModal() {
    document.getElementById('serverConfigModal').classList.add('hidden');
}

async function saveAndTestServerEndpoint() {
    const url = document.getElementById('serverEndpointInput').value.trim();
    serverEndpointUrl = url;
    localStorage.setItem(SERVER_URL_STORAGE_KEY, url);

    if (!url) {
        isServerConnected = false;
        updateServerPillUI();
        updateLoginModalState();
        closeServerConfigModal();
        showToast(currentLang === 'en' ? 'Switched to local mode (.JSON).' : 'Przełączono na tryb lokalny (.JSON).', 'info');
        return;
    }

    showToast(currentLang === 'en' ? 'Connecting to server...' : 'Łączenie z serwerem...', 'info');
    const remoteDevices = await tryConnectAndFetchFromServer(url);
    if (remoteDevices !== null) {
        isServerConnected = true;
        devices = remoteDevices;
        cacheToLocalStorage();
        updateServerPillUI();
        updateLoginModalState();
        renderAll();
        if (devices.length > 0) fitMapToAllDevices();
        closeServerConfigModal();
        showToast(currentLang === 'en' ? 'Connected to server!' : 'Połączono z serwerem!', 'success');
    } else {
        isServerConnected = false;
        updateServerPillUI();
        updateLoginModalState();
        closeServerConfigModal();
        showToast(
            currentLang === 'en'
                ? 'Server unreachable — working locally with .JSON file.'
                : 'Nie udało się połączyć z serwerem — praca lokalna na pliku .JSON.',
            'error'
        );
    }
}

function clearServerEndpoint() {
    serverEndpointUrl = '';
    isServerConnected = false;
    localStorage.removeItem(SERVER_URL_STORAGE_KEY);
    document.getElementById('serverEndpointInput').value = '';
    updateServerPillUI();
    updateLoginModalState();
    closeServerConfigModal();
    showToast(currentLang === 'en' ? 'Local mode (.JSON) enabled.' : 'Włączono tryb lokalny (.JSON).', 'info');
}

function toggleAcceptTermsBtn() {
    const cb = document.getElementById('termsAcceptCheckbox');
    const btn = document.getElementById('acceptTermsBtn');
    if (cb.checked) {
        btn.disabled = false;
        btn.className = 'px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition cursor-pointer';
    } else {
        btn.disabled = true;
        btn.className = 'px-5 py-2.5 rounded-xl bg-slate-300 text-slate-500 text-xs font-extrabold transition cursor-not-allowed';
    }
}

function acceptTermsAndEnter() {
    const cb = document.getElementById('termsAcceptCheckbox');
    if (!cb.checked) return;
    localStorage.setItem(TERMS_ACCEPTED_KEY, 'true');
    document.getElementById('termsModal').classList.add('hidden');
    if (!loggedInUser) {
        openLoginModal();
    } else if (leafletMap) {
        leafletMap.invalidateSize();
    }
}

function reopenTermsModal() {
    document.getElementById('termsAcceptCheckbox').checked = (localStorage.getItem(TERMS_ACCEPTED_KEY) === 'true');
    toggleAcceptTermsBtn();
    document.getElementById('termsModal').classList.remove('hidden');
}

function setLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'pl';
    localStorage.setItem(LANG_STORAGE_KEY, currentLang);
    applyLanguageToUI();
    renderAll();
}

function applyLanguageToUI() {
    document.documentElement.lang = currentLang;

    const btnPL = document.getElementById('langBtnPL');
    const btnEN = document.getElementById('langBtnEN');
    if (currentLang === 'pl') {
        btnPL.className = 'px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-extrabold bg-slate-900 text-white transition cursor-pointer';
        btnEN.className = 'px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer';
    } else {
        btnEN.className = 'px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-extrabold bg-slate-900 text-white transition cursor-pointer';
        btnPL.className = 'px-1.5 sm:px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer';
    }

    document.getElementById('termsModalTitle').textContent = t('termsModalTitle');
    document.getElementById('termsModalSubtitle').textContent = t('termsModalSubtitle');
    document.getElementById('termsCriticalHeader').textContent = t('termsCriticalHeader');
    document.getElementById('termsCriticalBody').textContent = t('termsCriticalBody');
    document.getElementById('termsRulesList').innerHTML = `
        <li>${t('termsRule1')}</li>
        <li>${t('termsRule2')}</li>
        <li>${t('termsRule3')}</li>
    `;
    document.getElementById('termsCheckboxLabel').textContent = t('termsCheckboxLabel');
    document.getElementById('acceptTermsBtn').textContent = t('termsAcceptBtn');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (I18N[currentLang][key]) {
            el.textContent = I18N[currentLang][key];
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        if (I18N[currentLang][key]) {
            el.title = I18N[currentLang][key];
        }
    });

    document.getElementById('loginUsernameInput').placeholder = t('loginUserPlaceholder');
    document.getElementById('searchInput').placeholder = t('searchPlaceholder');
    document.getElementById('noteAuthor').placeholder = t('authorPlaceholder');
    document.getElementById('noteContent').placeholder = t('notePlaceholder');
    document.getElementById('formDevName').placeholder = t('formNamePlaceholder');
    document.getElementById('formDevInventory').placeholder = t('formInvPlaceholder');
    document.getElementById('formDevDesc').placeholder = t('formDescPlaceholder');
    document.getElementById('splashStep1Text').textContent = t('splashStep1');

    rebuildTypeAndStatusSelects();
    updateFormIconPreview();
    updateServerPillUI();
    updateLoggedInUserBadge();
    updateFileStatusUI(lastFileUiState);
}

function rebuildTypeAndStatusSelects() {
    const filterSel = document.getElementById('typeFilterSelect');
    const prevFilterVal = filterSel.value || 'ALL';
    filterSel.innerHTML = `<option value="ALL">${t('allTypesOption')}</option>` +
        Object.keys(DEVICE_ICONS).map(key => `<option value="${key}">${getDeviceTypeLabel(key)}</option>`).join('');
    filterSel.value = prevFilterVal;

    const modalSel = document.getElementById('deviceType');
    const prevModalVal = modalSel.value || 'nastawnia';
    modalSel.innerHTML = Object.keys(DEVICE_ICONS)
        .map(key => `<option value="${key}">${getDeviceTypeLabel(key)}</option>`).join('');
    modalSel.value = prevModalVal;

    const formStatusSel = document.getElementById('formDevStatus');
    const prevFormStatus = formStatusSel.value || 'OK';
    formStatusSel.innerHTML = `
        <option value="OK">${t('statusOkOpt')}</option>
        <option value="WARN">${t('statusWarnOpt')}</option>
        <option value="FAULT">${t('statusFaultOpt')}</option>
    `;
    formStatusSel.value = prevFormStatus;

    const noteStatusSel = document.getElementById('noteStatus');
    const prevNoteStatus = noteStatusSel.value || 'OK';
    noteStatusSel.innerHTML = `
        <option value="OK">${t('statusOk')}</option>
        <option value="WARN">${t('statusWarn')}</option>
        <option value="FAULT">${t('statusFault')}</option>
    `;
    noteStatusSel.value = prevNoteStatus;
}

function handleCustomLogoUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const dataUrl = e.target.result;
        try {
            localStorage.setItem(LOGO_STORAGE_KEY, dataUrl);
        } catch (err) {
            console.warn('Logo too large for localStorage');
        }
        applyCustomLogoToDOM(dataUrl);
        showToast(currentLang === 'en' ? 'Custom VPanda logo updated!' : 'Zaktualizowano własne logo VPanda!', 'success');
    };
    reader.readAsDataURL(file);
    event.target.value = '';
}

function applyCustomLogoToDOM(dataUrl) {
    const imgHtml = `<img src="${dataUrl}" alt="VPanda Logo" class="w-full h-full object-contain">`;
    const headerSlot = document.getElementById('headerLogoSlot');
    const splashSlot = document.getElementById('splashLogoSlot');
    if (headerSlot) headerSlot.innerHTML = imgHtml;
    if (splashSlot) splashSlot.innerHTML = imgHtml;
}

function openDrawer() {
    isDrawerOpen = true;
    document.getElementById('sidebarDrawer').classList.remove('drawer-closed');
    document.getElementById('floatingOpenBtn').classList.add('hidden');
}

function closeDrawer() {
    isDrawerOpen = false;
    document.getElementById('sidebarDrawer').classList.add('drawer-closed');
    document.getElementById('floatingOpenBtn').classList.remove('hidden');
    if (leafletMap) leafletMap.invalidateSize();
}

function toggleDrawer() {
    if (isDrawerOpen) closeDrawer();
    else openDrawer();
}

function updateFormIconPreview() {
    const typeKey = document.getElementById('deviceType').value || 'nastawnia';
    const statusKey = document.getElementById('formDevStatus').value || 'OK';
    const iconCfg = DEVICE_ICONS[typeKey] || DEVICE_ICONS.nastawnia;
    const stCfg = STATUS_STYLES[statusKey] || STATUS_STYLES.OK;

    const box = document.getElementById('formDevIconPreviewBox');
    const hint = document.getElementById('formDevIconDescHint');
    box.innerHTML = iconCfg.svg;
    box.style.backgroundColor = stCfg.circleBg;
    hint.textContent = getDeviceTypeHint(typeKey);
}

function initLeafletMap() {
    leafletMap = L.map('leafletMapContainer', {
        zoomControl: false
    }).setView([54.3558, 18.6442], 14);

    L.control.zoom({ position: 'topright' }).addTo(leafletMap);

    tileLayers.street = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    tileLayers.sat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
    });

    tileLayers.topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        maxZoom: 17,
        attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap (CC-BY-SA)'
    });

    tileLayers.street.addTo(leafletMap);

    setTimeout(() => leafletMap.invalidateSize(), 120);

    leafletMap.on('click', (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        if (isPickingMapCoords) {
            document.getElementById('formDevLat').value = lat.toFixed(6);
            document.getElementById('formDevLng').value = lng.toFixed(6);
            showDraftPinOnMap(lat, lng);
            finishMapPickMode();
            return;
        }

        openDeviceFormModal(null, lat, lng);
    });
}

function toggleMobileLayerMenu() {
    document.getElementById('mobileLayerDropdown').classList.toggle('hidden');
}

function switchMapLayer(layerName) {
    Object.values(tileLayers).forEach(layer => {
        if (leafletMap.hasLayer(layer)) leafletMap.removeLayer(layer);
    });
    if (tileLayers[layerName]) {
        tileLayers[layerName].addTo(leafletMap);
    }

    const btnMap = {
        street: 'btnLayerStreet',
        sat: 'btnLayerSat',
        topo: 'btnLayerTopo'
    };

    const mobileBtnMap = {
        street: 'mBtnLayerStreet',
        sat: 'mBtnLayerSat',
        topo: 'mBtnLayerTopo'
    };

    Object.entries(btnMap).forEach(([key, btnId]) => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.className = (key === layerName)
                ? 'px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white transition cursor-pointer'
                : 'px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer';
        }
        const mBtn = document.getElementById(mobileBtnMap[key]);
        if (mBtn) {
            mBtn.className = (key === layerName)
                ? 'px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white text-left transition cursor-pointer'
                : 'px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 text-left transition cursor-pointer';
        }
    });

    setTimeout(() => {
        leafletMap.invalidateSize();
        renderMapMarkers();
    }, 60);
}

function showDraftPinOnMap(lat, lng) {
    removeDraftPinFromMap();
    if (!leafletMap) return;
    draftClickMarker = L.circleMarker([lat, lng], {
        radius: 10,
        color: '#2563eb',
        weight: 3,
        fillColor: '#60a5fa',
        fillOpacity: 0.75
    }).addTo(leafletMap);
}

function removeDraftPinFromMap() {
    if (draftClickMarker && leafletMap) {
        leafletMap.removeLayer(draftClickMarker);
        draftClickMarker = null;
    }
}

// =========================================================================
// 5. WCZYTYWANIE, SCALANIE I AUTOZAPIS ZEWNĘTRZNEGO PLIKU (.json)
// =========================================================================
function loadInitialData() {
    try {
        const cached = localStorage.getItem(LOCAL_BACKUP_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
                devices = parsed.map((d, i) => normalizeDevice(d, i));
                updateFileStatusUI('disconnected_cached');
                return;
            }
        }
    } catch (e) {
        console.warn('Local storage read warning:', e);
    }

    devices = [];
    updateFileStatusUI('empty_start');
}

function normalizeDevice(raw, index = 0) {
    const validIcon = DEVICE_ICONS[raw.icon] ? raw.icon : 'rozjazd';
    const validStatus = STATUS_STYLES[raw.status] ? raw.status : 'OK';
    return {
        id: String(raw.id || ('SILK-' + String(index + 1).padStart(3, '0'))),
        name: String(raw.name || raw.title || `Asset #${index + 1}`),
        inventoryCode: String(raw.inventoryCode || raw.code || ''),
        icon: validIcon,
        status: validStatus,
        description: String(raw.description || ''),
        lat: parseFloat(raw.lat ?? raw.latitude ?? 54.3558),
        lng: parseFloat(raw.lng ?? raw.longitude ?? 18.6442),
        image: String(raw.image || raw.imageUrl || ''),
        notes: Array.isArray(raw.notes) ? raw.notes.map((n, nIdx) => {
            let normalizedPhotos = [];
            if (Array.isArray(n.photos)) {
                normalizedPhotos = n.photos.filter(Boolean).map(String);
            } else if (n.photo) {
                normalizedPhotos = [String(n.photo)];
            }
            return {
                id: n.id || (Date.now() + nIdx),
                date: String(n.date || ''),
                time: String(n.time || ''),
                author: String(n.author || 'Technik'),
                statusAfter: STATUS_STYLES[n.statusAfter] ? n.statusAfter : validStatus,
                content: String(n.content || ''),
                photos: normalizedPhotos,
                photo: normalizedPhotos[0] || ''
            };
        }) : []
    };
}

function mergeIncomingDevices(incomingList) {
    let addedCount = 0;
    incomingList.forEach((raw, idx) => {
        const norm = normalizeDevice(raw, devices.length + idx);
        const exists = devices.some(d =>
            d.id === norm.id ||
            (Math.abs(d.lat - norm.lat) < 0.00001 && Math.abs(d.lng - norm.lng) < 0.00001 && d.name === norm.name)
        );
        if (!exists) {
            devices.push(norm);
            addedCount++;
        }
    });
    return addedCount;
}

async function openAndConnectFile() {
    if ('showOpenFilePicker' in window) {
        try {
            const [fileHandle] = await window.showOpenFilePicker({
                types: [{
                    description: 'SILK Railway Assets (JSON)',
                    accept: { 'application/json': ['.json'] }
                }],
                multiple: false
            });
            const file = await fileHandle.getFile();
            const text = await file.text();
            const parsed = JSON.parse(text);
            const rawList = Array.isArray(parsed) ? parsed : (parsed.devices || []);

            const addedCount = mergeIncomingDevices(rawList);
            connectedFileHandle = fileHandle;
            connectedFileName = fileHandle.name;
            unsavedChangesCount = 0;

            cacheToLocalStorage();
            await syncChangesToServerIfConnected();
            closeDeviceDetails();
            renderAll();
            fitMapToAllDevices();
            updateFileStatusUI('connected_saved');
            showToast(
                currentLang === 'en'
                    ? `Merged ${addedCount} new assets from ${connectedFileName} (total: ${devices.length})`
                    : `Scalono ${addedCount} nowych obiektów z ${connectedFileName} (łącznie: ${devices.length})`,
                'success'
            );
            return;
        } catch (err) {
            if (err.name === 'AbortError') return;
        }
    }
    document.getElementById('fallbackFileInput').click();
}

function handleFallbackFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            const parsed = JSON.parse(e.target.result);
            const rawList = Array.isArray(parsed) ? parsed : (parsed.devices || []);
            const addedCount = mergeIncomingDevices(rawList);

            connectedFileHandle = null;
            connectedFileName = file.name;
            unsavedChangesCount = 0;

            cacheToLocalStorage();
            await syncChangesToServerIfConnected();
            closeDeviceDetails();
            renderAll();
            fitMapToAllDevices();
            updateFileStatusUI('loaded_readonly');
            showToast(
                currentLang === 'en'
                    ? `Merged ${addedCount} new assets from ${file.name} (total: ${devices.length}).`
                    : `Scalono ${addedCount} nowych obiektów z pliku ${file.name} (łącznie: ${devices.length}).`,
                'success'
            );
        } catch (err) {
            showToast(currentLang === 'en' ? 'Invalid JSON file format.' : 'Błąd formatu pliku JSON.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

async function createNewEmptyFile() {
    const jsonString = JSON.stringify([], null, 2);

    if ('showSaveFilePicker' in window) {
        try {
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: 'silk_assets.json',
                types: [{
                    description: 'SILK Railway Assets (JSON)',
                    accept: { 'application/json': ['.json'] }
                }]
            });
            const writable = await fileHandle.createWritable();
            await writable.write(jsonString);
            await writable.close();

            connectedFileHandle = fileHandle;
            connectedFileName = fileHandle.name;
            devices = [];
            unsavedChangesCount = 0;

            cacheToLocalStorage();
            await syncChangesToServerIfConnected();
            closeDeviceDetails();
            renderAll();
            updateFileStatusUI('connected_saved');
            showToast(t('savedDbToast'), 'success');
            return;
        } catch (err) {
            if (err.name === 'AbortError') return;
        }
    }

    triggerBrowserDownload(jsonString, 'silk_assets.json');
    devices = [];
    connectedFileHandle = null;
    connectedFileName = 'silk_assets.json';
    unsavedChangesCount = 0;
    cacheToLocalStorage();
    closeDeviceDetails();
    renderAll();
    updateFileStatusUI('loaded_readonly');
    showToast(t('savedDbToast'), 'success');
}

async function persistChangesToExternalFile(forceDownloadFallback = false) {
    cacheToLocalStorage();
    await syncChangesToServerIfConnected();
    const jsonString = JSON.stringify(devices, null, 2);

    if (connectedFileHandle) {
        try {
            const writable = await connectedFileHandle.createWritable();
            await writable.write(jsonString);
            await writable.close();
            unsavedChangesCount = 0;
            updateFileStatusUI('connected_saved');
            showToast(t('savedDbToast'), 'success');
            return true;
        } catch (err) {
            console.warn('Auto-save handle warning:', err);
        }
    }

    if (forceDownloadFallback) {
        triggerBrowserDownload(jsonString, connectedFileName || 'silk_assets.json');
        unsavedChangesCount = 0;
        updateFileStatusUI('loaded_readonly');
        showToast(t('savedDbToast'), 'success');
        return true;
    }

    unsavedChangesCount++;
    updateFileStatusUI('unsaved');
    return false;
}

async function saveOrDownloadFile(forceDownload = true) {
    await persistChangesToExternalFile(forceDownload);
}

function updateFileStatusUI(state) {
    lastFileUiState = state;
    const badge = document.getElementById('fileConnectionBadge');
    const dot = document.getElementById('fileStatusDot');
    const text = document.getElementById('fileStatusText');
    const counterBadge = document.getElementById('unsavedCounterBadge');

    if (unsavedChangesCount > 0) {
        counterBadge.textContent = unsavedChangesCount;
        counterBadge.classList.remove('hidden');
    } else {
        counterBadge.classList.add('hidden');
    }

    if (state === 'connected_saved') {
        badge.className = 'hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 truncate max-w-[230px]';
        dot.className = 'w-2 h-2 rounded-full bg-emerald-500 shrink-0';
        text.textContent = `${t('badgeConnected')} ${connectedFileName} (${t('badgeAutosave')} • ${devices.length})`;
    } else if (state === 'loaded_readonly') {
        badge.className = 'hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 truncate max-w-[230px]';
        dot.className = 'w-2 h-2 rounded-full bg-blue-500 shrink-0';
        text.textContent = `${t('badgeFile')} ${connectedFileName} (${devices.length})`;
    } else if (state === 'unsaved') {
        badge.className = 'hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300 truncate max-w-[230px]';
        dot.className = 'w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0';
        text.textContent = `${t('badgeUnsaved')} (${unsavedChangesCount}) — ${t('badgeClickSave')}`;
    } else if (state === 'disconnected_cached') {
        badge.className = 'hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[230px]';
        dot.className = 'w-2 h-2 rounded-full bg-blue-500 shrink-0';
        text.textContent = `${t('badgeDisconnectedCached')} (${devices.length})`;
    } else {
        badge.className = 'hidden lg:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[230px]';
        dot.className = 'w-2 h-2 rounded-full bg-slate-400 shrink-0';
        text.textContent = t('badgeDisconnectedEmpty');
    }
}

function cacheToLocalStorage() {
    try {
        localStorage.setItem(LOCAL_BACKUP_KEY, JSON.stringify(devices));
    } catch (e) {
        console.warn('localStorage limit exceeded.');
    }
}

function triggerBrowserDownload(content, filename = 'silk_assets.json') {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const timestamp = `${day}-${month}-${year}_${hours}-${minutes}`;
    const dynamicFilename = filename.replace('silk_assets.json', `silk_${timestamp}_assets.json`);

    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dynamicFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// =========================================================================
// 6. RENDEROWANIE MARKERÓW OBIEKTÓW I LISTY
// =========================================================================
function renderAll() {
    renderDevicesList();
    renderMapMarkers();
    if (selectedDeviceId) {
        const dev = devices.find(d => d.id === selectedDeviceId);
        if (dev) {
            renderDeviceDetails(dev);
        } else {
            closeDeviceDetails();
        }
    }
}

function getFilteredDevices() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const typeFilter = document.getElementById('typeFilterSelect').value;

    return devices.filter(dev => {
        if (activeStatusFilter !== 'ALL' && dev.status !== activeStatusFilter) return false;
        if (typeFilter !== 'ALL' && dev.icon !== typeFilter) return false;
        if (!query) return true;

        const inName = dev.name.toLowerCase().includes(query);
        const inInv = (dev.inventoryCode || '').toLowerCase().includes(query);
        const inDesc = (dev.description || '').toLowerCase().includes(query);
        const inNotes = (dev.notes || []).some(n =>
            (n.content || '').toLowerCase().includes(query) || (n.author || '').toLowerCase().includes(query)
        );
        return inName || inInv || inDesc || inNotes;
    });
}

function setStatusFilter(status) {
    activeStatusFilter = status;
    ['ALL', 'OK', 'WARN', 'FAULT'].forEach(st => {
        const btn = document.getElementById('filter_' + st);
        if (!btn) return;
        if (st === status) {
            btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 text-white transition shrink-0 cursor-pointer';
        } else {
            btn.className = 'px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition shrink-0 cursor-pointer';
        }
    });
    renderAll();
}

function renderMapMarkers() {
    const filtered = getFilteredDevices();

    if (leafletMap) {
        Object.values(leafletMarkers).forEach(m => leafletMap.removeLayer(m));
        leafletMarkers = {};

        filtered.forEach(dev => {
            const isSelected = dev.id === selectedDeviceId;
            const iconCfg = DEVICE_ICONS[dev.icon] || DEVICE_ICONS.rozjazd;
            const stCfg = STATUS_STYLES[dev.status] || STATUS_STYLES.OK;
            const typeLabel = getDeviceTypeLabel(dev.icon);
            const statusLabel = getStatusLabel(dev.status);
            const notesCount = (dev.notes || []).length;

            const markerHtml = `
                <div class="device-map-marker ${isSelected ? 'selected' : ''}" title="${escapeHtml(dev.name)} (${escapeHtml(typeLabel)} • ${escapeHtml(statusLabel)})">
                    <div class="device-circle-icon" style="background-color: ${stCfg.circleBg};">
                        ${iconCfg.svg}
                        ${notesCount > 0 ? `<span class="device-repairs-badge">${notesCount}</span>` : ''}
                    </div>
                    <div class="device-pointer-tip"></div>
                    <div class="device-name-tag">${escapeHtml(dev.name)}</div>
                </div>
            `;

            const divIcon = L.divIcon({
                html: markerHtml,
                className: 'leaflet-div-icon',
                iconSize: [210, 78],
                iconAnchor: [105, 53]
            });

            const marker = L.marker([dev.lat, dev.lng], { icon: divIcon }).addTo(leafletMap);
            marker.on('click', () => {
                if (isPickingMapCoords) return;
                selectDevice(dev.id);
            });

            leafletMarkers[dev.id] = marker;
        });
    }
}

function renderDevicesList() {
    const container = document.getElementById('devicesListContainer');
    const filtered = getFilteredDevices();
    document.getElementById('devicesCount').textContent = devices.length;
    const floatingCountEl = document.getElementById('floatingDevicesCount');
    if (floatingCountEl) floatingCountEl.textContent = devices.length;

    if (devices.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 px-4 space-y-3">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                </div>
                <div>
                    <p class="text-sm font-extrabold text-slate-800">${t('emptyTitle')}</p>
                    <p class="text-xs text-slate-500 mt-1 leading-relaxed">${t('emptyDesc')}</p>
                </div>
                <div class="pt-1 flex flex-col gap-2">
                    <button type="button" onclick="openDeviceFormModal(null)" class="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition cursor-pointer">
                        ${t('emptyAddBtn')}
                    </button>
                    <button type="button" onclick="openAndConnectFile()" class="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer">
                        ${t('emptyOpenBtn')}
                    </button>
                </div>
            </div>
        `;
        return;
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="text-center py-10 px-4">
                <p class="text-sm font-bold text-slate-700">${t('noFilterTitle')}</p>
                <p class="text-xs text-slate-500 mt-1">${t('noFilterDesc')}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(dev => {
        const iconCfg = DEVICE_ICONS[dev.icon] || DEVICE_ICONS.rozjazd;
        const stCfg = STATUS_STYLES[dev.status] || STATUS_STYLES.OK;
        const typeLabel = getDeviceTypeLabel(dev.icon);
        const statusLabel = getStatusLabel(dev.status);
        const notes = dev.notes || [];
        const lastNote = notes[0];
        const isSelected = dev.id === selectedDeviceId;

        return `
            <div onclick="selectDevice('${dev.id}')" class="group cursor-pointer rounded-2xl border ${isSelected ? 'border-blue-500 bg-blue-50/50 shadow-xs' : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'} p-3 transition space-y-2">
                <div class="flex items-center gap-3">
                    <div class="w-11 h-11 rounded-full flex items-center justify-center text-white shrink-0 shadow-xs" style="background-color: ${stCfg.circleBg};">
                        ${iconCfg.svg}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between gap-2">
                            <h4 class="text-xs sm:text-sm font-bold text-slate-900 truncate group-hover:text-blue-600 transition">${escapeHtml(dev.name)}</h4>
                            <span class="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold ${stCfg.badgeClass}">
                                ${statusLabel}
                            </span>
                        </div>
                        <p class="text-[11px] text-slate-500 truncate mt-0.5">
                            ${dev.inventoryCode ? `<span class="font-mono font-bold text-slate-700">[${escapeHtml(dev.inventoryCode)}]</span> • ` : ''}${escapeHtml(typeLabel)}
                        </p>
                    </div>
                </div>

                ${lastNote ? `
                    <div class="bg-slate-50 rounded-xl px-2.5 py-2 border border-slate-100 text-[11px] text-slate-600">
                        <div class="flex items-center justify-between text-[10px] font-semibold text-slate-400 mb-0.5">
                            <span>${t('lastEntryPrefix')} ${escapeHtml(lastNote.date)} ${escapeHtml(lastNote.time)}</span>
                            <span>${escapeHtml(lastNote.author || '')}</span>
                        </div>
                        <p class="line-clamp-1 text-slate-700 font-medium">${escapeHtml(lastNote.content)}</p>
                    </div>
                ` : `
                    <div class="text-[11px] text-slate-400 italic px-1">
                        ${t('noNotesItem')}
                    </div>
                `}
            </div>
        `;
    }).join('');
}

// =========================================================================
// 7. SZCZEGÓŁY OBIEKTU I DZIENNIK NAPRAW / USTEREK
// =========================================================================
function selectDevice(deviceId) {
    selectedDeviceId = deviceId;
    const dev = devices.find(d => d.id === deviceId);
    if (!dev) return;

    if (leafletMap) {
        leafletMap.flyTo([dev.lat, dev.lng], Math.max(leafletMap.getZoom(), 16), { duration: 0.65 });
    }

    openDrawer();
    renderMapMarkers();
    renderDeviceDetails(dev);
}

function renderDeviceDetails(dev) {
    document.getElementById('devicesListView').classList.add('hidden');
    document.getElementById('deviceDetailView').classList.remove('hidden');

    const stCfg = STATUS_STYLES[dev.status] || STATUS_STYLES.OK;
    const typeLabel = getDeviceTypeLabel(dev.icon);
    const statusLabel = getStatusLabel(dev.status);

    const fallbackSvgImg = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="300" viewBox="0 0 600 300">
            <rect width="600" height="300" fill="#1e293b"/>
            <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" fill="#cbd5e1" font-family="sans-serif" font-size="20" font-weight="bold">${dev.name}</text>
            <text x="50%" y="59%" dominant-baseline="middle" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="13">${t('photoPlaceholderHint')}</text>
        </svg>`
    )}`;

    document.getElementById('detailImage').src = dev.image ? dev.image : fallbackSvgImg;
    document.getElementById('detailTitle').textContent = dev.name;

    const invBadge = document.getElementById('detailInventoryBadge');
    if (dev.inventoryCode) {
        invBadge.textContent = dev.inventoryCode;
        invBadge.classList.remove('hidden');
    } else {
        invBadge.classList.add('hidden');
    }

    const latVal = Number(dev.lat);
    const lngVal = Number(dev.lng);
    document.getElementById('detailCoords').textContent = `${latVal.toFixed(6)}, ${lngVal.toFixed(6)}`;

    const navBtn = document.getElementById('detailGoogleMapsNavBtn');
    if (navBtn) {
        navBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(latVal + ',' + lngVal)}`;
    }

    document.getElementById('detailDescription').textContent = dev.description || t('noTechDesc');
    document.getElementById('detailTypeBadge').textContent = typeLabel;

    const statusBadge = document.getElementById('detailStatusBadge');
    statusBadge.className = `px-2.5 py-0.5 rounded-full text-[10px] font-bold ${stCfg.badgeClass}`;
    statusBadge.textContent = statusLabel;

    document.getElementById('noteStatus').value = dev.status || 'OK';

    renderNotesHistory(dev);
}

function closeDeviceDetails() {
    selectedDeviceId = null;
    document.getElementById('deviceDetailView').classList.add('hidden');
    document.getElementById('devicesListView').classList.remove('hidden');
    renderMapMarkers();
    renderDevicesList();
}

function setNowInNoteForm() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');

    document.getElementById('noteDate').value = `${yyyy}-${mm}-${dd}`;
    document.getElementById('noteTime').value = `${hh}:${min}`;
}

function onRoleSelectChange() {
    const roleSel = document.getElementById('noteAuthorRole');
    const authorInput = document.getElementById('noteAuthor');
    if (!roleSel || !authorInput) return;
    const role = roleSel.value;
    const baseName = (loggedInUser && loggedInUser !== t('demoModeBtn')) ? loggedInUser : 'Jan Kowalski';
    if (role === 'Inny') {
        authorInput.value = '';
        authorInput.placeholder = 'np. Imię Nazwisko (Stanowisko)';
    } else {
        const currentName = authorInput.value.replace(/^[^—]+(?:\s*—\s*|\s*\(\s*)/, '').replace(/\)$/, '').trim();
        const nameToUse = currentName || baseName;
        authorInput.value = `${nameToUse} (${role})`;
    }
}

function openImageLightbox(src) {
    if (!src) return;
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImageEl');
    img.src = src;
    modal.classList.remove('hidden');
}

function closeImageLightbox() {
    const modal = document.getElementById('imageLightboxModal');
    const img = document.getElementById('lightboxImageEl');
    modal.classList.add('hidden');
    img.src = '';
}

function renderNotePhotosPreviewGrid() {
    const grid = document.getElementById('notePhotosPreviewGrid');
    if (!grid) return;
    if (notePhotosBase64.length === 0) {
        grid.innerHTML = '';
        grid.classList.add('hidden');
        return;
    }
    grid.classList.remove('hidden');
    grid.innerHTML = notePhotosBase64.map((src, idx) => `
        <div class="relative group aspect-square rounded-lg overflow-hidden border border-slate-300 bg-slate-100">
            <img src="${src}" alt="Podgląd ${idx + 1}" onclick="openImageLightbox('${src}')" class="w-full h-full object-cover cursor-zoom-in">
            <button type="button" onclick="removePendingNotePhoto(${idx})" title="Usuń zdjęcie"
                class="absolute top-1 right-1 w-5 h-5 rounded-full bg-rose-600/90 hover:bg-rose-700 text-white text-[10px] font-bold flex items-center justify-center shadow cursor-pointer">
                ✕
            </button>
        </div>
    `).join('');
}

function removePendingNotePhoto(index) {
    notePhotosBase64.splice(index, 1);
    renderNotePhotosPreviewGrid();
}

async function handleNotePhotoPreview(event) {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    try {
        for (const file of files) {
            const compressed = await compressImageToBase64(file, 900);
            notePhotosBase64.push(compressed);
        }
        renderNotePhotosPreviewGrid();
    } catch (e) {
        showToast(currentLang === 'en' ? 'Error loading photo preview.' : 'Błąd wczytywania podglądu zdjęcia.', 'error');
    }
    event.target.value = '';
}

async function handleAddRepairNote(event) {
    event.preventDefault();
    if (!selectedDeviceId) return;

    const dev = devices.find(d => d.id === selectedDeviceId);
    if (!dev) return;

    const role = document.getElementById('noteAuthorRole').value;
    const author = document.getElementById('noteAuthor').value.trim();
    const statusAfter = document.getElementById('noteStatus').value;
    const date = document.getElementById('noteDate').value;
    const time = document.getElementById('noteTime').value;
    const content = document.getElementById('noteContent').value.trim();

    if (!author || !date || !time || !content) {
        showToast(currentLang === 'en' ? 'Please fill in all fields.' : 'Uzupełnij wszystkie pola wpisu w dzienniku napraw.', 'error');
        return;
    }

    localStorage.setItem(AUTHOR_STORAGE_KEY, author);
    localStorage.setItem(ROLE_STORAGE_KEY, role);

    const photosCopy = [...notePhotosBase64];
    const newNote = {
        id: Date.now(),
        date,
        time,
        author,
        statusAfter,
        content,
        photos: photosCopy,
        photo: photosCopy[0] || ''
    };

    if (!Array.isArray(dev.notes)) dev.notes = [];
    dev.notes.unshift(newNote);
    dev.status = statusAfter;

    document.getElementById('noteContent').value = '';
    document.getElementById('notePhotoFile').value = '';
    notePhotosBase64 = [];
    renderNotePhotosPreviewGrid();
    setNowInNoteForm();

    renderAll();
    await persistChangesToExternalFile(false);
}

async function deleteRepairNote(noteId) {
    if (!selectedDeviceId) return;
    const dev = devices.find(d => d.id === selectedDeviceId);
    if (!dev || !Array.isArray(dev.notes)) return;

    dev.notes = dev.notes.filter(n => n.id !== noteId);
    renderAll();
    await persistChangesToExternalFile(false);
}

function renderNotesHistory(dev) {
    const container = document.getElementById('notesListContainer');
    const notes = dev.notes || [];
    document.getElementById('detailNotesCount').textContent = notes.length;

    if (notes.length === 0) {
        container.innerHTML = `
            <div class="text-center py-6 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p class="text-xs font-semibold text-slate-600">${t('noNotesHistoryTitle')}</p>
                <p class="text-[11px] text-slate-400 mt-0.5">${t('noNotesHistoryDesc')}</p>
            </div>
        `;
        return;
    }

    container.innerHTML = notes.map(note => {
        const stCfg = STATUS_STYLES[note.statusAfter] || STATUS_STYLES.OK;
        const statusLabel = getStatusLabel(note.statusAfter);
        const photosList = (Array.isArray(note.photos) && note.photos.length > 0)
            ? note.photos
            : (note.photo ? [note.photo] : []);

        const photosGalleryHtml = photosList.length > 0
            ? `<div class="mt-2 grid ${photosList.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2">
                ${photosList.map((src, idx) => `
                    <img src="${src}" alt="Zdjęcie usterki ${idx + 1}" onclick="openImageLightbox(this.src)"
                        class="w-full ${photosList.length === 1 ? 'h-36' : 'h-24'} object-cover rounded-lg border border-slate-200 hover:opacity-90 transition cursor-zoom-in">
                `).join('')}
                </div>`
            : '';

        return `
            <div class="bg-white border border-slate-200 rounded-xl p-3 shadow-2xs space-y-1.5">
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-1.5 text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg">
                        <span>${escapeHtml(note.date)}</span>
                        <span class="text-slate-300">|</span>
                        <span>${escapeHtml(note.time)}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${stCfg.badgeClass}">
                            ${statusLabel}
                        </span>
                        <button type="button" onclick="deleteRepairNote(${note.id})" class="p-1 text-slate-400 hover:text-rose-600 rounded transition cursor-pointer">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                    </div>
                </div>
                <p class="text-xs text-slate-800 whitespace-pre-line leading-relaxed">${escapeHtml(note.content)}</p>
                ${photosGalleryHtml}
                <div class="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>${t('technicianPrefix')} <strong class="text-slate-700">${escapeHtml(note.author || '—')}</strong></span>
                </div>
            </div>
        `;
    }).join('');
}

// =========================================================================
// 8. DODAWANIE, EDYCJA I POTWIERDZANIE USUNIĘCIA OBIEKTU
// =========================================================================
function confirmDeleteSelectedDevice() {
    if (!selectedDeviceId) return;
    const dev = devices.find(d => d.id === selectedDeviceId);
    if (!dev) return;
    document.getElementById('confirmDeleteText').textContent =
        currentLang === 'en'
            ? `Are you sure you want to delete "${dev.name}"?`
            : `Czy na pewno chcesz usunąć obiekt „${dev.name}”?`;
    document.getElementById('confirmDeleteModal').classList.remove('hidden');
}

function closeConfirmDeleteModal() {
    document.getElementById('confirmDeleteModal').classList.add('hidden');
}

async function executeConfirmedDelete() {
    closeConfirmDeleteModal();
    await deleteSelectedDevice();
}

function openDeviceFormModal(deviceToEdit = null, clickedLat = null, clickedLng = null) {
    formDevicePhotoBase64 = '';
    document.getElementById('formDevPhotoFile').value = '';
    const preview = document.getElementById('formDevPhotoPreview');
    preview.classList.add('hidden');

    if (deviceToEdit) {
        document.getElementById('deviceModalTitle').innerHTML = `
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center text-xs">✎</span>
            <span>${t('modalEditTitle')} ${escapeHtml(deviceToEdit.name)}</span>
        `;
        document.getElementById('formDevSubmitBtn').querySelector('span').textContent = t('saveEditBtn');
        document.getElementById('formEditingDeviceId').value = deviceToEdit.id;
        document.getElementById('formDevName').value = deviceToEdit.name;
        document.getElementById('formDevInventory').value = deviceToEdit.inventoryCode || '';
        document.getElementById('formDevStatus').value = deviceToEdit.status || 'OK';
        document.getElementById('formDevLat').value = Number(deviceToEdit.lat).toFixed(6);
        document.getElementById('formDevLng').value = Number(deviceToEdit.lng).toFixed(6);
        document.getElementById('formDevDesc').value = deviceToEdit.description || '';
        document.getElementById('deviceType').value = deviceToEdit.icon || 'nastawnia';
        updateFormIconPreview();

        if (deviceToEdit.image) {
            formDevicePhotoBase64 = deviceToEdit.image;
            preview.src = deviceToEdit.image;
            preview.classList.remove('hidden');
        }
        showDraftPinOnMap(deviceToEdit.lat, deviceToEdit.lng);
    } else {
        document.getElementById('deviceModalTitle').innerHTML = `
            <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs">+</span>
            <span>${t('modalAddTitle')}</span>
        `;
        document.getElementById('formDevSubmitBtn').querySelector('span').textContent = t('saveDeviceBtn');
        document.getElementById('formEditingDeviceId').value = '';
        document.getElementById('formDevName').value = '';
        document.getElementById('formDevInventory').value = '';
        document.getElementById('formDevStatus').value = 'OK';
        document.getElementById('formDevDesc').value = '';
        document.getElementById('deviceType').value = 'nastawnia';
        updateFormIconPreview();

        let targetLat = clickedLat;
        let targetLng = clickedLng;

        if (targetLat === null || targetLng === null) {
            if (leafletMap) {
                const center = leafletMap.getCenter();
                targetLat = center.lat;
                targetLng = center.lng;
            }
        }

        if (targetLat !== null && targetLng !== null) {
            document.getElementById('formDevLat').value = Number(targetLat).toFixed(6);
            document.getElementById('formDevLng').value = Number(targetLng).toFixed(6);
            showDraftPinOnMap(targetLat, targetLng);
        }
    }

    document.getElementById('deviceFormModal').classList.remove('hidden');
}

function openEditCurrentDeviceModal() {
    if (!selectedDeviceId) return;
    const dev = devices.find(d => d.id === selectedDeviceId);
    if (dev) openDeviceFormModal(dev);
}

function closeDeviceFormModal() {
    document.getElementById('deviceFormModal').classList.add('hidden');
    removeDraftPinFromMap();
}

function startMapPickMode() {
    isPickingMapCoords = true;
    document.getElementById('deviceFormModal').classList.add('hidden');
    document.getElementById('mapQuickHint').classList.add('hidden');
    document.getElementById('mapClickBanner').classList.remove('hidden');
    document.getElementById('leafletMapContainer').style.cursor = 'crosshair';
    closeDrawer();
}

function finishMapPickMode() {
    isPickingMapCoords = false;
    document.getElementById('mapClickBanner').classList.add('hidden');
    document.getElementById('mapQuickHint').classList.remove('hidden');
    document.getElementById('leafletMapContainer').style.cursor = '';
    document.getElementById('deviceFormModal').classList.remove('hidden');
}

function cancelMapPickMode() {
    finishMapPickMode();
}

function compressImageToBase64(file, maxWidth = 800) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.78));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function handleFormDevicePhotoPreview(event) {
    const file = event.target.files[0];
    if (!file) return;
    try {
        formDevicePhotoBase64 = await compressImageToBase64(file);
        const preview = document.getElementById('formDevPhotoPreview');
        preview.src = formDevicePhotoBase64;
        preview.classList.remove('hidden');
    } catch (e) {
        showToast(currentLang === 'en' ? 'Error loading photo preview.' : 'Błąd wczytywania podglądu zdjęcia.', 'error');
    }
}

async function handleUpdateDevicePhoto(event) {
    const file = event.target.files[0];
    if (!file || !selectedDeviceId) return;

    try {
        const base64 = await compressImageToBase64(file);
        const dev = devices.find(d => d.id === selectedDeviceId);
        if (dev) {
            dev.image = base64;
            renderDeviceDetails(dev);
            await persistChangesToExternalFile(false);
        }
    } catch (err) {
        showToast(currentLang === 'en' ? 'Failed to process image.' : 'Nie udało się przetworzyć pliku obrazu.', 'error');
    }
    event.target.value = '';
}

async function handleSaveDeviceForm(event) {
    event.preventDefault();

    const editingId = document.getElementById('formEditingDeviceId').value.trim();
    const name = document.getElementById('formDevName').value.trim();
    const inventoryCode = document.getElementById('formDevInventory').value.trim();
    const icon = document.getElementById('deviceType').value;
    const status = document.getElementById('formDevStatus').value;
    const lat = parseFloat(document.getElementById('formDevLat').value);
    const lng = parseFloat(document.getElementById('formDevLng').value);
    const description = document.getElementById('formDevDesc').value.trim();

    if (!name || isNaN(lat) || isNaN(lng)) {
        showToast(currentLang === 'en' ? 'Enter asset name and valid GPS coordinates.' : 'Podaj nazwę oraz poprawne współrzędne GPS obiektu.', 'error');
        return;
    }

    if (editingId) {
        const existing = devices.find(d => d.id === editingId);
        if (existing) {
            existing.name = name;
            existing.inventoryCode = inventoryCode;
            existing.icon = icon;
            existing.status = status;
            existing.lat = lat;
            existing.lng = lng;
            existing.description = description;
            if (formDevicePhotoBase64) {
                existing.image = formDevicePhotoBase64;
            }
        }
        closeDeviceFormModal();
        renderAll();
        selectDevice(editingId);
        await persistChangesToExternalFile(false);
    } else {
        const newDevice = {
            id: 'SILK-' + String(devices.length + 1).padStart(3, '0') + '-' + String(Date.now()).slice(-3),
            name,
            inventoryCode,
            icon,
            status,
            description,
            lat,
            lng,
            image: formDevicePhotoBase64 || '',
            notes: []
        };

        devices.push(newDevice);
        closeDeviceFormModal();
        renderAll();
        selectDevice(newDevice.id);

        await persistChangesToExternalFile(false);
    }
}

async function deleteSelectedDevice() {
    if (!selectedDeviceId) return;
    devices = devices.filter(d => d.id !== selectedDeviceId);
    closeDeviceDetails();
    renderAll();

    await persistChangesToExternalFile(false);
    showToast(currentLang === 'en' ? 'Asset deleted.' : 'Usunięto obiekt.', 'info');
}

function fitMapToAllDevices() {
    const filtered = getFilteredDevices();
    if (filtered.length === 0) return;

    if (leafletMap) {
        const bounds = L.latLngBounds(filtered.map(d => [d.lat, d.lng]));
        leafletMap.fitBounds(bounds, { padding: [70, 70], maxZoom: 16 });
    }
}

// =========================================================================
// 9. ŚLEDZENIE GPS NA ŻYWO I DODAWANIE W MIEJSCU POBYTU
// =========================================================================
let isGpsTrackingActive = false;
let gpsWatchId = null;
let currentGpsCoords = null;
let gpsMarker = null;
let gpsAccuracyCircle = null;

function toggleLiveGpsTracking() {
    if (!navigator.geolocation) {
        showToast(currentLang === 'en' ? 'Geolocation is not supported by your browser.' : 'Geolokalizacja nie jest obsługana przez Twoją przeglądarkę.', 'error');
        return;
    }

    const btn = document.getElementById('gpsToggleHeaderBtn');
    const banner = document.getElementById('gpsAddBanner');

    if (isGpsTrackingActive) {
        if (gpsWatchId !== null) {
            navigator.geolocation.clearWatch(gpsWatchId);
            gpsWatchId = null;
        }
        isGpsTrackingActive = false;
        if (gpsMarker && leafletMap) {
            leafletMap.removeLayer(gpsMarker);
            gpsMarker = null;
        }
        if (gpsAccuracyCircle && leafletMap) {
            leafletMap.removeLayer(gpsAccuracyCircle);
            gpsAccuracyCircle = null;
        }
        if (banner) banner.classList.add('hidden');
        if (btn) {
            btn.className = 'p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0';
        }
        showToast(currentLang === 'en' ? 'Live GPS tracking stopped.' : 'Wyłączono śledzenie GPS na żywo.', 'info');
    } else {
        isGpsTrackingActive = true;
        if (btn) {
            btn.className = 'p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 animate-pulse';
        }
        showToast(currentLang === 'en' ? 'Acquiring GPS position...' : 'Pobieranie pozycji GPS...', 'info');

        gpsWatchId = navigator.geolocation.watchPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const accuracy = position.coords.accuracy;
                currentGpsCoords = { lat, lng };

                if (banner) banner.classList.remove('hidden');

                if (leafletMap) {
                    if (!gpsMarker) {
                        const gpsHtml = `
                            <div class="relative flex items-center justify-center pointer-events-none">
                                <div class="w-6 h-6 rounded-full bg-blue-500/30 animate-ping absolute"></div>
                                <div class="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center">
                                    <div class="w-1.5 h-1.5 rounded-full bg-white"></div>
                                </div>
                            </div>
                        `;
                        const gpsIcon = L.divIcon({
                            html: gpsHtml,
                            className: 'leaflet-div-icon',
                            iconSize: [24, 24],
                            iconAnchor: [12, 12]
                        });
                        gpsMarker = L.marker([lat, lng], { icon: gpsIcon, zIndexOffset: 9999 }).addTo(leafletMap);
                        leafletMap.setView([lat, lng], Math.max(leafletMap.getZoom(), 16));
                    } else {
                        gpsMarker.setLatLng([lat, lng]);
                    }

                    if (!gpsAccuracyCircle) {
                        gpsAccuracyCircle = L.circle([lat, lng], {
                            radius: accuracy,
                            color: '#2563eb',
                            weight: 1,
                            fillColor: '#3b82f6',
                            fillOpacity: 0.15
                        }).addTo(leafletMap);
                    } else {
                        gpsAccuracyCircle.setLatLng([lat, lng]);
                        gpsAccuracyCircle.setRadius(accuracy);
                    }
                }
            },
            (error) => {
                console.warn('GPS error:', error);
                showToast(t('gpsError'), 'error');
                isGpsTrackingActive = false;
                if (btn) btn.className = 'p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0';
                if (banner) banner.classList.add('hidden');
            },
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 15000
            }
        );
    }
}

function addAssetAtCurrentGps() {
    if (!currentGpsCoords) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                currentGpsCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                openDeviceFormModal(null, currentGpsCoords.lat, currentGpsCoords.lng);
            },
            (err) => {
                showToast(t('gpsError'), 'error');
            },
            { enableHighAccuracy: true }
        );
        return;
    }
    openDeviceFormModal(null, currentGpsCoords.lat, currentGpsCoords.lng);
}

// =========================================================================
// 10. NARZĘDZIA POMOCNICZE (KOMUNIKAT NA ŚRODKU EKRANU)
// =========================================================================
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    container.innerHTML = '';

    const badgeColors = {
        success: 'bg-emerald-500 text-slate-950',
        error: 'bg-rose-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    const icons = {
        success: '✓',
        error: '✕',
        info: 'i'
    };

    const toast = document.createElement('div');
    toast.className = 'bg-slate-900/95 text-white border border-slate-700 px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold flex items-center gap-3 backdrop-blur-md animate-fade-slide pointer-events-auto';
    toast.innerHTML = `
        <div class="w-6 h-6 rounded-full ${badgeColors[type] || badgeColors.success} flex items-center justify-center shrink-0 font-black text-xs shadow">${icons[type] || '✓'}</div>
        <span>${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2200);
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
