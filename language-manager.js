// language-manager.js - Complete Working Version

const translations = {
    en: {
        // Navigation
        home: "Home",
        machinery: "Machinery",
        labour: "Labour",
        contact: "Contact",
        cart: "Cart",
        dashboard: "Dashboard",
        profileSettings: "Profile Settings",
        myOrders: "My Orders",
        logout: "Logout",
        login: "Login",
        register: "Register",
        farmer: "Farmer",
        
        // Hero Section
        machineryHeroTitle: "Agricultural Machinery Rental",
        machineryHeroSubtitle: "Browse and add machinery to your cart. Complete booking at checkout.",
        browseMachinery: "Browse machinery",
        
        // Availability Checklist
        availabilityChecklist: "Availability Checklist",
        selectDate: "Select Date:",
        showAvailability: "Show Availability",
        
        // Search & Filters
        searchPlaceholder: "Search machinery by name, brand, or type...",
        machineryType: "Machinery Type:",
        allTypes: "All Types",
        tractor: "Tractor",
        harvester: "Harvester",
        plough: "Plough",
        cultivator: "Cultivator",
        irrigation: "Irrigation System",
        sprayer: "Sprayer",
        drone: "Drone",
        location: "Location:",
        allLocations: "All Locations",
        priceRange: "Price Range:",
        anyPrice: "Any Price",
        day: "day",
        hour: "hour",
        
        // Location Filter
        findNearby: "Find Machinery Near You",
        useMyLocation: "Use My Location",
        locationPlaceholder: "Enter city or pincode",
        search: "Search",
        resetMap: "Reset Map",
        
        // Machinery Cards
        availableMachinery: "Available Machinery",
        machinerySubtitle: "Add machinery to cart and complete booking at checkout",
        available: "Available",
        premiumTractor: "Premium Tractor",
        power: "Power",
        fuelType: "Fuel Type",
        drive: "Drive",
        heavyDuty: "Heavy Duty",
        compact: "Compact",
        efficient: "Efficient",
        versatile: "Versatile",
        highFlow: "High Flow",
        portable: "Portable",
        advanced: "Advanced",
        smartFarming: "Smart Farming",
        ecoFriendly: "Eco-Friendly",
        
        // Specs
        requiredPower: "Required Power",
        transmission: "Transmission",
        discCount: "Disc Count",
        flowRate: "Flow Rate",
        capacity: "Capacity",
        cropType: "Crop Type",
        navigation: "Navigation",
        flightTime: "Flight Time",
        energySource: "Energy Source",
        
        // Features
        powerSteering: "Power Steering",
        ropsCabin: "ROPS Cabin",
        threePointHitch: "3-Point Hitch",
        acCabin: "AC Cabin",
        heavyDutyTag: "Heavy Duty",
        multiSpeed: "Multi-speed",
        easyHandling: "Easy Handling",
        fuelEfficient: "Fuel Efficient",
        compactSize: "Compact Size",
        depthControl: "Depth Control",
        
        // Descriptions
        tractorDesc: "Reliable and efficient tractor perfect for various farming operations. Features power steering and comfortable ROPS cabin for long working hours.",
        mahindraDesc: "Powerful heavy-duty tractor with AC cabin for comfortable operation in all weather conditions. Perfect for large-scale farming operations.",
        powerTillerDesc: "Compact and fuel-efficient power tiller perfect for small to medium farms. Easy to handle and maneuver in tight spaces.",
        rotavatorDesc: "Heavy-duty rotavator for efficient soil preparation. Features depth control and excellent soil pulverization for optimal seedbed preparation.",
        discHarrowDesc: "Versatile disc harrow for effective soil leveling and weed control. Heavy construction ensures durability and consistent performance.",
        
        // Buttons
        addToCart: "Add to Cart",
        checkAvailability: "Check Availability",
        itemAdded: "Item added to cart!",
        
        // Map
        bookNow: "Book Now",
        yourLocation: "Your Location"
    },
    
    hi: {
        // Navigation
        home: "होम",
        machinery: "मशीनरी",
        labour: "श्रमिक",
        contact: "संपर्क",
        cart: "कार्ट",
        dashboard: "डैशबोर्ड",
        profileSettings: "प्रोफ़ाइल सेटिंग्स",
        myOrders: "मेरे ऑर्डर",
        logout: "लॉगआउट",
        login: "लॉगिन",
        register: "रजिस्टर",
        farmer: "किसान",
        
        // Hero Section
        machineryHeroTitle: "कृषि मशीनरी किराया",
        machineryHeroSubtitle: "मशीनरी ब्राउज़ करें और अपने कार्ट में जोड़ें। चेकआउट पर बुकिंग पूरी करें।",
        browseMachinery: "मशीनरी ब्राउज़ करें",
        
        // Availability Checklist
        availabilityChecklist: "उपलब्धता चेकलिस्ट",
        selectDate: "तिथि चुनें:",
        showAvailability: "उपलब्धता दिखाएं",
        
        // Search & Filters
        searchPlaceholder: "नाम, ब्रांड या प्रकार से मशीनरी खोजें...",
        machineryType: "मशीनरी प्रकार:",
        allTypes: "सभी प्रकार",
        tractor: "ट्रैक्टर",
        harvester: "हार्वेस्टर",
        plough: "हल",
        cultivator: "कल्टीवेटर",
        irrigation: "सिंचाई प्रणाली",
        sprayer: "स्प्रेयर",
        drone: "ड्रोन",
        location: "स्थान:",
        allLocations: "सभी स्थान",
        priceRange: "मूल्य सीमा:",
        anyPrice: "कोई भी मूल्य",
        day: "दिन",
        hour: "घंटा",
        
        // Location Filter
        findNearby: "अपने पास मशीनरी खोजें",
        useMyLocation: "मेरा स्थान उपयोग करें",
        locationPlaceholder: "शहर या पिनकोड दर्ज करें",
        search: "खोजें",
        resetMap: "मैप रीसेट करें",
        
        // Machinery Cards
        availableMachinery: "उपलब्ध मशीनरी",
        machinerySubtitle: "कार्ट में मशीनरी जोड़ें और चेकआउट पर बुकिंग पूरी करें",
        available: "उपलब्ध",
        premiumTractor: "प्रीमियम ट्रैक्टर",
        power: "पावर",
        fuelType: "ईंधन प्रकार",
        drive: "ड्राइव",
        heavyDuty: "भारी शुल्क",
        compact: "कॉम्पैक्ट",
        efficient: "कुशल",
        versatile: "बहुमुखी",
        highFlow: "उच्च प्रवाह",
        portable: "पोर्टेबल",
        advanced: "उन्नत",
        smartFarming: "स्मार्ट खेती",
        ecoFriendly: "पर्यावरण अनुकूल",
        
        // Specs
        requiredPower: "आवश्यक पावर",
        transmission: "ट्रांसमिशन",
        discCount: "डिस्क संख्या",
        flowRate: "प्रवाह दर",
        capacity: "क्षमता",
        cropType: "फसल प्रकार",
        navigation: "नेविगेशन",
        flightTime: "उड़ान समय",
        energySource: "ऊर्जा स्रोत",
        
        // Features
        powerSteering: "पावर स्टीयरिंग",
        ropsCabin: "रोप्स केबिन",
        threePointHitch: "3-पॉइंट हिच",
        acCabin: "एसी केबिन",
        heavyDutyTag: "भारी शुल्क",
        multiSpeed: "मल्टी-स्पीड",
        easyHandling: "आसान हैंडलिंग",
        fuelEfficient: "ईंधन कुशल",
        compactSize: "कॉम्पैक्ट आकार",
        depthControl: "गहराई नियंत्रण",
        
        // Descriptions
        tractorDesc: "विभिन्न खेती कार्यों के लिए विश्वसनीय और कुशल ट्रैक्टर। लंबे काम के घंटों के लिए पावर स्टीयरिंग और आरामदायक रोप्स केबिन की सुविधा।",
        mahindraDesc: "सभी मौसम की स्थितियों में आरामदायक संचालन के लिए एसी केबिन के साथ शक्तिशाली भारी शुल्क ट्रैक्टर। बड़े पैमाने पर खेती के कार्यों के लिए बिल्कुल सही।",
        powerTillerDesc: "छोटे से मध्यम खेतों के लिए बिल्कुल सही कॉम्पैक्ट और ईंधन कुशल पावर टिलर। तंग जगहों में संभालने और चलाने में आसान।",
        rotavatorDesc: "कुशल मिट्टी की तैयारी के लिए भारी शुल्क रोटावेटर। इष्टतम बीज बिस्तर तैयार करने के लिए गहराई नियंत्रण और उत्कृष्ट मिट्टी पल्वराइजेशन की सुविधा।",
        discHarrowDesc: "प्रभावी मिट्टी समतलन और खरपतवार नियंत्रण के लिए बहुमुखी डिस्क हैरो। भारी निर्माण स्थायित्व और लगातार प्रदर्शन सुनिश्चित करता है।",
        
        // Buttons
        addToCart: "कार्ट में जोड़ें",
        checkAvailability: "उपलब्धता जांचें",
        itemAdded: "आइटम कार्ट में जोड़ा गया!",
        
        // Map
        bookNow: "अभी बुक करें",
        yourLocation: "आपका स्थान"
    },
    
    bn: {
        // Navigation
        home: "হোম",
        machinery: "যন্ত্রপাতি",
        labour: "শ্রমিক",
        contact: "যোগাযোগ",
        cart: "কার্ট",
        dashboard: "ড্যাশবোর্ড",
        profileSettings: "প্রোফাইল সেটিংস",
        myOrders: "আমার অর্ডার",
        logout: "লগআউট",
        login: "লগইন",
        register: "নিবন্ধন",
        farmer: "কৃষক",
        
        // Hero Section
        machineryHeroTitle: "কৃষি যন্ত্রপাতি ভাড়া",
        machineryHeroSubtitle: "যন্ত্রপাতি ব্রাউজ করুন এবং আপনার কার্টে যোগ করুন। চেকআউটে বুকিং সম্পূর্ণ করুন।",
        browseMachinery: "যন্ত্রপাতি ব্রাউজ করুন",
        
        // Availability Checklist
        availabilityChecklist: "প্রাপ্যতা চেকলিস্ট",
        selectDate: "তারিখ নির্বাচন করুন:",
        showAvailability: "প্রাপ্যতা দেখান",
        
        // Search & Filters
        searchPlaceholder: "নাম, ব্র্যান্ড বা ধরন অনুসারে যন্ত্রপাতি অনুসন্ধান করুন...",
        machineryType: "যন্ত্রপাতির ধরন:",
        allTypes: "সব ধরন",
        tractor: "ট্রাক্টর",
        harvester: "হারভেস্টার",
        plough: "লাঙ্গল",
        cultivator: "কাল্টিভেটর",
        irrigation: "সেচ ব্যবস্থা",
        sprayer: "স্প্রেয়ার",
        drone: "ড্রোন",
        location: "অবস্থান:",
        allLocations: "সব অবস্থান",
        priceRange: "মূল্য সীমা:",
        anyPrice: "যেকোনো মূল্য",
        day: "দিন",
        hour: "ঘণ্টা",
        
        // Location Filter
        findNearby: "আপনার কাছাকাছি যন্ত্রপাতি খুঁজুন",
        useMyLocation: "আমার অবস্থান ব্যবহার করুন",
        locationPlaceholder: "শহর বা পিনকোড লিখুন",
        search: "অনুসন্ধান",
        resetMap: "ম্যাপ রিসেট করুন",
        
        // Machinery Cards
        availableMachinery: "উপলব্ধ যন্ত্রপাতি",
        machinerySubtitle: "কার্টে যন্ত্রপাতি যোগ করুন এবং চেকআউটে বুকিং সম্পূর্ণ করুন",
        available: "উপলব্ধ",
        premiumTractor: "প্রিমিয়াম ট্রাক্টর",
        power: "পাওয়ার",
        fuelType: "জ্বালানি ধরন",
        drive: "ড্রাইভ",
        heavyDuty: "হেভি ডিউটি",
        compact: "কম্প্যাক্ট",
        efficient: "দক্ষ",
        versatile: "বহুমুখী",
        highFlow: "উচ্চ প্রবাহ",
        portable: "পোর্টেবল",
        advanced: "উন্নত",
        smartFarming: "স্মার্ট চাষ",
        ecoFriendly: "পরিবেশ বান্ধব",
        
        // Specs
        requiredPower: "প্রয়োজনীয় পাওয়ার",
        transmission: "ট্রান্সমিশন",
        discCount: "ডিস্ক সংখ্যা",
        flowRate: "প্রবাহ হার",
        capacity: "ক্ষমতা",
        cropType: "ফসলের ধরন",
        navigation: "ন্যাভিগেশন",
        flightTime: "ফ্লাইট সময়",
        energySource: "শক্তির উৎস",
        
        // Features
        powerSteering: "পাওয়ার স্টিয়ারিং",
        ropsCabin: "রপ্স কেবিন",
        threePointHitch: "৩-পয়েন্ট হিচ",
        acCabin: "এসি কেবিন",
        heavyDutyTag: "হেভি ডিউটি",
        multiSpeed: "মাল্টি-স্পিড",
        easyHandling: "সহজ হ্যান্ডলিং",
        fuelEfficient: "জ্বালানি সাশ্রয়ী",
        compactSize: "কম্প্যাক্ট সাইজ",
        depthControl: "গভীরতা নিয়ন্ত্রণ",
        
        // Descriptions
        tractorDesc: "বিভিন্ন চাষের কাজের জন্য নির্ভরযোগ্য এবং দক্ষ ট্রাক্টর। দীর্ঘ কাজের সময়ের জন্য পাওয়ার স্টিয়ারিং এবং আরামদায়ক রপ্স কেবিনের বৈশিষ্ট্য।",
        mahindraDesc: "সব আবহাওয়ায় আরামদায়ক অপারেশনের জন্য এসি কেবিন সহ শক্তিশালী হেভি ডিউটি ট্রাক্টর। বড় আকারের চাষের কাজের জন্য উপযুক্ত।",
        powerTillerDesc: "ছোট থেকে মাঝারি খামারের জন্য উপযুক্ত কম্প্যাক্ট এবং জ্বালানি সাশ্রয়ী পাওয়ার টিলার। টাইট স্পেসে হ্যান্ডেল এবং ম্যানুভার করা সহজ।",
        rotavatorDesc: "দক্ষ মাটি প্রস্তুতির জন্য হেভি ডিউটি রোটাভেটর। সর্বোত্তম বীজ বিছানা প্রস্তুতির জন্য গভীরতা নিয়ন্ত্রণ এবং চমৎকার মাটি পালভারাইজেশনের বৈশিষ্ট্য।",
        discHarrowDesc: "কার্যকর মাটি সমতলকরণ এবং আগাছা নিয়ন্ত্রণের জন্য বহুমুখী ডিস্ক হ্যারো। ভারী নির্মাণ স্থায়িত্ব এবং ধারাবাহিক কর্মক্ষমতা নিশ্চিত করে।",
        
        // Buttons
        addToCart: "কার্টে যোগ করুন",
        checkAvailability: "প্রাপ্যতা পরীক্ষা করুন",
        itemAdded: "আইটেম কার্টে যোগ করা হয়েছে!",
        
        // Map
        bookNow: "এখনই বুক করুন",
        yourLocation: "আপনার অবস্থান"
    }
};

