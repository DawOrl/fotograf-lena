import type { StaticImageData } from "next/image";

import hero from "../../public/gallery/hero.webp";
import lena from "../../public/gallery/lena.webp";
import slubPalma from "../../public/gallery/slub-palma.webp";
import slubGuziki from "../../public/gallery/slub-guziki.webp";
import slubWelon from "../../public/gallery/slub-welon.webp";
import slubTaniec from "../../public/gallery/slub-taniec.webp";
import slubTatry from "../../public/gallery/slub-tatry.webp";
import slubSad from "../../public/gallery/slub-sad.webp";
import slubBrama from "../../public/gallery/slub-brama.webp";
import portretJulia from "../../public/gallery/portret-julia.webp";
import portretHalina from "../../public/gallery/portret-halina.webp";
import portretEwa from "../../public/gallery/portret-ewa.webp";
import portretWeronika from "../../public/gallery/portret-weronika.webp";
import rodzinaLaka from "../../public/gallery/rodzina-laka.webp";
import rodzinaNiedziela from "../../public/gallery/rodzina-niedziela.webp";
import rodzinaWydmy from "../../public/gallery/rodzina-wydmy.webp";
import klisza from "../../public/render/klisza.webp";

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
export const filmStill = klisza;

export type Category = "slub" | "portret" | "rodzina";

export const categories: { id: Category; label: string; anchor: string; note: string }[] = [
  { id: "slub", label: "Śluby", anchor: "sluby", note: "reportaż całego dnia" },
  { id: "portret", label: "Portrety", anchor: "portrety", note: "plener i studio" },
  { id: "rodzina", label: "Rodzinne", anchor: "rodzinne", note: "dom, łąka, morze" },
];

export type Photo = {
  /** stały numer kadru, jak na stykówce: nie zmienia się przy filtrowaniu */
  nr: number;
  src: StaticImageData;
  alt: string;
  title: string;
  place: string;
  category: Category;
};

const raw: Omit<Photo, "nr">[] = [
  {
    src: slubPalma,
    alt: "Para młoda idzie pod palmą o zmierzchu, panna młoda trzyma bukiet",
    title: "Marta i Jan",
    place: "Taormina, Sycylia",
    category: "slub",
  },
  {
    src: portretJulia,
    alt: "Portret kobiety w prążkowanej koszuli w złotym świetle zachodu",
    title: "Julia",
    place: "Zakrzówek, złota godzina",
    category: "portret",
  },
  {
    src: slubGuziki,
    alt: "Dłonie mamy zapinają rząd drobnych guzików na plecach sukni ślubnej, poranne światło z okna",
    title: "Ania i Paweł: ostatni guzik",
    place: "Dwór w Tomaszowicach",
    category: "slub",
  },
  {
    src: rodzinaLaka,
    alt: "Rodzice z trójką dzieci idą gęsiego przez letnią łąkę, trzymając się za ręce",
    title: "Rodzina K.",
    place: "Łąki pod Krakowem",
    category: "rodzina",
  },
  {
    src: slubTaniec,
    alt: "Pierwszy taniec pary młodej w drewnianej stodole pod girlandą żarówek, goście jako sylwetki na pierwszym planie",
    title: "Ania i Paweł: pierwszy taniec",
    place: "Dwór w Tomaszowicach",
    category: "slub",
  },
  {
    src: portretHalina,
    alt: "Starsza kobieta o srebrnych włosach z uśmiechem patrzy na bukiet dalii w swoim ogródku",
    title: "Pani Halina",
    place: "Ogródki działkowe, Nowa Huta",
    category: "portret",
  },
  {
    src: slubWelon,
    alt: "Para młoda na kamienistej plaży, długi welon rozwiany wokół obojga",
    title: "Gosia i Tomek",
    place: "Klif w Orłowie",
    category: "slub",
  },
  {
    src: rodzinaNiedziela,
    alt: "Dwoje małych dzieci w piżamach skacze po łóżku z lnianą pościelą w porannym słońcu",
    title: "Niedziela w domu",
    place: "Sesja domowa, Krowodrza",
    category: "rodzina",
  },
  {
    src: slubSad,
    alt: "Długi stół weselny w sadzie po kolacji: lniany obrus, świece, polne kwiaty i kieliszki w późnym świetle",
    title: "Ania i Paweł: po kolacji",
    place: "Sad przy dworze w Tomaszowicach",
    category: "slub",
  },
  {
    src: portretEwa,
    alt: "Portret uśmiechniętej kobiety o jasnych włosach w wieczornym świetle ogrodu",
    title: "Pani Ewa",
    place: "Wola Justowska",
    category: "portret",
  },
  {
    src: slubTatry,
    alt: "Para młoda idzie grzbietem gór o świcie, daleko w kadrze pod jasnym niebem",
    title: "Kasia i Michał, plener",
    place: "Tatry Zachodnie",
    category: "slub",
  },
  {
    src: rodzinaWydmy,
    alt: "Tata z synkiem na barana i mama z kapeluszem w dłoni idą ścieżką przez wydmy porośnięte trawą",
    title: "Wakacje nad morzem",
    place: "Wydmy w Dębkach",
    category: "rodzina",
  },
  {
    src: portretWeronika,
    alt: "Studyjny portret kobiety w czarnej bluzce na grafitowym tle",
    title: "Weronika",
    place: "Studio, Podgórze",
    category: "portret",
  },
  {
    src: slubBrama,
    alt: "Bukiet z różami i zielenią przewiązany na lnianej bramie ślubnej w plenerze",
    title: "Ceremonia w plenerze",
    place: "Zamek Ogrodzieniec",
    category: "slub",
  },
];

