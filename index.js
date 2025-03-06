slideList = document.querySelectorAll('.slide')
stepperList = document.querySelectorAll('.index')
currentSlide = 0

let SOT = {  userInfo:{
                    name:{UserName:null,isChecked:false},
                    email:{emailId:null,isChecked:false},
                    number:{phoneNumber:null,isChecked:false},
                },
            isMonthly:true,
            isYearly: null,
            monthly:{
                string:'/mo'
            },
            yearly:{
                string:'/yo'
            },
            plan:{
                arcade:true,
                advanced:null,
                pro:null
            },

            addon:{
                monthly:{
                    addon1:{
                        isChecked:false,
                        name:"Online Service",
                        price:"+$1",
                        priceValue:1
                        },
                addon2:{
                        isChecked:false,
                        name:"Larger Storage",
                        price:"+$2",
                        priceValue:2
                         },
                addon3:{
                        isChecked:false,
                        name:"Customizable Profile",
                        price:"+$2",
                        priceValue:2
                        }

                },
                yearly:{
                    addon1:{
                        isChecked:false,
                        name:"Online Service",
                        price:"+$10",
                        priceValue:10
                        },
                    addon2:{
                        isChecked:false,
                        name:"Larger Storage",
                        price:"+$20",
                        priceValue:20
                         },
                    addon3:{
                        isChecked:false,
                        name:"Customizable Profile",
                        price:"+$20",
                        priceValue:20
                        }

                }
                
    }
    }
let content = document.querySelector('.content')
let nextButton = document.querySelector('.next')
let previousButton = document.querySelector('.back')
let buttongroup = document.querySelector('.buttongroup')

nextButton.addEventListener('click',nextSlide)
previousButton.addEventListener('click',previousSlide)


function nextSlide(event){
    console.log(currentSlide);
    
    if(currentSlide===4){
        return
    }
    if(currentSlide===2){
        nextButton.textContent = 'Confirm'
        generateTitle()
        generateActivePlanElement()
        generateAddOnElement()
        generateTotalElement()
    }
    if(currentSlide===3){
        nextButton.textContent = 'Next Step'
        previousButton.classList.add('hidden')
        nextButton.classList.add('hidden')
        content.classList.add('alignCenter')
        
    }
    if(currentSlide===1){
        nextButton.textContent = 'Next Step'
        togglePlan()
    }
    if(currentSlide===0){
        nextButton.textContent = 'Next Step'    
        let isvalid = validateForm() 

        if(!isvalid){
            return
        }
    }
    previousButton.classList.remove('lightGray')
    previousButton.classList.add('next')
    
    slideList[currentSlide].classList.add('hidden')
    currentSlide++
    slideList[currentSlide].classList.remove('hidden')

    if(currentSlide===4){
        slideList[currentSlide].classList.add('slide5')
    }
    stepperList[currentSlide].classList.add('highlight')
    
}


function previousSlide(event){
    // console.log("inside previosslide function");   
    if(currentSlide===0){
        previousButton.classList.remove('next')
        return
    }
    if(currentSlide===3){
        removeElements()
    }
    if(currentSlide===2){
        if(SOT['isMonthly']===true){
            let addonMonthly = SOT['addon']['monthly']
            for(let i in addonMonthly){
                addonMonthly[i]['isChecked']=false
            }
        }else{
            let addonYearly = SOT['addon']['yearly']
            for(let i in addonYearly){
                addonYearly[i]['isChecked']=false
            }
        }
        removeAddons()
    }

    stepperList[currentSlide].classList.remove('highlight')


    slideList[currentSlide].classList.add('hidden')
    currentSlide--
    slideList[currentSlide].classList.remove('hidden')  
}




function validateForm(){
    
    let content = document.querySelector('#myform')
    let inputs = content.querySelectorAll('input')

    // console.log("Inside validate form fucntion");

    inputs.forEach((input)=>{
        val = input.value
        if(input.id === 'name'){ 
            validateName(input)
        }
        if(input.id === 'email'){
            validateEmail(input)
        }
        if(input.id === 'number'){
            validateNumber(input) 
        }
    })     
        let user = SOT.userInfo
        for(let data in user){
            // console.log(validate[i]);  
            if(!user[data].isChecked){
                return false
            }      
        }
        return true
}



function validateName(input){
    let val = input.value
  //  console.log(input.nextElementSibling)
    let p = input.nextElementSibling
    let regex = /^[a-zA-Z]+$/
            if(val){
                if(!val.match(regex)){
                    p.textContent = "Invalid character in name"                   
                    p.className += ' errorClass'  
                    input.className='errorInput'                 
                }
                else if(val.length<3){
                    p.textContent = "Minimum 3 charaters required"
                    p.className += ' errorClass'  
                    input.className='errorInput'                 
                }else{
                     p.textContent =""
                     p.className = ''  
                    SOT.userInfo.name.UserName=val
                    SOT.userInfo.name.isChecked=true
                    input.className=''
                }                
            }else{
                p.textContent = "This field is required"
                p.className += ' errorClass'   
                input.className='errorInput'             
            }
}

