import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  LineChart,
  Users,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  Trophy,
  TrendingUp,
  Quote,
  MessageSquare,
  Send,
  Clock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { CONTACT_INFO, COURSES, FACULTY, TOPPERS, TESTIMONIALS } from "@/lib/site-data";
import DossierDrawer from "@/components/site/DossierDrawer";
import galleryData from "@/data/gallery.json";
import { Lightbox } from "@/components/site/Lightbox";
import newsCricket1 from "@/assets/news-cricket-1.png";
import newsCricket2 from "@/assets/news-cricket-2.png";

const VIDEO_TESTIMONIALS = [
  {
    id: "abeer",
    youtubeId: "I1Z6BsYjHXk",
    name: "Abeer Bhaiya",
    exam: "CAT",
    college: "IIM Ahmedabad",
    score: "99.8%ile",
    quote: "KATexpert gave me the structure I needed to convert my CAT dream into reality.",
    title: "Hear It From Our Achievers"
  },
  {
    id: "khushi",
    youtubeId: "RUch3M7DeR0",
    name: "Khushi Khandelwal",
    exam: "IPMAT",
    college: "IIM Indore",
    score: "AIR 12",
    quote: "The mentorship here is unmatched — every doubt cleared, every step guided.",
    title: "Why Students Trust KATexpert"
  },
  {
    id: "arpit",
    youtubeId: "QxO2NxT7BxA",
    name: "Arpit",
    exam: "MBA CET",
    college: "JBIMS Mumbai",
    score: "99.94%ile",
    quote: "From average scores to a top JBIMS seat — the KATexpert grind changed everything.",
    title: "Arpit's CET Success Story"
  },
  {
    id: "tanishq",
    youtubeId: "7WWzJHTznMs",
    name: "Tanishq Chhajer",
    exam: "CAT",
    college: "IIM Bangalore",
    score: "99.6%ile",
    quote: "The faculty knows exactly where students struggle and how to fix it fast.",
    title: "Get the Guidance You Deserve"
  },
  {
    id: "atharv",
    youtubeId: "D2MOUroto0k",
    name: "Atharv",
    exam: "MBA CET",
    college: "SIMSREE Mumbai",
    score: "99.87%ile",
    quote: "Consistent mocks and honest feedback — that's the KATexpert formula.",
    title: "Atharv's CET Success Story"
  },
  {
    id: "why-love",
    youtubeId: "yYUONg1f-Sw",
    name: "Priya S.",
    exam: "CAT",
    college: "IIM Lucknow",
    score: "99.5%ile",
    quote: "It stopped feeling like coaching and started feeling like a second home.",
    title: "Why Students Love KATexpert"
  },
  {
    id: "rupali",
    youtubeId: "e_e0P-FHeJ8",
    name: "Rupali",
    exam: "MCA CET",
    college: "VJTI Mumbai",
    score: "99.72%ile",
    quote: "Personal attention that big institutes just can't offer.",
    title: "Rupali's Success Story"
  },
  {
    id: "comfort",
    youtubeId: "5QxsWC1Jkz4",
    name: "Aditya M.",
    exam: "IPMAT",
    college: "IIM Rohtak",
    score: "AIR 47",
    quote: "The environment lets you ask the silliest question without hesitation.",
    title: "Why Students Feel Comfortable Here"
  },
  {
    id: "guidance",
    youtubeId: "Ns_tSPuYHAA",
    name: "Sneha K.",
    exam: "CRT",
    college: "TCS Digital",
    score: "Placed",
    quote: "Cracked my first campus interview thanks to KATexpert's CRT program.",
    title: "Success Starts with the Right Guidance"
  },
  {
    id: "kasak",
    youtubeId: "5-BL0hHz0IQ",
    name: "Kasak",
    exam: "CAT",
    college: "IIM Kozhikode",
    score: "99.3%ile",
    quote: "Went from fearing quant to topping quant sectionals — literally.",
    title: "Kasak's Math Transformation Story"
  },
  {
    id: "yashi",
    youtubeId: "rjA_MCLB2UM",
    name: "Yashi",
    exam: "CAT",
    college: "IIM Calcutta",
    score: "99.91%ile",
    quote: "Strategy sessions with mentors saved months of misdirected effort.",
    title: "Yashi's CAT Preparation Strategy"
  },
  {
    id: "krish",
    youtubeId: "F1B35HJKOpM",
    name: "Krish Sir's Batch",
    exam: "CAT",
    college: "Multiple IIMs",
    score: "99+%ile",
    quote: "Krish Sir breaks down CAT into a plan you can execute.",
    title: "CAT 2025 Exam Pattern & Strategy"
  },
  {
    id: "arumita",
    youtubeId: "4F12hXxDKr4",
    name: "Arumita Ma'am's Batch",
    exam: "IPMAT",
    college: "IIM Indore & Rohtak",
    score: "Top Ranks",
    quote: "Every IPMAT trick condensed into actionable classroom insights.",
    title: "IPMAT Tips You Can't Miss"
  },
  {
    id: "varc",
    youtubeId: "Q-87AntscUw",
    name: "Featured Masterclass",
    exam: "CAT",
    college: "All Programs",
    score: "Featured",
    quote: "A masterclass on VARC strategy and attempt planning that changes how you approach the section.",
    title: "VARC Strategy 2025 — Attempt & Exam Pattern"
  }
];

