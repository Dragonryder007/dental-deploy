import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import doctorVathsala from '../images/doctor-vathsala.png';
import doctorNoel from '../images/doctor-noel.png';
import doctorJishnu from '../images/doctor-jishnu.png';

const Doctors = () => {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Vathsala Naik',
      title: 'Senior Implant Consultant',
      specialization: 'Oral Medicine & Radiology Specialist | Internationally Trained',
      experience: '43+ Years',
      credentials: [
        'BDS, MDS – Oral Medicine & Radiology',
        '43+ Years Experience'
      ],
      specialties: [
        'Implant Case Planning',
        'Oral Diagnosis & Radiology',
        'TMJ Disorders',
        'Precancerous Lesion Screening'
      ],
      description: 'With over 43 years of clinical excellence, Dr. Vathsala Naik is a pioneering figure in implant dentistry and oral medicine. Her specialized expertise in implant case planning and oral radiology has enabled hundreds of patients to regain their confident smiles. Her meticulous approach to diagnosis and treatment planning ensures optimal outcomes for complex dental cases.',
      image: doctorVathsala
    },
    {
      id: 2,
      name: 'Dr. Noel Francis',
      title: 'Senior Clinical Dentist',
      specialization: 'Restorative & Endodontics',
      experience: '10+ Years',
      credentials: [
        'BDS',
        '10+ Years Experience'
      ],
      specialties: [
        'Root Canal Treatment (RCT)',
        'Restorative Dentistry',
        'Preventive Dentistry',
        'Emergency Dental Care'
      ],
      description: 'Dr. Noel Francis brings a decade of dedicated clinical experience in restorative and endodontic dentistry. His gentle approach and advanced techniques have made him a trusted specialist for patients requiring root canal treatments and restorative work. He believes in preserving natural teeth through preventive care and expert restoration.',
      image: doctorNoel
    },
    {
      id: 3,
      name: 'Dr. Jishnu Premnath',
      title: 'International Patient Director',
      specialization: 'Smile Design Consultant',
      experience: '10+ Years',
      credentials: [
        'BDS',
        '10+ Years Experience'
      ],
      specialties: [
        'Smile Makeover Consultation',
        'Full Mouth Treatment Planning',
        'Cosmetic Dentistry Planning',
        'International Patient Coordination'
      ],
      description: 'Dr. Jishnu Premnath is a visionary smile design expert who transforms dreams into reality. With a keen artistic eye and clinical precision, he specializes in comprehensive smile makeovers and cosmetic dentistry planning. His role as International Patient Director reflects his commitment to providing world-class care to patients from across the globe.',
      image: doctorJishnu
    },
    {
      id: 4,
      name: 'Dr. Sonika',
      title: 'Orthodontist',
      specialization: 'Invisalign & Clear Aligners Specialist',
      experience: '12+ Years',
      credentials: [
        'MDS – Orthodontics',
        '12+ Years Experience'
      ],
      specialties: [
        'Invisalign / Clear Aligners',
        'Braces (Ceramic & Self-Ligating)',
        'Smile Alignment & Bite Correction'
      ],
      description: 'Dr. Sonika is a certified orthodontics specialist with extensive training in modern aligner systems and advanced braces technology. Her patient-centric approach ensures comfortable and efficient treatment journeys. Whether choosing clear aligners for discretion or traditional braces for precision, patients benefit from her expertise in achieving perfectly aligned smiles.',
      image: 'https://via.placeholder.com/300x400?text=Dr.+Sonika'
    },
    {
      id: 5,
      name: 'Dr. N. Reddy Akhil',
      title: 'Prosthodontist',
      specialization: 'Maxillofacial Prosthetics | Certified Implantologist',
      experience: '15+ Years',
      credentials: [
        'MDS – Prosthodontics & Maxillofacial Prosthetics',
        '15+ Years Experience'
      ],
      specialties: [
        'Full Mouth Rehabilitation',
        'Dental Implants & Prosthesis',
        'Veneers, Crowns & Bridges',
        'Smile Reconstruction'
      ],
      description: 'Dr. N. Reddy Akhil is a highly skilled prosthodontist and certified implantologist specializing in complex full-mouth rehabilitations. His expertise in combining prosthetic excellence with implant dentistry enables comprehensive smile reconstruction. Patients seeking complete smile transformation benefit from his meticulous planning and execution.',
      image: 'https://via.placeholder.com/300x400?text=Dr.+N.+Reddy+Akhil'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 bg-[color:var(--bg)] min-w-0 overflow-x-hidden">
      <div className="max-w-7xl mx-auto min-w-0">
        {/* Section Header */}
        <div className="text-center mb-16 min-w-0">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-2 rounded-full bg-white border border-[color:var(--teal)]/10 shadow-sm text-[color:var(--teal)] text-xs font-bold uppercase tracking-[0.2em] mb-6 max-w-full">
            <span className="w-3 h-3 rounded-full bg-[color:var(--teal)] shadow-[0_0_8px_rgba(0,102,102,0.4)] shrink-0" />
            <span className="break-words text-left sm:text-center">{t('home.doctors.title')}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-[color:var(--dk)] mb-6 leading-tight break-words px-1">
            {t('home.doctors.teamH2Before')}
            <span className="italic text-[color:var(--teal)]">{t('home.doctors.teamH2Accent')}</span>
            {t('home.doctors.teamH2After')}
          </h2>
          <p className="text-[color:var(--muted)] max-w-3xl mx-auto text-lg leading-relaxed">
            {t('home.doctors.teamIntro')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 min-w-0">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full group cursor-pointer"
              onClick={() => setSelectedDoctor(doctor)}
            >
              {/* Image Container */}
              <div className="relative bg-gradient-to-br from-[color:var(--soft)] to-[color:var(--bg)] p-6 flex items-center justify-center min-h-[280px] overflow-hidden">
                <div className="w-full aspect-square rounded-2xl shadow-lg shadow-black/10 border border-black/5 flex items-center justify-center overflow-hidden bg-white group-hover:scale-105 transition-transform duration-500">
                  {doctor.image.includes('placeholder') ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[color:var(--teal)]/10 to-[color:var(--soft)] text-center p-4">
                      <div className="text-5xl mb-2">📷</div>
                      <p className="text-xs font-bold text-[color:var(--muted)] tracking-wide uppercase">{t('home.doctors.photoSoon')}</p>
                      <p className="text-[0.65rem] text-[color:var(--muted)] mt-2">{doctor.name}</p>
                    </div>
                  ) : (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Name & Title */}
                <div>
                  <h3 className="font-serif text-xl font-bold text-[color:var(--dk)] leading-tight">
                    {doctor.name}
                  </h3>
                  <p className="text-sm font-bold text-[color:var(--teal)] mt-2">
                    {doctor.title}
                  </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-black/5">
                  <span className="text-xs font-bold text-[color:var(--dk)] group-hover:text-[color:var(--teal)] transition-colors flex items-center gap-1">
                    {t('home.doctors.viewProfile')} <span className="text-lg">→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center p-10 rounded-3xl bg-gradient-to-r from-[color:var(--teal)]/10 to-[color:var(--soft)] border border-[color:var(--teal)]/20">
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[color:var(--dk)] mb-4">
            {t('home.doctors.ctaTitle')}
          </h3>
          <p className="text-[color:var(--muted)] mb-6 max-w-2xl mx-auto">
            {t('home.doctors.ctaDesc')}
          </p>
          <Link
            to="/booking"
            className="inline-block bg-[color:var(--teal)] text-white px-10 py-4 rounded-2xl font-bold hover:bg-[color:var(--dk)] transition-all shadow-lg shadow-[color:var(--teal)]/20 active:scale-95 no-underline"
          >
            {t('home.doctors.ctaButton')} →
          </Link>
        </div>
      </div>

      {/* Doctor Details Modal */}
      {selectedDoctor && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedDoctor(null)}
        >
          <div 
            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl relative animate-[fadeIn_0.3s_ease-out]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/5 hover:bg-black/10 rounded-full flex items-center justify-center text-xl text-[color:var(--dk)] transition-colors"
              onClick={() => setSelectedDoctor(null)}
            >
              ✕
            </button>

            {/* Left side: Image */}
            <div className="md:w-2/5 bg-gradient-to-br from-[color:var(--soft)] to-[color:var(--bg)] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-black/5">
                <div className="w-full aspect-square rounded-2xl shadow-lg shadow-black/10 overflow-hidden bg-white">
                  {selectedDoctor.image.includes('placeholder') ? (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[color:var(--teal)]/10 to-[color:var(--soft)] text-center p-4">
                      <div className="text-6xl mb-2">📷</div>
                    </div>
                  ) : (
                    <img src={selectedDoctor.image} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                  )}
                </div>
            </div>

            {/* Right side: Information */}
            <div className="md:w-3/5 p-8 md:p-10 overflow-y-auto custom-scrollbar">
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[color:var(--dk)] leading-tight mb-2">
                {selectedDoctor.name}
              </h3>
              <p className="text-xl font-bold text-[color:var(--teal)] mb-6">
                {selectedDoctor.title}
              </p>
              
              <div className="space-y-8">
                {/* Credentials & Specialization */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Credentials</h4>
                  <p className="text-gray-800 font-medium mb-2">{selectedDoctor.specialization}</p>
                  {selectedDoctor.credentials.map((cred, idx) => (
                    <p key={idx} className="text-gray-600 text-sm flex items-start gap-2 mb-1">
                      <span className="text-[color:var(--teal)] mt-0.5">•</span>
                      {cred}
                    </p>
                  ))}
                </div>

                {/* Specialties */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Core Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDoctor.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-[color:var(--soft)] border border-[color:var(--teal)]/10 text-[color:var(--dk)] px-4 py-2 rounded-full text-sm font-bold">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* About/Description */}
                <div>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">About</h4>
                  <p className="text-gray-700 leading-relaxed italic border-l-4 border-[color:var(--teal)]/30 pl-4">
                    {selectedDoctor.description}
                  </p>
                </div>

                {/* Experience Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-[color:var(--teal)]/10 border border-[color:var(--teal)]/20 shadow-sm">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm font-bold text-[color:var(--dk)]">
                    <span className="text-[color:var(--teal)]">{selectedDoctor.experience}</span> Experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Doctors;
