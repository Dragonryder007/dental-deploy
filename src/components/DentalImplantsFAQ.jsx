import React, { useState } from 'react';

const faqCategories = [
  {
    title: "Common Patient Questions",
    items: [
      {
        q: "What is a dental implant?",
        a: "A dental implant is a titanium post surgically placed into the jawbone beneath the gum line. It acts as an artificial tooth root, providing a sturdy foundation for a replacement tooth (crown) that looks and acts just like a natural tooth."
      },
      {
        q: "How is a dental implant different from a bridge?",
        a: "A dental implant replaces the tooth root and stands independently, whereas a bridge relies on shaving down the adjacent healthy teeth to support a false tooth in the middle. Implants preserve your jawbone and adjacent teeth, making them a healthier long-term option."
      },
      {
        q: "Why is replacing a missing tooth important?",
        a: "Replacing a missing tooth is vital because gaps can cause your remaining teeth to shift, leading to bite problems. It also leads to bone loss in the jaw, changes in facial structure, and difficulties in chewing and speaking clearly."
      },
      {
        q: "What happens if someone does not replace a missing tooth?",
        a: "If not replaced, the jawbone in that area will begin to shrink due to lack of stimulation. Surrounding teeth will drift into the gap, increasing the risk of tooth decay, gum disease, and further tooth loss."
      },
      {
        q: "Are dental implants permanent?",
        a: "Yes, dental implants are considered a permanent tooth replacement option. Because they fuse directly with your jawbone, they become a permanent part of your anatomy."
      },
      {
        q: "How long do dental implants last?",
        a: "With proper care and good oral hygiene, the implant post itself can last a lifetime. The crown attached to the top may need replacement after 15 to 20 years due to normal wear."
      },
      {
        q: "Do implants look and feel like natural teeth?",
        a: "Absolutely. Dental implants are custom-designed to match the color, shape, and size of your natural teeth. Once fully healed, you won't even be able to tell the difference between the implant and your real teeth."
      },
      {
        q: "Will implants look natural?",
        a: "Yes, they will look completely natural. The porcelain crown that is attached to the implant is color-matched and shaped to blend in seamlessly with your surrounding teeth."
      },
      {
        q: "Who is the right candidate for dental implants?",
        a: "Anyone who is missing one or more teeth, has healthy gums, and enough jawbone to support the implant is a good candidate. A full assessment will be done during your consultation."
      },
      {
        q: "Can anyone get implants?",
        a: "Most adults can get implants, provided they have adequate bone density and are free from severe underlying health conditions that impair healing. Children and teens whose jawbones are still growing are typically not candidates."
      },
      {
        q: "Am I too old for dental implants?",
        a: "Age is not a limiting factor for dental implants. As long as you are in good general health and can undergo a routine dental extraction, you can receive implants regardless of your age."
      },
      {
        q: "Can smokers get implants?",
        a: "Yes, but smoking significantly slows down healing and increases the risk of implant failure. It is strongly advised to quit smoking before and after the procedure to ensure success."
      },
      {
        q: "Can implants replace more than one missing tooth?",
        a: "Yes, implants can replace a single tooth, multiple teeth (using an implant-supported bridge), or even an entire upper or lower set of teeth (using All-on-4 or All-on-6 methods)."
      },
      {
        q: "Are dental implants painful? / Are implants painful?",
        a: "No, the placement is done under local anesthesia, so you won't feel pain during the surgery. Most patients find the procedure much more comfortable than they expected."
      },
      {
        q: "Is implant surgery safe? / Are implants safe?",
        a: "Yes, when performed by an experienced specialist, dental implant surgery is highly safe and has a success rate of over 95%. They are made from biocompatible materials like titanium, which have been safely used in dentistry for decades."
      },
      {
        q: "How long does the procedure take?",
        a: "The surgery to place a single implant typically takes about 30 to 60 minutes. However, the entire process, including healing and placing the final crown, can take anywhere from a few days (immediate loading) to a few months."
      },
      {
        q: "How many days does recovery take? / How long does recovery take?",
        a: "Initial recovery takes about 1 to 3 days, during which you may experience mild swelling. Most patients return to their normal daily activities and work the very next day."
      },
      {
        q: "Is implant treatment painful after surgery?",
        a: "There may be mild discomfort and swelling for a few days post-surgery, but this is easily managed with over-the-counter painkillers. Severe pain is very rare."
      },
      {
        q: "Will I be able to eat normally after getting implants?",
        a: "Immediately after surgery, you'll need to stick to soft foods. But once the implant has fully integrated and the final crown is placed, you can eat completely normally, including hard and crunchy foods."
      },
      {
        q: "How soon can I eat after implants?",
        a: "You can eat soft foods immediately after the procedure. You should avoid chewing directly on the implant site until it is fully healed, which takes a few weeks to months depending on the case."
      },
      {
        q: "What is the most common fear patients have before implants?",
        a: "The most common fear is that the procedure will be painful. However, because the jawbone has very few nerve endings, the procedure is actually quite comfortable, often less painful than a simple tooth extraction."
      },
      {
        q: "What do patients usually say after the procedure is done?",
        a: "Most patients say, 'It was so much easier than I thought it would be!' They are often surprised by the lack of pain and how smooth the process was."
      },
      {
        q: "What if I’m scared of visiting a dentist?",
        a: "Dental anxiety is completely normal. We offer various comfort options, including conscious sedation, to ensure you feel relaxed and safe throughout your visit."
      },
      {
        q: "Is implant treatment stressful?",
        a: "Not with the right team. We plan everything digitally in advance, ensuring a smooth, predictable, and stress-free experience from consultation to your final smile."
      },
      {
        q: "Are implants expensive?",
        a: "While the upfront cost is higher than a bridge or denture, implants are the most cost-effective solution over a lifetime because they don't need frequent replacement and protect your surrounding teeth from damage."
      },
      {
        q: "Are implants better than bridges?",
        a: "Yes. Implants are superior because they do not require filing down healthy adjacent teeth and they prevent bone loss in the jaw, which a bridge cannot do."
      }
    ]
  },
  {
    title: "1. BASICS (Curiosity + Awareness)",
    items: [
      {
        q: "What exactly is a dental implant (in simple words)?",
        a: "A dental implant is essentially an artificial tooth root made of titanium. It is gently placed into your jawbone to hold a replacement tooth (crown) securely. Think of it as a strong, permanent anchor that looks, feels, and functions just like a natural tooth."
      },
      {
        q: "Do I really need to replace a missing tooth… or can I ignore it?",
        a: "Ignoring a missing tooth can lead to several problems over time. Your surrounding teeth may shift into the gap, causing bite issues. Additionally, the bone where the tooth used to be will start to shrink (bone loss), which can alter your facial structure and make you look older."
      },
      {
        q: "What actually happens if I leave a gap for months or years?",
        a: "Leaving a gap causes the jawbone in that area to deteriorate because it lacks the stimulation of a tooth root. Nearby teeth will tilt or drift into the empty space, messing up your bite. It can also lead to gum disease and further tooth loss down the line."
      },
      {
        q: "Does missing a tooth slowly cause bone loss in the jaw?",
        a: "Yes, absolutely. Without a tooth root to stimulate the jawbone during chewing, the bone naturally begins to resorb or melt away. Dental implants are the only tooth replacement option that preserves and stimulates natural bone growth."
      },
      {
        q: "Is a bridge damaging my healthy teeth over time?",
        a: "A traditional dental bridge requires grinding down the healthy teeth on either side of the gap to support the bridge. While it works, it permanently alters healthy teeth and makes them more prone to decay or damage in the future. Implants do not affect adjacent teeth."
      },
      {
        q: "Implant vs bridge — which is truly better long-term?",
        a: "In the long term, implants are vastly superior. They preserve your jawbone, don't damage adjacent healthy teeth, and can last a lifetime with proper care. Bridges typically need replacing every 10-15 years and can lead to bone loss underneath."
      }
    ]
  },
  {
    title: "2. FEAR BREAKERS (Viral + Conversion Core)",
    items: [
      {
        q: "Are dental implants painful… honestly?",
        a: "Honestly, no. The procedure is performed under local anesthesia, so you won't feel pain during the surgery. Most patients are surprised to find that the recovery is much easier than a tooth extraction, often only requiring over-the-counter painkillers for a day or two."
      },
      {
        q: "Is implant surgery safe or risky?",
        a: "Dental implant surgery is one of the safest and most predictable procedures in dentistry, with a success rate of over 95%. When performed by experienced specialists using 3D guided technology (like at V Dental and Implant Center), the risks are incredibly minimal."
      },
      {
        q: "What if I’m extremely scared of dental treatment?",
        a: "Dental anxiety is very common! We offer various comfort options, including sedation and a calming environment, to ensure you are completely relaxed. Our team specializes in anxiety-friendly care and will never rush you."
      },
      {
        q: "Is the whole implant process stressful or complicated?",
        a: "Not at all. We handle all the complexities for you. From the 3D digital planning to the final placement, our streamlined process means you just need to show up for your appointments. We explain every step clearly so there are no surprises."
      },
      {
        q: "What is the #1 fear patients have before implants?",
        a: "The biggest fear is usually pain during the procedure. However, this fear is quickly dispelled! Because the jawbone has very few nerve endings, placing the implant is actually less painful than taking a tooth out."
      },
      {
        q: "What do patients usually say right after it’s done?",
        a: "Almost every patient says, 'Wow, that was much easier than I expected!' or 'I wish I had done this years ago!' They are usually relieved at how quick and painless the process actually was."
      }
    ]
  },
  {
    title: "3. RESULTS & CONFIDENCE (Desire + Transformation)",
    items: [
      {
        q: "Will implants look completely natural?",
        a: "Yes! The visible part of the implant (the crown) is custom-crafted to perfectly match the color, shape, and size of your surrounding natural teeth. Nobody will be able to tell it's not a real tooth."
      },
      {
        q: "Will it feel like my real teeth while eating and speaking?",
        a: "Absolutely. Because implants are anchored securely into your jawbone, they restore full chewing power. You can eat your favorite foods—apples, steak, nuts—without worrying about them slipping or clicking like dentures do."
      },
      {
        q: "Can I smile confidently again without hesitation?",
        a: "100%. Implants give you back a permanent, beautiful smile. You will never have to hide your teeth or worry about gaps in photos ever again."
      },
      {
        q: "Do implants actually stop further bone loss?",
        a: "Yes. Implants act like artificial tooth roots. When you chew, they stimulate the jawbone just like natural roots do, which halts bone loss and preserves your facial structure."
      },
      {
        q: "Are implants a permanent solution or temporary?",
        a: "Dental implants are considered a permanent, long-term solution for missing teeth. Unlike dentures or bridges, which are temporary or need eventual replacement, implants integrate with your body."
      },
      {
        q: "How long do implants really last in real life?",
        a: "The titanium implant post itself is designed to last a lifetime. The crown attached to it can last 15-20 years or more, depending on your oral hygiene and whether you grind your teeth."
      }
    ]
  },
  {
    title: "4. ELIGIBILITY (Smart Lead Qualification)",
    items: [
      {
        q: "Am I the right candidate for dental implants?",
        a: "Most people are excellent candidates! If you are missing one or more teeth, have generally good oral health, and have a fully grown jawbone, you qualify. We offer a free consultation with 3D imaging to confirm your eligibility."
      },
      {
        q: "Am I too old for this treatment?",
        a: "No! There is no upper age limit for dental implants. As long as you are healthy enough for a routine dental extraction, you can get implants. We routinely and successfully place implants in patients in their 70s, 80s, and beyond."
      },
      {
        q: "Can smokers still safely get implants?",
        a: "Yes, but smoking does increase the risk of implant failure because it slows down healing. We strongly recommend quitting or significantly reducing smoking before and after the procedure to ensure the best results."
      },
      {
        q: "I’ve been missing a tooth for years — is it too late now?",
        a: "It's almost never too late. Even if you've been missing a tooth for years, implants are still possible. If significant bone loss has occurred over time, a simple bone graft can rebuild the area to support the implant."
      },
      {
        q: "What if I already have bone loss — can implants still be done?",
        a: "Yes! If you have bone loss, we can perform a bone grafting procedure to add volume and strength to your jawbone, creating a solid foundation for the implant."
      },
      {
        q: "Will I need a bone graft before getting implants?",
        a: "Not necessarily. It depends on the current state of your jawbone, which we assess using a 3D CBCT scan. If the bone is thin or soft, a graft will be recommended to ensure the implant's long-term success."
      }
    ]
  },
  {
    title: "5. PROCEDURE & RECOVERY (Remove Uncertainty)",
    items: [
      {
        q: "What actually happens during the implant procedure?",
        a: "After numbing the area, a small, precise space is created in the jawbone where the titanium implant is gently placed. A temporary tooth may be placed on top. Once the implant fuses with the bone (a few months), the final custom crown is attached."
      },
      {
        q: "How long does the full treatment take from start to finish?",
        a: "The timeline varies. Some patients can get 'teeth in a day.' For others, it takes 3 to 6 months for the implant to fully fuse with the bone before the final permanent crown is attached. Your doctor will give you an exact timeline during consultation."
      },
      {
        q: "How many visits will I need?",
        a: "Typically, it requires 3 to 4 visits: a consultation/3D scan, the placement surgery, a check-up to monitor healing, and the final placement of the custom crown. For outstation patients, we condense these steps efficiently."
      },
      {
        q: "Will there be pain or swelling after the surgery?",
        a: "Mild swelling and minor discomfort are normal for 1-3 days after the procedure. This is easily managed with regular over-the-counter pain medication and ice packs. Most patients report very little pain."
      },
      {
        q: "How quickly can I get back to normal life and work?",
        a: "Most patients return to work and normal daily activities the very next day. The recovery is generally fast and uncomplicated."
      },
      {
        q: "Is bone grafting painful or difficult?",
        a: "Bone grafting sounds intimidating, but it is a routine, painless procedure done at the same time as the implant or extraction. You will be numb, and the recovery is very similar to a standard extraction."
      },
      {
        q: "When can I eat normally again without restrictions?",
        a: "You'll stick to soft foods for a few days to weeks immediately after surgery to let the implant settle. Once the implant is fully healed and the final crown is placed, you can eat absolutely anything you want without restrictions."
      }
    ]
  },
  {
    title: "6. COST & VALUE (Decision Trigger 💰)",
    items: [
      {
        q: "Are implants expensive… or actually worth the investment?",
        a: "While the initial cost is higher than a bridge or denture, implants are the most cost-effective solution over a lifetime. Because they don't need to be replaced every 10 years and don't damage surrounding teeth, they save you money and dental visits in the long run."
      },
      {
        q: "Why do implants cost more than bridges or dentures?",
        a: "Implants involve high-tech titanium materials, advanced 3D digital planning, precise surgical placement, and a custom-crafted porcelain crown. You are paying for a lifetime, bio-compatible replacement of a human body part."
      },
      {
        q: "Does bone grafting increase the overall cost?",
        a: "If a bone graft is required, it does add a moderate amount to the total cost. However, we provide complete, transparent pricing upfront during your free consultation so there are no hidden fees."
      },
      {
        q: "Is this a one-time solution or will I need repeated treatments?",
        a: "The implant post is a one-time, lifetime solution. While the crown on top might need replacement after 15-20 years due to normal wear and tear, the implant itself, when cared for properly, stays securely in your jaw forever."
      }
    ]
  },
  {
    title: "7. ADVANCED / HIGH-TICKET CASES (Authority Positioning)",
    items: [
      {
        q: "Can implants replace multiple missing teeth at once?",
        a: "Yes. If you are missing several teeth in a row, we can use an 'implant-supported bridge' where two implants support a bridge of 3 or 4 teeth. You don't need an individual implant for every single missing tooth."
      },
      {
        q: "What if I need full mouth replacement?",
        a: "We specialize in 'All-on-4' or 'All-on-6' full mouth restorations. This involves placing 4 to 6 strategic implants per arch to support an entire permanent set of beautiful new teeth, giving you a brand new smile."
      },
      {
        q: "Can full mouth implants be done even with severe bone loss?",
        a: "Yes, advanced techniques like Zygomatic implants (which anchor into the cheekbone instead of the jaw) or specialized grafting allow us to provide full mouth implants even for patients who have been told they don't have enough bone."
      },
      {
        q: "Are there options like fixed teeth in 3–5 days?",
        a: "Yes! Using advanced immediate-load techniques, we can often place the implants and attach a fixed, functional set of teeth in a matter of days. This is highly popular for international patients flying in for treatment."
      }
    ]
  }
];

const DentalImplantsFAQ = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-[color:var(--dk)] mb-4">Dental Implants FAQ</h2>
          <p className="text-xl text-[color:var(--muted)]">Everything you need to know about your implant journey, answered by our experts.</p>
        </div>

        <div className="space-y-8">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <h3 className="bg-[color:var(--teal)] text-white text-xl font-bold px-6 py-4">
                {category.title}
              </h3>
              <div className="divide-y divide-gray-100">
                {category.items.map((item, itemIdx) => {
                  const id = `${catIdx}-${itemIdx}`;
                  const isExpanded = expanded === id;
                  return (
                    <div key={id} className="p-2">
                      <button
                        className="w-full text-left px-4 py-4 flex justify-between items-center focus:outline-none"
                        onClick={() => setExpanded(isExpanded ? null : id)}
                      >
                        <h4 className="text-lg font-bold text-gray-800 pr-8">{item.q}</h4>
                        <span className={`text-2xl text-[color:var(--teal)] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                          ⌄
                        </span>
                      </button>
                      <div 
                        className={`px-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                      >
                        <p className="text-gray-600 leading-relaxed text-lg">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DentalImplantsFAQ;
