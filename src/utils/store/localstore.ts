import URLS from "@/config";

// কুকি ম্যানেজমেন্টের জন্য ব্যবহৃত কী (Key)
const cookieKey = URLS.LOCAL_STORE.SET_USER; 

// 1. --- GET ITEM (Updated Logic) ---
 
export const getItemFromStore = ( ): string | null => {    
    // 1.  
    
    let localData = localStorage.getItem(cookieKey);
    
     
    if (!localData) {
        try {
            const nameEQ = cookieKey + "=";
            const ca = document.cookie.split(';');
            let cookieValue: string | null = null;
 
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) {
                    cookieValue = c.substring(nameEQ.length, c.length);
                    break;
                }
            }
            
            if (cookieValue) { 
                localData = decodeURIComponent(cookieValue);
                localStorage.setItem(cookieKey, localData);
             }                 
            
        } catch (e) {
            console.warn("Failed to read cookie on client or server environment.", e);
        }
    }
     
    return localData;
}; 
export const removeItemFromStore = () => { 
    localStorage.removeItem(cookieKey);
 
    document.cookie = `${cookieKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    
    return true;
};

 
export const setItemFromStore = (localData: any) => {
    const dataString = JSON.stringify(localData);
 
    localStorage.setItem(cookieKey, dataString);
 
    const expiresDays = 7; 
    const date = new Date();
    date.setTime(date.getTime() + (expiresDays * 24 * 60 * 60 * 1000));
    const expires = date.toUTCString();

    document.cookie = `${cookieKey}=${encodeURIComponent(dataString)}; expires=${expires}; path=/; secure; samesite=Lax`;
    
    return dataString;
};