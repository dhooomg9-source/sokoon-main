import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, Blocks, Volume2, ShieldCheck, Hammer, Sparkles, Building2, Trees, Activity, Palette } from 'lucide-react';
import servicesHeroBg from '../assets/generated/services_hero_bg.png';

gsap.registerPlugin(ScrollTrigger);

const acousticServices = [
  {
    title: 'Assessment & Testing',
    slug: 'assessment-and-testing',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
    icon: FileText
  },
  {
    title: 'Acoustic Panelling',
    slug: 'acoustic-paneling',
    img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
    icon: Blocks
  },
  {
    title: 'Sound Masking',
    slug: 'sound-masking',
    img: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200',
    icon: Volume2
  }
];

const specialistSolutions = [
  {
    title: 'Acoustic Spray',
    desc: 'We apply high-performance acoustic spray to control echo and improve sound quality in large, open spaces. Creates a seamless, sound-absorbing surface that blends into the architecture without affecting visual design.'
  },
  {
    title: 'Fabric Stretch Systems',
    desc: 'Custom fabric installations designed to control sound reflections and improve room acoustics. Enhances clarity and reduces noise, creating more comfortable and functional spaces like offices or auditoriums.'
  },
  {
    title: 'Box in a Box Systems',
    desc: 'The ultimate noise isolation method. We construct a fully decoupled inner room floating within the outer structure, guaranteeing zero structural vibration or airborne noise transfer for hyper-sensitive spaces.'
  },
  {
    title: 'Floating Floor, Ceiling & Wall Systems',
    desc: 'Engineered structural decoupling. By isolating floors, walls, and ceilings from the base structure, we mitigate impact noise and vibration transmission between levels in high-performance environments.'
  },
  {
    title: 'Sound Masking Systems',
    desc: 'Sophisticated electronic systems that introduce a subtle, ambient background noise. Designed to match the frequencies of human speech, effectively masking it from listeners and guaranteeing privacy.'
  }
];

const consultationServices = [
  { title: "Noise Survey", icon: Activity, desc: "Detailed on-site assessment to measure noise levels and identify specific sound-related issues with tailored recommendations for effective noise control." },
  { title: "Acoustic Consultancy", icon: Building2, desc: "Specialized advice and planning to optimize acoustic performance in various environments, including offices, theaters, and industrial spaces." },
  { title: "Acoustic Design Services", icon: Palette, desc: "Customized design strategies focused on improving clarity, reducing unwanted noise, and optimizing acoustic for both comfort and functionality in different settings." },
  { title: "Sound Proofing Consultancy", icon: ShieldCheck, desc: "Bespoke solutions to reduce sound transmission, enhance privacy, and create quieter, more peaceful spaces in residential, commercial, and industrial buildings." }
];

