export const CONFIG={
 genshin:{name:'Genshin Impact',source:'https://raw.githubusercontent.com/noviardhana/history_gi/main/data/data_clean.csv',local:'data/data_clean.csv',bannerLabels:{'Character Event':'Personajes promocionales','Weapon Event':'Armas promocionales','Standard':'Banner permanente','Beginner':'Banner de principiantes','Beginners Wish':'Banner de principiantes','Chronicled Wish':'Banner recopilatorio'},categoryLabels:{character:'Personaje',weapon:'Arma'}},
 hsr:{name:'Honkai: Star Rail',source:'https://raw.githubusercontent.com/noviardhana/history_gi/main/data/data_clean_hsr.csv',local:'data/data_clean_hsr.csv',bannerLabels:{'Character Event':'Personajes promocionales','Light Cone Event':'Conos de luz promocionales','Standard':'Banner permanente','Departure Warp':'Banner de principiantes','Character Collaboration':'Personajes de colaboración','Light Cone Collaboration':'Conos de luz de colaboración'},categoryLabels:{character:'Personaje',light_cone:'Cono de luz'}}
};
export const TARGETS=[{value:'rarity5',label:'Cualquier recompensa de ★★★★★'},{value:'rarity4',label:'Cualquier recompensa de ★★★★'},{value:'rarity3',label:'Cualquier recompensa de ★★★'},{value:'character5',label:'Personaje ★★★★★'},{value:'character4',label:'Personaje ★★★★'},{value:'gear5',label:'Arma / cono de luz ★★★★★'},{value:'gear4',label:'Arma / cono de luz ★★★★'}];
export function isSuccess(r,target){if(target==='rarity5')return r.rarity===5;if(target==='rarity4')return r.rarity===4;if(target==='rarity3')return r.rarity===3;if(target==='character5')return r.rarity===5&&r.item_category==='character';if(target==='character4')return r.rarity===4&&r.item_category==='character';if(target==='gear5')return r.rarity===5&&r.item_category!=='character';if(target==='gear4')return r.rarity===4&&r.item_category!=='character';return false;}


export const OFFICIAL_RATES = {
    genshin: {
        "Character Event": {
            base: 0.60,
            consolidated: 1.60
        },
        "Weapon Event": {
            base: 0.70,
            consolidated: 1.85
        },
        "Standard": {
            base: 0.60,
            consolidated: 1.60
        }
    },

    hsr: {
        "Character Event": {
            base: 0.60,
            consolidated: 1.60
        },
        "Light Cone Event": {
            base: 0.80,
            consolidated: 1.87
        },
        "Standard": {
            base: 0.60,
            consolidated: 1.60
        }
    }
};
