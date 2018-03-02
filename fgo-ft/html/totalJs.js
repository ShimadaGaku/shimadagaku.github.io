getAllJs();
function getAllJs(){
    let html = document.querySelectorAll("html")[0];
    let arr = [//"js/jquery.min.js",
    "js/jquery.tablesorter.js",
    "data/commonFunction.js",
    "data/htmlCommonFunction.js",
    "data/mstClassRelation.js",
    "data/mstSvtTypeRelation.js",
    "data/mstSvtFightCompute.js",
    "data/mstSvtBaseData.js",
    "data/mstSvtCnoToId.js",
    "data/mstSvtSkillDetail.js",
    "data/mstSvtSkillKeyWord.js",
    "data/mstSvtLvAtk.js",
    "img/icon_cmdCard.js",
    "data/getTableData.js",
    "html/svtNobelTable.js",
    "html/svtCommonTable.js",
    "html/thanks.js"
    ];    

    let js;
    for(key in arr){
        let value = arr[key];
        js = document.createElement('script');
        js.src=value;    
        html.appendChild(js);
    }

}

