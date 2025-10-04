
function NoteCard(props){
    const date = new Date(props.created_at);
    const dateAndTime = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric',  minute: 'numeric',  hour12: true });
    const content = props.content.length > 500? props.content.slice(0,500)+"..." : props.content;
    return(
    <div className="mb-4 break-inside-avoid w-auto h-auto">
    <div className="card">
        <h2 className="heading text-2xl font-bold">{props.title}</h2>
        <div className="description">
            <textarea className="outline-0" readOnly={true} value={content} />
        </div>
        <span className="creation-date">Created/updated at: {dateAndTime}</span>
    </div>
    </div>);
}

export default NoteCard;