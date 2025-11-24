import React, { useEffect } from 'react';

interface AdBannerProps {
  position: 'top' | 'bottom';
}

const AdBanner: React.FC<AdBannerProps> = ({ position }) => {
  
  useEffect(() => {
    // Google AdSense kullanıyorsanız, reklamlar yüklendiğinde tetiklemek için:
    // try {
    //   (window.adsbygoogle = window.adsbygoogle || []).push({});
    // } catch (e) {}
  }, []);

  return (
    <div className={`w-full flex justify-center items-center my-8 ${position === 'top' ? 'min-h-[90px]' : 'min-h-[250px]'}`}>
      {/* 
        =============================================================================
        REKLAM KODUNUZU BURAYA EKLEYİN
        Google AdSense veya başka bir ağdan aldığınız kodu aşağıya yapıştırın.
        
        Örnek Google AdSense Kodu:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        =============================================================================
      */}

      {/* ŞİMDİLİK GÖRÜNEN YER TUTUCU (Reklam kodu ekleyince burayı silebilirsiniz) */}
      <div className="w-full h-full bg-white/5 border border-white/5 border-dashed rounded-xl flex flex-col items-center justify-center text-gray-600 p-4 animate-slide-up">
        <span className="text-xs uppercase tracking-widest font-semibold">REKLAM ALANI ({position === 'top' ? '728x90' : '300x250'})</span>
        <span className="text-[10px] opacity-50 mt-1">
            components/AdBanner.tsx dosyasına kodunuzu yapıştırın
        </span>
      </div>

    </div>
  );
};

export default AdBanner;