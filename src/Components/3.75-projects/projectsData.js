export const projectsData = [
  {
    id: 1,
    title: "BarberShop Application",
    overview: {
      ar: `قبل ليلة تخرجي، كنت أريد أن أحلق شعري وأضع بعض المرطبات لشعري 😁
ذهبت إلى حلاقي الرائع جلال (الذي أدعوكم لتجربة حلاقته الرائعة).
وأنا جالس أنتظر دوري، مستعجل لكي أقوم بحفظ بعض كلمات الشكر للأساتذة الكرام،
اقترحنا فكرة إنشاء تطبيق لإلغاء الجلسات الطويلة في قاعة مليئة بالشعر واتصالات حجز المواعيد التقليدية.

بعد جلسة أو جلستين في المقهى، فكرنا في طريقة نجعلها سهلة وتناسب جميع الفئات في المجتمع.
بعد ذلك، بدأنا أنا وصديقي <a href="https://www.linkedin.com/in/saqqal-abdelaziz/" target="_blank" rel="noopener noreferrer" style="color: var(--blue); text-decoration: none;">عبدالعزيز</a> في كتابة بعض "المعكرونة" في حواسيبنا للخروج بهذه النتيجة الرائعة:

للحلاق:
• إدارة كاملة لأوقات العمل والخدمات وأسعارها
• التحكم في الطلبات (قبول/رفض) مع إشعارات واتساب فورية
• نظام جداول ذكي يشمل:
    - طلبات اليوم الحالي
    - الحجوزات المستقبلية
    - السجلات المكتملة والملغاة
• لوحة تحكم إحصائية شاملة للمداخيل والزبائن

للزبون:
• تسجيل سهل برقم الهاتف
• حجز الخدمات (مثال: قصة شعر + مرطب = 60 درهم، 60 دقيقة)
• عرض ذكي للمواعيد المتاحة
• إدارة الحجز عبر الواتساب مع إمكانية الإلغاء

قريباً:
• دعم الصالونات المتعددة والحلاقين المتعددين
• إضافة متجر إلكتروني`,
      
      en: `The night before my graduation, I wanted to get a haircut and put some moisturizer in my hair 😁
I went to my amazing barber Jalal (whom I invite you to try his fantastic haircuts).
While sitting waiting for my turn, rushing to memorize some thank you words for my dear professors,
we proposed an idea to create an app to eliminate long waiting sessions in a hair-filled salon and traditional appointment booking calls.

After a session or two at the café, we thought about making it easy and suitable for all segments of society.
Then, my friend <a href="https://www.linkedin.com/in/saqqal-abdelaziz/" target="_blank" rel="noopener noreferrer" style="color: var(--blue); text-decoration: none;">ABDELAZIZ</a> and I started writing some "spaghetti code" on our computers to come up with this amazing result:

For the Barber:
• Complete management of working hours, services, and prices
• Control of requests (accept/reject) with instant WhatsApp notifications
• Smart scheduling system including:
    - Today's appointments
    - Future bookings
    - Completed and cancelled records
• Comprehensive statistical dashboard for income and customers

For the Customer:
• Easy registration with phone number
• Service booking (example: haircut + moisturizer = 60 dirhams, 60 minutes)
• Smart display of available times
• Booking management via WhatsApp with cancellation option

Coming Soon:
• Support for multiple salons and multiple barbers
• Adding e-commerce store`
    },
    image: "../assets/project-images/barbershop/allViewbarber.webp",
    images: [
      "../assets/project-images/barbershop/allViewbarber.webp",
      "../assets/project-images/barbershop/view dashbord.webp",
      "../assets/project-images/barbershop/dashbord jalalbarber.webp",
      "../assets/project-images/barbershop/reservation jalalbarber.webp",
      "../assets/project-images/barbershop/confirmation whatssap.webp",
      "../assets/project-images/barbershop/annumationReservation.webp",
      "../assets/project-images/barbershop/cancled reservation.webp",
      "../assets/project-images/barbershop/closed app.webp",
      "../assets/project-images/barbershop/login jalalbarber.PNG",
      "../assets/project-images/barbershop/register jalalbarber.PNG"
    ],
    tags: ["react", "javascript", "tailwind"],
    source_code: "https://github.com/yourusername/barbershop",
    demo: "https://jalalbarber.com/",
    technicalDescription: `A full-stack barbershop management system built with React and modern web technologies. Features real-time booking, WhatsApp integration, and a comprehensive dashboard.`,
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "WhatsApp API",
      "JWT Authentication",
      "Responsive Design"
    ],
    keyFeatures: [
      "Real-time appointment booking",
      "WhatsApp notifications",
      "Admin dashboard",
      "Service management",
      "Booking history",
      "Multi-language support (AR/EN)",
      "Responsive mobile design"
    ]
  },
  {
    id: 2,
    title: "E-commerce Platform",
    overview: {
      ar: `منصة تجارة إلكترونية كاملة مع Next.js، وتشمل التوجيه الديناميكي وعرض من جانب الخادم`,
      en: `Full-stack e-commerce solution with Next.js, featuring dynamic routing and server-side rendering`
    },
    image: "ecommerce.png",
    tags: ["nextjs", "react", "nodejs"],
    source_code: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com"
  },
  {
    id: 3,
    title: "Task Management App",
    overview: {
      ar: `تطبيق إدارة مهام في الوقت الفعلي مبني باستخدام Firebase و React`,
      en: `Real-time task management application built with Firebase and React`
    },
    image: "taskmanagement.png",
    tags: ["firebase", "react", "javascript"],
    source_code: "https://github.com/yourusername/taskmanagement",
    demo: "https://taskmanagement-demo.com"
  },
  {
    id: 4,
    title: "Weather Dashboard",
    overview: {
      ar: `لوحة معلومات الطقس التفاعلية باستخدام JavaScript و API الطقس`,
      en: `Interactive weather dashboard using JavaScript and Weather API`
    },
    image: "weather.png",
    tags: ["javascript", "html", "css"],
    source_code: "https://github.com/yourusername/weather",
    demo: "https://weather-demo.com"
  },
  {
    id: 5,
    title: "Blog Platform",
    overview: {
      ar: `منصة مدونة حديثة مع Tailwind CSS و Next.js`,
      en: `Modern blog platform with Tailwind CSS and Next.js`
    },
    image: "blog.png",
    tags: ["tailwind", "nextjs", "react"],
    source_code: "https://github.com/yourusername/blog",
    demo: "https://blog-demo.com"
  },
  {
    id: 6,
    title: "Landing Page",
    overview: {
      ar: `صفحة هبوط متجاوبة مع HTML5 و CSS3 الحديثة`,
      en: `Responsive landing page with modern HTML5 and CSS3`
    },
    image: "landing.png",
    tags: ["html", "css", "javascript"],
    source_code: "https://github.com/yourusername/landing",
    demo: "https://landing-demo.com"
  }
];