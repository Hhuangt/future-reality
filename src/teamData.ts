export type TeamMember = {
  name: string;
  role: string;
  image?: string;
  imagePosition?: string;
};

export type TeamGroup = {
  label: string;
  members: TeamMember[];
};

export const teamGroups: TeamGroup[] = [
  {
    label: "Festival Leadership",
    members: [
      { name: "Yun Fan", role: "Festival Co-Founder & Co-Director", image: "/team/yun-fan.webp" },
      { name: "Helen Huang", role: "Festival Co-Founder & Co-Director", image: "/team/helen-huang.webp" },
    ],
  },
  {
    label: "Festival Team",
    members: [
      { name: "Jia Chen", role: "Festival Programming, Operations & Production Lead", image: "/team/jia-chen.webp" },
      { name: "Shufan Zhang", role: "Creator Relations, Jury & Selection Co-Lead", image: "/team/shufan-zhang.webp" },
      { name: "Xin Ma", role: "Creator Relations, Jury & Selection Co-Lead", image: "/team/xin-ma.webp" },
      { name: "Teresa Li", role: "Creator Relations, Jury & Selection Co-Lead", image: "/team/teresa-li.webp" },
      { name: "Jiaying Li", role: "Marketing & Design Lead", image: "/team/jiaying-li.webp" },
      { name: "Jason Xuan", role: "Sponsorship & Partnerships Lead", image: "/team/jason-xuan.webp" },
      { name: "Amber He", role: "Partnerships Contributor", image: "/team/amber-he.webp" },
    ],
  },
  {
    label: "Content Contributors",
    members: [
      { name: "Khrystyna Komarovska", role: "Content Contributor", image: "/team/khrystyna-komarovska.webp" },
      { name: "Shuran He", role: "Content Contributor", image: "/team/shuran-he.webp" },
      { name: "Zilan Fan", role: "Content Contributor", image: "/team/zilan-fan.webp" },
      { name: "Sihan Pan", role: "Content Contributor", image: "/team/sihan-pan.webp" },
    ],
  },
];

