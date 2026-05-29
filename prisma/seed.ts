import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const settings = {
  siteName: "آراد وب",
  tagline: "سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان",
  phone: "+989121234567",
  phoneDisplay: "۰۹۱۲-۱۲۳-۴۵۶۷",
  whatsapp: "989121234567",
  email: "info@aradweb.ir",
  region: "گیلان، مازندران، گلستان — دفتر مجازی با پشتیبانی آنلاین",
  heroTitle: "سایت بسازید که",
  heroHighlight: "قطعی اینترنت هم نبنددش!",
  heroSubtitle:
    "سایت‌هایی که قطعی اینترنت هم نمی‌بنددشان — فروش آنلاین شما در رشت، ساری و مازندران حتی وقتی اینستاگرام و تلگرام قطع است، ادامه دارد.",
  offerTitle: "۲۰٪ تخفیف برای کسب‌وکارهای گیلان و مازندران",
  offerDescription:
    "تا پایان فصل جاری، پکیج حرفه‌ای سایت فروشگاهی با ۲۰٪ تخفیف ویژه — فقط برای ثبت‌نام‌های رشت، ساری، بابل، آمل و سایر شهرهای شمال.",
  clientLogos: [
    { name: "پوشاک رشت", abbr: "پر" },
    { name: "ساختمان ساری", abbr: "سس" },
    { name: "رستوران بابل", abbr: "رب" },
    { name: "کلینیک آمل", abbr: "کا" },
    { name: "لوازم نوشهر", abbr: "لن" },
    { name: "مسافرتی رامسر", abbr: "مر" },
  ],
  heroStats: [
    { value: "+۵۰", label: "پروژه تحویل‌شده" },
    { value: "۹۸٪", label: "رضایت مشتری" },
    { value: "۲۴/۷", label: "پشتیبانی" },
    { value: "۱۴", label: "شهر شمال" },
  ],
  theme: {
    primary: "#006666",
    primaryLight: "#007777",
    primaryDark: "#004d4d",
    accentBlue: "#3B82F6",
    accentOrange: "#F97316",
    textDark: "#1E293B",
    textMuted: "#64748B",
    sectionBg: "#F7F9FC",
    heroTint: "#F0F7F7",
  },
  font: {
    mode: "preset",
    presetId: "vazirmatn",
    customFamilyName: "AradCustom",
    customFileUrl: "",
  },
};

