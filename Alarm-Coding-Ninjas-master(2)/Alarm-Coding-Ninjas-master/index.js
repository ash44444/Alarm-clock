// variables of alarm
var selectValues=document.querySelectorAll('#alarm-values select');
var form=document.getElementById('alarm-values');
var list=document.getElementById('list');
var delButton=document.getElementById('list input');

// setting option values in form
function setValues(){
   
    for(let i=0;i<=12;i++){
        let option=`<option value=${i}> ${i} </option>`;
        selectValues[0].firstElementChild.insertAdjacentHTML("afterend",option);
    }
    
    for(let i=0;i<=59;i++){
        i=i<10?"0"+i:i;
        let option=`<option value=${i}> ${i} </option>`;
        selectValues[1].firstElementChild.insertAdjacentHTML("afterend",option);
    }
    
    for(let i=0;i<=59;i++){
        i=i<10?"0"+i:i;
        let option=`<option value=${i}> ${i} </option>`;
        selectValues[2].firstElementChild.insertAdjacentHTML("afterend",option);
    }

    for(let i=0;i<=1;i++){
        let ampm=i==0?"PM":"AM";
        let option=`<option value=${ampm}> ${ampm} </option>`;
        selectValues[3].firstElementChild.insertAdjacentHTML("afterend",option);
    }
}
setValues();

// conatins list of alarm
var alarm_list=[];

document.getElementById('set-alarm-button').addEventListener('click',function(e){
    // fetching option values fr which alarm is to be set
    var Hour=selectValues[0].value;
    var Min=selectValues[1].value;
    var Sec=selectValues[2].value;
    var AmPm=selectValues[3].value;
    // this is alarm time
    var alarmTime=`${Hour}:${Min}:${Sec} ${AmPm}`;
    if(alarmTime.includes("Hour")|| alarmTime.includes("Min")|| alarmTime.includes("Sec")||alarmTime.includes("AM/PM")){
        window.alert("Invalid Values");
        return;
    }
    // pushing alarm to alarmlist
    alarm_list.push(alarmTime);
    render();
    form.reset();
});

function render(){
    // rendering alarmlist
    document.getElementById('list').innerHTML='';
    for(let i=0;i<alarm_list.length;i++){
        addToDOM(alarm_list[i],i);
    }
}

function addToDOM(element,i){
    // displaying alarmlist values
    let x=document.createElement('li');
    x.innerHTML=` <span>${element} </span>
    <input type="button" value="Delete" id=${i} onClick="Delete(${i})">
    `;
    list.append(x);
}


// element for current-time
let span=document.getElementById('ctime');

function ctime(){
    let currentTime=new Date();
    currentTime=currentTime.toLocaleTimeString('en-US');
    span.innerHTML=currentTime;
    for(let i=0;i<alarm_list.length;i++){
       if(alarm_list[i]===currentTime){
        window.alert("Wake Up!");
        Delete(i);
        render();
       }
    } 
}

//delete funtion
function Delete(id){
    console.log(id);
    alarm_list.splice(0,1);
    render();
}
// interval setting
setInterval(ctime,1000);

