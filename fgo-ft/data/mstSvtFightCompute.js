
let svtDmg = new Array();
let svtRecord = new Array();

function cmdDamage(svt_cmd_array) {
    let isBrave = 0;
    for (let cmdSite in svt_cmd_array) {
        // 應該放在選卡時
        let num = svt_cmd_array[cmdSite]["svt_goal"];
        let svt = svt_cmd_array[cmdSite]["svt"][num];
        if (svt_cmd_array[cmdSite]["isNP"]) svt_cmd_array[cmdSite]["cmd_color"] = numToColor[mySvt["noblePhantasm"][0]['cardId']];
    }

    // 首卡顏色
    let first_cmd_color = svt_cmd_array[0]["cmd_color"];

    // 檢查brave
    if (svt_cmd_array[0]["cmd_color"] == svt_cmd_array[1]["cmd_color"] && svt_cmd_array[0]["cmd_color"] === svt_cmd_array[2]["cmd_color"]) {
        isBrave = svt_cmd_array[0]["cmd_color"];
    };

    // 檢查EX
    if (svt_cmd_array[0]["site"] == svt_cmd_array[1]["site"] && svt_cmd_array[0]["site"] === svt_cmd_array[2]["site"]) {
        svt_cmd_array[3] = JSON.parse(JSON.stringify(svt_cmd_array[0]));
        svt_cmd_array[3]["isNP"] = 0;
        svt_cmd_array[3]["isCri"] = 0;
        svt_cmd_array[3]["cmd_color"] = "EX";
    };

    // 計算傷害
    let np_num_oc = 0;
    for (let cmdSite in svt_cmd_array) {
        if (svt_cmd_array[cmdSite]["isNP"]) {
            svtDmg.push(cmdNpRelease(svt_cmd_array[cmdSite], cmdSite, np_num_oc));
            np_num_oc++;
        } else {
            svtDmg.push(cmdDamageCommon(svt_cmd_array[cmdSite], first_cmd_color, cmdSite, isBrave));
        }

    }
    let total = 0;
    for (let key in svtDmg) {
        total += svtDmg[key];
    }
    //svtDmg.push(total);
    return svtDmg;
}

