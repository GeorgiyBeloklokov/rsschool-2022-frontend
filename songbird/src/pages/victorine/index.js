let conteiner = document.querySelector('.main__right');
let audio1 = new Audio();
let audio2 = new Audio();
let winSound = new Audio('../../assets/sound/correct.mp3');
let errorSound = new Audio('../../assets/sound/wrong.mp3');
let stopPlay = false;
let currentGenge = 0;
let inGame = true;
let curLangRus = true;
let rightAnswer = document.querySelector('.main__right__text');
let rightImage = document.querySelector('.main__question_img');
let totalScoreHtml = document.querySelector('.main__score_total');
let changeLang = document.querySelector('#change_lang');
let nextBtn = document.querySelector('.main__show_next-btn');
let textPreview = document.querySelector('.main__show_preview');
let maxScore = 5;
let mainScore = 0;
let answersList = [];
let previewList = [];
let activeHeader = document.querySelectorAll('.active');
let activeFooter = document.querySelectorAll('.active_footer');
activeHeader[2].classList.add('focused');
activeFooter[2].classList.add('focused');
const AudioArr = [
  {
    class: 'Разминка',
    classEn: 'Training',
    songs: [
      {
        id: 0,
        name: 'Ворон',
        src: 'https://www.xeno-canto.org/sounds/uploaded/XIQVMQVUPP/XC518684-Grands%20corbeaux%2009012020%20Suzon.mp3',
        img: 'https://live.staticflickr.com//65535//49298804222_474cfe8682.jpg',
        description:
          'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.',
        enDescript: 'Corvus corax',
      },
      {
        id: 1,
        name: 'Журавль',
        src: 'https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC512582-190604_1087_Grus_tok.mp3',
        img: 'https://live.staticflickr.com/65535/49221158846_b0b69a58f1.jpg',
        description:
          'Звуки, издаваемые журавлем, похожи на звонкое «кур-лы – кур-лы». Журавли чаще всего поют дуэтом – одна птица начинает запев со слога «кур», а вторая подхватывает «лы». Если птица поёт одна, то она издает только звук «кур».',
        enDescript: 'Grus grus',
      },
      {
        id: 2,
        name: 'Ласточка',
        src: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489247-190724_09.10h_huiszwaluw_biesbosch_amaliahoeve_roep_100%2Bex_fouragerend_gezien_%20%282%29.mp3',
        img: 'https://live.staticflickr.com//65535//48539007512_5029d2a9a0.jpg',
        description:
          ' Для ласточек характерно негромкое щебетание. Песни ласточек не смолкают на протяжении всего лета. Исследователи различают у птиц до 6 щебечущих звуков: «вит», «ви-вит», «чивит», «чиривит» и т.п. Ласточки любят петь дуэтом.',
        enDescript: 'Delichon urbicum',
      },
      {
        id: 3,
        name: 'Козодой',
        src: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC486956-190623_22.37h_nachtzwaluw_rechte%20heide_zang_ad%20_2ex_gezien_.mp3',
        img: 'https://live.staticflickr.com/65535/48456345286_dbc8530027.jpg',
        description:
          'Козодой – неприметная птица, известная благодаря своему голосу. Песня козодоя звучит как монотонная трель похожая на тарахтение мотоцикла. Такое дребезжание слышно от заката до рассвета, его тональность, частота и громкость изменяются.',
        enDescript: ' Caprimulgus europaeus',
      },
      {
        id: 4,
        name: 'Кукушка',
        src: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501461-190616_08.13h_koekoek_brabantse%20biesbosch%20jantjesplaat_roep_1%20ex_ad%20m_ter%20plaatse%20zingend_gezien_.mp3',
        img: 'https://live.staticflickr.com/65535/48377838151_e15f430ec1.jpg',
        description:
          ' Кукушку назвали так из-за особенностей ее песен. Звонкое «ку-ку» не спутать ни с какой другой птицей. Кукушки не строят гнезда, их потомство выращивают другие виды пернатых, которым кукушки подбрасывают свои яйца.',
        enDescript: 'Cuculus canorus',
      },
      {
        id: 5,
        name: 'Синица',
        src: 'https://www.xeno-canto.org/sounds/uploaded/RFGQDPLDEC/XC518417-Kj%C3%B8ttmeis%20XC%20Helg%C3%B8ya%20Elias%20A.%20Ryberg20200108133922_079.mp3',
        img: 'https://live.staticflickr.com//65535//49366042493_c48c81d58d.jpg',
        description:
          'В щебетании синиц различают более 40 различных звуковых сочетаний. Поют они практически круглый год, немного затихая только зимой. Синицы настоящие санитары леса. Одна пара синиц в период гнездования оберегает от вредителей десятки деревьев.',
        enDescript: 'Parus major',
      },
    ],
  },
  {
    class: 'Воробьиные',
    classEn: 'Passerine',
    songs: [
      {
        id: 0,
        name: 'Воробей',
        src: 'https://www.xeno-canto.org/sounds/uploaded/CXFHOPIVAS/XC503224-191020_0134.mp3',
        img: 'https://live.staticflickr.com//65535//49366595303_06cf65b07e.jpg',
        description:
          'Воробьи являются самыми известными и узнаваемыми пернатыми. Их легко узнать по пестрому оперению и задорному чириканью. Воробьи относятся к синатропному виду — они селятся поблизости к человеческому жилищу.',
        enDescript: 'Passer domesticus',
      },
      {
        id: 1,
        name: 'Грач',
        src: 'https://www.xeno-canto.org/sounds/uploaded/RLRHCUIPIY/XC512540-gawron%20Suble%2019.12.19%20%2012.35.mp3',
        img: 'https://live.staticflickr.com//65535//49347123322_291c86b016.jpg',
        description:
          'Грачи очень умные и сообразительные птицы. С помощью клюва они создают и используют простейшие орудия. У грачей развит рефлекс на звуки трактора. Услышав «тарахтение», они летят на звук – трактор пашет землю, значит, в этом месте много корма.',
        enDescript: 'Corvus frugilegus',
      },
      {
        id: 2,
        name: 'Галка',
        src: 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC510498-Coloeus%20monedula_2019.11.13_11.55_01.mp3',
        img: 'https://live.staticflickr.com//65535//49237149586_993cf685c5.jpg',
        description:
          'Слово «галка» произошло из старославянского языка и переводится как «чёрный». Этим словом часто называют воронов или других черных птиц. Латинское название галки «monedula» связывают со словами монета за любовь птицы к блестящим и ярким вещам.',
        enDescript: 'Coloeus monedula',
      },
      {
        id: 3,
        name: 'Певчий дрозд',
        src: 'https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513326-190704_1146_TF-Glogow.mp3',
        img: 'https://live.staticflickr.com/65535/48979125763_e2534f54bd.jpg',
        description:
          'Дрозд — лучший певец из отряда воробьиных. Песня состоит только из красивых звучных свистов и коротких трелей. Чаще всего её можно услышать в утреннее и вечернее время. Поют дрозды в течении всего периода гнездования.',
        enDescript: 'Turdus philomelos',
      },
      {
        id: 4,
        name: 'Сорока',
        src: 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC500868-Pica%20pica2019.08.23_09.18_02.mp3',
        img: 'https://live.staticflickr.com//65535//49360363066_ff02bb6a73.jpg',
        description:
          'Сорока очень трудолюбивая птица. Она строит до восьми гнёзд, а потом выбирает из них самое лучшее. Вход в гнездо сорок всегда обращен на юг, чтобы в жилище было теплее. Сороки являются единственными птицами, которые узнают себя в зеркале.',
        enDescript: 'Pica pica',
      },
      {
        id: 5,
        name: 'Сойка',
        src: 'https://www.xeno-canto.org/sounds/uploaded/TFOGOENSTQ/XC501517-191008_1590%201300.%20Eichelh%C3%A4her%20D%2C%20NW%2C%20LEV.%20Stephan%20Risch.mp3',
        img: 'https://live.staticflickr.com//65535//49369678956_9a7465c7f4.jpg',
        description:
          'Когда сойка волнуется, хохолок на её голове взъерошивается. Птица старается создать устрашающее зрелище. Сойки умеют имитировать голоса других птиц, животных и звуки, которые создает человек. На зиму они делают большие запасы желудей и орехов.',
        enDescript: 'Garrulus glandarius',
      },
    ],
  },
  {
    class: 'Лесные птицы',
    classEn: 'Forest birds',
    songs: [
      {
        id: 0,
        name: 'Зяблик',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC512407-150622_03%20zi%C4%99ba%20%282%29.mp3',
        img: 'https://live.staticflickr.com/65535/49143150817_2d3a2f6c1e.jpg',
        description:
          'В дикой природе насчитывается 450 видов зябликов. Зимой зяблики ведут стайный образ жизни. Иногда в их семьях можно увидеть воробьев. Запевают зяблики весной, с наступлением брачного периода. Их пение – это заливистые многоминутные рулады.',
        enDescript: 'Fringilla coelebs',
      },
      {
        id: 1,
        name: 'Клёст',
        src: 'https://www.xeno-canto.org/sounds/uploaded/OTVUCEGYZN/XC495381-Kruisbek%20roep%20NHD%20290619.mp3',
        img: 'https://live.staticflickr.com//65535//49365470123_f2de66bb35.jpg',
        description:
          'Клестов называют «рождественскими» птицами. В естественных условиях они дают потомство зимой – в январе. Эти птицы утепляют свои гнезда мхом и шерстью животных, потому птенцам не холодно. В поисках шишек клесты могут улетать за 3500 км от гнезда.',
        enDescript: 'Loxia curvirostra',
      },
      {
        id: 2,
        name: 'Горлица',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC324106-Turkawka_Streptopelia_turtur_Poland_Jarek_Matusiak_2011625_07.mp3',
        img: 'https://live.staticflickr.com/65535/48063004977_84252f9ceb.jpg',
        description:
          'Горлица обитает в смешанных и широколиственных лесах, а также в городских парках и поселках. Птицы часто выбирают места жизни рядом с человеком и легко привыкают к людям. Благодаря мелодичному приятному пению горлиц часто разводят в домашних условиях.',
        enDescript: 'Streptopelia turtur',
      },
      {
        id: 3,
        name: 'Дятел',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC518928-AB-017%20dzi%C4%99cio%C5%82%20du%C5%BCy%20agresja%20%282%29.mp3',
        img: 'https://live.staticflickr.com/65535/49339376578_e933426455.jpg',
        description:
          'Дятел – заметная и шумная птица, часто живет рядом с человеком. С середины января до конца июня можно услышать «барабанную дробь» дятлов – трель от вибрации веток под быстрыми ударами клюва птицы. В хорошую погоду дробь слышна в радиусе 1,5 км.',
        enDescript: 'Dendrocopos major',
      },
      {
        id: 4,
        name: 'Удод',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC477326-dudek%20%282%29.mp3',
        img: 'https://live.staticflickr.com//65535//49226383598_6f8be86a06.jpg',
        description:
          'Удоды предпочитают жить на открытых ландшафтах с отдельными деревьями или рощами. Наиболее удобными для птицы являются лесостепь и саванна. Удод может выбирать места жительства рядом с человеком: пастбища, виноградники, фруктовые сады.',
        enDescript: 'Upupa epops',
      },
      {
        id: 5,
        name: 'Стриж',
        src: 'https://www.xeno-canto.org/sounds/uploaded/TMUAWSDHDJ/XC511871-G.mp3',
        img: 'https://live.staticflickr.com//65535//48386150031_7b749df74b.jpg',
        description:
          'Стрижа можно увидеть практически в каждом уголке планеты. Они обитают как в лесных зонах, так и на открытых местностях. Живут стрижи крупными стаями. Большие колонии этих птиц можно увидеть в городах или на прибрежных скалах.',
        enDescript: 'Apus apus',
      },
    ],
  },
  {
    class: 'Певчие птицы',
    classEn: 'Songbirds',
    songs: [
      {
        id: 0,
        name: 'Жаворонок',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC462158-Skowronek_Alauda_arvensis_Poland_Jarek_Matusiak_%20-006%20skowronek%20%282%29.mp3',
        img: 'https://live.staticflickr.com/65535/47105096764_f751fba568.jpg',
        description:
          'Жаворонки — перелетные птицы. С начала сентября они отлетают на юг. Возвращаются они в начале марта, независимо от того, сошел снег или нет. По прилету жаворонков определяли наступление весны и пору, когда пора пахать землю.',
        enDescript: 'Alauda arvensis',
      },
      {
        id: 1,
        name: 'Соловей',
        src: 'https://www.xeno-canto.org/sounds/uploaded/HILVWSADVL/XC513809-R07_0052%20Thrush%20Nightingale%20Snipe.mp3',
        img: 'https://live.staticflickr.com/7605/27669397735_f3c21758f2.jpg',
        description:
          'Соловьи поют с начала мая и до конца лета. Каждая песня соловья состоит из 12 повторяющихся элементов, которые еще называют коленами. Кроме собственных трелей, соловьи легко и хорошо перенимают пение других птиц.',
        enDescript: 'Luscinia luscinia',
      },
      {
        id: 2,
        name: 'Скворец',
        src: 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC515519-2020.01.01_17.24_01.MP3',
        img: 'https://live.staticflickr.com/65535/49357593971_9509fe1d7c.jpg',
        description:
          'Скворцы - перелётные птицы. Синхронный перелет больших стай скворцов называется мурмурацией. Это красивое и завораживающее явление – множество птиц будто танцуют в воздухе, образуя замысловатые фигуры, которые уменьшаются и увеличиваются в небе.',
        enDescript: 'Sturnus vulgaris',
      },
      {
        id: 3,
        name: 'Иволга',
        src: 'https://www.xeno-canto.org/sounds/uploaded/GYAUIPUVNM/XC491801-2019.07.07_06.28_01.mp3',
        img: 'https://live.staticflickr.com/65535/47102184004_58a93380b9.jpg',
        description:
          'Мелодичность голоса иволги сравнивают со звучанием флейты. Человеку сложно разглядеть иволгу, так как она обитает высоко на деревьях. Иволга не только очень красивая, но и  полезная птица. Она уничтожает ядовитых гусениц, которых не поедают другие птицы.',
        enDescript: 'Oriolus oriolus',
      },
      {
        id: 4,
        name: 'Свиристель',
        src: 'https://www.xeno-canto.org/sounds/uploaded/ZNCDXTUOFL/XC517421-AB-004%20%282%29%20jemio%C5%82uszka.mp3',
        img: 'https://live.staticflickr.com//65535//49367433842_1b06da0e6b.jpg',
        description:
          'У свиристели очень цепкие коготки, что помогает птице удерживаться на ветках и склевывать ягоды, которые труднее всего достать. В период ухаживаний самец предлагает самке ягоду или другое угощение. Если самка его принимает, то птицы создают пару.',
        enDescript: 'Bombycilla garrulus',
      },
      {
        id: 5,
        name: 'Щегол',
        src: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC489265-190724_07.58h_putter_biesbosch_%20boompjes%20langs%20open%20water_zang_1ex_ad_niet%20gezien_.mp3',
        img: 'https://live.staticflickr.com//65535//49366257253_db3ce48b9a.jpg',
        description:
          'Щеглы поют красиво и мелодично. И в природе, и в неволе они щебечут почти круглый год. В пении щегла различают более 20 переливчатых трелей. Щеглы привыкают к людям, и даже могут возвратиться к хозяину после того, как их выпустили на волю',
        enDescript: 'Carduelis carduelis',
      },
    ],
  },
  {
    class: 'Хищные птицы',
    classEn: 'Predator birds',
    songs: [
      {
        id: 0,
        name: 'Орёл',
        src: 'https://www.xeno-canto.org/sounds/uploaded/KTBTZAHSXF/10_Aquila_nipalensis_al02D85.mp3',
        img: 'https://live.staticflickr.com//4835//43867392960_7105d71e19.jpg',
        description:
          'В древние времена орел был символом солнца. Орлы часто парят над землей, при этом скорость их перемещения может достигать 240 км/ч. Иллюзия медленного движения происходит из-за высоты полета – более 700 метров',
        enDescript: 'Aquila nipalensis',
      },
      {
        id: 1,
        name: 'Коршун',
        src: 'https://www.xeno-canto.org/sounds/uploaded/SDPCHKOHRH/XC485740-2019-06-22%20Selenga%20Milan%20brun%20cris%20de%20quemandage%203.mp3',
        img: 'https://live.staticflickr.com//65535//48701190276_ee2a9ed594.jpg',
        description:
          'Коршуны – крупные хищники, в высоту они достигают около полуметра, а вес взрослых особей достигает 1 кг. Крылья узкие и длинные, их размах составляет 1,5 м. Коршуны часто гнездятся большими стаями и даже образуют крупные колонии.',
        enDescript: 'Milvus migrans',
      },
      {
        id: 2,
        name: 'Лунь',
        src: 'https://www.xeno-canto.org/sounds/uploaded/BLMSIUFTFU/XC513498-190709_1175_Cir.cyan-f.mp3',
        img: 'https://live.staticflickr.com/4480/37240531151_b74619c99d.jpg',
        description:
          'Лунь – это небольшой сокол. Питается в основном мышевидными грызунами, основа его рациона – полёвки, хомяки, мыши. Оперение луня может быть пепельно-серым. С такой птицей связано сравнение «седой, как лунь».',
        enDescript: 'Circus cyaneus',
      },
      {
        id: 3,
        name: 'Сокол',
        src: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC496049-Pilgrimsfalk_06.mp3',
        img: 'https://live.staticflickr.com//65535//49310710607_92a3a145a9.jpg',
        description:
          'Латинское название сокола Falco произошло от слова «серп» из-за серповидной формы крыльев. Длинные и широкие крылья позволяют соколу высоко подниматься в небо и свободно парить. Скорость полёта сокола достигает 280-320 километров в час.',
        enDescript: 'Falco peregrinus',
      },
      {
        id: 4,
        name: 'Ястреб',
        src: 'https://www.xeno-canto.org/sounds/uploaded/MMEJYLOPDO/XC512740-Duvh%C3%B6k_09.mp3',
        img: 'https://live.staticflickr.com//65535//49024617331_b9d0d2c9b3.jpg',
        description:
          'Для всех ястребов характерны широкие и короткие крылья. Ещё один отличительный признак - белые «брови» над глазами. Славянские дружинники размещали изображение ястреба на своих знаменах, как символ отваги, мощи и безжалостности к врагам.',
        enDescript: 'Accipiter gentilis',
      },
      {
        id: 5,
        name: 'Филин',
        src: 'https://www.xeno-canto.org/sounds/uploaded/WNLIDKJKXT/XC518386-sense%20t%C3%ADtol.mp3',
        img: 'https://live.staticflickr.com/65535/48137123012_393653c2e4.jpg',
        description:
          'Полет филина бесшумный, зрение очень острое. Эти особенности делают птицу непревзойденным ночным охотником. У филина нет естественных врагов, ни один зверь не охотится на взрослых птиц. А вот на птенцов нападают лисы и волки.',
        enDescript: 'Bubo bubo',
      },
    ],
  },
  {
    class: 'Морские птицы',
    classEn: 'Sea birds',
    songs: [
      {
        id: 0,
        name: 'Альбатрос',
        src: 'https://www.xeno-canto.org/sounds/uploaded/WOEAFQRMUD/XC293087-Diomedea%20exulans151120_T254.mp3',
        img: 'https://live.staticflickr.com/7557/16260253965_8e9430cb66.jpg',
        description:
          'Альбатрос - самая крупная летающая птица в мире. Размах крыльев достигает три с половиной, вес - десять килограммов. Большую часть жизни альбатросы проводят в воздухе, покрывая над океанскими просторами огромные расстояния',
        enDescript: 'Diomedea exulans',
      },
      {
        id: 1,
        name: 'Олуша',
        src: 'https://www.xeno-canto.org/sounds/uploaded/YHKQPPJDVP/XC411507-171217_1491%20BF%20Booby%205ft%20IDLP%201230%20mp3%20amp.mp3',
        img: 'https://live.staticflickr.com/800/40645471394_4422e69ed8.jpg',
        description:
          'Особенностью голубоногой олуши является не только насыщенный ярко-синий цвет лапок, но еще и тот факт, что они очень теплые. В то время как другие виды птиц греют кладки своим телом, голубоногая олуша делает это с помощью лапок',
        enDescript: 'Sula nebouxii',
      },
      {
        id: 2,
        name: 'Буревестник',
        src: 'https://www.xeno-canto.org/sounds/uploaded/XQEVNREHJY/SHEARWATER%20Christmas%20Island_04_Motu_Isla%20de%20Pascua-Easter%20Island_CH_4MAR03_Alvaro%20Jaramillo.mp3',
        img: 'https://live.staticflickr.com//607//22136056020_935cb113f9.jpg',
        description:
          'Размеры буревестниковых разные. Самые маленькие из них в длину составляют до 25 см, самые большие - до 1 м, при размахе крыльев около 2 м. Существует поверье, что появление буревестника в воздухе предвещает бурю, о чем говорит само название птицы.',
        enDescript: 'Puffinus griseus',
      },
      {
        id: 3,
        name: 'Пеликан',
        src: 'https://www.xeno-canto.org/sounds/uploaded/XAMHIHFTZG/XC331138-call1.mp3',
        img: 'https://live.staticflickr.com/65535/49159147156_dcbbb5c12a.jpg',
        description:
          'Пеликаны — обитатели морей и рек. Ходят они неуклюже, но хорошо летают и плавают. Питаются в основном рыбой, устраивают коллективные охоты — выстроившись полукругом хлопают по воде крыльями и клювами и вытесняют напуганную рыбу на мелководье.',
        enDescript: 'Pelecanus',
      },
      {
        id: 4,
        name: 'Пингвин',
        src: 'https://www.xeno-canto.org/sounds/uploaded/OOECIWCSWV/XC449827-LS100829%20King%20Penguin%20call%20A.mp3',
        img: 'https://live.staticflickr.com/5202/5252413926_8e013a3efd.jpg',
        description:
          'Самец императорского пингвина достигает роста 130 см, его масса может приближаться к 50 кг. Из всех современных пингвинов этот вид – самый крупный. Питание пингвина состоит из рыбы, кальмаров и криля. Охотятся птицы в океане большими группами.',
        enDescript: 'Aptenodytes forsteri',
      },
      {
        id: 5,
        name: 'Чайка',
        src: 'https://www.xeno-canto.org/sounds/uploaded/VOLIQOYWKG/XC501190-190801_06.50h_zilvermeeuw_duinen%20van%20goeree_roep_2ex_overvliegend_gezien_.mp3',
        img: 'https://live.staticflickr.com/65535/48577115317_7034201dde.jpg',
        description:
          'Чайки населяют берега морей, озёр, рек, водохранилищ, болот, часто гнездятся на островах. С конца прошлого века чайки стали появляться в крупных городах, где устраивает гнёзда на крышах зданий. Все чайки ведут колониальный образ жизни.',
        enDescript: 'Larus argentatus',
      },
    ],
  },
];
// import createAudio from '../JS/Player'