// Language Manager Class
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('farmconnect_lang') || 'en';
        this.listeners = [];
        console.log('LanguageManager initialized with language:', this.currentLang);
    }
    
    getCurrentLang() {
        return this.currentLang;
    }
    
    getTranslation(key) {
        const translation = translations[this.currentLang][key] || translations['en'][key] || key;
        return translation;
    }
    
    setLanguage(lang) {
        console.log('Setting language to:', lang);
        if (translations[lang]) {
            this.currentLang = lang;
            localStorage.setItem('farmconnect_lang', lang);
            this.updatePageLanguage();
            this.notifyListeners();
            console.log('Language changed to:', lang);
        } else {
            console.error('Language not supported:', lang);
        }
    }
    
    updatePageLanguage() {
        console.log('Updating page language to:', this.currentLang);
        
        // Update all elements with data-key attribute
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            const translation = this.getTranslation(key);
            if (translation && translation !== key) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('placeholder')) {
                        element.placeholder = translation;
                    } else {
                        element.textContent = translation;
                    }
                } else if (element.tagName === 'IMG') {
                    element.alt = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update active state on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === this.currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Dispatch custom event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang: this.currentLang } 
        }));
    }
    
    addListener(callback) {
        this.listeners.push(callback);
    }
    
    notifyListeners() {
        this.listeners.forEach(callback => callback(this.currentLang));
    }
}

// Create global instance
window.langManager = new LanguageManager();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, updating page language');
    window.langManager.updatePageLanguage();
    
    // Setup language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            console.log('Language button clicked:', lang);
            window.langManager.setLanguage(lang);
        });
    });
});

console.log('language-manager.js loaded successfully');