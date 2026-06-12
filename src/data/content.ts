import type { StaticImageData } from "next/image";

import hero from "../../public/gallery/hero.jpg";
import lena from "../../public/gallery/lena.jpg";
import slub01 from "../../public/gallery/slub-01.jpg";
import slub02 from "../../public/gallery/slub-02.jpg";
import slub03 from "../../public/gallery/slub-03.jpg";
import slub04 from "../../public/gallery/slub-04.jpg";
import slub05 from "../../public/gallery/slub-05.jpg";
import slub06 from "../../public/gallery/slub-06.jpg";
import portret01 from "../../public/gallery/portret-01.jpg";
import portret02 from "../../public/gallery/portret-02.jpg";
import portret03 from "../../public/gallery/portret-03.jpg";
import portret04 from "../../public/gallery/portret-04.jpg";
import rodzina01 from "../../public/gallery/rodzina-01.jpg";
import rodzina02 from "../../public/gallery/rodzina-02.jpg";
import rodzina03 from "../../public/gallery/rodzina-03.jpg";

export const site = {
  name: "Lena Czarnecka",
  tagline: "Fotografia ślubna i portretowa",
  city: "Kraków",
  est: "2017",
  email: "kontakt@lenaczarnecka.pl",
  instagram: "lena.czarnecka.foto",
  instagramUrl: "https://instagram.com/lena.czarnecka.foto",
  url: "https://fotograf-lena.vercel.app",
};

export const heroImage = hero;
export const portraitImage = lena;

export type Category = "slub" | "portret" | "rodzina";

export const categories: { id: Category; label: string }[] = [
  { id: "slub", label: "Śluby" },
  { id: "portret", label: "Portrety" },
  { id: "rodzina", label: "Rodzinne" },
];

export type Photo = {
  src: StaticImageData;
  alt: string;
  title: string;
  place: string;
  category: Category;
};

export const photos: Photo[] = [
  {
    src: slub01,
    alt: "Para młoda idzie pod palmą o zmierzchu, panna młoda trzyma bukiet",
    title: "Marta & Jan",
    place: "Taormina, Sycylia",
    category: "slub",
  },
  {
    src: portret01,
    alt: "Portret kobiety w prążkowanej koszuli w złotym świetle zachodu",
    title: "Julia",
    place: "Zakrzówek, złota godzina",
    category: "portret",
  },
  {
    src: slub03,
    alt: "Dłonie pary młodej z obrączkami na tle bukietu",
    title: "Detal — obrączki",
    place: "Dwór w Tomaszowicach",
    category: "slub",
  },
  {
    src: rodzina01,
    alt: "Wielopokoleniowa rodzina trzyma się za ręce na plaży o zachodzie słońca",
    title: "Trzy pokolenia",
    place: "Bałtyk, sierpień",
    category: "rodzina",
  },
  {
    src: slub02,
    alt: "Para młoda na kamienistej plaży, welon owinięty wokół obojga",
    title: "Gosia & Tomek",
    place: "Klif w Orłowie",
    category: "slub",
  },
  {
    src: portret02,
    alt: "Roześmiana kobieta w bordowej sukience, portret miejski",
    title: "Natalia",
    place: "Kazimierz, Kraków",
    category: "portret",
  },
  {
    src: slub05,
    alt: "Para młoda idzie przez górską przełęcz o świcie",
    title: "Kasia & Michał — plener",
    place: "Tatry Zachodnie",
    category: "slub",
  },
  {
    src: rodzina02,
    alt: "Rodzice z trójką dzieci idą gęsiego przez letnią łąkę",
    title: "Rodzina K.",
    place: "Łąki pod Krakowem",
    category: "rodzina",
  },
  {
    src: slub04,
    alt: "Pocałunek pary młodej w deszczu płatków kwiatów wśród gości",
    title: "Ania & Paweł",
    place: "Dwór w Tomaszowicach",
    category: "slub",
  },
  {
    src: portret03,
    alt: "Portret uśmiechniętej kobiety o blond włosach w wieczornym świetle ogrodu",
    title: "Pani Ewa",
    place: "Wola Justowska",
    category: "portret",
  },
  {
    src: rodzina03,
    alt: "Mama z dwójką małych dzieci na kanapie podczas sesji domowej",
    title: "Niedziela w domu",
    place: "Sesja lifestyle",
    category: "rodzina",
  },
  {
    src: portret04,
    alt: "Studyjny portret kobiety w czarnej bluzce na grafitowym tle",
    title: "Weronika",
    place: "Studio, Podgórze",
    category: "portret",
  },
  {
    src: slub06,
    alt: "Kompozycja kwiatowa na drewnianej bramie ślubnej w plenerze",
    title: "Ceremonia w plenerze",
    place: "Zamek Ogrodzieniec",
    category: "slub",
  },
];

