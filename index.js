const inputSLider = document.querySelector(".Slider");
const lengthDisplay = document.querySelector("[password-length");
const PasswordDisplay = document.querySelector("[data-passwordDislay]");
const upperCase = document.querySelector("#upperCaseCheckBox");
const lowerCase = document.querySelector("#LowerCaseCheckBox");
const numberCase = document.querySelector("#NumberCheckBox");
const specialCase = document.querySelector("#SpecialCaseCheckBox");
const Circle = document.querySelector(".Circle");
const btn = document.querySelector(".btn");
const allCheckboxes = document.querySelectorAll("input[type=checkbox]");
const copied = document.querySelector("[data-copyMsg]");
const btnCopy = document.querySelector(".btnCopy");

//set circlecolor to grey later
let password="";
let passWordLength = 10;
let stringSpecialChar = ",'`@#$%^&*(){}+_=-<>?\|!";
let checkCount = 0;

//function starts
valueSlider();

function valueSlider(){
    inputSLider.value = passWordLength;
    lengthDisplay.textContent = inputSLider.value;
}

function setIndicator(color){
    Circle.style.backgroundColor = color;
    //set shadow
}
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min))+min;
}

function getNumber(){
    return getRndInteger(0,9); //single number 0-9
}

function getLowerCase(){
    return String.fromCharCode(getRndInteger(97,122)); //returns a-z
}

function getUpperCase(){
    return String.fromCharCode(getRndInteger(65,90)); //returns A-Z
}

function getSpecialCase(){
          return stringSpecialChar[getRndInteger(0,stringSpecialChar.length)]; //returns any char from hardcoded stringSpecialChar
}


//calculate strength of password
function calcStength(){
    // let hasUpper = false;
    // let hasLower = false;
    // let hasNum = false;
    // let hasSymbol = false;

    // if(upperCase.checked)
    //     hasUpper = true;
    // if(lowerCase.checked)
    //     hasLower = true;
    // if(numberCase.checked)
    //     hasNum = true;
    // if(specialCase.checked)
    //     hasSymbol = true;

    //rules
    if(upperCase.checked && lowerCase.checked && (numberCase.checked || specialCase.checked) && passWordLength>=8)
        setIndicator("#0f0");
    else if((upperCase.checked || lowerCase.checked) && (numberCase.checked || specialCase.checked) && passWordLength>=5)
        setIndicator("#ff0")
    else    setIndicator("#f00");        
}

async function copyClipboard(){
    console.log("copy content is called");
    try{
        await navigator.clipboard.writeText(PasswordDisplay.value);
        copied.textContent = "Copied to CLIPBOARD";
    }
    catch(e){
        copied.textContent = "Failed";   
    }
    //span ko active kro
    copied.classList.add("active"); //to add css classname active

    //span ko hatao
    setTimeout(function(){
        copied.classList.remove("active");
    },2000);
}


//event listeners
inputSLider.addEventListener('input' , function(val){
    passWordLength = val.target.value;
    valueSlider();
});

btnCopy.addEventListener('click' , function(){
    if(PasswordDisplay.value!='')
        copyClipboard();
})

function handleCheckBoxes(){
    checkCount = 0;
    allCheckboxes.forEach((checkbox) =>{
        if(checkbox.checked)
            checkCount++;
    });
}


//event listener on checkboxes
allCheckboxes.forEach((checkbox) =>{
    checkbox.addEventListener('change' , handleCheckBoxes);
});

btn.addEventListener("click" ,function(){
    PasswordDisplay.value="";
    if(checkCount<=0){
        alert('Please fill one of the checkboxes');
        return;
    }

    //edge case
    if(passWordLength< checkCount)
    {
        passWordLength = checkCount;
        valueSlider();
    }

    //main logic
    console.log("starting the journey")
    password="";
    let funcArr=[];
    if(upperCase.checked){
        funcArr.push(getUpperCase);
        password+=getUpperCase();
    }
        
    if(lowerCase.checked){
        console.log(1)
        funcArr.push(getLowerCase);
        console.log(2);
        password+=getLowerCase();
        console.log(3);
    }
        
    if(specialCase.checked){
        funcArr.push(getSpecialCase);
        password+=getSpecialCase();
    }
        
    if(numberCase.checked){
        funcArr.push(getNumber);
        password+=getNumber();
    }

    for(let i = 0 ; i<passWordLength-funcArr.length;i++)
    {
        let random = Math.floor(getRndInteger(0,funcArr.length));
        password+=funcArr[random]();
    }

    // now shuffling the password for more strongpass
    password = shufflePass(Array.from(password));
    console.log(password);
    PasswordDisplay.value = password;

    //now calling calculate strenght function call
    calcStength();
        
});

function shufflePass(ArrayPassword){
   for(let i = ArrayPassword.length-1;i>0;i--)
   {
        const j = Math.floor(Math.random() * (i+1));
        const temp = ArrayPassword[i];
        ArrayPassword[i] = ArrayPassword[j];
        ArrayPassword[j] = temp;
   }
   newPass="";
   ArrayPassword.forEach(function(e){
    newPass+=e;
   });
   return newPass;
}







