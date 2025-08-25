'use client'

import React, { useState } from 'react';
import { Star, Clock, Users, Globe, Smartphone, Infinity, Book, CalendarDays, PlayIcon } from 'lucide-react';
import Image from 'next/image';
import { Play } from 'next/font/google';


interface BtnTypes {
    id: string;
    label: string;
    isActive: boolean;
    onClick: (id: number | string) => void;
}
const CoursePage = () => {
    const [activeTab, setActiveTab] = useState<string>('description');
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewRating, setReviewRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviewerName, setReviewerName] = useState('');
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

    const TabButton = ({ id, label, isActive, onClick }: BtnTypes) => (
        <button
            onClick={() => onClick(id)}
            className={`py-2 font-bold text-lg border-b-2 transition-colors ${isActive ? 'border-red-500 text-red-600' : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
        >
            {label}
        </button>
    );

    // const LearningPoint = ({ children }) => (
    //     <div className="flex items-start gap-3 mb-3">
    //         <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
    //         <p className="text-gray-700 text-sm leading-relaxed">{children}</p>
    //     </div>
    // );

    const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Review submitted:', { reviewerName, reviewRating, reviewText });
        setIsReviewModalOpen(false);
        setReviewRating(0);
        setReviewText('');
        setReviewerName('');
    };

    return (
        <div>
            {/* Header */}
            <div className="container max-w-7xl mx-auto bg-blue-100 -mt-14 md:mt-4 rounded-2xl py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#040c33] mb-4">
                                समाजशास्त्र (वैकल्पिक विषय)<br />Foundation Course (Online Mode)
                            </h1>
                            <div className="flex items-center gap-4 text-sm text-blue-950 mb-4">
                                <p>A course by <span className='font-bold'>Dikshant IAS</span></p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-blue-900 mb-4">
                                <div className="flex items-center gap-1">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>August 1, 2025</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Book className="w-4 h-4" />
                                    <span>15 lessons</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Globe className="w-4 h-4" />
                                    <span>English</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                                <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded-full">
                                    <span>Online mode</span>
                                </div>
                                <div className="flex items-center gap-1 bg-yellow-400 text-black px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4 mb-1" />
                                    <span>4.5 Review</span>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-80">
                            <Image
                                width={600}
                                height={600}
                                src="/img/online-course/foundation-course.webp"
                                alt="Course preview"
                                className="w-full rounded-lg shadow-lg border-5 border-slate-50"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Content */}
                    <div className="flex-1">
                        {/* Navigation Tabs */}
                        <div className="border-b border-gray-200 mb-6">
                            <nav className="flex gap-8">
                                <TabButton
                                    id="description"
                                    label="Course Overview"
                                    isActive={activeTab === 'description'}
                                    onClick={() => setActiveTab}
                                />
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {activeTab === 'description' && (
                            <div>
                                {/* What You'll Learn */}
                                <div className="bg-gray-50 rounded-lg mb-3">
                                    <h3 className="text-xl font-semibold text-[#040c33]">समाजशास्त्र (वैकल्पिक विषय) Foundation Course (Combo Pack)</h3>
                                    <h3 className="text-xl font-semibold text-[#040c33]">Sociology Foundation Course + Sociology Mentorship Programme</h3>
                                    <h3 className="text-xl font-semibold text-[#040c33]">Fees Offline in Installment is Rs. 40,000 & Fees One Time is Rs. 35,500</h3>
                                </div>

                                {/* Course Description */}
                                <div className="prose max-w-none mb-8">
                                    <p className="text-blue-950 mb-6 font-sm">
                                        फाउंडेशन कोर्स की प्रमुख विशेषताएँ :
                                    </p>
                                    <p className="text-blue-950 mb-4">
                                        समाजशास्त्र फाउंडेशन कोर्स के अंतर्गत समाजशास्त्र मुख्य परीक्षा (समाजशास्त्र के दोनों प्रश्न पत्र ) का गहन एवं विस्तृत अध्यापन शामिल.
                                    </p>
                                    <div>
                                        <ol className='text-blue-950'>
                                            <li>1. प्रोग्राम / कोर्स की कुल अवधि 400 घंटे / 8 - 9 माह.</li>
                                            <li>2. प्रत्येक कक्षा की अवधि 2-3 घंटे की तथा एक सप्ताह में 5-6 दिन की कक्षा.</li>
                                            <li>3. यदि किसी छात्र का सेशन छूट जाता है तो उस छूटे हुए कक्षा को फिर से देखने की सुविधा.</li>
                                            <li>4. 24 X 7 कक्षा एक्सेस की सुविधा .</li>
                                            <li>5. प्रिंटेड नोट्स / Study Materials और PDF notes ( 3000 -- 4000 pages / 35 Booklets ) की उपलब्धता.</li>
                                            <li>6. कक्षा के साथ PDF फॉर्मेट में नोट्स की उपलब्धता. </li>
                                            <li>7. लाइव क्लास में प्रशिक्षक से लाइव chat की सुविधा.</li>
                                            <li>8. प्रत्येक छात्र के लिए नियमित सलाह, प्रदर्शन का आकलन एवं उनका मार्गदर्शन.</li>
                                            <li>9. रेगुलर टेस्ट एवं कॉपी का नियमित मूल्यांकन.</li>
                                        </ol>
                                    </div>
                                    <p className="text-[#040c33] mt-4 mb-4 font-bold">
                                        समाजशास्त्र फाउंडेशन कोर्स के अंतर्गत समाजशास्त्र मुख्य परीक्षा (समाजशास्त्र के दोनों प्रश्न पत्र ) का गहन एवं विस्तृत अध्यापन शामिल.
                                    </p>
                                </div>

                                {/* Course Images */}
                                <div className="w-[100%] flex flex-col md:flex-row gap-4 mb-8">
                                    <div className='w-[100%] md:w-[20%] text-center'>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            className="rounded-xl"
                                            src="https://www.youtube.com/embed/D7AiQlz70DE"
                                            title="Lecture 1 Sociology Optional New Foundation Class, 02 June 21"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>

                                        <h3 className='font-bold mt-2 text-blue-500'>Video Class 1</h3>
                                    </div>
                                    <div className='w-[100%] md:w-[20%] text-center'>
                                       
                                        <iframe
                                            width="100%"
                                            height="200"
                                            className="rounded-xl"
                                            src="https://www.youtube.com/embed/gEfVIgXsfGI"
                                            title="Lecture 1 Sociology Optional New Foundation Class, 02 June 21"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <h3 className='font-bold mt-2 text-blue-500'>Video Class 2</h3>
                                    </div>
                                    <div className='w-[100%] md:w-[20%] text-center'>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            className='rounded-xl'
                                            src="https://www.youtube.com/embed/LvtaOh8_fyM"
                                            title="Lecture 1 Sociology Optional New Foundation Class, 02 june 21"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <h3 className='font-bold mt-2 text-blue-500'>Video Class 3</h3>
                                    </div>
                                    <div className='w-[100%] md:w-[20%] text-center'>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            className='rounded-xl'
                                            src="https://www.youtube.com/embed/3q0wlrIBPHg"
                                            title="Lecture 1 Sociology Optional New Foundation Class, 02 june 21"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <h3 className='font-bold mt-2 text-blue-500'>Video Class 4</h3>
                                    </div>
                                    <div className='w-[100%] md:w-[20%] text-center'>
                                        <iframe
                                            width="100%"
                                            height="200"
                                            className='rounded-xl'
                                            src="https://www.youtube.com/embed/okLWlZJWvEM"
                                            title="Lecture 1 Sociology Optional New Foundation Class, 02 june 21"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                        <h3 className='font-bold mt-2 text-blue-500'>Video Class 5</h3>
                                    </div>
                                </div>

                                <div className="prose max-w-none mb-8">
                                    <h3 className='text-[#040c33] font-bold text-lg mb-3'>समाजशास्त्र ही क्यों....</h3>
                                    <p className="text-blue-950 mb-6">
                                        UPSC द्वारा पाठ्यक्रम में नवीन बदलाव के बाद कुछ छात्रों द्वारा यह धारणा बनायी गई कि वैकल्पिक विषय का चुनाव, उस विषय की भूमिका के आधार पर नहीं करके, सर्वाधिक अंकदायी होने के आधार पर किया जाए। परंतु, 2013 में UPSC के पाठ्यक्रम में नवीन बदलाव के बाद, UPSC की सफलता में वैकल्पिक विषय (500 अंक) की अपेक्षा GS की भूमिका प्राथमिक हो गयी है (1000 अंक) और GS का विषय क्षेत्र भी अत्यधिक व्यापक हो गया है। फलतः यह जरूरी हो गया है कि कम-से-कम समय में GS का समग्र एवं गहन अध्ययन किया जाय। ऐसे में वैकल्पिक विषय का चुनाव करते समय यह देखना अत्यधिक महत्त्वपूर्ण है कि यह विषय GS में कितना उपयोगी है। एक वैकल्पिक विषय के रूप में समाजशास्त्र में दोनों ही विशेषताएँ विद्यमान हैं। यह विषय हमारे दैनिक जीवन से संबंधित होने के कारण सर्वाधिक सरल, बोधगम्य एवं अंकदायी है, साथ ही अब GS की तैयारी में भी इसका महत्त्व बढ़ गया है। (300 अंक से अधिक). सिविल सेवा परीक्षा में समाजशास्त्र की महत्ता को निम्न बिन्दुओं के अंतर्गत देखा जा सकता है -- सबसे सरल एवं बोधगम्य -- समाजशास्त्र हमारे समाज का व्यवस्थित अध्ययन करने वाला विषय है जिससे हम सभी भली-भांति परिचित हैं। समाजशास्त्र की विषयवस्तु के रूप में विवाह, परिवार एवं नातेदारी, जाति प्रथा, अस्पृश्यता, महिला, धर्म एवं समाज, राजनीतिक व्यवस्था, नगरीकरण एवं नगरीय समस्याएँ, साम्प्रदायिकता, क्षेत्रवाद, जाति संघर्ष, महिलाओं के प्रति हिंसा, गरीबी, आर्थिक विषमता एवं वंचन, गंदी बस्ती की समस्या, निरक्षरता एवं शैक्षिक असमानता, भूमि हस्तांतरण एवं विस्थापन आदि हमारे दैनिक जीवन से सीधे जुड़े हुए हैं। जिसको सरलता से समझा जा सकता है। सरल एवं बोधगम्य हाने के कारण इस विषय के अध्ययन हेतु किसी पृष्ठभूमि की आवश्यकता नहीं है।
                                    </p>
                                </div>

                                <div className="mb-8">
                                    <p className="text-sm text-blue-950 mt-2">
                                        <span className='font-bold'>सामान्य अध्ययन में प्रत्यक्ष भूमिका </span>-- मुख्य परीक्षा के पाठ्यक्रम में हाल में हुए परिवर्तन के बाद सामान्य अध्ययन की तैयारी में समाजशास्त्र की प्रत्यक्ष भूमिका काफी बढ़ गयी है
                                    </p>
                                    <h3 className='font-bold text-lg my-3 text-[#040c33]'>सामान्य अध्ययन के पाठ्यक्रम के अंतर्गत शामिल.....</h3>
                                    <div>
                                        <ol className='text-blue-950'>
                                            <li>1. भारतीय समाज: 80-100 अंक (GS paper I),</li>
                                            <li>2. सामाजिक न्यायः 80-100 अंक (GS paper II),</li>
                                            <li>3. आंतरिक सुरक्षाः 60-80 अंक (GS Paper III) ,</li>
                                            <li>4. नैतिकता, सत्यनिष्ठा एवं अभिरूचिः 80-100 अंक (GS paper IV),</li>
                                        </ol>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>जैसे विषय समाजशास्त्र की केन्द्रीय विषयवस्तु हैं। फलतः समाजशास्त्र की तैयारी के साथ सामान्य अध्ययन की 300-400 अंकों की तैयारी स्वतः हो जाती है।</h3>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>सामान्य अध्ययन में परोक्ष भूमिका -- </h3>
                                        <p className='text-blue-950 mb-6'>सामान्य अध्ययन के पाठ्यक्रम में शामिल पट्टेदारी प्रणाली, भूमि सुधार, हरित क्रांति, औद्योगीकरण, लोकतंत्र, राजनीतिक दल, दबाव समूह, नागरिकता, शक्ति का विकेन्द्रीकरण, पंचायती राज, पर्यावरणीय समस्याएँ, सतत् विकास, महिलाएँ, आचार एवं मूल्य आदि की तैयारी में भी समाजशास्त्र परोक्ष रूप से उपयोगी है क्योंकि उपरोक्त सभी विषय समाजशास्त्र के द्वितीय प्रश्नपत्र के पाठ्यक्रम में शामिल है (देखें समाजशास्त्र प्रश्नपत्र द्वितीय का पाठ्यक्रम) फलतः समाजशास्त्र की तैयारी के दौरान ही सामान्य अध्ययन के कई पहलुओं की एक व्यवस्थित तैयारी अपने आप हो जाती है और इस हेतु अतिरिक्त समय लगाना नहीं पड़ता है।</p>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>निबंध में उपयोगी-- </h3>
                                        <p className='text-blue-950 mb-6'><span className='font-bold'>मुख्य परीक्षा में निबंध के अंतर्गत शामिल विभिन्न विषयों में से समाजशास्त्र से जुड़े कम से कम एक तथा अधिक से अधिक दो या तीन निबंध अवश्य पूछे जाते रहें हैं।</span> अतः किसी अन्य वैकल्पिक विषय के अभ्यर्थी की तुलना में समाजशास्त्र के अभ्यार्थियों को एक तुलनात्मक बढ़त निबंध में स्वतः मिल जाती है</p>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>साक्षात्कार में उपयोगी -- </h3>
                                        <p className='text-blue-950 mb-6'>सिविल सेवा परीक्षा का अंतिम व निर्णायक पड़ाव साक्षात्कार होता है, जहाँ उम्मीदवारों से उनकी विषयगत ज्ञान से अधिक व्यक्तित्व एवं सामाजिक मुद्दों के प्रति उनके दृष्टिकोण को जांचा-परखा जाता है। इसमें अधिकांश प्रश्न जातिवाद, भ्रष्टाचार, दहेज, नक्सलवाद, आतंकवाद, आर्थिक विषमता, शैक्षिक असमानता, महिलाओं के विरूद्ध हिंसा, नगरीय समस्याएँ, भूमि हस्तांतरण एवं विस्थापन, प्रवास, बालश्रम जैसे सामाजिक मुद्दों से पूछे जाते हैं।ऐसी स्थिति में एक समाजशास्त्र के छात्र की सामाजिक मुद्दों से जुड़ी अंर्तदृष्टि अन्यों की तुलना में गहन होती है। अतः साक्षात्कार में भी समाजशास्त्र आपके लिए काफी सहायक होता है</p>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>डॉ. एस.एस. पाण्डेय के बारे में .... </h3>
                                        <p className='text-blue-950 mb-6'>डॉ. एस.एस. पाण्डेय भारत के समकालीन समाज वैज्ञानिक हैं जो मानव समाज के बारे में गहरी समझ रखने के साथ-साथ समकालीन सामाजिक मुद्दों के प्रति भी संवेदनशील रहें हैं। डॉ. पाण्डेय ने काशी हिन्दू विश्वविद्यालय के समाजशास्त्र विभाग से Industrial Sociology में Ph.D किया है तथा UNESCO द्वारा संचालित परियोजना ‘Village India’ में, प्रख्यात मानवशास्त्र डॉ. बी.एन. सरस्वती के साथ शोध् सहायक के रूप में कार्य किया है। इन्होंने राम मनोहर लोहिया अवध् विश्वविद्यालय में समाजशास्त्र के अध्यापक के रूप में कार्य किया है और छत्रपति साहूजी महाराज शोध् एवं प्रशिक्षण संस्थान, लखनऊ, उत्तर प्रदेश, आदर्श पूर्व प्रशिक्षण केन्द्र; समाज कल्याण विभाग, उत्तर प्रदेश, आदि कई संस्थानों में अतिथि व्याख्याता के तौर पर अध्यापन करते रहे हैं। डॉ. पाण्डेय ने विगत् 28 वर्षों से Indian Sociological Society द्वारा आयोजित All India Sociological Conference के साथ-साथ अन्य कई राष्ट्रीय एवं अन्तर्राष्ट्रीय सेमिनार में भाग लिया है और अपने विद्वतापूर्ण व्याख्यान के माध्यम से भारतीय समाज एवं सामाजिक मुद्दों के बारे में अपनी गहरी समझ एवं ज्ञान का परिचय दिया है। डॉ. पाण्डेय लेखन कार्य के क्षेत्र में भी अत्यधिक लोकप्रिय रहे हैं। </p>
                                        <p className='text-blue-950 mb-6'>TATA McGraw-Hill से प्रकाशित पुस्तक ‘समाजशास्त्र’ हो या फिर ‘भारतीय समाजः एक परिचय’, ‘Cast Conflict in India’, ‘Changing Focus on Labour-Management Relations in India’, जैसी पुस्तकें या ‘मृत्यु की दस्तक’, ‘सामाजिक विमर्श’, आदि कई संपादित पुस्तकों एवं जर्नल में प्रकाशित लेख, इन सभी में डॉ. पाण्डेय के ज्ञान एवं विषय वस्तु की गहरी समझ स्पष्ट रूप से दृष्टिगोचर होती है।</p>
                                        <p className='text-blue-950 mb-6'>डॉ. पाण्डेय विगत् 22 वर्षों से सिविल सेवा परीक्षा के अभ्यर्थियों को प्रशिक्षित कर रहे हैं और वर्तमान में Dikshant Education Centre के निदेशक एवं एक कुशल अध्यापक के रूप में सिविल सेवा परीक्षा के अभ्यर्थियों हेतु अध्ययन सामग्री एवं अध्यापन के क्षेत्र में नवीन प्रयोगों के साथ निरंतर सक्रिय हैं।</p>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>समाजशात्र (वैकल्पिक विषय ) की तैयारी की रणनीति के बारे में जानने के लिए कृपया यहाँ पर क्लिक करें..</h3>
                                        <h3 className='font-bold text-lg my-3 text-[#040c33]'>*Terms and Conditions Apply...</h3>
                                        <h3 className='font-bold text-3xl my-3 text-red-900'>Fees Structure</h3>
                                        <p className='text-blue-950 mb-6'>Fees : ₹35000/- (Including GST)</p>
                                        <p className='text-blue-950 mb-6'>One Time Fees : ₹35500/- (Including GST)</p>
                                        <table className="table-auto w-[100%] text-start border border-red-300">
                                            <thead className='bg-red-500 p-10'>
                                                <tr className='text-center px-5 text-white'>
                                                    <th>1st</th>
                                                    <th>2nd</th>
                                                    <th>3rd</th>
                                                    <th>4th</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='font-bold text-center text-blue-950'>
                                                    <td>₹15000/-</td>
                                                    <td>₹15000/-</td>
                                                    <td>₹10000/-</td>
                                                    <td>₹0/-</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className='text-blue-950 mb-10 mt-4'>Contact: 7428092240, 9312511015</p>
                                    </div>
                                </div>

                                {/* Reviews Section */}
                                <div className="mt-12 bg-slate-50 px-2 py-4">
                                    <h3 className="text-xl font-semibold mb-6">Reviews</h3>
                                    <div className="flex items-center gap-8 mb-8">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-gray-900 mb-2">5</div>
                                            <div className="flex text-yellow-400 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className="w-5 h-5 fill-current" />
                                                ))}
                                            </div>
                                            <div className="text-sm text-gray-600">1 rating</div>
                                        </div>
                                        <div className="flex-1 max-w-md">
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <div key={star} className="flex items-center gap-2 mb-1">
                                                    <span className="text-sm w-4">{star}</span>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${star === 5 ? 'bg-yellow-400 w-full' : 'bg-gray-200 w-0'}`}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-gray-600 w-8">
                                                        {star === 5 ? '100%' : '0%'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsReviewModalOpen(true)}
                                        className="border border-blue-500 text-blue-500 px-4 py-2 rounded hover:bg-blue-50 mb-8"
                                    >
                                        Write A Review
                                    </button>
                                    <div className="border-t pt-6">
                                        <div className="flex items-start gap-4">
                                            <Image
                                                width={1920}
                                                height={500}
                                                src="/api/placeholder/50/50"
                                                alt="Keith Son"
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-[#040c33]">Keith Son</h4>
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-current" />
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="text-sm text-blue-950 mb-2">Course Review</div>
                                                <p className="text-blue-950 text-sm">
                                                    Lorem ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="w-full lg:w-80">
                        <div className="lg:sticky lg:top-8">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="relative">
                                    <button onClick={() => setIsVideoModalOpen(true)}>
                                        <Image
                                            width={700}
                                            height={700}
                                            src="/img/online-course/foundation-course.webp"
                                            alt="Course preview"
                                            className="w-full h-auto object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-red-500 bg-opacity-20 rounded-full animate-ping flex items-center justify-center">
                                                <PlayIcon className='text-white hover:cursor-pointer' />
                                            </div>
                                        </div>
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="text-3xl font-bold text-[#040c33] mb-6">₹35000/ <del className='text-gray-400'>₹40000/</del></div>
                                    {/* <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold mb-6 hover:bg-slate-700 transition-colors">
                                        Start Now
                                    </button> */}
                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center gap-3">
                                            <Book className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Lectures: 200</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Clock className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Duration: 8 Month</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Users className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Enrolled: 391 students</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Globe className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Language: Hindi, English</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Available on the app</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Infinity className="w-4 h-4 text-red-700" />
                                            <span className="text-blue-950">Unlimited access forever</span>
                                        </div>
                                    </div>
                                    <button className="mt-5 w-full bg-[#0d0d48] text-white py-3 rounded-lg font-semibold mb-6 hover:bg-red-700 transition-colors">
                                        Buy Now
                                    </button>
                                    <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold mb-6 hover:bg-red-700 transition-colors">
                                        Book Counseling Session
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 bg-gradient-to-br from-gray-900 to-red-900 rounded-lg overflow-hidden text-white">
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">Newest offer</h3>
                                    <p className="text-sm text-gray-300 mb-4">
                                        Create a landing page for this course to maximize Conversions.
                                    </p>
                                    <div className="relative mb-4">
                                        <Image
                                            width={500}
                                            height={500}
                                            src="/api/placeholder/280/160"
                                            alt="Thumbnails preview"
                                            className="w-full rounded-lg"
                                        />
                                    </div>
                                    <button className="w-full bg-yellow-500 text-black py-2 rounded font-semibold hover:bg-yellow-400 transition-colors">
                                        View more
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsReviewModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    value={reviewerName}
                                    onChange={(e) => setReviewerName(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewRating(star)}
                                            className={`text-2xl ${reviewRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    rows={4}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsReviewModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    Submit Review
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Video Modal */}
            {isVideoModalOpen && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
                    <div className="bg-black rounded-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={() => setIsVideoModalOpen(false)}
                            className="absolute top-1 right-1 text-gray-50 hover:cursor-pointer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                            <iframe
                                className="absolute top-0 left-0 w-full h-full rounded-lg"
                                src="https://www.youtube.com/embed/D7AiQlz70DE"
                                title="Course Preview Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoursePage;