import { PageHero } from "@/components/site/page-hero";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, User, Image as ImageIcon, Sparkles } from "lucide-react";
import newsCricket1 from "@/assets/news-cricket-1.png";
import newsCricket2 from "@/assets/news-cricket-2.png";

const EVENTS_DATA = [
  {
    id: 1,
    title: "Exploring BBA / MBA World : Their Way",
    speaker: "Mozzammil Khalil",
    speakerMeta: "MMS from JBIMS (2023 Batch) | CAT 2021: 99.49%ile | MAH-CET 2021: 99.94%ile",
    description: "He shared insights on CAT and MAH-CET preparation, his MMS journey, and the transition to the corporate world. The interactive session was highly informative and motivating for MBA aspirants.",
    placeholderText: "Mozzammil Khalil Guest Session"
  },
  {
    id: 2,
    title: "LinkedIn Made Easy",
    speaker: "Ms. Bhavya Magnani",
    speakerMeta: "Social Media Manager & Personal Branding Strategist",
    description: "KATexpert conducted an engaging session focused on building a strong LinkedIn profile, personal branding, and effective networking strategies. Students gained practical insights on enhancing their professional presence online, making the session both informative and career-oriented.",
    placeholderText: "LinkedIn Made Easy Workshop"
  },
  {
    id: 3,
    title: "Detox Your Mind",
    speaker: "Ms. Tina Chachra",
    speakerMeta: "Founder & Healer",
    description: "KATexpert organized an enriching session focused on mental wellness, stress management, and maintaining a positive mindset during competitive exam preparation. Through interactive guidance and simple mindfulness techniques, students learned practical ways to improve focus and emotional balance.",
    placeholderText: "Detox Your Mind Wellness Session"
  }
];

export default function NewsEventsPage() {
  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800 animate-fade-in">
      <PageHero 
        title="News & Events" 
        subtitle="Enriching Sessions & Media Coverage at KATexpert" 
        breadcrumb={["Gallery", "News & Events"]} 
      />

      <div className="container-x max-w-4xl mx-auto mt-6 px-4">
        <Link 
          to="/about?tab=Gallery" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#ea580c] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Gallery</span>
        </Link>
      </div>

      {/* Events and Workshops Section */}
      <div className="container-x max-w-4xl mx-auto mt-10 px-4 space-y-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ea580c]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#ea580c] uppercase">
            <Sparkles className="h-3 w-3" /> Learning & Growth
          </span>
          <h2 className="text-3xl font-bold text-navy font-display mt-3">Interactive Workshops & Guest Sessions</h2>
          <p className="mt-2 text-sm text-slate-500">Topper roundtables, mental wellness sessions, and skill-building bootcamps to guide students beyond exams.</p>
        </div>

        <div className="space-y-8">
          {EVENTS_DATA.map((event) => (
            <div 
              key={event.id} 
              className="bg-white border border-slate-200/60 rounded-2xl shadow-soft overflow-hidden grid md:grid-cols-[250px_1fr] min-h-[220px]"
            >
              {/* Image Placeholder Frame */}
              <div className="bg-slate-100/70 border-b md:border-b-0 md:border-r border-slate-200/60 flex flex-col items-center justify-center p-6 text-center text-slate-400 group hover:bg-slate-100 transition-colors">
                <ImageIcon className="h-8 w-8 text-slate-300 group-hover:text-accent transition-colors" />
                <span className="mt-3 text-xs font-medium text-slate-500 leading-snug max-w-[180px]">
                  {event.placeholderText}
                </span>
                <span className="mt-1 text-[10px] text-slate-400 italic">
                  [Image Space]
                </span>
              </div>

              {/* Event Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent px-2 py-0.5 rounded-md">
                      Event #{event.id}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
                      <User className="h-3 w-3" /> Speaker: {event.speaker}
                    </span>
                  </div>

                  <h3 className="mt-2.5 text-xl font-bold text-navy leading-snug">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/40 p-2 rounded-lg leading-relaxed">
                    {event.speakerMeta}
                  </p>

                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Press Coverage Section */}
      <div className="container-x max-w-4xl mx-auto mt-20 px-4 space-y-8 border-t border-slate-200/50 pt-16">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ea580c]/10 px-3 py-1 text-xs font-semibold tracking-wider text-[#ea580c] uppercase">
            <Calendar className="h-3 w-3" /> Media & Sports
          </span>
          <h2 className="text-3xl font-bold text-navy font-display mt-3">Box Cricket League Press Release</h2>
          <p className="mt-2 text-sm text-slate-500">Official newspaper coverage of the annual KATexpert Box Cricket League championship.</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {[
            { src: newsCricket1, alt: "Sigmas beat Vibers for trophy" },
            { src: newsCricket2, alt: "The Sigmas triumph" }
          ].map((img, i) => (
            <div key={i} className="bg-white border border-slate-200/60 p-4 rounded-2xl shadow-soft flex flex-col items-center">
              <a href={img.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform cursor-zoom-in">
                <img src={img.src} alt={img.alt} className="w-full h-auto object-contain max-h-[600px]" />
              </a>
              <span className="mt-3.5 text-xs font-semibold text-slate-500">{img.alt}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
