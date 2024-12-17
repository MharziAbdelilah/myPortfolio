import React from 'react';
import './about.css';
import { useLanguage } from '../../context/LanguageContext';
import WhatDrivesMe from './WhatDrivesMe/WhatDrivesMe';
import WhyNow from './WhyNow/WhyNow';

const About = () => {
  const { currentLang } = useLanguage();
  const isRTL = currentLang === 'ar';

  return (
    <>
      <div className="about-container">
        <div className={`about-content ${isRTL ? 'rtl' : ''}`}>
          <div className="text-content">
            {currentLang === 'en' ? (
              <>
                <h1 className="about-title">Hi, I'm ABDELILAH</h1>
                <div className="about-description">
                  <p>
                    In my childhood, I dreamed of becoming Morocco's Maldini. But fate had other plans. While I was deep in my dreams of blocking Ronaldo's shots, I woke up to find myself in a white suit with a white belt, shouting "ICHI, NI, SAN" at the top of my lungs. Over ten years of practicing Karate, I collected championships across the East and Morocco, earning a black belt at sixteen.
                  </p>
                  <p>
                    <strong>Lucky or not?</strong> I didn't have to walk ten kilometers barefoot to school; I grew up with <strong>"Uncle <span className="google-text"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>"</strong>. I got instant answers, but my mind was like an energetic monkey jumping between ideas - sometimes an entrepreneur, other times a legend like El Tigre Enmascarado. <strong>The result?</strong> Two extra years of hard learning.
                  </p>
                  <p>
                    Coincidence led me to Computer Engineering. There, I let my mind dive deep into its thoughts. I discovered that my scattered thinking helps me see hidden connections - each new idea adds a dimension that connects it to the main project.
                  </p>
                  <p>
                    <strong>Today! I implement AI | Simplify processes through automation | Transform ideas into innovative products</strong>
                  </p>
                  <p>
                    This is me - 26 years of experiences and lessons that led to these words. I'd be happy to receive your message, and I promise coffee... <strong>but you're paying</strong> 😁
                  </p>
                  <p>
                    <strong>All the love</strong>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="about-title">مرحبا، أنا عبدالاله</h1>
                <div className="about-description">
                  <p>
                    في طفولتي، كنت أحلم بأن أصبح مالديني المغرب. لكن القدر كان له رأي آخر. وأنا منغمس في أحلامي أصد هجمات رونالدو، استيقظت لأجد نفسي أرتدي بدلة بيضاء وحزاماً أبيض، أصرخ "ICHI, NI, SAN" بكل قوتي. خلال عشر سنوات من رياضة الكاراتيه، حصدت بطولات الشرق والمغرب، وحزاماً أسود في سن السادسة عشر.
                  </p>
                  <p>
                    <strong>محظوظ أم لا؟</strong>
                    لم أمشِ عشرة كيلومترات للمدرسة حافي القدمين، بل نشأت مع <strong>"عمي <span className="google-text"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>"</strong>. أحصل على الإجابات فورية، لكن كان عقلي كقرد نشط يقفز بين الأفكار - تارةً رائد أعمال، وتارةً أسطورة كالنمر المقنع. <strong>النتيجة؟</strong> سنتان إضافيتان من التعلم القاسي.
                  </p>
                  <p>
                    الصدفة قادتني إلى هندسة المعلوميات. هناك، سمحت لعقلي بأن يغوص في أفكاره. اكتشفت أن التشتت يقودني إلى رؤية روابط خفية - كل فكرة جديدة تضيف بُعداً يربطها بالمشروع الأساسي.
                  </p>
                  <p>
                    <strong>اليوم! أوظف الذكاء الاصطناعي | أبسط العمليات بالأتمتة | أحول الأفكار إلى منتجات مبتكرة</strong>
                  </p>
                  <p>
                    هذا أنا - 26 سنة من التجارب والدروس لأصل إلى هذه الكلمات. سأكون سعيداً برسالتك، وأعدك بقهوة... <strong>وأنت من يدفع</strong> 😁
                  </p>
                  <p>
                    <strong>كل الحب</strong>
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="image-section">
            <div className="profile-image-container">
              <img 
                src="https://picsum.photos/100" 
                alt="Profile" 
                className="profile-image"
              />
            </div>
            <div className="about-social-container">
              <div className="about-social-links">
                <a href="https://twitter.com/username" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="about-social-icon">
                    <path d="M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.6559L13.3174 10.7749ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7646 19.0075H15.6432L11.4257 12.9738Z" />
                  </svg>
                  {currentLang === 'en' ? 'Follow on X' : 'تابع على X'}
                </a>
                <a href="https://instagram.com/username" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="about-social-icon">
                    <path d="M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.419A4.412 4.412 0 0 0 4.51 4.51c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.419 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.419 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.038-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"/>
                    <path d="M12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0-7.622a4.622 4.622 0 1 0 0 9.244 4.622 4.622 0 0 0 0-9.244Zm5.884-.182a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0Z"/>
                  </svg>
                  {currentLang === 'en' ? 'Follow on Instagram' : 'تابع على انستغرام'}
                </a>
                <a href="https://github.com/username" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="about-social-icon">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"/>
                  </svg>
                  {currentLang === 'en' ? 'Follow on GitHub' : 'تابع على GitHub'}
                </a>
                <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="about-social-icon">
                    <path d="M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"/>
                  </svg>
                  {currentLang === 'en' ? 'Follow on LinkedIn' : 'تابع على لينكد إن'}
                </a>
                <div className="about-social-separator"></div>
                <a href="mailto:spencer@planetaria.tech" className="about-email-link">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="about-social-icon">
                    <path fillRule="evenodd" d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z" />
                  </svg>
                  spencer@planetaria.tech
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhatDrivesMe />
      <WhyNow />
    </>
  );
};

export default About;
