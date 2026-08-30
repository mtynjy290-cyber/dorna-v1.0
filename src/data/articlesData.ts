import { Article } from '../types';

/**
 * Technical Articles & Engineering Guides Dataset for Dorna Door
 * 
 * Contains 5 specialized, high-authority engineering articles covering:
 * 1. Specialized Glass (Tempered, Laminated, Super-clear)
 * 2. Technology & Operators (Dunkermotoren Brushless Systems)
 * 3. Partitions & Architecture (Acoustic Frameless Partitions)
 * 4. Energy Optimization (Thermal Break & Smart Sensors)
 * 5. Materials & Profiles (Anodized & Electrostatic Powder Coatings)
 */
export const ARTICLES_DATA: Article[] = [
  {
    id: '1001',
    slug: 'guide-to-tempered-and-laminated-glass',
    title: 'راهنمای جامع انتخاب شیشه سکوریت و لمینت در پروژه‌های لوکس',
    category: 'شیشه‌های تخصصی',
    readTime: '۶ دقیقه مطالعه',
    date: '۱۴۰۴/۰۵/۲۰',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    summary: 'بررسی تفاوت‌های ساختاری، ایمنی و زیبایی‌شناسی شیشه‌های سوپرکلیر، لمینت چندلایه و سکوریت ۱۰ میل برای ورودی‌های مدرن.',
    tags: ['شیشه سکوریت', 'شیشه لمینت', 'سوپرکلیر', 'ایمنی ساختمان', 'عایق صوتی'],
    featured: true,
    published: true,
    viewsCount: 1420,
    author: {
      name: 'مهندس محمدرضا شایگان',
      role: 'کارشناس ارشد متالورژی شیشه و سازه‌های آلومینیومی درنا درب',
    },
    keyTakeaways: [
      'شیشه سکوریت ۱۰ میل سوپرکلیر وین‌لایت مقاومت ضربه‌ای تا ۵ برابر فلوت معمولی و مقاومت شوک حرارتی تا ۲۰۰ درجه سانتی‌گراد ایجاد می‌کند.',
      'آزمون غوطه‌وری حرارتی Heat Soak Test (HST) طبق استاندارد EN 14179 خطر شکست خودبه‌خودی ناشی از ناخالصی‌های نیکل سولفید (NiS) را به کمتر از یک در صدهزار می‌رساند.',
      'لایه‌های میانی PVB آکوستیک با ضخامت ۱.۵۲ میل ضریب عایق صوتی (Rw) را تا ۴۲ دسی‌بل ارتقا داده و از سقوط قطعات شکسته کاملاً جلوگیری می‌نمایند.',
      'استفاده از شیشه کم‌آهن (Low-Iron / Super-Clear) با اکسید آهن کمتر از ۰.۰۱٪ شفافیت کریستالی ۹۱.۵٪ بدون هرگونه ته‌رنگ سبز لبه‌ها پدید می‌آورد.',
      'محاسبه دقیق بار باد و ممان اینرسی برای دهانه‌های مرتفع بالای ۳ متر، انتخاب ضخامت ۱۰ یا ۱۲ میلی‌متر را مشخص می‌سازد.'
    ],
    relatedSlugs: ['dunkermotoren-technology-in-automatic-doors', 'acoustic-frameless-glass-partitions-design'],
    content: `
      <div class="space-y-8 text-slate-800 leading-relaxed font-normal">
        <p class="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed border-r-4 border-[#06080F] pr-4 bg-[#CBD8E2]/40 py-2 rounded-l-xl">
          مقاومت مکانیکی، ضریب عبور نور، ایمنی جانی و پایداری سازه‌ای در برابر بارهای جانبی و نوسانات جوی، چهار رکن بنیادین در مهندسی شیشه‌های معماری برای ورودی‌های مدرن، لابی برج‌های تجاری-مسکونی و سازه‌های تمام‌شیشه‌ای بدون فریم به شمار می‌روند. در این راهنمای جامع، متالورژی شیشه، استانداردهای بین‌المللی آزمون، مقایسه فوتومتریک و الزامات اجرایی مورد تحلیل مهندسی قرار گرفته است.
        </p>

        <!-- Key Engineering Alert -->
        <div class="p-5 rounded-2xl bg-white/80 border border-slate-300 text-xs sm:text-sm text-slate-900 space-y-2.5 shadow-xs">
          <div class="font-black flex items-center gap-2 text-slate-950 text-sm sm:text-base">
            <svg class="w-5 h-5 text-[#06080F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>الزام مهندسی و مدیریت وزن در لنگه‌های متحرک:</span>
          </div>
          <p class="leading-relaxed">
            وزن مخصوص شیشه ساختمانی برابر ۲.۵ کیلوگرم بر متر مربع به ازای هر ۱ میلی‌متر ضخامت است. بنابراین یک لنگه شیشه سکوریت ۱۰ میلی‌متری با ابعاد ۱.۵ × ۳ متر، وزنی معادل ۱۱۲.۵ کیلوگرم دارد. عدم تطابق دقیق میان جرم لنگه، ضخامت شیشه، توان گشتاور موتور و ممان اینرسی پروفیل‌های نگهدارنده می‌تواند منجر به سایش سریع تسمه، داغ شدن کنترلر و اعوجاج در حین باز و بست شود.
          </p>
        </div>

        <!-- Section 1 -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-[#00F090] text-xs font-black flex items-center justify-center">۱</span>
            فرآیند سکوریتینگ حرارتی (Thermal Tempering) و استاندارد EN 12150
          </h2>
          <p>
            شیشه‌های سکوریت که تحت عنوان شیشه حرارت‌دیده ایمن (Toughened Safety Glass) نیز شناخته می‌شوند، فرآیندی مهندسی‌شده را طی می‌کنند که در آن شیشه خام تا دمای بحرانی حدود ۶۵۰ تا ۷۰۰ درجه سانتی‌گراد (بالاتر از نقطه نرم‌شوندگی شیشه) گرم شده و سپس به وسیله جت‌های هوای فشرده به صورت آنی و یکنواخت در ایستگاه کوئینگ (Quenching) خنک می‌گردد.
          </p>
          <p>
            این خنک‌سازی ناگهانی سبب می‌شود سطوح بیرونی شیشه منقبض و سخت شوند، در حالی که لایه‌های مرکزی هنوز گرم و روان هستند. با سرد شدن نهایی مغز شیشه، تنش فشاری شدیدی (بیش از ۹۰ تا ۱۲۰ مگاپاسکال) روی سطح خارجی و تنش کششی متناظر در هسته شیشه پدید می‌آید. این تعادل تنشی ویژگی‌های فوق‌العاده زیر را حاصل می‌کند:
          </p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm pt-1">
            <li class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 block font-bold mb-1">• مقاومت خمشی و ضربه‌ای:</strong>
              افزایش تا ۴ الی ۵ برابر نسبت به شیشه فلوت معمولی با مقاومت در برابر ضربه توپ‌های فولادی سنگین.
            </li>
            <li class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 block font-bold mb-1">• مقاومت در برابر شوک حرارتی:</strong>
              تحمل اختلاف دمای ناگهانی تا ۲۰۰ درجه سانتی‌گراد بدون ترک‌خوردگی (در مقایسه با ۴۰ درجه در شیشه فلوت خام).
            </li>
            <li class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 block font-bold mb-1">• الگوی شکست ایمن (Safe Breakage Pattern):</strong>
              در صورت شکست، شیشه به هزاران قطعه ریز مکعبی و غیربرنده تبدیل می‌شود که ریسک جراحت را به صفر نزدیک می‌کند.
            </li>
            <li class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <strong class="text-slate-900 block font-bold mb-1">• انطباق با استانداردها:</strong>
              پاسخگویی کامل به الزامات ایمنی استاندارد ملی ایران و استانداردهای اروپایی EN 12150-1 و ASTM C1048.
            </li>
          </ul>
        </div>

        <!-- Section 2: HST Test Deep Dive -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۲</span>
            آزمون غوطه‌وری حرارتی (Heat Soak Test - HST) بر اساس EN 14179
          </h2>
          <p>
            یکی از ناشناخته‌ترین خطرات در پروژه‌های لوکس با مساحت شیشه بالا، پدیده <em>شکست خودبه‌خودی (Spontaneous Breakage)</em> بدون وارد آمدن هیچ‌گونه ضربه فیزیکی است. منشأ اصلی این پدیده، وجود ناخالصی‌های میکروسکوپی <strong>سولفید نیکل (Nickel Sulfide - NiS)</strong> در فرآیند تولید شیشه خام است.
          </p>
          <div class="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
            <p><strong>مکانیزم شیمیایی-فیزیکی:</strong> اینکلوژن‌های سولفید نیکل در دمای بالای کوره دارای فاز آلفا (حجم کمتر) هستند. با کوئنچ سریع، در این فاز قفل می‌شوند. اما با گذشت ماه‌ها و سال‌ها در معرض تابش خورشید، به فاز بتا با افزایش حجم ۲ تا ۴ درصدی تبدیل می‌شوند. این افزایش حجم، تنش‌های موضعی فراتر از مقاومت کششی هسته ایجاد کرده و به انفجار ناگهانی شیشه می‌انجامد.</p>
            <p><strong>راهکار درنا درب:</strong> انجام تست HST در کوره‌های مخصوص با نگه‌داشت شیشه به مدت حداقل ۲ ساعت در دمای ۲۹۰ درجه سانتی‌گراد. تمام شیشه‌های دارای ریسک NiS در داخل کوره شکسته و حذف می‌شوند و ضریب اطمینان شیشه‌های خروجی به ۹۹.۹۹۹٪ می‌رسد.</p>
          </div>
        </div>

        <!-- Section 3: Laminated Glass & PVB / SentryGlas -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۳</span>
            شیشه‌های چندلایه لمینت (Laminated Safety Glass) و ساختار لایه‌های میانی
          </h2>
          <p>
            در پروژه‌های نیازمند مقاومت سازه‌ای پس از شکست (Post-Breakage Structural Integrity)، جان‌پناه‌های شیشه‌ای، سقف‌ها و ورودی‌های با امنیت بالا، استفاده از شیشه‌های لمینت مطابق با استاندارد EN ISO 12543 الزامی است. شیشه لمینت از چسباندن دائمی دو یا چند لایه شیشه سکوریت توسط لایه‌های میانی پلیمری تحت فشار و حرارت اتوکلاو (Autoclave) در دمای ۱۴۰ درجه و فشار ۱۲ بار تولید می‌شود.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span class="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold text-xs">پلی‌وینیل بوتیرال (Acoustic PVB)</span>
              <p class="text-xs text-slate-700 leading-relaxed">
                انعطاف‌پذیری فوق‌العاده، مهار کامل خرده‌شیشه‌ها هنگام ضربه شدید، ضریب عبور UV زیر ۱٪ (محافظت از مبلمان داخلی) و عملکرد بی‌نظیر به عنوان میراکننده صوت (Damping Layer) با کاهش صوت تا ۴۲ دسی‌بل.
              </p>
            </div>
            <div class="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
              <span class="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-xs">سنتری‌گلاس یونومری (SentryGlas - SGP)</span>
              <p class="text-xs text-slate-700 leading-relaxed">
                سختی برشی تا ۱۰۰ برابر و مقاومت مکانیکی تا ۵ برابر بیشتر از PVB سنتی. در صورت شکست هر دو لایه شیشه، پانل سازه‌ای فرونمی‌ریزد و بار وزن خود و عابرین را تا زمان تعویض تحمل می‌کند (ایده‌آل برای کف شیشه‌ای و کنسول‌ها).
              </p>
            </div>
          </div>
        </div>

        <!-- Visual Side-by-Side Comparison Box with VS Badge -->
        <div class="my-6 p-4 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-xl">
          <div class="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <span class="text-xs font-extrabold text-[#00F090]">آنالیز فوتومتریک و شفافیت شیشه سوپرکلیر در برابر فلوت</span>
            <span class="text-[11px] text-slate-400 font-mono">Spectrophotometric Analysis</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative items-center">
            {/* Left Glass: Standard Float */}
            <div class="space-y-2 rounded-xl overflow-hidden bg-slate-950/80 p-3 border border-slate-800">
              <div class="h-44 sm:h-52 rounded-lg overflow-hidden relative">
                <img src="/images/float-glass.jpg" alt="شیشه فلوت معمولی با ته رنگ سبز" class="w-full h-full object-cover" />
                <span class="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-bold text-slate-300 border border-slate-700">فلوت خام استاندارد (Standard Clear)</span>
              </div>
              <div class="text-[11px] text-slate-400 space-y-1 pt-1">
                <p>• ضریب عبور نور مرئی (VLT): حدود ۸۳٪ تا ۸۵٪</p>
                <p>• میزان ناخالصی اکسید آهن (Fe2O3): حدود ۰.۱٪ (غلظت بالا)</p>
                <p>• ظاهر بصری: ته‌رنگ سبز تیره محسوس به ویژه در لبه‌های شیشه و ضخامت‌های بالای ۸ میلی‌متر</p>
              </div>
            </div>

            {/* Central VS Badge for Desktop */}
            <div class="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#06080F] border-2 border-white text-white font-black text-xs items-center justify-center shadow-2xl">
              VS
            </div>

            {/* Right Glass: Super Clear Low-Iron */}
            <div class="space-y-2 rounded-xl overflow-hidden bg-slate-900 p-3 border border-white/20">
              <div class="h-44 sm:h-52 rounded-lg overflow-hidden relative">
                <img src="/images/super-clear-glass.jpg" alt="شیشه سوپرکلیر کم آهن کریستال" class="w-full h-full object-cover" />
                <span class="absolute top-2 right-2 px-2.5 py-1 rounded-md bg-[#06080F]/90 backdrop-blur-md text-[11px] font-bold text-[#00F090] border border-[#00F090]/40">سوپرکلیر وین‌لایت (Ultra-Clear Low-Iron)</span>
              </div>
              <div class="text-[11px] text-slate-300 space-y-1 pt-1">
                <p>• ضریب عبور نور مرئی (VLT): بالای ۹۱.۵٪ (شفافیت حداکثری کریستال)</p>
                <p>• میزان ناخالصی اکسید آهن: کمتر از ۰.۰۱٪ (خلوص فوق‌العاده)</p>
                <p>• ظاهر بصری: لبه‌های شفاف بلورین، نمایش واقعی و بدون اعوجاج رنگ‌های دکوراسیون داخلی</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Engineering Selection Matrix Table -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۴</span>
            ماتریس مهندسی انتخاب نوع و ضخامت شیشه در پروژه‌ها
          </h2>
          <div class="overflow-x-auto my-4 rounded-xl border border-slate-200 shadow-2xs">
            <table class="w-full text-xs text-right border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                  <th class="p-3">نوع کاربری سازه</th>
                  <th class="p-3">ترکیب پیشنهادی شیشه</th>
                  <th class="p-3">ضخامت اسمی</th>
                  <th class="p-3">شاخص صوت (Rw)</th>
                  <th class="p-3">سطح مقاومت ایمنی</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700">
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">لنگه‌های متحرک درب اتوماتیک اسلایدینگ</td>
                  <td class="p-3">سکوریت سوپرکلیر تک‌جداره دیاموند براق</td>
                  <td class="p-3 font-mono">10 mm</td>
                  <td class="p-3">32 dB</td>
                  <td class="p-3 text-emerald-700 font-bold">استاندارد ایمنی کلاس ۱</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">پارتیشن‌های فریم‌لس آکوستیک اتاق جلسات</td>
                  <td class="p-3">دوجداره سکوریت + لایه میانی Acoustic PVB</td>
                  <td class="p-3 font-mono">6+6+1.52 PVB</td>
                  <td class="p-3">42 dB</td>
                  <td class="p-3 text-emerald-700 font-bold">ایمنی بالا + ایزوله صوت کامل</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">دهانه‌های ثابت لابی برج‌ها (ارتفاع > ۳.۵ متر)</td>
                  <td class="p-3">لمینت سکوریت دوجداره با SentryGlas</td>
                  <td class="p-3 font-mono">10+10+1.52 SGP</td>
                  <td class="p-3">44 dB</td>
                  <td class="p-3 text-emerald-700 font-bold">فوق‌العاده مقاوم در برابر باد و ضربه</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">جان‌پناه شیشه‌ای بالکن و وید مجتمع تجاری</td>
                  <td class="p-3">لمینت سکوریت با پایه‌های اسپیگات یا دفنی</td>
                  <td class="p-3 font-mono">8+8+1.52 PVB</td>
                  <td class="p-3">38 dB</td>
                  <td class="p-3 text-emerald-700 font-bold">ضد سقوط مطابق مبحث ۴ مقررات ملی</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Checklist for quality control -->
        <div class="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
          <h3 class="text-sm sm:text-base font-black text-[#00F090] flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            چک‌لیست کنترل کیفیت و تحویل‌گیری کارگاهی شیشه درنا درب:
          </h3>
          <ul class="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li class="flex items-start gap-2">
              <span class="text-[#00F090] font-bold">✓</span>
              <span><strong>ابزار لبه (Edge Working):</strong> لبه‌های شیشه باید توسط دستگاه‌های CNC و راسته دیاموند به صورت تخت براق (Flat Polished with Arris) ابزار خورده باشند تا تمرکز تنش در لبه‌ها خنثی شود.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#00F090] font-bold">✓</span>
              <span><strong>سوراخ‌کاری و جاسازی:</strong> فاصله لبه سوراخ تا لبه شیشه نباید کمتر از ۲ برابر ضخامت شیشه باشد و تمامی سوراخ‌ها باید دارای لچکی و فرز کونیک باشند.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-[#00F090] font-bold">✓</span>
              <span><strong>کنترل موج غلطک (Roller Wave):</strong> حداکثر اعوجاج ناشی از حرکت روی غلطک‌های کوره سکوریت باید کمتر از ۰.۱۵ میلی‌متر در طول ۳۰۰ میلی‌متر باشد تا بازتاب بصری آینه‌ای نما کاملاً یکدست بماند.</span>
            </li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: '1002',
    slug: 'dunkermotoren-technology-in-automatic-doors',
    title: 'بررسی اپراتورهای آلمانی و سوئیسی: تکنولوژی موتورهای Dunker در درب‌های اتوماتیک',
    category: 'تکنولوژی و اپراتور',
    readTime: '۸ دقیقه مطالعه',
    date: '۱۴۰۴/۰۵/۱۵',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    summary: 'چرا موتورهای DC بدون جاروبک (Brushless) دانکر آلمان، بنچمارک اصلی دوام و سکوت در سیستم‌های ورودی هوشمند هستند؟',
    tags: ['موتور دانکر', 'اپراتور آلمانی', 'موتور براشلس', 'درب اسلایدینگ', 'گیربکس خورشیدی', 'استاندارد EN 16005'],
    featured: true,
    published: true,
    viewsCount: 1890,
    author: {
      name: 'مهندس بردیا کریمیان',
      role: 'سرپرست مهندسی الکترومکانیک و مکاترونیک درنا درب',
    },
    keyTakeaways: [
      'موتورهای براش‌لس Dunkermotoren سری BG 75 و BG 65 با حذف جاروبک زغالی و اصطکاک مکانیکی، راندمان مصرف انرژی را به بالای ۹۲٪ می‌رسانند.',
      'گیربکس خورشیدی سیاره‌ای تمام‌فولادی سری PLG 60 توانایی انتقال گشتاور پیوسته بدون لقی معکوس (Zero Backlash) را برای لنگه‌های تا ۳۰۰ کیلوگرم فراهم می‌کند.',
      'انکودرهای نوری مغناطیسی ۴۰۹۶ پالس کنترل دقیق موقعیت، ترمز نرم S-Curve و پیشگیری از کوبش لنگه‌ها را تضمین می‌نمایند.',
      'تست دوام بر اساس استاندارد اروپایی EN 16005 و DIN 18650 کارکرد پایدار بیش از ۲,۰۰۰,۰۰۰ سیکل بدون افت راندمان را به اثبات رسانده است.',
      'هماهنگی الکترونیکی کامل با سیستم‌های اعلام حریق (Fire Alarm Interface) و بازشوی اضطراری Fail-Safe.'
    ],
    relatedSlugs: ['guide-to-tempered-and-laminated-glass', 'thermal-break-and-energy-efficiency-in-automatic-doors'],
    content: `
      <div class="space-y-8 text-slate-800 leading-relaxed font-normal">
        <p class="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed border-r-4 border-amber-500 pr-4 bg-amber-50/50 py-2 rounded-l-xl">
          قلب تپنده هر سیستم درب اتوماتیک اسلایدینگ، تلسکوپی یا بیمارستانی مدرن، مکانیزم الکترومکانیکی مدار محرکه آن است. در پروژه‌های لوکس و پرتردد شهری، تفاوت میان یک درب با عملکرد روان و بی‌صدا و سیستمی با خرابی مداوم و سر و صدای آزاردهنده، در انتخاب تکنولوژی موتور و گیربکس نهفته است. در این تحلیل فنی، مهندسی محرکه‌های دانکر آلمان (Dunkermotoren) کالبدشکافی می‌شود.
        </p>

        <!-- Competency Alert -->
        <div class="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/80 text-xs sm:text-sm text-amber-950 space-y-2.5 shadow-xs">
          <div class="font-black flex items-center gap-2 text-amber-900 text-sm sm:text-base">
            <svg class="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>بنچمارک مهندسی محرکه‌های دانکر آلمان در جهان:</span>
          </div>
          <p class="leading-relaxed">
            کمپانی دانکرموتورن (Dunkermotoren GmbH واقع در بوندورف آلمان) با بیش از ۷۰ سال سابقه در تولید محرکه‌های فوق‌دقیق، به عنوان استاندارد پیش‌فرض در برندهای تراز اول اروپایی نظیر Record سوئیس، Gilgen، Geze و Dormakaba شناخته می‌شود. مزیت اصلی این سیستم‌ها، کارکرد بدون افت راندمان در ترافیک تردد شبانه‌روزی و نویز صوتی کمتر از ۳۸ دسی‌بل است.
          </p>
        </div>

        <!-- Section 1: Brushless Motor Tech -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center">۱</span>
            تحلیل متالورژی و الکترومغناطیسی موتورهای براش‌لس (Brushless DC - BLDC)
          </h2>
          <p>
            در موتورهای سنتی DC براش‌دار (Brushed DC نظیر سری‌های قدیمی GR 63)، انتقال جریان الکتریکی به روتور متحرک توسط جاروبک‌های زغالی (Carbon Brushes) انجام می‌پذیرد. این تماس مکانیکی به مرور زمان موجب سایش زغال، تولید براده‌های کربنی هادی درون محفظه موتور، جرقه‌زنی الکتریکی و تولید گرمای شدید در تردد نامحدود می‌گردد.
          </p>
          <p>
            در مقابل، موتورهای براش‌لس مدرن نظیر سری‌های <strong>BG 75 (dCore / dMove)</strong> و <strong>BG 65</strong> با معماری معکوس عمل می‌کنند:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-xs font-bold text-slate-900 block">روتور با مغناطیس دائم:</strong>
              <p class="text-xs text-slate-600">بهره‌گیری از آهنرباهای نئودیمیوم-آهن-بور (NdFeB) با چگالی شار مغناطیسی فوق‌العاده بالا بدون نیاز به سیم‌پیچی متحرک.</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-xs font-bold text-slate-900 block">استاتور ۳ فاز کنترل‌شده:</strong>
              <p class="text-xs text-slate-600">کموتاسیون کاملاً الکترونیکی به وسیله ماسفت‌های توان مدار کنترلر به روش کنترل جهت‌دار میدان (FOC).</p>
            </div>
            <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-xs font-bold text-slate-900 block">راندمان بالای ۹۲٪:</strong>
              <p class="text-xs text-slate-600">کاهش چشمگیر اتلاف حرارتی (I²R Loss) و کارکرد خنک حتی در تردد متوالی ۱۲۰ سیکل در ساعت.</p>
            </div>
          </div>
        </div>

        <!-- Section 2: Planetary Gearbox Analysis -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center">۲</span>
            گیربکس‌های سیاره‌ای خورشیدی (Planetary Gearbox) در برابر گیربکس‌های حلزونی
          </h2>
          <p>
            بخش اعظم اپراتورهای ارزان‌قیمت موجود در بازار از گیربکس‌های حلزونی (Worm Gear) با چرخ‌دنده‌های برنجی یا پلاستیکی استفاده می‌کنند که راندمان مکانیکی پایینی (حدود ۶۰ تا ۷۰ درصد) داشته و بر اثر وزن شیشه در طولانی‌مدت دچار لقی دنده (Backlash) و لرزش در ابتدای حرکت می‌شوند.
          </p>
          <p>
            در مقابل، در سیستم‌های دانکر از <strong>گیربکس‌های سیاره‌ای سری PLG (Planetary)</strong> استفاده می‌شود:
          </p>
          <ul class="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pr-5">
            <li><strong>تقسیم بار چندنقطه‌ای:</strong> گشتاور ورودی بین ۳ تا ۴ چرخ‌دنده سیاره‌ای تمام‌فولادی سخت‌کاری شده توزیع می‌شود؛ در نتیجه تنش وارد بر هر دندانه به یک‌سوم کاهش می‌یابد.</li>
            <li><strong>راندمان انتقال قدرت ۹۷٪:</strong> اتلاف اصطکاکی بسیار کم و انتقال مستقیم بیشترین گشتاور به تسمه تایمینگ.</li>
            <li><strong>تحمل گشتاورهای لحظه‌ای بالا:</strong> شتاب‌گیری و ترمزگیری‌های ناگهانی بدون آسیب به دندانه‌ها در برابر بارهای سنگین لنگه‌های ۳۰۰ کیلوگرمی.</li>
          </ul>
        </div>

        <!-- Section 3: Technical Comparison Table -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center">۳</span>
            جدول مقایسه فنی: موتور براش‌لس دانکر آلمان در برابر موتورهای براش‌دار متفرقه
          </h2>
          <div class="overflow-x-auto my-4 rounded-xl border border-slate-200 shadow-2xs">
            <table class="w-full text-xs text-right border-collapse">
              <thead>
                <tr class="bg-slate-100 text-slate-900 font-bold border-b border-slate-300">
                  <th class="p-3">پارامتر مهندسی</th>
                  <th class="p-3">موتور Dunkermotoren BG 75 (براش‌لس)</th>
                  <th class="p-3">موتورهای براش‌دار زغالی سنتی</th>
                  <th class="p-3">تاثیر عملی در پروژه</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200 text-slate-700">
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">طول عمر اسمی (Cycles)</td>
                  <td class="p-3 font-mono text-emerald-700 font-bold">> ۲,۵۰۰,۰۰۰ سیکل</td>
                  <td class="p-3 font-mono text-rose-700">۳۰۰,۰۰۰ الی ۵۰۰,۰۰۰ سیکل</td>
                  <td class="p-3">کاهش ۸۰ درصدی هزینه‌های سرویس و تعویض قطعه</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">میزان نویز صوتی (dB)</td>
                  <td class="p-3 font-mono text-emerald-700 font-bold">< ۳۸ دسی‌بل (کاملاً بی‌صدا)</td>
                  <td class="p-3 font-mono text-rose-700">۵۵ الی ۶۵ دسی‌بل</td>
                  <td class="p-3">آرامش مطلق در لابی هتل‌ها و بیمارستان‌ها</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">نوع گیربکس</td>
                  <td class="p-3 font-bold text-emerald-700">سیاره‌ای تمام‌فولادی PLG 60</td>
                  <td class="p-3">حلزونی با دنده تفلونی/برنجی</td>
                  <td class="p-3">عدم ایجاد لقی و حرکت نرم و بدون تکان لنگه</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">نوع انکودر و فیدبک</td>
                  <td class="p-3">اپتیکال رزولوشن بالا (4096 ppr)</td>
                  <td class="p-3">سنسور اثر هال ساده یا بدون انکودر</td>
                  <td class="p-3">دقت میلی‌متری در توقف و ایمنی ضدبرخورد</td>
                </tr>
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="p-3 font-bold text-slate-900">استاندارد ایمنی معتبر</td>
                  <td class="p-3 font-mono text-emerald-700 font-bold">DIN 18650, EN 16005, CE, UL</td>
                  <td class="p-3 font-mono">فاقد گواهی تست دوام</td>
                  <td class="p-3">استاندارد خروج اضطراری و ایمنی عابرین پیاده</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Section 4: Microprocessor Control & S-Curve -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white text-xs font-black flex items-center justify-center">۴</span>
            کنترل هوشمند منحنی شتاب‌گیری و ترمز نرم (S-Curve & Auto-Tuning)
          </h2>
          <p>
            مدارهای الکترونیکی میکروپروسسوری ۳۲ بیتی اپراتورهای مجهز به موتور دانکر، دارای الگوریتم یادگیری خودکار وزن و اصطکاک (Auto-Learning / Auto-Calibration) در اولین استارت هستند. این الگوریتم با رسم منحنی شتاب S-Curve، نیرو را به شکل تصاعدی اعمال کرده و در انتهای کورس حرکتی، با معکوس کردن گشتاور میدان (Regenerative Braking)، سرعت لنگه را بدون کوبش به صفر می‌رساند.
          </p>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
            <strong class="text-slate-900 block font-bold">حفاظت ضدبرخورد تطبیقی (Dynamic Obstacle Detection):</strong>
            <p>در صورتی که عابری در مسیر بسته شدن لنگه قرار گیرد، موتور با سنجش افزایش میلی‌آمپری جریان سیم‌پیچ در کمتر از ۵۰ میلی‌ثانیه مانع را تشخیص داده و بلافاصله لنگه‌ها را معکوس (Reverse) می‌کند و از هرگونه فشار به بدن فرد جلوگیری می‌نماید.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: '1003',
    slug: 'acoustic-frameless-glass-partitions-design',
    title: 'طراحی پارتیشن‌های شیشه‌ای آکوستیک: تلفیق حریم خصوصی و معماری مدرن اداری',
    category: 'پارتیشن و معماری',
    readTime: '۷ دقیقه مطالعه',
    date: '۱۴۰۴/۰۵/۱۰',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    summary: 'چطور پارتیشن‌های شیشه‌ای دوجداره فریم‌لس، فضای اداری را بدون شلوغی بصری به منطقه‌ای آرام و ایزوله تبدیل می‌کنند؟',
    tags: ['پارتیشن شیشه‌ای', 'پارتیشن آکوستیک', 'معماری اداری', 'فریم‌لس', 'شیشه هوشمند PDLC', 'عایق صوتی دسی‌بل'],
    featured: false,
    published: true,
    viewsCount: 970,
    author: {
      name: 'مهندس سارا نیک‌بین',
      role: 'طراح ارشد معماری داخلی و سیستم‌های آکوستیک اداری درنا درب',
    },
    keyTakeaways: [
      'پارتیشن‌های دوجداره فریم‌لس با شیشه‌های نامتقارن (Asymmetrical Glass) ضریب عایق صوتی (STC/Rw) را تا ۴۸ دسی‌بل ارتقا می‌دهند.',
      'نوارهای درزبندی EPDM آکوستیک، پلی‌کربنات شفاف H-Profile و درزبند اتوماتیک پایین درب (Drop Seal) نشت صوتی را مسدود می‌نمایند.',
      'تکنولوژی شیشه هوشمند PDLC امکان مات‌شوندگی ماتریسی در کسری از ثانیه را برای حفظ محرمانگی جلسات اداری فراهم می‌سازد.',
      'پروفیل‌های آلومینیومی دفنی مینی‌مال در سقف و کف، جلوه‌ای یکپارچه از بلور و نور با پایداری کامل سازه‌ای پدید می‌آورند.'
    ],
    relatedSlugs: ['guide-to-tempered-and-laminated-glass', 'aluminum-frames-anodizing-and-electrostatic-anatomy'],
    content: `
      <div class="space-y-8 text-slate-800 leading-relaxed font-normal">
        <p class="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed border-r-4 border-[#06080F] pr-4 bg-[#CBD8E2]/40 py-2 rounded-l-xl">
          در طراحی محیط‌های کار معاصر و شرکت‌های پیشرو، دفاتر با پلان باز (Open-Plan) به دلیل تقویت تعامل تیمی محبوبیت فراوانی یافته‌اند؛ اما چالش اصلی این رویکرد، آلودگی صوتی، کاهش تمرکز پرسنل و عدم وجود حریم خصوصی برای جلسات محرمانه است. پارتیشن‌های شیشه‌ای آکوستیک دوجداره فریم‌لس، پاسخی مهندسی به این چالش هستند که شفافیت بصری و سکوت مطلق را در یک قاب پیاده‌سازی می‌کنند.
        </p>

        <!-- Acoustic Highlight Alert -->
        <div class="p-5 rounded-2xl bg-white/80 border border-slate-300 text-xs sm:text-sm text-slate-900 space-y-2.5 shadow-xs">
          <div class="font-black flex items-center gap-2 text-[#06080F] text-sm sm:text-base">
            <svg class="w-5 h-5 text-[#06080F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            <span>استاندارد آسایش صوتی دفاتر اداری (ISO 3382-3):</span>
          </div>
          <p class="leading-relaxed">
            مطالعات ارگونومی محیط کار نشان می‌دهد که کاهش نویز زمینه از ۶۵ دسی‌بل به زیر ۳۵ دسی‌بل در اتاق‌های جلسات و مدیریت، راندمان شناختی پرسنل را تا ۳۸٪ افزایش داده و سطح خستگی روزانه را به حداقل می‌رساند. پارتیشن‌های دوجداره مهندسی درنا درب کاهش صوت تا ۴۵ الی ۴۸ دسی‌بل را محقق می‌سازند.
          </p>
        </div>

        <!-- Section 1: Physics of Acoustic Glass -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۱</span>
            فیزیک صوت و پدیده افت فرکانسی (Coincidence Dip) در شیشه‌های اداری
          </h2>
          <p>
            صدا موجی مکانیکی است که در برخورد با سطوح سخت شیشه‌ای بازتاب شده یا با ارتعاش شیشه به طرف دیگر منتقل می‌گردد. در شیشه‌های معمولی با ضخامت‌های برابر (مثلاً دو لایه شیشه ۱۰ میل متقارن)، پدیده‌ای به نام <em>فرکانس بحرانی یا تشدید (Coincidence Frequency)</em> رخ می‌دهد که در آن در بازه فرکانسی خاصی (معمولاً مکالمات انسانی ۱۰۰۰ تا ۲۵۰۰ هرتز)، شیشه مقاومت آکوستیک خود را از دست می‌دهد.
          </p>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
            <strong class="text-slate-900 block font-bold">راهکار مهندسی درنا درب در ترکیب ضخامت‌های نامتقارن (Asymmetric Design):</strong>
            <p>با بهره‌گیری از یک لایه شیشه سکوریت ۱۰ میلی‌متری در یک سمت و یک لایه شیشه لمینت آکوستیک (۶+۶ با PVB Sound-Control) در سمت دیگر همراه با فاصله هوایی ۵۰ تا ۸۰ میلی‌متری، فرکانس‌های تشدید دو شیشه ناهمخوان شده و افت صوتی در فرکانس‌های مکالمه به طور کامل برطرف می‌گردد.</p>
          </div>
        </div>

        <!-- Section 2: Frameless Details & Profiles -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۲</span>
            آناتومی پروفیل‌های دفنی، نوارهای EPDM و اتصالات نامرئی
          </h2>
          <p>
            طراحی فریم‌لس بدین معنا نیست که هیچ پروفیلی وجود ندارد؛ بلکه بدین معناست که اتصالات نگهدارنده به صورتی هوشمندانه و نامرئی در کفسازی، سقف کاذب و دیوارهای جانبی مدفون (Concealed) شده‌اند:
          </p>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1">
            <li class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 font-bold block">• پروفیل‌های اسلیم دفنی:</strong>
              پروفیل‌های آلومینیومی با عمق تنها ۲۵ تا ۳۵ میلی‌متر با آنودایز مات مشکی، دودی یا سیلور که کاملاً هم‌باد با گچ‌برگ یا سنگ کف نصب می‌شوند.
            </li>
            <li class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 font-bold block">• درزگیرهای الاستومری EPDM:</strong>
              نوارهای لاستیکی مقاوم به اشعه UV و فرسودگی بدون کوچک‌ترین انقباض با جذب ۱۰۰ درصدی ارتعاشات سازه‌ای.
            </li>
            <li class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 font-bold block">• نوارهای شفاف پلی‌کربنات (H-Joint):</strong>
              اتصال لبه به لبه شیشه‌ها با چسب‌های شفاف با ضریب شکست نور یکسان با شیشه بدون ایجاد درز کدر.
            </li>
            <li class="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong class="text-slate-900 font-bold block">• درزبند اتوماتیک کف درب (Drop Seal):</strong>
              مکانیزم فنری که تنها در هنگام بسته شدن درب، نوار لاستیکی پایینی را به کف فشار می‌دهد و نشت صدا را مسدود می‌سازد.
            </li>
          </ul>
        </div>

        <!-- Section 3: PDLC Smart Switchable Glass -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۳</span>
            تکنولوژی شیشه هوشمند مات‌شونده (PDLC Smart Switchable Glass)
          </h2>
          <p>
            یکی از لوکس‌ترین و کارآمدترین آپشن‌ها در پارتیشن‌های اتاق مدیریت و اتاق‌های کنفرانس هیئت مدیره، استفاده از شیشه‌های هوشمند کریستال مایع (Polymer Dispersed Liquid Crystal - PDLC) است:
          </p>
          <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-[#06080F] text-white space-y-3 shadow-lg">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span class="text-xs font-bold text-[#00F090]">نحوه عملکرد فیلم‌های PDLC</span>
              <span class="text-[11px] text-slate-400 font-mono">Response Time < 20ms</span>
            </div>
            <p class="text-xs leading-relaxed text-slate-200">
              در وضعیت خاموش (Off)، مولکول‌های کریستال مایع به صورت تصادفی و نامنظم قرار دارند که باعث شکست و پخش نور شده و شیشه کاملاً مات شیری دیده می‌شود. با اعمال ولتاژ الکتریکی ملایم (۴۸ تا ۶۵ ولت متناوب)، مولکول‌ها در یک جهت هم‌راستا شده و نور مستقیماً عبور می‌کند؛ شیشه در کسری از ثانیه کاملاً شفاف کریستالی می‌گردد.
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-2">
              <div class="p-2 rounded-lg bg-white/10">
                <span class="block font-black text-[#00F090]">سرعت سوئیچ</span>
                <span class="text-[11px] text-slate-300">کمتر از ۲۰ میلی‌ثانیه</span>
              </div>
              <div class="p-2 rounded-lg bg-white/10">
                <span class="block font-black text-[#00F090]">مصرف انرژی</span>
                <span class="text-[11px] text-slate-300">کمتر از ۵ وات بر متر مربع</span>
              </div>
              <div class="p-2 rounded-lg bg-white/10">
                <span class="block font-black text-[#00F090]">طول عمر</span>
                <span class="text-[11px] text-slate-300">بیش از ۸۰,۰۰۰ ساعت سوئیچ</span>
              </div>
              <div class="p-2 rounded-lg bg-white/10">
                <span class="block font-black text-[#00F090]">کنترل هوشمند</span>
                <span class="text-[11px] text-slate-300">کلید، ریموت، BMS و موبایل</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Section 4: Hardware and Hinges -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-[#06080F] text-white text-xs font-black flex items-center justify-center">۴</span>
            یراق‌آلات هیدرولیک، لولاهای توکار کف و قفل‌های مگنتی بی‌صدا
          </h2>
          <p>
            درب‌های شیشه‌ای پارتیشن‌ها با لولاهای هیدرولیک توکار کفی (Floor Springs) منطبق با استاندارد EN 1154 تجهیز می‌شوند که قابلیت تنظیم مستقل دو سرعت بسته‌شدن و چفت‌شدن نهایی (Latching Speed) را دارا بوده و مجهز به استپ نگه‌دارنده ۹۰ و ۱۱۵ درجه هستند. دستگیره‌های آلومینیومی مگنتی با سیلندرهای فوق‌باریک و زبانه پلی‌آمید بی‌صدا، از ایجاد هرگونه صدای کلیک فلزی در هنگام ورود و خروج جلوگیری می‌نمایند.
          </p>
        </div>
      </div>
    `
  },
  {
    id: '1004',
    slug: 'thermal-break-and-energy-efficiency-in-automatic-doors',
    title: 'استانداردسازی شوک حرارتی و عایق‌بندی انرژی در سیستم‌های ورودی اتوماتیک',
    category: 'بهینه‌سازی انرژی',
    readTime: '۷ دقیقه مطالعه',
    date: '۱۴۰۴/۰۵/۰۲',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    summary: 'کاهش تا ۳۵ درصدی هدررفت انرژی در برج‌ها با استفاده از فریم‌های ترمال‌بریک و سنسورهای پرده‌ای هوشمند.',
    tags: ['ترمال‌بریک', 'بهینه‌سازی انرژی', 'سنسور BEA', 'درب اتوماتیک برج', 'عایق حرارتی', 'پدیده دودکشی'],
    featured: false,
    published: true,
    viewsCount: 830,
    author: {
      name: 'مهندس نوید اعتمادی',
      role: 'مشاور بهره‌وری انرژی و استانداردهای LEED ساختمانی درنا درب',
    },
    keyTakeaways: [
      'تیغه‌های پلی‌آمید تقویت‌شده با الیاف شیشه PA66 GF25 پل حرارتی آلومینیوم را قطع کرده و ضریب انتقال حرارت U-Value را به زیر ۲.۱ W/m²K می‌رسانند.',
      'سنسورهای راداری مایکروویو ترکیبی BEA IXIO-DT1 بلژیک با فناوری تفکیک جهت تردد از باز شدن‌های غیرضروری پیاده‌رو جلوگیری می‌نمایند.',
      'کنترل پدیده دودکشی (Stack Effect) و کوران هوای ورودی در برج‌های بلندمرتبه، هدررفت بار برودتی و حرارتی را تا ۳۵٪ کاهش می‌دهد.',
      'هوابندهای دوبل مویی مجهز به تیغه پلی‌اتیلنی مرکزی (Double Fin-Seal) تبادل باد و ریزگردها را متوقف می‌سازند.',
      'نرخ بازگشت کامل سرمایه‌گذاری (ROI) حاصل از صرفه‌جویی قبوض انرژی در کمتر از ۱۸ ماه محقق می‌گردد.'
    ],
    relatedSlugs: ['dunkermotoren-technology-in-automatic-doors', 'aluminum-frames-anodizing-and-electrostatic-anatomy'],
    content: `
      <div class="space-y-8 text-slate-800 leading-relaxed font-normal">
        <p class="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed border-r-4 border-emerald-600 pr-4 bg-emerald-50/50 py-2 rounded-l-xl">
          ورودی ساختمان‌های تجاری، برج‌های بلندمرتبه اداری و بیمارستان‌ها، بزرگ‌ترین گلوگاه تبادل حرارتی و هدررفت انرژی در معماری مدرن محسوب می‌شوند. در فصول سرد سال، خروج هوای گرم لابی و نفوذ هوای سرد بیرون و در فصول گرم، هدررفت بارهای سنگین چیلر، هزینه‌های سرسام‌آور بر قبوض انرژی ساختمان تحمیل می‌کند. استانداردسازی مهندسی ورودی‌ها با سیستم‌های ترمال‌بریک و رادارهای هوشمند بلژیکی، راهکار قطعی این چالش است.
        </p>

        <!-- ROI Alert Box -->
        <div class="p-5 rounded-2xl bg-emerald-50/90 border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 space-y-2.5 shadow-xs">
          <div class="font-black flex items-center gap-2 text-emerald-900 text-sm sm:text-base">
            <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>تحلیل بازگشت سرمایه‌گذاری (ROI Analysis) درنا درب:</span>
          </div>
          <p class="leading-relaxed">
            محاسبات دینامیک سیالات محاسباتی (CFD) برای یک برج ۲۰ طبقه در تهران نشان می‌دهد که جایگزینی درب‌های معمولی با سیستم ترمال‌بریک و سنسورهای BEA، سالانه از هدررفت بیش از ۴۲,۰۰۰ کیلووات-ساعت انرژی جلوگیری کرده و هزینه اولیه تجهیز ورودی را ظرف کمتر از ۱۸ ماه از محل صرفه‌جویی مستقیم مستهلک می‌سازد.
          </p>
        </div>

        <!-- Section 1: Thermal Break Mechanics -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">۱</span>
            مکانیسم ترمال‌بریک و تیغه‌های پلی‌آمید PA66 GF25
          </h2>
          <p>
            آلومینیوم فلزی با رسانایی حرارتی بسیار بالا (حدود ۲۰۰ وات بر متر-کلوین) است. در فریم‌های معمولی، دمای محیط بیرون مستقیماً از طریق پروفیل به داخل لابی منتقل شده و علاوه بر اتلاف حرارت، در زمستان منجر به پدیده <em>تعریق (Condensation)</em> و چکیدن آب روی شیشه‌ها و لک شدن کفسازی می‌شود.
          </p>
          <p>
            در سیستم‌های ترمال‌بریک (Thermal Break):
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong class="text-xs sm:text-sm font-bold text-slate-900 block">تیغه‌های پلی‌آمید تقویت‌شده:</strong>
              <p class="text-xs text-slate-600 leading-relaxed">
                پروفیل آلومینیومی به دو بخش داخلی و خارجی تقسیم شده و توسط تیغه‌های پلی‌آمید با ۲۵٪ الیاف شیشه (PA66 GF25) با ضریب انبساط حرارتی دقیقاً همسان با آلومینیوم به هم دوخته (Crimped) می‌شوند. این تیغه رسانایی حرارتی را بیش از ۵۰۰ برابر کاهش می‌دهد.
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <strong class="text-xs sm:text-sm font-bold text-slate-900 block">شیشه‌های دوجداره Low-E و گاز آرگون:</strong>
              <p class="text-xs text-slate-600 leading-relaxed">
                ترکیب شیشه ۶ میل سکوریت با اسپیسر حرارتی ۱۲ میل پرشده با گاز نجیب آرگون و لایه پوشش نقره‌ای Low-E، ضریب انتقال حرارت کل (U-Value) پنجره را از ۵.۸ به زیر ۱.۶ W/m²K تنزل می‌دهد.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 2: Stack Effect & High Rises -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">۲</span>
            مهار پدیده دودکشی (Stack Effect) در برج‌های بلندمرتبه
          </h2>
          <p>
            پدیده اثر دودکشی ناشی از اختلاف چگالی هوای گرم داخل ساختمان با هوای سرد بیرون است که نیروی مکش شدیدی در طبقات پایینی برج ایجاد کرده و هوا را از ورودی‌ها با سرعت بالا به داخل هدایت می‌کند. این پدیده باعث سختی در باز و بست درب‌های لولایی دستی و نفوذ گرد و غبار می‌گردد.
          </p>
          <p>
            استفاده از درب‌های اتوماتیک اسلایدینگ تلسکوپی مجهز به هوابندهای دوبل مویی (Double Fin-Seal) و سیستم هوابند دولنگه (Airlock Lobby Vestibule) با برنامه‌ریزی اینترلاک (Interlock)، مانع از ایجاد کوران مستقیم هوا میان فضای باز و لابی اصلی می‌گردد.
          </p>
        </div>

        <!-- Section 3: BEA Belgium Sensors In-Depth -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">۳</span>
            تحلیل عملکرد سنسورهای ترکیبی پرده‌ای BEA بلژیک (سری IXIO-DT1)
          </h2>
          <p>
            سنسورهای سنتی مایکروویو صرفاً هرگونه حرکتی را در میدان دید خود تشخیص می‌دادند؛ در نتیجه عابری که در پیاده‌رو به موازات درب در حال گذر بود، موجب باز شدن غیرضروری درب و خروج حجم زیادی از هوای مطبوع می‌شد. سنسورهای نسل نوین <strong>BEA IXIO-DT1 بلژیک</strong> استانداردی نو در مدیریت انرژی هستند:
          </p>
          
          <div class="p-4 rounded-xl bg-slate-900 text-white space-y-3">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div class="space-y-1 p-2.5 rounded-lg bg-slate-800">
                <span class="font-bold text-emerald-400 block">رادار مایکروویو جهت‌دار (Direction Sensing):</span>
                <p class="text-slate-300">تفکیک بردار حرکت افراد؛ تنها فردی که با زاویه مستقیم به سمت ورودی می‌آید موجب فعال‌سازی می‌شود و ترددهای متقاطع نادیده گرفته می‌شوند.</p>
              </div>
              <div class="space-y-1 p-2.5 rounded-lg bg-slate-800">
                <span class="font-bold text-emerald-400 block">پرده مادون قرمز اکتیو ۲۴ نقطه‌ای (Active IR):</span>
                <p class="text-slate-300">ایجاد دو پرده متراکم نوری در دهانه بازشو برای پایش حضور ایستا (حتی فرد بی‌حرکت) و انطباق کامل با استاندارد ایمنی EN 16005.</p>
              </div>
            </div>
            <div class="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap justify-between items-center gap-2">
              <span>قابلیت تنظیم حالت بازشوی زمستانه/تابستانه (Winter Width)</span>
              <span class="font-mono text-emerald-400">BEA Belgium Certified</span>
            </div>
          </div>
        </div>

        <!-- Section 4: Double Fin-Seals & Air Leakage -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white text-xs font-black flex items-center justify-center">۴</span>
            هوابندهای مویی با غشای پلی‌اتیلنی میانی (Acoustic & Thermal Fin-Seals)
          </h2>
          <p>
            در کناره‌ها، سقف و اورلپ بین لنگه‌های متحرک و ثابت، فرچه‌های مویی با تراکم الیاف بالا به همراه یک تیغه پلاستیکی عایق در مرکز (Fin-Seal) نصب می‌شوند. این تیغه انعطاف‌پذیر از نفوذ بادهای شدید با سرعت بیش از ۶۰ کیلومتر در ساعت و ورود آلودگی‌های صوتی و ذرات معلق PM2.5 شهری جلوگیری می‌نماید.
          </p>
        </div>
      </div>
    `
  },
  {
    id: '1005',
    slug: 'aluminum-frames-anodizing-and-electrostatic-anatomy',
    title: 'آناتومی فریم‌های آلومینیومی آنودایز و الکترواستاتیک در سازه‌های مدرن',
    category: 'متریال و پروفیل',
    readTime: '۷ دقیقه مطالعه',
    date: '۱۴۰۴/۰۴/۲۶',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    summary: 'تحلیل دوام پوشش سطحی پروفیل‌ها در برابر رطوبت، اشعه UV و خط و خش در نمای خارجی.',
    tags: ['آنودایز آلومینیوم', 'رنگ الکترواستاتیک', 'پوشش PVD', 'پروفیل درب اتوماتیک', 'آلیاژ ۶۰۶۳', 'QUALANOD'],
    featured: false,
    published: true,
    viewsCount: 1140,
    author: {
      name: 'مهندس کامران رستمی',
      role: 'متخصص متالورژی آلومینیوم و پوشش‌های سطحی PVD درنا درب',
    },
    keyTakeaways: [
      'استفاده انحصاری از بیلت استاندارد آلیاژ ۶۰۶۳ با تمپرینگ T6 استحکام تسلیم بالای ۱۶۰ مگاپاسکال را تضمین می‌کند.',
      'آنودایزینگ سخت معماری طبق استاندارد اروپایی QUALANOD با ضخامت ۲۰ تا ۲۵ میکرون مقاومت سطحی کامل در برابر UV و اسیدهای جوی پدید می‌آورد.',
      'رنگ‌پاشی الکترواستاتیک با پودرهای سوپردورابل و پخت کوره ۲۲۰ درجه تنوع بافت‌های مات سمباده‌ای و ضدخش را تامین می‌کند.',
      'پوشش‌های PVD تیتانیومی در خلاء، درخشندگی آینه‌ای و سختی سطحی برابر با الماس‌های صنعتی را برای پروژه‌های مجلل فراهم می‌سازند.'
    ],
    relatedSlugs: ['guide-to-tempered-and-laminated-glass', 'acoustic-frameless-glass-partitions-design'],
    content: `
      <div class="space-y-8 text-slate-800 leading-relaxed font-normal">
        <p class="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed border-r-4 border-slate-600 pr-4 bg-slate-100 py-2 rounded-l-xl">
          پروفیل‌های آلومینیومی در سیستم‌های درب اتوماتیک و پارتیشن‌های شیشه‌ای، اسکلت باربر سازه را تشکیل می‌دهند. این مقاطع در خط مقدم مواجهه با تنش‌های مکانیکی، ضربات تردد روزمره، اشعه ماوراء بنفش خورشید، آلاینده‌های سولفیدی شهری و مواد شوینده قرار دارند. کیفیت متالورژی شمش پایه و فرآیندهای مهندسی پوشش سطحی، تعیین‌کننده ماندگاری ظاهری و عملکردی ساختمان در طول دهه‌ها است.
        </p>

        <!-- Engineering Metallurgy Alert -->
        <div class="p-5 rounded-2xl bg-slate-100 border border-slate-300 text-xs sm:text-sm text-slate-900 space-y-2.5 shadow-xs">
          <div class="font-black flex items-center gap-2 text-slate-950 text-sm sm:text-base">
            <svg class="w-5 h-5 text-[#06080F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span>تمایز بیلت فابریک خالص ۶۰۶۳ در برابر آلومینیوم ضایعاتی بازیافتی:</span>
          </div>
          <p class="leading-relaxed">
            استفاده از آلومینیوم‌های بازیافتی (Scrap) به دلیل وجود ناخالصی‌های آهن و سیلیسیم کنترل‌نشده، منجر به ایجاد لکه‌های ابروبادی در آنودایز، افت مقاومت کششی و شکستن فریم در برابر بارهای دینامیکی لنگه می‌شود. تمامی پروفیل‌های درنا درب از بیلت دوبال یا ایرالکو با آلیاژ ۶۰۶۳ و عملیات حرارتی T6 تولید می‌شوند.
          </p>
        </div>

        <!-- Section 1: 6063 Alloy & T6 Heat Treatment -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center">۱</span>
            متالورژی آلیاژ آلومینیوم ۶۰۶۳ (Al-Mg-Si) و عملیات حرارتی T6
          </h2>
          <p>
            آلیاژ ۶۰۶۳ که به آلیاژ معماری (Architectural Alloy) مشهور است، تعادلی ایده‌آل میان قابلیت اکستروژن مقاطع پیچیده با دیواره‌های نازک، کیفیت پرداخت سطحی بی‌نظیر و مقاومت به خوردگی فوق‌العاده فراهم می‌سازد:
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <strong class="text-slate-900 block font-bold mb-1">استحکام تسلیم (Yield Strength):</strong>
              حداقل ۱۶۰ تا ۱۹۰ مگاپاسکال پس از عملیات پیرسازی مصنوعی (Ageing) در کوره با دمای ۱۸۵ درجه.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <strong class="text-slate-900 block font-bold mb-1">سختی وبستر (Webster Hardness):</strong>
              دستیابی به سختی استاندارد ۱۲ تا ۱۴ وبستر برای جلوگیری از دفرمگی پروفیل تحت وزن شیشه.
            </div>
            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <strong class="text-slate-900 block font-bold mb-1">دقت ابعادی (Tolerances):</strong>
              تطابق با تلرانس‌های میلی‌متری اکستروژن طبق استاندارد DIN EN 12020-2 جهت آب‌بندی کامل.
            </div>
          </div>
        </div>

        <!-- Section 2: QUALANOD Anodizing Process -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center">۲</span>
            فرآیند آنودایزینگ معماری و گواهینامه QUALANOD اروپا
          </h2>
          <p>
            آنودایزینگ یک فرآیند الکتروشیمیایی است که لایه اکسید آلومینیوم طبیعی روی فلز را از چند نانومتر به لایه‌ای متخلخل و فوق‌العاده سخت با ضخامت ۱۵ تا ۲۵ میکرون (کلاس ۲۰ و ۲۵ میکرون معماری) تبدیل می‌کند. این لایه پیوند مولکولی با فلز پایه داشته و امکان ورقه شدن یا پوسته شدن ندارد:
          </p>
          <ul class="text-xs sm:text-sm text-slate-700 space-y-2 list-disc pr-5">
            <li><strong>اچینگ شیمیایی مات‌کننده (Satin Matt Etching):</strong> حذف خطوط کشش اکستروژن و ایجاد ظاهری مات و یکدست.</li>
            <li><strong>اکسیداسیون آندی در حمام اسید سولفوریک:</strong> ایجاد نانوتیوب‌های متخلخل اکسید آلومینیوم با سختی نزدیک به کوراندوم.</li>
            <li><strong>رنگ‌پذیری الکترولیتی با نمک‌های فلزی:</strong> تزریق نمک‌های قلع و نیکل در حفرات نانو جهت دستیابی به طیف رنگ‌های ماندگار شامپاینی، برنز، دودی، طلایی و مشکی آنودایز.</li>
            <li><strong>آب‌بندی نهایی (Hydrothermal Sealing):</strong> بستن حفرات متخلخل در آب دیونیزه جوش ۱۰۰ درجه برای مقاومت ۱۰۰٪ در برابر لکه‌پذیری و مواد شوینده.</li>
          </ul>
        </div>

        <!-- Section 3: Powder Coating QUALICOAT -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center">۳</span>
            رنگ‌پاشی پودری الکترواستاتیک کوره ۲۲۰ درجه (QUALICOAT Class 2)
          </h2>
          <p>
            برای پروژه‌هایی که نیازمند هماهنگی دقیق رنگی با کد رال (RAL Code) نمای ساختمان هستند، از پوشش‌های پودری الکترواستاتیک استفاده می‌شود:
          </p>
          <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-800">
            <p><strong>زیرسازی شیمیایی بدون کرومات (Chromium-Free Pre-treatment):</strong> ایجاد لایه نانو سرامیکی زیرین جهت تضمین چسبندگی رنگ حتی پس از تست‌های سایش و تست چسبندگی ضربدری (Cross-Cut Test ISO 2409).</p>
            <p><strong>رزین‌های پلی‌استر سوپردورابل (Superdurable TGIC-Free):</strong> پایداری رنگ و براقیت در برابر تابش شدید آفتاب خاورمیانه تا بیش از ۱۰ سال بدون گچی شدن یا مات شدن.</p>
            <p><strong>بافت‌های مات سمباده‌ای (Fine Texture Matt):</strong> بافت‌های مدرن مشکی سمباده‌ای RAL 9005، طوسی زغالی RAL 7016 و رنگ‌های متالیک که اثر انگشت و خط و خش‌های سطحی را کاملاً محو می‌سازند.</p>
          </div>
        </div>

        <!-- Section 4: Titanium PVD Coating -->
        <div class="space-y-3">
          <h2 class="text-xl sm:text-2xl font-black text-slate-950 tracking-tight pb-2 border-b border-slate-200 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg bg-slate-800 text-white text-xs font-black flex items-center justify-center">۴</span>
            تکنولوژی نانوپوشش تیتانیوم PVD (Physical Vapor Deposition)
          </h2>
          <p>
            در لابی هتل‌های ۵ ستاره، طلافروشی‌ها و برج‌های لوکس منطقه ۱ تهران، پوشش‌های استیل تیتانیوم PVD اوج هنر و تجمل به شمار می‌روند:
          </p>
          <div class="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white space-y-2 shadow-lg">
            <div class="flex items-center justify-between border-b border-white/15 pb-2">
              <span class="text-xs font-bold text-amber-300">پوشش نیترید تیتانیوم در محفظه خلاء پلاسما</span>
              <span class="text-[11px] text-slate-300 font-mono">Micro-Hardness > 2000 HV</span>
            </div>
            <p class="text-xs text-slate-200 leading-relaxed">
              با تبخیر اتم‌های تیتانیوم در محیط پلاسما و ترکیب با گاز نیتروژن در فشار منفی، لایه‌ای نانومتری از TiN با سختی سطحی فوق‌العاده بالا روی ورق‌های استنلس استیل ۳۰۴ نگیر و پروفیل‌ها رسوب داده می‌شود. این پوشش در رنگ‌های طلایی آینه‌ای (Mirror Gold)، رزگلد (Rose Gold)، شامپاینی براش و مشکی الماسی (Diamond Black) با مقاومت در برابر اثر انگشت (Anti-Fingerprint) اجرا می‌گردد.
            </p>
          </div>
        </div>
      </div>
    `
  }
];

