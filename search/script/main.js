import SEARCH_DATASET from "./hw2_search_dataset.js";
let temp = Array.from(SEARCH_DATASET);
var num = document.querySelector('.num');
//提供資料數量
function count(){
    var ans = SEARCH_DATASET.length;
    var long='';
    long += `<p style="font-size:20px">共找到${SEARCH_DATASET.length}筆資料</p>`;
    num.innerHTML=long;
}
count();

//展示列表
var list = document.querySelector('.list');
function showList(datalist){
    var str ="";
    for(var i=0;i<datalist.length;i++){
        str+=`<div class="data">
            <p data-url="${i}" style='word-wrap:break-word'>${datalist[i].url}</p>
            <a href="${datalist[i].url}" data-title="${i}" class="link">${datalist[i].title}</a>
            <p data-text="${i}" style='word-wrap:break-word' >${datalist[i].text}</p>
            <p data-time="${i}" style="margin-bottom:0px" class="detail">${datalist[i].created_at}</p>
            <p data-popular="${i}" style="margin-top:0px;" class="detail">人氣:${datalist[i].popularity}</p>
        </div>`
        if((i+1)%10==0){
            str+=`<button type='button'>顯示更多</button>`
        }
    }
    list.innerHTML=str;
}
showList(SEARCH_DATASET);

//搜尋鍵
var btn = document.querySelector('.button');
btn.addEventListener('click', function (e) {
    var word = document.getElementById('search').value;
    screen(word);
}, false);

function screen(target){
    let temp = Array.from(SEARCH_DATASET);
    console.log(temp[0].url_path.length)
    var l = target.length;
    for(var i=0;i<temp.length;i++){
        if(temp[i].url_path.length<l){
            delete temp[i];
            i-=1;
            continue;
        }
        for(var j=0;j<temp[i].url_path.length-l;j++){
            var bool = true;
            for(var k=0;k<l;k++){
                if(target[k]!=temp[i].url_path[j+k])bool=false;
            }
            if(bool)break;
        }
        if(!bool){
            delete temp[i];
            i-=1
        }
    }
    showList(temp);
}

//篩選器
var myselect=document.querySelector("#select");
myselect.addEventListener("change", datasort);
function datasort(){
    const switchValue = myselect.options[myselect.selectedIndex].value;
    if(switchValue==1){
        showList(SEARCH_DATASET);
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
        for(var i=0;i<SEARCH_DATASET.length-1;i++){
            for(var j=0;j<SEARCH_DATASET.length-1;j++){
                var time1 = Number(temp[j].created_at[0])*1000   + Number(temp[j].created_at[1])*100   + Number(temp[j].created_at[2])*10   +Number(temp[j].created_at[3]);
                var time2 = Number(temp[j+1].created_at[0])*1000 + Number(temp[j+1].created_at[1])*100 + Number(temp[j+1].created_at[2])*10 +Number(temp[j+1].created_at[3]);
                console.log(time1);
                console.log(time2);
                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                if(time1>=time2){
                    if(time1==time2){
                        var m1 = Number(temp[j  ].created_at[5])*10+Number(temp[j  ].created_at[6]);
                        var m2 = Number(temp[j+1].created_at[5])*10+Number(temp[j+1].created_at[6]);
                        if(m1<=m2){
                            if(m1==m2){
                                var d1 = Number(temp[j  ].created_at[8])*10+Number(temp[j  ].created_at[9]);
                                var d2 = Number(temp[j+1].created_at[8])*10+Number(temp[j+1].created_at[9]);
                                if(d1<=d2){
                                    if(d1==d2){
                                        var h1= Number(temp[j  ].created_at[11])*10+Number(temp[j  ].created_at[12]);
                                        var h2= Number(temp[j+1].created_at[11])*10+Number(temp[j+1].created_at[12]);
                                        if(h1<=h2){
                                            if(h1==h2){
                                                var s1= Number(temp[j  ].created_at[14])*10+Number(temp[j  ].created_at[15]);
                                                var s2= Number(temp[j+1].created_at[14])*10+Number(temp[j+1].created_at[15]);
                                                if(s1<s2){
                                                    [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                                }
                                            }
                                            else{
                                                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                            }
                                        }
                                    }
                                    else{
                                        [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                    }
                                }
                            }
                            else{
                                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                            }
                        }
                    }
                    else{
                        [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                    }
                }
            }
        }
        showList(temp);
    }
    else if(switchValue==5){
        for(var i=0;i<SEARCH_DATASET.length-1;i++){
            for(var j=0;j<SEARCH_DATASET.length-1;j++){
                var time1 = Number(temp[j].created_at[0])*1000   + Number(temp[j].created_at[1])*100   + Number(temp[j].created_at[2])*10   +Number(temp[j].created_at[3]);
                var time2 = Number(temp[j+1].created_at[0])*1000 + Number(temp[j+1].created_at[1])*100 + Number(temp[j+1].created_at[2])*10 +Number(temp[j+1].created_at[3]);
                console.log(time1);
                console.log(time2);
                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                if(time1<=time2){
                    if(time1==time2){
                        var m1 = Number(temp[j  ].created_at[5])*10+Number(temp[j  ].created_at[6]);
                        var m2 = Number(temp[j+1].created_at[5])*10+Number(temp[j+1].created_at[6]);
                        if(m1>=m2){
                            if(m1==m2){
                                var d1 = Number(temp[j  ].created_at[8])*10+Number(temp[j  ].created_at[9]);
                                var d2 = Number(temp[j+1].created_at[8])*10+Number(temp[j+1].created_at[9]);
                                if(d1>=d2){
                                    if(d1==d2){
                                        var h1= Number(temp[j  ].created_at[11])*10+Number(temp[j  ].created_at[12]);
                                        var h2= Number(temp[j+1].created_at[11])*10+Number(temp[j+1].created_at[12]);
                                        if(h1>=h2){
                                            if(h1==h2){
                                                var s1= Number(temp[j  ].created_at[14])*10+Number(temp[j  ].created_at[15]);
                                                var s2= Number(temp[j+1].created_at[14])*10+Number(temp[j+1].created_at[15]);
                                                if(s1>s2){
                                                    [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                                }
                                            }
                                            else{
                                                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                            }
                                        }
                                    }
                                    else{
                                        [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                                    }
                                }
                            }
                            else{
                                [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                            }
                        }
                    }
                    else{
                        [temp[j],temp[j+1]]=[temp[j+1],temp[j]];
                    }
                }
            }
        }
        showList(temp);
    }
}

