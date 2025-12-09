import React from 'react';
import { ExternalLink, Star, ShieldCheck, Users } from 'lucide-react';
import { ResourceItem } from '../types';

interface LinkCardProps {
  item: ResourceItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({ item, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_-10px_rgba(5,150,105,0.15)] border border-emerald-50 hover:border-emerald-200 transition-all duration-300 p-6 flex flex-col h-full transform hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
           {item.isOfficial && (
             <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
               <ShieldCheck size={12} /> Official
             </span>
           )}
           {item.access === 'Campus IP' && (
             <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1 font-bold">
               <Users size={12} /> Campus
             </span>
           )}
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(item.id);
          }}
          className={`p-2 rounded-full transition-all ${isFavorite ? 'text-yellow-400 bg-yellow-50 scale-110' : 'text-slate-200 hover:text-yellow-400 hover:bg-slate-50'}`}
          title="Toggle Favorite"
        >
          <Star size={18} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors tracking-tight">
        {item.title}
      </h3>
      
      <p className="text-sm text-slate-500 mb-6 flex-grow leading-relaxed">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {item.tags.map(tag => (
          <span key={tag} className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600/80 bg-emerald-50/50 border border-emerald-100/50 px-2.5 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-5 border-t border-slate-50 flex justify-between items-center">
        <span className="text-xs text-slate-400 font-medium">{item.source || 'Direct Source'}</span>
        <a 
          href={item.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-800 transition-colors bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg"
        >
          Visit Site <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
};

export default LinkCard;