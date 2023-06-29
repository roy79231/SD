import SEARCH_DATASET from "./hw2_search_dataset.js";
let temp = Array.from(SEARCH_DATASET);

document.addEventListener('DOMContentLoaded', function () {
    var allwhite=0;
    for(var i=0;i<SEARCH_DATASET.length;i++){
        if(temp[i].title === "")allwhite+=1;
    }
    //提供資料數量
    var num = document.querySelector('.num');
    function count() {
        var long = '';
        long += `<p style="font-size:20px">共找到${temp.length-allwhite}筆資料</p>`;
        num.innerHTML = long;
    }
    count();

    //展示列表
    var list = document.querySelector('.list');
    var visibleResults = 10;
    var resultsPerPage = 10;
    var white = 0;
    function showList(datalist) {
        var str = "";
        white = 0;
        for (var i = 0; i < datalist.length; i++) {
            if (datalist[i].title === "") {
                white += 1;
                continue;
            }
            else if (i < visibleResults + white) {
                str += `<div class="data">
                    <p data-url="${i}" style='word-wrap:break-word'>${datalist[i].url}</p>
                    <a href="${datalist[i].url}" data-title="${i}" class="link" style='word-wrap:break-word'>${datalist[i].title}</a>
                    <p data-text="${i}" style='word-wrap:break-word' >${datalist[i].text}</p>
                    <p data-time="${i}" style="margin-bottom:0px" class="detail">${datalist[i].created_at}</p>
                    <p data-popular="${i}" style="margin-top:0px;" class="detail">人氣:${datalist[i].popularity}</p>
                </div>`
            }
            else {
                str += `<div class="data" style='display:none;'>
                <p data-url="${i}" style='word-wrap:break-word'>${datalist[i].url}</p>
                <a href="${datalist[i].url}" data-title="${i}" class="link">${datalist[i].title}</a>
                <p data-text="${i}" style='word-wrap:break-word' >${datalist[i].text}</p>
                <p data-time="${i}" style="margin-bottom:0px" class="detail">${datalist[i].created_at}</p>
                <p data-popular="${i}" style="margin-top:0px;" class="detail">人氣:${datalist[i].popularity}</p>
            </div>`
            }
        }
        list.innerHTML = str;
    }
    var btn = document.getElementById('show-more-btn');
    btn.addEventListener('click', function () {
        visibleResults += resultsPerPage;
        showList(temp);
        if (visibleResults >= temp.length) {
            btn.style.display = 'none';
        }
    });
    showList(temp);


    //篩選器
    var myselect = document.querySelector("#select");
    myselect.addEventListener("change", datasort);
    function datasort() {
        const switchValue = myselect.options[myselect.selectedIndex].value;
        if (switchValue == 0) {
            visibleResults = 10;
            temp = Array.from(SEARCH_DATASET);
            showList(temp);
            btn.style.display='block';
        }
        else if (switchValue == 1) {
            visibleResults = 10;
            temp = Array.from(SEARCH_DATASET);
            temp.sort((a, b) => {
                return a.title.localeCompare(b.title, "zh-Hant" );
            });
            showList(temp);
            btn.style.display='block';
        }
        else if (switchValue == 2) {
            visibleResults = 10;
            for (var i = 0; i < SEARCH_DATASET.length - 1; i++) {
                for (var j = 0; j < SEARCH_DATASET.length - 1; j++) {
                    if (temp[j].popularity < temp[j + 1].popularity) {
                        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                    }
                }
            }
            showList(temp);
            btn.style.display='block';
        }
        else if (switchValue == 3) {
            visibleResults = 10;
            for (var i = 0; i < SEARCH_DATASET.length - 1; i++) {
                for (var j = 0; j < SEARCH_DATASET.length - 1; j++) {
                    if (temp[j].popularity > temp[j + 1].popularity) {
                        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                    }
                }
            }
            showList(temp);
            btn.style.display='block';
        }
        else if (switchValue == 4) {
            visibleResults = 10;
            for (var i = 0; i < SEARCH_DATASET.length - 1; i++) {
                for (var j = 0; j < SEARCH_DATASET.length - 1; j++) {
                    var time1 = Number(temp[j].created_at[0]) * 1000 + Number(temp[j].created_at[1]) * 100 + Number(temp[j].created_at[2]) * 10 + Number(temp[j].created_at[3]);
                    var time2 = Number(temp[j + 1].created_at[0]) * 1000 + Number(temp[j + 1].created_at[1]) * 100 + Number(temp[j + 1].created_at[2]) * 10 + Number(temp[j + 1].created_at[3]);
                    if (time1 <= time2) {
                        if (time1 == time2) {
                            var m1 = Number(temp[j].created_at[5]) * 10 + Number(temp[j].created_at[6]);
                            var m2 = Number(temp[j + 1].created_at[5]) * 10 + Number(temp[j + 1].created_at[6]);
                            if (m1 <= m2) {
                                if (m1 == m2) {
                                    var d1 = Number(temp[j].created_at[8]) * 10 + Number(temp[j].created_at[9]);
                                    var d2 = Number(temp[j + 1].created_at[8]) * 10 + Number(temp[j + 1].created_at[9]);
                                    if (d1 <= d2) {
                                        if (d1 == d2) {
                                            var h1 = Number(temp[j].created_at[11]) * 10 + Number(temp[j].created_at[12]);
                                            var h2 = Number(temp[j + 1].created_at[11]) * 10 + Number(temp[j + 1].created_at[12]);
                                            if (h1 <= h2) {
                                                if (h1 == h2) {
                                                    var s1 = Number(temp[j].created_at[14]) * 10 + Number(temp[j].created_at[15]);
                                                    var s2 = Number(temp[j + 1].created_at[14]) * 10 + Number(temp[j + 1].created_at[15]);
                                                    if (s1 < s2) {
                                                        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                                    }
                                                }
                                                else {
                                                    [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                                }
                                            }
                                        }
                                        else {
                                            [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                        }
                                    }
                                }
                                else {
                                    [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                }
                            }
                        }
                        else {
                            [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                        }
                    }
                }
            }
            showList(temp);
            btn.style.display='block';
        }
        else if (switchValue == 5) {
            visibleResults = 10;
            for (var i = 0; i < SEARCH_DATASET.length - 1; i++) {
                for (var j = 0; j < SEARCH_DATASET.length - 1; j++) {
                    var time1 = Number(temp[j].created_at[0]) * 1000 + Number(temp[j].created_at[1]) * 100 + Number(temp[j].created_at[2]) * 10 + Number(temp[j].created_at[3]);
                    var time2 = Number(temp[j + 1].created_at[0]) * 1000 + Number(temp[j + 1].created_at[1]) * 100 + Number(temp[j + 1].created_at[2]) * 10 + Number(temp[j + 1].created_at[3]);
                    if (time1 >= time2) {
                        if (time1 == time2) {
                            var m1 = Number(temp[j].created_at[5]) * 10 + Number(temp[j].created_at[6]);
                            var m2 = Number(temp[j + 1].created_at[5]) * 10 + Number(temp[j + 1].created_at[6]);
                            if (m1 >= m2) {
                                if (m1 == m2) {
                                    var d1 = Number(temp[j].created_at[8]) * 10 + Number(temp[j].created_at[9]);
                                    var d2 = Number(temp[j + 1].created_at[8]) * 10 + Number(temp[j + 1].created_at[9]);
                                    if (d1 >= d2) {
                                        if (d1 == d2) {
                                            var h1 = Number(temp[j].created_at[11]) * 10 + Number(temp[j].created_at[12]);
                                            var h2 = Number(temp[j + 1].created_at[11]) * 10 + Number(temp[j + 1].created_at[12]);
                                            if (h1 >= h2) {
                                                if (h1 == h2) {
                                                    var s1 = Number(temp[j].created_at[14]) * 10 + Number(temp[j].created_at[15]);
                                                    var s2 = Number(temp[j + 1].created_at[14]) * 10 + Number(temp[j + 1].created_at[15]);
                                                    if (s1 > s2) {
                                                        [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                                    }
                                                }
                                                else {
                                                    [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                                }
                                            }
                                        }
                                        else {
                                            [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                        }
                                    }
                                }
                                else {
                                    [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                                }
                            }
                        }
                        else {
                            [temp[j], temp[j + 1]] = [temp[j + 1], temp[j]];
                        }
                    }
                }
            }
            showList(temp);
            btn.style.display='block';
        }
    }

});
