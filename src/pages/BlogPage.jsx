import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Calendar, User, ArrowRight, Sparkles } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { BLOGS_METADATA, BLOGS_CONTENT } from "@/lib/blogs-data";

const FEATURED_POST = BLOGS_METADATA[0] || {};
const BLOGS = BLOGS_METADATA.slice(1) || [];

export default function BlogPage() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const renderBlogBody = (blogId) => {
    const content = BLOGS_CONTENT[blogId];
    if (!content) {
      return (
        <p className="text-sm text-slate-500 italic">
          Content loading...
        </p>
      );
    }

    let elements = [];
    let listBuffer = [];

    const flushList = (key) => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`list-${key}`} className="list-disc pl-5 space-y-1.5 my-4 text-slate-700 text-sm leading-relaxed font-medium">
            {listBuffer.map((li, idx) => (
              <li key={`li-${key}-${idx}`}>{li}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    content.forEach((item, idx) => {
      if (item.type === "list-item") {
        listBuffer.push(item.text);
      } else {
        flushList(idx);
        if (item.type === "heading") {
          elements.push(
            <h3 key={idx} className="font-display text-lg sm:text-xl font-bold text-navy mt-6 mb-3">
              {item.text}
            </h3>
          );
        } else if (item.type === "paragraph") {
          elements.push(
            <p key={idx} className="text-sm sm:text-base text-slate-650 leading-relaxed font-medium mb-4">
              {item.text}
            </p>
          );
        }
      }
    });

    flushList(content.length);
    return elements;
  };

  return (
    <main className="bg-slate-50/50 min-h-screen pb-20 font-sans text-slate-800">
      <PageHero title="Blogs & Articles" breadcrumb={["Student Resources", "Blogs"]} />

      <div className="container-x max-w-6xl mx-auto mt-12 px-4">
        {/* Featured blog post banner */}
        <div className="bg-[#1e293b] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden mb-16" id="blog-featured-banner">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ea580c]/15 rounded-full blur-3xl -z-1" />
          
          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            <div className="flex-1 space-y-4 text-left">
              <div className="inline-flex items-center space-x-2 bg-[#ea580c]/20 border border-[#ea580c]/30 px-3 py-1 rounded-full text-xs font-bold text-brand-orange-light uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand-orange-light animate-pulse" />
                <span>Featured Post</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight leading-tight">
                {FEATURED_POST.title}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {FEATURED_POST.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold pt-2">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#ea580c]" />
                  {FEATURED_POST.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {FEATURED_POST.date}
                </span>
                <span>•</span>
                <span>{FEATURED_POST.readTime}</span>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => setSelectedBlog(FEATURED_POST)}
                  className="inline-flex items-center justify-center gap-2 bg-[#ea580c] hover:bg-[#f97316] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-brand-orange/15 cursor-pointer"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            {FEATURED_POST.img && (
              <div className="w-full lg:w-96 shrink-0 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-lg animate-pulse" style={{ animationDuration: '3s' }}>
                <img 
                  src={FEATURED_POST.img} 
                  alt={FEATURED_POST.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="blogs-grid">
          {BLOGS.map((blog, idx) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={blog.id}
              className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4 text-left">
                {blog.img && (
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 cursor-pointer block text-left p-0"
                  >
                    <img 
                      src={blog.img} 
                      alt={blog.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                )}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-3 py-1 rounded-full inline-block">
                    {blog.category}
                  </span>
                  <h3 className="text-base font-bold text-brand-blue font-display hover:text-[#ea580c] transition-colors leading-snug">
                    <button 
                      onClick={() => setSelectedBlog(blog)}
                      className="text-left font-bold text-brand-blue font-display hover:text-[#ea580c] transition-colors leading-snug cursor-pointer p-0 bg-transparent border-0"
                    >
                      {blog.title}
                    </button>
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium line-clamp-3">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-gray-400 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]">{blog.date}</span>
                </div>
                <button 
                  onClick={() => setSelectedBlog(blog)}
                  className="text-brand-blue hover:text-brand-orange flex items-center gap-1 font-bold text-xs cursor-pointer p-0 bg-transparent border-0"
                >
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Blog Preview Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl flex flex-col h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="text-left pr-4">
                <span className="text-[9px] font-bold text-brand-orange uppercase bg-brand-orange/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                  {selectedBlog.category}
                </span>
                <h3 className="font-display text-base sm:text-lg font-extrabold text-navy leading-snug">{selectedBlog.title}</h3>
                <div className="flex items-center gap-3 text-[10px] text-slate-500 font-semibold mt-1">
                  <span>{selectedBlog.date}</span>
                  <span>•</span>
                  <span>{selectedBlog.readTime || "5 min read"}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="rounded-full bg-slate-100 hover:bg-slate-200 p-2 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer font-bold text-xs shrink-0"
              >
                ✕
              </button>
            </div>
            
            {/* Scrollable Blog Content */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin text-left">
              <div className="max-w-3xl mx-auto">
                {selectedBlog.img && (
                  <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-sm">
                    <img 
                      src={selectedBlog.img} 
                      alt={selectedBlog.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="space-y-1">
                  {renderBlogBody(selectedBlog.id)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
