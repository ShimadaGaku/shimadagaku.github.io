   function selectAll(obj) {
       let input = obj.parentNode.querySelectorAll("input");
       obj.select = input[0].checked;
       obj.select = !obj.select;
       for (key in input) {
           input[key].checked = obj.select;
           if (!obj.select && input[key].type == 'text') input[key].value = 0;
       }
   }

   function top_selectAll(obj) {
       let input = obj.parentNode.parentNode.querySelectorAll("input");
       obj.select = input[0].checked;
       obj.select = !obj.select;
       for (key in input) {
           input[key].checked = obj.select;
       }
   }

   function top_hideAll(obj) {
       let fieldset = obj.parentNode.parentNode.querySelectorAll("fieldset");
       let button = obj.parentNode.parentNode.querySelectorAll("input[type=button]")[0];
       let img = obj.parentNode.parentNode.querySelectorAll("img");
       obj.select = !obj.select;
       if (obj.select) {
           if (button !== undefined) button.style.display = 'none';
           obj.innerText = '＋';
       } else {
           if (button !== undefined) button.style.display = '';
           obj.innerText = '－';
       }
       for (key in fieldset) {
           if (fieldset[key].style == undefined) continue;
           fieldset[key].style.display = (obj.select) ? 'none' : '';
       }
       for (key in img) {
           if (img[key].style == undefined) continue;
           img[key].style.display = (obj.select) ? 'none' : '';
       }
   }

   function updateSvtData() {
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
           resetTbody(mySvtData);
           updateTable();
       };
       showTime(f);
   }

   function hiddenMe(me) {
       me.parentNode.style.display = 'none';

   }


   let cmdCardCount = {
       'A': 1,
       'B': 1,
       'Q': 1,
       'len': 3
   };

   function hideCmdColor(obj, cmdColor) {
       if (cmdCardCount['len'] < 5 && cmdCardCount[cmdColor] < 3) {
           obj.style.opacity = (cmdCardCount[cmdColor] == 1) ? 0.7 : 1;
           cmdCardCount['len']++;
           cmdCardCount[cmdColor]++;
           return;
       }
       if (cmdCardCount['len'] == 5 && cmdCardCount[cmdColor] > 1) {
           cmdCardCount['len'] = 6 - cmdCardCount[cmdColor];
           cmdCardCount[cmdColor] = 1;
           obj.style.opacity = 0.15;
       }
   }