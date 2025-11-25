import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)  # Tüm domainlerden gelen isteklere izin ver

@app.route('/')
def home():
    return "SocialFlow Backend is Running!"

@app.route('/api/info', methods=['GET'])
def get_video_info():
    url = request.args.get('url')
    if not url:
        return jsonify({'error': 'URL parametresi gerekli'}), 400

    try:
        # yt-dlp ayarları
        ydl_opts = {
            'quiet': True,
            'no_warnings': True,
            'format': 'best',  # En iyi kaliteyi bul
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Videoyu indirmeden bilgilerini çek (download=False)
            info = ydl.extract_info(url, download=False)
            
            # Ses dosyasını bulmaya çalış (yoksa normal video linkini ver)
            audio_url = None
            for f in info.get('formats', []):
                if f.get('acodec') != 'none' and f.get('vcodec') == 'none':
                    audio_url = f.get('url')
                    break
            
            if not audio_url:
                audio_url = info.get('url')

            return jsonify({
                'id': info.get('id'),
                'title': info.get('title'),
                'thumbnail': info.get('thumbnail'),
                'duration': info.get('duration_string') or "00:00",
                'author': info.get('uploader') or info.get('channel'),
                'download_url': info.get('url'), # Video indirme linki (googlevideo.com vs.)
                'audio_url': audio_url           # Ses linki
            })

    except Exception as e:
        print(f"Hata: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Render'ın atadığı portu kullan, yoksa 5000'i kullan
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
