import SEARCH_DATASET from "./hw2_search_dataset.js";
const origin = SEARCH_DATASET;
const temp = SEARCH_DATASET;
var num = document.querySelector('.num');
function count(){
    var ans = SEARCH_DATASET.length;
    var long='';
    long += `<p style="font-size:20px">共找到${SEARCH_DATASET.length}筆資料</p>`;
    num.innerHTML=long;
}
count();
var list = document.querySelector('.list');
function showList(datalist){
    var str ="";
    for(var i=0;i<datalist.length;i++){
        str+=`<div class="data">
            <p data-url="${i}">${datalist[i].url}</p>
            <a href="${datalist[i].url}" data-title="${i}" class="link">${datalist[i].title}</a>
            <p data-text="${i}">${datalist[i].text}</p>
            <p data-time="${i}" style="margin-bottom:0px" class="detail">${datalist[i].created_at}</p>
            <p data-popular="${i}" style="margin-top:0px;" class="detail">人氣:${datalist[i].popularity}</p>
        </div>`
    }
    list.innerHTML=str;
}
showList(SEARCH_DATASET);



var myselect=document.querySelector("#select");
myselect.addEventListener("change", datasort);

function datasort(){
    console.log("gogogogo")
    const switchValue = myselect.options[myselect.selectedIndex].value;
    if(switchValue==1){
        showList(origin);
        console.log("baby");
    }
    else if(switchValue==2){
        for(var i=0;i<SEARCH_DATASET.length-1;i++){
            for(var j=0;j<SEARCH_DATASET.length-1;j++){
                if(temp[j].popularity<temp[j+1].popularity){
                    [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                }
            }
        }
        showList(temp);
    }
    else if(switchValue==3){
        for(var i=0;i<SEARCH_DATASET.length-1;i++){
            for(var j=0;j<SEARCH_DATASET.length-1;j++){
                if(temp[j].popularity>temp[j+1].popularity){
                    [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                }
            }
        }
        showList(temp);
    }
    else if(switchValue==4){
    }
    else if(switchValue==5){
    }
}

