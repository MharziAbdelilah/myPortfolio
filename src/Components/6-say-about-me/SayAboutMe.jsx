import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './SayAboutMe.css';

const getStoredTestimonials = () => {
  try {
    return JSON.parse(localStorage.getItem('testimonials')) || [];
  } catch {
    return [];
  }
};

const SayAboutMe = () => {
  const { currentLang } = useLanguage();

  const testimonials = {
    en: [
      {
        name: "John Smith",
        role: "Senior Developer",
        text: "Working with this developer was an absolute pleasure. Their technical skills and attention to detail are outstanding.",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        name: "Sarah Johnson",
        role: "Project Manager",
        text: "Exceptional problem-solving abilities and great communication skills.",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      {
        name: "Michael Chen",
        role: "Tech Lead",
        text: "A talented developer who brings innovative solutions to complex problems.",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      {
        name: "Emma Wilson",
        role: "UI/UX Designer",
        text: "Great collaboration skills and excellent understanding of design principles.",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      {
        name: "David Brown",
        role: "Product Owner",
        text: "Delivers high-quality work consistently and meets all deadlines.",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      {
        name: "Lisa Anderson",
        role: "Frontend Developer",
        text: "Exceptional coding standards and great attention to detail.",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      {
        name: "James Wilson",
        role: "Backend Developer",
        text: "Outstanding problem-solving skills and technical expertise.",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
      },
      {
        name: "Maria Garcia",
        role: "Software Architect",
        text: "Innovative thinking and excellent system design capabilities.",
        image: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      {
        name: "Rachel Zhang",
        role: "DevOps Engineer",
        text: "Exceptional ability to integrate modern development practices with practical solutions.",
        image: "https://randomuser.me/api/portraits/women/5.jpg"
      },
      {
        name: "Alex Thompson",
        role: "Mobile Developer",
        text: "Outstanding cross-platform development skills and excellent code organization.",
        image: "https://randomuser.me/api/portraits/men/5.jpg"
      },
      {
        name: "Sophia Martinez",
        role: "QA Lead",
        text: "Writes highly testable code and has a great understanding of quality practices.",
        image: "https://randomuser.me/api/portraits/women/6.jpg"
      },
      {
        name: "Daniel Kim",
        role: "Cloud Architect",
        text: "Impressive knowledge of cloud technologies and scalable architecture.",
        image: "https://randomuser.me/api/portraits/men/6.jpg"
      },
      {
        name: "Isabella Romano",
        role: "Scrum Master",
        text: "Great team player with excellent agile development practices.",
        image: "https://randomuser.me/api/portraits/women/7.jpg"
      },
      {
        name: "Thomas Anderson",
        role: "Security Specialist",
        text: "Consistently implements secure coding practices and maintains high standards.",
        image: "https://randomuser.me/api/portraits/men/7.jpg"
      },
      {
        name: "Emily Parker",
        role: "Data Scientist",
        text: "Excellent at integrating data-driven solutions into web applications.",
        image: "https://randomuser.me/api/portraits/women/8.jpg"
      },
      {
        name: "Ryan O'Connor",
        role: "Systems Analyst",
        text: "Brings valuable insights to project architecture and system design.",
        image: "https://randomuser.me/api/portraits/men/8.jpg"
      },
      {
        name: "Nina Patel",
        role: "UX Researcher",
        text: "Great attention to user experience and accessibility considerations.",
        image: "https://randomuser.me/api/portraits/women/9.jpg"
      },
      {
        name: "Chris Morgan",
        role: "Performance Engineer",
        text: "Exceptional focus on optimization and application performance.",
        image: "https://randomuser.me/api/portraits/men/9.jpg"
      }
    ],
    ar: [
      {
        name: "أحمد محمد",
        role: "مطور رئيسي",
        text: "العمل مع هذا المطور كان متعة مطلقة. مهاراته التقنية واهتمامه بالتفاصيل استثنائية.",
        image: "https://randomuser.me/api/portraits/men/1.jpg"
      },
      {
        name: "سارة عبدالله",
        role: "مدير مشروع",
        text: "قدرات استثنائية في حل المشكلات ومهارات تواصل رائعة.",
        image: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      {
        name: "محمد أحمد",
        role: "قائد تقني",
        text: "مطور موهوب يقدم حلولاً مبتكرة للمشكلات المعقدة.",
        image: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      {
        name: "نور علي",
        role: "مصمم واجهات",
        text: "مهارات تعاون رائعة وفهم ممتاز لمبادئ التصميم.",
        image: "https://randomuser.me/api/portraits/women/2.jpg"
      },
      {
        name: "عمر حسن",
        role: "مالك المنتج",
        text: "يقدم عملاً عالي الجودة باستمرار ويلتزم بجميع المواعيد النهائية.",
        image: "https://randomuser.me/api/portraits/men/3.jpg"
      },
      {
        name: "ليلى محمود",
        role: "مطور واجهة أمامية",
        text: "معايير برمجية استثنائية واهتمام كبير بالتفاصيل.",
        image: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      {
        name: "ياسر عبدالرحمن",
        role: "مطور خلفية",
        text: "مهارات متميزة في حل المشكلات وخبرة تقنية عالية.",
        image: "https://randomuser.me/api/portraits/men/4.jpg"
      },
      {
        name: "مريم حسين",
        role: "مهندس برمجيات",
        text: "تفكير مبتكر وقدرات ممتازة في تصميم النظم.",
        image: "https://randomuser.me/api/portraits/women/4.jpg"
      },
      {
        name: "سمير حسن",
        role: "مهندس عمليات التطوير",
        text: "قدرة استثنائية على دمج ممارسات التطوير الحديثة مع الحلول العملية.",
        image: "https://randomuser.me/api/portraits/men/5.jpg"
      },
      {
        name: "رنا محمد",
        role: "مطور تطبيقات جوال",
        text: "مهارات متميزة في تطوير التطبيقات عبر المنصات وتنظيم الكود ممتاز.",
        image: "https://randomuser.me/api/portraits/women/5.jpg"
      },
      {
        name: "كريم أحمد",
        role: "مهندس الجودة",
        text: "يكتب كودًا قابلاً للاختبار ولديه فهم رائع لممارسات الجودة.",
        image: "https://randomuser.me/api/portraits/men/6.jpg"
      },
      {
        name: "فاطمة علي",
        role: "مهندسة سحابية",
        text: "معرفة مثيرة للإعجاب بالتقنيات السحابية والهندسة القابلة للتطوير.",
        image: "https://randomuser.me/api/portraits/women/6.jpg"
      },
      {
        name: "طارق حسين",
        role: "قائد سكرم",
        text: "لاعب فريق رائع مع ممارسات تطوير أجايل ممتازة.",
        image: "https://randomuser.me/api/portraits/men/7.jpg"
      },
      {
        name: "نادية عمر",
        role: "متخصصة أمن",
        text: "تطبق باستمرار ممارسات البرمجة الآمنة وتحافظ على معايير عالية.",
        image: "https://randomuser.me/api/portraits/women/7.jpg"
      },
      {
        name: "زياد محمود",
        role: "عالم بيانات",
        text: "ممتاز في دمج الحلول المعتمدة على البيانات في تطبيقات الويب.",
        image: "https://randomuser.me/api/portraits/men/8.jpg"
      },
      {
        name: "هدى سعيد",
        role: "محللة نظم",
        text: "تقدم رؤى قيمة لهندسة المشاريع وتصميم النظم.",
        image: "https://randomuser.me/api/portraits/women/8.jpg"
      },
      {
        name: "عمار يوسف",
        role: "باحث تجربة المستخدم",
        text: "اهتمام كبير بتجربة المستخدم واعتبارات إمكانية الوصول.",
        image: "https://randomuser.me/api/portraits/men/9.jpg"
      },
      {
        name: "رانيا خالد",
        role: "مهندسة أداء",
        text: "تركيز استثنائي على التحسين وأداء التطبيقات.",
        image: "https://randomuser.me/api/portraits/women/9.jpg"
      }
    ]
  };

  const storedTestimonials = getStoredTestimonials();
  const allTestimonials = [...testimonials[currentLang], ...storedTestimonials];

  return (
    <section className="testimonials-section">
      <div className="testimonials-header">
        <h2 className="section-title">
          {currentLang === 'en' ? 'What People Say About Me' : 'ماذا يقول الناس عني'}
        </h2>
      </div>

      <div className="testimonials-container">
        {[...allTestimonials, ...allTestimonials].map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-header">
              <div className="testimonial-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="testimonial-info">
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            </div>
            <p className="testimonial-text">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SayAboutMe;
