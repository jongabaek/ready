// English content. Loaded after data.js on /en/ pages and merged by session id.
// speakers: [name, role, bio] in the same order as data.js (photos are kept).
(function () {
  var DOW = { '수': 'Wed', '목': 'Thu', '금': 'Fri', '토': 'Sat' };
  var PROG = {
    stage: '4F · Conference Room 401', sessions: '3F · Conference Room 301', origin: '3F · Conference Room 300',
    sca: '3F · Conference Room 317', champion: '3F · Conference Room 318', futures: '3F · Conference Room 300', gala: '4F · Conference Room 401'
  };
  var EXPLORER = 'One Day Coffee Explorer – Taste Navigator is a hands-on one-day class linked to the SCA CSP: taste coffee, trace where flavor comes from, find the pattern in your choices and make a cup that suits you. Beginners are welcome. Each session is limited to 50 participants.';
  var PETER_BIO = 'Has worked in coffee since 1988 as a barista, roaster, taster, buyer and educator. Former co-owner and Director of Coffee at Counter Culture Coffee and SCA President (2011–2012). Founder of the Coffee Science Foundation, he now shares science and economic research that helps the coffee industry as SCA Senior Advisor.';
  var LULU_BIO = 'Education Manager at the SCA with more than 20 years in specialty coffee. A former World Coffee Events judge and competitor (5th place, 2014 World Brewers Cup), she develops SCA Authorized Trainers and sensory education across the Greater China region.';

  var E = {
    'stage-open': { title: 'Opening', ov: ['The Stage of the 15th World Coffee Forum opens.'] },
    'stage-1': { title: 'Why Do We Drink Coffee Anyway? The 500 Year History of Coffee Passion',
      sp: [['Peter Giuliano', 'Senior Advisor, SCA', PETER_BIO]],
      ov: ['Coffee has almost no nutritional value, is an acquired taste and takes great effort to produce. So why do so many people love it? From the first Arabian coffeehouses to the latest consumer research, this talk traces four reasons people drank coffee 500 years ago and still do today, and what they suggest for innovation in the coffee industry.'] },
    'stage-2': { title: 'The Time in a Cup — How a Daily Cup Becomes a Ritual, and Carries On to the Next Generation',
      sp: [['Hee-kyung Lucia Cho', 'CEO, Hwayo', 'CEO of Hwayo Group. In 2003 she revived the lost tradition of Korean rice spirits with Hwayo, and leads a family of brands spanning vessel, spirit and table: Kwangjuyo, Hwayo and Korean fine dining.']],
      ov: ['When choosing your next menu, do you look at what is trending, or at what you believe in? Drawing on the story of founding Hwayo, she talks about the difference between brands that chase trends and brands that set standards, and asks café owners who brew a cup every day: do my cup, my drink and my table tell the same story?'] },
    'stage-3': { title: 'Rediscovering Tradition and Locality: Spatial Experiences Crafted Through Coffee and Tea',
      sp: [['Teo Yang', 'Creative Director, Teo Yang Studio', 'A designer and entrepreneur who translates Korean tradition and heritage into a contemporary design language. After working in Europe and the US, he opened Teo Yang Studio in a Bukchon hanok and has directed spaces for the Gyeongju National Museum, the National Hangeul Museum and Blue Bottle. In 2022 he became the first Korean named to the AD100.']],
      ov: ['Through projects such as Blue Bottle Coffee, Mumyeong and Elements, he shares how coffee creates touchpoints between a brand and its guests, and how a contemporary view of tradition and locality can add value to the coffee experience.'] },
    'stage-4': { title: 'K-Mix Coffee: Becoming the Impression of Korea',
      sp: [['Kyurim Kim', 'Brand Director, newmix', 'Spent about ten years at Baemin as a marketer and product planner, creating Baemin Stationery. She joined Grandeclip in 2023 and launched newmix, which redefines Korean instant mix coffee as a souvenir of Korea. Author of six books.']],
      ov: ['Instant mix coffee is everywhere in Korean daily life, yet no one paid attention to it. newmix turns it into a souvenir that carries the impression of Korea. With most of its visitors coming from abroad, she explains how newmix redefines “Koreanness” and makes people remember Korea through flavors and store experiences.'] },
    'stage-pair': { title: 'Pairing Table & Coffee Break',
      ov: ['The Pairing Table is a break in the middle of The Stage where flavor and connection meet. Over a cup of coffee and a bite of dessert, find fresh inspiration and new connections.'],
      pt: [{ group: 'Coffee & Tea Partners', items: [{"id": "kewleaves", "name": "Kew&Leaves", "sub": "", "desc": "A Korean blended tea brand creating “blended teas that will still be loved 100 years from now.” Master tea blender and CEO Hyunjin Sung combines carefully selected tea leaves from around the world with Korean local ingredients to create blends found only in Korea. Recognized with international awards including three iTQi Superior Taste Awards, its teas are served at luxury hotels and cafés across Korea.", "featured": {"title": "Signature Tea Bag Collection (9 teas)", "note": "Nine signature teas across black, oolong, herbal and pu-erh bases to compare flavors and find your own taste.", "list": [["No.163 Flower Garden", "Indian and Sri Lankan black tea with petals and muscat"], ["No.341 Caramel Teamericano", "Indian black tea with Korean roasted coffee beans and caramel"], ["No.741 Lemony Oolong", "Smooth oolong with lemon myrtle and peppermint"], ["No.168 Seoul Breakfast", "Korean, Indian and Sri Lankan black tea with roasted Korean black beans"], ["No.612 Citrus Love", "iTQi 3-star bestseller: rooibos with Korean tangerine peel, lemon myrtle and chamomile"], ["No.113 Black Yuzu", "November Goheung yuzu with rooibos and rose"], ["No.327 Nodeul Earl Grey", "Bergamot with rose, peach and the savory depth of Jeju black tea"], ["No.181 Better than Choco", "Pu-erh with cacao nibs, chocolate and cream aromas"], ["No.508 Rosy Peach", "Smooth oolong with rose, peach and apricot"]]}}, { id: 'newmix', name: 'newmix', desc: '' }, { id: 'myungga', name: 'Coffee Myungga', desc: '' }, { id: 'monin', name: 'MONIN', desc: '' }] },
           { group: 'Dessert Partners', items: [{ id: 'wrights', name: 'Cafe Wrights', desc: '' }] }] },
    'stage-5': { title: 'How a YouTube Channel Grew into a Coffee Platform of Belonging',
      sp: [['Chihoon An', 'CEO, unspecialty', 'Coffee content creator behind the YouTube channel “Ansta”, and CEO of the specialty coffee platform unspecialty and the café unpage in Hannam-dong.']],
      ov: ['260,000 people watch his coffee videos, but views are not relationships. From YouTube to bean curation, online coffee education and the café unpage, he shares the “three layers of connection” that turn attention into belonging and grow a sustainable coffee business.'] },
    'stage-fireside': { title: 'Fireside Chat', speakerLabel: 'Moderator', metaLabel: 'Moderator', overviewLabel: 'About',
      sp: [['Sunghee Tark', 'Co-founder & CEO, Bean Voyage · Moderator', 'Co-founder and CEO of Bean Voyage, a social enterprise building a more sustainable coffee industry alongside women smallholder farmers in Costa Rica and Mexico. She has supported women coffee farmers through education and market access, working to address inequalities within the coffee industry and build a more equitable value chain. Through contributions to global coffee magazines, talks and panel discussions at international coffee events, she shares the voices of producers and diverse perspectives from across the industry.']],
      ov: ['How much do we really know about the stories behind a cup of coffee? A fireside chat that brings together diverse voices across the coffee industry and shares new perspectives, moderated by Sunghee Tark of Bean Voyage.'] },
    'stage-award': { title: 'Speaker Appreciation Plaques & Cafe Show Excellence Awards', ov: ['Appreciation plaques for The Stage speakers and the Seoul Cafe Show Excellence Awards ceremony.'] },
    'stage-dj': { title: 'DJ Set by Doduk & Kyubum',
      ov: ['After the Cafe Show Excellence Awards, Doduk & Kyubum, a roastery café in Mapo, fills the Room 401 lobby with music until the GALA begins.', 'Drinking good coffee while listening to good music is also a way of making the most of your time. For World Coffee Forum 2026, “Why We Drink Coffee?”, they picked twelve Brazilian songs they loved listening to at Doduk & Kyubum this year.', 'This year they visited Expocacer, a cooperative in Brazil’s Cerrado region, and met its fertile land and producers. They recalled the music they heard at dawn in Brazil after a thirty-hour flight, meeting coffee farms and producers, and bring that landscape and excitement to you through bossa nova, samba and jazz.', '“Why do Doduk & Kyubum go out of their way?” The reason they pour their hearts into what they love may be that our time is always precious, and never quite enough.', 'Preview the music in the playlist.'],
      ln: [{ label: 'Listen on YouTube', url: 'https://youtube.com/playlist?list=PLCRYZuEmVQPk&si=o1l-lG0NjxBG_t-e' }] },

    'session-1': { cat: 'Session 1', title: 'Modulating Fermentation in Coffee Processing',
      sp: [['Hoseok Song', 'General Manager, Compass Coffee', 'Started as a reporter at Monthly Coffee and worked as director at Coffee Plant and 1597 Coffee before joining Compass Coffee. His “Mark Selection”, applying beer fermentation to coffee processing with Finca Chiroloma, placed 3rd and 4th at the Cup of Excellence. Author of a coffee textbook.']],
      ov: ['He shares what happened when he applied beer fermentation, his second field of study, to coffee processing: the role of fermentation, how microbe selection changes flavor, and how to design the fermentation style you want.'] },
    'session-2': { cat: 'Session 2', title: 'Practical Brewing Standards: Mastering Extraction Variables',
      sp: [['Mikyoung Cha', 'CEO, Kunes Brewing Spot', 'Specialty coffee roaster, barista and educator. Champion of the 2021 Master of Masters and gold medalist in the 2023 Golden Coffee Awards classic espresso category, among other awards. She has taught coffee in local communities and schools for more than 15 years.']],
      ov: ['Good brewing is less about a fixed recipe than about understanding and controlling the variables. She looks at how grind size, dose, water temperature, ratio, time and flow rate shape flavor, and offers practical standards for judging on your own when beans and conditions change.'] },
    'session-3': { cat: 'Session 3', title: 'An Engineering Approach to Roasting Delicious Coffee',
      sp: [['Junseon Lee', 'CEO, Faabs Coffee', 'A former hydraulics researcher (debris flow and river turbulence) who now co-runs Faabs Coffee as a roaster. 5th at KCRC 2023 and a KCRC 2024 judge, he advises on the development of Leonai roasters and VDAS espresso machines.']],
      ov: ['Roasting seen through heat-transfer engineering and data analysis: an overview of how to design and run a roast, and how to analyze the result.'] },
    'session-4': { cat: 'Session 4', title: 'Doduk & Kyubum: Why We Do Things Our Way',
      sp: [['Kyubum Lee', 'Roaster, Doduk & Kyubum', 'Roaster at Doduk & Kyubum, a roastery café in Mapo, Seoul. He builds a “Local Common Sense” with local brands and artists and plans coffee-based cultural programs. Mahlkönig home grinder ambassador since 2026.'],
           ['Sunin Hong', 'Barista, Doduk & Kyubum', 'Barista at Doduk & Kyubum, running the café and its cultural programs with roaster Kyubum Lee.']],
      ov: ['They listen to vintage vinyl and CDs instead of streaming, build their space with old objects and visit origins to introduce single origins. They talk about the “aesthetics of inefficiency” behind these choices, and how one shop’s taste becomes an experience for many.'] },
    'session-5': { cat: 'Session 5', title: 'Any Coffee, A Great Espresso',
      sp: [['Hyuksoo Kwon', 'Department Manager, Tosung Village', 'Barista and coffee educator focused on espresso extraction. Winner of the 2024 Korea Barista Championship and the 2023 Espresso Slowdown, he makes espresso easy and practical through café work, teaching and content.']],
      ov: ['Moving beyond “for filter” and “for espresso”, he shows how to design espresso extraction around a coffee’s roast level and flavor, adjusting dose, grind and yield to enjoy the many beans you meet at Cafe Show as great espresso.'] },
    'session-6': { cat: 'Session 6', title: 'The Personal Era of Coffee, and the Technology Behind It',
      sp: [['Gilad Bechor', 'CEO, Coffi', 'Co-founder and CEO of Coffi, a specialty coffee app that helps coffee lovers discover, log and enjoy coffee to their taste and connects them with independent roasters. Raised in California, he has built user-centered products in product and design.']],
      ov: ['Coffee has moved from commodity to standardized specialty to home brewing, and now to personal identity. He shares how Coffi was built around one person’s relationship with coffee — taste-based recommendations, bean inventory and the Coffi Passport — and how personalization can strengthen coffee’s social connections. Includes a live app demo and Q&A.'] },
    'session-7': { cat: 'Session 7', title: 'Great Coffee Is No Accident: Why Data Is the Missing Ingredient',
      sp: [['Vasilis Apostolopoulos', 'CEO, bibe coffee', 'Co-founder and CEO of bibe coffee, which manages coffee quality and operations with data.']],
      ov: ['How data is changing coffee, from understanding extraction to keeping quality consistent and running thousands of machines across many stores. Why good beans, equipment and barista skill alone cannot guarantee consistency, and how connected equipment and real-time analytics help.'] },
    'session-8': { cat: 'Session 8', title: 'Designing Coffee Bar Layout and Workflow',
      sp: [['Uiseong Kim', 'Head of B2B Consulting, Bean Brothers', 'Joined Bean Brothers in 2014 to manage equipment for its stores and now leads coffee bar design consulting on the B2B team. He has taught a “bar design without failure” class at unspecialty edu.']],
      ov: ['A coffee bar that makes dozens to hundreds of cups a day is hard to change after opening, so the first design matters. Based on store operations and consulting, he walks through workflow, equipment placement and utility plans with real cases.'] },
    'session-9': { cat: 'Session 9', title: '2027 Coffee Trends: A Preview',
      sp: [['Jungee Hong', 'General Manager, Monthly Coffee', 'Has worked on the marketing team at Monthly Coffee since 2019, leading coffee trend seminars at Seoul Cafe Show, Baemin Academy and Korea Coffee Week, and has directed the KANU Barista Championship since 2024.']],
      ov: ['A look back at the 2026 coffee trend keywords through data, and a preview of the state of the industry and the keywords for 2027.'] },
    'session-10': { cat: 'Session 10', title: 'The Evolving Role of the Barista in a Changing World',
      sp: [['Junghwan Lim', 'Co-founder, Aery Coffee', 'Co-founder and barista of Aery Coffee. Champion of the 2024 Korea National Barista Championship and a World Barista Championship finalist the same year.']],
      ov: ['As specialty coffee grows fast, baristas are asked not only to brew good coffee but to discover its value and share it as new experiences. A conversation about the expanding role of the barista and where it is heading.'] },
    'session-11': { cat: 'Session 11', title: 'Buying Back Time',
      sp: [['Chanho Hong', 'PM, RoasteryFlow', 'Started in coffee grading green beans in Australia, co-founded Normcore Coffee in Sydney and served as its managing director. Now CEO of MTS SOLUTIONS, he runs the roastery MTSPACE COFFEE in Korea and develops the roastery operating system RoasteryFlow.']],
      ov: ['Selling coffee takes longer than making it. Using three principles — record, connect, delegate and approve — he shows how he automated everything from order entry to blogs, card news and bean labels, with real screens and failures, and shares how to decide what to hand to machines and what people must own.'] },

    'origin-1': { ov: ['Discover the nature and flavors of India’s shade-grown coffee.'] },
    'origin-2': { title: 'Finca El Injerto', sp: [['Arturo Aguirre Saenz', 'Owner & Producer, Finca El Injerto', '']],
      ov: ['El Injerto, a Cup of Excellence winning farm, shares the core values behind its success across the coffee value chain, introduces its signature varieties and its own experimental processing, followed by an auction coffee cupping.'] },
    'origin-3': { title: 'Guatemalan Coffees', sp: [['Mariana Caraveo', 'Senior Instructor, Anacafé Coffee Academy', '']],
      ov: ['Guatemalan coffee is known worldwide for rich aroma, bright acidity, full body and delicate sweetness. Explore the character of high-altitude coffees shaped by two oceans, volcanic lakes and mountain ranges through a cupping of washed, natural and honey coffees.'] },
    'origin-4': { sp: [['Lora Lee', 'Vice President, IWCA Korea', '']], ov: ['Discover coffees from diverse origins and the stories of the producers behind them.'] },
    'origin-5': { ov: ['Explore the hidden appeal and potential of Honduran coffee through two unique perspectives.'] },
    'origin-6': { ov: ['Discover the nature and flavors of India’s shade-grown coffee.'] },

    'sca-1': { title: 'Mission 1. Discover the Flavor',
      sp: [['Suin Park', 'Specialty Coffee Association (SCA) · ITC Spotlighted SCA Educator', 'Runs Swim in Coffee LAP, teaching coffee and consulting for cafés. Formerly head of education at a culinary academy and general manager of a large café, she has consulted on many café openings in Cheongju.'],
           ['Dongjun Oh', 'Specialty Coffee Association (SCA) · Barista Skills Spotlighted SCA Educator', 'CEO of Entaro and project director of the Quantify CVA team. He teaches as an SCA Authorized Trainer and Q Instructor and has judged KNBC, KCRC and KCIGS.']],
      ov: ['Taste how beans and extraction shape the aroma, flavor and texture of an everyday americano. Compare arabica and canephora from the same origin and process blind, taste a 30-second espresso in three parts, and check extraction balance with three americanos matched for TDS. A barista demo shows what everyday orders like “make it stronger” mean in extraction.', EXPLORER] },
    'sca-2': { title: 'Mission 2. Define your Taste',
      sp: [['Tardis Kim', 'Specialty Coffee Association (SCA) · Sensory Skills Spotlighted SCA Educator', 'Deputy director of education at 5C Coffee Works and an SCA Q Instructor, AST and CVA for Cuppers Trainer. She has taught at franchise headquarters, public institutions and vocational schools, and was head judge of KCRC 2026.'],
           ['Kevin Lee', 'Specialty Coffee Association (SCA) · Green Coffee Spotlighted SCA Educator', 'Lounge manager at Haevichi Hotels & Resorts. A former full-time instructor at a barista academy, he is an SCA CSP AST (Barista Skills, Brewing, Sensory, Roasting) and Q Grader.']],
      ov: ['Draw your own taste map to find the coffee you would choose again tomorrow. Learn how green coffee is produced, how origin, variety and growing conditions matter, and how processing from natural and washed to anaerobic shapes flavor. Using basic CVA concepts, record intensity and preference separately while tasting four coffees blind, then match them with green samples to learn how to choose beans.', EXPLORER] },
    'sca-3': { title: 'Mission 3. Craft your Cup',
      sp: [['Kyungtae Kim', 'Specialty Coffee Association (SCA) · Roasting Spotlighted SCA Educator', 'Director of Kyunghee Coffee Barista Academy and adjunct professor at Keimyung College University. Formerly a supervisor at Starbucks Coffee Korea and head barista at Beethoven House, he is an SCA AST, Q Grader and practical examiner for the Korea Coffee Association.'],
           ['Jungmin Heo', 'Specialty Coffee Association (SCA) · Brewing Spotlighted SCA Educator', 'Coffee educator running Kevin’s Coffee Lab. He was head barista at Three Little Monkeys in Melbourne and ran Willy & Jack Coffee, and is now an SCA CSP full-module AST and Q Instructor.']],
      ov: ['Choose your beans and design a brew recipe to make a cup you can make again. Cup green coffee and light, medium and dark roasts to choose beans for brewing, and learn the seven brewing factors with a focus on grind size and time. Brew twice with a Clever Dripper, share with other teams and record the recipe that suits you.', EXPLORER] },
    'sca-4': { title: 'All about Q : From Understanding To Application',
      sp: [['Peter Giuliano', 'Senior Advisor, SCA', PETER_BIO], ['Lulu Wei', 'Education Manager, SCA', LULU_BIO]],
      ov: ['A Train-the-Trainer course for Q Instructors only. Where the June course focused on understanding the new SCA Q program and CVA, this course focuses on applying them in teaching and assessment. Attending the June course is not required.', 'Evaluate coffees with different characteristics to observe the gap between descriptive and affective results and what it means under SCA Q principles. Share group approaches and take on an instructor challenge applying the trainer guidebook to real classes, then define what every instructor must keep consistent and where professional judgment is allowed.'] },
    'sca-5': { sp: [['Lulu Wei', 'Education Manager, SCA', LULU_BIO],
           ['Kyungyoon Lee', 'Education Manager, Coffeebay Roasters & Academia', 'Founded Coffeebay in 2011 and runs five cafés and a roasting plant producing 100 tons a year. He opened Coffeebay Academia in 2017 and has taught green coffee and brewing as an SCA Authorized Trainer since 2020.']],
      ov: ['A hands-on introductory workshop for first-time cuppers. Following the new SCA CVA protocol, look at the role of cupping in the coffee value chain and the difference between describing sensory attributes and choosing the coffee you like.', 'Taste fragrance, aroma, flavor and aftertaste, and acidity, sweetness and mouthfeel to learn a standard language for describing coffee, recording results with a simplified CATA list. Cup following the basic procedure, then rate your overall impression on a 9-point hedonic scale.'] },

    'champion-1': { title: 'Champion Live: Nas Jaafar',
      sp: [['Nas Jaafar', '2026 World Brewers Cup Champion', '2026 World Brewers Cup Champion and Malaysia’s first world champion. With more than ten years across brewing, café operations, green coffee and competition, he now shares his approach to brewing, coffee quality and education around the world with Falcon Coffees Asia.']],
      ov: ['Hear about Nas Jaafar’s coffee journey, his work with Falcon Coffees and the story behind his World Brewers Cup winning presentation built on the concept of “Resistance”. He then explains how he chooses a coffee from Falcon Korea and sets a brewing direction, with a live brewing demo and tasting.'] },
    'champion-2': { title: 'Champion Live: Pan Wei',
      sp: [['Pan Wei', 'Founder, Parking Coffee · 2026 World Barista Champion', '']],
      ov: ['Champion Live with Pan Wei, the 2026 World Barista Champion.'] },
    'futures-1': { title: 'Coffee Futures Challenge Final', sched: ['Opening & introduction', 'Final presentations, part 1 (4 teams)', 'Break', 'Final presentations, part 2 (4 teams)', 'Final judging', 'Awards & closing'], speakerLabel: 'Judges', metaLabel: 'Judges',
      sp: [['Cho Wonjin', 'Coffee Columnist', 'An office worker and coffee columnist writing under the pen name “Beirut.” He contributes to Chosun Ilbo, JoongAng Ilbo, Monthly Coffee and many other outlets, and has moderated sessions at folin, Trevari, Seoul Cafe Show and the SCA Retail Summit. His books include “Nineteen Baristas, Roasting Stories,” “Specialty Coffee, from San Francisco to Seongsu,” “Korea Specialty Coffee Guide” and, in 2026, a new book on the history of home cafés and coffee equipment.'], ['Jaehyun Park', 'CEO, Seoul Morning Coffee Club (SMCC)', 'Entrepreneur and wellness lifestyle planner leading Seoul Morning Coffee Club (SMCC). As CEO of the F&B company Rope Company, he has created restaurant brands around Yongsan such as Mimiok, Shonino and Burger Boy. Under the vision “We wake up Seoul’s mornings,” SMCC proposes healthy morning culture through coffee chats, running, reading and morning raves, expanding to Melbourne and Tokyo. He is also the creator of the YouTube channel “Camping Man.”']],
      ov: ['Coffee Futures Challenge is an idea competition that explores the future of the coffee industry and its emerging possibilities. Through creative ideas proposed by the next generation across business, services, culture and technology, it examines how the industry is changing and explores opportunities for sustainable growth and innovation.', 'From the proposals submitted in the preliminary round, eight individual and team entries advanced to the final. Each team presents its idea for 15 minutes, followed by 5 minutes of questions from the judges.', 'Finalists: 고으니, 마*주, OnAir, 원두ONE, 원두잇, ieda, 커알못, unch (not in presentation order)'] },
    'gala-1': { ov: ['Which are the 100 most exceptional coffee shops in Asia-Pacific? The list will be unveiled for the first time worldwide at Cafe Show Seoul 2026.', 'A partner event held in Room 401 right after The Stage.'] }
  };

  Object.keys(window.WCF_PROG || {}).forEach(function (k) { if (PROG[k]) window.WCF_PROG[k].room = PROG[k]; });
  (window.WCF_SESSIONS || []).forEach(function (x) {
    x.dow = DOW[x.dow] || x.dow;
    var e = E[x.id]; if (!e) return;
    ['title', 'cat', 'speakerLabel', 'metaLabel', 'overviewLabel'].forEach(function (f) { if (e[f]) x[f] = e[f]; });
    if (x.room) x.room = x.room.replace('컨퍼런스룸 ', 'Conference Room ').replace('호 로비', ' Lobby').replace('호', '');
    if (e.sched && x.schedule) e.sched.forEach(function (l, i) { if (x.schedule[i]) x.schedule[i][2] = l; });
    if (e.ov) x.overview = e.ov;
    if (e.pt) x.partners = e.pt;
    if (e.ln) x.links = e.ln;
    if (e.sp) e.sp.forEach(function (s, i) { if (x.speakers[i]) { x.speakers[i].name = s[0]; x.speakers[i].role = s[1]; x.speakers[i].bio = s[2]; } });
  });
  // fix photo paths for /en/
  var R = document.body && document.body.getAttribute('data-root') || '';
  if (R) (window.WCF_SESSIONS || []).forEach(function (x) {
    x.speakers.forEach(function (s) { if (s.photo && s.photo.indexOf('http') !== 0) s.photo = R + s.photo; });
    if (x.image && x.image.indexOf('http') !== 0) x.image = R + x.image;
    (x.partners || []).forEach(function (g) { g.items.forEach(function (it) { if (it.logo) it.logo = R + it.logo; }); });
  });
})();