export const ALL_ARTICLE_CATEGORIES = [
  'همه مقالات',
  'شیشه‌های تخصصی',
  'تکنولوژی و اپراتور',
  'پارتیشن و معماری',
  'بهینه‌سازی انرژی',
  'متریال و پروفیل'
] as const;

/**
 * Robust article resolver that matches by:
 * - Direct ID ('1001', '1002', ...)
 * - Slug ('guide-to-tempered-and-laminated-glass')
 * - Legacy numerical index ('1' -> '1001', '2' -> '1002', ...)
 * - Common prefix forms ('art-1', 'blog/1001', etc.)
 */
export function getArticleByIdOrSlug(query: string, articlesList: Article[] = ARTICLES_DATA): Article | undefined {
  if (!query) return undefined;
  const cleanQuery = query.trim().toLowerCase().replace(/^(\/)?blog\//, '').replace(/^#/, '');

  // 1. Direct ID match
  const byId = articlesList.find(a => a.id.toLowerCase() === cleanQuery);
  if (byId) return byId;

  // 2. Direct Slug match
  const bySlug = articlesList.find(a => a.slug.toLowerCase() === cleanQuery);
  if (bySlug) return bySlug;

  // 3. Legacy short index mapping (e.g. '1' -> 1001, '2' -> 1002)
  const legacyMap: Record<string, string> = {
    '1': '1001',
    '2': '1002',
    '3': '1003',
    '4': '1004',
    '5': '1005',
    'art-1': '1001',
    'art-2': '1002',
    'art-3': '1003',
    'art-4': '1004',
    'art-5': '1005',
  };
  if (legacyMap[cleanQuery]) {
    const mapped = articlesList.find(a => a.id === legacyMap[cleanQuery]);
    if (mapped) return mapped;
  }

  // 4. Loose match in slug
  return articlesList.find(a => a.slug.toLowerCase().includes(cleanQuery) || cleanQuery.includes(a.slug.toLowerCase()));
}
