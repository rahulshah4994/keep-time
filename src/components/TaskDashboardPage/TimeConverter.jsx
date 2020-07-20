function TimeConverter (time){
    const hrs = time >= 60 && Math.floor(time/60);
    const mins = time%60;
    const hstring = time >= 60 ? `${hrs} hr ` : '';
    const mstring = mins ? `${mins} mins` : '';
    return (hstring + mstring);
}

export default TimeConverter;