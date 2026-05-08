import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SERVICE_ROUTES = {
  'smile-designing': '/smile-designing',
  'aligners-braces': '/aligners-braces',
  'dental-implants': '/dental-implants',
  general: '/booking'
};

const SERVICE_LABELS = {
  'smile-designing': 'Smile Designing',
  'aligners-braces': 'Aligners & Braces',
  'dental-implants': 'Dental Implants',
  general: 'Consultation'
};

const MAX_BYTES = 8 * 1024 * 1024; // 8MB cap before base64 expansion

const ImageUpload = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [analysisSource, setAnalysisSource] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const enhanceImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) throw new Error('Canvas not supported');

          const maxW = 1200;
          const scale = Math.min(1, maxW / img.width);
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));

          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Cosmetic "smile enhancement" pipeline (brightness, contrast,
          // gentle yellow reduction, mild saturation lift). Visual only -
          // the real recommendations come from Gemini below.
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const d = imageData.data;

          const brightness = 8;
          const contrast = 1.12;
          const sat = 1.06;
          const yellowReduce = 0.04;

          for (let i = 0; i < d.length; i += 4) {
            let r = d[i];
            let g = d[i + 1];
            let b = d[i + 2];

            r += brightness;
            g += brightness;
            b += brightness;

            r = (r - 128) * contrast + 128;
            g = (g - 128) * contrast + 128;
            b = (b - 128) * contrast + 128;

            const y = (r + g) / 2 - b;
            if (y > 0) {
              const adj = y * yellowReduce;
              r -= adj * 0.6;
              g -= adj * 0.6;
              b += adj;
            }

            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            r = gray + (r - gray) * sat;
            g = gray + (g - gray) * sat;
            b = gray + (b - gray) * sat;

            d[i] = Math.max(0, Math.min(255, r));
            d[i + 1] = Math.max(0, Math.min(255, g));
            d[i + 2] = Math.max(0, Math.min(255, b));
          }

          ctx.putImageData(imageData, 0, 0);

          const tmp = document.createElement('canvas');
          tmp.width = canvas.width;
          tmp.height = canvas.height;
          const tctx = tmp.getContext('2d');
          if (tctx) {
            tctx.drawImage(canvas, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = 'contrast(1.06) saturate(1.02)';
            ctx.drawImage(tmp, 0, 0);
            ctx.filter = 'none';
          }

          resolve(canvas.toDataURL('image/jpeg', 0.92));
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = src;
    });

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = String(reader.result || '');
        const match = dataUrl.match(/^data:([^;,]+);base64,(.+)$/);
        if (!match) return reject(new Error('Could not read image'));
        resolve({ mimeType: match[1], base64: match[2] });
      };
      reader.onerror = () => reject(new Error('Could not read image'));
      reader.readAsDataURL(file);
    });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setErrorMsg('Image is over 8MB. Please choose a smaller photo.');
      return;
    }
    setErrorMsg(null);
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setAnalysis(null);
    setAnalysisSource(null);
  };

  const simulatePreview = async () => {
    if (!image || !preview) return;
    setLoading(true);
    setErrorMsg(null);
    const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
    try {
      const [{ base64, mimeType }, enhanced] = await Promise.all([
        fileToBase64(image),
        enhanceImage(preview)
      ]);
      setResult(enhanced);

      const { data } = await axios.post(
        `${API_BASE}/api/smile-preview`,
        { image: enhanced, imageBase64: base64, mimeType },
        { timeout: 35_000 }
      );
      if (data?.analysis) {
        setAnalysis(data.analysis);
        setAnalysisSource(data.source || 'fallback');
      }
    } catch (e) {
      console.error('Smile preview failed:', e);
      setErrorMsg(
        e?.response?.data?.error ||
          'AI analysis is temporarily unavailable. Please try again or book a consultation.'
      );
      try {
        const enhanced = await enhanceImage(preview);
        setResult(enhanced);
      } catch {
        setResult(preview);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-20 px-6">
      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-black/5">
        <div className="md:flex">
          {/* Upload Section */}
          <div className="md:w-1/2 p-12 bg-[color:var(--deep)] text-white">
            <h2 className="text-3xl font-serif font-bold mb-6">{t('aiPreview.title')}</h2>
            <p className="text-white/70 mb-8 leading-relaxed">{t('aiPreview.subtitle')}</p>

            <label className="block w-full border-2 border-dashed border-white/20 rounded-2xl p-10 text-center cursor-pointer hover:bg-white/5 transition-colors">
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              <div className="text-4xl mb-4">📸</div>
              <span className="font-bold">{t('aiPreview.btnUpload')}</span>
              <p className="text-xs text-white/50 mt-2">JPG, PNG up to 8MB</p>
            </label>

            {preview && (
              <button
                onClick={simulatePreview}
                disabled={loading}
                className="w-full mt-8 bg-[color:var(--teal)] text-white py-4 rounded-xl font-bold text-lg hover:bg-[color:var(--dk)] disabled:opacity-50 transition-all shadow-xl shadow-black/30"
              >
                {loading ? 'AI Processing...' : t('aiPreview.btnProcess')}
              </button>
            )}

            {errorMsg && (
              <div className="mt-4 text-sm text-rose-200 bg-rose-500/15 border border-rose-300/30 rounded-xl px-4 py-3">
                {errorMsg}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="md:w-1/2 p-12 bg-[color:var(--bg)] flex items-center justify-center">
            {!preview ? (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4">⌛</div>
                <p>Upload a photo to see the magic</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center">
                <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-inner bg-black">
                  <img
                    src={result || preview}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      loading ? 'blur-md opacity-50' : 'blur-0 opacity-100'
                    }`}
                    alt="AI Preview"
                  />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-[color:var(--teal)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  {result && !loading && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[color:var(--teal)] text-white px-6 py-2 rounded-full font-bold shadow-lg">
                      AI Preview Applied ✨
                    </div>
                  )}
                </div>
                <p className="mt-6 text-sm text-gray-400 text-center">{t('aiPreview.disclaimer')}</p>
              </div>
            )}
          </div>
        </div>

        {/* AI Analysis from Gemini */}
        {analysis && (analysis.concerns.length || analysis.strengths.length || analysis.recommendations.length || analysis.narrative) && (
          <div className="border-t border-black/5 bg-gradient-to-br from-white to-[color:var(--soft)] p-8 md:p-12">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <h3 className="font-serif text-2xl font-bold text-[color:var(--dk)]">
                AI smile assessment
              </h3>
              <span
                className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full border ${
                  analysisSource === 'gemini'
                    ? 'text-[color:var(--teal)] border-[color:var(--teal)]/40 bg-[color:var(--teal)]/10'
                    : 'text-gray-500 border-black/10 bg-white'
                }`}
              >
                {analysisSource === 'gemini' ? 'Powered by Gemini' : 'General suggestions'}
              </span>
            </div>

            {analysis.narrative && (
              <p className="text-[color:var(--muted)] leading-relaxed mb-6">{analysis.narrative}</p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {analysis.concerns.length > 0 && (
                <div className="bg-white rounded-2xl border border-black/5 p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--dk)] mb-3">
                    Areas to address
                  </h4>
                  <ul className="space-y-2 text-sm text-[color:var(--muted)]">
                    {analysis.concerns.map((c, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[color:var(--teal)]">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.strengths.length > 0 && (
                <div className="bg-white rounded-2xl border border-black/5 p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--dk)] mb-3">
                    What looks great
                  </h4>
                  <ul className="space-y-2 text-sm text-[color:var(--muted)]">
                    {analysis.strengths.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-emerald-500">✓</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {analysis.recommendations.length > 0 && (
              <div className="mt-6">
                <h4 className="text-sm font-bold uppercase tracking-wide text-[color:var(--dk)] mb-3">
                  Recommended treatments
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {analysis.recommendations.map((rec, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl border border-black/5 p-5 flex flex-col"
                    >
                      <div className="text-xs font-bold tracking-wide uppercase text-[color:var(--teal)]">
                        {SERVICE_LABELS[rec.service] || 'Consultation'}
                      </div>
                      <div className="text-lg font-bold text-[color:var(--dk)] mt-1">
                        {rec.treatment}
                      </div>
                      {rec.reason && (
                        <p className="text-sm text-[color:var(--muted)] mt-2 leading-relaxed">
                          {rec.reason}
                        </p>
                      )}
                      <Link
                        to={SERVICE_ROUTES[rec.service] || '/booking'}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[color:var(--teal)] hover:text-[color:var(--dk)] no-underline"
                      >
                        Learn more →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(analysis.costRangeINR || analysis.timeline) && (
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {analysis.costRangeINR && (
                  <div className="bg-white rounded-2xl border border-black/5 p-5">
                    <div className="text-xs font-bold tracking-wide uppercase text-[color:var(--muted)]">
                      Indicative cost
                    </div>
                    <div className="text-xl font-bold text-[color:var(--dk)] mt-1">
                      {analysis.costRangeINR}
                    </div>
                  </div>
                )}
                {analysis.timeline && (
                  <div className="bg-white rounded-2xl border border-black/5 p-5">
                    <div className="text-xs font-bold tracking-wide uppercase text-[color:var(--muted)]">
                      Estimated timeline
                    </div>
                    <div className="text-xl font-bold text-[color:var(--dk)] mt-1">
                      {analysis.timeline}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                to="/booking"
                className="inline-flex items-center justify-center bg-[color:var(--teal)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--dk)] transition no-underline"
              >
                Book a free consultation
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center justify-center bg-white border border-black/10 text-[color:var(--dk)] px-6 py-3 rounded-xl font-bold hover:bg-[color:var(--soft)] transition no-underline"
              >
                Read our FAQs
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