function createAudio(src, conteiner, mainClass, audio) {
  audio.src = src;
  audio.load();
  let playerDiv = document.createElement('div');
  playerDiv.className = mainClass;
  let durationDiv = document.createElement('div');
  durationDiv.className = 'player__duration';
  let volumeDiv = document.createElement('div');
  volumeDiv.className = 'player__volume';
  let imgPlay = document.createElement('img');
  imgPlay.src = '../../assets/images/play.png';
  imgPlay.className = 'play-btn';
  let duration = document.createElement('input');
  duration.className = 'player__duration_range';
  duration.type = 'range';
  duration.min = '0';
  duration.step = '1';
  duration.value = audio.currentTime;
  let valumeRange = document.createElement('input');
  valumeRange.className = 'player__volume_range';
  valumeRange.type = 'range';
  valumeRange.min = '0';
  valumeRange.max = '100';
  valumeRange.step = '1';
  valumeRange.value = '30';
  let gradient = 0;
  let muteBtn = document.createElement('img');
  muteBtn.src = '../../assets/images/volume_on.png';
  muteBtn.className = 'play-btn';
  duration.style.background = `linear-gradient(to right, #1876ce; ${gradient}%, #3c85f3 ${gradient}%)`;
  valumeRange.style.background = `linear-gradient(to right, #1876ce; ${valumeRange.value}%, #3c85f3 ${valumeRange.value}%)`;
  let curTime = document.createElement('p');
  let durationOf = document.createElement('p');
  audio.onloadedmetadata = () => {
    duration.max = audio.duration;
    durationOf.textContent = setTime(audio.duration);
  };
  durationDiv.append(imgPlay, duration);
  volumeDiv.append(muteBtn, valumeRange, curTime, durationOf);
  playerDiv.append(durationDiv, volumeDiv);
  conteiner.append(playerDiv);
  imgPlay.addEventListener('click', () => {
    if (mainClass == 'player') {
      audio2.pause();
    } else {
      audio1.pause();
    }
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  });
  duration.addEventListener('input', () => {
    audio.currentTime = duration.value;
    gradient = (+duration.value * 100) / audio.duration;
    duration.style.background = `#1876ce;`;
  });
  audio.addEventListener('timeupdate', () => {
    if (audio.paused) {
      imgPlay.src = '../../assets/images/play.png';
    } else {
      imgPlay.src = '../../assets/images/pause_icon.png';
    }
    duration.value = audio.currentTime;
    gradient = (+duration.value * 100) / audio.duration;
    duration.style.background = `linear-gradient(to right, #3c85f3  ${gradient}%, #5ba3e6 ${gradient}%)`;
    curTime.textContent = setTime(audio.currentTime) + ' /';
  });
  valumeRange.addEventListener('input', () => {
    audio.volume = valumeRange.value / 100;
    valumeRange.style.background = `linear-gradient(to right, #3c85f3 ${valumeRange.value}%, #5ba3e6 ${valumeRange.value}%)`;
  });
  muteBtn.addEventListener('click', () => {
    if (audio.volume == 0) {
      audio.volume = valumeRange.value / 100;
      muteBtn.src = '../../assets/images/volume_on.png';
    } else {
      audio.volume = 0;
      muteBtn.src = '../../assets/images/volume_off.png';
    }
  });
}

