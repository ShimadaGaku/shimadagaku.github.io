//cno:baseSvtid
// 從者職階技能專用,計算有用的加成
function getSvtClassAddition(sNo) {
    let a = {
        npUp: [0],
        artsUp: [0],
        busterUp: [0],
        quickUp: [0],
        criStarRateUp: [0],
        criAtkUp: [0],
        fixAtkUp: [0],
        spAtkUp: [0]
    }
    //let a = jsn;    
    let no = sNo;
    let svtClassSkill = getSvtSkillEffect(no, 2);
    for (key1 in svtClassSkill) {
        let arr = svtClassSkill[key1].effectDetail;
        for (key2 in arr) {
            if (arr[key2].goal !== 'mySvt') continue;
            let effect = arr[key2].effect;
            let value = arr[key2]['rate'][1];
            if (a[effect] !== undefined) {
                a[effect][0] += parseFloat(value);
                a[effect].push(svtClassSkill[key1]);
            }
        }
    }
    return a;
}

// 從者寶具專用
function getSvtNpAddition(sNo) {
    let no = sNo;
    let svtNp = getSvtSkillEffect(no, 3); //Noble Phantasm
    let result = new Array();
    for (key in svtNp) {
        let a = {
            cardId: svtNp[key].cardId,
            effect: svtNp[key].effect,
            effectDetail: svtNp[key].effectDetail,
            name: svtNp[key].name,
            rank: svtNp[key].rank,
            ruby: svtNp[key].ruby,
            typeText: svtNp[key].typeText,
            damage: svtNp[key].damage,
            npHit: svtNp[key].damage.length
        }
        result.push(a);
    }
    //log(svtNp);
    return result;
}

// 從者主動技能專用,計算有用的加成
function getSvtSkillAddition(sNo) {
    let no = sNo;
    let svtSkill = getSvtSkillEffect(no, 1);
    let a = new Array();
    let b = new Array();
    let c = new Array();
    let result = {
        1: a,
        2: b,
        3: c
    }
    for (key in svtSkill) {
        let d = {
            effect: svtSkill[key].effect,
            effectDetail: svtSkill[key].effectDetail,
            name: svtSkill[key].name,
            maxCT: svtSkill[key].maxLvChargeTurn,
            iconId: svtSkill[key].iconId
        };
        result[svtSkill[key].num].push(d);
    }

    //log(result);
    return result;
}

// 將需要的從者能力,挑出有用的加回去
function getSvtSkillEffect(sNo, type) {
    let skillType = {
        1: 'activity',
        2: 'classPassive',
        3: 'treasure'
    }
    let sid = getSid(sNo);
    //log(mstSvtTotalSkillDetail[sid]);
    let svtSkill = getSvtSkill(sid);
    let svtSkillType = svtSkill[skillType[type]];
    //log(svtSkillType);
    let svtSkillEffect = {};
    // num = 技能位置
    // strengthStatus = 0沒解放任務 = 1有解放任務而沒解放 = 2已解放
    let svtSkillDetail = {};
    for (key in svtSkillType) {
        if (key == sid) continue;
        //log(type);

        //log(svtSkillType);
        svtSkillEffect[key] = svtSkillType[key].effect;

        //svtSkillDetail[key] = svtSkillType[key];
        //log(key);
    }
    //log(svtSkillType);
    let a = {};
    let arr_effect = new Array();
    //log(svtSkillEffect);
    for (svtkey in svtSkillEffect) {
        let skill_list = svtSkillEffect[svtkey];
        let aa = getSkillEffectAll(skill_list);        
        svtSkillType[svtkey]['effectDetail'] = aa;
        svtSkillDetail[svtkey] = svtSkillType[svtkey];
    }
    //log(svtSkillDetail);
    return svtSkillDetail;
};

function getSkillEffectAll(jsn) {
    let goal;
    let effect;

    let rate;

    let arr = new Array();

    for (key1 in jsn) {
        //log(jsn[key1]);
        let jsn2 = jsn[key1];
        for (key2 in jsn2) {
            let str = key2;

            let g = getSkillGoal(str);
            if (g !== undefined) goal = g;

            let lift = getSkillLift(str);
            if (lift == undefined) continue;

            let newStr = getSkillLeft_clear(str);
            
            let e = getSkillEffect(newStr, lift);
            if (e.length > 0) {
                effect = e;
            } else {
                continue;
            }

            rate = getSkillRate(str, jsn2[key2], lift);
            let aa = {};

            aa['goal'] = goal;
            aa['effect'] = effect;
            aa['rate'] = rate;
            arr.push(aa);
        }
    }


    //console.log(arr);
    return arr;
}

function getSkillGoal(str) {
    for (key in mstSkillGoal) {
        let a = str.indexOf(key);
        if (a !== -1) {
            return mstSkillGoal[key];
            //break;
        }
    }
}

function getSkillLift(str) {
    for (key in mstSkillLift) {
        //if(mstSkillLift[key]=='npHpSpAtkUp')log(key);
        let a = str.indexOf(key);
        if (a !== -1) {
            if(mstSkillLift[key]=='npHpSpAtkUp')str=str.replace(key, '');
            //log(str);
            //log(mstSkillLift[key]);
            //log(key);
            return mstSkillLift[key];
            //break;
        }
    }
}

function getSkillLeft_clear(str){
    for (key in mstSkillLift) {
        let a = str.indexOf(key);
        if (a !== -1) {
            str=str.replace(key, '');
            return str;
        }
    }
    return str;
}

