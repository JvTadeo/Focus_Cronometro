export class Utilites{
    formatTimer(totalTimer){
    
        const minutesRemaining = Math.floor(totalTimer/ 1000 / 60);
        const secondsRemaining = Math.floor((totalTimer/ 1000) % 60);

        return `${minutesRemaining.toString().padStart(2, '0')}:${secondsRemaining.toString().padStart(2, '0')}`;
    }
}