function cmdDamageCommon(svt_cmd, first_cmd_color, cmdSite, isBrave) {
    // 我方從者
    let mySvt = svt_cmd["svt"][svt_cmd["svt_goal"]];    
    // 敵方目標位置
    let emy_goal = svt_cmd["emy_goal"];
    let myEmy = svt_cmd["emy"][emy_goal];
    
    mySvt['buff'] = getSettleBuff(mySvt,myEmy);

    // 指令卡色
    let cmd_color = svt_cmd["cmd_color"];
    
    // 指令卡位置
    let cmd_site = Number(cmdSite) + 1;
    if(cmd_color=='EX')cmd_site = 4;

    // 魔放。 魔放扣抗性不會低於100%
    let color_atk_up = (mySvt["buff"]["colorUp"][cmd_color] - myEmy["buff"]["colorDefUp"][cmd_color]) / 100;

    if (color_atk_up < -1) color_atk_up = -1;

    // 首卡顏色
    let first_color = first_cmd_color;

    // hit數
    let svt_hit = mySvt["hit"][cmd_color];
    //if (svt_cmd["isNP"]) svt_hit = mySvt["noblePhantasm"]["hit"];


    //-- 計算傷害 --//


    // 戰鬥面版的ATK，包含禮裝
    let svt_atk = mySvt["atk"];
    // 攻擊補正
    let crt_atk = 0.23;
    // 攻擊卡色補正
    let color_atk = {
        "A": 1,
        "B": 1.5,
        "Q": 0.8,
        "EX": 1
    };
    // 攻擊位置補正
    let site = {
        1: 1,
        2: 1.2,
        3: 1.4,
        4: 1
    };
    // 首卡加成
    let crt_first_dmg = 0;
    if (first_color == "B") {
        crt_first_dmg = 0.5;
    };
    // 從者職階    
    let svt_class = mySvt["class"];
    // 從者職階傷害補正
    let crt_class_atkRate = mstClass[svt_class]["attackRate"] / 1000;
    // 職階相剋
    let crt_class_relation = 1;
    let isExist = mstClassRelation[mySvt["class"]][myEmy["class"]];
    if (isExist) crt_class_relation = isExist / 1000;
    // 天地人星獸
    let crt_types_relation = 1;
    isExist = mstSvtTypeRelation[mySvt["attri"]][myEmy["attri"]];
    if (isExist) crt_types_relation = isExist / 1000;
    // 亂數 0.9~1.1
    let crt_rand = 1;
    // 敵方防禦上升。 下降不會低於100%
    let def_up = myEmy["buff"]["defUp"];
    if (def_up < -100) def_up = -100;
    // 攻擊上升結算
    let atk_up = (mySvt["buff"]["atkUp"] - def_up) / 100;
    // 特攻上升
    //let spAtkUp = getSpAtkUp(mySvt, myEmy);
    let sp_up = (mySvt["buff"]["spAtkUp"] - myEmy["buff"]["spDefUp"]) / 100;
    // 爆擊上升
    let cri_up = mySvt["buff"]["criAtkUp"] / 100;
    // 特攻爆擊上升結算
    let crt_sp_and_cri = 1 + sp_up;
    
    if (svt_cmd["isCri"]) {
        crt_sp_and_cri = 2 * (1 + cri_up + sp_up);
    }
    // EX攻擊
    let crt_EX = 1;
    if (cmd_site === 4) {
        crt_EX = 2;
        if (isBrave == 'A' ||isBrave == 'B'||isBrave == 'Q') {
            crt_EX = 3.5;
        }
    }
    // 固定傷害上升
    let fix_up = mySvt["buff"]["fixAtkUp"] - myEmy["buff"]["fixDefUp"];
    // B卡burst
    let crt_burst_dmg = {
        0: 0,
        "A": 0,
        "B": 0.2,
        "Q": 0
    };
    let brave_dmg = 0;
    if(crt_burst_dmg[isBrave]!==undefined)brave_dmg = crt_burst_dmg[isBrave];


    let damage =
        svt_atk *
        crt_atk *
        (
            color_atk[cmd_color] *
            site[cmd_site] *
            (1 + color_atk_up) +
            crt_first_dmg
        ) *
        (
            crt_class_atkRate *
            crt_class_relation *
            crt_types_relation *
            crt_rand
        ) *
        (1 + atk_up) *
        crt_sp_and_cri *
        crt_EX +
        fix_up +
        (
            svt_atk *
            brave_dmg
        );
    damage = Math.round(damage * 100) / 100;
    if (damage < 0) damage = 0
    //ss+=damage;

    //-- 計算NP --//
    let np_rate = mySvt["npRate"][cmd_color];

    // 首卡加成
    let crt_first_np = 0;
    if (first_color == "A") {
        crt_first_np = 1;
    };
    // NP恢復卡色倍率
    let crt_np_rate_list = {
        "A": {
            1: 3,
            2: 4.5,
            3: 6
        },
        "B": {
            1: 0,
            2: 0,
            3: 0
        },
        "Q": {
            1: 1,
            2: 1.5,
            3: 2
        },
        "EX": {
            4: 1
        }

    };
    let crt_np_rate = crt_np_rate_list[cmd_color][cmd_site];
    
    
    // 暴擊補正
    let crt_cri_np = 1;
    if (svt_cmd["isCri"]) {
        crt_cri_np = 2;
    }
    // 超傷補正
    let crt_overkill_np = 1;
    if (svt_cmd["isOverkill"]) {
        crt_overkill_np = 1.5;
    }
    // 敵人職階、種類Np補正
    let crt_emy_np_rate = 1;
    isExist = mstClassNp["class"][myEmy["class"]];
    if (isExist) crt_emy_np_rate = isExist;
    // 種類僅收錄幽靈1.2倍補正
    if (myEmy['individuality'][1002] !== undefined) crt_emy_np_rate *= 1.2;
    /*
    for (let key in mstClassNp["feature"]) {
        isExist = myEmy["feature"].indexOf(key);
        if (isExist !== -1) {
            crt_emy_np_rate *= mstClassNp["feature"][key];
            break;
        }
    }
    */
    let np =
        np_rate *
        (
            (
                crt_first_np +
                crt_np_rate *
                (1 + color_atk_up)
            ) *
            (1 + mySvt["buff"]["npUp"]/100) *
            crt_cri_np *
            crt_overkill_np *
            svt_hit *
            crt_emy_np_rate
        );
    np = Math.round(np * 100) / 100;

    //-- 計算星星發生 --//
    // 從者星星發生率
    let svt_cri_star_Rate = mySvt["criStarRate"] / 100;
    // 星星發生率上升
    let cri_star_up = mySvt["buff"]["criStarRateUp"] / 100;
    // 星星發生率卡色倍率
    let crt_cri_star_Rate_list = {
        "A": {
            1: 0,
            2: 0,
            3: 0
        },
        "B": {
            1: 0.1,
            2: 0.15,
            3: 0.2
        },
        "Q": {
            1: 0.8,
            2: 1.3,
            3: 1.8
        },
        "EX": {
            4: 1
        }
    };
    let crt_cri_star_Rate = crt_cri_star_Rate_list[cmd_color][cmd_site];

        
    // 首卡加成
    let crt_first_cri_star = 0;
    if (first_color == "Q") {
        crt_first_cri_star = 0.2;
    };
    // 暴擊加成
    let crt_cri_cri_star = 0;
    if (svt_cmd["isCri"]) {
        crt_cri_cri_star = 0.2;
    }
    // 超傷加成
    let crt_overkill_cri_star = 0;
    if (svt_cmd["isOverkill"]) {
        crt_overkill_cri_star = 0.3;
    }

    // 伺服器補正，詳細數值不確定
    let crt_server = 0;
    let crt_emy_cri_star_Rate = 0;

    let criStar =
        svt_cri_star_Rate +
        crt_first_cri_star +
        (
            crt_cri_star_Rate *
            (1 + color_atk_up) +
            crt_server +
            cri_star_up -
            crt_emy_cri_star_Rate +
            crt_cri_cri_star
        ) +
        crt_overkill_cri_star;
    if (criStar > 3) criStar = 3;

    criStar = Math.round(criStar * svt_hit * 10000) / 10000;

    let record = "第 " + mySvt["site"] + " 位置從者 " + mySvt["name"] + " 使用第 " + cmd_site + " 指令 " + cmd_color + " 卡攻擊 " + myEmy["name"] +
        " 造成 " + damage + " 點傷害,恢復 " + np + " 點 NP ,發生 " + criStar + " 顆暴擊星";
    //log(record);
    
    let result = {
        'record':record,
        'svtSite':mySvt["site"],
        'svtName':mySvt["name"],
        'cmdSite':cmd_site,
        'cmdColor':cmd_color,
        'isNp':0,
        'emyName':myEmy["name"],
        'dmg':Number(damage),
        'np':Number(np),
        'star':Number(criStar)
    }
    svtRecord.push(result);
    if(mySvt['buff']['ifArtsEmyDefDown']!==undefined&&cmd_color=='A')myEmy['buff']['defUp']-=mySvt['buff']['ifArtsEmyDefDown'];
    return result;

}

