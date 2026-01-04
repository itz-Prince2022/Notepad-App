import React from 'react';
import { Pin, Trash2, Edit3 } from 'lucide-react'; 
import moment from 'moment'; // npm install moment (Optional, makes dates look nicer)

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
    // 1. SAFETY FIX: Default to empty strings if data is missing
    // This prevents the "undefined reading length" crash
    const title = note?.title || "Untitled";
    const content = note?.content || ""; 
    const isPinned = note?.isPinned || false;
    const tags = note?.tags || [];
    
    // Format Date: "Jan 3rd, 2026"
    const dateFormatted = moment(note?.updatedAt).format('MMM Do YYYY, h:mm a');

    return (
        <div className="group relative break-inside-avoid mb-6 w-full">
            <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 ease-out cursor-default flex flex-col justify-between min-h-[160px]">
                
                {/* --- HEADER --- */}
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-lg font-bold text-gray-800 leading-snug w-[85%]">
                        {title}
                    </h2>
                    
                    {/* Pin Button */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onPin(note); }}
                        className={`transition-colors p-1 rounded-full ${isPinned ? 'text-blue-600 bg-blue-50' : 'text-gray-300 opacity-0 group-hover:opacity-100 hover:text-gray-600'}`}
                    >
                        <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                    </button>
                </div>

                {/* --- CONTENT --- */}
                {/* Replaced textarea with div for better readability */}
                <div className="text-gray-600 text-sm whitespace-pre-wrap leading-relaxed mb-4 line-clamp-6 font-medium">
                    {content.slice(0, 400)}
                    {content.length > 400 && <span className="text-gray-400">...read more</span>}
                </div>

                {/* --- TAGS (Optional) --- */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                        {tags.map((tag, i) => (
                            <span key={i} className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-md uppercase font-bold tracking-wider">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* --- FOOTER --- */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                    <span className="text-[10px] text-gray-400 font-semibold tracking-wide">
                        {dateFormatted}
                        <span className='px-2'> | </span>
                        <span> Word Count: {content.length}</span>
                    </span>

                    {/* Action Buttons (Visible on Hover) */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button 
                            onClick={(e) => { e.stopPropagation(); onEdit(note); }}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                        >
                            <Edit3 className="w-4 h-4" />
                        </button>
                        
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;








// function NoteCard(props){
//     const date = new Date(props.created_at);
//     const dateAndTime = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric',  minute: 'numeric',  hour12: true });
//     const content = props.content.length > 500? props.content.slice(0,500)+"..." : props.content;
//     return(
//     <div className="mb-4 break-inside-avoid w-auto h-auto">
//     <div className="card">
//         <h2 className="heading text-2xl font-bold">{props.title}</h2>
//         <div className="description">
//             <textarea className="outline-0" readOnly={true} value={content} />
//         </div>
//         <span className="creation-date">Created/updated at: {dateAndTime}</span>
//     </div>
//     </div>);
// }

// export default NoteCard;