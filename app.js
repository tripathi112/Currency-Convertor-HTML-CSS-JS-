const Base_URL="https://api.frankfurter.app/latest?";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
       else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};


 btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    
    let amount = document.querySelector(".input input");
    let amountval = amount.value;
    if (amountval === "" || amountval < 1) {
        amountval = 1;
        amount.value = "1";
    }

    const URL = `${Base_URL}amount=${amountval}&from=${fromCurr.value}&to=${toCurr.value}`;
    
    try {
        let response = await fetch(URL);
        let data = await response.json(); // ✅ Properly parse JSON

        let rate = data.rates[toCurr.value]; // ✅ Access rate correctly

        let finalAmount = rate;

        msg.innerText = `${amountval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate";
        console.error(error);
    }
});