import { RiHomeHeartLine } from "react-icons/ri";
import { FaHashtag } from "react-icons/fa";
import { VscBell } from "react-icons/vsc";
import { AiOutlineMail } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { IoListSharp } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { CgMoreO } from "react-icons/cg";
import { AiOutlinePicture } from "react-icons/ai";
import { AiOutlineFileGif } from "react-icons/ai";
import { BsBarChartFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
export const menuIcons = [
  {
    icon: <RiHomeHeartLine />,
    name: "Home",
    important: true,
  },
  {
    icon: <FaHashtag />,
    name: "Explore",
  },
  {
    icon: <VscBell />,
    name: "Notifications",
    important: true,
  },
  {
    icon: <AiOutlineMail />,
    name: "Messages",
    important: true,
  },
  {
    icon: <BsBookmark />,
    name: "Bookmarks",
  },
  {
    icon: <IoListSharp />,
    name: "Lists",
  },
  {
    icon: <HiOutlineUser />,
    name: "Profile",
  },
  {
    icon: <CgMoreO />,
    name: "More",
  },
];

export const iconInputs = [
  {
    icon: <AiOutlinePicture />,
    name: "picture",
  },
  {
    icon: <AiOutlineFileGif />,
  },
  {
    icon: <BsBarChartFill />,
  },
  {
    icon: <BsEmojiSmile />,
  },
  {
    icon: <BsCalendar />,
  },
  {
    icon: <FiMapPin />,
  },
];

export const dataTrends = [...Array(10)].map((_, i) => ({
  ...{
    type: "Trending in Indonesia",
    hastag: "Zayn Malik",
    tweet: "18.9K Tweets",
  },
}));

export const dataPostsFaker = [...Array(10)].map((_, i) => ({
  name: "Google for Education",
  username: "GoogleForEdu",
  createdAt: Date.now(),
  profilePict:
    "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?w=2000",
  tweet:
    "DYK you can help us shape our products by providing feedback on #GoogleEdu tools? Past examples include hand raising in #GoogleMeet & offline mode in #GoogleClassroom. To input on more effective & inclusive education tools, get involved in our program: http://goo.gle/3xfd0Yj    ",
  picture:
    i % 2 == 0
      ? "https://pbs.twimg.com/media/FUr2Hh6WIAECvSk?format=jpg&name=large"
      : "https://pbs.twimg.com/media/FUt4lMDUsAAcw-O?format=jpg&name=4096x4096",
  comments: 227,
  retweets: 35,
  loves: 308,
}));

export const dataWhoToFollow = [...Array(3)].map((_, i) => ({
  name: "Siska Apriana",
  username: "siska199",
  image:
    "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?w=2000",
}));

export const dataFooter = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Accessibility",
  "Ads info",
  "More",
];

export const dataDays = [...Array(31)].map((_, i) => i + 1);

export const dataMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dataYears = [...Array(120)].map((_, i) => 1902 + i);

export const dataSumInfoFaker = {
  name: "Google for Education",
  username: "GoogleForEdu",
  profilePict:
    "https://img.freepik.com/free-photo/happiness-wellbeing-confidence-concept-cheerful-attractive-african-american-woman-curly-haircut-cross-arms-chest-self-assured-powerful-pose-smiling-determined-wear-yellow-sweater_176420-35063.jpg?w=2000",
  biodata:
    "Hai Cerdikiawan. Ini lho udah aku siapin konten2 supaya kamu bisa jalanin hari-hari tanpa repot, karena pake Gojek #PastiAdaJalan. Moga menginspirasi. 😘",
  following: "63.5K",
  followers: "1M",
};