function cmdNpRelease(svt_cmd, cmdSite, npNum) {
    // 從這裡要檢查寶具等級、效果
    // 把npAtk獨立出來
    let mySvt = svt_cmd["svt"][svt_cmd["svt_goal"]];
    // 寶具等級
    let np_lv = mySvt["npLv"];
    // 是否寶解
    let np_ex = mySvt["isNPEX"];
    // oc
    mySvt.oc += npNum;
    //     
    
    let myNp = mySvt["noblePhantasm"][np_ex];
    if (myNp == undefined) {
        np_ex = 0;
        mySvt["isNPEX"] = 0;
        myNp = mySvt["noblePhantasm"][np_ex];
    }

    let result = [
        {
        'record':'',
        'svtSite':mySvt["site"],
        'svtName':mySvt["name"],
        'cmdSite':cmdSite,
        'cmdColor':numToColor[mySvt["noblePhantasm"][0]['cardId']],
        'cardId':mySvt["noblePhantasm"][0]['cardId'],
        'isNp':1,
        'emyName':svt_cmd["emy"][svt_cmd["emy_goal"]]["name"],
        'dmg':0,
        'np':0,
        'star':0,
        'npName':myNp.name,
        'svtAtk':mySvt.atk,
        'npDmgRate':0,
        'isAll':1
        }
    ]
    
    //log('///');
    //log(mySvt);
    let tempBuff = mySvt['tempBuff'];
    let np_detail_arr = myNp["effectDetail"];
    
    
    for (key1 in np_detail_arr) {
        let np_detail_arr2 = np_detail_arr[key1];
        let goal = np_detail_arr2['goal'];
        let eft_arr = np_detail_arr2['effect'];        
        let skill_lv = (np_detail_arr2['rate'].isOC)?mySvt.oc:np_lv;        
        let rate = (np_detail_arr2['rate'][skill_lv]!==undefined)?np_detail_arr2['rate'][skill_lv]:np_detail_arr2['rate'][1];
        for (key2 in eft_arr) {
            let eft = eft_arr[key2];
            // 寶具特攻和HP特攻在寶具施放時處理
            if (eft == 'npSpAtkUp' || eft == 'npHpSpAtkUp') continue;
            if (eft == 'npAtk') {
                result = getNpDmg(svt_cmd, goal, rate);
            } else {
                if (tempBuff[eft] == undefined) tempBuff[eft] = [0];
                                let eft_json = {
                                    'rate':rate,
                                    'lv':skill_lv,
                                    'name':skill_lv,
                                    'type_name':np_detail_arr2['rate']['type_name'],
                                    'type':np_detail_arr2['rate']['type'],
                                    'goal':goal,
                                    'detail':myNp['effect'][key1],
                                    'proto':myNp
                                };       
                    tempBuff[eft].push(eft_json);                
            }
        }
    }

    function getNpDmg(svt_cmd, goal, rate) {        
        let np_lv = mySvt["npLv"];
        let np_ex = mySvt["isNPEX"];
        let myNp = mySvt["noblePhantasm"][np_ex];
        let result = new Array();
        
        if (goal == 'allEmy') {
            let emy_array = svt_cmd["emy"];
            for (let key in emy_array) {
                let dmg_result = cmdNpDamage(svt_cmd, emy_array[key], cmdSite, rate);
                dmg_result['isAll'] = 1;
                result.push(dmg_result);
            }
        } else {
            let emy_goal = svt_cmd["emy_goal"];
            let myEmy = svt_cmd["emy"][emy_goal];
                let dmg_result = cmdNpDamage(svt_cmd, myEmy, cmdSite, rate);
                dmg_result['isAll'] = 0;
                result.push(dmg_result);
        }
        return result;
    }
    return result;
}

