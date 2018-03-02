    //svt cno
    //isNp=1,return npRelease
    //isNp=1,return dmg/np/star after npRelease
    //isNp!=1,return dmg/np/star
    //isGetSkill=1,use svt skill    
    function getSvtFightData(settle) {
        let mySettle = getJsonValue(settle);
        let no = mySettle['cno'];
        let mySvt = getBaseSvtData(no);
        // 強制特攻
        mySvt['isEnforceSp'] = mySettle['isEnforceSp'];      
        mySvt['fixedBuff'] = mySettle['buff'];
            mySvt['oc'] = Number(mySettle['oc']);
            mySvt['npLv'] = mySettle['npLv'];
            mySvt['isNPEX'] = mySettle['isNPEX'];
            mySvt['svtLv']=(mySettle['svtLv']!==undefined&&mySettle['svtLv']>0)?mySettle['svtLv']:mySvt.rewardLv;
            mySvt['atk'] = Number(mySettle['equipAtk'])+Number(mySettle['fufuAtk']) + Number(getAtk(no, mySvt['svtLv']));
        let my_isNp = mySettle['isNp'];
        let my_isUseSkill =mySettle['isUseSkill'];
        let my_isCri = mySettle['isCri'];
        let my_isOverkill = mySettle['isOverkill'];

        //showIndividuality(mySvt);
        let myEmy = mySettle['emy'];
        // 拿所有技能Buff
        if (my_isUseSkill) mySvt['tempBuff'] = getSkillEft(mySvt, myEmy);

        // 寶具
        let myNp;
        if (my_isNp!=0) {
            myNp = getSvtNpDmg(mySvt, myEmy);
            if (my_isNp==1)return myNp;
        }

        let myNpRate;
        if (myNp !== undefined) myNpRate = myNp[0].np;
        
        // 基本資料        
        let mySvtData = getSvtFightBaseData(mySvt, myEmy);
        return mySvtData;

        //根據效果對象給予BUFF
        function getSkillEft(svt, emy) {
            let mySvt = svt;
            let myEmy = emy;
            let mySvtBuff = {};
            let mySkill_Lv = {
                1: 10,
                2: 10,
                3: 10
            };
            for (let site = 1; site < 4; site++) {
                let mySkill = getSvtSkillData(no, site, 1);
                
                let eft = mySkill['effectDetail'];

                for (key1 in eft) {
                    let goal = eft[key1].goal;
                    let skill_lv = mySkill_Lv[site];
                    let rate = (eft[key1].rate[skill_lv] !== undefined) ? eft[key1].rate[skill_lv] : eft[key1].rate[1];
                    // 土方技3
                    if (rate.toString().indexOf('%') !== -1) rate = Math.ceil(20 + 80 * (1 - mySvt.hpNow / mySvt.hp));
                    let eft_arr = eft[key1].effect;
                    let eft_type_name = eft[key1]['rate'].type;
                    let eft_give = eft[key1]['rate'].give;                    
                    let eft_type = (superAtkList[eft_type_name]!==undefined)?superAtkList[eft_type_name]: log(eft_type_name+'::不存在列表中');        
                    for (key2 in eft_arr) {
                        let myEft = eft_arr[key2];
                        
                        if (goal == 'mySvt' || goal == 'allSvt') {
                            //處理限制對象
                            if(eft_type!==99991&&eft_type!==99999&&mySvt['individuality'].indexOf(eft_type)==-1&&eft_give==0)continue;                                                                                        
                            if (mySvtBuff[myEft] == undefined) mySvtBuff[myEft] = [0];
                                let eft_json = {
                                    'rate':rate,
                                    'lv':skill_lv,
                                    'name':skill_lv,
                                    'type_name':eft_type_name,
                                    'type':eft_type,
                                    'goal':goal,
                                    'proto':mySkill
                                };                                
                                mySvtBuff[myEft].push(eft_json);
                        } else if (goal == 'myEmy' || goal == 'allEmy') {
                            if(myEft=='busterAnti')myEmy['buff']['colorDefUp']['B']+=rate;
                            if(myEft=='artsAnti')myEmy['buff']['colorDefUp']['A']+=rate;
                            if(myEft=='quickAnti')myEmy['buff']['colorDefUp']['Q']+=rate;
                            //處理限制對象
                           // if(eft_type!==99999&&myEmy['individuality'].indexOf(eft_type)==-1)continue; 
                            myEmy['buff'][myEft] += rate;
                        }
                    }
                }
            }

            return mySvtBuff;

            function getSvtSkillData(no, site, ex) {
                let skill_arr = mySvt.skill;
                let skill = mySvt.skill[site][0];                
                if (mySvt.skill[site][ex]) skill = mySvt.skill[site][ex];
                return skill;
            }
        }




        //寶具相關
        function getSvtNpDmg(svt, emy) {
            let mySvt = svt;
            let myEmy = emy

            let svtArray = {
                1: mySvt
            }
            let emyArray = {
                1: myEmy
            }

            let cmd = {
                "svt": svtArray,
                "svt_goal": 1,
                "emy": emyArray,
                "emy_goal": 1,
                "cmd_color": "",
                "isNP": 1,
                "isCri": my_isCri,
                "isOverkill": my_isOverkill
            }
            
            let result = cmdNpRelease(cmd, 0, 0)[0];
            result.dmg=Math.round(result.dmg);
            result.npHit = mySvt.noblePhantasm[0].damage.length;
            result.npRate = mySvt.npRate.NP;
            result.dmg_berserker=(mySvt['class']!=='Berserker'&&myEmy['class']!=='Berserker')?result.dmg*2:result.dmg;
            return result;

        }
        
        // 基本資料相關
        function getSvtFightBaseData(svt, emy) {
            let mySvt = getJsonValue(svt);
            mySvt['buff'] = getSettleBuff(mySvt, emy);
            let card_count = {
                1: 0,
                2: 0,
                3: 0
            };
            let np_color = mySvt['noblePhantasm'][0]['cardId'];
            card_count[np_color]++;
            let cmd_color = mySvt.cardIds;
            for (key in cmd_color) {
                card_count[cmd_color[key]]++;
            }

            function getCmd(cmd_color, first_card, cmd_site, brave_color) {
                //let mySvtCmd = svt;
                let mySvtCmd = mySvt;                
                //葛飾時重置emy效果
                let myEmyCmd=(mySvtCmd['cno'] == 198)?getJsonValue(emy):emy;  
                //mySvtCmd['buff'] = getSettleBuff(mySvtCmd, emy);
                let svtArray = {
                    1: mySvtCmd
                }
                let emyArray = {
                    1: myEmyCmd
                }
                let cmd = {
                    "svt": svtArray,
                    "svt_goal": 1,
                    "emy": emyArray,
                    "emy_goal": 1,
                    "cmd_color": cmd_color,
                    "isNP": 0,
                    "isCri": my_isCri,
                    "isOverkill": my_isOverkill
                }
                let result = cmdDamageCommon(cmd, first_card, cmd_site, brave_color);
                result.dmg=Math.round(result.dmg);
                return result;
            } 
            
                let A1A = getCmd('A', 'A', 0, '');                
                let A2A = getCmd('A', 'A', 1, '');
                let A3A = getCmd('A', 'A', 2, '');
                let A2B = getCmd('A', 'B', 1, '');
                let A3B = getCmd('A', 'B', 2, '');
                
                let Q1Q = getCmd('Q', 'Q', 0, '');
                let Q2Q = getCmd('Q', 'Q', 1, '');
                let Q3Q = getCmd('Q', 'Q', 2, '');
                let Q2B = getCmd('Q', 'B', 1, '');
                let Q3B = getCmd('Q', 'B', 2, '');
                                
                let B1B = getCmd('B', 'B', 0, '');
                let B2B = getCmd('B', 'B', 1, '');
                let B3B = getCmd('B', 'B', 2, '');
                let B2Q = getCmd('B', 'Q', 1, '');
                let B3Q = getCmd('B', 'Q', 2, '');
                
                let cEx = getCmd('EX', '', 4, '');
                
            let svtData = {
               'common':[
                {'AH': mySvt.hit.A},
                {'BH': mySvt.hit.B},
                {'QH': mySvt.hit.Q},
                {'ExH': mySvt.hit.EX},
                //{'NpH': mySvt.noblePhantasm[0].damage.length}
                ],                         
                'npRate':[
                    {'nA%': mySvt.npRate.A},
                    {'nA1+': A1A.np},
                    {'nA2': A2B.np},
                    {'nA2+': A2A.np},
                    {'nA3': A3B.np},
                    {'nA3+': A3A.np},
                    {'nQ%': mySvt.npRate.Q},
                    {'nQ1': Q1Q.np},
                    {'nQ2': Q2Q.np},
                    {'nQ2+': getCmd('Q', 'A', 1, '').np},
                    {'nQ3': Q3Q.np},
                    {'nQ3+': getCmd('Q', 'A', 2, '').np},
                    {'nB%': mySvt.npRate.B},
                    {'nB+': getCmd('B', 'A', 1, '').np},
                    {'nEx%': mySvt.npRate.EX},
                    {'nEx': cEx.np},
                    {'nEx+': getCmd('EX', 'A', 4, '').np},
                    //{'nNp%': mySvt.npRate.NP},
                    //{'nNp': myNpRate}
                ],
                
                'criStar':[
                    {'sRate': (mySvt["criStarRate"] + mySvt["buff"]["criStarRateUp"]) * 10 / 1000},
                    {'sB1': B1B.star},
                    {'sB2': B2B.star},
                    {'sB2+': B2Q.star},
                    {'sB3': B3B.star},
                    {'sB3+': B3Q.star},
                    {'sQ1+': Q1Q.star},
                    {'sQ2': Q2B.star},
                    {'sQ2+': Q2Q.star},
                    {'sQ3': Q3B.star},
                    {'sQ3+': Q3Q.star},
                    {'sA': A1A.star},
                    {'sA+': getCmd('A', 'Q', 0, '').star},
                    {'sEx': cEx.star},
                    {'sEx+': getCmd('EX', 'Q', 4, '').star},
                    //{'sNp': 0}
                ],
                'dmg':[
                    {'dAtk': mySvt.atk},
                    {'dA1': A1A.dmg},
                    {'dA2': A2A.dmg},
                    {'dA2+': A2B.dmg},
                    {'dA3': A3A.dmg},
                    {'dA3+': A3B.dmg},
                    {'dB1+': B1B.dmg},
                    {'dB2': B2Q.dmg},
                    {'dB2+': B2B.dmg},
                    {'dB3': B3Q.dmg},
                    {'dB3+': B3B.dmg},
                    {'dQ1': Q1Q.dmg},
                    {'dQ2': Q2Q.dmg},
                    {'dQ2+': Q2B.dmg},
                    {'dQ3': Q3Q.dmg},
                    {'dQ3+': Q3B.dmg},
                    {'dEx': cEx.dmg},
                    {'dEx+': getCmd('EX', 'B', 4, '').dmg},
                    {'dExB': getCmd('EX', '', 4, 'A').dmg},
                    {'dExB+': (card_count[2] > 2) ? getCmd('EX', 'B', 4, 'B').dmg : 0},
                    //{'dNp':0}
                    ],
            };            
            return svtData;
        }
    }