const servicePromises = [
  { num: "01", title: "Acoustic Survey & Design", desc: "We begin with rigorous on-site acoustic testing and detailed 3D modeling to tailor a solution precisely to your spatial acoustic signature." },
  { num: "02", title: "Product Specification", desc: "Leveraging our vast catalog of premium materials, we specify solutions that perform flawlessly while adhering strictly to your design aesthetic." },
  { num: "03", title: "Expert Installation", desc: "Our in-house master acoustic fitters ensure that every panel, spray, and system is installed with absolute precision and no disruption." },
  { num: "04", title: "Post-Completion Testing", desc: "We don't guess. We verify. Our final stage involves comprehensive acoustic testing to guarantee we hit the targeted performance parameters." }
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".reveal-item", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-body text-primary pt-[180px] pb-24 relative z-0">
      {/* Hero Background Image */}
      <div className="absolute top-0 left-0 w-full h-[700px] -z-10 pointer-events-none overflow-hidden">
        <img 
          src={servicesHeroBg} 
          alt="Services" 
          className="w-full h-full object-cover object-center animate-[imageReveal_2s_ease-out_forwards] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] opacity-0 scale-105" 
          style={{ animation: 'imageReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        />
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes imageReveal {
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
      
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-[350px]">
        <div className="mb-20 reveal-item flex flex-col items-center text-center">
          <h1 className="font-heading font-black text-[3.5rem] md:text-7xl mb-6 text-[#774b2a] tracking-tighter uppercase">
            Our Integrated <br className="hidden md:block"/> Services
          </h1>
          <p className="font-data text-slate-800 max-w-4xl text-[1.15rem] md:text-xl leading-relaxed font-semibold">
            From precise acoustic diagnostics to the installation of premium sound control systems. We engineer silence with unparalleled accuracy.
          </p>
        </div>
      </section>

      {/* Core 3 Columns (Reference Resonics) */}
      <section className="reveal-item w-full flex flex-col md:flex-row h-auto md:h-[600px] mb-32">
        {acousticServices.map((service, idx) => (
          <Link 
            to={`/services/${service.slug}`} 
            key={idx}
            className="group relative flex-1 min-h-[300px] overflow-hidden bg-black border-r border-body/10 last:border-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-60"
              style={{ backgroundImage: `url(${service.img})`}}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="w-14 h-14 rounded-full bg-body/10 backdrop-blur-md flex items-center justify-center mb-6 group-hover:-translate-y-2 transition-transform duration-500">
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="font-heading font-black text-3xl md:text-4xl text-white mb-4 group-hover:-translate-y-2 transition-transform duration-500 delay-75">
                {service.title}
              </h2>
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Specialist Solutions */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-32">
        <h2 className="reveal-item font-heading font-bold text-4xl text-accent mb-12">Acoustic Specialist Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialistSolutions.map((sol, idx) => (
            <div key={idx} className="reveal-item">
              <div className="bg-card h-full p-10 rounded-[2rem] border border-subtle/30 shadow-sm hover:shadow-xl hover:border-accent hover:-translate-y-2 transition-all duration-500 group">
                <h3 className="font-heading font-bold text-2xl text-primary mb-4 group-hover:text-accent transition-colors">{sol.title}</h3>
                <p className="font-data text-copy/80 leading-relaxed text-sm">{sol.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consultation Services (Acoustieg reference) */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-32">
        <h2 className="reveal-item font-heading font-bold text-4xl text-accent mb-6 relative z-10">Consultation Services</h2>
        <p className="reveal-item font-data text-copy/70 max-w-2xl mb-12 text-lg relative z-10">
          Independent, expert acoustic engineering consultation. We provide data-driven insights and architectural guidance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {consultationServices.map((consult, idx) => (
            <div key={idx} className="reveal-item">
              <div className="bg-card h-full p-10 rounded-[2rem] border border-subtle/30 shadow-sm hover:shadow-xl hover:border-accent hover:-translate-y-2 transition-all duration-500 group">
                <consult.icon className="w-10 h-10 text-accent mb-6 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-heading font-bold text-2xl text-primary mb-4 group-hover:text-accent transition-colors">{consult.title}</h3>
                <p className="font-data text-copy/80 leading-relaxed text-sm">{consult.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Promise (Resonics Start to finish reference) */}
      <section className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="mb-16">
          <p className="reveal-item font-data text-accent font-bold uppercase tracking-widest mb-4">Our Service Promise</p>
          <h2 className="reveal-item font-heading font-black text-5xl md:text-6xl text-black max-w-3xl leading-tight">
            From start to finish, <br/><span className="text-slate-400">we handle everything.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicePromises.map((promise, idx) => (
            <div key={idx} className="reveal-item">
              <div 
                className="group relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden bg-white border border-slate-200 cursor-default"
              >
                {/* Default state */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-500 group-hover:opacity-0 z-10">
                  <span className="font-data text-4xl text-slate-300 font-black">{promise.num}</span>
                  <h3 className="font-heading font-bold text-2xl text-black">{promise.title}</h3>
                </div>

                {/* Hover state */}
                <div className="absolute inset-0 p-8 bg-accent text-white flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
                  <h3 className="font-heading font-bold text-xl mb-4">{promise.title}</h3>
                  <p className="font-data text-sm text-white/90 leading-relaxed">{promise.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
