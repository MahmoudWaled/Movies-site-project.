
//////////////////////////////////////////////////////////////   Js Exam   /////////////////////////////////////////////////////////////






// ****************************************** start ************* sideNave **********************************************************

(function sidNav () {
    let sideNavContainer=$("#sideNav"),
    sideNavBtn=$("#sideNaveBtn"),
    sideNav=$(".side_nav"),
    sideNavWidth=sideNav.innerWidth();
    
                sideNavContainer.animate({left:`-${sideNavWidth}`},0);


    sideNavBtn.click(()=>{     //open & close button
        let openIcon=$("#openIcon"),
        closeIcon=$("#closeIcon");

        if(sideNavContainer.css("left")=="0px"){
            sideNavContainer.animate({left:`-${sideNavWidth}`},500);
            closeIcon.css("display","none")
            openIcon.css("display","block")
        }
        else{
            sideNavContainer.animate({left:`0px`},500);
            closeIcon.css("display","block")
            openIcon.css("display","none")
        }

        navItemsAnimate();
        
    })  
    
    checkSearchValue()
}())

// ****************************************** end ************* sideNave **********************************************************









// ****************************************** start ************* Get Data **********************************************************

let myData=[];
 ( async function(){      //onload data
    let myFetch= await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    myData=await myFetch.json()
       myData= myData.results;
    displayData();
}())


$(".side_nav li").click(getData)  //sidebar data

async function getData(){
    let myFetch= await fetch(`https://api.themoviedb.org/3/${this.getAttribute("value")}?api_key=b89715e1ca656af240e66753d625230f&language=en-US&page=1`)
      myData=await myFetch.json()
         myData= myData.results;
      displayData();
 
}

  function displayData(){   //show data
    let myReadyData=``
    for(let i=0 ;i<myData.length;i++){
        myReadyData+=` <div class="col-md-4 p-3">
        <div class=" movie_img  px-0  position-relative overflow-hidden rounded  ">
            <img src="https://image.tmdb.org/t/p/w500${myData[i].poster_path}" class="img-fluid " alt="">
            <div class="position-absolute  movie_img_layer px-2 d-flex text-center align-content-center justify-content-center flex-column  ">
                <h2 class="py-3 movie_title">${myData[i].original_title}</h2>
                <p class="py-1 movie_overview">${myData[i].overview}</p>
                    <h6 class="py-1 movie_release_date">${myData[i].release_date}</h6>
            </div>
            <div class="position-absolute  movie_img_rate  bg-warning p-1  text-center ">
                <h6 class="p-3 m-auto rate font-weight-bolder ">${myData[i].vote_average}</h6>
            </div>
        </div>
        </div>`
    }

    $("#moviesContainer").html(myReadyData)
 }

// ****************************************** end ************* Get Data **********************************************************









// ****************************************** start ************* Search **********************************************************

$("#searchInput").keyup(()=>{  // search word
    let mySearchWord=$("#searchInput").val();
    if(mySearchWord!==""){
        search(mySearchWord)
    }
    else{
        checkSearchValue()
    }
})

 
async function search(searchWord){  //search word

    let myFetch= await fetch(`https://api.themoviedb.org/3/search/multi?api_key=b89715e1ca656af240e66753d625230f&language=en-US&page=1&query=${searchWord}`);
    let searchResult =await myFetch.json();
    searchResult=searchResult.results;

    let mySearchResult=``
    for(let i=0 ;i<searchResult.length;i++){
        mySearchResult+=` <div class="col-md-4 p-3">
        <div class=" movie_img  px-0  position-relative overflow-hidden rounded  ">
            <img src="https://image.tmdb.org/t/p/w500${searchResult[i].poster_path}" class="img-fluid " alt="">
            <div class="position-absolute  movie_img_layer px-2 d-flex text-center align-content-center justify-content-center flex-column  ">
                <h2 class="py-3 movie_title">${searchResult[i].original_title}</h2>
                <p class="py-1 movie_overview">${searchResult[i].overview}</p>
                    <h6 class="py-1 movie_release_date">${searchResult[i].release_date}</h6>
            </div>
            <div class="position-absolute  movie_img_rate  bg-warning p-1  text-center ">
                <h6 class="p-3 m-auto rate font-weight-bolder ">${searchResult[i].vote_average}</h6>
            </div>
        </div>
        </div>`
    
    }

    
    $("#moviesContainer").html(mySearchResult)

    
}

function checkSearchValue(){  // back to now playing moveis
    let searchInputValue =$("#searchInput").val();
    if(searchInputValue==""){
        ( async function(){      
            let myFetch= await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
            myData=await myFetch.json()
               myData= myData.results;
            displayData();
        }())
    }
}
$("#searchInput").blur(checkSearchValue)


// ****************************************** end ************* Search **********************************************************









// ****************************************** start ************* form validation **********************************************************

$("#nameInput").blur(nameValidation)
function nameValidation(){
    let nameRegex = /^([a-z]+ ?[A-Z]+)$|^([A-Z]+ ?[a-z]+)$|^([a-z]+ ?[a-z]+)$|^([A-Z]+ ?[A-Z]+)$|^([A-Z]+[a-z]+ ?[A-Z]+[a-z]+)$|^([a-z]+[A-Z]+ ?[a-z]+[A-Z]+)$/;
    if(nameRegex.test($("#nameInput").val())==true){
        $("#nameInput").addClass("is-valid")
        $("#nameInput").removeClass("is-invalid")
        return true;

    }
    else{
        $("#nameInput").addClass("is-invalid")
        $("#nameInput").removeClass("is-valid")
        $("#nameAlert").fadeIn(700 , function(){$("#nameAlert").delay(3000).fadeOut(700)})   
        return false;

    }
}   


 $("#emailInput").blur(emailValidation)