function validateEmail(input){
    let val = input.value
    let p = input.nextElementSibling
    let regex = /^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
            if(val){
                if(!val.match(regex)){
                    p.textContent = "Invalid mail address"
                    p.className += ' errorClass'   
                    input.className='errorInput'              
                }else{
                    p.textContent =""
                    p.className = ''  
                    SOT.userInfo.email.emailId=val
                    SOT.userInfo.email.isChecked=true
                    input.className=''

                }
            }else{
                p.textContent = "This field is required"
                p.className += ' errorClass'  
                input.className='errorInput'
            }
}

function validateNumber(input){
    let p = input.nextElementSibling
    let val = input.value
    console.log(input);
    
    if(val){
        let regex = /^[0-9]+$/
        if(!val.match(regex)){
            p.textContent = "Invalid character in phone number"
            p.className += ' errorClass'    
            input.className='errorInput'                 
        }else if(val.toString().length<3){
            p.textContent = "Minimum 3 charaters required"
            p.className += ' errorClass'  
            input.className='errorInput' 
            
        }else{  
             p.textContent =""
             p.className = ''    
            SOT.userInfo.number.phoneNumber=val
            SOT.userInfo.number.isChecked=true   
            input.className=''    
        }
    }else{
        p.textContent = "This field is required"
        p.className += ' errorClass' 
        input.className='errorInput'                
    }
}


// step 2

let plans = document.querySelector('.plans')

plans.addEventListener('click',function(e){

    let plan = e.target.closest(".plan")
    targetElement=plan.firstElementChild

    targetElement.checked = true
    targetElement.parentElement.classList.add('active')
    id = targetElement.id
    SOT.plan[id]=true
        
    plans.querySelectorAll("input[type='checkbox']")
        .forEach(input=>{
            id=input.id
            if(input!==targetElement){              
                input.checked = false
                input.parentElement.classList.remove('active')
                SOT.plan[id]=false
            }
    })   
})
let pList = document.querySelectorAll('.plan p')
let togglebtn = document.querySelector('#togglebtn')

let monthlyPrice = {
                    arcade:{price:'$9/mo',priceValue:9}, 
                    advanced:{price:'$12/mo',priceValue:12},
                    pro:{price:'$15/mo',priceValue:15}
                    }

let yearlyPrice = {
                arcade:{price:'$90/yr',priceValue:90}, 
                advanced:{price:'$120/yr',priceValue:120},
                pro:{price:'$150/yr',priceValue:150}
                }

togglebtn.addEventListener('change',function(e){
    console.log(e.target.checked);  
    let bool = e.target.checked
    if(bool){
        pList.forEach(p=>{
            let inputId = p.parentElement.parentElement.previousElementSibling.id
            p.textContent = yearlyPrice[inputId].price
            SOT.isMonthly=false
            SOT.isYearly=true
        })
    }else{
        pList.forEach(p=>{
            let inputId = p.parentElement.parentElement.previousElementSibling.id
            p.textContent=monthlyPrice[inputId].price
            SOT.isMonthly=true
            SOT.isYearly=false
        })
    }
})

function togglePlan(){
    let initial,str;   
    let yearly = [10,20,20]
    let monthly = [1,2,2]
    if(SOT.isMonthly){
        initial = monthly
        str = 'mo'
    }else{
        initial=yearly
        str='yr'
    }
    let addOnList = document.querySelectorAll('.addon')
    addOnList.forEach((addOn,index)=>{
        let p = addOn.lastElementChild
        p.textContent= `$${initial[index]}/${str}`
    })
}
// step 3

let addons = document.querySelector('.addons')
addons.addEventListener('click',function(event){

    console.log(event.target.tagName);
    let addon = event.target.closest('.addon')
    if(event.target.tagName==='INPUT'){
            return;
    }
    let checkbox = addon.firstElementChild
    checkbox.checked = !checkbox.checked
    let inputId = addon.firstElementChild.id
    if(SOT.isMonthly){
        SOT.addon.monthly[inputId].isChecked=checkbox.checked
    }else{
        SOT.addon.yearly[inputId].isChecked=checkbox.checked
    }
    
    // console.log(SOT);
})



let sum=0

