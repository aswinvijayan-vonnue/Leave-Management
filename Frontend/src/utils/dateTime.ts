export function dateToString(data:string){
    const dateObj=new Date(data);
    if(isNaN(dateObj.getMilliseconds())) return "NaN";
    const formatedDate=dateObj.toLocaleDateString('en-US',{
        month:'short',
        day:'2-digit',
        year:'numeric'
    });
    return formatedDate;

}

export function getWorkingDays(from:Date,to:Date){
    from.setHours(0,0,0,0);
    to.setHours(0,0,0,0);
    let count=0;
    const curDate=from;
    while(curDate<=to){
        const day=curDate.getDay();
        if(day!==0 && day !==6) count++;
        curDate.setDate(curDate.getDate()+1);
    }
    return count;
}