export type Pakiet = {
  nr: string;
  name: string;
  sub: string;
  includes: string[];
  price: string;
};

export const pakiety: Pakiet[] = [
  {
    nr: "01",
    name: "Portret",
    sub: "sesja indywidualna lub par",
    includes: [
      "60–90 minut w plenerze lub studiu",
      "30+ kadrów po autorskiej obróbce",
      "galeria online na 12 miesięcy",
      "przewodnik „jak się przygotować”",
    ],
    price: "od 650 zł",
  },
  {
    nr: "02",
    name: "Ślub",
    sub: "pełny reportaż dnia",
    includes: [
      "do 12 godzin reportażu",
      "500+ zdjęć po obróbce",
      "galeria online + pendrive w pudełku",
      "mini-plener w dniu ślubu",
    ],
    price: "od 4 900 zł",
  },
  {
    nr: "03",
    name: "Rozszerzony",
    sub: "reportaż + plener + album",
    includes: [
      "wszystko z pakietu Ślub",
      "plener poślubny (góry / morze / miasto)",
      "album 30×30 ręcznie oprawiany",
      "dwie fotoksiążki dla rodziców",
    ],
    price: "od 7 400 zł",
  },
];

export type Opinia = { quote: string; author: string; context: string };

export const opinie: Opinia[] = [
  {
    quote:
      "Lena jest niewidzialna w najlepszym możliwym sensie. Przez cały dzień nie czuliśmy obiektywu, a potem w galerii odnaleźliśmy każdą emocję — także te, o których nie wiedzieliśmy.",
    author: "Marta i Jan",
    context: "reportaż ślubny, Sycylia",
  },
  {
    quote:
      "Bałam się sesji jak ognia, bo „nie wychodzę na zdjęciach”. Po dziesięciu minutach zapomniałam, że ktoś mnie fotografuje. Wyszłam ja — tylko w wersji, którą wreszcie lubię.",
    author: "Julia",
    context: "sesja portretowa",
  },
  {
    quote:
      "Zdjęcia naszej piątki wiszą nad kominkiem i codziennie nie mogę uwierzyć, że tak naprawdę wyglądamy. Zero pozowania, samo życie.",
    author: "Magda K.",
    context: "sesja rodzinna",
  },
];

export const oMnie = {
  heading: "Fotografuję tak, żeby za dwadzieścia lat pachniało tamtym dniem.",
  paragraphs: [
    "Nazywam się Lena Czarnecka i od dziewięciu lat dokumentuję śluby, portrety i codzienność rodzin — głównie w Krakowie, ale walizka zawsze stoi spakowana. Zaczynałam od analogowej lustrzanki taty; do dziś najbardziej interesuje mnie to, co dzieje się między pozowanymi kadrami: spojrzenia, dłonie, łza, której nikt nie zdążył wytrzeć.",
    "Pracuję reportażowo. Nie ustawiam, nie poprawiam rzeczywistości — towarzyszę jej dyskretnie i czekam na moment. Edytuję w ciepłych, miękkich tonacjach inspirowanych filmem analogowym, bo wierzę, że zdjęcia mają się dobrze starzeć — jak dobre wino i dobre małżeństwa.",
  ],
  facts: [
    { value: "200+", label: "reportaży ślubnych" },
    { value: "9", label: "lat za obiektywem" },
    { value: "60 000", label: "kadrów rocznie" },
  ],
};
