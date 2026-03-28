import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, CalendarDays, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ShufflerCard = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Commercial', desc: 'Large scale office soundproofing.', color: 'bg-card text-primary' },
    { id: 2, title: 'Healthcare', desc: 'Clinical acoustic isolation setups.', color: 'bg-dark text-on-dark border border-card/20' },
    { id: 3, title: 'Education', desc: 'Classroom reverberation control.', color: 'bg-accent text-on-dark' }
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      // Animate out top card, move up others, bring out to back
      gsap.to(".shuffler-item", {
        y: (index) => index === 0 ? -40 : 0,
        opacity: (index) => index === 0 ? 0 : 1,
        scale: (index) => index === 0 ? 0.9 : 1,
        duration: 0.5,
        ease: "back.out(1.5)",
        onComplete: () => {
          setCards(prev => {
            const next = [...prev];
            const first = next.shift();
            next.push(first);
            return next;
          });
        }
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative h-64 w-full flex items-center justify-center perspective-[1000px]">
      {cards.map((card, idx) => (
        <div
          key={card.id}
          className={`shuffler-item absolute w-[90%] sm:w-[80%] h-48 rounded-[2rem] p-6 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${card.color}`}
          style={{
            zIndex: 3 - idx,
            transform: `translateY(${idx * 15}px) scale(${1 - idx * 0.05})`,
            opacity: 1 - idx * 0.2
          }}
        >
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-heading font-bold text-xl">{card.title}</h4>
            <Activity size={20} className="opacity-50" />
          </div>
          <p className="font-data text-sm opacity-80">{card.desc}</p>
        </div>
      ))}
    </div>
  );
};

const TypewriterCard = () => {
  const [text, setText] = useState('');
  const fullText = "Analyzing acoustic parameters...\nGenerating spatial blueprint...\nCalculating reverb time (RT60)...\nOptimizing material absorption...\nOutput: Tailored Strategy Ready.";

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= fullText.length) {
        setText(fullText.slice(0, currentIdx));
        currentIdx++;
      } else {
        setTimeout(() => { currentIdx = 0; setText(''); }, 3000);
      }
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 w-full bg-dark text-emerald-400 p-6 rounded-[2rem] flex flex-col items-start justify-between shadow-lg border border-subtle/20">
      <div className="flex w-full justify-between items-center mb-4">
        <h4 className="font-heading text-sm text-slate-300 flex items-center gap-2">
          <Terminal size={14} /> LIVE TELEMETRY
        </h4>
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10B981]"></span>
      </div>
      <div className="font-data text-xs sm:text-sm whitespace-pre-wrap flex-1 overflow-hidden leading-relaxed">
        {text}<span className="inline-block w-2 bg-emerald-400 animate-pulse ml-1">&nbsp;</span>
      </div>
    </div>
  );
};

const SchedulerCard = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const [activeDay, setActiveDay] = useState(3); // Wednesday
  // eslint-disable-next-line no-unused-vars
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Move cursor to day T(2)
      tl.to(cursorRef.current, { x: 50, y: 30, duration: 1, ease: 'power2.inOut' })
        .call(() => setIsClicking(true))
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => { setActiveDay(2); setIsClicking(false); })
        .to(cursorRef.current, { scale: 1, duration: 0.1 })

        // Move to Save button
        .to(cursorRef.current, { x: 180, y: 140, duration: 1, ease: 'power2.inOut', delay: 0.5 })
        .call(() => setIsClicking(true))
        .to(cursorRef.current, { scale: 0.8, duration: 0.1 })
        .call(() => setIsClicking(false))
        .to(cursorRef.current, { scale: 1, duration: 0.1 })

        // Move off screen and hide
        .to(cursorRef.current, { opacity: 0, scale: 2, duration: 0.5, delay: 0.5 })
        // Reset
        .set(cursorRef.current, { x: -20, y: -20, opacity: 1, scale: 1 })
        .call(() => setActiveDay(-1));

    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-64 w-full bg-card p-6 rounded-[2rem] flex flex-col relative shadow-xl border border-primary/5 overflow-hidden">
      <h4 className="font-heading font-bold text-primary mb-6 flex items-center gap-2">
        <CalendarDays size={18} /> Protocol Timeline
      </h4>

      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-8 relative z-10">
        {days.map((d, i) => (
          <div
            key={i}
            className={`aspect-square rounded-md flex items-center justify-center font-data text-xs transition-colors duration-300 ${activeDay === i ? 'bg-accent text-on-dark shadow-lg scale-110' : 'bg-dark/5 text-primary/50'
              }`}
          >
            {d}
          </div>
        ))}
      </div>

      <div className="relative z-10 self-end mt-auto">
        <button className="bg-dark text-on-dark px-4 py-2 rounded-full font-heading text-xs font-semibold hover-lift">
          Confirm Rollout
        </button>
      </div>

      {/* SVG Cursor */}
      <div ref={cursorRef} className="absolute top-10 left-10 pointer-events-none z-20" style={{ filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.3))' }}>
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.65376 2.0519L20.8997 18.0673C21.8415 19.0569 21.0568 20.6558 19.6975 20.5739L13.7388 20.2144C13.2982 20.1878 12.8797 20.3951 12.6247 20.7656L8.85172 26.2483C7.9944 27.4938 6.00282 26.9749 5.864 25.4746L4.35515 9.17227C4.218 7.69018 5.76632 6.6432 7.02706 7.36879L5.65376 2.0519Z" fill="white" stroke="#0F172A" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
};

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-block", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-transparent max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 gap-y-16 mt-12">

        {/* Value Prop 1 */}
        <div className="feature-block flex flex-col gap-6">
          <div>
            <h3 className="font-heading font-bold text-2xl text-primary">Industry Expertise</h3>
            <p className="font-data text-sm text-slate-600 mt-2">Decades of specialized experience in deploying architectural acoustic blueprints.</p>
          </div>
        </div>

        {/* Value Prop 2 */}
        <div className="feature-block flex flex-col gap-6">
          <div>
            <h3 className="font-heading font-bold text-2xl text-primary">Tailored Solutions</h3>
            <p className="font-data text-sm text-slate-600 mt-2">Custom strategies mathematically modeled and calibrated for your specific environment.</p>
          </div>
        </div>

        {/* Value Prop 3 */}
        <div className="feature-block flex flex-col gap-6">
          <div>
            <h3 className="font-heading font-bold text-2xl text-primary">Fast Implementation</h3>
            <p className="font-data text-sm text-slate-600 mt-2">Quick results with seamless rollout protocols and minimal operational disruption.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