function cmdNpDamage(svt_cmd, enemy, cmdSite, npAtkRate) {
    // 我方從者
    let mySvt = svt_cmd["svt"][svt_cmd["svt_goal"]];
    // 敵方目標位置
    let myEmy = enemy;
    
    mySvt['buff'] = getSettleBuff(mySvt,myEmy);

    // 指令卡位置
    let cmd_site = Number(cmdSite) + 1;
    // 指令卡色
    let cmd_color = numToColor[mySvt["noblePhantasm"][0]['cardId']];
    // 魔放。 魔放扣抗性不會低於100%    
    let color_atk_up = (mySvt["buff"]["colorUp"][cmd_color] - myEmy["buff"]["colorDefUp"][cmd_color]) / 100;
    if (color_atk_up < -1) color_atk_up = -1;

    // 寶具等級
    //let np_lv = mySvt["npLv"];
    // 是否寶解
    let np_ex = mySvt["isNPEX"];
    // hit數
    let svt_hit = mySvt["noblePhantasm"][np_ex]["npHit"];
    let svt_np_name = mySvt["noblePhantasm"][np_ex]["name"];

    //-- 計算傷害 --//

    // 戰鬥面版的ATK，包含禮裝
    let svt_atk = mySvt["atk"];
    // 攻擊補正
    let crt_atk = 0.23;
    // 血量特攻倍率,用跟寶具同方式加上去
    let hp_per = 0/mySvt['hp'];
    let np_hp_dmg_rate = (getNpHpSpAtkUp(mySvt)/100)*(1-hp_per);    
    // 寶具傷害倍率
    let np_dmg_rate = (npAtkRate / 100)+np_hp_dmg_rate;

    // 攻擊卡色補正
    let color_atk = {
        "A": 1,
        "B": 1.5,
        "Q": 0.8,
        "EX": 1
    };
    // 從者職階    
    let svt_class = mySvt["class"];
    // 從者職階傷害補正
    let crt_class_atkRate = mstClass[svt_class]["attackRate"] / 1000;
    // 職階相剋
    let crt_class_relation = 1;
    let isExist = mstClassRelation[mySvt["class"]][myEmy["class"]];
    if (isExist) crt_class_relation = isExist / 1000;
    // 天地人星獸
    let crt_types_relation = 1;
    isExist = mstSvtTypeRelation[mySvt["attri"]][myEmy["attri"]];
    if (isExist) crt_types_relation = isExist / 1000;
    // 亂數 0.9~1.1
    let crt_rand = 1;
    // 敵方防禦上升。 下降不會低於100%
    let def_up = myEmy["buff"]["defUp"];
    if (def_up < -100) def_up = -100;
    // 攻擊上升結算
    let atk_up = (mySvt["buff"]["atkUp"] - def_up) / 100;
    // 特攻上升
    let sp_up = (mySvt['buff']['spAtkUp'] - myEmy["buff"]["spDefUp"]) / 100;
    // 寶具特攻 buff
    let np_sp_up_buff = mySvt["buff"]["npAtkUp"] / 100;

    // 寶具特攻
    let np_sp_up = getNpSpAtkUp(mySvt, myEmy);
    isExist = mySvt["buff"]["npSpAtkUp"];
    if (isExist > 0) np_sp_up = isExist / 100;
    // 固定傷害上升
    let fix_up = mySvt["buff"]["fixAtkUp"] - myEmy["buff"]["fixDefUp"];


    let damage =
        svt_atk *
        crt_atk *
        np_dmg_rate *
        (
            color_atk[cmd_color] *
            (1 + color_atk_up)
        ) *
        (
            crt_class_atkRate *
            crt_class_relation *
            crt_types_relation *
            crt_rand
        ) *
        (1 + atk_up) *
        (1 + sp_up + np_sp_up_buff) *
        np_sp_up +
        fix_up;
        
        //log(mySvt);
    damage = Math.round(damage * 100) / 100;
    if (damage < 0) damage = 0

    //-- 計算NP --//


    // NP恢復卡色倍率
    let crt_np_rate = {
        "A": 3,
        "B": 0,
        "Q": 1,
    };

    // 超傷補正
    let crt_overkill_np = 1;
    if (svt_cmd["isOverkill"]) {
        crt_overkill_np = 1.5;
    }
    // 敵人職階、種類Np補正
    let crt_emy_np_rate = 1;
    isExist = mstClassNp["class"][myEmy["class"]];
    if (isExist) crt_emy_np_rate = isExist;

    // 種類僅收錄幽靈1.2倍補正
    if (myEmy['individuality'][1002] !== undefined) crt_emy_np_rate *= 1.2;
    /*
    for (let key in mstClassNp["feature"]) {
        isExist = myEmy["feature"].indexOf(key);
        if (isExist !== -1) {
            crt_emy_np_rate *= mstClassNp["feature"][key];
            break;
        }
    }
    */
    let np =
        mySvt["npRate"]['NP'] *
        (
            (
                crt_np_rate[cmd_color] *
                (1 + mySvt["buff"]["colorUp"][cmd_color] / 100)
            ) *
            (1 + mySvt["buff"]["npUp"]/100) *
            crt_overkill_np *
            svt_hit *
            crt_emy_np_rate
        );
    np = Math.round(np * 100) / 100;

    //-- 計算星星發生 --//
    // 從者星星發生率
    let svt_cri_star_Rate = mySvt["criStarRate"] / 100;
    // 星星發生率上升
    let cri_star_up = mySvt["buff"]["criStarRateUp"] / 100;
    // 星星發生率卡色倍率
    let crt_cri_star_Rate = {
        "A": 0,
        "B": 0.1,
        "Q": 0.8
    };
    // 超傷加成
    let crt_overkill_cri_star = 0;
    if (svt_cmd["isOverkill"]) {
        crt_overkill_cri_star = 0.3;
    }

    // 伺服器補正，詳細數值不確定
    let crt_server = 0;
    let crt_emy_cri_star_Rate = 0;

    let criStar =
        svt_cri_star_Rate +
        (
            crt_cri_star_Rate[cmd_color] *
            (1 + color_atk_up) +
            crt_server +
            cri_star_up -
            crt_emy_cri_star_Rate
        ) +
        crt_overkill_cri_star;
    if (criStar > 3) criStar = 3;
    criStar = Math.round(criStar * svt_hit * 10000) / 10000;
    
    let record = "第 " + mySvt["site"] + " 位置從者 " + mySvt["name"] + " 使用第 " + cmd_site + " 指令 " + cmd_color + " 卡 寶具 " + svt_np_name + " 攻擊 " + myEmy["name"] +
        " 造成 " + damage + " 點傷害,恢復 " + np + " 點 NP ,發生 " + criStar + " 顆暴擊星";
    //log(record);
    let result = {
        'record':record,
        'svtSite':mySvt["site"],
        'svtName':mySvt["name"],
        'cmdSite':cmd_site,
        'cmdColor':cmd_color,
        'cardId':mySvt["noblePhantasm"][0]['cardId'],
        'isNp':1,
        'emyName':myEmy["name"],
        'dmg':Number(damage),
        'np':Number(np),
        'star':Number(criStar),
        'npName':svt_np_name,
        'svtAtk':svt_atk,
        'npDmgRate':np_dmg_rate
    }
    svtRecord.push(result);
    if(mySvt['buff']['ifArtsEmyDefDown']!==undefined&&cmd_color=='A')myEmy['buff']['defUp']-=mySvt['buff']['ifArtsEmyDefDown'];
    return result;
}

