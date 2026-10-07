import { JuryMember } from "./types";

function sortJuryByName(members: JuryMember[]): JuryMember[] {
  return [...members].sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
}

const preliminaryJuryData: JuryMember[] = [
  {
    "id": "rain-zhang",
    "photo": "/jury/rain-zhang.jpg",
    "name": "Rain Zhang",
    "role": "Founder & CEO",
    "initials": "RZ",
    "organization": "Zaimu Studios",
    "bio": "Rain Zhang is the founder and CEO of Zaimu Studios, an AI-native entertainment studio dedicated to producing premium AI-driven films and series. With a creator-first vision, the company leverages AI to empower a new generation of storytellers to create works that transcend languages and cultures for global audiences, while also incubating and commercializing AI-native IPs.\n\nRain holds an MBA from Harvard Business School. Before founding Zaimu, she worked at Boston Consulting Group (BCG) and spent eight years at Tencent across Tencent Advertising, Tencent Video, and Tencent Games, focusing on content production strategy and international business.\n\nShe also hosts the Chinese podcast Entertainment Business Review, which has more than 50,000 subscribers across platforms and a strong following among entertainment industry professionals."
  },
  {
    "id": "justin-l-brown",
    "photo": "/jury/justin-l-brown.jpg",
    "name": "Justin L. Brown",
    "role": "Creative Producer & AI Creative Technologist",
    "initials": "JB",
    "organization": "Independent",
    "bio": "Justin L. Brown is a Creative Producer and AI Creative Technologist working at the intersection of storytelling, emerging technology, and production. His work focuses on how generative AI can expand the creative process while preserving strong narrative, craft, and human perspective. He has produced creative and technology-driven work for major brands and organizations including Amazon and Microsoft, and develops systems and workflows that help creative teams integrate AI into production in practical, thoughtful ways.",
    "website": "https://www.linkedin.com/in/jlufair/"
  },
  {
    "id": "steven-chen",
    "photo": "/jury/steven-chen.jpg",
    "name": "Steven Chen",
    "role": "Generative Artist & Filmmaker",
    "initials": "SC",
    "organization": "MakeMake Entertainment",
    "bio": "Steven Chen is a Los Angeles–based generative artist and filmmaker working at the intersection of AI, visual development, and traditional filmmaking. He is currently a Generative Artist at MakeMake Entertainment, where he develops cinematic visuals and AI-driven workflows for commercial, film, and game projects. A graduate of USC’s School of Cinematic Arts, Steven is also a Dreamina AI Creative Partner and has presented his work at AI on the Lot."
  },
  {
    "id": "tiecheng-gu",
    "photo": "/jury/tiecheng-gu.jpg",
    "name": "Tiecheng Gu",
    "role": "Lead Editor",
    "initials": "TG",
    "organization": "Skyline Interactive Inc.",
    "bio": "Tiecheng Gu is a Los Angeles–based director and post-production lead working across narrative film, vertical short-form drama, and emerging AI-driven storytelling. His projects have reached millions of viewers across major short-form platforms, and his work has received recognition from festivals including the Rhode Island International Film Festival, Tokyo International Short Film Festival, and Indie Short Fest, among others. With extensive experience in both traditional filmmaking and evolving AI production workflows, Tiecheng brings perspectives to storytelling, editorial judgment, visual language, and emerging technology to evaluate how new tools can meaningfully serve cinematic expression.",
    "website": "https://www.linkedin.com/in/tiechenggu/"
  },
  {
    "id": "shelley-peterson",
    "photo": "/jury/shelley-peterson.jpg",
    "name": "Shelley Peterson",
    "role": "CEO",
    "initials": "SP",
    "organization": "Wizard Wells",
    "bio": "Shelley Peterson is an XR and AI pioneer whose work bridges science-fiction inspiration and real-world innovation. Drawing on the vision of Iron Man’s JARVIS, she led the integration of immersive technologies into complex aerospace manufacturing, including the production of NASA’s Artemis spacecraft. Her work has also advanced emerging technology across aerospace, education, healthcare, and defense industries.\n\nShelley’s advisory experience includes Harvard XR, Augmented World Expo, the Barbara Bush Foundation, SMU’s Advanced Manufacturing Center, XR Women, and numerous educational organizations. With a background in mathematics and physics, she brings technical depth, creative curiosity, and a human-centered perspective to the SoHo International Film Festival’s AI Creative jury.",
    "website": "https://www.linkedin.com/in/shelley-peterson-277a5454/"
  },
  {
    "id": "yuxiao-zhang",
    "photo": "/jury/yuxiao-zhang.jpg",
    "name": "Yuxiao Zhang",
    "role": "AI Artist & Film Editor",
    "initials": "YZ",
    "organization": "Independent",
    "bio": "Yuxiao Zhang is a Los Angeles–based award-winning filmmaker, editor, and AI creative working across narrative film, documentary, music video, and emerging media. A graduate of the USC School of Cinematic Arts, she combines a strong foundation in cinematic storytelling and post-production with hands-on experience using generative AI throughout the creative process—from visual development and world-building to image generation, animation, and compositing.\n\nHer AI-driven projects include Nezha, Jewel, On Fire, and Water Knows the Way, alongside concepts developed for platforms and programs including the Runway AI Film Festival, Runway’s Hundred Film Fund, and the MIT AI Film Hack. Her broader editorial work has received recognition from the Long Island International Film Expo, St. Louis International Film Festival, and the American Pavilion’s Emerging Filmmaker Showcase at Cannes.\n\nWorking between cultures and disciplines, Yuxiao is especially interested in AI films that move beyond technical spectacle to demonstrate cinematic intention, emotional depth, originality, and a distinctive human point of view.",
    "website": "https://yuxiaozfilm.com"
  },
  {
    "id": "annine-fan-zhang",
    "photo": "/jury/annine-fan-zhang.jpg",
    "name": "Annine Fan Zhang",
    "role": "Executive Producer",
    "initials": "AZ",
    "organization": "AZZA Productions",
    "bio": "Annine Fan Zhang is a bilingual producer and executive based in Los Angeles, specializing in international production, AI-driven storytelling, and emerging media. She currently serves as an Executive Producer at AZZA Productions and a judge for the 47th Annual Telly Awards. An alumna of the American Film Institute Conservatory, Zhang has worked across the U.S. and China, leading cross-border productions and collaborations with international creative teams, studios, brands, and AI content partners, with projects selected by more than 30 international film festivals, including Oscar- and BAFTA-qualifying festivals.",
    "website": "https://www.linkedin.com/in/annine-fan-zhang"
  },
  {
    "id": "xuetong-joey-zhao",
    "photo": "/jury/xuetong-joey-zhao.jpg",
    "name": "Xuetong Joey Zhao",
    "role": "Writer-Director & AI Filmmaker & Founder & PhD Candidate",
    "initials": "XZ",
    "organization": "Luminova Pictures; Tsinghua University",
    "bio": "Joey Zhao is an award-winning writer-director, producer, and founder working across global cinema and emerging media. Her work has screened at 100+ international festivals and exhibitions, including AFI Fest, Cannes Lions, and the Beijing International Film Festival. An AFI Directing alumna and Ph.D. researcher in Film Sociology at Tsinghua University, Zhao was selected for Indeed Rising Voices, through which her film premiered at the Tribeca Festival, received a theatrical release across five U.S. states, qualified for Academy Award consideration, and now streams on Hulu and Kanopy. Her practice spans narrative film, vertical storytelling, and AI-driven production, exploring how emerging technologies can expand creative possibilities and make filmmaking more accessible."
  },
  {
    "id": "nathan-bush",
    "photo": "/jury/nathan-bush.png",
    "name": "Nathan Bush",
    "role": "AI Filmmaker",
    "initials": "NB",
    "organization": "Powers Video",
    "bio": "Nathan Bush is an AI filmmaker with more than fifteen years of experience across directing, cinematography, video editing, motion graphics, and 3D animation. His AI work includes projects for Coca-Cola, Google, and T-Mobile, combining generative tools with extensive production and post-production expertise. Beginning as a director and cinematographer in New York, he expanded into post-production before bringing those disciplines together in AI filmmaking. He approaches each new medium as a learner, combining experimentation with close attention to visual storytelling and the details of the craft.",
    "website": "https://powers.video"
  },
  {
    "id": "kiki-kuhakan",
    "photo": "/jury/kiki-kuhakan.jpg",
    "name": "Kiki Kuhakan",
    "role": "Director & Producer",
    "initials": "KK",
    "organization": "Independent",
    "bio": "Kiki Kuhakan is an award-winning Thai-Burmese filmmaker and journalist with over a decade of experience reporting for Reuters and the BBC. A two-time recipient of Amnesty International Awards for her investigative journalism and documentary work, she earned her MFA from USC’s School of Cinematic Arts. Her work spans documentary, AI film, VR, animation, and narrative film. Her documentary Songs They Buried was a finalist for the 2026 BAFTA Student Awards and the 2025 DGA Student Film Awards.",
    "website": "https://www.linkedin.com/in/kiki-kuhakan-8a4a3897/"
  },
  {
    "id": "zeyi-chen",
    "photo": "/jury/zeyi-chen.jpg",
    "name": "Zeyi Chen",
    "role": "Producer",
    "initials": "ZC",
    "organization": "Independent",
    "bio": "Zeyi is an experienced producer and IP development professional with over a decade of experience across commercial animation, branded and commercial productions, live-action, and international film projects. Her expertise lies at the intersection of creative production, commercial storytelling, and IP development, with extensive experience bringing established and emerging IP from concept to screen.\n\nThroughout her career, she has worked with leading entertainment and production companies including Youku Kids, Yuewen Animation, and Base-FX. She led the IP development of the animated series Eighty Thousand Years in the Star Region and has contributed to internationally recognized productions including Wish Dragon and Aquaman, as well as Monster Hunt 2.\n\nHer cross-market experience combines creative execution with a strong understanding of commercial viability, IP development, and global production."
  },
  {
    "id": "jiaoyang-li",
    "photo": "/jury/jiaoyang-li.jpg",
    "name": "Jiaoyang Li",
    "role": "Interdisciplinary Artist & Co-Founder of Accent Sisters",
    "initials": "JL",
    "organization": "Accent Sisters",
    "bio": "Jiaoyang Li is a New York–based poet, interdisciplinary artist, curator, and publisher whose practice moves across text, moving image, performance and site-specific storytelling. Her interdisciplinary work has been presented at New York Live Arts, Chashama, Creative Time, Pioneer Works, Performa Biennial, the Immigrant Artist Biennial, Today Art Museum, the Athens International Video Poetry Festival, and other arts and film platforms internationally. Li has received grants and support from PEN America, the New York Foundation for the Arts, the Foundation for Contemporary Arts, and the British Council, among others. She is the co-founder of Accent Sisters, a New York–based bookstore, art space, and independent publishing platform supporting diasporic and cross-disciplinary cultural practices."
  },
  {
    "id": "john-gauntt",
    "photo": "/jury/john-gauntt.jpeg",
    "name": "John Gauntt",
    "role": "Creative Director",
    "initials": "JG",
    "organization": "Seattle AI Film Festival",
    "bio": "John du Pre Gauntt is the Creative Director of the Seattle AI Film Festival and the host of Culture & Code, a B2B podcast and newsletter focused on Generative AI for Creative Professionals. John’s written analysis of emerging technology’s impact on media and marketing has been featured in The Economist and eMarketer. His public speaking includes South by Southwest, Artist and the Machine, and the MIT AI Film Festival. He has judged AI Films for the Austin AI Film Festival, Hainan Island International Film Festival (China), and Harvard XR. John’s audio stories and AI short films have won two Signal Awards, Official Selection for On Air Fest, AIFilm3, and the Philip K. Dick Science Fiction Festival. He holds dual degrees in English Literature and Computer Information Systems along with a 2nd Degree Black Belt in Brazilian Jiujitsu."
  },
  {
    "id": "lm-xie",
    "photo": "/jury/lm-xie.jpg",
    "name": "LM Xie",
    "role": "Founder of TODAY AI ART; Secretary-General of AIAIA (AI Art Innovation Alliance); Chief Curator of the AI Film Season at the Hainan Island International Film Festival; Chief Advisor of AI Backlot at the Shanghai International Film Festival",
    "initials": "LX"
  },
  {
    "id": "yaocheng-yang",
    "photo": "/jury/yaocheng-yang.jpg",
    "name": "Yaocheng Yang",
    "role": "Film Director & Animation Director & Cinematic Artist",
    "initials": "YY",
    "organization": "Karsen Studio",
    "bio": "Yaocheng Yang is a filmmaker and Cinematic Artist working at the intersection of filmmaking, animation, real-time 3D, and generative AI. Based in Shenzhen, he works as a Cinematic Artist focusing on camera, lighting, editing, previs, and motion capture data processing for feature-length 3D animation. His workflow combines traditional cinematic language with Unreal Engine 5 and generative AI.\n\nHis work explores how emerging technologies can reshape the way stories are designed, visualized, and brought to life."
  },
  {
    "id": "yining-cici-dai",
    "photo": "/jury/yining-cici-dai.jpg",
    "name": "Yining (Cici) Dai",
    "role": "Producer",
    "initials": "YD",
    "organization": "Mad Lychee Productions",
    "bio": "Yining (Cici) Dai is an international film and media producer and the founder of Mad Lychee Productions, with experience spanning narrative film, documentaries, commercial content, and emerging media across the U.S. and China. A graduate of the USC School of Cinematic Arts and a Mary Pickford Family Scholar, she has produced projects ranging from award-winning documentaries and hit vertical series to virtual production and AI-driven films.\n\nHer selected credits include the CCTV award-winning documentary \"Panda Yunchuan & Xinbao\", GoodShort's hit series \"Oops I Married My Daughter's Daddy\", and \"How Can I Not Forget\", part of the Amazon Future Cinema Creators Project, recently screened at Amazon Studios. With hands-on experience integrating AI into cinematic storytelling, Cici brings a cross-disciplinary producer's perspective to the evolving intersection of filmmaking, technology, and creative innovation.",
    "website": "https://www.linkedin.com/in/cici-dai-a24276424"
  },
  {
    "id": "zimeng-cui",
    "photo": "/jury/zimeng-cui.jpg",
    "photoObjectPosition": "center center",
    "name": "Zimeng Cui",
    "role": "AI Executive Producer",
    "initials": "ZC",
    "organization": "Yuewen Group",
    "bio": "Zimeng Cui is a producer with experience in film and television development and production across China and the United States. She currently serves as an AI Executive Producer on Yuewen Group’s U.S. team, developing and producing AI-driven short-form dramas for international audiences. Her work spans independent film, documentary, and vertical drama, with a focus on cross-cultural storytelling and the integration of AI into filmmaking.",
    "website": "https://www.linkedin.com/in/zimeng-c-4a3615344"
  }
];

