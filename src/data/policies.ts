export interface PolicySection {
  title: string;
  content: string[];
}

export interface PolicyDocument {
  slug: string;
  titleEn: string;
  titleRu: string;
  introEn: string;
  introRu: string;
  sectionsEn: PolicySection[];
  sectionsRu: PolicySection[];
  titleUz?: string;
  introUz?: string;
  sectionsUz?: PolicySection[];
}

export const policies: Record<string, PolicyDocument> = {
  offer: {
    slug: 'offer',
    titleEn: 'Terms of Sale & Public Offer',
    titleRu: 'Публичная оферта (Договор купли-продажи)',
    introEn: 'Standard terms and conditions governing the purchase, order placement, and fulfillment of flagship consumer electronics via AURA Mobile international boutiques and online portal.',
    introRu: 'Условия типового публичного договора купли-продажи, оформления заказов и оплаты товаров во флагманском интернет-магазине AURA Mobile.',
    sectionsEn: [
      {
        title: '1. General Provisions & Subject of Agreement',
        content: [
          'This document constitutes a public offer made by AURA TECHNOLOGIES INC. ("Seller") to any natural or legal person ("Buyer") purchasing products on the official AURA Mobile platform.',
          'The Seller agrees to transfer ownership of authentic, brand-new flagship smartphones and certified accessories, and the Buyer agrees to accept and pay for goods under the conditions set forth herein.',
          'Placing an order or completing an electronic checkout signifies the Buyer\'s full and unconditional acceptance of these terms. All transactions comply with international commercial law and distance selling regulations.',
        ],
      },
      {
        title: '2. Product Specifications & Pricing',
        content: [
          'All flagship smartphones in the catalog, including technical specifications, storage options, colors, and high-resolution renders, are provided for comprehensive customer guidance.',
          'All prices are listed in United States Dollars (USD, $) and include all applicable standard export packing and statutory compliance requirements.',
          'Final availability and immediate dispatch readiness are verified in real time during the automated payment and order confirmation cycle.',
        ],
      },
      {
        title: '3. Order Placement & Payment Procedure',
        content: [
          'The Buyer selects their device configuration, specifies contact information, and provides the designated worldwide shipping address.',
          'Accepted payment instruments include Apple Pay, Google Pay, Visa, MasterCard, American Express, and encrypted bank wire / digital gateways.',
          'Orders are placed on hold for immediate dispatch upon real-time authorization through 3-D Secure 2.0 or biometric wallet verification.',
        ],
      },
      {
        title: '4. International Express Shipping',
        content: [
          'Fulfillment is conducted from certified logistics hubs in San Francisco, London, Dubai, and Tokyo via premier express couriers (DHL Express, FedEx Priority).',
          'Upon courier handover, the Buyer receives an end-to-end tracking code and is requested to inspect the intact tamper-evident packaging before signing.',
        ],
      },
      {
        title: '5. AURA Care Warranty & Liability',
        content: [
          'Every device is protected by 24 Months of complimentary AURA Care Global Warranty, covering hardware integrity and worldwide authorized service center priority.',
          'Force majeure events and operational liabilities are governed by standard international commercial trade practices.',
        ],
      },
      {
        title: '6. Official Corporate Identity & Concierge Contacts',
        content: [
          'Legal Entity: AURA TECHNOLOGIES GLOBAL LTD. / AURA TECHNOLOGIES INC.',
          'Trade Brand: AURA Mobile.',
          'Flagship Lounge & Global HQ: 100 Innovation Blvd, Suite 400, San Francisco, CA 94105.',
          'Client Desk & Concierge: concierge@auramobile.store | +1 (800) 492-AURA.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Общие положения и предмет соглашения',
        content: [
          'Настоящий документ является официальным публичным предложением (офертой) компании AURA TECHNOLOGIES INC. («Продавец») о продаже флагманских мобильных устройств покупателям («Покупатель») через интернет-платформу AURA Mobile.',
          'Продавец обязуется передать в собственность Покупателя оригинальные смартфоны и сертифицированные аксессуары, а Покупатель обязуется принять и оплатить товар в соответствии с условиями настоящего соглашения.',
          'Оформление заказа или успешное завершение онлайн-оплаты на сайте означает полное и безоговорочное согласие Покупателя со всеми условиями публичной оферты.',
        ],
      },
      {
        title: '2. Сведения о товаре и стоимость',
        content: [
          'Все модели смартфонов в каталоге, их технические характеристики, конфигурации памяти и цветовые решения представлены в ознакомительных и презентационных целях.',
          'Все цены на продукцию указаны в долларах США (USD, $) и включают обязательную заводскую предпродажную подготовку и защитную упаковку.',
          'Наличие выбранной модификации на складе и готовность к отправке подтверждаются в автоматическом режиме в момент оформления заказа.',
        ],
      },
      {
        title: '3. Порядок оформления и проведения платежей',
        content: [
          'Покупатель выбирает необходимую конфигурацию устройства, указывает контактные реквизиты и точный адрес международной доставки.',
          'К оплате принимаются: Apple Pay, Google Pay, банковские карты Visa, MasterCard, American Express, а также корпоративные электронные счета.',
          'Транзакции подтверждаются в режиме реального времени с применением сквозного шифрования и протоколов 3-D Secure 2.0.',
        ],
      },
      {
        title: '4. Международная экспресс-доставка',
        content: [
          'Отправка заказов осуществляется из логистических хабов в Сан-Франциско, Лондоне, Дубае и Токио аккредитованными службами экспресс-доставки (DHL Express, FedEx Priority).',
          'Покупатель получает персональный трек-номер для круглосуточного отслеживания отправления до момента личного вручения курьером.',
        ],
      },
      {
        title: '5. Международная гарантия AURA Care',
        content: [
          'На всю новую технику распространяется 24 месяца международной гарантии AURA Care с возможностью сервисного обслуживания в авторизованных центрах по всему миру.',
          'Взаимные обязательства сторон и форс-мажорные обстоятельства регулируются нормами международного коммерческого права.',
        ],
      },
      {
        title: '6. Официальные реквизиты и служба поддержки',
        content: [
          'Юридическое лицо: AURA TECHNOLOGIES GLOBAL LTD. / AURA TECHNOLOGIES INC.',
          'Торговая марка: AURA Mobile.',
          'Глобальный офис: 100 Innovation Blvd, Suite 400, San Francisco, CA 94105.',
          'Консьерж-сервис: concierge@auramobile.store | +1 (800) 492-AURA.',
        ],
      },
    ],
  },

  'payment-info': {
    slug: 'payment-info',
    titleEn: 'Payment Methods & Gateway Standards',
    titleRu: 'Способы и стандарты оплаты',
    introEn: 'Comprehensive guide to accepted global payment instruments, encrypted tokenization, and multi-currency checkout at AURA Mobile.',
    introRu: 'Подробная информация о принимаемых международных платёжных инструментах, токенизации и стандартах безопасности AURA Mobile.',
    sectionsEn: [
      {
        title: '1. Accepted Global Payment Instruments',
        content: [
          'Apple Pay & Google Pay (instant biometric one-touch checkout).',
          'Visa & Visa Infinite international credit and debit cards.',
          'MasterCard & World Elite international cards.',
          'American Express (Amex) global premium card cards.',
          'PayPal & Verified Corporate Wire Transfers.',
        ],
      },
      {
        title: '2. Online Checkout Architecture & 3-D Secure 2.0',
        content: [
          'Online card payments are routed directly through tier-1 PCI-DSS Level 1 certified merchant gateways.',
          'AURA Mobile servers NEVER store or process raw 16-digit card numbers, CVV/CVC codes, or banking PINs.',
          'Transactions undergo 3-D Secure 2.0 fraud scoring with biometric device binding or dynamic OTP bank approval.',
        ],
      },
      {
        title: '3. Pricing Currency & Transparency',
        content: [
          'All transactions are processed in United States Dollars (USD, $).',
          'AURA Mobile charges zero hidden handling fees. If your issuing bank uses a different home currency, conversion is calculated according to your bank\'s standard exchange rate.',
        ],
      },
      {
        title: '4. Instant Order Authorization',
        content: [
          'Upon successful authorization, an automated encrypted receipt and commercial invoice are sent to the client\'s verified email address within 60 seconds.',
          'Our client concierge desk monitors every order to guarantee priority dispatch allocation.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Принимаемые международные платёжные средства',
        content: [
          'Apple Pay и Google Pay (мгновенная биометрическая оплата в один клик).',
          'Международные банковские карты Visa и Visa Infinite.',
          'Международные банковские карты MasterCard и World Elite.',
          'Премиальные карты American Express (Amex).',
          'PayPal и корпоративные банковские переводы (SWIFT/Wire).',
        ],
      },
      {
        title: '2. Безопасность шлюза и стандарт 3-D Secure 2.0',
        content: [
          'Все онлайн-платежи обрабатываются через шлюзы, сертифицированные по высшему стандарту PCI-DSS Level 1.',
          'Серверы AURA Mobile никогда не сохраняют и не обрабатывают полные номера карт, секретные коды CVV/CVC или PIN-коды.',
          'Каждая транзакция защищена протоколом 3-D Secure 2.0 с биометрическим подтверждением либо одноразовым кодом от банка-эмитента.',
        ],
      },
      {
        title: '3. Валюта расчётов и отсутствие скрытых комиссий',
        content: [
          'Все расчёты производятся в долларах США (USD, $).',
          'Интернет-магазин AURA Mobile не взимает никаких скрытых комиссий за проведение платежей. Конвертация валюты карты осуществляется по тарифу вашего банка.',
        ],
      },
      {
        title: '4. Мгновенное подтверждение и электронный чек',
        content: [
          'После успешного подтверждения транзакции электронный фискальный чек и квитанция заказа направляются на указанный email в течение 60 секунд.',
          'Консьерж-служба оперативно резервирует устройство на логистическом складе для немедленной отправки.',
        ],
      },
    ],
  },

  returns: {
    slug: 'returns',
    titleEn: 'Returns, Replacement & Global Care',
    titleRu: 'Политика возврата и обмена товаров',
    introEn: 'Guidelines on our 14-day hassle-free return policy, device replacements, and authorized warranty service.',
    introRu: 'Регламент возврата и обмена устройств в течение 14 дней, а также условия глобального гарантийного обслуживания AURA Care.',
    sectionsEn: [
      {
        title: '1. 14-Day Return Window for Pristine Devices',
        content: [
          'Customers may request a return or exchange within 14 calendar days of confirmed courier delivery.',
          'To qualify for a full refund, the smartphone must remain completely unused, with unbroken factory tamper seals, intact display protective films, original packaging, and all included certified accessories.',
          'Devices that have been powered on, registered to personal cloud accounts (Apple ID, Google Account), or customized with engraved tags cannot be returned under change-of-mind policies.',
          'Proof of purchase (digital invoice or order identifier) is required to initiate the return merchandise authorization (RMA).',
        ],
      },
      {
        title: '2. Manufacturing Defect & Warranty Replacements',
        content: [
          'In the rare event of a confirmed hardware defect, the device will be inspected by an authorized service partner or replaced immediately with a brand-new unit.',
          'Mechanical impact damage, liquid submersion beyond certified ratings, unauthorized repair attempts, or unofficial operating system firmware modifications void standard warranty eligibility.',
        ],
      },
      {
        title: '3. Fast-Track Refund Processing (3–5 Business Days)',
        content: [
          'Once the returned parcel is received and inspected at our fulfillment hub, the refund is authorized within 24 hours.',
          'Funds are credited strictly back to the original funding card or account (Visa, Mastercard, Amex, Apple Pay) within 3 to 5 banking business days.',
          'For anti-money-laundering (AML) compliance, payouts to unverified third-party bank accounts are strictly prohibited.',
        ],
      },
      {
        title: '4. How to Submit a Return Request',
        content: [
          'Contact the concierge desk at concierge@auramobile.store or submit a return ticket via our online support portal.',
          'Specify your order number, device IMEI / serial number, and a brief description of the request.',
          'Our team will generate a prepaid DHL/FedEx insured return shipping label for convenient courier pickup.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Сроки и условия возврата надлежащего качества (14 дней)',
        content: [
          'Покупатель вправе оформить возврат или обмен смартфона надлежащего качества в течение 14 календарных дней с момента получения заказа.',
          'Возврат возможен только при условии сохранения первозданного товарного вида, целостности заводских пломб, защитных плёнок дисплея, комплекта аксессуаров и коробки.',
          'Устройства со вскрытой заводской упаковкой, активированные или привязанные к персональным учётным записям (Apple ID, Google), возврату по причине изменения решения не подлежат.',
          'Для оформления необходимо предоставить электронный инвойс или номер подтверждённого заказа.',
        ],
      },
      {
        title: '2. Гарантийные случаи и замена при дефектах',
        content: [
          'При выявлении производственного брака устройство подлежит бесплатной диагностике в авторизованном сервисном центре с последующей заменой на новое устройство либо полным возвратом средств.',
          'Механические повреждения, следы попадания влаги и несанкционированное вмешательство в аппаратное или программное обеспечение аннулируют гарантийные обязательства.',
        ],
      },
      {
        title: '3. Сроки и порядок возврата средств (3–5 рабочих дней)',
        content: [
          'После приёма и инспекции возвращённого устройства в логистическом центре возврат средств утверждается в течение 24 часов.',
          'Денежные средства перечисляются исключительно на ту карту или счёт, с которого производилась первоначальная оплата, в срок от 3 до 5 банковских дней.',
          'В целях финансовой безопасности перевод средств третьим лицам или выдача наличными исключены.',
        ],
      },
      {
        title: '4. Порядок подачи заявки на возврат',
        content: [
          'Обратитесь в консьерж-сервис по адресу concierge@auramobile.store или создайте тикет через онлайн-форму поддержки.',
          'Укажите номер заказа, серийный номер (IMEI) и причину возврата.',
          'Служба поддержки предоставит застрахованную накладную для бесплатного забора отправления курьером DHL или FedEx.',
        ],
      },
    ],
  },

  cancellation: {
    slug: 'cancellation',
    titleEn: 'Order Cancellation & Refund Procedure',
    titleRu: 'Политика и регламент отмены заказов',
    introEn: 'Clear instructions for canceling orders prior to dispatch, handling in-transit adjustments, and fast-track payment reversals.',
    introRu: 'Регламент отмены заказов до отправки со склада, порядок действий при доставке и автоматический возврат средств.',
    sectionsEn: [
      {
        title: '1. Right of Cancellation & Real-Time Processing',
        content: [
          'Buyers maintain the right to cancel any order without penalty at any time prior to physical parcel handover to express couriers.',
          'Cancellation requests can be initiated in seconds through our self-service cancellation ticket builder or via direct concierge assistance.',
          'Our dispatch managers operate round-the-clock across all international fulfillment nodes to ensure immediate inventory release.',
        ],
      },
      {
        title: '2. Pre-Dispatch Instant Cancellation (Zero Fees)',
        content: [
          'If your order is currently in processing or warehouse fulfillment, cancellation is processed instantly and free of charge.',
          'The device reservation is lifted immediately, and our gateway triggers an automatic full reversal of the authorized card transaction.',
        ],
      },
      {
        title: '3. In-Transit Parcel Refusal',
        content: [
          'If the shipment has already received an active courier tracking scan, the Buyer may refuse delivery directly upon courier contact.',
          'The package will be returned to our regional hub under full transit insurance. Once logged back into inventory, the purchase amount is reimbursed.',
        ],
      },
      {
        title: '4. Card Refund Timelines (Direct Gateway Reversal)',
        content: [
          'All refunds are credited strictly to the originating card (Visa, Mastercard, Amex, Apple Pay, PayPal).',
          'AURA Mobile releases the payment hold immediately upon cancellation approval.',
          'Depending on your card issuer\'s clearing cycles, the credit reflection takes between 1 and 5 business days.',
        ],
      },
      {
        title: '5. Difference Between Cancellation & Return',
        content: [
          'Cancellation applies before or at the moment of delivery, requiring no diagnostic evaluation.',
          'A Return occurs after taking delivery of the package and is governed by our 14-day return framework.',
        ],
      },
      {
        title: '6. Priority Concierge Channels',
        content: [
          'Global Toll-Free Hotline: +1 (800) 492-AURA (24/7 Priority Support).',
          'Digital Concierge Email: concierge@auramobile.store.',
          'Online Instant Ticket Generator available directly on this page below.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Право на отмену и регламент обработки',
        content: [
          'Покупатель имеет право отменить заказ на любой стадии до фактической передачи посылки в службу международной курьерской доставки.',
          'Заявку на отмену можно подать за считанные секунды с помощью формы формирования тикета ниже либо через службу поддержки.',
          'Отмена заказа осуществляется круглосуточно во всех региональных логистических узлах.',
        ],
      },
      {
        title: '2. Мгновенная отмена до передачи в доставку (Без комиссий)',
        content: [
          'Если заказ находится на комплектации и ещё не покинул распределительный склад, отмена производится мгновенно и без комиссий.',
          'Бронирование товара снимается немедленно, а платёжный шлюз автоматически инициирует полный возврат средств.',
        ],
      },
      {
        title: '3. Отказ от посылки в процессе доставки',
        content: [
          'Если отправление уже передано курьеру, покупатель вправе отказаться от получения при контакте со службой доставки.',
          'Посылка вернётся в региональный центр под полной страховкой, после чего сумма заказа будет возвращена покупателю.',
        ],
      },
      {
        title: '4. Сроки возврата средств на банковскую карту',
        content: [
          'Возврат денежных средств производится строго на исходную платёжную карту (Visa, Mastercard, Amex, Apple Pay).',
          'AURA Mobile отправляет запрос на отмену авторизации в процессинг банка сразу после подтверждения заявки.',
          'Зачисление средств на банковский счёт клиента занимает от 1 до 5 рабочих дней в зависимости от банка-эмитента.',
        ],
      },
      {
        title: '5. Различие между отменой заказа и возвратом товара',
        content: [
          'Отмена заказа происходит до фактического получения товара и не требует технической экспертизы.',
          'Возврат товара осуществляется после приёма посылки и регулируется 14-дневным регламентом возврата.',
        ],
      },
      {
        title: '6. Круглосуточные каналы связи консьерж-сервиса',
        content: [
          'Международная горячая линия: +1 (800) 492-AURA (24/7).',
          'Электронная почта консьерж-сервиса: concierge@auramobile.store.',
          'Интерактивная форма мгновенного формирования заявки на отмену представлена ниже.',
        ],
      },
    ],
  },

  delivery: {
    slug: 'delivery',
    titleEn: 'Worldwide Delivery & Logistics Hubs',
    titleRu: 'Условия и география доставки',
    introEn: 'Fast, secure, and fully insured international express delivery to over 120 countries worldwide.',
    introRu: 'Быстрая, надёжная и полностью застрахованная международная экспресс-доставка в более чем 120 стран мира.',
    sectionsEn: [
      {
        title: '1. Global Dispatch Network',
        content: [
          'Shipments originate from strategically positioned international fulfillment centers in San Francisco, London, Dubai, and Tokyo.',
          'We partner exclusively with tier-1 air express carriers: DHL Express Worldwide, FedEx Priority, and UPS Worldwide Saver.',
          'All consignments travel in armored tamper-evident climate-controlled security packaging with real-time GPS milestone tracking.',
        ],
      },
      {
        title: '2. Express Delivery Timelines',
        content: [
          'North America & United Kingdom: 1 to 2 business days.',
          'European Union, UAE & GCC: 2 to 3 business days.',
          'East Asia, Singapore, Australia: 2 to 4 business days.',
          'Rest of World: 3 to 5 business days with priority customs clearance.',
        ],
      },
      {
        title: '3. Complimentary Insured Shipping',
        content: [
          'All flagship smartphone orders qualify for 100% complimentary priority express delivery.',
          'Every parcel is comprehensively insured against loss, in-transit damage, or customs inspection delays at zero extra expense to the customer.',
        ],
      },
      {
        title: '4. Delivery Handover & Package Inspection',
        content: [
          'Delivery requires a direct recipient signature or verified biometric delivery confirmation.',
          'The recipient is encouraged to visually inspect the external seal before signing. A digital commercial packing slip and warranty documentation are included inside.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Международная сеть доставки',
        content: [
          'Отправка заказов производится из ключевых мировых хабов: Сан-Франциско, Лондон, Дубай и Токио.',
          'Мы сотрудничаем исключительно с ведущими операторами премиальной авиадоставки: DHL Express, FedEx Priority и UPS Saver.',
          'Каждое отправление упаковывается в защищённый сейф-пакет с индивидуальным номерным индикатором вскрытия.',
        ],
      },
      {
        title: '2. Сроки экспресс-доставки',
        content: [
          'Северная Америка и Великобритания: 1–2 рабочих дня.',
          'Страны Европейского Союза и Ближний Восток: 2–3 рабочих дня.',
          'Восточная Азия и Тихоокеанский регион: 2–4 рабочих дня.',
          'Остальные страны мира: 3–5 рабочих дней с приоритетным таможенным оформлением.',
        ],
      },
      {
        title: '3. Бесплатная доставка и 100% страхование',
        content: [
          'Все заказы флагманских смартфонов доставляются абсолютно бесплатно.',
          'Каждая посылка застрахована на полную стоимость от любых повреждений или утери в пути за счёт магазина.',
        ],
      },
      {
        title: '4. Вручение заказа и проверка целостности',
        content: [
          'Вручение заказа производится лично в руки адресату под подпись.',
          'Покупатель имеет возможность убедиться в целостности защитной пломбы до подтверждения получения. Внутри находится полный комплект документов и гарантийный талон AURA Care.',
        ],
      },
    ],
  },

  security: {
    slug: 'security',
    titleEn: 'Payment Security & Data Encryption',
    titleRu: 'Безопасность платежей и защита данных',
    introEn: 'Enterprise-grade encryption, PCI-DSS Level 1 compliance, and 3-D Secure 2.0 authentication safeguarding every interaction.',
    introRu: 'Передовые технологии шифрования, соответствие стандартам PCI-DSS Level 1 и многофакторная аутентификация для защиты каждой транзакции.',
    sectionsEn: [
      {
        title: '1. Transport Layer Security (TLS 1.3 & AES-256)',
        content: [
          'All web traffic between your browser and AURA Mobile is encrypted using TLS 1.3 with AES-256 bit authenticated encryption.',
          'The security padlock indicator confirms your private connection is secured with strict HTTP Strict Transport Security (HSTS).',
        ],
      },
      {
        title: '2. Zero-Retention Card Data Policy (PCI-DSS Level 1)',
        content: [
          'AURA Mobile adheres strictly to a zero-retention architecture for sensitive payment card information.',
          'Card credentials are tokenized directly within the client browser and transmitted straight to banking networks without ever touching or storing on our application servers.',
        ],
      },
      {
        title: '3. 3-D Secure 2.0 & Biometric Verification',
        content: [
          'Transactions utilize EMV 3-D Secure 2.0 protocol (Verified by Visa, Mastercard Identity Check, American Express SafeKey).',
          'Device-bound biometric authentication (Face ID, Touch ID, Windows Hello) offers frictionless security without passwords.',
        ],
      },
      {
        title: '4. Proactive Antifraud Protection',
        content: [
          'Our automated fraud scoring analyzes risk parameters in real time to prevent identity theft and unauthorized transactions.',
          'AURA Mobile representatives will NEVER contact you asking for your full CVV code, online banking password, or one-time OTP token.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Защищённое соединение (TLS 1.3 и AES-256)',
        content: [
          'Весь обмен данными между вашим устройством и AURA Mobile шифруется по протоколу TLS 1.3 с использованием 256-битного ключа AES.',
          'Индикатор защищённого соединения в браузере подтверждает применение политики строгой безопасности HSTS.',
        ],
      },
      {
        title: '2. Политика нулевого хранения данных карт (PCI-DSS)',
        content: [
          'AURA Mobile строго следует политике нулевого хранения конфиденциальных платёжных реквизитов.',
          'Данные карт токенизируются непосредственно в браузере и передаются напрямую в сертифицированный банковский процессинг, минуя серверы магазина.',
        ],
      },
      {
        title: '3. Технология 3-D Secure 2.0 и биометрия',
        content: [
          'Все операции защищены стандартом EMV 3-D Secure 2.0 (Verified by Visa, Mastercard Identity Check, Amex SafeKey).',
          'Поддерживается мгновенная биометрическая авторизация Apple Pay и Google Pay через Face ID / Touch ID.',
        ],
      },
      {
        title: '4. Защита от мошенничества (Antifraud)',
        content: [
          'Интеллектуальная система безопасности в режиме реального времени блокирует любые подозрительные попытки несанкционированного списания.',
          'Сотрудники AURA Mobile НИКОГДА не запрашивают CVV-коды карт, пароли от интернет-банка или одноразовые SMS-коды подтверждения.',
        ],
      },
    ],
  },

  privacy: {
    slug: 'privacy',
    titleEn: 'Privacy Policy & Data Protection',
    titleRu: 'Политика конфиденциальности',
    introEn: 'Our commitment to protecting your personal data in full compliance with GDPR, CCPA, and global data privacy standards.',
    introRu: 'Наши обязательства по защите вашей персональной информации в полном соответствии с регламентами GDPR и мировыми стандартами приватности.',
    sectionsEn: [
      {
        title: '1. Collected Information',
        content: [
          'Essential delivery parameters: recipient full name, shipping destination, and contact telephone number for courier liaison.',
          'Communication data: email address for order notifications, electronic receipts, and tracking telemetry.',
          'Technical diagnostics: anonymized device specifications and browser cookies solely to maintain shopping bag persistence and language preferences.',
        ],
      },
      {
        title: '2. Purpose of Data Processing',
        content: [
          'Facilitating order dispatch, transit tracking, and courier delivery.',
          'Activating complimentary 24-Month AURA Care warranty coverage.',
          'Providing premium client support and fraud prevention.',
        ],
      },
      {
        title: '3. Non-Disclosure & Third-Party Protection',
        content: [
          'AURA Mobile never sells, leases, or trades customer data to third-party advertisers or data brokers.',
          'Logistics details are shared strictly with certified carrier partners (DHL, FedEx) exclusively to complete package delivery.',
        ],
      },
      {
        title: '4. User Rights & Data Deletion',
        content: [
          'In accordance with GDPR and CCPA, customers have the right to request a complete export or immediate erasure of their account records.',
          'To request data retrieval or removal, contact privacy@auramobile.store.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Собираемые данные',
        content: [
          'Необходимые реквизиты для доставки: имя получателя, адрес назначения и контактный телефон для связи с курьером.',
          'Адрес электронной почты для отправки трек-номера, электронных чеков и уведомлений о статусе заказа.',
          'Технические данные: анонимные файлы cookie для сохранения корзины и языковых настроек.',
        ],
      },
      {
        title: '2. Цели обработки информации',
        content: [
          'Организация доставки, отслеживание перемещения посылки и вручение заказа.',
          'Регистрация 24-месячной международной гарантии AURA Care.',
          'Оказание консьерж-поддержки и защита от несанкционированных действий.',
        ],
      },
      {
        title: '3. Защита от передачи третьим лицам',
        content: [
          'AURA Mobile ни при каких обстоятельствах не продаёт и не передаёт личные данные рекламным сетям или маркетинговым агентствам.',
          'Информация о доставке передаётся исключительно сертифицированным курьерским службам (DHL, FedEx) строго в рамках исполнения заказа.',
        ],
      },
      {
        title: '4. Права пользователя и удаление данных',
        content: [
          'В соответствии со стандартами GDPR клиенты имеют право в любой момент запросить выгрузку или полное удаление своих данных.',
          'Для подачи запроса направьте обращение на privacy@auramobile.store.',
        ],
      },
    ],
  },

  support: {
    slug: 'support',
    titleEn: 'Client Concierge & Dispute Resolution',
    titleRu: 'Служба поддержки и рассмотрение обращений',
    introEn: 'Round-the-clock priority assistance, dedicated warranty concierge, and transparent resolution protocols.',
    introRu: 'Круглосуточная премиальная служба заботы о клиентах, гарантийный сервис и регламент оперативного рассмотрения обращений.',
    sectionsEn: [
      {
        title: '1. Dedicated Concierge Channels',
        content: [
          'Global Toll-Free Hotline: +1 (800) 492-AURA (English & Russian assistance 24/7).',
          'UK & Europe Desk: +44 20 7946 0991.',
          'Client Experience Email: concierge@auramobile.store.',
          'Official Concierge Telegram: @auramobile_concierge.',
        ],
      },
      {
        title: '2. Fast Response Timelines',
        content: [
          'Live chat and phone inquiries: Immediate connection under 60 seconds.',
          'Email support tickets: Guaranteed response within 2 hours.',
          'Formal warranty and refund evaluations: Completed within 1 business day.',
        ],
      },
      {
        title: '3. Concierge Resolution Commitment',
        content: [
          'Every customer inquiry is assigned a dedicated personal manager until complete satisfaction is reached.',
          'Our mission is to deliver an unparalleled luxury shopping experience with uncompromising reliability and courtesy.',
        ],
      },
    ],
    sectionsRu: [
      {
        title: '1. Каналы консьерж-сервиса',
        content: [
          'Международная горячая линия: +1 (800) 492-AURA (на русском и английском языках 24/7).',
          'Европейское подразделение (Лондон): +44 20 7946 0991.',
          'Электронная почта консьерж-службы: concierge@auramobile.store.',
          'Telegram консьерж-сервис: @auramobile_concierge.',
        ],
      },
      {
        title: '2. Регламент времени ответа',
        content: [
          'Телефонная линия и горячий чат: соединение с оператором менее чем за 60 секунд.',
          'Электронные обращения: гарантированный ответ в течение 2 часов.',
          'Решение вопросов по гарантии и платежам: в течение 1 рабочего дня.',
        ],
      },
      {
        title: '3. Стандарты обслуживания клиентов',
        content: [
          'Каждому обращению назначается персональный менеджер, контролирующий процесс до полного решения вопроса.',
          'Наш приоритет — предоставление премиального уровня сервиса, безупречная надёжность и персональное внимание к каждому клиенту.',
        ],
      },
    ],
  },
};