function generateActivePlanElement(){
    let h5 = document.createElement('h5')
    let button = document.createElement('button')
    let div1 = document.createElement('div')
    let p = document.createElement('p')
    let div2 = document.createElement('div')
    let div3 = document.createElement('div')
    let hr = document.createElement('hr')
    
if(SOT.isMonthly){
    let activePlan = getActivePlan()
    h5.textContent = activePlan +'(Monthly)'
    button.innerText = 'Change'
    sum=monthlyPrice[activePlan].priceValue
    console.log(sum,"sum");
    p.textContent = monthlyPrice[activePlan].price
    // monthlyPrice[activePlan]
    
}
if(SOT.isYearly){
    let activePlan = getActivePlan()
    console.log(activePlan);  
    h5.textContent = activePlan+'(Yearly)'
    button.innerText = 'Change'
    sum=yearlyPrice[activePlan].priceValue
    p.textContent = yearlyPrice[activePlan].price
    console.log(sum,"sum");
    
}     
    div1.appendChild(h5)
    div1.appendChild(button)
    div1.className = "checkout-plan"

    div2.appendChild(div1)
    div2.appendChild(p)
    div2.className="checkout"
    div2.id = 'main'
    
    div3.appendChild(div2)
    div3.className = 'checkouts'
    div3.appendChild(hr)
    hr.className='hrs'
    document.getElementById('slide-4').appendChild(div3)

    // console.log(document.getElementById('slide-4').innerHTML);
}

function generateAddOnElement(){

    let addOns = []
    
    let str;
    if(SOT.isMonthly){
        str = SOT.monthly.string
        let obj = SOT.addon.monthly
        for(let i in obj){
            if(obj[i].isChecked){
                addOns.push(i)
            }       
        }
        console.log("addons",addOns);
        addOns.forEach(key=>{
           
            let p1 = document.createElement('p')
            let p2 =document.createElement('p')
            let div = document.createElement('div')
           
            p1.textContent = SOT.addon.monthly[key].name
            p2.textContent = SOT.addon.monthly[key].price+str
            
            div.className = 'checkout'

            div.appendChild(p1) 
            div.appendChild(p2)

            document.querySelector('.checkouts').appendChild(div)
    })
    }
    if(SOT.isYearly){
        str = SOT.yearly.string
        let obj = SOT.addon.yearly
        for(let i in obj){
            if(obj[i].isChecked){
                addOns.push(i)
            }       
        }
        addOns.forEach(key=>{
           
            let p1 = document.createElement('p')
            let p2 =document.createElement('p')
            let div = document.createElement('div')
           
            p1.textContent = SOT.addon.yearly[key].name
            p2.textContent = SOT.addon.yearly[key].price+str
            
            div.className = 'checkout'

            div.appendChild(p1) 
            div.appendChild(p2)

            document.querySelector('.checkouts').appendChild(div)
    })
    }
    
}

function generateTotalElement(){
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let div = document.createElement('div')

    let str;
    if(SOT.isMonthly){
        str = SOT.monthly.string
    }
    if(SOT.isYearly){
        str = SOT.yearly.string
    }

    p1.textContent = 'Total'
    let price = getPriceAddOn()
    console.log("price",price);
    
    p2.textContent = '$' + (sum+price)+str
    console.log(price);
    
    div.className = "checkout-total"

    div.appendChild(p1)
    div.appendChild(p2)

    document.querySelector('#slide-4').appendChild(div)

}



function getPriceAddOn(){
    let price=0;
    let value;
    if(SOT.isMonthly){
        value='monthly'
    }else{
        value='yearly'
    }
    let obj = SOT.addon[value]
    for(i in obj){
        let bool = obj[i].isChecked
        if(bool){
            price+=obj[i].priceValue
        }
    }
    return price
}

function getActivePlan(){
    let obj = SOT.plan
    for(i in obj){
        if(obj[i]){
            return i
        }
    }
}

function removeElements(){
    console.log("Inside remove elements");
    
    document.querySelector('#slide-4').innerHTML = ""

    console.log(document.querySelector('#slide-4').outerHTML);
    
}
function generateTitle(){
   let slide4 =  document.querySelector('#slide-4')
   let h2 = document.createElement('h2')
   let p =document.createElement('p')

   h2.textContent = 'Finishing up'
   p.textContent = 'Double-check everything looks OK before confirming.'

   h2.className="mt-15 text-4xl pl-10 p-2 text-[hsl(213,96%,18%)] font-bold" 
    p.className="subtitle text-lg pl-10 font-medium p-3  text-[hsl(231,11%,63%)]"
   slide4.appendChild(h2)
   slide4.appendChild(p)
}

function removeAddons(){
    document.querySelectorAll('.addon').forEach(addon =>{
        let input = addon.firstElementChild
        input.checked=false
    })
}