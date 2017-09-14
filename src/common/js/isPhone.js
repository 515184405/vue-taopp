export function isPhone(){
    if(navigator.userAgent.indexOf("iPhone") != -1) {  
        return true; 
    }  
    if(navigator.userAgent.indexOf("iPad") != -1){  
        return false;
    }   
}