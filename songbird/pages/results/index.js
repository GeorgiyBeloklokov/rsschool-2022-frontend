let curLangRus = true
let changeLang = document.querySelector('#change_lang')
let changeLang2 = document.querySelector('#change_lang2')
let headerList = document.querySelectorAll('.link')
let footerList = document.querySelectorAll('.link-footer')
let footerBtn1 = document.querySelector('.footer_btn')
let footerText = document.querySelector('.footer_wrap_email_text')
let footerBtn2 = document.querySelector('.inp_btn')
let mainText = document.querySelector('.main__answer')
let mainBtn = document.querySelector('.main__btn')
let score = null
//Проверка памяти
if(localStorage.getItem('BirdSongCurLanguage')){
    curLangRus = JSON.parse(localStorage.getItem('BirdSongCurLanguage'))
    changeLangFunc()
}
//Получение счета
function getScore(lang){
  score = JSON.parse(localStorage.getItem('SongBirdScore'))
  if(lang){
    if(localStorage.getItem('SongBirdScore')){
      if(score==30){
        mainText.textContent = `Поздравляем с прохожденим викторины, вы набрали  максимальные ${score} баллов `
        mainBtn.textContent = 'Вернуться на главную'
      }else{
        mainText.textContent = `Поздравляем с прохожденим викторины, к сожалению вы набрали  только ${score} баллов `
        mainBtn.textContent = 'Пройти еще раз'
      }
    }else{
      mainText.textContent = "Вы еще не прошли викторину, ваш результат 0"
      mainBtn.textContent = "Пройти викторину"
    }
  }else{
    if(localStorage.getItem('SongBirdScore')){
      if(score!=30){
        mainText.textContent = `Gongratulations,but  your score only ${score} points  `
        mainBtn.textContent = 'Complete victorine again'
      }else{
        mainText.textContent = `Gongratulations, your score  max ${score}  points`
        mainBtn.textContent = 'Go to main'
      }
    }else{
      mainText.textContent = "You don't finish victorine yet"
      mainBtn.textContent = "Complete victorine"
    }
  }
}
getScore(curLangRus)
//Смена языка
changeLang.addEventListener('click',()=>{
  curLangRus = !curLangRus
  changeLangFunc()
  localStorage.setItem('BirdSongCurLanguage',JSON.stringify(curLangRus))
})
changeLang2.addEventListener('click',()=>{
  curLangRus = !curLangRus
  changeLangFunc()
  localStorage.setItem('BirdSongCurLanguage',JSON.stringify(curLangRus))
})
//Смена языка
function changeLangFunc(){
  if(curLangRus){
    getScore(curLangRus)
    changeLang2.textContent = 'En'
    changeLang.textContent = 'En'
    headerList[0].textContent = "Главная"
    headerList[3].textContent = "Главная"
    headerList[1].textContent = "Викторина"
    headerList[4].textContent = "Викторина"
    headerList[2].textContent = "Галерея"
    headerList[5].textContent = "Галерея"
    footerList[0].textContent = "Главная"
    footerList[1].textContent = "Викторина"
    footerList[2].textContent = "Галерея"
    footerBtn1.textContent = "Посмотреть галерею"
    footerText.textContent = 'Подпишитесь на новые викторины'
    footerBtn2.textContent = "Подтвердить"
  }else{
    getScore(curLangRus)
    changeLang2.textContent = 'Ru'
    changeLang.textContent = 'Ru'
    headerList[0].textContent = "Main"
    headerList[3].textContent = "Main"
    headerList[1].textContent = "Victorine"
    headerList[4].textContent = "Victorine"
    headerList[2].textContent = "Gallery"
    headerList[5].textContent = "Gallery"
    footerList[0].textContent = "Main"
    footerList[1].textContent = "Victorine"
    footerList[2].textContent = "Gallery"
    footerBtn1.textContent = "Show gallery"
    footerText.textContent = 'Subscribe to new victorines'
    footerBtn2.textContent = "Confirm"
  }
}
//Перенаправление
mainBtn.addEventListener('click',()=>{
  if(score==null || score<30){
      window.location.href = '../victorine/index.html'
  }else{
      window.location.href = '../main/index.html'
  }
  localStorage.removeItem('SongBirdScore')
})

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

burger.addEventListener('click', () => {
  
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