function play(win) {
  if (win) {
    winSound.play();
  } else {
    errorSound.play();
  }
}

function setTime(time) {
  let minutes = Math.floor(time / 60);
  let seconds = '' + parseInt(time - minutes * 60);
  if (seconds.split('').length == 1) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}

let currentAnswerSong;
function randomSong(index) {
  if (index) {
    currentAnswerSong = AudioArr[currentGenge].songs[index].id;
    return AudioArr[currentGenge].songs[index].src;
  } else {
    let randomNum = Math.floor(Math.random() * 5);
    currentAnswerSong = AudioArr[currentGenge].songs[randomNum].id;
    return AudioArr[currentGenge].songs[randomNum].src;
  }
}

nextBtn.addEventListener('click', () => {
  currentGenge++;
  mainEl = '';
  wrongAnswersArr = [];
  if (currentGenge != 6) {
    delAudio();
    delAudio(true);
    delPreview();
    delVariants();
    rightAnswer.textContent = '*******';
    rightImage.src = '../../assets/images/bird-skeleton1.jpg';
    createAudio(randomSong(), conteiner, 'player', audio1);
    createVariants(currentGenge);
    createGenre();
    inGame = true;
    maxScore = 5;
    textPreview.style.display = 'block';
    nextBtn.setAttribute('disabled', true);
  } else {
    window.location.href = '../results/index.html';
    localStorage.setItem('SongBirdScore', JSON.stringify(mainScore));
    localStorage.removeItem('SongBirdVictorineSettings');
  }
  if (currentGenge == 5) {
    if (curLangRus) {
      nextBtn.textContent = 'Посмотреть результаты';
    } else {
      nextBtn.textContent = 'Show results';
    }
  }
});