// 處理寶具特攻問題
function getNpSpAtkUp(mySvt, myEmy) {    
    let myNp = mySvt["noblePhantasm"][mySvt["isNPEX"]];
    for (key1 in myNp['effectDetail']) {
        for (key2 in myNp['effectDetail'][key1]['effect']) {
            let eft = myNp['effectDetail'][key1]['effect'][key2];
            if (eft == "npSpAtkUp") {                
                let oc = mySvt['oc'];
                mySvt['buff']['npSpAtkUp'] = {
                    'rate': myNp['effectDetail'][key1]['rate'][oc],
                    'type': myNp['effectDetail'][key1]['rate']['type']
                }
            }
        }
    }

    let buff_arr = mySvt['buff']['npSpAtkUp'];
    let emyType = myEmy['individuality'];
    let result = 0;
    let spAtkType = superAtkList[buff_arr['type']];
    let rate = buff_arr['rate'];
    //showIndividuality(myEmy);
    if (spAtkType !== undefined) {
        let goalType = emyType[spAtkType];
        if (emyType[goalType] !== undefined || mySvt.isEnforceSp == 1 || mySvt.isEnforceSp ==true) result += Number(rate) / 100;
    }
    //log(buff_arr);
    if(result == 0)result=1;
    return result;
}

function getNpHpSpAtkUp(mySvt) {
    let myNp = mySvt["noblePhantasm"][mySvt["isNPEX"]];
    let result = 0;
    for (key1 in myNp['effectDetail']) {
        for (key2 in myNp['effectDetail'][key1]['effect']) {
            let eft = myNp['effectDetail'][key1]['effect'][key2];
            if (eft == "npHpSpAtkUp") {
                let oc = mySvt['oc'];
                let rate = myNp['effectDetail'][key1]['rate'][oc];
                if(rate ==undefined) rate = myNp['effectDetail'][key1]['rate'][1];
                mySvt['buff']['npHpSpAtkUp'] = {
                    'rate': rate
                }
                result = rate;
            }
        }
    }
    
    return result;
}