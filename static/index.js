

// =====================================المتغيرات ===================================================

var mainForm =document.getElementById('main-form')//الفورم كامل 
var numberbtn=document.getElementById('numberbtn')//عدد المدن المدخلة 
var graphview=document.getElementById('view')//مكان عرض النتائج 



//  ========graph=======================تعريف الجراف =====================
    class Graph{
        #nodes;
        constructor(){
            this.#nodes={}
        }
        addNode(node){
            this.#nodes[node]=[]
        }


       
        addEdges(node,edges){
            this.#nodes[node] = edges;
        }
        showNodes(){
          return this.#nodes
        }


    }
//  ======================الزر عند ادخال عدد المدن =====================================
numberbtn.onclick=function(event)
{
    event.preventDefault()

// ======== get nuber of cities ==============================================
if(document.getElementById('numberinpt').value<3){
    alert("please enter 3 or more ")
    return false
}
    var numberinpt = document.getElementById('numberinpt').value; //عدد المدن المدخلة 

    // =====creat a new form to get cities names  ====================

    mainForm.innerHTML=''
    var toplable=document.createElement('label')
    toplable.innerText='Please enter names of  cities you want'
    mainForm.appendChild(toplable)

    for(let i =0;i<numberinpt;i++)
    {
      var city_name=  document.createElement("input")
      city_name.setAttribute("type","text")
      city_name.setAttribute("class","city_name")
      city_name.setAttribute("placeholder","city name")
      city_name.setAttribute("id",`MainCity${i+1}`)
      mainForm.appendChild(city_name)
    }
var namecitybtn=document.createElement('button')
namecitybtn.innerText='SUBMIT'
namecitybtn.setAttribute("class","submit")
namecitybtn.setAttribute("id","namebtn")
namecitybtn.setAttribute("tybe","submit")
mainForm.appendChild(namecitybtn)




// ============save cities name and ask user where start and end  =======
namecitybtn.onclick=function(event){
    event.preventDefault()
    var citiesnamesarr=[]
    var mapgraph=new Graph
    for(let i=0;i<numberinpt;i++)
    { 
        if(document.getElementById(`MainCity${i+1}`).value==""){
            alert("please enter all cities Name ")
            return false
        }else{
        citiesnamesarr[i]=document.getElementById(`MainCity${i+1}`).value;
    }
    }
    console.log(citiesnamesarr)

    // ======star and end form ====
        mainForm.innerHTML=""
        var startdiv=document.createElement('div')
            var startlable=document.createElement('label')
            startlable.setAttribute("for","strtCityName")
            startlable.setAttribute("id","startLable")
            startlable.innerText='start city:  '
        var startcity=document.createElement('select')
        startcity.setAttribute("id","strtCityName")
        startcity.setAttribute("name","cities")
        for(let i=0;i<citiesnamesarr.length;i++){
            var optionx=document.createElement('option')
            optionx.setAttribute("value",`${citiesnamesarr[i]}`)
            optionx.innerText=`${citiesnamesarr[i]}`
            startcity.appendChild(optionx)
        }
        startdiv.appendChild(startlable)
        startdiv.appendChild(startcity)


        var enddiv=document.createElement('div')
            enddiv.setAttribute("class","end")

        var endlable=document.createElement('label')
        endlable.setAttribute("for","endCityName")
        endlable.setAttribute("id","endLable")
        endlable.innerText='end city:  '
        var endcity=document.createElement('select')
        endcity.setAttribute("id","endCityName")
        endcity.setAttribute("name","cities")
        for(let i=0;i<citiesnamesarr.length;i++){
            var optionx=document.createElement('option')
            optionx.setAttribute("value",`${citiesnamesarr[i]}`)
            optionx.innerText=`${citiesnamesarr[i]}`
            endcity.appendChild(optionx)
        }
        enddiv.appendChild(endlable)
        enddiv.appendChild(endcity)


        var startEndbtn=document.createElement('button')
        startEndbtn.innerText='SUBMIT'
        startEndbtn.setAttribute("class","submit")
        startEndbtn.setAttribute("id","startEndbtn")
        mainForm.appendChild(startdiv)
        mainForm.appendChild(enddiv)
        mainForm.appendChild(startEndbtn)


// ==بعد تحيد مدينة البداية و النهاية 
startEndbtn.onclick=function(event){
    event.preventDefault()
    
        //======== creat new form for releated cities and dictance
        var start=document.getElementById('strtCityName').value;
        var end=document.getElementById("endCityName").value;
        console.log("start"+start)
        console.log("end "+end)
        if(start==end){
            alert("please choose different cities ")
            return false
        }
// =======ربط المدن ببضها و تحديد المسافات ==========
        
        
mainForm.innerHTML=""
var csrfVar = $('meta[name="csrf-token"]').attr('content');
$("#main-form").append("<input name='_token' value='" + csrfVar + "' type='hidden'>");

for(let i=0;i<numberinpt;i++)
{
    var checkboxdiv=document.createElement('div')
    checkboxdiv.setAttribute("class","checkboxdiv")
    checkboxdiv.setAttribute("id",`checkboxdiv${i}`)
    var citynamelabl=document.createElement('p')
    citynamelabl.setAttribute("class",`CityP`)
    citynamelabl.innerText=`${citiesnamesarr[i]} is related to : `
    checkboxdiv.appendChild(citynamelabl)

    for(let j=0;j<numberinpt;j++){
        if(citiesnamesarr[i]==citiesnamesarr[j]){
            continue
        }
        else{

        
        var checkboxdivmin=document.createElement('div')
        checkboxdivmin.setAttribute("class","checkboxdivmin")
        checkboxdivmin.setAttribute("id",`checkboxdivmin${j}`)

        var releatedname=document.createElement('label')
        releatedname.innerText=`${citiesnamesarr[j]}`
        releatedname.setAttribute("for",`check${citiesnamesarr[i]}${j}`)
        checkboxdivmin.appendChild(releatedname)

        var RelatedCitycheckbox=document.createElement('input')
        RelatedCitycheckbox.setAttribute("value",`${citiesnamesarr[j]}`)
        RelatedCitycheckbox.setAttribute("class",`check  check${citiesnamesarr[i]} `)
        RelatedCitycheckbox.setAttribute("id",`check${citiesnamesarr[i]}${j}`)
        RelatedCitycheckbox.setAttribute("type","checkbox")
        checkboxdivmin.appendChild(RelatedCitycheckbox)

        var distiance=document.createElement('input')
        distiance.setAttribute("type","Number")
        distiance.setAttribute("class",`distance   distance${citiesnamesarr[i]} `)
        distiance.setAttribute("placeholder",`distance`)
        distiance.setAttribute("min",`1`)
        distiance.setAttribute("id",`distance${citiesnamesarr[i]}${j}`)
        checkboxdivmin.appendChild(distiance)

 


  

        checkboxdiv.appendChild(checkboxdivmin)

        mainForm.appendChild(checkboxdiv)



        }
    }
   

}

var releatedcitybtn=document.createElement('button')
releatedcitybtn.innerText='SUBMIT'
releatedcitybtn.setAttribute("class","submit")
releatedcitybtn.setAttribute("id","releatedbtn")
mainForm.appendChild(releatedcitybtn)
var checkboxnumber=document.getElementsByClassName('check')
var dictancenumber=document.getElementsByClassName('distance')



counter=0

releatedcitybtn.onclick=function(event)
{ 
    event.preventDefault()
// =============check if  input correct 
    

    for(let i=0;i<checkboxnumber.length;i++){

      

        

        if((checkboxnumber[i].checked==false )&&dictancenumber[i].value !== "" || checkboxnumber[i].checked &&dictancenumber[i].value == "")
        {
            alert("please check your values  ");
            return false;

         }else {
    // ==================save the edges ===============================
            for(let cityName of citiesnamesarr)
            {
                mapgraph.addNode(cityName); // إضافة المدن التي ادخلها المستخدم وتخزينها  بالجراف 
            
                var adjacentVertices={};
            
                var cityInputArr=document.getElementsByClassName(`check${cityName} `);
                var distanceInputArr=document.getElementsByClassName(`distance${cityName} `);
            
                for(let key in cityInputArr){
                    var destination=cityInputArr[key].value;
                    var distance=Number(distanceInputArr[key].value);
                    if(cityInputArr[key].checked){
                    adjacentVertices[destination]=distance; 
                    counter++


                    

                    }
                }
            
                mapgraph.addEdges(cityName,adjacentVertices);//تخزين المدن المرتبطة بالمدينة و المسافات من تلك المدن الى المدينة  

              
            }
          
        }
        console.log(counter)
        if (counter<3)
         {
             alert("please enter more data  ");
         return false;
        }
        
        
      
    }
    console.log(mapgraph.showNodes() )
    // =====creat form for straight line to destenation 
    mainForm.innerHTML=""
    var straightLinelable=document.createElement('lable')
    straightLinelable.innerText=`please enter how far is these cities in a straigth line to ${end} `

    mainForm.appendChild(straightLinelable)
    mainForm.appendChild(document.createElement('br'))

    for(let cityName of citiesnamesarr){
        if(cityName==end)
        {
            continue
        }
        else
        {
        var straightlable=document.createElement('label')
        straightlable.innerText=`${cityName} : `
        straightlable.setAttribute("for",`straightLine ${cityName}`)
        straightlable.setAttribute("value",`${cityName}`)
        straightlable.setAttribute("class",`srtlnclass`)
        var straightLine=document.createElement('input')
        straightLine.setAttribute("type","Number")
        straightLine.setAttribute("class",`straightLine   straightLine${cityName} `)
        straightLine.setAttribute("placeholder",`straight line to  ${end}`)
        straightLine.setAttribute("id",`straightLine ${cityName}`)
        straightLine.setAttribute("min",`1`)
        mainForm.appendChild(straightlable)
        mainForm.appendChild(straightLine)
        mainForm.appendChild(document.createElement('br'))
        }
    }
    var strightlinebtn=document.createElement('button')
    strightlinebtn.innerText='SUBMIT'
    strightlinebtn.setAttribute("class","submit")
    strightlinebtn.setAttribute("id","strightlinebtn")
    mainForm.appendChild(strightlinebtn)


    strightlinebtn.onclick=function(event)
{ 
    
    const result = citiesnamesarr.filter(function(el){
        return el !== end
    });
   
    console.log(result)
    
    var sourceGoal=
    {
    "start":start,
    "end":end
    }

console.log(sourceGoal.end)
var endc=sourceGoal.end
    event.preventDefault()
    // =======حفظ معلومات المسافة بخط مستقيم 
    var straightLinenumber=document.getElementsByClassName('straightLine')
    var straightLineToDestination={}
    for(let i=0;i< straightLinenumber.length;i++){
       
        straightLineToDestination[result[i]]=Number(straightLinenumber[i].value)

        

        if (straightLinenumber[i].value==""){
            alert("please enter all values ")
            return false
        }


    }
    straightLineToDestination[endc]=0

    console.log(straightLineToDestination)
    console.log("hello")



    // ===== send data via ajax
    sourcejson=sourceGoal
    jsonmap=mapgraph.showNodes()
   json=straightLineToDestination



   $.ajax({
       type: "POST",
       url: "",
       statusCode: {
           500: function() {
           mainForm.innerHTML=""
            var par=document.createElement('p')
            par.setAttribute("class","par")
            mainForm.appendChild(par);
           par.append(`there is no way from ${start} to  ${end}`)
           var addNewMap=document.createElement('button')
           addNewMap.innerText="Add new map "
           addNewMap.setAttribute("class","addmap")
           mainForm.append(addNewMap)

            }},

       data: {
           "map":JSON.stringify(jsonmap),
           "road":JSON.stringify(sourceGoal),
           "line":JSON.stringify(straightLineToDestination)

       },
       success: function(response){

            mainForm.innerHTML=""
            var par=document.createElement('p')
            par.setAttribute("class","par")
            mainForm.appendChild(par)
            var par1=document.createElement('p')
            par1.setAttribute("class","par")
            mainForm.appendChild(par1)
            var par2=document.createElement('p')
            par2.setAttribute("class","par")
            mainForm.appendChild(par2)
           par.append(`min of total heuristic_value = : ${response.heuristic}`)
           par1.append( ' total min cost = '+response.cost )
           par2.append(' the shortest way is '+response.result)
           var addNewMap=document.createElement('button')
           addNewMap.innerText="Add new map "
           addNewMap.setAttribute("class","addmap")
           mainForm.append(addNewMap)
       }
   });



  

 











}



    
}

}

}

}









