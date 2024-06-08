import banner from "../assets/panars/aboutus.webp";
import featuersImage from "../assets/aboutus-logos/featuers.svg";
import messegeImage from "../assets/aboutus-logos/messege.svg";
import servesesImage from "../assets/aboutus-logos/serveses.svg";
import visonImage from "../assets/aboutus-logos/vison.svg";
const AboutUs = () => {
  return (
    <div>
      <div className="container mx-auto ">
        <img src={banner} alt="banner" className="rounded-2xl my-4 w-full" />
      </div>
      <div className="mainHeading">
        <h1>من نحن</h1>
      </div>
      <div className="container mx-auto">
        <div className="border border-gray p-4 rounded-xl my-4">
          <h2 className="flex items-center gap-4">
            <img className="h-[40px]" src={visonImage} alt="" />
            <span className="text-xl">رؤيتنا</span>
          </h2>
          <p className="py-4">
            نسعى جاهدين لأن نصبح الشركة الرائدة في مجال التداول، ونطمح لنكون
            الخيار الأول للعملاء عند البحث عن حلول استثمارية ناجحة. نتطلع إلى
            تحقيق التميز في تحليل الأسواق المالية وتقديم خدمات مبتكرة تلبي
            تماماً احتياجات عملائنا الكرام.
          </p>
        </div>
        <div className="border border-gray p-4 rounded-xl my-4">
          <h2 className="flex items-center gap-4">
            <img className="h-[40px]" src={messegeImage} alt="" />
            <span className="text-xl">رسالتنا</span>
          </h2>
          <p className="py-4">
            نسعى جاهدين لتقديم حلول استثمارية متميزة وخدمات عالية الجودة تُسهم
            في تحقيق أهداف عملائنا المالية. نحن ملتزمون بالشفافية والنزاهة في
            جميع عمليات التداول، حيث نضع مصلحة العميل في مقدمة اهتماماتنا.
          </p>
        </div>
        <div className="border border-gray p-4 rounded-xl my-4">
          <h2 className="flex items-center gap-4">
            <img className="h-[40px]" src={servesesImage} alt="" />
            <span className="text-xl">خدماتنا</span>
          </h2>
          <p className="py-4">
            تُقدم شركتنا التداول الناجحة مجموعة واسعة من الخدمات والحلول
            الاستثمارية، بما في ذلك:
            <ul className="list-disc pr-4">
              <li>تحليل الأسواق المالية وتوصيات استثمارية دقيقة .</li>
              <li> تداول العملات الأجنبية والأسهم والسلع.</li>
              <li>
                إدارة الحسابات في سوق الفوركس لتلبية احتياجات العملاء المختلفة .
              </li>
              <li>
                الدورات التدريبية الوندوات لتطوير مهارات التداول من خلال
                استراتيجيات قوية وفريدة من نوعها مثل ال (smartMoney concept) SMC
                و ICT والعديد من الاستاتيجات الاخري
              </li>
              <li>
                خدمة التداول الاجتماعية (Social trade) حيث يقوم المتداولون بنشر
                تحاليلهم ويتم التعليق عليها من الأعضاء والخبراء ويمكن مشاركة هذه
                التحاليل.
              </li>
            </ul>
          </p>
        </div>
        <div className="border border-gray p-4 rounded-xl my-4">
          <h2 className="flex items-center gap-4">
            <img className="h-[40px]" src={featuersImage} alt="" />
            <span className="text-xl">مميزاتنا التنافسية</span>
          </h2>
          <p className="py-4">
            قوتنا تكمن في مجموعة من العوامل التي تميزنا عن المنافسين:
            <ul className="list-disc pr-4">
              <li>فريق متخصص من المحللين الماليين ذوي الخبرة العالية.</li>
              <li>
                ايصال المعلومات بأسلوب بسيط ومختصر يركز على الجوانب المهمة.
              </li>
              <li>
                تكنولوجيا حديثة تدعم عمليات التداول وتضمن سرعة التنفيذ والأمان.
              </li>
              <li>
                الالتزام بأعلى معايير الشفافية والنزاهة في تقديم المعلومات.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