export const photos: Photo[] = raw.map((p, i) => ({ ...p, nr: i + 1 }));

export type Pakiet = {
  nr: string;
  name: string;
  sub: string;
  includes: string[];
  /** cena "od", bez słowa "od" (dodaje je widok) */
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
    price: "650\u00a0zł",
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
    price: "4\u00a0900\u00a0zł",
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
    price: "7\u00a0400\u00a0zł",
  },
];

export type Opinia = { quote: string; author: string; context: string };

export const opinie: Opinia[] = [
  {
    quote:
      "Lena jest niewidzialna w najlepszym możliwym sensie. Przez cały dzień nie czuliśmy obiektywu, a potem w galerii odnaleźliśmy każdą emocję, także te, o których nie wiedzieliśmy.",
    author: "Marta i Jan",
    context: "reportaż ślubny, Sycylia",
  },
  {
    quote:
      "Bałam się sesji jak ognia, bo „nie wychodzę na zdjęciach”. Po dziesięciu minutach zapomniałam, że ktoś mnie fotografuje. Wyszłam ja, tylko w wersji, którą wreszcie lubię.",
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
    "Nazywam się Lena Czarnecka i od dziewięciu lat dokumentuję śluby, portrety i codzienność rodzin. Głównie w Krakowie, ale walizka zawsze stoi spakowana. Zaczynałam od analogowej lustrzanki taty; do dziś najbardziej interesuje mnie to, co dzieje się między pozowanymi kadrami: spojrzenia, dłonie, łza, której nikt nie zdążył wytrzeć.",
    "Pracuję reportażowo. Nie ustawiam i nie poprawiam rzeczywistości: towarzyszę jej dyskretnie i czekam na moment. Edytuję w ciepłych, miękkich tonacjach inspirowanych filmem analogowym, bo wierzę, że zdjęcia mają się dobrze starzeć. Jak dobre wino i dobre małżeństwa.",
  ],
  facts: [
    { value: "200+", label: "reportaży ślubnych" },
    { value: "9", label: "lat za obiektywem" },
    { value: "60\u00a0000", label: "kadrów rocznie" },
  ],
};