function createGenre() {
  let genreList = document.querySelector('.main__header_list');
  AudioArr.forEach((item, i) => {
    let liElement = document.createElement('li');
    liElement.classList = 'main__header_item';
    answersList.push(liElement);
    if (currentGenge == i) {
      liElement.classList.add('active-genre');
    }
    if (curLangRus) {
      liElement.textContent = item.class;
    } else {
      liElement.textContent = item.classEn;
    }
    genreList.append(liElement);
  });
}

function delAudio(num) {
  let delDiv;
  if (num) {
    delDiv = document.querySelector('.player');
  } else {
    delDiv = document.querySelector('.player2');
  }
  if (delDiv != null) {
    delDiv.remove();
  }
}
function delPreview() {
  previewList.forEach((el) => el.remove());
  previewList = [];
}

function delVariants() {
  answersList.forEach((item) => {
    item.remove();
  });
  answersList = [];
}

let el = '';
let mainEl = '';
let wrongAnswersArr = [];
function createVariants(index) {
  let genre = AudioArr[index];
  let ulWithAnswers = document.querySelector('.main__answers_list');
  genre.songs.forEach((element) => {
    let liAnswer = document.createElement('li');
    answersList.push(liAnswer);
    liAnswer.className = 'main__answers_item';
    if (curLangRus) {
      liAnswer.textContent = element.name;
    } else {
      if (element.EnName) {
        liAnswer.textContent = element.EnName;
      } else {
        liAnswer.textContent = element.name;
      }
    }
    ulWithAnswers.append(liAnswer);
    liAnswer.addEventListener('click', () => {
      el = element;
      textPreview.style.display = 'none';
      if (element.id != currentAnswerSong) {
        if (inGame) {
          play();
          if (!liAnswer.classList.contains('wrongAnswer')) {
            maxScore--;
          }
          liAnswer.classList.add('wrongAnswer');
          wrongAnswersArr.push(element.id);
          audio1.play();
        }
      } else {
        mainEl = element;
        audio1.pause();
        liAnswer.classList.add('correctAnswer');
        if (inGame) {
          mainScore += maxScore;
          play(true);
        }
        inGame = false;
        nextBtn.removeAttribute('disabled');
        rightAnswer.textContent = element.name;
        rightImage.src = element.img;
        totalScoreHtml.textContent = mainScore;
      }
      delPreview();
      delAudio();
      createPreview(element);
    });
  });
}

