import axios from "axios";
import { GiCookingPot, GiHotMeal } from "react-icons/gi";
import { FaList, FaSortAmountUpAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoFastFoodOutline, IoStatsChartOutline } from "react-icons/io5";
import { SiBuymeacoffee } from "react-icons/si";
import { MdOutlineLiquor, MdPayments } from "react-icons/md";
import { TbBabyBottle } from "react-icons/tb";
import { FcMoneyTransfer } from "react-icons/fc";
import { FiDollarSign, FiHome, FiTarget } from "react-icons/fi";
import { AiOutlineGift } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiBillLine, RiLineChartLine } from "react-icons/ri";
import { BiTransfer } from "react-icons/bi";
import { CiMoneyBill } from "react-icons/ci";
import { ImWhatsapp } from "react-icons/im";
import { toast } from "react-toastify";
import { MdAccountBalanceWallet } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { FaUser } from "react-icons/fa6";
import Swal from 'sweetalert2'
export const handleSweetAlert = (arg: any, close: boolean = false) => !close ? Swal.fire({ ...arg }) : Swal.close();

export const nigeriaState = [
  {
    name: "Abia",
    localGovenment: [
      "Aba North",
      "Aba South",
      "Arochukwu",
      "Bende",
      "Ikwuano",
      "Isiala-Ngwa North",
      "Isiala-Ngwa South",
      "Isuikwato",
      "Obi Nwa",
      "Ohafia",
      "Osisioma",
      "Ngwa",
      "Ugwunagbo",
      "Ukwa East",
      "Ukwa West",
      "Umuahia North",
      "Umuahia South",
      "Umu-Neochi",
    ],
  },
  {
    name: "Adamawa",
    localGovenment: [
      "Demsa",
      "Fufore",
      "Ganaye",
      "Gireri",
      "Gombi",
      "Guyuk",
      "Hong",
      "Jada",
      "Lamurde",
      "Madagali",
      "Maiha",
      "Mayo-Belwa",
      "Michika",
      "Mubi North",
      "Mubi South",
      "Numan",
      "Shelleng",
      "Song",
      "Toungo",
      "Yola North",
      "Yola South",
    ],
  },
  {
    name: "Anambra",
    localGovenment: [
      "Aguata",
      "Anambra East",
      "Anambra West",
      "Anaocha",
      "Awka North",
      "Awka South",
      "Ayamelum",
      "Dunukofia",
      "Ekwusigo",
      "Idemili North",
      "Idemili south",
      "Ihiala",
      "Njikoka",
      "Nnewi North",
      "Nnewi South",
      "Ogbaru",
      "Onitsha North",
      "Onitsha South",
      "Orumba North",
      "Orumba South",
      "Oyi",
    ],
  },
  {
    name: "Akwa Ibom",
    localGovenment: [
      "Abak",
      "Eastern Obolo",
      "Eket",
      "Esit Eket",
      "Essien Udim",
      "Etim Ekpo",
      "Etinan",
      "Ibeno",
      "Ibesikpo Asutan",
      "Ibiono Ibom",
      "Ika",
      "Ikono",
      "Ikot Abasi",
      "Ikot Ekpene",
      "Ini",
      "Itu",
      "Mbo",
      "Mkpat Enin",
      "Nsit Atai",
      "Nsit Ibom",
      "Nsit Ubium",
      "Obot Akara",
      "Okobo",
      "Onna",
      "Oron",
      "Oruk Anam",
      "Udung Uko",
      "Ukanafun",
      "Uruan",
      "Urue-Offong/Oruko ",
      "Uyo",
    ],
  },
  {
    name: "Bauchi",
    localGovenment: [
      "Alkaleri",
      "Bauchi",
      "Bogoro",
      "Damban",
      "Darazo",
      "Dass",
      "Ganjuwa",
      "Giade",
      "Itas/Gadau",
      "Jama'are",
      "Katagum",
      "Kirfi",
      "Misau",
      "Ningi",
      "Shira",
      "Tafawa-Balewa",
      "Toro",
      "Warji",
      "Zaki",
    ],
  },
  {
    name: "Bayelsa",
    localGovenment: [
      "Brass",
      "Ekeremor",
      "Kolokuma/Opokuma",
      "Nembe",
      "Ogbia",
      "Sagbama",
      "Southern Jaw",
      "Yenegoa",
    ],
  },
  {
    name: "Benue",
    localGovenment: [
      "Ado",
      "Agatu",
      "Apa",
      "Buruku",
      "Gboko",
      "Guma",
      "Gwer East",
      "Gwer West",
      "Katsina-Ala",
      "Konshisha",
      "Kwande",
      "Logo",
      "Makurdi",
      "Obi",
      "Ogbadibo",
      "Oju",
      "Okpokwu",
      "Ohimini",
      "Oturkpo",
      "Tarka",
      "Ukum",
      "Ushongo",
      "Vandeikya",
    ],
  },
  {
    name: "Borno",
    localGovenment: [
      "Abadam",
      "Askira/Uba",
      "Bama",
      "Bayo",
      "Biu",
      "Chibok",
      "Damboa",
      "Dikwa",
      "Gubio",
      "Guzamala",
      "Gwoza",
      "Hawul",
      "Jere",
      "Kaga",
      "Kala/Balge",
      "Konduga",
      "Kukawa",
      "Kwaya Kusar",
      "Mafa",
      "Magumeri",
      "Maiduguri",
      "Marte",
      "Mobbar",
      "Monguno",
      "Ngala",
      "Nganzai",
      "Shani",
    ],
  },
  {
    name: "Cross River",
    localGovenment: [
      "Akpabuyo",
      "Odukpani",
      "Akamkpa",
      "Biase",
      "Abi",
      "Ikom",
      "Yarkur",
      "Odubra",
      "Boki",
      "Ogoja",
      "Yala",
      "Obanliku",
      "Obudu",
      "Calabar South",
      "Etung",
      "Bekwara",
      "Bakassi",
      "Calabar Municipality",
    ],
  },
  {
    name: "Delta",
    localGovenment: [
      "Oshimili",
      "Aniocha",
      "Aniocha South",
      "Ika South",
      "Ika North-East",
      "Ndokwa West",
      "Ndokwa East",
      "Isoko south",
      "Isoko North",
      "Bomadi",
      "Burutu",
      "Ughelli South",
      "Ughelli North",
      "Ethiope West",
      "Ethiope East",
      "Sapele",
      "Okpe",
      "Warri North",
      "Warri South",
      "Uvwie",
      "Udu",
      "Warri Central",
      "Ukwani",
      "Oshimili North",
      "Patani",
    ],
  },
  {
    name: "Ebonyi",
    localGovenment: [
      "Edda",
      "Afikpo",
      "Onicha",
      "Ohaozara",
      "Abakaliki",
      "Ishielu",
      "lkwo",
      "Ezza",
      "Ezza South",
      "Ohaukwu",
      "Ebonyi",
      "Ivo",
    ],
  },
  {
    name: "Enugu",
    localGovenment: [
      "Enugu South,",
      "Igbo-Eze South",
      "Enugu North",
      "Nkanu",
      "Udi Agwu",
      "Oji-River",
      "Ezeagu",
      "IgboEze North",
      "Isi-Uzo",
      "Nsukka",
      "Igbo-Ekiti",
      "Uzo-Uwani",
      "Enugu Eas",
      "Aninri",
      "Nkanu East",
      "Udenu.",
    ],
  },
  {
    name: "Edo",
    localGovenment: [
      "Esan North-East",
      "Esan Central",
      "Esan West",
      "Egor",
      "Ukpoba",
      "Central",
      "Etsako Central",
      "Igueben",
      "Oredo",
      "Ovia SouthWest",
      "Ovia South-East",
      "Orhionwon",
      "Uhunmwonde",
      "Etsako East",
      "Esan South-East",
    ],
  },
  {
    name: "Ekiti",
    localGovenment: [
      "Ado",
      "Ekiti-East",
      "Ekiti-West",
      "Emure/Ise/Orun",
      "Ekiti South-West",
      "Ikere",
      "Irepodun",
      "Ijero,",
      "Ido/Osi",
      "Oye",
      "Ikole",
      "Moba",
      "Gbonyin",
      "Efon",
      "Ise/Orun",
      "Ilejemeje.",
    ],
  },
  {
    name: "FCT",
    localGovenment: [
      "Abaji",
      "Abuja Municipal",
      "Bwari",
      "Gwagwalada",
      "Kuje",
      "Kwali",
    ],
  },
  {
    name: "Gombe",
    localGovenment: [
      "Akko",
      "Balanga",
      "Billiri",
      "Dukku",
      "Kaltungo",
      "Kwami",
      "Shomgom",
      "Funakaye",
      "Gombe",
      "Nafada/Bajoga",
      "Yamaltu/Delta.",
    ],
  },
  {
    name: "Imo",
    localGovenment: [
      "Aboh-Mbaise",
      "Ahiazu-Mbaise",
      "Ehime-Mbano",
      "Ezinihitte",
      "Ideato North",
      "Ideato South",
      "Ihitte/Uboma",
      "Ikeduru",
      "Isiala Mbano",
      "Isu",
      "Mbaitoli",
      "Mbaitoli",
      "Ngor-Okpala",
      "Njaba",
      "Nwangele",
      "Nkwerre",
      "Obowo",
      "Oguta",
      "Ohaji/Egbema",
      "Okigwe",
      "Orlu",
      "Orsu",
      "Oru East",
      "Oru West",
      "Owerri-Municipal",
      "Owerri North",
      "Owerri West",
    ],
  },
  {
    name: "Jigawa",
    localGovenment: [
      "Auyo",
      "Babura",
      "Birni Kudu",
      "Biriniwa",
      "Buji",
      "Dutse",
      "Gagarawa",
      "Garki",
      "Gumel",
      "Guri",
      "Gwaram",
      "Gwiwa",
      "Hadejia",
      "Jahun",
      "Kafin Hausa",
      "Kaugama Kazaure",
      "Kiri Kasamma",
      "Kiyawa",
      "Maigatari",
      "Malam Madori",
      "Miga",
      "Ringim",
      "Roni",
      "Sule-Tankarkar",
      "Taura",
      "Yankwashi",
    ],
  },
  {
    name: "Kaduna",
    localGovenment: [
      "Birni-Gwari",
      "Chikun",
      "Giwa",
      "Igabi",
      "Ikara",
      "jaba",
      "Jema'a",
      "Kachia",
      "Kaduna North",
      "Kaduna South",
      "Kagarko",
      "Kajuru",
      "Kaura",
      "Kauru",
      "Kubau",
      "Kudan",
      "Lere",
      "Makarfi",
      "Sabon-Gari",
      "Sanga",
      "Soba",
      "Zango-Kataf",
      "Zaria",
    ],
  },
  {
    name: "Kano",
    localGovenment: [
      "Ajingi",
      "Albasu",
      "Bagwai",
      "Bebeji",
      "Bichi",
      "Bunkure",
      "Dala",
      "Dambatta",
      "Dawakin Kudu",
      "Dawakin Tofa",
      "Doguwa",
      "Fagge",
      "Gabasawa",
      "Garko",
      "Garum",
      "Mallam",
      "Gaya",
      "Gezawa",
      "Gwale",
      "Gwarzo",
      "Kabo",
      "Kano Municipal",
      "Karaye",
      "Kibiya",
      "Kiru",
      "kumbotso",
      "Ghari",
      "Kura",
      "Madobi",
      "Makoda",
      "Minjibir",
      "Nasarawa",
      "Rano",
      "Rimin Gado",
      "Rogo",
      "Shanono",
      "Sumaila",
      "Takali",
      "Tarauni",
      "Tofa",
      "Tsanyawa",
      "Tudun Wada",
      "Ungogo",
      "Warawa",
      "Wudil",
    ],
  },
  {
    name: "Katsina",
    localGovenment: [
      "Bakori",
      "Batagarawa",
      "Batsari",
      "Baure",
      "Bindawa",
      "Charanchi",
      "Dandume",
      "Danja",
      "Dan Musa",
      "Daura",
      "Dutsi",
      "Dutsin-Ma",
      "Faskari",
      "Funtua",
      "Ingawa",
      "Jibia",
      "Kafur",
      "Kaita",
      "Kankara",
      "Kankia",
      "Katsina",
      "Kurfi",
      "Kusada",
      "Mai'Adua",
      "Malumfashi",
      "Mani",
      "Mashi",
      "Matazuu",
      "Musawa",
      "Rimi",
      "Sabuwa",
      "Safana",
      "Sandamu",
      "Zango",
    ],
  },
  {
    name: "Kebbi",
    localGovenment: [
      "Aleiro",
      "Arewa-Dandi",
      "Argungu",
      "Augie",
      "Bagudo",
      "Birnin Kebbi",
      "Bunza",
      "Dandi",
      "Fakai",
      "Gwandu",
      "Jega",
      "Kalgo",
      "Koko/Besse",
      "Maiyama",
      "Ngaski",
      "Sakaba",
      "Shanga",
      "Suru",
      "Wasagu/Danko",
      "Yauri",
      "Zuru",
    ],
  },
  {
    name: "Kogi",
    localGovenment: [
      "Adavi",
      "Ajaokuta",
      "Ankpa",
      "Bassa",
      "Dekina",
      "Ibaji",
      "Idah",
      "Igalamela-Odolu",
      "Ijumu",
      "Kabba/Bunu",
      "Kogi",
      "Lokoja",
      "Mopa-Muro",
      "Ofu",
      "Ogori/Mangongo",
      "Okehi",
      "Okene",
      "Olamabolo",
      "Omala",
      "Yagba East",
      "Yagba West",
    ],
  },
  {
    name: "Kwara",
    localGovenment: [
      "Asa",
      "Baruten",
      "Edu",
      "Ekiti",
      "Ifelodun",
      "Ilorin East",
      "Ilorin West",
      "Irepodun",
      "Isin",
      "Kaiama",
      "Moro",
      "Offa",
      "Oke-Ero",
      "Oyun",
      "Pategi",
    ],
  },
  {
    name: "Lagos",
    localGovenment: [
      "Agege",
      "Ajeromi-Ifelodun",
      "Alimosho",
      "Amuwo-Odofin",
      "Apapa",
      "Badagry",
      "Epe",
      "Eti-Osa",
      "Ibeju/Lekki",
      "Ifako-Ijaye",
      "Ikeja",
      "Ikorodu",
      "Kosofe",
      "Lagos Island",
      "Lagos Mainland",
      "Mushin",
      "Ojo",
      "Oshodi-Isolo",
      "Shomolu",
      "Surulere",
    ],
  },
  {
    name: "Nasarawa",
    localGovenment: [
      "Akwanga",
      "Awe",
      "Doma",
      "Karu",
      "Keana",
      "Keffi",
      "Kokona",
      "Lafia",
      "Nasarawa",
      "Nasarawa-Eggon",
      "Obi",
      "Toto",
      "Wamba",
    ],
  },
  {
    name: "Niger",
    localGovenment: [
      "Agaie",
      "Agwara",
      "Bida",
      "Borgu",
      "Bosso",
      "Chanchaga",
      "Edati",
      "Gbako",
      "Gurara",
      "Katcha",
      "Kontagora",
      "Lapai",
      "Lavun",
      "Magama",
      "Mariga",
      "Mashegu",
      "Mokwa",
      "Muya",
      "Pailoro",
      "Rafi",
      "Rijau",
      "Shiroro",
      "Suleja",
      "Tafa",
      "Wushishi",
    ],
  },
  {
    name: "Ogun",
    localGovenment: [
      "Abeokuta North",
      "Abeokuta South",
      "Ado-Odo/Ota",
      "Yewa North",
      "Yewa South",
      "Ewekoro",
      "Ifo",
      "Ijebu East",
      "Ijebu North",
      "Ijebu North East",
      "Ijebu Ode",
      "Ikenne",
      "Imeko-Afon",
      "Ipokia",
      "Obafemi-Owode",
      "Ogun Waterside",
      "Odeda",
      "Odogbolu",
      "Remo North",
      "Shagamu",
    ],
  },
  {
    name: "Ondo",
    localGovenment: [
      "Akoko North East",
      "Akoko North West",
      "Akoko South Akure East",
      "Akoko South West",
      "Akure North",
      "Akure South",
      "Ese-Odo",
      "Idanre",
      "Ifedore",
      "Ilaje",
      "Ile-Oluji",
      "Okeigbo",
      "Irele",
      "Odigbo",
      "Okitipupa",
      "Ondo East",
      "Ondo West",
      "Ose",
      "Owo",
    ],
  },
  {
    name: "Osun",
    localGovenment: [
      "Aiyedade",
      "Aiyedire",
      "Atakumosa East",
      "Atakumosa West",
      "Boluwaduro",
      "Boripe",
      "Ede North",
      "Ede South",
      "Egbedore",
      "Ejigbo",
      "Ife Central",
      "Ife East",
      "Ife North",
      "Ife South",
      "Ifedayo",
      "Ifelodun",
      "Ila",
      "Ilesha East",
      "Ilesha West",
      "Irepodun",
      "Irewole",
      "Isokan",
      "Iwo",
      "Obokun",
      "Odo-Otin",
      "Ola-Oluwa",
      "Olorunda",
      "Oriade",
      "Orolu",
      "Osogbo",
    ],
  },
  {
    name: "Oyo",
    localGovenment: [
      "Afijio",
      "Akinyele",
      "Atiba",
      "Atisbo",
      "Egbeda",
      "Ibadan Central",
      "Ibadan North",
      "Ibadan North West",
      "Ibadan South East",
      "Ibadan South West",
      "Ibarapa Central",
      "Ibarapa East",
      "Ibarapa North",
      "Ido",
      "Irepo",
      "Iseyin",
      "Itesiwaju",
      "Iwajowa",
      "Kajola",
      "Lagelu",
      "Ogbomosho North",
      "Ogbomosho South",
      "Ogo Oluwa",
      "Olorunsogo",
      "Oluyole",
      "Ona-Ara",
      "Orelope",
      "Ori Ire",
      "Oyo East",
      "Oyo West",
      "Saki East",
      "Saki West",
      "Surulere",
    ],
  },
  {
    name: "Plateau",
    localGovenment: [
      "Barikin Ladi",
      "Bassa",
      "Bokkos",
      "Jos East",
      "Jos North",
      "Jos South",
      "Kanam",
      "Kanke",
      "Langtang North",
      "Langtang South",
      "Mangu",
      "Mikang",
      "Pankshin",
      "Qua'an Pan",
      "Riyom",
      "Shendam",
      "Wase",
    ],
  },
  {
    name: "Rivers",
    localGovenment: [
      "Abua/Odual",
      "Ahoada East",
      "Ahoada West",
      "Akuku Toru",
      "Andoni",
      "Asari-Toru",
      "Bonny",
      "Degema",
      "Emohua",
      "Eleme",
      "Etche",
      "Gokana",
      "Ikwerre",
      "Khana",
      "Obio/Akpor",
      "Ogba/Egbema/Ndoni",
      "Ogu/Bolo",
      "Okrika",
      "Omumma",
      "Opobo/Nkoro",
      "Oyigbo",
      "Port-Harcourt",
      "Tai",
    ],
  },
  {
    name: "Sokoto",
    localGovenment: [
      "Binji",
      "Bodinga",
      "Dange-shnsi",
      "Gada",
      "Goronyo",
      "Gudu",
      "Gawabawa",
      "Illela",
      "Isa",
      "Kware",
      "kebbe",
      "Rabah",
      "Sabon birni",
      "Shagari",
      "Silame",
      "Sokoto North",
      "Sokoto South",
      "Tambuwal",
      "Tqngaza",
      "Tureta",
      "Wamako",
      "Wurno",
      "Yabo",
    ],
  },
  {
    name: "Taraba",
    localGovenment: [
      "Ardo-kola",
      "Bali",
      "Donga",
      "Gashaka",
      "Cassol",
      "Ibi",
      "Jalingo",
      "Karin-Lamido",
      "Kurmi",
      "Lau",
      "Sardauna",
      "Takum",
      "Ussa",
      "Wukari",
      "Yorro",
      "Zing",
    ],
  },
  {
    name: "Yobe",
    localGovenment: [
      "Bade",
      "Bursari",
      "Damaturu",
      "Fika",
      "Fune",
      "Geidam",
      "Gujba",
      "Gulani",
      "Jakusko",
      "Karasuwa",
      "Karawa",
      "Machina",
      "Nangere",
      "Nguru Potiskum",
      "Tarmua",
      "Yunusari",
      "Yusufari",
    ],
  },
  {
    name: "Zamfara",
    localGovenment: [
      "Anka",
      "Bakura",
      "Birnin Magaji",
      "Bukkuyum",
      "Bungudu",
      "Gummi",
      "Gusau",
      "Kaura",
      "Namoda",
      "Maradun",
      "Maru",
      "Shinkafi",
      "Talata Mafara",
      "Tsafe",
      "Zurmi",
    ],
  },
];

export const userDashboardData = [
  { "Available Balance": <FcMoneyTransfer />, link: '/user/dashboard/available-balance' },
  { "Target saving": <FiTarget />, link: '/user/dashboard/target-saving' },
  { "Market place": <AiOutlineGift />, link: '/user/market-place' },
  { "Data.Airtime.Bill": <BsPhone />, link: '/user/dashboard/airtime-and-data' },
  { Restaurant: <FiDollarSign />, link: '/user/dashboard/restaurant' },
  { "Merchants store": <MdPayments />, link: '/user/dashboard/' },
];




export const allrestaurantFoodCategory = [
  { text: "all", icon: <GiHotMeal /> },
  { text: "food", icon: <GiHotMeal /> },
  { text: "protein", icon: <IoFastFoodOutline /> },
  { text: "soup", icon: <IoFastFoodOutline /> },
  { text: "swallow", icon: <SiBuymeacoffee /> },
  { text: "drink", icon: <MdOutlineLiquor /> },
  { text: "snack", icon: <TbBabyBottle /> },
];

export const GenerateOtp = (prop = false) =>
  Math.floor(Math.random() * (prop ? (9999 - 1000) : 99999999 - 10000000)) + 1000;
export const calculateTotalSale = (arr: any) => {
  let total = 0;
  if (typeof arr !== "object") {
    return total
  }
  for (let val of arr) {
    total += val.amount;
  }
  return total;
};

export const swrData = (state: string) => {
  return {
    refreshInterval: state === "loading" ? 10000 : 600000,
    revalidateIfStale: state === "loading" ? true : false,
    revalidateOnFocus: state === "loading" ? true : false,
    revalidateOnReconnect: state === "loading" ? true : false
  }
}
const headerData = (token: string) => ({ headers: { 'authorization': `Bearer ${token}` } });
type HttpMethod = 'delete' | 'post' | 'patch' | 'get';
export const fetcher = async (url: any, request: HttpMethod = "get", data: any = {}, toastError = true, formatResponse = false) => {
  toast.dismiss()
  const split = url.split("kunpexchange")
  try {
    const result = await axios[request](split[0], data ? data : headerData(split[1]))
    console.log(result)
    if (formatResponse) return result;
    if (result.data.status) return { ...result.data };
    else {
      toast.error(result.data.message)
      return {}
    }
  } catch (error: any) {
    if (toastError) {
      toast.error(error)
      return {}
    }
  }
};

export const HandleSort = (arr: any, key: string = "createdAt") =>
  arr?.sort((a: any, b: any) => b[key].localeCompare(a[key]));

export const restaurantDashbaordCardData: any = [
  {
    icon: <GiHotMeal />,
    text: "Foods",
    link: "/restaurant/dashboard/foods",
  },
  {
    icon: <GrDeliver />,
    text: "Bustop",
    link: "/restaurant/dashboard/bustop",
  },
  {
    icon: <GiCookingPot />,
    text: "Add more food",
    link: "/restaurant/dashboard/upload-food",
  },
];

