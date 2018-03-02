    
    
    
    function setNobleTable(){
    createArticle();
    showTime(createNobleThead);
    showTime(createNobleSvtSelector);
    showTime(createNobleAttriSelector);
    $(function() {
        function f() {
            $("table#svtDataTable").tablesorter({
                widgets: ['zebra']
            });
            $("input[type=text]").on("click", function() {
                $(this).select();
            });

        }
        showTime(f);
    });
    function createArticle(){    
       let data = new Array();
       data.push('<article id="nobleTable" class="nobleTable">');
       data.push('<table><tr>');
       data.push('<td><fieldset id="selector" class="box"><legend>');
       data.push('<l onclick="top_hideAll(this);">－</l>');
       data.push('<l onclick="top_selectAll(this);">屬性選擇器</l>');
       data.push('</legend></fieldset></td>');
       data.push('<td><fieldset id="filter" class="box"><legend>');
       data.push('<l onclick="top_hideAll(this);">－</l>');
       data.push('<l onclick="top_selectAll(this);">從者篩選器</l>');
       data.push('</legend></fieldset></td>');
       data.push('</tr></table>');
       data.push('<table class="tablesorter" id="svtDataTable">');
       data.push('<thead></thead><tbody></tbody>');
       data.push('</table>');
       data.push('</article>');
        let myAtiDiv = document.querySelectorAll("div#myArticle")[0];
        myAtiDiv.innerHTML= data.join('');
    }
    }
    
    function updateNobleSvtData(obj) {
        if(this.repeatNp==true)return;
        this.repeatNp=true;
        obj.id = 'off_click';
        let fieldset = document.querySelectorAll("fieldset#selector")[0];
        let text = fieldset.querySelectorAll("input[type=text]");
        let select = fieldset.querySelectorAll("select");
        let checkbox = fieldset.querySelectorAll("input[type=checkbox]");
        let mySvtData = {};

        for (key in select) {
            let value = select[key];
            if (value == undefined || value.value == undefined || value.id == undefined) continue;
            //let num = (isNumber(value.value))?Number(value.value):0;                         
            mySvtData[value.id] = value.value;
        }
        for (key in text) {
            let value = text[key];
            if (value == undefined || value.value == undefined || value.id == undefined) continue;
            let num = (isNumber(value.value)) ? Number(value.value) : 0;
            if (value.id.indexOf('fixAtkUp') !== -1) {
                num = (num < -1000) ? -1000 : (num > 30000) ? 30000 : num;
            } else {
                num = (num < -100) ? -100 : (num > 500) ? 500 : num;
            }
            mySvtData[value.id] = num;
        }
        for (key in checkbox) {
            let value = checkbox[key];
            if (value == undefined || value.value == undefined || value.id == undefined) continue;
            mySvtData[value.id] = value.checked;
        }

        function f() {
            resetNobleTbody(mySvtData);
            updateNobleTable();
        };
        showTime(f);
        setTimeout(function(){
            this.repeatNp=false;
            obj.id = 'on_click';
        },3000);
    }

    function resetNobleTbody(data) {
        let svtBaseSettle = {
            'cno': 1,
            'isNp': 1,
            'isUseSkill': 1,
            'isCri': 0,
            'isOverkill': 0,
            'isEnforceSp': 1,
            'oc': 5,
            'npLv': 5,
            'isNPEX': 1,
            'fufuAtk': 1000,
            'equipAtk': 0,
            'buff': {
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
            },
            'emy': {
                "mntId": 1,
                "class": 'Unknown',
                "attri": "",
                "name": "",
                "individuality": {
                    10: 1
                },
                "buff": {
                    "defUp": 0,
                    "colorDefUp": {
                        "A": 0,
                        "B": 0,
                        "Q": 0,
                        "EX": 0
                    },
                    "spDefUp": 0,
                    "fixDefUp": 0
                }
            }
        }
        if (data !== undefined) {
            svtBaseSettle['isCri'] = data['isCri'];
            svtBaseSettle['isEnforceSp'] = data['isEnforceSp'];
            svtBaseSettle['isOverkill'] = data['isOverkill'];
            svtBaseSettle['isUseSkill'] = data['isUseSkill'];
            svtBaseSettle['npLv'] = data['npLv'];
            svtBaseSettle['oc'] = data['ocLv'];
            svtBaseSettle['svtLv'] = data['svtLv'];
            svtBaseSettle['fufuAtk'] = data['fufuAtk'];
            svtBaseSettle['equipAtk'] = data['equipAtk'];
            svtBaseSettle['buff']['atkUp'] = data['atkUp'];
            svtBaseSettle['buff']['fixAtkUp'] = data['fixAtkUp'];
            svtBaseSettle['buff']['npAtkUp'] = data['npAtkUp'];
            svtBaseSettle['buff']['npUp'] = data['npRateUp'];
            svtBaseSettle['buff']['criStarRateUp'] = data['criStarRateUp'];
            svtBaseSettle['buff']['criAtkUp'] = data['criAtkUp'];
            svtBaseSettle['buff']['colorUp']['A'] = data['artsUp'];
            svtBaseSettle['buff']['colorUp']['B'] = data['busterUp'];
            svtBaseSettle['buff']['colorUp']['Q'] = data['quickUp'];
            svtBaseSettle['emy']['attri'] = data['emy_attri'];
            svtBaseSettle['emy']['class'] = data['emy_class'];
            svtBaseSettle['emy']['buff']['defUp'] = data['emy_defUp'];
            svtBaseSettle['emy']['buff']['colorDefUp']['A'] = data['emy_artsUp'];
            svtBaseSettle['emy']['buff']['colorDefUp']['B'] = data['emy_busterUp'];
            svtBaseSettle['emy']['buff']['colorDefUp']['Q'] = data['emy_quickUp'];

        }

        let tbodyArr = getTbody();
        let tbody = document.querySelectorAll("table#svtDataTable>tbody")[0];
        tbody.innerHTML = tbodyArr.join('');
        $("table#svtDataTable").trigger("update");

        function getTbody() {
            let data = new Array();
            for (i in mstSvtCnoToId) {
                //let arr = [12];for (key in arr) {let i = arr[key];
                let cno = i;
                svtBaseSettle['cno'] = cno;
                let mySvt = getSvt(cno);

                
                //log(mySvt);
                if (mySvt == undefined) continue;
                let mySvtClass = numToClass[mySvt.classId];
                let mySvtData = getSvtFightData(svtBaseSettle);
                //log(mySvtData);
                //let src = getSvtFace(cno);
                //let img = '<input src=' + src + ' type=image style="height:20px"></input>';
                data.push('<tr>');
                data.push('<td onclick=hiddenMe(this)>' + cno + '</td>');
                //data.push('<td>' + img + '</td>');                
                data.push('<td>' + mySvt.battleName_cn + '</td>');
                data.push('<td id="show_class_' + mySvt.classId + '">' + mySvtClass + '</td>');
                data.push('<td id="show_rare_' + mySvt.combineMaterialId + '">' + mySvt.combineMaterialId + '</td>');
                
                let svtCardIdsArr = new Array();
                let svtCardIdsJson = {1:0,2:0,3:0};
                for(key in mySvt.cardIds){
                    let value = mySvt.cardIds[key];
                    svtCardIdsArr.push(numToColor[value]);
                    svtCardIdsJson[value]++;
                }
                data.push('<td id="cmdCard_'+svtCardIdsJson[1]+'A_'+svtCardIdsJson[2]+'B_'+svtCardIdsJson[3]+'Q">');   
                data.push('<div id="test">'+svtCardIdsArr+'</div>');   
                data.push('</td>');  
                
                data.push('<td id="svtAtk">' + mySvtData.svtAtk + '</td>');
                data.push('<td id="npDmgRate">' + mySvtData.npDmgRate * 100 + '%</td>');
                let isAll = (mySvtData.isAll) ? '全體' : '單體';
                data.push('<td id=show_isAll_' + mySvtData.isAll + '>' + isAll + '</td>');
                data.push('<td id=show_cmdColor_' + mySvtData.cmdColor + '>' + mySvtData.cmdColor + '</td>');
                data.push('<td id="dmg">' + mySvtData.dmg + '</td>');
                let mydmg = (mySvtClass !== 'Berserker') ? mySvtData.dmg * 2 : mySvtData.dmg;
                data.push('<td id="dmg_berserker">' + mySvtData.dmg_berserker + '</td>');
                data.push('<td id="star">' + mySvtData.npRate + '</td>');
                data.push('<td id="star">' + mySvtData.npHit + '</td>');
                data.push('<td id="np">' + mySvtData.np + '</td>');
                data.push('<td id="star">' + mySvtData.star + '</td>');
                data.push('<td id="npName">' + mySvtData.npName + '</td>');
                data.push('</tr>');                
            }
            return data;
        }
    }

    function createNobleThead() {
        let theadArr = getThead();
        let thead = document.querySelectorAll("table#svtDataTable>thead")[0];
        thead.innerHTML = theadArr.join('');

        function getThead() {
            let data = new Array();
            data.push('<tr>');
            data.push('<th>No.</th>');
            //data.push('<th>icon</th>');
            data.push('<th width=30px>Servant</th>');
            data.push('<th>職階</th>');
            data.push('<th>★</th>');
            data.push('<th>指令卡</th>');
            data.push('<th>ATK</th>');
            data.push('<th>倍率</th>');
            data.push('<th>範圍</th>');
            data.push('<th>類型</th>');
            data.push('<th>傷害</th>');
            data.push('<th>Berserker</th>');
            data.push('<th>NP%</th>');
            data.push('<th>NPH</th>');
            data.push('<th>NP</th>');
            data.push('<th>星星</th>');
            data.push('<th>真名</th>');

            //data.push('<th  style=display:none id=' + key2 + '>' + key2 + '</th>');                        
            data.push('</tr>');

            return data;
        }
    }

    function createNobleAttriSelector() {
        let fieldset = document.querySelectorAll("fieldset#selector")[0];
        fieldset.innerHTML += getSvtBaseAttri().join('');
        fieldset.innerHTML += getSvtBuff().join('');
        fieldset.innerHTML += getEmyAttri().join('');
        fieldset.innerHTML += '<input type="button" id="on_click" value="開始計算" onclick="updateNobleSvtData(this);">';

        function getSvtBaseAttri() {
            let data = new Array();
            data.push('<fieldset class="box">');
            data.push('<legend onclick="selectAll(this);">基本屬性</legend>');
            data.push('<table><tbody><tr>');
            data.push('<td><label for="svtLv">從者等級</label></td>');
            data.push('<td><select id="svtLv">');
            data.push('<option value="0">預設</option>');
            data.push('<option value="80">80</option>');
            data.push('<option value="90">90</option>');
            data.push('<option value="100">100</option></select></td>');
            
            data.push('<td><label for="emy_attri">敵方分類</label></td>');
            data.push('<td><select id="emy_attri">');
            data.push('<option value="0">預設</option>');
            data.push('<option value="Human">人</option>');
            data.push('<option value="God">天</option>');
            data.push('<option value="Earth">地</option>');
            data.push('<option value="Star">星</option>');
            data.push('<option value="Beast">獸</option></select></td>');
            
            data.push('<td><label for="emy_class">敵方職階</label></td>');
            data.push('<td><select id="emy_class">');
            data.push('<option value="Unknown">預設</option>');
            data.push('<option value="Berserker">剋制</option>');
            data.push('</tr><tr>');
            
            data.push('<td><label for="fufuAtk">芙芙攻擊</label></td>');
            data.push('<td><select id="fufuAtk">');
            data.push('<option value="0">0</option>');
            data.push('<option value="500">500</option>');
            data.push('<option value="1000">1000</option>');
            data.push('<option value="1500">1500</option>');
            data.push('<option value="2000">2000</option></select></td>');
            
            data.push('<td><label for="npLv">寶具等級</label></td>');
            data.push('<td><select id="npLv">');
            data.push('<option value="1">1</option>');
            data.push('<option value="2">2</option>');
            data.push('<option value="3">3</option>');
            data.push('<option value="4">4</option>');
            data.push('<option value="5">5</option></select></td>');
            
            data.push('<td><input type="checkbox" id="isOverkill" /><label for="isOverkill">過量擊殺</label></td>');
            data.push('<td><input type="checkbox" id="isCri" /><label for="isCri">強制暴擊</label></td>');
            data.push('</tr><tr>');
            
            data.push('<td><label for="equipAtk">禮裝攻擊</label></td>');
            data.push('<td><select id="equipAtk">');
            data.push('<option value="0">0</option>');
            data.push('<option value="500">500</option>');
            data.push('<option value="1000">1000</option>');
            data.push('<option value="1500">1500</option>');
            data.push('<option value="2000">2000</option>');
            data.push('<option value="2400">2400</option></select></td>');
            
            data.push('<td><label for="ocLv">ＯＣ等級</label></td>');
            data.push('<td><select id="ocLv">');
            data.push('<option value="1">1</option>');
            data.push('<option value="2">2</option>');
            data.push('<option value="3">3</option>');
            data.push('<option value="4">4</option>');
            data.push('<option value="5">5</option></select></td>');
            
            data.push('<td><input type="checkbox" id="isUseSkill" /><label for="isUseSkill">使用技能</label></td>');
            data.push('<td><input type="checkbox" id="isEnforceSp" /><label for="isEnforceSp">強制特攻</label></td>');
            
            data.push('</tr></tbody></table>');
            data.push('</fieldset>');
            return data;
        }


        function getSvtBuff() {
            let data = new Array();
            data.push('<fieldset class="box">');
            data.push('<legend onclick="selectAll(this);">從者增益</legend>');
            data.push('<table><tbody><tr>');

            data.push('<td><label for="atkUp">攻擊上升</label></td><td><div class="input_text"><input type="text" id="atkUp" />%</div></td>');
            data.push('<td><label for="fixAtkUp">傷害加成</label></td><td><div class="input_text"><input type="text" id="fixAtkUp" /></div></td>');
            data.push('<td><label for="criAtkUp">暴擊傷害</label></td><td><div class="input_text"><input type="text" id="criAtkUp" />%</div></td>');
            data.push('</tr><tr>');
            data.push('<td><label for="artsUp">Arts性能</label></td><td><div class="input_text"><input type="text" id="artsUp" />%</div></td>');
            data.push('<td><label for="busterUp">Buster性能</label></td><td><div class="input_text"><input type="text" id="busterUp" />%</div></td>');
            data.push('<td><label for="quickUp">Quick性能</label></td><td><div class="input_text"><input type="text" id="quickUp" />%</div></td>');
            data.push('</tr><tr>');
            data.push('<td><label for="criStarRateUp">星星發生率</label></td><td><div class="input_text"><input type="text" id="criStarRateUp" />%</div></td>');
            data.push('<td><label for="npRateUp">NP恢復量</label></td><td><div class="input_text"><input type="text" id="npRateUp" />%</div></td>');
            data.push('<td><label for="npAtkUp">寶具傷害</label></td><td><div class="input_text"><input type="text" id="npAtkUp" />%</div></td>');

            data.push('</tr></tbody></table>');
            data.push('</fieldset>');


            return data;
        }

        function getEmyAttri() {
            let data = new Array();
            data.push('<fieldset class="box">');
            data.push('<legend onclick="selectAll(this);">敵方減益</legend>');
            data.push('<table><tbody><tr>');
            data.push('<td><label for="emy_defUp">防禦上升</label></td><td><div class="input_text"><input type="text" id="emy_defUp" />%</div></td>');
            data.push('<td><label for="emy_artsUp">Arts耐性</label></td><td><div class="input_text"><input type="text" id="emy_artsUp" />%</div></td>');
            data.push('</tr><tr>');
            data.push('<td><label for="emy_busterUp">Buster耐性</label></td><td><div class="input_text"><input type="text" id="emy_busterUp" />%</div></td>');
            data.push('<td><label for="emy_quickUp">Quick耐性</label></td><td><div class="input_text"><input type="text" id="emy_quickUp" />%</div></td>');
            data.push('</tr></tbody></table>');
            data.push('</fieldset>');
            return data;
        }
    }

    function createNobleSvtSelector() {
        let fieldset = document.querySelectorAll("fieldset#filter")[0];
        fieldset.innerHTML += getFieldsetNp().join('');
        fieldset.innerHTML += getFieldsetRare().join('');
        fieldset.innerHTML += getFieldsetClass().join('');
        fieldset.innerHTML += getFieldsetCmd().join('');
        fieldset.innerHTML += '<input type="button" value="開始篩選" onclick="updateNobleTable();">';
        

        function getFieldsetNp() {
            let data = new Array();
            data.push('<fieldset class="box">');
            data.push('<legend onclick="selectAll(this);">寶具篩選</legend>');
            data.push('<table><tbody><tr>');
            data.push('<td><input type="checkbox" id="show_cmdColor_A" /><label for="show_cmdColor_A">Arts</label></td>');
            data.push('<td><input type="checkbox" id="show_cmdColor_B" /><label for="show_cmdColor_B">Buster</label></td>');
            data.push('<td><input type="checkbox" id="show_cmdColor_Q" /><label for="show_cmdColor_Q">Quick</label></td>');
            data.push('<td><input type="checkbox" id="show_isAll_0" /><label for="show_isAll_0">單體</label></td>');
            data.push('<td><input type="checkbox" id="show_isAll_1" /><label for="show_isAll_1">全體</label></td>');
            data.push('</tr></tbody></table>');
            data.push('</fieldset>');
            return data;
        }

        function getFieldsetRare() {
            let data = new Array();
            data.push('<fieldset class="box">');
            data.push('<legend onclick="selectAll(this);">稀有度</legend>');
            data.push('<table><tbody><tr>');
            data.push('<td><input type="checkbox" id="show_rare_5" /><label for="show_rare_5">★5</label></td>');
            data.push('<td><input type="checkbox" id="show_rare_4" /><label for="show_rare_4">★4</label></td>');
            data.push('<td><input type="checkbox" id="show_rare_3" /><label for="show_rare_3">★3</label></td>');
            data.push('<td><input type="checkbox" id="show_rare_2" /><label for="show_rare_2">★2</label></td>');
            data.push('<td><input type="checkbox" id="show_rare_1" /><label for="show_rare_1">★1</label></td>');
            data.push('<td><input type="checkbox" id="show_rare_0" /><label for="show_rare_0">★0</label></td>');
            data.push('</tr></tbody></table>');
            data.push('</fieldset>');
            return data;
        }

        function getFieldsetClass() {
            let data = new Array();
            let mySvtClass = numToClass;
            data.push('<fieldset  class="box">');
            data.push('<legend onclick="selectAll(this);">職階</legend>');
            data.push('<table>');
            data.push('<tbody>');
            data.push('<tr>');
            for (key in numToClass) {
                if (key % 5 == 1) data.push('</tr><tr>');
                let value = numToClass[key];
                data.push('<td><input type="checkbox" id=show_class_' + key + '  />');
                data.push('<label for=show_class_' + key + '>' + value + '</label></td>');
            }
            data.push('</tr>');
            data.push('</tbody>');
            data.push('</table>');
            data.push('</fieldset>');
            return data;
        }
        
        function getFieldsetCmd() {
            cmdCardCount = {'A':1,'B':1,'Q':1,'len':3};
            let data = new Array();
            data.push('<td>');
            data.push('<img id =cmdCard style="opacity:0.15" onclick="hideCmdColor(this,\'Q\');" src=' + icon_cmdCard[getCardKey(3)] + '  /></img>');
            data.push('<img id =cmdCard style="opacity:0.15" onclick="hideCmdColor(this,\'B\');" src=' + icon_cmdCard[getCardKey(2)] + '  /></img>');
            data.push('<img id =cmdCard style="opacity:0.15" onclick="hideCmdColor(this,\'A\');" src=' + icon_cmdCard[getCardKey(1)] + '  /></img>');            
            data.push('</td>');
            return data;
        }

    }

    function updateNobleTable() {
        let input = document.querySelectorAll("fieldset#filter>fieldset>table>tbody>tr>td>input");
        let ckb = {};
        for (key in input) {
            let id = input[key].id;
            if (id == undefined) break;
            ckb[input[key].id] = input[key].checked;
        }
        let tbody = document.querySelectorAll("table#svtDataTable>tbody>tr");
        function f() {
            let isOdd = false;
            for (tkey in tbody) {
                if (typeof(tbody[tkey]) !== "object") break;
                let td = tbody[tkey].querySelectorAll("td");
                for (key in td) {
                    let id = td[key].id;
                    if (id == undefined || id == '') continue;
                    if (id.indexOf('cmdCard')!==-1){
                        let cmd = cmdCardCount;
                        let A = id.substring(8,9);
                        let B = id.substring(11,12);
                        let Q = id.substring(14,15);
                        if(cmd['A'] > A  || cmd['B'] > B || cmd['Q'] > Q){
                            td[key].parentNode.style.display = 'none';
                            break;
                        }
                        continue;
                    }
                    if (ckb[id]) {
                        if (id.indexOf('show') !== -1) {
                            td[key].parentNode.style.display = '';
                            continue;
                        }
                        //td[key].style.display = '';
                    } else {
                        if (id.indexOf('show') !== -1) {
                            td[key].parentNode.style.display = 'none';
                            break;
                        }
                        //td[key].style.display = 'none';
                    }
                }
                if (tbody[tkey].style.display !== 'none') tbody[tkey].className = (isOdd = !isOdd) ? 'odd' : 'even';
            }
        }
        showTime(f);
    }

