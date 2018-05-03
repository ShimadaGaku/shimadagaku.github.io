
    setThanksTable();
    function setThanksTable(){
    createArticle();
    function createArticle(){    
        let data = new Array();
        
        data.push('<div  id="myLog"><textarea class="update-log" rows="5" readonly="">');
        let myStr = '';
        myStr += '2018-03-23\n';
        myStr += '    -修正EX指令卡傷害\n';
        myStr += '2018-03-06\n';
        myStr += '    -更新第八次從者強化內容\n';
        myStr += '    -修正技能施放效果\n';
        myStr += '2018-03-04\n';
        myStr += '    -修正寶具傷害公式\n';
        myStr += '2018-03-01\n';
        myStr += '    -技能強化活動後統一更新\n';
        data.push(myStr);
        data.push('</textarea></div>');
        data.push('<article id="thanksFor">');
        data.push('<div class="thanksFor-Screen">');
        data.push('<div id="thanksFor">資料來源與校正參考</div>');
        data.push('<table id="thanksFor">');
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://kazemai.github.io/fgo-vz/">茹西教王的理想鄉</a></td><tr>');
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://forum.gamer.com.tw/Co.php?bsn=26742&sn=60428">巴哈姆特 - 千秋</a></td><tr>');
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://www.ptt.cc/bbs/TypeMoon/M.1496049118.A.20F.html">PTT - mrbigmouth (大嘴先生)</a></td><tr>');                    
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://bbs.ngacn.cc/read.php?tid=11783224">NGA - xianlechuanshuo</a></td><tr>');                                                          
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="http://fgowiki.com/">陸版 FGO wiki</a></td><tr>');
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://appmedia.jp/fategrandorder">AppMedia</a></td><tr>');
        data.push('<tr><td><a class="thanksFor-content" target="_blank" href="https://www9.atwiki.jp/f_go/">日版 FGO wiki</a></td><tr>');
        data.push('<tr><td><a href="https://rs.fharr.com/" target="_blank"><img src="https://rs.fharr.com/img/" alt="幻想廳 - 仙境傳說(RO) 技能模擬器"/></a></td><tr>');          
        data.push('</table>');
        data.push('</div>');
        data.push('</article>');
        let myAtiDiv = document.querySelectorAll("div#myArticle")[0];
        myAtiDiv.innerHTML= data.join('');
    }
    }
    