export const restaurantDashbaordCardData1: any = [
  {
    icon: <FaSortAmountUpAlt />,
    text: "Today sale",
  },
  {
    icon: <FaList />,
    text: "View All Orders",
    link: "/restaurant/dashboard/order",
  },
  {
    icon: <MdAccountBalanceWallet />,
    text: "Total balance",
    link: "",
  },
];
export const useGetData = (url: any, formatResponse: boolean = false, prop = {}) => {
  const [data, setData] = useState<any>(undefined);
  useEffect(() => {
    (async () => {
      const result = await fetcher(url, "get", prop, true, formatResponse);
      setData(result);
    })();
  }, []);
  return [data];
};


export const userLayoutDashboardData = {
  largeScreenData: [
    { link: "/user/dashboard/home", icon: <FiHome />, text: "Home" },
    { link: "/user/dashboard/available-balance", icon: <IoStatsChartOutline />, text: "Wallet Balance" },
    { link: "/user/dashboard/target-saving", icon: <HiOutlineShoppingCart />, text: "Save2buy" },
    { link: "/user/dashboard/airtime-and-data", icon: <RiBillLine />, text: "Pay Bill" },
    { link: "/user/dashboard/kyc", icon: <RiLineChartLine />, text: "KYC" },
  ],
  smallScreenData: [
    { link: "/user/dashboard", icon: <FiHome />, text: "Home" },
    { link: "/user/dashboard/available-balance", icon: <BiTransfer />, text: "Add money" },
    { link: "/user/dashboard/available-balance", icon: <CiMoneyBill />, text: "Buy" },
    { link: "https://wa.me/+2347031342626", icon: <ImWhatsapp />, text: "Whatsapp", blank: true, whatsappIcon: true },
  ]
}

