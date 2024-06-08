import banner from "../assets/panars/proudctsbanner.webp";
import analistLogo from "../assets/products/logos/analist.svg";
import educationLogo from "../assets/products/logos/education.svg";
import liveLogo from "../assets/products/logos/live.svg";
import firstStageLogo from "../assets/products/logos/firstStage.svg";
import skLogo from "../assets/products/logos/sk.svg";
import wmLogo from "../assets/products/logos/wm.svg";
import analistImage from "../assets/products/photos/analist.png";
import educationImage from "../assets/products/photos/education.png";
import liveImage from "../assets/products/photos/live.png";
import firstStageImage from "../assets/products/photos/first.png";
import skImage from "../assets/products/photos/sk.png";
import wmImage from "../assets/products/photos/wm.png";
import ProductCard from "./components/ProductCard";
const ProductLanding = () => {
  const products = [
    {
      label: `"School"  منصة `,
      id: "education",
      productLogo: educationLogo,
      productImage: educationImage,
      desc: "هي المكان الذي تجد فيه جميع الدروس التعليمية المسجلة التي تحتاج إليها، بدءًا من الأساسيات وصولًا إلى المستوى المتقدم والاحترافي. نحن نوفر لك واحدة من أكبر مكتبات التدوال التعليمية عبر الإنترنت، حيث يمكنك الوصول إلى مجموعة شاملة من المواد التعليمية بسهولة ومرونة. ستجد فيها مقاطع فيديو مسجلة ودروسًا تعليمية تغطي مختلف التحاليل و الانظمة كما أن المحتوى المسجل يتيح لك الاستفادة منه بالتكرار وفقًا لوتيرتك الخاصة.",
    },
    {
      label: "نظام SK",
      id: "sksystem",
      productLogo: skLogo,
      productImage: skImage,
      desc: "هو نظام واستراتيجية متكاملة يعتمد على فهم المناطق الذهبية وتوقع تحركات السوق المستقبلية. تعتبر من أقوى الاستراتيجيات نظرا لدقتها في تحديد الأهداف",
    },
    {
      label: "منصة %1",
      id: "stage",
      productLogo: firstStageLogo,
      productImage: firstStageImage,
      desc: "هو المكان المثالي لرواد الأعمال الطموحين الذين يسعون لتعزيز معرفتهم وتوسيع شبكاتهم الريادية في مجال التدوال و الاستثمار.  نقدم  من خلال هذه المنصة بيئة تعليمية وموارد متخصصة تساعد رواد الأعمال على النمو والتطور في رحلتهم.  بدءًا من تطوير الأفكار وإنشاء المحتوى وصولاً إلى استراتيجيات النمو والتسويق. و ستتاح لك الفرصة للتواصل والتعاون مع أشخاص مماثلين لديهم نفس الطموح والتفكير الريادي.",
    },
    {
      label: "W.M BOT",
      id: "wm",
      productLogo: wmLogo,
      productImage: wmImage,
      desc: "هو  بوت تليجرام يوفر وصولًا إلى جميع قنوات التوصيات الرائدة التي تقدمها مؤسستنا الرائعة. تتميز هذه القنوات بدقة أهدافها ونتائجها المثيرة. فسواء كنت مبتدئًا أو متداولا ذو خبرة، ستوفر قنوات التوصيات هذه والتي تشتهر بدقتها وسجلها المثبت، رؤى قيمة وتوصيات لمساعدتك في تداولات مستنيرة. ستتلقى منها إشعارات في الوقت المناسب عن اتجاهات السوق والفرص التداولية المحتملة والتحليلات الخبيرة.  و لاننا ندرك أهمية الدقة عند التداول صُممت هذه الميزة خصيصاً لتوفير الراحة والكفاءة في تجربتك معنا.",
    },
    {
      label: "Study Live منصة",
      id: "live",
      productLogo: liveLogo,
      productImage: liveImage,
      desc: "مع هذه المنصة ستكون على اتصال مباشر مع نخبة من خبراء السوق المالي وتتلقى توجيهات حية تساعدك على اتخاذ قرارات استثمارية مدروسة وذكية . ستتمكن من الاستفادة من تحليلاتهم العميقة ونصائحهم القيمة بشكل مباشر.",
    },
    {
      label: "Analysis Page",
      id: "analist",
      productLogo: analistLogo,
      productImage: analistImage,
      desc: " هي منصة مبتكرة يقوم الخبراء من خلالها بمشاركة صور تحليلية توضح توقعاتهم ورؤاهم حول حركة السوق. يمكن للمتدربين تصفح هذه الصور وقراءة التحليلات المرافقة، والاستفادة من الخبرة والتفكير الاحترافي للخبراء كما تتيح للمتدربين التفاعل المباشر والتعليق على الصور بطرق مختلفة.  بالإضافة إلى ذلك، يمكن للمتدربين أيضًا مشاركة تحليلاتهم الشخصية عبر الصور، مما يسمح لهم بالتعبير عن آرائهم ورؤاهم الخاصة ايظاً بذلك تعد هذه المنصة مكانًا فريدًا لتبادل المعرفة والخبرات في مجال التداول. ومن خلال هذه البيئة التفاعلية والتعليمية، فتتيح للمتدربين اكتساب المعرفة والخبرات القيمة من الخبراء والأفراد ذوي الاهتمام المشترك.",
    },
  ];
  return (
    <div>
      <div className="bannerBg py-8">
        <div className="container mx-auto ">
          <img src={banner} alt="banner" className="rounded-2xl my-4 w-full" />
        </div>
      </div>
      <div className="flex container mx-auto gap-12 flex-wrap justify-center items-center my-12">
        {products?.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer bg-blackGold w-[220px] h-[220px] flex flex-col justify-center items-center gap-2 rounded-full"
            onClick={() => {
              document
                .querySelector(`#${product.id}`)
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            <img src={product.productLogo} alt={product.label} />
            <h3 className="text-xl my-2 text-center">{product.label}</h3>
          </div>
        ))}
      </div>
      <div>
        {products?.map((product, index) => (
          <ProductCard isOdd={index % 2} key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductLanding;
