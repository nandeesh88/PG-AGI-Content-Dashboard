'use client';

import React, { useEffect, useState } from 'react';
import { Search, Settings, Moon, Sun, Menu, X, Heart, TrendingUp, Home, Sparkles, Bell, User, ChevronDown, ExternalLink, Filter } from 'lucide-react';

// Mock data generator
const generateMockContent = (count: number = 20) => {
  const types = ['news', 'recommendation', 'social'];
  const categories = ['Technology', 'Sports', 'Finance', 'Entertainment', 'Health', 'Science'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `item-${i}`,
    type: types[i % 3],
    title: `${types[i % 3] === 'news' ? 'Breaking:' : types[i % 3] === 'recommendation' ? 'Recommended:' : 'Trending:'} ${categories[i % 6]} Update ${i + 1}`,
    description: 'Discover the latest insights and developments in this exciting field. Stay ahead with our curated content tailored for you.',
    image: `https://picsum.photos/seed/${i}/600/400`,
    category: categories[i % 6],
    url: '#',
    author: `Author ${(i % 5) + 1}`,
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));
};

export default function DashboardPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSection, setActiveSection] = useState('feed');
  const [content, setContent] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  useEffect(() => {
    setContent(generateMockContent(20));
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSection = 
      activeSection === 'feed' ? true :
      activeSection === 'favorites' ? favorites.includes(item.id) :
      activeSection === 'trending' ? true : true;
    
    return matchesSearch && matchesSection;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-950/30 to-blue-950 transition-colors relative overflow-hidden">
      {/* Animated background effects with light blue theme */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Main background image with light blue overlay */}
        <div className="absolute inset-0">
          <img 
            src="/appimage.png" 
            alt="PG-AGI Background"
            className="w-full h-full object-cover opacity-15" 
          />
          {/* Light blue gradient overlay for theme */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-blue-900/30 to-sky-900/20"></div>
        </div>
        
        {/* Animated floating elements with light blue glow */}
        <div className="absolute top-20 right-20 w-[400px] h-[400px] opacity-10 animate-float">
          <img 
            src="/appimage.png" 
            alt="PG-AGI Decorative"
            className="w-full h-full object-contain filter blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl"></div>
        </div>
        <div className="absolute bottom-20 left-20 w-[300px] h-[300px] opacity-8 animate-float-slow">
          <img 
            src="/appimage.png" 
            alt="PG-AGI Decorative"
            className="w-full h-full object-contain filter blur-sm"
          />
        </div>
        
        {/* Removed: The rotating image element */}
        
        {/* Light blue gradient overlays for depth and coolness */}
        <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.03),transparent_50%)]"></div>
        
        {/* Cool glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-gradient-to-r from-cyan-500/8 to-blue-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-500/8 to-sky-500/8 rounded-full blur-3xl"></div>
        
        {/* Water-like surface effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent opacity-30"></div>
      </div>

      {/* Top Navigation Bar - Light Blue Theme */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-slate-950/80 border-b border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Light Blue Theme */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-sky-500/20 p-2 shadow-2xl shadow-cyan-500/20 hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 via-blue-600/30 to-sky-600/30 blur-xl"></div>
                <img 
                  src="/appimage.png" 
                  alt="PG-AGI Logo"
                  className="relative w-full h-full object-contain drop-shadow-2xl z-10"
                />
                {/* Light blue glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-sky-500/20 rounded-2xl group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
              </div>
              <div className="ml-2">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent drop-shadow-lg">
                  PG-AGI
                </h1>
                <p className="text-xs text-cyan-300/80 -mt-1 font-medium bg-gradient-to-r from-cyan-600/80 to-blue-600/80 bg-clip-text text-transparent">
                  CONTENT DASHBOARD
                </p>
              </div>
            </div>

            {/* Desktop Navigation - Light Blue */}
            <div className="hidden lg:flex items-center gap-1">
              <button 
                onClick={() => setActiveSection('feed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === 'feed' 
                    ? 'text-white bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Home size={16} className="inline mr-2" />
                Home
              </button>
              <button 
                onClick={() => setActiveSection('trending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === 'trending' 
                    ? 'text-white bg-gradient-to-r from-blue-600/30 to-sky-600/30 border border-blue-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <TrendingUp size={16} className="inline mr-2" />
                Trending
              </button>
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryMenu(!showCategoryMenu)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Sparkles size={16} className="inline mr-2" />
                  Categories
                  <ChevronDown size={14} />
                </button>
                {showCategoryMenu && (
                  <div className="absolute top-full mt-2 w-48 backdrop-blur-2xl bg-slate-900/90 border border-cyan-500/20 rounded-xl shadow-2xl shadow-cyan-500/10 p-2">
                    {['Technology', 'Sports', 'Finance', 'Entertainment'].map(cat => (
                      <button key={cat} className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 hover:text-white transition-all">
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setActiveSection('favorites')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === 'favorites' 
                    ? 'text-white bg-gradient-to-r from-sky-600/30 to-cyan-600/30 border border-sky-500/30' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Heart size={16} className="inline mr-2" />
                Favorites
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-all">
                About
              </button>
            </div>

            {/* Right Actions - Light Blue Accents */}
            <div className="flex items-center gap-2">
              <button className="hidden md:flex p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-500/10 transition-all group relative">
                <Bell size={18} className="text-gray-300 group-hover:text-cyan-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-500/10 transition-all"
              >
                {darkMode ? <Sun size={18} className="text-cyan-400" /> : <Moon size={18} className="text-blue-600" />}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="hidden md:flex p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-500/10 transition-all"
              >
                <Settings size={18} className="text-gray-300" />
              </button>
              <button className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 transition-all hover:shadow-blue-500/40">
                <User size={16} />
                Profile
              </button>
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-500/10 transition-all"
              >
                <Menu size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Light Blue Theme */}
      <div className="relative pt-40 pb-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            {/* Main Title with PG-AGI branding - Light Blue */}
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-sky-600/20 rounded-full blur-2xl animate-pulse"></div>
                <img 
                  src="/appimage.png" 
                  alt="PG-AGI Logo"
                  className="relative w-full h-full object-contain z-10 animate-float"
                />
                {/* Animated light blue rings */}
                <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-ping opacity-20"></div>
                <div className="absolute inset-4 border-2 border-blue-500/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute inset-8 border-2 border-sky-500/15 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            <h2 className="text-5xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-400 bg-clip-text text-transparent drop-shadow-2xl">
                PG-AGI
              </span>
            </h2>
            <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-300 via-blue-300 to-sky-300 bg-clip-text text-transparent mb-6">
              Content Dashboard
            </p>
            <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 backdrop-blur-sm bg-white/5 p-6 rounded-2xl border border-cyan-500/10 hover:border-cyan-500/20 transition-all">
              Your intelligent content hub powered by cutting-edge technology. 
              Experience curated news, smart recommendations, and insights 
              from the world of artificial intelligence.
            </p>

            {/* Search Bar - Light Blue Theme */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 group-hover:text-blue-400 transition-colors z-10" size={24} />
                <input
                  type="text"
                  placeholder="Search content across all categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="relative w-full pl-16 pr-24 py-5 bg-white/10 backdrop-blur-2xl border border-cyan-500/20 text-white placeholder-cyan-200/50 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all text-lg z-10"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-blue-500/40 transition-all z-10">
                  <Search size={18} className="inline mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats with Light Blue Theme - Icons Removed */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Content Models', value: '12', color: 'from-cyan-400 to-blue-400' },
              { label: 'Content Sources', value: '48', color: 'from-blue-400 to-sky-400' },
              { label: 'Active Users', value: '10.2K', color: 'from-sky-400 to-cyan-400' },
              { label: 'Content Items', value: content.length, color: 'from-cyan-500 to-blue-500' },
            ].map((stat, i) => (
              <div key={i} className="relative backdrop-blur-2xl bg-white/10 border border-cyan-500/20 rounded-2xl p-6 hover:bg-white/15 transition-all group hover:scale-105 duration-300">
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-cyan-100/80 text-sm font-medium">{stat.label}</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Section Title - Light Blue */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
                {activeSection === 'feed' && (
                  <>
                    <Home className="text-cyan-400" />
                    <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                      Your Content Feed
                    </span>
                  </>
                )}
                {activeSection === 'trending' && (
                  <>
                    <TrendingUp className="text-blue-400" />
                    <span className="bg-gradient-to-r from-blue-300 to-sky-300 bg-clip-text text-transparent">
                      Trending Now
                    </span>
                  </>
                )}
                {activeSection === 'favorites' && (
                  <>
                    <Heart className="text-sky-400" />
                    <span className="bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent">
                      Saved Content
                    </span>
                  </>
                )}
              </h3>
              <p className="text-cyan-100/60">
                <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-transparent bg-clip-text font-semibold">
                  {filteredContent.length}
                </span> items available
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600/30 to-blue-600/30 hover:from-cyan-600/50 hover:to-blue-600/50 border border-cyan-500/30 text-white transition-all group hover:shadow-lg hover:shadow-cyan-500/20">
              <Filter size={18} />
              <span className="font-semibold">Filter</span>
            </button>
          </div>

          {/* Content Grid - Light Blue Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.map((item) => (
              <div
                key={item.id}
                className="group backdrop-blur-2xl bg-white/[0.08] hover:bg-white/[0.12] rounded-3xl border border-cyan-500/20 hover:border-cyan-500/30 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-3"
              >
                <div className="relative overflow-hidden h-64">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-cyan-950/40 to-transparent"></div>
                  
                  {/* Favorite button - Light blue theme */}
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute top-4 right-4 p-3 rounded-xl backdrop-blur-xl bg-black/50 hover:bg-cyan-900/30 border border-cyan-500/30 transition-all hover:scale-110"
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(item.id) ? 'fill-cyan-500 text-cyan-500' : 'text-cyan-200'}
                    />
                  </button>

                  {/* Badge - Light blue variants */}
                  <span className={`absolute bottom-4 left-4 text-xs px-4 py-2 rounded-full backdrop-blur-xl font-semibold border ${
                    item.type === 'news' ? 'bg-cyan-500/40 text-cyan-100 border-cyan-400/60' :
                    item.type === 'recommendation' ? 'bg-blue-500/40 text-blue-100 border-blue-400/60' :
                    'bg-sky-500/40 text-sky-100 border-sky-400/60'
                  }`}>
                    {item.type}
                  </span>
                </div>
                
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-semibold bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-cyan-300 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <span className="text-cyan-500/50">•</span>
                    <span className="text-sm text-cyan-200/70">{item.date}</span>
                  </div>

                  <h3 className="font-bold text-2xl mb-4 text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
                    {item.title}
                  </h3>

                  <p className="text-cyan-100/70 mb-6 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">AI</span>
                      </div>
                      <span className="text-sm text-cyan-200">By {item.author}</span>
                    </div>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-600 hover:to-blue-600 text-white text-sm font-semibold transition-all group hover:shadow-lg hover:shadow-cyan-500/30">
                      Read
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-32 backdrop-blur-2xl bg-gradient-to-br from-cyan-900/10 to-blue-900/10 rounded-3xl border border-cyan-500/20">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                <div className="relative">
                  <img 
                    src="/appimage.png" 
                    alt="PG-AGI"
                    className="w-20 h-20 object-contain opacity-60"
                  />
                  <Search size={32} className="absolute -top-2 -right-2 text-cyan-400" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">No content found</h3>
              <p className="text-cyan-200/70 text-lg">Try adjusting your search or let our system suggest content</p>
              <button className="mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30">
                Explore Content
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer - Light Blue Theme */}
      <footer className="relative mt-24 backdrop-blur-2xl bg-gradient-to-t from-slate-950/90 via-cyan-950/30 to-blue-950/90 border-t border-cyan-500/20">
        <div className="max-w-[1400px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-600/30 to-blue-600/30 p-2">
                  <img 
                    src="/appimage.png" 
                    alt="PG-AGI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-xl">PG-AGI</h4>
                  <p className="text-cyan-300/80 text-xs">Content Dashboard</p>
                </div>
              </div>
              <p className="text-cyan-200/70 text-sm">Advanced content management and curation platform powered by intelligent systems.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Services</h4>
              <ul className="space-y-3 text-sm text-cyan-200/70">
                <li className="hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-2">
                  <Sparkles size={14} className="text-cyan-400" />
                  Content Research
                </li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-400" />
                  Content Curation
                </li>
                <li className="hover:text-sky-300 transition-colors cursor-pointer flex items-center gap-2">
                  <Search size={14} className="text-sky-400" />
                  Content Analytics
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-sm text-cyan-200/70">
                <li className="hover:text-cyan-300 transition-colors cursor-pointer">About PG-AGI</li>
                <li className="hover:text-blue-300 transition-colors cursor-pointer">Features</li>
                <li className="hover:text-sky-300 transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-cyan-400 transition-colors cursor-pointer">Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6 text-lg">Get Started</h4>
              <button className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30 mb-4 hover:scale-[1.02]">
                Contact Us →
              </button>
              <p className="text-cyan-200/60 text-xs">Join thousands of users managing their content efficiently.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-cyan-500/20 text-center text-cyan-300/50 text-sm">
            © 2024 PG-AGI Content Dashboard. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Settings Modal - Light Blue Theme */}
      {showSettings && (
        <div className="fixed inset-0 bg-cyan-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-slate-900/90 to-cyan-950/90 border border-cyan-500/30 rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-cyan-500/20">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-white">Dashboard Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-2.5 rounded-xl hover:bg-cyan-500/10 transition-all"
              >
                <X size={24} className="text-cyan-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-cyan-500/20 hover:bg-cyan-500/10 transition-all cursor-pointer">
                <h4 className="text-white font-semibold mb-2">Content Preferences</h4>
                <p className="text-cyan-200/70 text-sm">Customize your content feed</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-blue-500/20 hover:bg-blue-500/10 transition-all cursor-pointer">
                <h4 className="text-white font-semibold mb-2">Display Settings</h4>
                <p className="text-cyan-200/70 text-sm">Adjust appearance and layout</p>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-sky-500/20 hover:bg-sky-500/10 transition-all cursor-pointer">
                <h4 className="text-white font-semibold mb-2">Privacy Settings</h4>
                <p className="text-cyan-200/70 text-sm">Control data usage and privacy</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sidebar - Light Blue Theme */}
      {showSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-cyan-950/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
          <div className="fixed right-0 top-0 bottom-0 w-80 backdrop-blur-2xl bg-gradient-to-b from-slate-950/95 to-cyan-950/95 border-l border-cyan-500/30 z-50 p-6 lg:hidden shadow-2xl shadow-cyan-500/20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-600/30 to-blue-600/30 p-1">
                  <img 
                    src="/appimage.png" 
                    alt="PG-AGI Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white font-bold">PG-AGI</span>
              </div>
              <button onClick={() => setShowSidebar(false)}>
                <X size={24} className="text-cyan-400" />
              </button>
            </div>
            <nav className="space-y-2">
              <button onClick={() => { setActiveSection('feed'); setShowSidebar(false); }} className="w-full text-left px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 transition-all flex items-center gap-3">
                <Home size={20} className="text-cyan-400" />
                Home
              </button>
              <button onClick={() => { setActiveSection('trending'); setShowSidebar(false); }} className="w-full text-left px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-sky-600/20 transition-all flex items-center gap-3">
                <TrendingUp size={20} className="text-blue-400" />
                Trending
              </button>
              <button onClick={() => { setActiveSection('favorites'); setShowSidebar(false); }} className="w-full text-left px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-sky-600/20 hover:to-cyan-600/20 transition-all flex items-center gap-3">
                <Heart size={20} className="text-sky-400" />
                Favorites
              </button>
              <button className="w-full text-left px-5 py-4 rounded-xl text-white hover:bg-gradient-to-r hover:from-cyan-600/20 hover:to-blue-600/20 transition-all flex items-center gap-3">
                <Settings size={20} className="text-cyan-300" />
                Settings
              </button>
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold transition-all shadow-lg shadow-cyan-500/30">
                PG-AGI Dashboard
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add CSS animations for the background */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 40s linear infinite;
        }
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}