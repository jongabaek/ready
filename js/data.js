// 세션 상세 데이터. (예시) 문구는 연사가 보낸 발표 개요·약력으로 교체한다.
// key = 통합관리시트 집계 키(세션 플래너 상태 연결용)
window.WCF_PROG = {
 "stage": {
  "name": "The Stage",
  "room": "4F · 컨퍼런스룸 401호",
  "anchor": "programs"
 },
 "sessions": {
  "name": "The Sessions",
  "room": "3F · 컨퍼런스룸 301호",
  "anchor": "programs"
 },
 "origin": {
  "name": "Origin Discovery",
  "room": "3F · 컨퍼런스룸 300호",
  "anchor": "programs"
 },
 "sca": {
  "name": "SCA Education",
  "room": "3F · 컨퍼런스룸 317호",
  "anchor": "programs"
 },
 "champion": {
  "name": "Champion Live",
  "room": "3F · 컨퍼런스룸 318호",
  "anchor": "programs"
 },
 "futures": {
  "name": "Coffee Futures Challenge",
  "room": "3F · 컨퍼런스룸 300호",
  "anchor": "programs"
 },
 "gala": {
  "name": "Asia-Pacific's 100 Best Coffee Shops GALA",
  "room": "4F · 컨퍼런스룸 401호",
  "anchor": "programs"
 }
};
window.WCF_SESSIONS = [
 {
  "id": "stage-open",
  "prog": "stage",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "10:00",
  "e": "10:30",
  "color": "#96C263",
  "title": "개회",
  "speakers": [],
  "overview": [
   "(예시) 제15회 월드커피포럼 더 스테이지 개회가 진행됩니다."
  ]
 },
 {
  "id": "stage-1",
  "prog": "stage",
  "key": "F_Q1",
  "day": "11.12",
  "s": "10:30",
  "e": "11:00",
  "cat": "Taste & Master",
  "color": "#8DBE5A",
  "title": "우리는 왜 커피를 마시는가? 커피에 매료된 500년의 역사",
  "speakers": [
   {
    "name": "피터 줄리아노 Peter Giuliano",
    "role": "Senior Advisor, SCA",
    "photo": "assets/sp/giuliano.jpg",
    "bio": "1988년부터 바리스타, 로스터, 커피 테이스터, 바이어, 교육자로 커피 업계에서 일해 왔다. 카운터 컬처 커피의 공동 소유주이자 커피 디렉터를 지냈고, 2011–2012년 SCA 회장을 역임했다. 커피과학재단(Coffee Science Foundation)을 설립했으며, 현재 SCA 시니어 어드바이저로 커피 산업에 도움이 되는 과학·경제 연구를 알리고 있다."
   }
  ],
  "overview": [
   "커피는 영양가가 거의 없고, 익숙해져야 맛을 알며, 생산에 큰 노력이 드는 음료입니다. 그런데도 왜 수많은 사람이 커피를 사랑할까요? 최초의 아라비아 커피하우스부터 최신 소비자 연구까지 따라가며, 500년 전과 지금 사람들이 커피를 마시는 네 가지 이유와 그것이 커피 산업의 혁신에 주는 힌트를 소개합니다."
  ],
  "dow": "목"
 },
 {
  "id": "stage-2",
  "prog": "stage",
  "key": "F_Q1",
  "day": "11.12",
  "s": "11:00",
  "e": "11:30",
  "cat": "Routine & Ritual",
  "color": "#F08A4B",
  "title": "한 잔의 시간 — 매일의 한 잔은 어떻게 의식이 되고, 다음 세대로 이어지는가",
  "speakers": [
   {
    "name": "조희경",
    "role": "CEO, Hwayo",
    "photo": "assets/sp/cho.jpg",
    "bio": "화요그룹 대표. 2003년 끊어졌던 쌀 증류주의 맥을 ‘화요’로 다시 세웠고, 광주요·화요·한식 레스토랑으로 이어지는 ‘그릇·술·자리’의 브랜드를 이끌고 있다."
   }
  ],
  "overview": [
   "다음 메뉴를 정할 때 우리는 지금 뜨는 것을 볼까요, 내가 믿는 것을 볼까요? ‘화요’를 세운 경험과 ‘그릇·술·자리’의 이야기를 바탕으로 유행을 좇는 브랜드와 기준을 세우는 브랜드의 차이를 이야기합니다. 매일 한 잔을 내리는 카페 운영자에게 “나의 잔, 나의 음료, 나의 테이블은 같은 이야기를 하고 있는가”를 묻습니다."
  ],
  "dow": "목"
 },
 {
  "id": "stage-3",
  "prog": "stage",
  "key": "F_Q1",
  "day": "11.12",
  "s": "13:00",
  "e": "13:30",
  "cat": "Space & Experience",
  "color": "#2A9FD6",
  "title": "전통과 지역성의 재발견: 커피와 차를 매개로 한 공간 경험의 제안",
  "speakers": [
   {
    "name": "양태오",
    "role": "Creative Director, Teo Yang Studio",
    "photo": "assets/sp/yang.jpg",
    "bio": "한국의 전통과 유산을 현대적인 디자인 언어로 번역하는 디자이너이자 기업가. 유럽과 미국에서 공간 디자이너로 일한 뒤 북촌 한옥에 태오양 스튜디오를 열고, 국립경주박물관·국립한글박물관·블루보틀 등 다양한 공간을 디렉팅했다. 2022년 한국 최초로 AD100 세계 100대 디자인 스튜디오에 선정됐다."
   }
  ],
  "overview": [
   "블루보틀 커피, 무미다점, 엘리먼츠 등의 사례를 중심으로 커피를 매개로 브랜드와 고객의 접점을 만드는 과정을 공유합니다. 지역의 고유한 맥락과 브랜드 정체성을 공간으로 풀어내는 디자인 철학을 통해, 전통과 지역성을 바라보는 동시대적 시선이 커피 경험에 어떤 가치를 더할 수 있는지 제안합니다."
  ],
  "dow": "목"
 },
 {
  "id": "stage-4",
  "prog": "stage",
  "key": "F_Q1",
  "day": "11.12",
  "s": "13:30",
  "e": "14:00",
  "cat": "Space & Experience",
  "color": "#2A9FD6",
  "title": "K-믹스커피, 한국의 인상이 되다",
  "speakers": [
   {
    "name": "김규림",
    "role": "Brand Director, newmix",
    "photo": "assets/sp/kim-kyurim.jpg",
    "bio": "배달의민족에서 약 10년간 마케터이자 제품 기획자로 일하며 배민문방구를 만들었다. 2023년 그란데클립에 합류해 믹스커피를 ‘한국의 기념품’으로 다시 정의한 뉴믹스(newmix)를 론칭, 브랜드 전반을 디렉팅하고 있다. 『아무튼, 문구』 『일놀놀일』 등 여섯 권의 책을 썼다."
   }
  ],
  "overview": [
   "믹스커피로 한국의 이미지를 설계해 가는 팀 뉴믹스. 한국인의 일상 어디에나 있지만 아무도 신경 쓰지 않았던 믹스커피를 재조명해, 한국의 인상을 담은 대표 기념품으로 만들어 갑니다. 방문객 대부분이 해외 관광객인 뉴믹스가 ‘한국다움’을 다시 정의하고, 플레이버와 매장 경험으로 한국을 기억하게 만드는 방식을 소개합니다."
  ],
  "dow": "목"
 },
 {
  "id": "stage-pair",
  "prog": "stage",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "14:00",
  "e": "14:30",
  "color": "#D7E8C4",
  "title": "페어링 테이블 & 커피 브레이크",
  "speakers": [],
  "overview": [
   "페어링 테이블은 더 스테이지 중간에 진행되는 맛과 교류의 시간입니다. 커피 한 잔과 디저트 한 입이 만드는 여유 속에서 새로운 영감과 네트워킹의 기회를 만나 보세요.",
   "장소: 4F 401호 로비"
  ],
  "partners": [
   {
    "group": "커피 & 티 파트너",
    "items": [
     {
      "name": "큐앤리브즈",
      "sub": "KEW&LEAVES",
      "desc": "‘100년 후에도 사랑받는 블렌딩티’를 만들어 가는 한국의 블렌딩티 전문 브랜드입니다. 마스터 티 블렌더 성현진 대표가 세계 각지에서 엄선한 찻잎과 한국의 특산물을 조합해 한국에서만 만날 수 있는 블렌딩티를 선보이며, 벨기에 국제미각상(iTQi) 3관왕을 비롯한 국내외 수상으로 맛과 품질을 인정받았습니다. 특급 호텔과 전국의 카페에서 사랑받는 블렌딩티를 일상 속으로 전하고 있습니다.",
      "featured": {
       "title": "시그니처 티백 9종 컬렉션",
       "note": "홍차부터 우롱차, 허브차, 보이차까지 다양한 베이스와 풍미를 비교하며 나만의 차 취향을 발견할 수 있는 대표 티 9종입니다.",
       "list": [
        [
         "No.163 플라워 가든",
         "인도·스리랑카 홍차에 꽃잎과 머스캣 향을 더한 화사한 블렌딩"
        ],
        [
         "No.341 카라멜 티메리카노",
         "인도 홍차에 국산 볶은 커피콩과 카라멜 향을 더한 고소하고 은은한 단맛"
        ],
        [
         "No.741 레모니 우롱",
         "부드러운 우롱에 레몬머틀과 페퍼민트를 더한 깔끔하고 청량한 풍미"
        ],
        [
         "No.168 서울 브렉퍼스트",
         "한국·인도·스리랑카 홍차와 국산 볶은 약콩의 구수하고 부드러운 맛"
        ],
        [
         "No.612 시트러스 러브",
         "iTQi 3스타 베스트셀러. 루이보스에 국산 귤피·레몬머틀·카모마일"
        ],
        [
         "No.113 블랙유주",
         "11월 고흥 유자에 루이보스와 로즈플라워를 더한 새콤달콤한 향"
        ],
        [
         "No.327 노들 얼그레이",
         "베르가못에 로즈·피치 향과 제주 홍차의 감칠맛을 담은 얼그레이"
        ],
        [
         "No.181 베러댄초코",
         "보이차에 카카오닙스·초콜릿·크림 아로마를 더한 깊은 초콜릿 풍미"
        ],
        [
         "No.508 로지피치",
         "부드러운 우롱에 장미·복숭아·살구 향을 더한 과일 향과 꽃향기"
        ]
       ]
      },
      "id": "kewleaves"
     },
     {
      "name": "뉴믹스",
      "desc": "",
      "id": "newmix"
     },
     {
      "name": "커피명가",
      "desc": "",
      "id": "myungga"
     },
     {
      "name": "모닌",
      "desc": "",
      "id": "monin"
     }
    ]
   },
   {
    "group": "디저트 파트너",
    "items": [
     {
      "name": "카페 라이츠",
      "desc": "",
      "id": "wrights"
     }
    ]
   }
  ]
 },
 {
  "id": "stage-5",
  "prog": "stage",
  "key": "F_Q1",
  "day": "11.12",
  "s": "14:30",
  "e": "15:00",
  "cat": "Connection & Networking",
  "color": "#6F6FB0",
  "title": "유튜브에서 시작된 커피 플랫폼 이야기",
  "speakers": [
   {
    "name": "안치훈",
    "role": "CEO, unspecialty",
    "photo": "assets/sp/an.jpg",
    "bio": "커피 콘텐츠 크리에이터로 유튜브 ‘안스타’를 운영한다. 스페셜티 커피 플랫폼 언스페셜티(unspecialty)와 한남동 카페 언페이지(unpage)의 대표를 맡고 있다."
   }
  ],
  "overview": [
   "26만 명이 커피 영상을 보지만, 조회수는 관계가 아닙니다. 유튜브 ‘안스타’에서 원두 큐레이션, 온라인 커피 교육, 카페 ‘언페이지’로 확장해 온 언스페셜티의 경험을 바탕으로, 콘텐츠가 만든 관심을 소속감으로 바꾸고 지속 가능한 커피 비즈니스로 키우는 ‘세 겹의 연결’을 이야기합니다."
  ],
  "dow": "목"
 },
 {
  "id": "stage-fireside",
  "prog": "stage",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "15:00",
  "e": "15:40",
  "color": "#96C263",
  "title": "패널 토크",
  "speakers": [
   {
    "name": "탁승희",
    "role": "Bean Voyage 공동 창업자·대표 · 모더레이터",
    "photo": "",
    "bio": "코스타리카와 멕시코의 여성 소농들과 함께 커피 산업의 지속가능성을 만들어 가는 사회적 기업 Bean Voyage의 공동 창업자이자 대표. 여성 커피 농부들의 교육과 시장 접근을 지원하며 커피 산업 내 불평등을 해소하고 더 나은 가치사슬을 만드는 일에 힘써 왔다. 글로벌 커피 매거진 기고와 국제 커피 행사의 강연·패널 진행으로 생산 현장의 목소리와 산업의 다양한 관점을 전하고 있다."
   }
  ],
  "overview": [
   "커피 한 잔이 만들어지기까지, 우리는 얼마나 많은 이야기를 알고 있을까요? 커피 산업을 둘러싼 다양한 목소리를 연결하고 새로운 관점으로 이야기를 나누는 시간입니다. Bean Voyage 탁승희 대표가 모더레이터로 함께합니다."
  ],
  "speakerLabel": "모더레이터",
  "overviewLabel": "소개",
  "metaLabel": "진행"
 },
 {
  "id": "stage-award",
  "prog": "stage",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "15:40",
  "e": "16:30",
  "color": "#96C263",
  "title": "연사 감사패 수여 및 카페쇼 엑설런스 어워드",
  "speakers": [],
  "overview": [
   "(예시) 더 스테이지 연사 감사패 수여와 카페쇼 엑설런스 어워드 시상이 진행됩니다."
  ]
 },
 {
  "id": "stage-dj",
  "prog": "stage",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "16:30",
  "e": "17:00",
  "color": "#D7E8C4",
  "title": "도덕과 규범 디제잉",
  "speakers": [],
  "overview": [
   "카페쇼 엑설런스 어워드가 끝나면, 마포의 로스터리 카페 ‘도덕과 규범’이 GALA가 시작되기 전까지 401호를 음악으로 채웁니다. 스트리밍 대신 빈티지 바이닐과 CD로 음악을 들어 온 도덕과 규범이 직접 고른 곡들로, 하루의 스테이지를 천천히 마무리하는 시간입니다.",
   "현장에서 들을 음악을 플레이리스트로 미리 만나 보세요."
  ],
  "links": [
   {
    "label": "YouTube 플레이리스트 듣기",
    "url": "https://youtube.com/playlist?list=PLCRYZuEmVQPk&si=o1l-lG0NjxBG_t-e"
   }
  ]
 },
 {
  "id": "session-1",
  "prog": "sessions",
  "key": "F_S1",
  "cat": "세션 1",
  "day": "11.11",
  "s": "13:00",
  "e": "15:00",
  "title": "커피의 가공과정 중 발효의 변조",
  "speakers": [
   {
    "name": "송호석",
    "role": "콤파스 커피 부장",
    "photo": "assets/sp/song.jpg",
    "bio": "월간커피 기자로 시작해 커피플랜트, 1597커피 디렉터를 거쳐 현재 콤파스커피 부장으로 일하고 있다. 맥주 발효를 커피 가공에 접목한 ‘마크 셀렉션’으로 치리로마 농장과 협업해 CoE 3위·4위에 올랐다. 『다시 쓰는 커피학개론』을 썼다."
   }
  ],
  "overview": [
   "두 번째 전공인 맥주의 발효를 커피 가공에 대입해 본 경험을 나눕니다. 프로세싱에서 발효의 역할과 미생물 선택에 따른 향미 변화를 살펴보고, 원하는 스타일의 발효를 설계하는 ‘발효의 변조’를 다룹니다."
  ],
  "dow": "수"
 },
 {
  "id": "session-2",
  "prog": "sessions",
  "key": "F_S2",
  "cat": "세션 2",
  "day": "11.11",
  "s": "15:30",
  "e": "17:30",
  "title": "추출변수로 만드는 실전 브루잉의 기준",
  "speakers": [
   {
    "name": "차미경",
    "role": "커넥스 브루잉 스팟 대표",
    "photo": "assets/sp/cha.jpg",
    "bio": "스페셜티 커피 로스터·바리스타·교육자. 2021 마스터오브마스터 챔피언, 2023 골든커피어워드 클래식 에스프레소 부문 금상 등 다수의 대회에서 수상했다. 15년 넘게 지역 사회와 교육 현장에서 커피 강의를 이어 오고 있다."
   }
  ],
  "overview": [
   "브루잉은 정해진 레시피보다 추출에 영향을 미치는 변수를 이해하고 조절하는 것이 중요합니다. 분쇄도, 원두량, 물 온도, 추출 비율, 시간, 유속이 향미에 미치는 영향을 살펴보고, 원두와 환경이 달라져도 스스로 판단할 수 있는 실전 브루잉의 기준을 제시합니다."
  ],
  "dow": "수"
 },
 {
  "id": "session-3",
  "prog": "sessions",
  "key": "F_S3",
  "cat": "세션 3",
  "day": "11.12",
  "s": "10:30",
  "e": "12:30",
  "title": "맛있는 커피를 만드는 공학적 로스팅 접근법",
  "speakers": [
   {
    "name": "이준선",
    "role": "파브스 커피 대표",
    "photo": "assets/sp/lee-junseon.jpg",
    "bio": "수리학(토석류·하천 난류)을 전공한 연구원 출신으로, 파브스 커피를 공동 운영하는 로스터. KCRC 2023 5위, KCRC 2024 심사위원을 지냈고, 리오나이 로스터기 개발과 VDAS 에스프레소 머신 개발 자문에 참여하고 있다."
   }
  ],
  "overview": [
   "열전달 공학과 데이터 분석으로 로스팅을 바라봅니다. 로스팅을 어떻게 설계하고 운영할지, 결과물을 어떻게 분석할지에 대한 공학적 접근의 개요를 설명합니다."
  ],
  "dow": "목"
 },
 {
  "id": "session-4",
  "prog": "sessions",
  "key": "F_S4",
  "cat": "세션 4",
  "day": "11.12",
  "s": "13:00",
  "e": "15:00",
  "title": "도덕과 규범은 왜 굳이 그렇게 하는가",
  "speakers": [
   {
    "name": "이규범",
    "role": "도덕과 규범 로스터",
    "photo": "assets/sp/lee-kyubum.jpg",
    "bio": "서울 마포구의 로스터리 카페 ‘도덕과 규범’을 운영하는 로스터. 로컬 브랜드·아티스트와 협업하며 ‘로컬의 공통 감각(Local Common Sense)’을 쌓고, 문학 카페·에스프레송 등 커피를 매개로 한 문화 프로그램을 기획한다. 2026년부터 말코닉 홈 그라인더 앰버서더로 활동하고 있다."
   },
   {
    "name": "홍순인",
    "role": "도덕과 규범 바리스타",
    "photo": "assets/sp/hong-sunin.jpg",
    "bio": "‘도덕과 규범’의 바리스타로, 이규범 로스터와 함께 매장과 문화 프로그램을 꾸려 가고 있다."
   }
  ],
  "overview": [
   "스트리밍 대신 빈티지 바이닐과 CD로 음악을 듣고, 오래된 물건으로 공간을 만들고, 산지를 직접 찾아 싱글오리진을 소개합니다. 효율과는 거리가 먼 이 선택들에 담긴 ‘비효율의 미학’과, 한 가게의 취향이 여러 사람의 경험이 되는 과정을 이야기합니다."
  ],
  "dow": "목"
 },
 {
  "id": "session-5",
  "prog": "sessions",
  "key": "F_S5",
  "cat": "세션 5",
  "day": "11.12",
  "s": "15:30",
  "e": "17:30",
  "title": "어떤 원두든, 매력적인 에스프레소로",
  "speakers": [
   {
    "name": "권혁수",
    "role": "토성마을 팀장",
    "photo": "assets/sp/kwon.jpg",
    "bio": "에스프레소 추출을 중심으로 연구하는 바리스타이자 커피 교육자. 2024 한국 바리스타 챔피언십과 2023 에스프레소 스로우다운에서 우승했으며, 매장 실무와 교육·콘텐츠로 에스프레소를 쉽고 실용적으로 전하고 있다."
   }
  ],
  "overview": [
   "브루잉용과 에스프레소용이라는 구분에서 벗어나, 원두의 로스팅 정도와 향미 특성에 맞춰 에스프레소 추출을 설계하는 방법을 알아봅니다. 도징량·분쇄도·추출량 등 주요 변수를 조절해 카페쇼에서 만난 다양한 원두를 매력적인 에스프레소로 즐기는 법을 소개합니다."
  ],
  "dow": "목"
 },
 {
  "id": "session-6",
  "prog": "sessions",
  "key": "F_S6",
  "cat": "세션 6",
  "day": "11.13",
  "s": "10:00",
  "e": "11:00",
  "title": "커피의 개인화 시대, 그 뒤에 숨은 기술",
  "speakers": [
   {
    "name": "길라드 베코르 Gilad Bechor",
    "role": "Coffi 대표",
    "photo": "assets/sp/bechor.jpg",
    "bio": "커피 애호가가 커피를 발견하고 기록하며 취향에 맞게 즐기도록 돕고, 독립 로스터와 연결해 주는 스페셜티 커피 앱 Coffi의 공동 창업자이자 CEO. 캘리포니아에서 자랐으며 제품·디자인 분야에서 사용자 중심의 서비스를 만들어 왔다."
   }
  ],
  "overview": [
   "커피는 원자재에서 표준화된 스페셜티, 홈 브루잉을 거쳐 이제 개인의 정체성이 되었습니다. 취향 기반 추천, 원두 재고 관리, Coffi 패스포트 등 한 사람과 커피의 관계를 중심으로 앱을 만든 과정을 공유하고, 개인화가 커피의 사회적 연결을 어떻게 강화할 수 있는지 이야기합니다. 앱 라이브 데모와 Q&A가 이어집니다."
  ],
  "dow": "금"
 },
 {
  "id": "session-7",
  "prog": "sessions",
  "key": "F_S7",
  "cat": "세션 7",
  "day": "11.13",
  "s": "11:30",
  "e": "12:30",
  "title": "좋은 커피는 우연히 탄생하지 않는다: 커피를 완성하는 데이터의 힘",
  "speakers": [
   {
    "name": "바실리스 아포스톨로풀로스 Vasilis Apostolopoulos",
    "role": "bibe Coffee 대표",
    "photo": "assets/sp/apostolopoulos.jpg",
    "bio": "데이터로 커피의 품질과 운영을 관리하는 bibe coffee의 공동 창업자이자 CEO."
   }
  ],
  "overview": [
   "데이터가 커피 추출에 대한 이해부터 품질과 일관성 유지, 수천 대의 커피 머신과 여러 매장의 운영 효율까지 커피 산업을 어떻게 바꾸고 있는지 소개합니다. 좋은 원두와 장비, 바리스타의 기술만으로는 일정한 품질을 보장하기 어려운 이유를 살펴보고, 연결된 장비와 실시간 데이터 분석을 통한 해법을 공유합니다."
  ],
  "dow": "금"
 },
 {
  "id": "session-8",
  "prog": "sessions",
  "key": "F_S8",
  "cat": "세션 8",
  "day": "11.13",
  "s": "13:00",
  "e": "15:00",
  "title": "커피 바 동선 설계",
  "speakers": [
   {
    "name": "김의성",
    "role": "빈브라더스 컨설팅 팀장",
    "photo": "assets/sp/kim-uiseong.jpg",
    "bio": "2014년 빈브라더스에 입사해 직영 매장의 기자재 관리를 맡았고, 현재 B2B팀에서 커피 바 설계 컨설팅을 담당하고 있다. 언스페셜티 에듀에서 ‘실패 없는 바 설계하기’ 클래스를 진행했다."
   }
  ],
  "overview": [
   "하루 수십에서 수백 잔이 만들어지는 커피 바는 오픈 후 수정이 어렵기 때문에 초기 설계가 중요합니다. 실제 매장 운영과 컨설팅 경험을 바탕으로 동선, 기자재 배치, 설비 도면 등 효율적인 바 레이아웃 설계 방법을 사례 중심으로 전합니다."
  ],
  "dow": "금"
 },
 {
  "id": "session-9",
  "prog": "sessions",
  "key": "F_S9",
  "cat": "세션 9",
  "day": "11.13",
  "s": "15:30",
  "e": "17:30",
  "title": "미리보는 2027 커피 트렌드",
  "speakers": [
   {
    "name": "홍준기",
    "role": "월간커피 부장",
    "photo": "assets/sp/hong-jungee.jpg",
    "bio": "2019년부터 월간커피 마케팅팀에서 일하고 있다. 서울카페쇼·배민아카데미·코리아커피위크 등에서 커피 트렌드 세미나를 진행했고, 2024년부터 카누 바리스타 챔피언십 운영을 총괄하고 있다."
   }
  ],
  "overview": [
   "다양한 데이터를 바탕으로 2026 커피 트렌드 키워드를 돌아보고, 2027 커피 산업의 현황과 트렌드 키워드를 미리 살펴봅니다."
  ],
  "dow": "금"
 },
 {
  "id": "session-10",
  "prog": "sessions",
  "key": "F_S10",
  "cat": "세션 10",
  "day": "11.14",
  "s": "10:30",
  "e": "12:30",
  "title": "변화하는 시대, 바리스타의 새로운 역할",
  "speakers": [
   {
    "name": "임정환",
    "role": "에어리커피 공동대표",
    "photo": "assets/sp/lim.jpg",
    "bio": "에어리커피 공동대표이자 바리스타. 2024 한국 바리스타 챔피언십(KNBC) 챔피언이며, 같은 해 World Barista Championship 파이널리스트에 올랐다."
   }
  ],
  "overview": [
   "스페셜티 커피 산업이 빠르게 발전하면서 바리스타는 좋은 커피를 추출하는 사람을 넘어, 커피의 가치와 가능성을 발견하고 새로운 경험으로 전하는 역할을 요구받고 있습니다. 변화하는 시대 속에서 확장되는 바리스타의 역할과 앞으로의 방향을 함께 이야기합니다."
  ],
  "dow": "토"
 },
 {
  "id": "session-11",
  "prog": "sessions",
  "key": "F_S11",
  "cat": "세션 11",
  "day": "11.14",
  "s": "13:00",
  "e": "15:00",
  "title": "시간을 사는 법",
  "speakers": [
   {
    "name": "홍찬호",
    "role": "RoasteryFlow PM",
    "photo": "assets/sp/hong-chanho.jpg",
    "bio": "호주에서 생두 검사로 커피를 시작해 시드니의 Normcore Coffee를 공동 창업하고 매니징 디렉터를 지냈다. 현재 MTS SOLUTIONS 대표로 국내에서 로스터리(MTSPACE COFFEE)를 운영하며 로스터리 운영 시스템 RoasteryFlow를 개발하고 있다."
   }
  ],
  "overview": [
   "커피를 만드는 시간보다 팔기 위한 시간이 더 깁니다. 기록·연결·위임과 승인이라는 세 가지 원칙으로 주문 입력부터 블로그, 카드뉴스, 원두 레이블까지 자동화한 과정을 실제 화면과 실패 사례와 함께 공개합니다. 무엇을 기계에 맡기고 무엇을 사람이 끝까지 책임져야 하는지에 대한 판단 기준을 나눕니다."
  ],
  "dow": "토"
 },
 {
  "id": "origin-1",
  "prog": "origin",
  "key": "F_O1",
  "day": "11.11",
  "s": "10:30",
  "e": "12:30",
  "title": "Coffee Board of India",
  "speakers": [],
  "overview": [
   "(예시) 참가사 소개와 산지 이야기, 시음 커피 목록이 들어갈 자리입니다."
  ],
  "dow": "수"
 },
 {
  "id": "origin-2",
  "prog": "origin",
  "key": "F_O2",
  "day": "11.11",
  "s": "13:30",
  "e": "15:30",
  "title": "Finca El Injerto",
  "speakers": [
   {
    "name": "아뚜루 아기레 Arturo Aguirre Saenz",
    "role": "Finca El Injerto 대표 · 생산자",
    "photo": "",
    "bio": ""
   }
  ],
  "overview": [
   "CoE 1위 농장이자 세계 100대 카페에 선정된 엘 인헤르또가 커피 밸류체인 전반에서 성과를 낼 수 있었던 핵심 가치를 소개합니다. 대표 품종과 독자적인 실험적 가공 프로세스를 살펴보고, 옥션 커피 커핑이 이어집니다."
  ],
  "dow": "수"
 },
 {
  "id": "origin-3",
  "prog": "origin",
  "key": "F_O6",
  "day": "11.11",
  "s": "16:00",
  "e": "18:00",
  "title": "Guatemalan Coffees (Anacafé)",
  "speakers": [
   {
    "name": "마리아나 카라베오 Mariana Caraveo",
    "role": "Anacafé Coffee Academy 시니어 인스트럭터",
    "photo": "",
    "bio": ""
   }
  ],
  "overview": [
   "과테말라 커피는 풍부한 향, 산뜻한 산미, 묵직한 바디와 섬세한 단맛으로 세계적으로 인정받고 있습니다. 대서양과 태평양, 거대한 화산호, 높은 산맥이 만든 고지대 커피의 개성을 워시드부터 내추럴, 허니까지 다양한 커피 커핑으로 살펴봅니다."
  ],
  "dow": "수"
 },
 {
  "id": "origin-4",
  "prog": "origin",
  "key": "F_O3",
  "day": "11.12",
  "s": "10:30",
  "e": "12:30",
  "title": "IWCA",
  "speakers": [
   {
    "name": "이경선",
    "role": "IWCA Korea 부회장",
    "photo": "",
    "bio": ""
   }
  ],
  "overview": [
   "(예시) 참가사 소개와 산지 이야기, 시음 커피 목록이 들어갈 자리입니다."
  ],
  "dow": "목"
 },
 {
  "id": "origin-5",
  "prog": "origin",
  "key": "F_O4",
  "day": "11.12",
  "s": "13:30",
  "e": "15:30",
  "title": "Café de Honduras",
  "speakers": [],
  "overview": [
   "(예시) 참가사 소개와 산지 이야기, 시음 커피 목록이 들어갈 자리입니다."
  ],
  "dow": "목"
 },
 {
  "id": "origin-6",
  "prog": "origin",
  "key": "F_O5",
  "day": "11.12",
  "s": "16:00",
  "e": "18:00",
  "title": "Coffee Board of India",
  "speakers": [],
  "overview": [
   "(예시) 참가사 소개와 산지 이야기, 시음 커피 목록이 들어갈 자리입니다."
  ],
  "dow": "목"
 },
 {
  "id": "sca-1",
  "prog": "sca",
  "key": "SCA_E1",
  "cat": "One Day Coffee Explorer",
  "day": "11.12",
  "s": "10:00",
  "e": "12:00",
  "title": "Mission 1. 맛의 탐색 | Discover the Flavor",
  "speakers": [
   {
    "name": "박수인",
    "role": "스페셜 커피 협회(SCA) · ITC Spotlighted SCA Educator",
    "photo": "assets/sp/park-suin.jpg",
    "bio": "수작 커피공방(Swim in Coffee LAP)을 운영하며 커피 교육과 카페 컨설팅을 하고 있다. 요리아카데미 교육부 학과장, 대형 카페 총괄 실장 등을 거쳤으며 청주 지역 다수 카페의 오픈 컨설팅을 맡았다."
   },
   {
    "name": "오동준",
    "role": "스페셜 커피 협회(SCA) · Barista Skills Spotlighted SCA Educator",
    "photo": "assets/sp/oh-dongjun.jpg",
    "bio": "㈜엔타로 대표이사이자 Quantify CVA TEAM 프로젝트 디렉터. SCA 공인 트레이너(AST)와 Q Instructor로 커피 교육을 하고 있으며, KNBC·KCRC·KCIGS 심사위원으로 활동했다."
   }
  ],
  "overview": [
   "매일 마시는 아메리카노 한 잔에서 원두와 추출이 만드는 향·맛·질감의 차이를 직접 맛봅니다. 같은 산지·가공의 아라비카와 카네포라를 블라인드로 비교하고, 30초 에스프레소를 세 구간으로 나눠 맛보며, 농도(TDS)를 맞춘 아메리카노 세 잔으로 추출 밸런스의 차이를 확인합니다. “진하게 해 주세요” 같은 일상의 주문이 실제 추출에서 무엇을 뜻하는지도 바리스타 강사의 시연으로 살펴봅니다.",
   "One Day Coffee Explorer – Taste Navigator는 커피를 맛보고, 맛의 출처를 따라가고, 내 선택의 패턴을 찾아 취향에 맞는 한 잔을 만드는 SCA CSP 연계 체험형 원데이 클래스입니다. 커피를 처음 배우는 분도 참여할 수 있으며, 회차별 정원은 50명입니다."
  ],
  "dow": "목"
 },
 {
  "id": "sca-2",
  "prog": "sca",
  "key": "SCA_E2",
  "cat": "One Day Coffee Explorer",
  "day": "11.12",
  "s": "13:00",
  "e": "15:00",
  "title": "Mission 2. 취향의 발견 | Define your Taste",
  "speakers": [
   {
    "name": "김나연",
    "role": "스페셜 커피 협회(SCA) · Sensory Skills Spotlighted SCA Educator",
    "photo": "assets/sp/kim-nayeon.jpg",
    "bio": "파이브씨 커피웍스 교육부원장으로 SCA Q Instructor, AST, CVA for Cuppers Trainer로 활동하고 있다. 프랜차이즈 본사와 공공기관, 직업전문학교 등에서 커피 교육을 해 왔으며, 2026 KCRC 헤드 저지를 맡았다."
   },
   {
    "name": "이재원",
    "role": "스페셜 커피 협회(SCA) · Green Coffee Spotlighted SCA Educator",
    "photo": "assets/sp/lee-jaewon.jpg",
    "bio": "해비치호텔앤리조트 라운지 파트장으로 일하고 있다. 바리스타학원 전임강사를 거쳐 SCA CSP AST(바리스타 스킬·브루잉·센서리·로스팅)와 Q-Grader로 활동하고 있다."
   }
  ],
  "overview": [
   "내일 아침 다시 고르고 싶은 커피를 찾아 나만의 취향 지도를 그립니다. 생두가 만들어지는 과정과 산지·품종·재배 환경, 내추럴·워시드부터 무산소 발효까지 가공 방식이 향미를 만드는 원리를 배웁니다. CVA의 기본 개념으로 강도와 선호를 나눠 기록하며 가공 방식이 다른 커피 네 잔을 블라인드로 맛보고, 정체를 공개한 뒤 생두 샘플과 연결해 원두를 고르는 법까지 정리합니다.",
   "One Day Coffee Explorer – Taste Navigator는 커피를 맛보고, 맛의 출처를 따라가고, 내 선택의 패턴을 찾아 취향에 맞는 한 잔을 만드는 SCA CSP 연계 체험형 원데이 클래스입니다. 커피를 처음 배우는 분도 참여할 수 있으며, 회차별 정원은 50명입니다."
  ],
  "dow": "목"
 },
 {
  "id": "sca-3",
  "prog": "sca",
  "key": "SCA_E3",
  "cat": "One Day Coffee Explorer",
  "day": "11.12",
  "s": "16:00",
  "e": "18:00",
  "title": "Mission 3. 내 컵의 완성 | Craft your Cup",
  "speakers": [
   {
    "name": "김경태",
    "role": "스페셜 커피 협회(SCA) · Roasting Spotlighted SCA Educator",
    "photo": "assets/sp/kim-kyungtae.jpg",
    "bio": "경희커피바리스타학원 원장이자 계명문화대학교 커피문화경영학과 겸임교수. 스타벅스커피코리아 수퍼바이저, 베토벤하우스 헤드 바리스타 등을 거쳤으며, SCA AST와 Q-Grader로 (사)한국커피협회 실기평가위원을 맡고 있다."
   },
   {
    "name": "허정민",
    "role": "스페셜 커피 협회(SCA) · Brewing Spotlighted SCA Educator",
    "photo": "assets/sp/heo-jungmin.jpg",
    "bio": "케빈의 커피연구소를 운영하는 커피 교육자. 호주 멜버른 Three Little Monkeys에서 헤드 바리스타로 일했고 윌리앤잭 커피를 운영했으며, 현재 SCA CSP Full-module AST와 Q Instructor로 활동하고 있다."
   }
  ],
  "overview": [
   "원두를 고르고 추출 레시피를 설계해, 다시 만들 수 있는 나만의 한 잔을 완성합니다. 생두와 라이트·미디엄·다크 로스트를 비교 커핑해 브루잉에 쓸 원두를 고르고, 비율·분쇄도·물 온도·시간 등 브루잉의 일곱 가지 요소 가운데 분쇄도와 시간을 중심으로 배웁니다. 클레버 드리퍼로 두 번 추출해 다른 팀과 맛을 나누고, 내 취향에 맞는 레시피를 기록합니다.",
   "One Day Coffee Explorer – Taste Navigator는 커피를 맛보고, 맛의 출처를 따라가고, 내 선택의 패턴을 찾아 취향에 맞는 한 잔을 만드는 SCA CSP 연계 체험형 원데이 클래스입니다. 커피를 처음 배우는 분도 참여할 수 있으며, 회차별 정원은 50명입니다."
  ],
  "dow": "목"
 },
 {
  "id": "sca-4",
  "prog": "sca",
  "key": "SCA_AAQ",
  "cat": "All about Q",
  "day": "11.13",
  "s": "09:30",
  "e": "18:00",
  "title": "All about Q : 이해를 넘어 적용까지 | From Understanding To Application",
  "speakers": [
   {
    "name": "피터 줄리아노 Peter Giuliano",
    "role": "SCA 시니어 어드바이저",
    "photo": "assets/sp/giuliano.jpg",
    "bio": "1988년부터 바리스타, 로스터, 커피 테이스터, 바이어, 교육자로 커피 업계에서 일해 왔다. 카운터 컬처 커피의 공동 소유주이자 커피 디렉터를 지냈고, 2011–2012년 SCA 회장을 역임했다. 커피과학재단(Coffee Science Foundation)을 설립했으며, 현재 SCA 시니어 어드바이저로 커피 산업에 도움이 되는 과학·경제 연구를 알리고 있다."
   },
   {
    "name": "루루 웨이 Lulu Wei",
    "role": "SCA 교육 매니저",
    "photo": "assets/sp/lulu.jpg",
    "bio": "SCA 교육 매니저로 20년 넘게 스페셜티 커피 업계에서 일해 왔다. 월드 커피 이벤트 심사위원과 선수(2014 월드 브루어스컵 5위)를 거쳤으며, 중화권 SCA 공인 트레이너(AST) 육성과 센서리 교육을 맡고 있다."
   }
  ],
  "overview": [
   "Q 인스트럭터만을 위한 Train-the-Trainer 과정입니다. 지난 6월 과정이 새로운 SCA Q 프로그램과 CVA를 이해하는 데 초점을 맞췄다면, 이번 과정은 이를 실제 강의와 평가에 적용하는 데 집중합니다. 6월 과정 참석은 필수가 아닙니다.",
   "특성이 다른 커피를 직접 평가해 디스크립티브·어펙티브 결과의 차이를 관찰하고, 그 차이가 SCA Q 원칙에서 어떤 의미인지 해석합니다. 그룹별 접근 방식을 공유하고 트레이너 가이드북을 실제 수업 상황에 적용하는 인스트럭터 챌린지를 거쳐, 인스트럭터마다 일관되게 지켜야 할 부분과 전문적 판단이 허용되는 범위를 정리합니다."
  ],
  "dow": "금"
 },
 {
  "id": "sca-5",
  "prog": "sca",
  "key": "SCA_CUP",
  "cat": "Intro to Cupping",
  "day": "11.14",
  "s": "10:00",
  "e": "13:30",
  "title": "Intro to Cupping",
  "speakers": [
   {
    "name": "루루 웨이 Lulu Wei",
    "role": "SCA 교육 매니저",
    "photo": "assets/sp/lulu.jpg",
    "bio": "SCA 교육 매니저로 20년 넘게 스페셜티 커피 업계에서 일해 왔다. 월드 커피 이벤트 심사위원과 선수(2014 월드 브루어스컵 5위)를 거쳤으며, 중화권 SCA 공인 트레이너(AST) 육성과 센서리 교육을 맡고 있다."
   },
   {
    "name": "이경윤",
    "role": "커피바이 로스터스 & 아카데미아 · Education Manager",
    "photo": "assets/sp/lee-kyungyoon.jpg",
    "bio": "2011년 커피바이를 창업해 카페 5개 지점과 연간 100톤 규모의 로스팅 공장을 운영하고 있다. 2017년 교육기관 커피바이 아카데미아를 열었고, 2020년부터 SCA 공인 트레이너(AST)로 그린 커피·브루잉 교육을 하고 있다."
   }
  ],
  "overview": [
   "커핑을 처음 배우는 분을 위한 실습 중심 입문 워크숍입니다. SCA의 새로운 CVA 프로토콜에 맞춰 커피 밸류체인에서 커핑의 역할과, 감각 특성을 묘사하는 것과 좋아하는 커피를 고르는 것의 차이를 살펴봅니다.",
   "프래그런스·아로마·플레이버·애프터테이스트와 산미·단맛·마우스필을 나눠 맛보며 커피를 묘사하는 표준 언어를 익히고, 간소화한 CATA 목록으로 결과를 기록합니다. 기본 절차에 따라 직접 커핑한 뒤, 전체 인상을 9점 선호 척도로 평가합니다."
  ],
  "dow": "토"
 },
 {
  "id": "champion-1",
  "prog": "champion",
  "key": "F_NAS",
  "day": "11.14",
  "s": "10:30",
  "e": "12:30",
  "title": "Nas Jaafar 챔피언 라이브",
  "speakers": [
   {
    "name": "나스 자파르 Nas Jaafar",
    "role": "2026 World Brewers Cup Champion",
    "photo": "assets/sp/jaafar.jpg",
    "bio": "2026 World Brewers Cup 챔피언이자 말레이시아 최초의 월드 챔피언. 10년 넘게 브루잉, 카페 운영, 생두, 대회를 두루 경험했으며, 현재 Falcon Coffees Asia와 함께 세계 각지에서 브루잉과 커피 품질, 교육에 대한 접근법을 나누고 있다."
   }
  ],
  "overview": [
   "Nas Jaafar의 커피 여정과 Falcon Coffees에서의 경험, ‘Resistance’라는 콘셉트로 완성한 월드 브루어스컵 우승 프레젠테이션의 배경을 듣습니다. 이어 Falcon Korea의 커피를 골라 브루잉 방향을 잡는 과정을 설명하고, 라이브 브루잉 시연과 함께 시음합니다."
  ],
  "dow": "토"
 },
 {
  "id": "champion-2",
  "prog": "champion",
  "key": "F_PAN",
  "day": "11.14",
  "s": "13:30",
  "e": "15:30",
  "title": "Pan Wei 챔피언 라이브",
  "speakers": [
   {
    "name": "판웨이 Pan Wei",
    "role": "Parking Coffee 창업자 · 2026 World Barista Champion",
    "photo": "assets/sp/panwei.jpg",
    "bio": ""
   }
  ],
  "overview": [
   "(예시) 연사가 보내 준 발표 개요가 들어갈 자리입니다. 발표의 배경과 문제의식을 두세 문장으로 소개합니다.",
   "(예시) 세션에서 다룰 핵심 내용과 사례, 참가자가 얻어 갈 수 있는 점을 정리합니다. 문단은 여러 개 넣을 수 있습니다."
  ],
  "dow": "토"
 },
 {
  "id": "futures-1",
  "prog": "futures",
  "key": null,
  "day": "11.13",
  "dow": "금",
  "s": "13:00",
  "e": "17:00",
  "title": "Coffee Futures Challenge 본선",
  "speakers": [
   {
    "name": "조원진",
    "role": "커피 칼럼니스트",
    "photo": "",
    "bio": "(예시) 심사위원 소개 문구가 들어갈 자리입니다."
   },
   {
    "name": "박재현",
    "role": "서울모닝커피클럽(SMCC) 대표",
    "photo": "",
    "bio": "(예시) 심사위원 소개 문구가 들어갈 자리입니다."
   }
  ],
  "overview": [
   "커피 퓨처스 챌린지는 커피 산업의 미래와 새로운 가능성을 탐색하는 프로그램입니다. 비즈니스, 서비스, 문화, 기술 등 다양한 분야에서 미래 세대가 제안하는 창의적인 아이디어를 통해 변화하는 커피 산업의 흐름을 살펴보고, 지속 가능한 성장과 혁신의 가능성을 모색합니다."
  ]
 },
 {
  "id": "gala-1",
  "prog": "gala",
  "key": null,
  "day": "11.12",
  "dow": "목",
  "s": "17:00",
  "e": "18:30",
  "title": "Asia-Pacific's 100 Best Coffee Shops GALA",
  "speakers": [],
  "image": "assets/ap100-badge.png",
  "overview": [
   "아시아·태평양에서 가장 특별한 커피숍 100곳은 어디일까? 그 답이 2026 서울카페쇼에서 세계 최초로 공개됩니다.",
   "The Stage가 끝난 뒤 같은 401호에서 이어지는 연계 행사입니다."
  ]
 }
];