export const riderLayoutLargeScreenData = [
  { link: "/rider/dashboard/home", icon: <FiHome />, text: "Home" },
  {
    link: "/rider/dashboard/wallet",
    icon: <MdAccountBalanceWallet />,
    text: "Wallet",
  },
  {
    link: "/rider/dashboard/order",
    icon: <FaList />,
    text: "Orders",
  },
  {
    link: "/rider/dashboard/profile",
    icon: <FaUser />,
    text: "Profile",
  },
];


export const restaurantLayoutLargeScreenData = [
  { link: "/restaurant/dashboard/home", icon: <FiHome />, text: "Home" },
  {
    link: "/restaurant/dashboard/order",
    icon: <FaList />,
    text: "Food orders",
  },
  {
    link: "/restaurant/dashboard/wallet",
    icon: <MdAccountBalanceWallet />,
    text: "Wallet ",
  },

  {
    link: "/restaurant/dashboard/upload-food",
    icon: <GiCookingPot />,
    text: "Upload foods",
  },
  {
    link: "/restaurant/dashboard/foods",
    icon: <GiHotMeal />,
    text: "Foods-available"
  },
  {
    link: "/restaurant/dashboard/order-history",
    icon: <IoStatsChartOutline />,
    text: "Order history",
  },
];
export const restaurantLayoutSmallScreenData = [
  { link: "/restaurant/dashboard/home", icon: <FiHome />, text: "Home" },

  {
    link: "/restaurant/dashboard/wallet",
    icon: <MdAccountBalanceWallet />,
    text: "Wallet ",
  },
  {
    link: "/restaurant/dashboard/upload-food",
    icon: <GiCookingPot />,
    text: "Upload foods",
  },
  {
    link: "/restaurant/dashboard/order-history",
    icon: <IoStatsChartOutline />,
    text: "Order history",
  },
];
export const months: any = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
};

export const stateAndAreaUrlFormat = (state: string) => (`https://stateandareainnigeria.onrender.com/api/${!state ? "states" : "areas/" + state}`)

export const profilePicStatic = "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"