const NEWS_EVENTS = [
  {
    id: 1,
    type: "News",
    title: "Sigmas Clinch KATexpert Box Cricket League Trophy",
    date: "Published July 12, 2026",
    time: "9:00 AM - 5:00 PM",
    venue: "Wings Turf, Bishop School, Civil Lines",
    desc: "Four teams competed fiercely in the annual KATexpert Box Cricket League. In a thrilling final, the 'Sigmas' captained by Hiten Khatod defeated the 'Vibers' by 8 runs, scoring 63 runs in 8 overs and defending it by restricting the opponents to 55 runs. Individual accolades went to Aniket Matte & Shravani Raut (Best Bowlers) and Vishal Sakharwade & Sanjana Manekar (Best Batsmen). The event was graced by directors Dr. Arumita Pawa, Krish Vyas, along with Manoj Pawa and Amit Gandhare.",
    images: [newsCricket1, newsCricket2]
  }
];

export default function AboutPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('About');
  const [selectedMentor, setSelectedMentor] = useState(null);

  // Gallery Sub-tab states
  const [gallerySubTab, setGallerySubTab] = useState("photos");
  const [galleryCategory, setGalleryCategory] = useState("All");
  const [galleryLightboxIndex, setGalleryLightboxIndex] = useState(null);
  const [galleryVideoFilter, setGalleryVideoFilter] = useState("All");

  const filteredPhotos = useMemo(() => {
    if (galleryCategory === "All") return galleryData;
    return galleryData.filter((i) => i.category === galleryCategory);
  }, [galleryCategory]);

  const lightboxImages = useMemo(() => {
    return filteredPhotos.map((f) => ({
      src: f.src,
      full: f.full,
      w: f.w,
      h: f.h,
      category: f.category,
      alt: `${f.category} — KAT Experts`,
    }));
  }, [filteredPhotos]);

  const filteredVideos = useMemo(() => {
    if (galleryVideoFilter === "All") return VIDEO_TESTIMONIALS;
    return VIDEO_TESTIMONIALS.filter((t) => t.exam === galleryVideoFilter);
  }, [galleryVideoFilter]);

  // Sync state with URL query parameters and scroll to hash anchor
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab && ['About', 'Faculty', 'Gallery', 'Reviews', 'Contact'].includes(tab)) {
      setActiveTab(tab);
    }
    const subtab = params.get('subtab');
    if (subtab && ['photos', 'videos', 'news'].includes(subtab)) {
      setGallerySubTab(subtab);
    }
    const mentor = params.get('mentor');
    if (mentor) {
      setSelectedMentor(mentor);
    } else {
      setSelectedMentor(null);
    }

    // Handle smooth scrolling to specific faculty member anchor
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 400); // 400ms delay ensures the DOM has updated and tab animation completed
    }
  }, [location.search, location.hash]);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'CAT',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: 'CAT',
          message: '',
        });
        setIsSubmitted(false);
      }, 4000);
    }
  };

  // Scroll animations observer
  useEffect(() => {
    const animObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.animate-on-scroll');
    revealElements.forEach((el) => {
      animObserver.observe(el);
    });

    return () => animObserver.disconnect();
  }, [activeTab]);

  const tabs = [
    { id: 'About', label: 'About Us' },
    { id: 'Faculty', label: 'Elite Mentors' },
    { id: 'Gallery', label: 'Gallery' },
    { id: 'Reviews', label: 'Reviews' },
    { id: 'Contact', label: 'Contact Us' }
  ];

  // Motion animation parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const pillars = [
    {
      icon: <Users className="w-8 h-8 text-brand-orange" />,
      title: 'Personal Mentorship',
      desc: 'One-on-one strategy sessions and individual doubt-clearing with elite faculty members to resolve concepts and map individual exam plans.',
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand-orange" />,
      title: 'Hybrid Mode Learning',
      desc: 'Flexible academic delivery combining structured offline physical classroom lectures in Nagpur with the modern convenience of live online backups.',
    },
    {
      icon: <LineChart className="w-8 h-8 text-brand-orange" />,
      title: 'Mock Analytics & Strategy',
      desc: 'In-depth diagnostic analytics of full-length mocks to track individual accuracy, speed variables, sectional benchmarks, and concept weak points.',
    },
  ];

  return (
    <div className="bg-slate-50/50 pt-32 pb-12 font-sans text-slate-800" id="about-tabbed-page-root">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6 flex justify-start">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-brand-blue hover:text-brand-orange hover:border-brand-orange/30 shadow-sm transition-all hover:scale-101"
            id="about-back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Navigation Tabs Bar - Inspired by the original about-us header layout */}
        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 mb-12 border-b border-slate-200 pb-4" id="about-page-tab-bar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/15 scale-102'
                    : 'text-brand-blue hover:bg-slate-100 hover:scale-101'
                }`}
                id={`about-tab-${tab.id.toLowerCase()}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Panels */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="outline-none"
          >
            
            {/* ABOUT US TAB VIEW */}
            {activeTab === 'About' && (
              <div id="tab-pane-about-us">
                {/* About Header Hero */}
                <div className="text-center max-w-3xl mx-auto mb-16" id="about-hero">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-4 py-1.5 rounded-full inline-block mb-4">
                    Our Story & Philosophy
                  </span>
                  <h1 className="text-4xl sm:text-5xl font-display font-bold text-brand-blue tracking-tight mb-6">
                    About <span className="text-brand-orange">KATexpert</span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 font-medium italic">
                    "A Place to Learn, A Place to Grow"
                  </p>
                  <div className="w-16 h-1.5 bg-brand-orange rounded-full mx-auto mt-6" />
                </div>

                {/* Vision & Core Concept Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20" id="about-philosophy-grid">
                  <div className="space-y-6 text-left">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
                      Our Vision: Nurturing Careers through Excellence
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-base">
                      At <strong className="text-brand-blue">KATexpert</strong>, we operate strictly under
                      the ethos of
                      <strong className="text-brand-orange"> "A Place to Learn, A Place to Grow"</strong>.
                      We are a leading test preparation institute based out of Dharampeth, Nagpur,
                      specializing in guiding aspirants through highly competitive entrance examinations.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-base">
                      We focus on building rock-solid conceptual clarity before subjecting students to
                      high-pressure timed simulators. By offering a hybrid mode of coaching, our students
                      experience physical, face-to-face mentorship alongside online resources, combining
                      stability with flexibility.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Concept-First Teaching</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Hybrid Classroom Backup</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">Weekly Sectional Drills</span>
                      </div>
                      <div className="flex items-center space-x-2.5">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                        <span className="text-sm font-bold text-brand-blue">One-on-One Mentorship</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-xl shadow-slate-100/50 relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-bl-full -z-1" />
                    <h3 className="text-xl font-bold text-brand-blue mb-4">Why KATexpert?</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      Our preparation cycles are structured to transition candidates from general
                      understanding to competitive top-percentile ranks. Every student receives individual
                      focus through personalized scorecard analysis.
                    </p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-brand-blue">
                        <h4 className="text-sm font-bold text-brand-blue">Live & Hybrid Flex</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Never miss a lecture. Revise physical classes through our integrated portals
                          anytime.
                        </p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl border-l-4 border-brand-orange">
                        <h4 className="text-sm font-bold text-brand-blue">Rigorous Mock Drills</h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Practice under real environment simulators with feedback mapping for weakness
                          fixes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pillars Section */}
                <div className="mb-20">
                  <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-brand-blue">
                      Our Three Academic Pillars
                    </h2>
                    <p className="text-sm text-gray-500 mt-2">
                      The framework that drives student success across Nagpur and beyond
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-left"
                      >
                        <div className="w-14 h-14 bg-brand-orange/10 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                          {pillar.icon}
                        </div>
                        <h3 className="text-lg font-bold text-brand-blue mb-3">{pillar.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coaching Verticals Portfolio Summary */}
                <div className="bg-brand-blue text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-20 text-left">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-1" />
                  <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl -z-1" />

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
                    <div className="lg:col-span-1 space-y-4">
                      <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-white/10 px-3.5 py-1.5 rounded-full inline-block">
                        Coaching Verticals
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                        Our Entrance Portfolios
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        We design specialized batches to ensure students learn systematically, keeping focus
                        on core competitive criteria.
                      </p>
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {COURSES.map((course) => (
                        <div
                          key={course.id}
                          className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl hover:bg-white/15 transition-colors"
                        >
                          <div className="text-brand-orange font-bold text-base mb-1">{course.title}</div>
                          <div className="text-xs text-white/90 font-bold">{course.category} Category</div>
                          <div className="text-[10px] text-slate-300 mt-2 font-medium">
                            {course.duration} Batch
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* FACULTY TAB VIEW */}
            {activeTab === 'Faculty' && (
              <div id="tab-pane-faculty" className="bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-sm text-left">
                {/* Header */}
                <div className="mb-12">
                  <h2 className="text-3xl font-display font-extrabold text-brand-blue tracking-tight relative inline-block pb-3">
                    Faculty
                    <div className="absolute bottom-0 left-0 w-16 h-1 bg-[#ea580c] rounded-full" />
                  </h2>
                </div>

                {/* Faculty List */}
                <div className="space-y-12">
                  {FACULTY.map((member, idx) => {
                    // Helper function to render paragraphs and lists dynamically
                    const renderBioParagraphs = (paragraphs) => {
                      if (!paragraphs) return null;
                      let inList = false;
                      const elements = [];
                      let currentListItems = [];

                      paragraphs.forEach((p, pIdx) => {
                        const isBullet = p.startsWith('•') || p.startsWith('-') || p.startsWith('*');

                        if (isBullet) {
                          if (!inList) {
                            inList = true;
                            currentListItems = [];
                          }
                          const text = p.replace(/^[•\-\*]\s*/, '');
                          currentListItems.push(text);
                        } else {
                          if (inList) {
                            const listKey = `list-${pIdx}`;
                            elements.push(
                              <ul key={listKey} className="list-disc pl-5 space-y-2 text-slate-700 text-sm md:text-base my-4">
                                {currentListItems.map((item, i) => (
                                  <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                              </ul>
                            );
                            inList = false;
                          }
                          elements.push(
                            <p
                              key={pIdx}
                              className="text-slate-700 text-sm md:text-base leading-relaxed"
                              dangerouslySetInnerHTML={{
                                __html: p
                                  .replace(/Personal Interviews \(PI\)/g, "<strong>Personal Interviews (PI)</strong>")
                                  .replace(/Group Discussions \(GD\)/g, "<strong>Group Discussions (GD)</strong>")
                                  .replace(/Group Discussion \(GD\)/g, "<strong>Group Discussion (GD)</strong>")
                                  .replace(/Personal Interview \(PI\)/g, "<strong>Personal Interview (PI)</strong>")
                              }}
                            />
                          );
                        }
                      });

                      if (inList && currentListItems.length > 0) {
                        elements.push(
                          <ul key="final-list" className="list-disc pl-5 space-y-2 text-slate-700 text-sm md:text-base my-4">
                            {currentListItems.map((item, i) => (
                              <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                          </ul>
                        );
                      }

                      return elements;
                    };

                    return (
                      <div key={member.name} id={member.slug} className="scroll-mt-32">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                          {/* Left Column: Photo */}
                          <div className="col-span-12 md:col-span-3 flex justify-center md:justify-start">
                            <div className="w-full max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-50 flex items-center justify-center">
                              {member.image ? (
                                <img
                                  src={member.image}
                                  alt={member.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-brand-blue text-white">
                                  <span className="text-2xl font-bold font-display">{member.name[0]}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Column: Bio */}
                          <div className="col-span-12 md:col-span-9 space-y-4">
                            <div>
                              <h3 className="text-2xl font-display font-extrabold text-brand-blue tracking-tight">
                                {member.name}
                              </h3>
                              <p className="mt-2 text-xs md:text-sm font-semibold text-[#ea580c] leading-relaxed uppercase tracking-wider">
                                {member.designation}
                              </p>
                            </div>

                            <div className="space-y-4">
                              {renderBioParagraphs(member.longBio)}
                            </div>
                          </div>
                        </div>

                        {/* Orange Divider between rows */}
                        {idx < FACULTY.length - 1 && (
                          <div className="w-full border-t border-[#ea580c] my-12" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GALLERY TAB VIEW */}
            {activeTab === 'Gallery' && (
              <div id="tab-pane-gallery" className="space-y-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-8">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Gallery
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Life at KATexpert in <span className="text-brand-orange">Frames</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    A glimpse into our classrooms, victory celebrations, mock bootcamp sessions, and interactive workshops.
                  </p>
                </div>

                {/* Sub-tabs Nav */}
                <div className="flex justify-center border-b border-gray-200 max-w-md mx-auto mb-10">
                  <div className="flex space-x-8">
                    {[
                      { id: "photos", label: "Photos" },
                      { id: "videos", label: "Videos" },
                      { id: "news", label: "News & Events" },
                    ].map((tab) => {
                      const isActive = gallerySubTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setGallerySubTab(tab.id)}
                          className={`pb-4 text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                            isActive
                              ? "border-brand-orange text-brand-orange"
                              : "border-transparent text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Content Render */}
                {gallerySubTab === "photos" && (
                  <div className="space-y-6">

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredPhotos.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => setGalleryLightboxIndex(idx)}
                          className="group relative overflow-hidden rounded-2xl bg-slate-100 aspect-square cursor-zoom-in border border-slate-200/60 shadow-sm"
                        >
                          <img
                            src={item.src}
                            alt={item.category}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-brand-orange px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Lightbox */}
                    {galleryLightboxIndex !== null && (
                      <Lightbox
                        images={lightboxImages}
                        index={galleryLightboxIndex}
                        onClose={() => setGalleryLightboxIndex(null)}
                        onIndexChange={setGalleryLightboxIndex}
                      />
                    )}
                  </div>
                )}

                {gallerySubTab === "videos" && (
                  <div className="space-y-6">


                    {/* Videos Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredVideos.map((video, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-md flex flex-col justify-between">
                          <div className="relative aspect-video bg-black">
                            <iframe
                              src={`https://www.youtube.com/embed/${video.youtubeId}`}
                              title={video.title}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                          <div className="p-5 flex-1 flex flex-col justify-between text-left">
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/5 px-2.5 py-1 rounded-full">
                                  {video.exam}
                                </span>
                                {video.score && (
                                  <span className="text-[10px] font-bold text-brand-blue uppercase bg-brand-blue/5 px-2.5 py-1 rounded-full">
                                    {video.score}
                                  </span>
                                )}
                              </div>
                              <h3 className="font-display font-bold text-brand-blue text-sm leading-normal">
                                {video.title}
                              </h3>
                              <p className="text-xs text-gray-500 italic">
                                "{video.quote}"
                              </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-gray-400">
                              <span>{video.name}</span>
                              <span className="text-brand-blue">{video.college}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {gallerySubTab === "news" && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex flex-col gap-6">
                      {NEWS_EVENTS.map((event) => (
                        <div key={event.id} className="rounded-3xl border border-slate-100 bg-white p-6 shadow-md flex flex-col md:flex-row gap-6 text-left">
                          {/* Type Badge */}
                          <div className="md:w-36 shrink-0 flex flex-col items-start gap-1">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                              event.type === "News"
                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                : event.type === "Workshop"
                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            }`}>
                              {event.type}
                            </span>
                            <span className="mt-2 text-xs text-slate-500 font-semibold">{event.date}</span>
                            <span className="text-[11px] text-slate-400">{event.time}</span>
                          </div>
                          {/* Event Content */}
                          <div className="flex-1 flex flex-col justify-center">
                            <h3 className="font-display text-sm sm:text-base font-bold text-brand-blue leading-normal">{event.title}</h3>
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed">{event.desc}</p>
                            {event.images && event.images.length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-3">
                                {event.images.map((img, index) => (
                                  <a 
                                    key={index}
                                    href={img}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative block h-20 w-28 overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:scale-105 transition-transform"
                                  >
                                    <img 
                                      src={img} 
                                      alt={`Press coverage ${index + 1}`} 
                                      className="h-full w-full object-cover" 
                                    />
                                  </a>
                                ))}
                              </div>
                            )}
                            <div className="mt-3 flex items-center gap-1.5 text-xs text-brand-orange font-semibold">
                              <MapPin className="h-3.5 w-3.5" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REVIEWS TAB VIEW */}
            {activeTab === 'Reviews' && (
              <div id="tab-pane-reviews">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Testimonials
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Candidate <span className="text-brand-orange">reviews</span> & feedback
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Hear directly from our successful alumni about how the personal mentorship, hybrid
                    portal support, and rigorous mock test series shaped their careers.
                  </p>
                </div>

                {/* Reviews grid */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-100px' }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                >
                  {TESTIMONIALS.map((review, idx) => (
                    <motion.div
                      variants={itemVariants}
                      key={idx}
                      className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between text-left"
                    >
                      <div className="absolute top-6 right-8 text-slate-100/80 shrink-0">
                        <Quote className="w-10 h-10 transform rotate-180 text-brand-orange/5" />
                      </div>

                      <div className="space-y-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-brand-orange fill-brand-orange shrink-0" />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed italic font-medium relative z-10">
                          "{review.text}"
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-slate-50 flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-brand-blue leading-normal">{review.name}</h4>
                          <p className="text-[10px] text-gray-400 font-bold">{review.course || "CAT Alumnus"}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="text-center text-xs text-gray-400 font-bold uppercase tracking-wider">
                  ✔ Verified KATexpert Student Testimonials
                </div>
              </div>
            )}

            {/* CONTACT COORD TAB VIEW */}
            {activeTab === 'Contact' && (
              <div id="tab-pane-contact">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-widest bg-brand-orange/10 px-3 py-1 rounded-full inline-block mb-3">
                    Inquiries
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-brand-blue tracking-tight mb-4">
                    Connect with our <span className="text-brand-orange">advisors</span>
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-medium">
                    Have questions about batches, duration, hybrid mode resources, or want to schedule a
                    counselling session? Reach out directly or visit our Dharampeth campus.
                  </p>
                </div>

                {/* Contact layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
                  <div className="lg:col-span-5 space-y-8">
                    <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-6">
                      <h3 className="text-xl font-bold text-brand-blue">Nagpur Center Details</h3>
                      <p className="text-xs text-gray-400 font-semibold leading-relaxed">
                        Our advisors are active daily from 10:00 AM to 7:00 PM (IST) to handle admission
                        inquiries and mock counselling.
                      </p>

                      <div className="space-y-6 pt-2">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <MapPin className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Campus Address</h4>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">
                              {CONTACT_INFO.address}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Phone className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Phone Numbers</h4>
                            <p className="text-xs text-gray-500 mt-1 font-semibold">{CONTACT_INFO.phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Mail className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Email Channel</h4>
                            <p className="text-xs text-gray-500 mt-1 font-semibold">{CONTACT_INFO.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 rounded-xl bg-brand-orange/10 flex items-center justify-center text-brand-orange shrink-0">
                            <Clock className="w-5 h-5 text-brand-orange" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-brand-blue">Enquiry Timings</h4>
                            <p className="text-xs text-gray-500 mt-1 font-medium">
                              Monday – Sunday (10:00 AM – 7:30 PM)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dark map */}
                    <div className="h-64 rounded-3xl overflow-hidden relative border border-slate-100 shadow-md">
                      <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-center p-6">
                        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />
                        <MapPin className="w-7 h-7 text-brand-orange mb-2 animate-bounce" />
                        <h4 className="text-sm font-bold text-white">KATexpert Dharampeth Campus</h4>
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal max-w-xs font-medium">
                          Located behind Batukbhai Jewellers in Khare Town, Nagpur.
                        </p>
                        <div className="mt-4 px-3 py-1 bg-white/10 backdrop-blur text-[9px] text-slate-300 rounded font-semibold uppercase tracking-wider">
                          Nagpur Hub - Maharashtra
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="lg:col-span-7">
                    <div className="bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ea580c]" />

                      <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                          <motion.form
                            key="query-contact-form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleContactSubmit}
                            className="space-y-6"
                          >
                            <div className="space-y-1.5">
                              <h3 className="text-2xl font-bold text-brand-blue tracking-tight">Send An Inquiry Message</h3>
                              <p className="text-xs text-gray-400 font-semibold">Fill out the details below. Our admissions desk will get in touch with you.</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Full Name *</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Enter your name"
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>

                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Contact Number *</label>
                                <input
                                  type="tel"
                                  required
                                  placeholder="Enter mobile number"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Email Address</label>
                                <input
                                  type="email"
                                  placeholder="Enter email address"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none bg-white text-[#1e293b]"
                                />
                              </div>

                              <div className="flex flex-col space-y-1.5">
                                <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Select Target Course</label>
                                <select
                                  value={formData.course}
                                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                  className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-bold text-brand-blue rounded-xl px-4 py-3 focus:outline-none bg-white"
                                >
                                  {['CAT', 'CLAT', 'IPMAT', 'MBA CET', 'MCA CET', 'CRT'].map((course) => (
                                    <option key={course} value={course}>{course} Entrance Batch</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-1.5">
                              <label className="text-xs font-bold text-brand-blue uppercase tracking-wider">Your Message / Query Notes</label>
                              <textarea
                                rows={4}
                                placeholder="Write down any questions about batch timings, fee structures, offline classes, demo schedule, etc."
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full border border-slate-200 focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c] text-sm font-medium rounded-xl px-4 py-3 focus:outline-none resize-none bg-white text-[#1e293b]"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-[#ea580c] hover:bg-[#f97316] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                            >
                              <span>Submit Query to Advisors</span>
                              <Send className="w-4 h-4 text-white" />
                            </button>
                          </motion.form>
                        ) : (
                          <motion.div
                            key="query-success-screen"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-12 text-center flex flex-col items-center justify-center space-y-4"
                          >
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-200 shadow-md animate-bounce">
                              <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div className="space-y-1.5">
                              <h4 className="text-2xl font-bold text-brand-blue">Message Dispatched!</h4>
                              <p className="text-sm text-gray-500 max-w-sm mx-auto font-semibold leading-relaxed">
                                Thank you. Your inquiry regarding <strong className="text-brand-orange">{formData.course}</strong> has been received successfully.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
          </motion.div>
        </AnimatePresence>
        
        {/* Floating Dossier drawer support for the Faculty tab */}
        <DossierDrawer mentorName={selectedMentor} onClose={() => setSelectedMentor(null)} />
      </div>
    </div>
  );
}
