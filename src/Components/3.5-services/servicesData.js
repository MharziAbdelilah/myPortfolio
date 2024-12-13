import { FaCode, FaDesktop, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import { BiCodeAlt } from 'react-icons/bi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { AiOutlineApi } from 'react-icons/ai';
import { SiWebpack } from 'react-icons/si';

export const servicesData = {
  en: [
    {
      id: 1,
      icon: <BiCodeAlt />,
      title: "Custom Web Solutions",
      description: "Your vision deserves a unique digital presence.",
      features: [
        "Interactive User Interfaces",
        "Responsive Design Systems",
        "Custom Web Applications",
        "Progressive Web Apps (PWA)"
      ]
    },
    {
      id: 2,
      icon: <MdOutlineDesignServices />,
      title: "UI/UX Design",
      description: "Designing intuitive and engaging user experiences",
      features: [
        "User Interface Design",
        "User Experience Design",
        "Wireframing & Prototyping",
        "Design Systems"
      ]
    },
    {
      id: 3,
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      description: "Building cross-platform mobile applications",
      features: [
        "React Native Development",
        "iOS & Android Apps",
        "App Optimization",
        "Mobile UI Design"
      ]
    },
    {
      id: 4,
      icon: <AiOutlineApi />,
      title: "API Development",
      description: "Creating robust and scalable APIs",
      features: [
        "RESTful API Design",
        "API Integration",
        "Authentication & Security",
        "Documentation"
      ]
    }
  ],
  ar: [
    {
      id: 1,
      icon: <BiCodeAlt />,
      title: "حلول ويب مخصصة ",
      description: "رؤيتك تستحق حضورًا رقميًا فريدًا.",
      features: [
        "تطوير مواقع مخصصة",
        "تصميم متجاوب",
        "تحسين الأداء",
        "هيكلة صديقة لمحركات البحث"
      ]
    },
    {
      id: 2,
      icon: <MdOutlineDesignServices />,
      title: "تصميم واجهات المستخدم",
      description: "تصميم تجارب مستخدم سهلة وجذابة",
      features: [
        "تصميم واجهات المستخدم",
        "تصميم تجربة المستخدم",
        "تصميم النماذج الأولية",
        "أنظمة التصميم"
      ]
    },
    {
      id: 3,
      icon: <FaMobileAlt />,
      title: "تطوير تطبيقات الجوال",
      description: "بناء تطبيقات جوال متعددة المنصات",
      features: [
        "تطوير بـ React Native",
        "تطبيقات iOS وأندرويد",
        "تحسين أداء التطبيقات",
        "تصميم واجهات الجوال"
      ]
    },
    {
      id: 4,
      icon: <AiOutlineApi />,
      title: "تطوير واجهات برمجة",
      description: "إنشاء واجهات برمجة قوية وقابلة للتطوير",
      features: [
        "تصميم واجهات RESTful",
        "دمج واجهات البرمجة",
        "المصادقة والأمان",
        "التوثيق"
      ]
    }
  ]
}; 