function getSkillEffect(str, lift) {
    let arr = new Array();
    let mystr = str;
    
    for (key in mstSkillEffect) {
        let a = mystr.indexOf(key);  
        if (a !== -1) {
            if(mystr.indexOf('OverCharge')!==-1&&a>mystr.indexOf('OverCharge'))continue;
            let aa = mstSkillEffect[key];
            
            mystr = mystr.replace(key, '');
           

            //log(mystr);
            //log(str);
            aa = clearEffect(aa, lift);
            //log(aa);
            arr.push(aa);
            //return mstSkillEffect[key];
            //break;
        }
    }    
    return arr;
}

function clearEffect(eft, lift) {
    let effect = eft;

    if (effect == 'atkUp' && lift == 'npAtk') {
        effect = 'npAtk';
    }

    //log(eft);
    //log(lift);
    if (effect == 'npAdd' && lift == 'npUp') {
        effect = 'npUp';
    }
    if (effect == 'buff' && lift == 'remove') {
        effect = 'buffRemove';
    }

    if (effect == 'npSpAtkUp') {
        //log(lift);
        if (lift == 'give') effect = 'spAtkUp';
        if (lift == 'spDefUp') effect = 'spDefUp';

    }
    return effect;
}

function getSkillRate(str, rate, lift) {
    let a = {};
    a = rate.split(/\//);
    //處理血量特攻
    if (rate.indexOf('*(') == -1) {
        //a['rate'] = rate.split(/\//);    
        let aa = {};

        for (key in a) {
            let num = Number(key) + 1;
            aa[num] = a;
            if (a[key].indexOf('%') !== -1) {                
                let num2 = a[key].replace(/%/g, '');
                // 在計算的時候除
                if (lift == -1) num2 *= lift;
                aa[num] = Number(num2);
                // 處理百貌
                if(str.indexOf('Buster卡性能提升30%')!==-1)aa[num] = 30;
            } else {
                aa[num] = Number(a[key]);
            }
            //處理望月
        if(isNaN(aa[1]))aa[1]=rate;
        }

        a = aa;
    } else {
        let aa = {0:20,1:rate};
        a = aa;
    }
//log(str);
//log(rate);


    
    if (str.indexOf('OverCharge') !== -1){
        a['isOC'] = 1;
    }else{
        a['isOC'] = 0;
    } 

    
    if (str.indexOf('Lv.') !== -1) {
        a['isLV'] = 1;
    }else{
        a['isLV'] = 0;
    }


    if (str.indexOf('〔') !== -1) {
        let start = str.indexOf('〔') + 1;
        let end = str.indexOf('〕');
        a['type'] = str.substring(start, end);
    }else{
        a['type'] = 'all';
    }
    if (str.indexOf('賦予') !== -1) {
        a['give'] = 1;
    }else{
        a['give'] = 0;
    }
    if(str.indexOf('攻擊時') !== -1){
        a['ifAtk'] = 1;
        a['give'] = 1;
    }else{
        a['ifAtk'] = 0;
    }
    //a['rate'] = aa;
    //a['rate']['isOC'] = 0;
    //if (str.indexOf('OverCharge') !== -1) a['rate']['isOC'] = 1;
    return a;
}


let mstSkillGoal = {
    "自身除外": "except",
    //"我方單體": "我方單體",
    "我方單體": "mySvt",
    "自身": "mySvt",
    "我方全體": "allSvt",
    "敵單體": "myEmy",
    "敵全體": "allEmy"
}

let mstSkillEffect = {
    "傷害減免":'fixDefUp',
    "在普通攻擊時賦予詛咒":undefined,
    "攻擊時自身的星星發生率":'criStarRateUp',
    "對自身賦予Arts卡攻擊時賦予對象防禦力下降": 'ifArtsEmyDefDown',
    "HP特攻": 'npHpSpAtkUp',
    "特攻": 'npSpAtkUp', //默認寶具特攻,有賦予改成普通特攻
    "特效": 'npSpAtkUp',//教王出錯
    "防禦無視": 'isIgnoreDef',
    "無視防禦": 'isNpIgnoreDef',
    "攻擊弱體耐性": 'useless',
    "攻擊": 'atkUp',
    "防禦": 'defUp',
    "寶具威力": 'npAtkUp',
    "Arts卡性能": 'artsUp',
    "Buster卡性能": 'busterUp',
    "Quick卡性能": 'quickUp',
    "Arts卡耐性": 'artsAnit',
    "Buster卡耐性": 'busterAnti',
    "Quick卡耐性": 'quickAnti',
    "強化": 'buff',
    "毒狀態": 'isPosion',
    "傷害": 'fixAtkUp',
    "NP": 'npAdd',
    "星星發生率": 'criStarRateUp',
    "Critical威力": 'criAtkUp',
    "冥界加護": 'isUnderworld'
}

//對敵全體的強力攻擊[Lv.](無視防禦力提升效果)
//大問題

// 如果Effect或life是undefined,代表無視這項效果
let mstSkillLift = {
    "敵人攻擊的防禦力提升": 'spDefUp',
    "獲得量": 'npUp',
    "累積": 1,
    "遭傷害時": 'injuredNpUp',
    '強力': 'npAtk',
    "提升": 1,
    "下降": -1,
    "增加": 1,
    "減免": 1,    
    "解除": 'remove',
    "賦予": 'give',
    "攻擊倍率": 'npHpSpAtkUp'
}




/*
    "HP回復量",
    "Critical發生率",
"暈眩",
    "防禦強化狀態",
    "燒傷狀態",
    "延焼狀態",
    "魅惑狀態",
    "帶電狀態",
    "詛咒狀態",
    "混亂狀態",
*/
// 先看第一項的目標
// 若沒有其他能力沒有描述,以第一項為準
// 用山翁當測試