const portfolio = [
  {
    title: "فروشگاه پوشاک رشت",
    slug: "poshak-rasht",
    category: "فروشگاهی",
    city: "رشت",
    excerpt: "فروشگاه آنلاین پوشاک با درگاه پرداخت و سئو محلی رشت",
    coverGradient: "from-teal-500/20 to-cyan-500/20",
    clientName: "فروشگاه پارس",
    year: "۱۴۰۳",
    services: "طراحی UI, فروشگاهی, سئو محلی, درگاه زرین‌پال",
    content: `## چالش
فروشگاه پوشاک پارس در رشت بیش از ۸۰٪ فروش آنلاین خود را از اینستاگرام می‌گرفت. در قطعی‌های اینترنت، فروش به صفر نزدیک می‌شد.

## راه‌حل
سایت فروشگاهی واکنش‌گرا با سبد خرید، درگاه پرداخت و بهینه‌سازی برای جستجوی «پوشاک رشت».

## نتیجه
- رشد ۴۰٪ فروش آنلاین در ۳ ماه اول
- رتبه صفحه اول گوگل برای ۵ کلمه کلیدی محلی
- ثبت سفارش تلفنی حتی در روزهای قطعی شبکه`,
    featured: true,
    sortOrder: 1,
  },
  {
    title: "شرکت ساختمانی ساری",
    slug: "sakhtemani-sari",
    category: "شرکتی",
    city: "ساری",
    excerpt: "سایت شرکتی حرفه‌ای با معرفی پروژه‌ها و فرم استعلام",
    coverGradient: "from-blue-500/20 to-indigo-500/20",
    clientName: "سازه شمال",
    year: "۱۴۰۳",
    services: "سایت شرکتی, بلاگ, سئو محلی",
    content: `## چالش
شرکت ساختمانی بدون حضور آنلاین قوی، در مناقصه‌های محلی و جذب مشتری شرکتی ضعیف بود.

## راه‌حل
سایت چندصفحه‌ای با گالری پروژه‌ها، معرفی تیم، خدمات و فرم درخواست مشاوره.

## نتیجه
- افزایش ۳ برابری درخواست‌های تماس از گوگل
- اعتماد بیشتر مشتریان شرکتی`,
    sortOrder: 2,
  },
  {
    title: "رستوران سنتی بابل",
    slug: "restaurant-babol",
    category: "فروشگاهی",
    city: "بابل",
    excerpt: "منوی آنلاین و سفارش تلفنی یکپارچه",
    coverGradient: "from-orange-500/20 to-amber-500/20",
    clientName: "رستوران گیلانه",
    year: "۱۴۰۲",
    services: "منوی دیجیتال, فرم سفارش, سئو",
    content: `منوی آنلاین با عکس غذاها، دکمه تماس سریع و ثبت سفارش — مناسب برای مشتریان محلی بابل.`,
    sortOrder: 3,
  },
  {
    title: "کلینیک زیبایی آمل",
    slug: "clinic-amel",
    category: "شرکتی",
    city: "آمل",
    excerpt: "سایت کلینیک با رزرو آنلاین و سئو محلی",
    coverGradient: "from-emerald-500/20 to-teal-500/20",
    clientName: "کلینیک زیبا",
    year: "۱۴۰۳",
    services: "سایت شرکتی, سئو, فرم رزرو",
    content: `صفحات خدمات، گالری قبل/بعد و فرم رزرو — رتبه اول برای «کلینیک زیبایی آمل».`,
    sortOrder: 4,
  },
  {
    title: "لوازم خانگی نوشهر",
    slug: "lavazem-nowshahr",
    category: "فروشگاهی",
    city: "نوشهر",
    excerpt: "فروشگاه آنلاین لوازم خانگی شمال",
    coverGradient: "from-violet-500/20 to-purple-500/20",
    clientName: "خانه‌نو",
    year: "۱۴۰۲",
    services: "فروشگاهی, پنل مدیریت",
    content: `کاتالوگ محصولات با فیلتر، مقایسه و پرداخت آنلاین.`,
    sortOrder: 5,
  },
  {
    title: "آژانس مسافرتی رامسر",
    slug: "agency-ramsar",
    category: "شرکتی",
    city: "رامسر",
    excerpt: "رزرو تور و معرفی پکیج‌های سفر",
    coverGradient: "from-sky-500/20 to-blue-500/20",
    clientName: "سفر شمال",
    year: "۱۴۰۳",
    services: "سایت شرکتی, فرم رزرو",
    content: `معرفی تورها، پکیج‌های نوروزی و فرم استعلام قیمت.`,
    sortOrder: 6,
  },
];

const testimonials = [
  {
    name: "علی محمدی",
    role: "مدیر فروشگاه پوشاک",
    city: "رشت",
    text: "بعد از سایت آراد وب، حتی موقع قطعی اینترنت هم مشتریان با تماس تلفنی سفارش می‌دادند. فروش آنلاین ما ۴۰٪ رشد کرد.",
    rating: 5,
    sortOrder: 1,
  },
  {
    name: "زهرا احمدی",
    role: "صاحب کلینیک زیبایی",
    city: "ساری",
    text: "سئو محلی عالی بود. الان وقتی «کلینیک زیبایی ساری» سرچ می‌شود، ما صفحه اول گوگل هستیم.",
    rating: 5,
    sortOrder: 2,
  },
  {
    name: "رضا کریمی",
    role: "مدیرعامل شرکت ساختمانی",
    city: "بابل",
    text: "طراحی سایت خیلی حرفه‌ای و قابل اعتماد بود. مشتریان شرکتی ما اعتماد بیشتری پیدا کردند.",
    rating: 5,
    sortOrder: 3,
  },
];

async function main() {
  await prisma.formSubmission.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.portfolioProject.deleteMany();
  await prisma.siteSetting.deleteMany();

  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.create({
      data: { key, value: JSON.stringify(value) },
    });
  }

  for (const p of portfolio) {
    await prisma.portfolioProject.create({ data: p });
  }

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  await prisma.formSubmission.createMany({
    data: [
      {
        fullName: "محمد رضایی",
        phone: "09121234567",
        city: "رشت",
        businessType: "فروشگاه فیزیکی",
        message: "می‌خواهم سایت فروشگاهی داشته باشم",
        read: false,
      },
      {
        fullName: "فاطمه حسینی",
        phone: "09113456789",
        city: "ساری",
        businessType: "کلینیک",
        message: "نیاز به سئو محلی دارم",
        read: true,
      },
    ],
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
