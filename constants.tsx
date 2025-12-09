import { SectionData } from './types';
import { Leaf, BookOpen, Briefcase, Landmark, PenTool } from 'lucide-react';
import React from 'react';

// Design Concepts requested by the prompt
export const DESIGN_CONCEPTS = {
  names: [
    { name: "LinLv Nav (林旅智航)", desc: "Combines 'Forest' (CSUFT root) + 'Tourism' + 'Smart Navigation'." },
    { name: "EcoHorizon (生态视界)", desc: "Focuses on the National Park and ecological aspect of the major." },
    { name: "SenTu Hub (森途学苑)", desc: "Academic focus: 'Forest Path' academy." }
  ],
  logo: {
    visual: "A stylized Ginkgo leaf (representing CSUFT) transforming into a map location pin.",
    colors: "Emerald Green (#059669) for National Parks/Forestry, fused with Slate Blue (#475569) for academic rigor.",
    concept: "Symbolizes the intersection of nature conservation and tourism management."
  },
  layout: "Left-sidebar navigation for quick switching. Top sticky header for global search. Card-grid layout for resources for scannability."
};

export const RESOURCE_DATA: SectionData[] = [
  {
    id: 'parks',
    label: 'National Parks',
    iconName: 'Leaf',
    description: 'Official portals for 5A+ sites and National Parks',
    items: [
      {
        id: 'p1',
        title: 'Sanjiangyuan National Park',
        url: 'http://sjy.qinghai.gov.cn/',
        description: 'Official administration portal. Source for ecological zoning data.',
        tags: ['Official', 'National Park', 'Ecology'],
        source: 'Administration Bureau',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'p2',
        title: 'Giant Panda National Park',
        url: 'http://www.gjgy.org/',
        description: 'Comprehensive resource for biodiversity and panda conservation tourism.',
        tags: ['Official', 'Biodiversity', 'Sichuan/Shaanxi/Gansu'],
        source: 'Forestry Bureau',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'p3',
        title: 'Wuyishan National Park',
        url: 'http://wys.fujian.gov.cn/',
        description: 'Dual heritage site management and ticketing reservation system.',
        tags: ['Heritage', 'Booking', '5A'],
        source: 'Fujian Gov',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'p4',
        title: 'Northeast Tiger and Leopard National Park',
        url: 'https://www.ntlpark.cn/',
        description: 'Latest tracking data and scientific research updates.',
        tags: ['Research', 'Conservation', 'Jilin/Heilongjiang'],
        source: 'Park Admin',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'p5',
        title: 'Hainan Tropical Rainforest NP',
        url: 'http://www.hntrnp.com/',
        description: 'Tropical ecosystem education and smart tourism platform.',
        tags: ['Tropical', 'Science Pop', 'Smart Tourism'],
        source: 'Hainan Forestry',
        access: 'Public',
        isOfficial: true
      }
    ]
  },
  {
    id: 'policy',
    label: 'Industry Policy',
    iconName: 'Landmark',
    description: 'Government directives, laws, and policy interpretation',
    items: [
      {
        id: 'pol1',
        title: 'Ministry of Culture and Tourism (MCT)',
        url: 'https://www.mct.gov.cn/',
        description: 'The primary source for all national tourism regulations and data.',
        tags: ['Gov', 'Regulations', 'Stats'],
        source: 'State Council',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'pol2',
        title: 'National Forestry and Grassland Admin',
        url: 'http://www.forestry.gov.cn/',
        description: 'Key policy source for National Park management and forestry tourism.',
        tags: ['Forestry', 'Conservation', 'Policy'],
        source: 'State Council',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'pol3',
        title: 'Ministry of Natural Resources',
        url: 'https://www.mnr.gov.cn/',
        description: 'Land use planning and spatial planning policies for tourism development.',
        tags: ['Land Use', 'Planning', 'Gov'],
        source: 'State Council',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'pol4',
        title: 'China Tourism Academy (Data Center)',
        url: 'http://www.ctaweb.org/',
        description: 'Authority on tourism statistics, reports, and policy interpretation.',
        tags: ['Think Tank', 'Data', 'Reports'],
        source: 'CTA',
        access: 'Public',
        isOfficial: true
      },
      {
        id: 'pol5',
        title: 'UNESCO World Heritage Centre',
        url: 'https://whc.unesco.org/',
        description: 'International conventions and standards for heritage sites.',
        tags: ['International', 'Standards', 'Heritage'],
        source: 'UNESCO',
        access: 'Public',
        isOfficial: true
      }
    ]
  },
  {
    id: 'academic',
    label: 'Academic Research',
    iconName: 'BookOpen',
    description: 'Journals, databases, and research platforms',
    items: [
      {
        id: 'acad1',
        title: 'Tourism Tribune (旅游学刊)',
        url: 'http://www.lyxk.com.cn/',
        description: 'The top-tier Chinese academic journal in tourism management.',
        tags: ['Core Journal', 'Chinese', 'Research'],
        access: 'Campus IP'
      },
      {
        id: 'acad2',
        title: 'Annals of Tourism Research',
        url: 'https://www.sciencedirect.com/journal/annals-of-tourism-research',
        description: 'Premier international social sciences journal for tourism.',
        tags: ['SSCI', 'English', 'Top Tier'],
        access: 'Subscription'
      },
      {
        id: 'acad3',
        title: 'CNKI (Tourism/Forestry Database)',
        url: 'https://www.cnki.net/',
        description: 'Primary database for Chinese theses, dissertations, and papers.',
        tags: ['Database', 'Essential', 'Thesis'],
        access: 'Campus IP'
      },
      {
        id: 'acad4',
        title: 'CSUFT Library Portal',
        url: 'https://lib.csuft.edu.cn/',
        description: 'Direct access to Central South University of Forestry & Tech collections.',
        tags: ['University', 'Library', 'Access'],
        access: 'Campus IP',
        isOfficial: true
      },
      {
        id: 'acad5',
        title: 'Journal of Sustainable Tourism',
        url: 'https://www.tandfonline.com/journals/rsus20',
        description: 'Focuses on critical sustainability issues in tourism.',
        tags: ['Sustainability', 'SSCI', 'English'],
        access: 'Subscription'
      }
    ]
  },
  {
    id: 'career',
    label: 'News & Career',
    iconName: 'Briefcase',
    description: 'Industry news, exhibitions, and recruitment',
    items: [
      {
        id: 'car1',
        title: 'China Tourism News (Ctnews)',
        url: 'http://www.ctnews.com.cn/',
        description: 'Official industry newspaper. High update frequency.',
        tags: ['News', 'Daily', 'Official'],
        updateFreq: 'Daily',
        access: 'Public'
      },
      {
        id: 'car2',
        title: 'TravelDaily (Huanqiu Lvxun)',
        url: 'https://www.traveldaily.cn/',
        description: 'Leading commercial news and analysis for travel tech and business.',
        tags: ['Business', 'Tech', 'Analysis'],
        updateFreq: 'Real-time',
        access: 'Public'
      },
      {
        id: 'car3',
        title: 'VeryEast (BestDongfang)',
        url: 'https://www.veryeast.cn/',
        description: 'The largest specialized recruitment platform for tourism/hotel jobs.',
        tags: ['Recruitment', 'Internships', 'Jobs'],
        updateFreq: 'Real-time',
        access: 'Public'
      },
      {
        id: 'car4',
        title: 'ITB China',
        url: 'http://www.itb-china.com/',
        description: 'Major B2B travel trade show. Good for industry trends.',
        tags: ['Exhibition', 'B2B', 'Events'],
        updateFreq: 'Seasonal',
        access: 'Public'
      },
      {
        id: 'car5',
        title: 'MCT Talent Center',
        url: 'https://www.mct.gov.cn/right/rcjs/',
        description: 'Official talent development and certification policies.',
        tags: ['Certification', 'Gov', 'Training'],
        updateFreq: 'Monthly',
        access: 'Public'
      }
    ]
  }
];
