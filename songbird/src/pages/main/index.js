let video = document.querySelector("#video")
let activeHeader = document.querySelectorAll('.active')
let activeFooter = document.querySelectorAll('.active_footer')
activeHeader[0].classList.add('focused')
activeFooter[0].classList.add('focused')
let mainDiv = document.querySelector('.main__container')
let noteDo = new Audio("../../assets/mp3/zvuk-notyi-do.mp3")
let noteRe = new Audio("../../assets/mp3/zvuk-notyi-re.mp3")
let noteLya = new Audio("../../assets/mp3/zvuk-notyi-lya.mp3")


const notesArr = []
for(let i=0;i<9;i++){
    let div = document.createElement('div')
    div.className = 'falling-notes'
    let noteImg = document.createElement('img')
   if(i<3){
    noteImg.src = "../../assets/images/snow1.png"
    div.append(noteImg)
    div.addEventListener('mouseover',()=>{
    noteDo.play()
 })
 div.addEventListener('click',()=>{
    noteDo.play()
 })
   }
   if(i<6 && i>2){
    noteImg.src = "../../assets/images/snow2.png"
    div.append(noteImg)
    div.addEventListener('mouseover',()=>{
    noteRe.play()
 })
 div.addEventListener('click',()=>{
    noteRe.play()
 })
   }
   if(i<9 && i>5){
    noteImg.src = "../../assets/images/snow3.png"
    div.append(noteImg)
    div.addEventListener('mouseover',()=>{
    noteLya.play()
 })
 div.addEventListener('click',()=>{
    noteLya.play()
 })
   }
   notesArr.push(div)
}
notesArr.sort(()=>Math.random() - 0.5)

let arr = [0,1,2,3,4,5,6,7,8]
let i = 0
arr.sort(()=>Math.random() - 0.5)
    let ID = setInterval(()=>{
        if(i==8){
            clearInterval(ID)
        }
            notesArr[arr[i]].style.right = `${arr[i]*10+8}%`
            notesArr[arr[i]].style.top = `-${30}px`
            if(Math.random()>0.5){
                notesArr[arr[i]].style.transform = 'translateY(180deg)'
            }    
            mainDiv.append(notesArr[arr[i]])
       i++
    },550)

let curLangRus = true
let changeLang = document.querySelector('#change_lang')
let headerList = document.querySelectorAll('.link')
let footerList = document.querySelectorAll('.link-footer')
let footerBtn1 = document.querySelector('.footer_btn')
let footerText = document.querySelector('.footer_wrap_email_text')
let footerBtn2 = document.querySelector('.inp_btn')
let mainText = document.querySelector('.main__text')

if(localStorage.getItem('SongBirdCurLanguage')){
    curLangRus = JSON.parse(localStorage.getItem('SongBirdCurLanguage'))
    changeLangFunc()
  }

changeLang.addEventListener('click',()=>{
    curLangRus = !curLangRus
    changeLangFunc()
    localStorage.setItem('SongBirdCurLanguage',JSON.stringify(curLangRus))
  })



  function changeLangFunc(){
    score = JSON.parse(localStorage.getItem('SongBirdScore'))
    if(curLangRus){
      changeLang.textContent = 'En'
      headerList[0].textContent = "Главная"
      headerList[3].textContent = "Главная"
      headerList[1].textContent = "Викторина"
      headerList[4].textContent = "Викторина"
      headerList[2].textContent = "Результаты"
      headerList[5].textContent = "Результаты"
      footerList[0].textContent = "Главная"
      footerList[1].textContent = "Викторина"
      footerList[2].textContent = "Результаты"
      footerBtn1.textContent = "Пройти викторину"
      footerText.textContent = 'Подпишитесь на новые викторины'
      footerBtn2.textContent = "Подтвердить"
      mainText.textContent = "Любишь викторины и музыку?Тогда тебе точно понравится этот сайт!"
    
    }else{ 
      changeLang.textContent = 'Ru'
      headerList[0].textContent = "Main"
      headerList[3].textContent = "Main"
      headerList[1].textContent = "Victorine"
      headerList[4].textContent = "Victorine"
      headerList[2].textContent = "Results"
      headerList[5].textContent = "Results"
      footerList[0].textContent = "Main"
      footerList[1].textContent = "Victorine"
      footerList[2].textContent = "Results"
      footerBtn1.textContent = "Play victorine"
      footerText.textContent = 'Subscribe to new victorines'
      footerBtn2.textContent = "Confirm"
      mainText.textContent = "Do you like music and victorines?So this site is for you!"
     
    }
  }

  let closeBtn = document.querySelector('.close_btn')
  let hideMenu = document.querySelector('.hidden_menu')
  let burger = document.querySelector('.burger_menu')
  let menuList = document.querySelector('.hidden_menu_list')
  
  closeBtn.addEventListener('click',()=>{
      hideMenu.style.opacity = 0;
      menuList.style.height = '0px';
      setTimeout(()=>{  
          hideMenu.style.display = 'none'
      },900)
  })
  burger.addEventListener('click',()=>{
      activeHeader[7].classList.add('focused')
      hideMenu.style.display = 'flex';
      hideMenu.style.opacity = 1;
      setTimeout(()=>{  
      menuList.style.height = '329px';
  },100)
  })
  menuList.addEventListener('click',(e)=>{
      e.stopPropagation()
  })
  hideMenu.addEventListener('click',()=>{
      hideMenu.style.opacity = 0;
      menuList.style.height = '0px';
      setTimeout(()=>{  
          hideMenu.style.display = 'none'
      },700)
  })






