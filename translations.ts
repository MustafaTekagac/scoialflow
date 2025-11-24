

export type Language = 'en' | 'tr';

export const translations = {
  en: {
    nav_docs: "Documentation",
    hero_title: "Video Downloader",
    hero_subtitle: "Download high-quality videos from YouTube, TikTok, and Instagram instantly.",
    input_placeholder: "Paste link here...",
    paste_btn: "PASTE",
    process_btn: "Find Video",
    analyzing_btn: "Searching...",
    error_fetch: "Failed to find video. Please check the link or try again later.",
    tab_download: "Download",
    download_options: "Download Quality",
    download_btn: "Download",
    downloading: "Downloading...",
    saved: "Saved to Device",
    terms: "By downloading, you agree to our Terms of Service.",
    copy_all: "Copy",
    ready_to_process: "Ready for Download",
    platform_youtube: "YouTube",
    platform_tiktok: "TikTok",
    platform_instagram: "Instagram",
    unknown_video: "Video",
    audio_only: "Convert to Audio (MP3)",
    saved_msg: "Download started!",
    demo_download_popup: "DEMO MODE: Since no backend API is configured, a sample file was downloaded. Set API_BASE_URL in config.ts to enable real downloads.",
    download_error_demo: "Download failed.",
    
    // AI Studio
    ai_title: "AI Viral Studio",
    ai_subtitle: "Generate viral captions and hashtags for your video automatically.",
    select_tone: "Select Tone",
    tone_fun: "Fun",
    tone_professional: "Professional",
    tone_informative: "Informative",
    tone_sarcastic: "Sarcastic",
    tone_minimalist: "Minimalist",
    analyzing_content: "Generating...",
    generate_btn: "Generate Magic",
    captions_title: "Engaging Captions",
    hashtags_title: "Viral Hashtags",

    // Pricing
    plan_free: "Free Plan",
    plan_pro: "Pro Plan",
    feature_720p: "HD 720p Download",
    feature_speed: "Standard Speed",
    feature_ads: "Supported by Ads",
    current_plan: "Current Plan",
    feature_4k: "4K Ultra HD Download",
    feature_fast: "Fastest Speed",
    feature_no_ads: "No Ads",
    subscribe_btn: "Upgrade Now",

    // Ads
    ad_placeholder: "Ad Space",

    // Footer & Legal
    footer_desc: "SocialFlow is the fastest way to download videos from social media.",
    privacy: "Privacy Policy",
    terms_of_service: "Terms of Service",
    copyright: "© 2024 SocialFlow. All rights reserved.",

    // Legal Content
    privacy_title: "Privacy Policy",
    privacy_content: `
      Last updated: 2024
      
      1. Information Collection
      SocialFlow does not store any user personal data. We do not track your browsing history. We only process the video link you provide to fetch the download URL.

      2. Cookies
      We use cookies solely for improving user experience (like saving your language preference) and for advertising purposes (Google AdSense).

      3. Third-Party Services
      We use third-party services like Google Analytics and AdSense. These services may collect anonymous data about your visit.
    `,

    terms_title: "Terms of Service",
    terms_content: `
      1. Usage License
      SocialFlow is a tool for downloading videos for personal use only (e.g., offline viewing). You are responsible for respecting the copyright ownership of the videos you download.

      2. Restrictions
      You may not use this tool to infringe on copyrights or download content you do not have permission to use.

      3. Disclaimer
      We are not affiliated with YouTube, TikTok, or Instagram. All rights belong to their respective owners.
    `
  },
  tr: {
    nav_docs: "Dokümanlar",
    hero_title: "Video İndirici",
    hero_subtitle: "YouTube, TikTok ve Instagram videolarını filigransız ve yüksek kalitede indirin.",
    input_placeholder: "Video linkini buraya yapıştırın...",
    paste_btn: "YAPIŞTIR",
    process_btn: "Videoyu Bul",
    analyzing_btn: "Aranıyor...",
    error_fetch: "Video bulunamadı. Lütfen linki kontrol edin veya sunucu bağlantısını sağlayın.",
    tab_download: "İndir",
    download_options: "İndirme Seçenekleri",
    download_btn: "İndir",
    downloading: "İndiriliyor...",
    saved: "Cihaza Kaydedildi",
    terms: "İndirme yaparak Kullanım Koşullarını kabul etmiş olursunuz.",
    copy_all: "Kopyala",
    ready_to_process: "İndirmeye Hazır",
    platform_youtube: "YouTube",
    platform_tiktok: "TikTok",
    platform_instagram: "Instagram",
    unknown_video: "Video",
    audio_only: "Sese Çevir (MP3)",
    saved_msg: "İndirme başladı!",
    demo_download_popup: "DEMO MODU: Bir backend (sunucu) tanımlı olmadığı için örnek dosya indirildi. Gerçek indirme için config.ts dosyasına API adresini giriniz.",
    download_error_demo: "İndirme başarısız.",

    // AI Studio
    ai_title: "Yapay Zeka Stüdyosu",
    ai_subtitle: "Videonuz için viral açıklamalar ve etiketleri otomatik oluşturun.",
    select_tone: "Ton Seçimi",
    tone_fun: "Eğlenceli",
    tone_professional: "Profesyonel",
    tone_informative: "Bilgilendirici",
    tone_sarcastic: "İğneleyici",
    tone_minimalist: "Sade",
    analyzing_content: "Oluşturuluyor...",
    generate_btn: "Sihri Başlat",
    captions_title: "Dikkat Çekici Başlıklar",
    hashtags_title: "Viral Etiketler",

    // Pricing
    plan_free: "Ücretsiz Plan",
    plan_pro: "Pro Plan",
    feature_720p: "HD 720p İndirme",
    feature_speed: "Standart Hız",
    feature_ads: "Reklamlı",
    current_plan: "Mevcut Plan",
    feature_4k: "4K Ultra HD İndirme",
    feature_fast: "En Yüksek Hız",
    feature_no_ads: "Reklamsız",
    subscribe_btn: "Hemen Yükselt",

    // Ads
    ad_placeholder: "Reklam Alanı",

    // Footer & Legal
    footer_desc: "SocialFlow, sosyal medyadan video indirmenin en hızlı yoludur.",
    privacy: "Gizlilik Politikası",
    terms_of_service: "Kullanım Koşulları",
    copyright: "© 2024 SocialFlow. Tüm hakları saklıdır.",

    // Legal Content
    privacy_title: "Gizlilik Politikası",
    privacy_content: `
      Son Güncelleme: 2024
      
      1. Bilgi Toplama
      SocialFlow, kullanıcılarına ait kişisel verileri saklamaz. Tarayıcı geçmişinizi izlemeyiz. Yalnızca indirme bağlantısını oluşturmak için sağladığınız video linkini işleriz.

      2. Çerezler (Cookies)
      Sadece kullanıcı deneyimini iyileştirmek (dil tercihi vb.) ve reklam gösterimi (Google AdSense) amacıyla çerezler kullanmaktayız.

      3. Üçüncü Taraf Hizmetler
      Google Analytics ve AdSense gibi güvenilir üçüncü taraf hizmetleri kullanıyoruz. Bu servisler ziyaretinizle ilgili anonim veriler toplayabilir.
    `,

    terms_title: "Kullanım Koşulları",
    terms_content: `
      1. Kullanım Lisansı
      SocialFlow, yalnızca kişisel kullanım (örneğin çevrimdışı izleme) için video indirme aracıdır. İndirdiğiniz videoların telif haklarına saygı duymak sizin sorumluluğunuzdadır.

      2. Kısıtlamalar
      Bu aracı telif haklarını ihlal etmek veya izniniz olmayan içerikleri dağıtmak amacıyla kullanamazsınız.

      3. Yasal Uyarı
      YouTube, TikTok veya Instagram ile resmi bir bağlantımız yoktur. Tüm haklar ilgili içerik sahiplerine aittir.
    `
  }
};