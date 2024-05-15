let dropdowns = document.querySelectorAll(".dropdown select");
let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

for(let select of dropdowns)
    {
        for(let currCode in countryList)
            {
                let newOption=document.createElement("option");
                newOption.innerText=currCode;
                newOption.value=currCode;
                if(select.name === "from" && currCode === "USD")
                    {
                        newOption.selected="selected";
                    } 
                else if(select.name === "to" && currCode === "INR")
                    {
                        newOption.selected="selected";
                    } 
                select.append(newOption);
            }
        select.addEventListener("change",(evt)=>{
            // console.log(evt.target.value);
            updateFlag(evt.target);
        })
    }
    const updateExchangeRate=async ()=>{
        let amount=document.querySelector(".amount input");
        let amtVal=amount.value;
        if(amtVal === "" || amtVal < 0)
            {
                amtVal=1;
                amount.value="1";
            }
        // console.log(amtVal);
        // console.log(fromCurr.value,toCurr.value);
        const URL = `https://v6.exchangerate-api.com/v6/39d136af55120196a55e623a/pair/${fromCurr.value}/${toCurr.value}`;
        let response=await fetch(URL);
        let data=await response.json();
        let rate=data["conversion_rate"];
        let finalAmt=amtVal*rate;
        msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    }
    let updateFlag=(element)=>{
        let currCode=element.value;
        let countryCode=countryList[currCode];
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newSrc;
    }
    btn.addEventListener("click",(evt)=>{
        evt.preventDefault();  
        updateExchangeRate();
    })

    window.addEventListener("load",()=>{
        updateExchangeRate();
    })