export const preliminaryJury = sortJuryByName(preliminaryJuryData);

const grandJuryData: JuryMember[] = [
  {
    "id": "annabelle-yu-long",
    "photo": "/jury/annabelle-yu-long.jpg",
    "name": "Annabelle Yu Long",
    "role": "Founding & Managing Partner",
    "initials": "AL",
    "organization": "BAI Capital",
    "bio": "Annabelle Yu Long is an experienced venture capitalist and board member with a strong background in digital innovation, and business operations in Asia/Pacific. She currently serves as Founding and Managing Partner of BAI Capital, a venture capital firm focused on businesses operating in Asia and beyond with investments across AI, fintech, consumer retail, media and content innovation. Additionally, Ms. Long is a member of the Group Management Committee of Bertelsmann, where she contributes to global corporate strategy and development, and where she has led Bertelsmann’s China growth strategy and its transformation into a well-regarded global investment powerhouse.\n\nMs. Long serves as an independent director on the boards of The Estée Lauder Companies Inc. (NYSE: EL), Tapestry, Inc. (NYSE: TPR, whose portfolio includes Coach and Kate Spade), and NIO Inc. (NYSE: NIO; HKEX: 9866; SGX: NIO). In addition, she serves as an independent non-executive director on the board of The Hongkong and Shanghai Banking Corporation Limited.\n\nMs. Long holds an MBA from the Stanford Graduate School of Business and, as a distinguished alumna, served on the School’s Advisory Council as its first Chinese member. She was named a Young Global Leader by the World Economic Forum (WEF) in 2011 and has been actively involved in WEF activities. She has been featured in the Forbes Midas List and Forbes Asia's Power Businesswomen list, among others."
  },
  {
    "id": "bradley-g-munkowitz",
    "photo": "/jury/bradley-g-munkowitz.jpg",
    "name": "Bradley G Munkowitz — GMUNK",
    "role": "Chief Creative Officer at GMUNK Studio, Inc",
    "initials": "BM",
    "organization": "GMUNK Studio, Inc.",
    "bio": "GMUNK is a multidisciplinary artist and director driven by a deep curiosity about light, technology, and human consciousness. Moving fluidly between digital art, full-spectrum photography, motion design, and live-action direction, he uses each medium as a way to explore the unseen — the patterns, energies, and emotions that shape how we experience the world. His work lives somewhere between the psychedelic, the metaphysical, and the technological, guided by a lifelong fascination with transformation and our evolving relationship with technology and the self.",
    "website": "https://gmunk.com/"
  },
  {
    "id": "jorge-ballos",
    "photo": "/jury/jorge-ballos.jpeg",
    "name": "Jorge Ballos",
    "role": "President & Founder",
    "initials": "JB",
    "organization": "Soho International Film Festival/ Soho Creative Lab",
    "bio": "Jorge Ballos is the Founder and President of the SoHo International Film Festival (SIFFNYC), presented by the SoHo Creative Lab Foundation. A longtime advocate for independent cinema, he is dedicated to supporting diverse filmmakers and creating opportunities for emerging and established artists to showcase their work. He is also a SAG-AFTRA member with experience in film and television."
  },
  {
    "id": "kees-van-oostrum",
    "photo": "/jury/kees-van-oostrum.jpeg",
    "name": "Kees Van Oostrum",
    "role": "Professor at Shanghai Theatre Academy",
    "initials": "KO",
    "organization": "Shanghai Theatre Academy",
    "bio": "Kees van Oostrum ASC, NSC Professor, Shanghai Theatre Academy Kees van Oostrum has spent decades behind the camera, building a body of work that spans roughly 80 films across television, cinema, and documentary. Along the way he's picked up Emmy Awards and a reputation for bringing a painter's eye to historical subjects — most notably the Civil War epics Gettysburg and Gods and Generals. He's also stepped in front of the camera's responsibilities as a director and producer, with films like Christina, Dark Hearts, and A Perfect Man to his name. Teaching has become as central to his life as cinematography. In 2015 he launched the Masterclass program for the American Society of Cinematographers, a project still current today. It has reached more than 4,000 students across the United States and abroad — a sustained effort to raise the craft everywhere it's practiced. Between 2016 and 2020 he served as the ASC's president.In 2020/2021 he served also as president of IMAGO. His move to Shanghai opened a new chapter. Since joining the Shanghai Theatre Academy he has lectured at the Beijing Film Academy, Qingdao Film School, Zhejiang University of Media and Communications, the Chinese Academy of Art, and Xi'an Jiaotong-Liverpool University in Suzhou. He has sat on juries at the Shanghai and Beijing Film Festivals and moderated conversations with some of the most accomplished cinematographers working today — among them Ed Lachman, Dan Laustsen, Christopher Doyle, Russell Carpenter, Liu Yin, Cao Yu, and Luo Pan. He is currently a professor of film studies at the Shanghai Theatre Academy, where he works closely with the next generation of filmmakers."
  },
  {
    "id": "fred-grinstein",
    "photo": "/jury/fred-grinstein.png",
    "name": "Fred Grinstein",
    "role": "Co-Founder",
    "initials": "FG",
    "organization": "Machine Cinema",
    "bio": "Fred Grinstein is co-founder of Machine Cinema, a 15,000+ member creative professional network at the forefront of generative AI filmmaking, producing GenJam™ events and summits across LA, SF, and New York. A media executive with two decades in premium film and television — including roles at Anonymous Content, Viceland, and A&E, with credits spanning HBO, Hulu, Sundance, and Tribeca — Fred now bridges traditional storytelling and emerging AI technologies as an AI consultant to History and A+E Global Media among other Production Studio/ creator/ filmmaker clients. He’s Adjunct Professor at USC’s School of Cinematic Arts teaching AI for the MFA program, as well as Programming Director for LABASAD’s Online Masters for Creative AI, and also a Stanford Starling Lab Fellow researching synthetic media and provenance.",
    "website": "https://www.linkedin.com/in/fred-grinstein/"
  },
  {
    "id": "ian-dawson",
    "photo": "/jury/ian-dawson.jpg",
    "name": "Ian Dawson",
    "role": "Owner & Executive Producer",
    "initials": "ID",
    "organization": "IDGRAFX",
    "bio": "Ian began his career in early 1990’s interested in using the technology to push boundaries in entertainment. More recently, he has been focused on generative AI as new paradigm for content creation through his company IDGRAFX where he produces, consults, and collaborates with other studios, brands, and business leaders.\n\nIan VFX supervised and produced the futuristic AR Jarvis sequences for Ironman 1 & 2. He has produced over 50 feature title sequences and well over 100 commercials for Fortune 500 brands worldwide. Ian launched and rebranded networks in over 20 countries worldwide for RTL, BSkyB, Star TV, MNET, ORT Russia, TV Norge, TV4 Sweden, Singapore TV 8 & 12 and CCTV China. Domestically he produced network and show branding for Discovery, HBO, Showtime, ESPN, Fox, MSNBC, ABC, NBC, CBS, WB, Fox Sports, NFL Network, among many others. He has produced the broadcast and screens graphics on 13 Oscars shows and other live events such as the Emmys, Grammys, Stand Up to Cancer, Tony Awards, NFL Honors, Country Music Awards, and NatGeo’s Earth Live.\n\nWith more than 30 years of experience as an executive and producer of AI, VR/AR/XR, experiential initiatives, branding, motion graphics, and visual effects, Ian has been awarded 9 Emmy awards, 13 Emmy award nominations, 11 Broadcast Design awards, 8 Telly awards, and 2 Clios.\n\nOver the last 2 years, he has been working with clients and artist interested in pushing the boundaries of production using AI to create stories and branding campaigns. He believes that creating collaborative teams of artists from different disciplines and backgrounds is the key to pushing the envelope of what is possible in the use of generative AI for content creation.",
    "website": "http://www.idgrafx.com"
  },
  {
    "id": "song-wen",
    "photo": "/jury/song-wen.jpg",
    "name": "Song Wen",
    "role": "Founder",
    "initials": "SW",
    "organization": "FIRST International Film Festival",
    "bio": "Song Wen previously worked at the venture capital firm IDG Capital. His cross-sector background has given him a distinctive industry perspective and a strong operational mindset. Over the past two decades, he and his team have built FIRST into one of Asia’s most influential platforms for emerging filmmakers.\n\nThrough the ecosystem cultivated by FIRST, filmmakers including Wen Muye, Xin Yukun, Shao Yihui, Teng Congcong, Zhang Dalei, and Gu Xiaogang have gained international recognition. Song has also worked to broaden public access to film education, curating and organizing public programs at FIRST with renowned filmmakers and artists such as Béla Tarr, Isabelle Huppert, Wong Kar-wai, and Jiang Wen. Through these initiatives, he has helped create a more open and accessible environment for film education.\n\nAs a producer, Song has financed and produced works including The Enigma of Arrival, Wrath of Silence, Day Is Done, and All Tomorrow’s Parties, many of which have received recognition at international film festivals. In 2025, he launched the Angta Island UNTITLED Interactive Art Exhibition, exploring new intersections among cinema, digital art, gaming, and AIGC.\n\nHis longstanding work in curation, filmmaking, and education has led international publications such as The Hollywood Reporter and Screen International to describe him as “a key architect of Asia’s emerging-filmmaker ecosystem.”\n\nSong is a graduate of the 2018 EMBA cohort at The Chinese University of Hong Kong Business School. He currently also serves as an industry mentor for graduate students at the Communication University of China."
  },
  {
    "id": "fan-ming",
    "photo": "/jury/fan-ming.jpg",
    "name": "Fan Ming",
    "role": "Award-Winning Documentary Filmmaker & Emmy Awards Juror (News & Documentary) & Council Member, AI Art Innovation Alliance & Co-Initiator, Hainan International Film Festival AI Film Season",
    "initials": "FM",
    "bio": "Fan Ming is an award-winning investigative producer and independent documentary filmmaker. She served as Chief Editor of Insight, China Central Television's flagship investigative interview program. Her environmental documentary Under the Dome drew over 300 million views, sparking global discussion on China's air pollution problem and driving landmark environmental policy reforms. Her feature documentary The Sinking of the Lisbon Maru, which she co-directed and co-produced, was China's official submission for Best International Feature Film at the 97th Academy Awards and won Best Documentary Film at the 37th Golden Rooster Awards. A Harvard MPA and Mason Fellow, Fan Ming has served as an Adjunct Assistant Professor at Columbia University Graduate School of Journalism and is an Asia Society Coastal Fellow. With broad experience leading cross-border projects, she combines visual storytelling, investigative reporting, data visualization, and AI innovation to drive the industry forward."
  }
];

export const grandJury = sortJuryByName(grandJuryData);