function emailValidation(){
    let emailRegex =/^[a-z0-9_]+@[a-z0-9]+\.[a-z]{2,15}$/;
    if(emailRegex.test($("#emailInput").val())==true){
        $("#emailInput").addClass("is-valid")
        $("#emailInput").removeClass("is-invalid")
        return true;
        

    }
    else{
        $("#emailInput").addClass("is-invalid")
        $("#emailInput").removeClass("is-valid")
        $("#emailAlert").fadeIn(700 , function(){$("#emailAlert").delay(3000).fadeOut(700)})   
        return false;
     }
    
}

$("#phoneInput").blur(phoneValidation)
function phoneValidation(){
    let phoneRegex =/^(\+2|002)?01[0125][0-9]{8}$/;
    if(phoneRegex.test($("#phoneInput").val())==true){
        $("#phoneInput").addClass("is-valid")
        $("#phoneInput").removeClass("is-invalid")
        return true;
        
    }
    else{
        $("#phoneInput").addClass("is-invalid")
        $("#phoneInput").removeClass("is-valid")
        $("#phoneAlert").fadeIn(700 , function(){$("#phoneAlert").delay(3000).fadeOut(700)})   
        return false;
    }
}


$("#ageInput").blur(ageValidation)
function ageValidation(){
    let ageRegex =/^[1-9][0-9]$/;
    if(ageRegex.test($("#ageInput").val())==true){
        $("#ageInput").addClass("is-valid")
        $("#ageInput").removeClass("is-invalid")
        return true;
        
    }
    else{
        $("#ageInput").addClass("is-invalid")
        $("#ageInput").removeClass("is-valid")
        $("#ageAlert").fadeIn(700 , function(){$("#ageAlert").delay(3000).fadeOut(700)})   
        return false;
    }
}

$("#passwordInput").blur(passwordValidation)
function passwordValidation(){
    let passwordRegex =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(passwordRegex.test($("#passwordInput").val())==true){
        $("#passwordInput").addClass("is-valid")
        $("#passwordInput").removeClass("is-invalid")
        return true;
        
    }
    else{
        $("#passwordInput").addClass("is-invalid")
        $("#passwordInput").removeClass("is-valid")
        $("#passwordAlert").fadeIn(700 , function(){$("#passwordAlert").delay(3000).fadeOut(700)})   
        return false;
    }
}


$("#repasswordInput").blur(rePasswordValidation)
function rePasswordValidation(){
    if($("#repasswordInput").val()==$("#passwordInput").val()){
        $("#repasswordInput").addClass("is-valid")
        $("#repasswordInput").removeClass("is-invalid")
        return true;
        
    }
    else{
        $("#repasswordInput").addClass("is-invalid")
        $("#repasswordInput").removeClass("is-valid")
        $("#rePasswordAlert").fadeIn(700 , function(){$("#rePasswordAlert").delay(3000).fadeOut(700)})   
        return false;
    }
}

(function(){ $("#sendBtn").prop('disabled', true);}());   // deactive button onload

$("#contact input").blur(checkFormIsReady)
function checkFormIsReady (){  // active button
    if(nameValidation()==true&&emailValidation()==true&&phoneValidation()==true&&ageValidation()==true&&passwordValidation()==true&&rePasswordValidation()==true)
    {
        $("#sendBtn").prop('disabled', false);
        $("#sendBtn").removeClass("btn-outline-danger")
        $("#sendBtn").addClass("btn-outline-success")
    }
    else{
        $("#sendBtn").prop('disabled', true);
    
    }

}

$("#sendBtn").click(()=>{  //send contact info

    $("#contact input").val("")
    $("#sendBtn").removeClass("btn-outline-success")
    $("#sendBtn").addClass("btn-outline-danger")
    $("#nameInput").removeClass("is-valid")
    $("#emailInput").removeClass("is-valid")
    $("#phoneInput").removeClass("is-valid")
    $("#ageInput").removeClass("is-valid")
    $("#passwordInput").removeClass("is-valid")
    $("#repasswordInput").removeClass("is-valid")
    $("#sendBtn").prop('disabled', true);

})

// ****************************************** end ************* form validation **********************************************************






// ****************************************** start ************* nav animation **********************************************************

function navItemsAnimate(){

    if($(".side_nav li,a").css("margin-top")=='30px'){
        $("#nowPlaying").animate({"margin-top":"200px" ,"opacity":"0"},300)
        $("#popular").animate({"margin-top":"200px" ,"opacity":"0"},400)
        $("#topRated").animate({"margin-top":"200px" ,"opacity":"0"},500)
        $("#trending").animate({"margin-top":"200px" ,"opacity":"0"},600)
        $("#upcoming").animate({"margin-top":"200px" ,"opacity":"0"},700)
        $("#contactUs").animate({"margin-top":"200px" ,"opacity":"0"},800)
    }
    else{
        $("#nowPlaying").animate({"margin-top":"30px" ,"opacity":"1"},300)
        $("#popular").animate({"margin-top":"30px" ,"opacity":"1"},450)
        $("#topRated").animate({"margin-top":"30px" ,"opacity":"1"},600)
        $("#trending").animate({"margin-top":"30px" ,"opacity":"1"},750)
        $("#upcoming").animate({"margin-top":"30px" ,"opacity":"1"},900)
        $("#contactUs").animate({"margin-top":"30px" ,"opacity":"1"},1050)
    }

}


// ****************************************** end ************* nav animation **********************************************************








///////////// Done  ////////////////


