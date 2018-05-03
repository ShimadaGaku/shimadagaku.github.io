    function log(str) {
        console.log(str);
    }

    function logJson(obj) {
        document.write(JSON.stringify(obj));
    }
    
    function getJsonValue(jsn){
        return JSON.parse(JSON.stringify(jsn));
    }
    
    function getTableSmaple(){
        let result={"common":[{"AH":false},{"BH":false},{"QH":false},{"ExH":false}],"npRate":[{"nA%":false},{"nA1+":false},{"nA2":false},{"nA2+":false},{"nA3":false},{"nA3+":false},{"nQ%":false},{"nQ1":false},{"nQ2":false},{"nQ2+":false},{"nQ3":false},{"nQ3+":false},{"nB%":false},{"nB+":false},{"nEx%":false},{"nEx":false},{"nEx+":false}],"criStar":[{"sRate":false},{"sB1":false},{"sB2":false},{"sB2+":false},{"sB3":false},{"sB3+":false},{"sQ1+":false},{"sQ2":false},{"sQ2+":false},{"sQ3":false},{"sQ3+":false},{"sA":false},{"sA+":false},{"sEx":false},{"sEx+":false}],"dmg":[{"dAtk":false},{"dA1":false},{"dA2":false},{"dA2+":false},{"dA3":false},{"dA3+":false},{"dB1+":false},{"dB2":false},{"dB2+":false},{"dB3":false},{"dB3+":false},{"dQ1":false},{"dQ2":false},{"dQ2+":false},{"dQ3":false},{"dQ3+":false},{"dEx":false},{"dEx+":false},{"dExB":false},{"dExB+":false}]};
        return result;
    }
    
    function isNumber(value) {
        let x;
        return isNaN(value) ? !1 : (x = parseFloat(value), (0 | x) === x);
    }
    
    function combine_json(a, b) {
        let s1 = JSON.stringify(a) + JSON.stringify(b);
        let s2 = JSON.parse(s1.replace('}{', ','));
        return s2;
    }

    function clearData(txt) {
        txt = txt.replace(/ /g, "");
        txt = txt.replace(/<br>/g, "");
        txt = txt.replace(/</g, "＜");
        txt = txt.replace(/>/g, "＞");
        return txt;
    }
    
   function showTime(f) {
    let t1 = new Date();
    f();
    let t2 = new Date();
    log(t2 - t1);
   }
    
    function showIndividuality(goal){
        let s = '';
        
        let arr = goal['individuality'];
        for(key in arr){         
        let mykey = arr[key];
            if(individualityList[mykey]!==undefined){                
                s+=individualityList[mykey]['name'];
            }else{
                s+='不明:'+mykey;                    
            }
            s+=' ';
        }
        log(s);
    }
                
    //整理Buff
    function getSettleBuff(mySvt,myEmy) {
        let buff = (mySvt['fixedBuff']!==undefined)?getJsonValue(mySvt['fixedBuff']):{
        "isIgnoreDef": 0,
        "isNpIgnoreDef": 0,
        "isUnderworld": 0,
        "atkUp": 0,
        "defUp": 0,
        "npAtkUp": 0,
        "colorUp": {
            "A": 0,
            "B": 0,
            "Q": 0,
            "EX": 0
        },
        "spDefUp": 0,
        "npAdd": 0,
        "npSpAtkUp": 0,
        "criAtkUp": 0,
        "fixAtkUp": 0,
        "npUp": 0,
        "spAtkUp": 0,
        "criStarRateUp": 0
        };
        
        let jsn = mySvt['permBuff'];
        for (key in jsn) {
            let eft = key;
            let eft_skill_arr = jsn[key];                
            for(key2 in eft_skill_arr){                    
                if(eft_skill_arr[key2]['effectDetail']==undefined)continue;
                let detail = eft_skill_arr[key2]['effectDetail'][0];
                let type = superAtkList[detail['rate']['type']];                      
                if(type==undefined)continue;                    
                if(!mySvt.isEnforceSp&&type!==99999&&myEmy['individuality'][type]==undefined)continue;       
                let rate = detail['rate'][1];           
                if (buff[key] == undefined) {
                    buff[key] = Number(rate);                    
                } else {
                    buff[key] += Number(rate);
                } 
            }
        }
                    
        jsn = mySvt['tempBuff'];

        for (key in jsn) {
            let eft = key;
            let eft_skill_arr = jsn[key];
            for(key2 in eft_skill_arr){
                let detail = eft_skill_arr[key2];
                let type = detail['type'];  
                if(type==undefined)continue;
                if(type=='all')type=99999;
                if(!mySvt.isEnforceSp&&type!==99999&&myEmy['individuality'][type]==undefined)continue;       
                let rate = detail['rate'];
                
                if (buff[key] == undefined) {
                    buff[key] = Number(rate);                    
                } else {
                    buff[key] += Number(rate);
                } 
            }
        }

        buff['colorUp']['A']=(buff.artsUp==undefined)?buff['colorUp']['A']:buff['colorUp']['A']+buff.artsUp;
        buff['colorUp']['B']=(buff.busterUp==undefined)?buff['colorUp']['B']:buff['colorUp']['B']+buff.busterUp;
        buff['colorUp']['Q']=(buff.quickUp==undefined)?buff['colorUp']['Q']:buff['colorUp']['Q']+buff.quickUp;
        
        return buff;
    }