function createPreview(element) {
  if (element != '') {
    let preview = document.querySelector('.main__show');
    let container = document.createElement('div');
    container.className = 'main__show_container';
    let img = document.createElement('img');
    img.className = 'main__show_img';
    img.src = element.img;
    let artistName = document.createElement('p');
    artistName.className = 'main__show_name';
    artistName.textContent = element.name;
    let description = document.createElement('p');
    createAudio(element.src, preview, 'player2', audio2);
    description.className = 'main__show_description';
    if (curLangRus) {
      description.textContent = element.description;
    } else {
      description.textContent = element.enDescript;
    }
    previewList.push(container);
    container.append(img, artistName, description);
    preview.append(container);
  }
}

let headerList = document.querySelectorAll('.link');
let footerList = document.querySelectorAll('.link-footer');
let scorePTag = document.querySelector('.main__score_text');
let variants = document.querySelector('.main__answers_text');
let footerBtn1 = document.querySelector('.footer_btn');
let footerText = document.querySelector('.footer_wrap_email_text');
let footerBtn2 = document.querySelector('.inp_btn');

function changeLangFunc() {
  if (curLangRus) {
    changeLang.textContent = 'En';
    headerList[0].textContent = 'Главная';
    headerList[3].textContent = 'Главная';
    headerList[1].textContent = 'Викторина';
    headerList[4].textContent = 'Викторина';
    headerList[2].textContent = 'Результаты';
    headerList[5].textContent = 'Результаты';
    footerList[0].textContent = 'Главная';
    footerList[1].textContent = 'Викторина';
    footerList[2].textContent = 'Результаты';
    scorePTag.textContent = 'Очки';
    nextBtn.textContent = 'Следующий вопрос';
    variants.textContent = 'Варианты ответа';
    textPreview.textContent =
      'Послушайте плеер.Выберите птицу из списка.';
    footerBtn1.textContent = 'Cохранить игру';
    //footerText.textContent = 'Подпишитесь на новые викторины';
    //footerBtn2.textContent = 'Подтвердить';
  } else {
    changeLang.textContent = 'Ru';
    headerList[0].textContent = 'Main';
    headerList[3].textContent = 'Main';
    headerList[1].textContent = 'Victorine';
    headerList[4].textContent = 'Victorine';
    headerList[2].textContent = 'Gallery';
    headerList[5].textContent = 'Gallery';
    footerList[0].textContent = 'Main';
    footerList[1].textContent = 'Victorine';
    footerList[2].textContent = 'Gallery';
    scorePTag.textContent = 'Score';
    nextBtn.textContent = 'Next question';
    variants.textContent = 'Variants';
    textPreview.textContent = 'Listen to the player. Select a bird from the list.';
    footerBtn1.textContent = 'Save game';
    footerText.textContent = 'Subscribe to new victorines';
    footerBtn2.textContent = 'Confirm';
  }
  delAudio();
  delPreview();
  delVariants();
  createPreview(el);
  createVariants(currentGenge);
  createGenre();
}

changeLang.addEventListener('click', () => {
  curLangRus = !curLangRus;
  changeLangFunc();
  saveToLS(true);
});

function saveToLS(language) {
  if (language) {
    localStorage.setItem('SongBirdCurLanguage', JSON.stringify(curLangRus));
  } else {
    let obj = {
      curLangRus,
      currentGenge,
      maxScore,
      mainScore,
      inGame,
      currentAnswerSong,
      el,
      mainEl,
      wrongAnswersArr,
    };
    localStorage.setItem('SongBirdVictorineSettings', JSON.stringify(obj));
  }
}

footerBtn1.addEventListener('click', () => {
  saveToLS();
});

if (localStorage.getItem('SongBirdVictorineSettings')) {
  let obj = JSON.parse(localStorage.getItem('SongBirdVictorineSettings'));
  curLangRus = obj.curLangRus;
  currentGenge = obj.currentGenge;
  maxScore = obj.maxScore;
  mainScore = obj.mainScore;
  stopPlay = obj.stopPlay;
  inGame = obj.inGame;
  currentAnswerSong = obj.currentAnswerSong;
  el = obj.el;
  mainEl = obj.mainEl;
  wrongAnswersArr = [...obj.wrongAnswersArr];
  if (el != '') {
    textPreview.style.display = 'none';
  }
  if (mainEl != '') {
    rightAnswer.textContent = mainEl.name;
    rightImage.src = mainEl.img;
    createAudio(mainEl.src, conteiner, 'player', audio1);
    nextBtn.removeAttribute('disabled');
  } else {
    createAudio(randomSong(currentAnswerSong), conteiner, 'player', audio1);
  }
  totalScoreHtml.textContent = mainScore;
  changeLangFunc();
  answersList.forEach((element, i) => {
    if (i == mainEl.id) {
      element.classList.add('correctAnswer');
    }
    wrongAnswersArr.forEach((id) => {
      if (i == id) {
        element.classList.add('wrongAnswer');
      }
    });
  });
  if (currentGenge == 5) {
    if (curLangRus) {
      nextBtn.textContent = 'Посмотреть результаты';
    } else {
      nextBtn.textContent = 'Show results';
    }
  }
} else if (localStorage.getItem('SongBirdCurLanguage')) {
  curLangRus = JSON.parse(localStorage.getItem('SongBirdCurLanguage'));
  changeLangFunc();
  createAudio(randomSong(), conteiner, 'player', audio1);
} else {
  createAudio(randomSong(), conteiner, 'player', audio1);
  createGenre();
  createVariants(currentGenge);
}

let closeBtn = document.querySelector('.close_btn');
let hideMenu = document.querySelector('.hidden_menu');
let burger = document.querySelector('.burger_menu');
let menuList = document.querySelector('.hidden_menu_list');

closeBtn.addEventListener('click', () => {
  hideMenu.style.opacity = 0;
  menuList.style.height = '0px';
  setTimeout(() => {
    hideMenu.style.display = 'none';
  }, 900);
});
burger.addEventListener('click', () => {
  activeHeader[7].classList.add('focused');
  hideMenu.style.display = 'flex';
  hideMenu.style.opacity = 1;
  setTimeout(() => {
    menuList.style.height = '329px';
  }, 100);
});
menuList.addEventListener('click', (e) => {
  e.stopPropagation();
});
hideMenu.addEventListener('click', () => {
  hideMenu.style.opacity = 0;
  menuList.style.height = '0px';
  setTimeout(() => {
    hideMenu.style.display = 'none';
  }, 700);
});
