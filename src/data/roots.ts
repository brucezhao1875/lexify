import { RootInfo, WordInfo } from '@/types';

// 常见英语词根数据
export const ROOT_DATABASE: Record<string, RootInfo> = {
  // 教育相关词根
  'educ': {
    root: 'educ',
    meaning: '引导，教育',
    origin: 'latin',
    examples: ['education', 'educate', 'educator', 'educational']
  },
  'duct': {
    root: 'duct',
    meaning: '引导，带领',
    origin: 'latin',
    examples: ['conduct', 'deduct', 'induce', 'produce', 'reduce', 'introduce', 'seduce']
  },
  
  // 建造结构词根
  'struct': {
    root: 'struct',
    meaning: '建造，构造',
    origin: 'latin',
    examples: ['construct', 'structure', 'destruct', 'instruct', 'obstruct', 'infrastructure']
  },
  'tain': {
    root: 'tain',
    meaning: '保持，持有',
    origin: 'latin',
    examples: ['contain', 'maintain', 'retain', 'attain', 'obtain', 'detain', 'sustain']
  },
  'nounce': {
    root: 'nounce',
    meaning: '报告，宣布',
    origin: 'latin',
    examples: ['announce', 'pronounce', 'denounce', 'renounce']
  },
  
  // 视察相关词根
  'spect': {
    root: 'spect',
    meaning: '看，观察',
    origin: 'latin',
    examples: ['inspect', 'respect', 'suspect', 'prospect', 'retrospect', 'aspect', 'perspective', 'spectator']
  },
  'vid': {
    root: 'vid',
    meaning: '看，看见',
    origin: 'latin',
    examples: ['video', 'evidence', 'provide', 'vision', 'visible', 'invisible', 'revise', 'visit']
  },
  'view': {
    root: 'view',
    meaning: '看，景象',
    origin: 'latin',
    examples: ['view', 'review', 'interview', 'preview', 'viewer', 'viewpoint']
  },
  
  // 移动运输词根
  'port': {
    root: 'port',
    meaning: '携带，运输',
    origin: 'latin',
    examples: ['transport', 'import', 'export', 'support', 'report', 'portable', 'portfolio']
  },
  'mov': {
    root: 'mov',
    meaning: '移动',
    origin: 'latin',
    examples: ['move', 'movement', 'movie', 'remove', 'immobile', 'motion']
  },
  'cede': {
    root: 'cede',
    meaning: '行走，前进',
    origin: 'latin',
    examples: ['proceed', 'exceed', 'succeed', 'precede', 'concede', 'recede', 'access']
  },
  
  // 形状形式词根
  'form': {
    root: 'form',
    meaning: '形状，形式',
    origin: 'latin',
    examples: ['transform', 'inform', 'perform', 'reform', 'conform', 'uniform', 'formula', 'platform']
  },
  'shape': {
    root: 'shape',
    meaning: '形状，塑造',
    origin: 'germanic',
    examples: ['shape', 'reshape', 'misshape', 'shapely']
  },
  
  // 投掷相关词根
  'ject': {
    root: 'ject',
    meaning: '投掷，扔',
    origin: 'latin',
    examples: ['project', 'reject', 'inject', 'object', 'subject', 'eject', 'trajectory']
  },
  'hurl': {
    root: 'hurl',
    meaning: '投掷，猛投',
    origin: 'germanic',
    examples: ['hurl', 'uphurl']
  },
  
  // 发送派遣词根
  'mit': {
    root: 'mit',
    meaning: '发送，派遣',
    origin: 'latin',
    examples: ['submit', 'permit', 'commit', 'transmit', 'emit', 'admit', 'dismiss', 'mission']
  },
  'miss': {
    root: 'miss',
    meaning: '发送，派遣',
    origin: 'latin',
    examples: ['mission', 'missile', 'transmission', 'permission', 'admission', 'dismissal']
  },
  
  // 压力相关词根
  'press': {
    root: 'press',
    meaning: '压，按',
    origin: 'latin',
    examples: ['express', 'impress', 'compress', 'depress', 'suppress', 'pressure', 'impression']
  },
  
  // 拉拖词根
  'tract': {
    root: 'tract',
    meaning: '拉，拖',
    origin: 'latin',
    examples: ['attract', 'extract', 'contract', 'distract', 'subtract', 'traction', 'tractor']
  },
  'draw': {
    root: 'draw',
    meaning: '拉，画',
    origin: 'germanic',
    examples: ['draw', 'withdraw', 'drawer', 'drawing', 'drawback']
  },
  
  // 写作词根
  'graph': {
    root: 'graph',
    meaning: '写，画',
    origin: 'greek',
    examples: ['paragraph', 'photograph', 'autograph', 'biography', 'geography', 'telegraph']
  },
  'scrib': {
    root: 'scrib',
    meaning: '写',
    origin: 'latin',
    examples: ['describe', 'inscribe', 'subscribe', 'prescribe', 'transcribe', 'script']
  },
  
  // 言语词根
  'dict': {
    root: 'dict',
    meaning: '说，讲',
    origin: 'latin',
    examples: ['dictionary', 'predict', 'contradict', 'dictate', 'verdict', 'dedicate']
  },
  'log': {
    root: 'log',
    meaning: '言语，说话',
    origin: 'greek',
    examples: ['dialogue', 'monologue', 'prologue', 'epilogue', 'logic', 'apology']
  },
  
  // 水流词根
  'aqua': {
    root: 'aqua',
    meaning: '水',
    origin: 'latin',
    examples: ['aquarium', 'aquatic', 'aquarium', 'aqueduct', 'aqualung']
  },
  'hydro': {
    root: 'hydro',
    meaning: '水',
    origin: 'greek',
    examples: ['hydrogen', 'hydroelectric', 'hydrophonic', 'dehydrate', 'hydrate']
  },
  
  // 土地词根
  'terra': {
    root: 'terra',
    meaning: '土地，地球',
    origin: 'latin',
    examples: ['territory', 'terrestrial', 'terrain', 'Mediterranean', 'subterranean']
  },
  'geo': {
    root: 'geo',
    meaning: '土地，地球',
    origin: 'greek',
    examples: ['geography', 'geology', 'geometry', 'geopolitical', 'geothermal']
  },
  
  // 生命生物词根
  'bio': {
    root: 'bio',
    meaning: '生命，生物',
    origin: 'greek',
    examples: ['biology', 'biography', 'biodegradable', 'biography', 'symbiotic']
  },
  'vita': {
    root: 'vita',
    meaning: '生命',
    origin: 'latin',
    examples: ['vital', 'vitamin', 'vitality', 'revitalize', 'survival']
  },
  
  // 时间词根
  'chrono': {
    root: 'chrono',
    meaning: '时间',
    origin: 'greek',
    examples: ['chronology', 'chronological', 'synchronize', 'anachronism']
  },
  'temp': {
    root: 'temp',
    meaning: '时间',
    origin: 'latin',
    examples: ['temporary', 'contemporary', 'temporal', 'temptation']
  },
  
  // 力量能力词根
  'dyn': {
    root: 'dyn',
    meaning: '力量，能力',
    origin: 'greek',
    examples: ['dynamic', 'dynamite', 'dynasty', 'aerodynamic']
  },
  'potent': {
    root: 'potent',
    meaning: '力量，能力',
    origin: 'latin',
    examples: ['potential', 'potent', 'impotent', 'omnipotent']
  },
  
  // 心灵精神词根
  'psych': {
    root: 'psych',
    meaning: '心灵，精神',
    origin: 'greek',
    examples: ['psychology', 'psychiatry', 'psychic', 'psychoanalysis']
  },
  'ment': {
    root: 'ment',
    meaning: '心智，思考',
    origin: 'latin',
    examples: ['mental', 'mention', 'comment', 'dement', 'mentor']
  },
  
  // 社会人群词根
  'soci': {
    root: 'soci',
    meaning: '社会，同伴',
    origin: 'latin',
    examples: ['social', 'society', 'sociology', 'associate', 'consociate']
  },
  'demo': {
    root: 'demo',
    meaning: '人民',
    origin: 'greek',
    examples: ['democracy', 'demographic', 'epidemic', 'pandemic']
  }
};

// 单词数据库
export const WORD_DATABASE: Record<string, WordInfo> = {
  // 教育相关词汇
  'education': {
    word: 'education',
    meaning: '教育',
    level: 'cet4',
    roots: ['educ'],
    relatedWords: ['educate', 'educator', 'educational', 'deduce'],
    examples: [
      { sentence: "Education is the key to success in modern society.", translation: "教育是现代社会的成功之道。", source: "common" },
      { sentence: "She pursued her higher education at a prestigious university.", translation: "她在一所著名大学接受高等教育。", source: "academic" },
      { sentence: "The government invested heavily in public education.", translation: "政府在公共教育上投入巨资。", source: "policy" }
    ]
  },
  'educate': {
    word: 'educate',
    meaning: '教育，培养',
    level: 'cet4',
    roots: ['educ'],
    relatedWords: ['education', 'educator', 'educational', 'deduce'],
    examples: [
      { sentence: "Parents should educate their children about the importance of honesty.", translation: "父母应该教育孩子诚实的重要性。", source: "parenting" },
      { sentence: "The campaign aims to educate people about environmental protection.", translation: "这项运动旨在教育人们保护环境。", source: "campaign" },
      { sentence: "We need to educate consumers about their rights.", translation: "我们需要教育消费者了解他们的权利。", source: "consumer" }
    ]
  },
  'educator': {
    word: 'educator',
    meaning: '教育工作者',
    level: 'cet6',
    roots: ['educ'],
    relatedWords: ['education', 'educate', 'educational', 'deduce'],
    examples: [
      { sentence: "She is a dedicated educator who has inspired many students.", translation: "她是一位敬业的教师，激励了许多学生。", source: "education" },
      { sentence: "Great educators not only teach knowledge but also shape character.", translation: "优秀的教育工作者不仅传授知识，还塑造品格。", source: "philosophy" }
    ]
  },
  'deduce': {
    word: 'deduce',
    meaning: '推断，演绎',
    level: 'cet6',
    roots: ['duct'],
    relatedWords: ['deduction', 'induce', 'reduce', 'conduct'],
    examples: [
      { sentence: "From the evidence, we can deduce that the suspect was at the crime scene.", translation: "从证据中，我们可以推断嫌疑人在犯罪现场。", source: "detective" },
      { sentence: "Scientists deduce the age of fossils through careful analysis.", translation: "科学家通过仔细分析推断化石的年代。", source: "science" }
    ]
  },
  'conduct': {
    word: 'conduct',
    meaning: '引导，指挥，行为',
    level: 'cet4',
    roots: ['duct'],
    relatedWords: ['conductor', 'deduce', 'induce', 'produce'],
    examples: [
      { sentence: "The orchestra will conduct a performance tonight.", translation: "管弦乐队今晚将进行一场演出。", source: "music" },
      { sentence: "Scientists conduct experiments to test their hypotheses.", translation: "科学家进行实验来检验他们的假设。", source: "science" },
      { sentence: "Professional conduct is essential in the workplace.", translation: "职业行为在工作场所至关重要。", source: "business" }
    ]
  },
  'induce': {
    word: 'induce',
    meaning: '引起，诱导',
    level: 'cet6',
    roots: ['duct'],
    relatedWords: ['induction', 'deduce', 'conduct', 'produce'],
    examples: [
      { sentence: "Certain medications can induce drowsiness.", translation: "某些药物会引起困倦。", source: "medical" },
      { sentence: "The company offered bonuses to induce higher productivity.", translation: "公司提供奖金以促进更高的生产力。", source: "business" }
    ]
  },
  'produce': {
    word: 'produce',
    meaning: '生产，产品',
    level: 'cet4',
    roots: ['duct'],
    relatedWords: ['product', 'production', 'deduce', 'conduct']
  },
  'introduce': {
    word: 'introduce',
    meaning: '介绍，引入',
    level: 'cet4',
    roots: ['duce'],
    relatedWords: ['introduction', 'deduce', 'conduct', 'produce']
  },
  
  // 建造结构词汇
  'construct': {
    word: 'construct',
    meaning: '建造，构造',
    level: 'cet6',
    roots: ['struct'],
    relatedWords: ['construction', 'structure', 'destruct', 'instruct'],
    examples: [
      { sentence: "They plan to construct a new bridge across the river.", translation: "他们计划在河上建造一座新桥。", source: "engineering" },
      { sentence: "It takes years to construct a successful business.", translation: "建立一个成功的企业需要数年时间。", source: "business" },
      { sentence: "The children learned to construct sentences with proper grammar.", translation: "孩子们学习用正确的语法构造句子。", source: "education" }
    ]
  },
  'structure': {
    word: 'structure',
    meaning: '结构，构造',
    level: 'cet4',
    roots: ['struct'],
    relatedWords: ['construction', 'construct', 'destruct', 'instruct'],
    examples: [
      { sentence: "The structure of the building was designed to withstand earthquakes.", translation: "这座建筑的结构被设计用来抵御地震。", source: "architecture" },
      { sentence: "Scientists are studying the molecular structure of the new compound.", translation: "科学家们正在研究这种新化合物的分子结构。", source: "science" },
      { sentence: "The essay has a clear structure: introduction, body, and conclusion.", translation: "这篇论文结构清晰：引言、正文和结论。", source: "academic" }
    ]
  },
  'destruct': {
    word: 'destruct',
    meaning: '破坏',
    level: 'gre',
    roots: ['struct'],
    relatedWords: ['destruction', 'construct', 'structure', 'instruct']
  },
  'instruct': {
    word: 'instruct',
    meaning: '指导，命令',
    level: 'cet6',
    roots: ['struct'],
    relatedWords: ['instruction', 'construct', 'structure', 'destruct']
  },
  'infrastructure': {
    word: 'infrastructure',
    meaning: '基础设施',
    level: 'ielts',
    roots: ['struct'],
    relatedWords: ['structure', 'construct', 'construction']
  },
  'contain': {
    word: 'contain',
    meaning: '包含，容纳',
    level: 'cet4',
    roots: ['tain'],
    relatedWords: ['container', 'maintain', 'retain', 'attain'],
    examples: [
      { sentence: "This book contains valuable information about ancient history.", translation: "这本书包含了关于古代历史的宝贵信息。", source: "education" },
      { sentence: "The container cannot contain any more liquid.", translation: "这个容器不能再装更多液体了。", source: "daily" },
      { sentence: "Please ensure your luggage does not contain any prohibited items.", translation: "请确保您的行李不包含任何违禁物品。", source: "travel" }
    ]
  },
  'maintain': {
    word: 'maintain',
    meaning: '维持，保养',
    level: 'cet4',
    roots: ['tain'],
    relatedWords: ['maintenance', 'contain', 'retain', 'attain'],
    examples: [
      { sentence: "You should maintain your car regularly to ensure safety.", translation: "你应该定期保养你的汽车以确保安全。", source: "automotive" },
      { sentence: "It's important to maintain good relationships with colleagues.", translation: "与同事保持良好关系很重要。", source: "workplace" },
      { sentence: "The company has maintained its market leadership for decades.", translation: "这家公司几十年来一直保持其市场领导地位。", source: "business" }
    ]
  },
  'retain': {
    word: 'retain',
    meaning: '保留，保持',
    level: 'cet6',
    roots: ['tain'],
    relatedWords: ['retention', 'contain', 'maintain', 'attain']
  },
  'attain': {
    word: 'attain',
    meaning: '达到，获得',
    level: 'cet6',
    roots: ['tain'],
    relatedWords: ['attainment', 'contain', 'maintain', 'retain']
  },
  'obtain': {
    word: 'obtain',
    meaning: '获得，得到',
    level: 'cet4',
    roots: ['tain'],
    relatedWords: ['obtainable', 'contain', 'maintain', 'retain']
  },
  
  // 视察相关词汇
  'inspect': {
    word: 'inspect',
    meaning: '检查，视察',
    level: 'cet6',
    roots: ['spect'],
    relatedWords: ['inspection', 'respect', 'suspect', 'prospect']
  },
  'respect': {
    word: 'respect',
    meaning: '尊重，方面',
    level: 'cet4',
    roots: ['spect'],
    relatedWords: ['respectful', 'inspect', 'suspect', 'prospect']
  },
  'suspect': {
    word: 'suspect',
    meaning: '怀疑，嫌疑犯',
    level: 'cet4',
    roots: ['spect'],
    relatedWords: ['suspicion', 'inspect', 'respect', 'prospect']
  },
  'prospect': {
    word: 'prospect',
    meaning: '前景，展望',
    level: 'cet6',
    roots: ['spect'],
    relatedWords: ['prospective', 'inspect', 'respect', 'suspect']
  },
  'aspect': {
    word: 'aspect',
    meaning: '方面，方位',
    level: 'cet4',
    roots: ['spect'],
    relatedWords: ['spectator', 'inspect', 'respect', 'prospect']
  },
  'perspective': {
    word: 'perspective',
    meaning: '观点，透视法',
    level: 'toefl',
    roots: ['spect'],
    relatedWords: ['aspect', 'inspect', 'respect', 'prospect']
  },
  'spectator': {
    word: 'spectator',
    meaning: '观众，旁观者',
    level: 'toefl',
    roots: ['spect'],
    relatedWords: ['spectacle', 'inspect', 'respect', 'aspect']
  },
  'vision': {
    word: 'vision',
    meaning: '视力，视野，幻想',
    level: 'cet4',
    roots: ['vid'],
    relatedWords: ['visual', 'visible', 'invisible', 'provide']
  },
  'visible': {
    word: 'visible',
    meaning: '可见的',
    level: 'cet4',
    roots: ['vid'],
    relatedWords: ['invisible', 'vision', 'visual', 'provide'],
    examples: [
      { sentence: "The stars were visible in the clear night sky.", translation: "在晴朗的夜空中可以看到星星。", source: "nature" },
      { sentence: "The damage to the building was clearly visible.", translation: "建筑物的损坏清晰可见。", source: "construction" },
      { sentence: "These microscopic organisms are not visible to the naked eye.", translation: "这些微生物是肉眼看不见的。", source: "science" }
    ]
  },
  'invisible': {
    word: 'invisible',
    meaning: '不可见的',
    level: 'cet4',
    roots: ['vid'],
    relatedWords: ['visible', 'vision', 'visual', 'provide']
  },
  'provide': {
    word: 'provide',
    meaning: '提供，供应',
    level: 'cet4',
    roots: ['vid'],
    relatedWords: ['provision', 'vision', 'visible', 'invisible']
  },
  'evidence': {
    word: 'evidence',
    meaning: '证据，证明',
    level: 'cet4',
    roots: ['vid'],
    relatedWords: ['evident', 'vision', 'visible', 'provide']
  },
  'review': {
    word: 'review',
    meaning: '复习，回顾，评论',
    level: 'cet4',
    roots: ['view'],
    relatedWords: ['preview', 'interview', 'viewpoint', 'viewer']
  },
  'interview': {
    word: 'interview',
    meaning: '面试，采访',
    level: 'cet4',
    roots: ['view'],
    relatedWords: ['reviewer', 'preview', 'viewpoint', 'viewer']
  },
  
  // 移动运输词汇
  'transport': {
    word: 'transport',
    meaning: '运输，运送',
    level: 'cet4',
    roots: ['port'],
    relatedWords: ['transportation', 'import', 'export', 'support']
  },
  'import': {
    word: 'import',
    meaning: '进口，输入',
    level: 'cet4',
    roots: ['port'],
    relatedWords: ['importance', 'transport', 'export', 'support']
  },
  'export': {
    word: 'export',
    meaning: '出口，输出',
    level: 'cet4',
    roots: ['port'],
    relatedWords: ['transport', 'import', 'support', 'portable']
  },
  'support': {
    word: 'support',
    meaning: '支持，支撑',
    level: 'cet4',
    roots: ['port'],
    relatedWords: ['supportive', 'transport', 'import', 'export']
  },
  'portable': {
    word: 'portable',
    meaning: '便携的，手提的',
    level: 'cet6',
    roots: ['port'],
    relatedWords: ['portability', 'transport', 'import', 'export']
  },
  'move': {
    word: 'move',
    meaning: '移动，感动',
    level: 'cet4',
    roots: ['mov'],
    relatedWords: ['movement', 'remove', 'motion', 'movie']
  },
  'movement': {
    word: 'movement',
    meaning: '运动，活动',
    level: 'cet4',
    roots: ['mov'],
    relatedWords: ['move', 'remove', 'motion', 'movie']
  },
  'remove': {
    word: 'remove',
    meaning: '移除，开除',
    level: 'cet4',
    roots: ['mov'],
    relatedWords: ['removal', 'move', 'movement', 'motion']
  },
  'motion': {
    word: 'motion',
    meaning: '运动，动作',
    level: 'cet6',
    roots: ['mov'],
    relatedWords: ['move', 'movement', 'remove', 'emotion']
  },
  'proceed': {
    word: 'proceed',
    meaning: '继续进行',
    level: 'cet6',
    roots: ['cede'],
    relatedWords: ['procedure', 'exceed', 'succeed', 'precede']
  },
  'exceed': {
    word: 'exceed',
    meaning: '超过，超越',
    level: 'cet6',
    roots: ['cede'],
    relatedWords: ['excessive', 'proceed', 'succeed', 'precede']
  },
  'succeed': {
    word: 'succeed',
    meaning: '成功，继承',
    level: 'cet4',
    roots: ['cede'],
    relatedWords: ['success', 'proceed', 'exceed', 'precede']
  },
  'access': {
    word: 'access',
    meaning: '通道，访问，接近',
    level: 'cet4',
    roots: ['cede'],
    relatedWords: ['accessible', 'proceed', 'exceed', 'succeed']
  },
  
  // 形状形式词汇
  'transform': {
    word: 'transform',
    meaning: '改变，转换',
    level: 'cet6',
    roots: ['form'],
    relatedWords: ['transformation', 'inform', 'perform', 'reform']
  },
  'inform': {
    word: 'inform',
    meaning: '通知，告知',
    level: 'cet4',
    roots: ['form'],
    relatedWords: ['information', 'transform', 'perform', 'reform']
  },
  'perform': {
    word: 'perform',
    meaning: '表演，执行',
    level: 'cet4',
    roots: ['form'],
    relatedWords: ['performance', 'transform', 'inform', 'reform']
  },
  'reform': {
    word: 'reform',
    meaning: '改革，改造',
    level: 'cet6',
    roots: ['form'],
    relatedWords: ['reformation', 'transform', 'inform', 'perform']
  },
  'uniform': {
    word: 'uniform',
    meaning: '制服，统一的',
    level: 'cet4',
    roots: ['form'],
    relatedWords: ['uniformity', 'transform', 'inform', 'perform']
  },
  'formula': {
    word: 'formula',
    meaning: '公式，方案',
    level: 'cet4',
    roots: ['form'],
    relatedWords: ['formulate', 'transform', 'inform', 'perform']
  },
  
  // 投掷相关词汇
  'project': {
    word: 'project',
    meaning: '项目，计划，投射',
    level: 'cet4',
    roots: ['ject'],
    relatedWords: ['projection', 'reject', 'inject', 'object']
  },
  'reject': {
    word: 'reject',
    meaning: '拒绝，驳回',
    level: 'cet4',
    roots: ['ject'],
    relatedWords: ['rejection', 'project', 'inject', 'object']
  },
  'inject': {
    word: 'inject',
    meaning: '注射，注入',
    level: 'cet6',
    roots: ['ject'],
    relatedWords: ['injection', 'project', 'reject', 'object']
  },
  'object': {
    word: 'object',
    meaning: '物体，对象，反对',
    level: 'cet4',
    roots: ['ject'],
    relatedWords: ['objection', 'project', 'reject', 'inject']
  },
  'subject': {
    word: 'subject',
    meaning: '主题，科目，服从',
    level: 'cet4',
    roots: ['ject'],
    relatedWords: ['subjective', 'project', 'reject', 'inject']
  },
  'eject': {
    word: 'eject',
    meaning: '逐出，弹出',
    level: 'toefl',
    roots: ['ject'],
    relatedWords: ['ejection', 'project', 'reject', 'inject']
  },
  
  // 发送派遣词汇
  'submit': {
    word: 'submit',
    meaning: '提交，屈服',
    level: 'cet6',
    roots: ['mit'],
    relatedWords: ['submission', 'permit', 'commit', 'transmit']
  },
  'permit': {
    word: 'permit',
    meaning: '允许，许可证',
    level: 'cet4',
    roots: ['mit'],
    relatedWords: ['permission', 'submit', 'commit', 'transmit']
  },
  'commit': {
    word: 'commit',
    meaning: '犯罪，承诺，委托',
    level: 'cet6',
    roots: ['mit'],
    relatedWords: ['commitment', 'submit', 'permit', 'transmit']
  },
  'transmit': {
    word: 'transmit',
    meaning: '传输，传播',
    level: 'toefl',
    roots: ['mit'],
    relatedWords: ['transmission', 'submit', 'permit', 'commit']
  },
  'emit': {
    word: 'emit',
    meaning: '发出，发射',
    level: 'toefl',
    roots: ['mit'],
    relatedWords: ['emission', 'submit', 'permit', 'commit']
  },
  'admit': {
    word: 'admit',
    meaning: '承认，准许进入',
    level: 'cet4',
    roots: ['mit'],
    relatedWords: ['admission', 'submit', 'permit', 'commit']
  },
  'dismiss': {
    word: 'dismiss',
    meaning: '解散，解雇，驳回',
    level: 'cet6',
    roots: ['miss'],
    relatedWords: ['dismissal', 'mission', 'transmission', 'permission']
  },
  'mission': {
    word: 'mission',
    meaning: '任务，使命，代表团',
    level: 'cet4',
    roots: ['miss'],
    relatedWords: ['missionary', 'dismiss', 'transmission', 'permission']
  },
  'missile': {
    word: 'missile',
    meaning: '导弹',
    level: 'toefl',
    roots: ['miss'],
    relatedWords: ['mission', 'dismiss', 'transmission', 'permission']
  },
  
  // 压力相关词汇
  'express': {
    word: 'express',
    meaning: '表达，快递',
    level: 'cet4',
    roots: ['press'],
    relatedWords: ['expression', 'impress', 'compress', 'depress']
  },
  'impress': {
    word: 'impress',
    meaning: '留下印象，压印',
    level: 'cet4',
    roots: ['press'],
    relatedWords: ['impression', 'express', 'compress', 'depress']
  },
  'compress': {
    word: 'compress',
    meaning: '压缩，精简',
    level: 'cet6',
    roots: ['press'],
    relatedWords: ['compression', 'express', 'impress', 'depress']
  },
  'depress': {
    word: 'depress',
    meaning: '使沮丧，压下',
    level: 'cet6',
    roots: ['press'],
    relatedWords: ['depression', 'express', 'impress', 'compress']
  },
  'suppress': {
    word: 'suppress',
    meaning: '压制，抑制',
    level: 'toefl',
    roots: ['press'],
    relatedWords: ['suppression', 'express', 'impress', 'compress']
  },
  'pressure': {
    word: 'pressure',
    meaning: '压力，压强',
    level: 'cet4',
    roots: ['press'],
    relatedWords: ['express', 'impress', 'compress', 'depress']
  },
  
  // 拖拉词汇
  'attract': {
    word: 'attract',
    meaning: '吸引',
    level: 'cet4',
    roots: ['tract'],
    relatedWords: ['attraction', 'extract', 'contract', 'distract']
  },
  'extract': {
    word: 'extract',
    meaning: '提取，拔出',
    level: 'cet6',
    roots: ['tract'],
    relatedWords: ['extraction', 'attract', 'contract', 'distract']
  },
  'contract': {
    word: 'contract',
    meaning: '合同，收缩，感染',
    level: 'cet4',
    roots: ['tract'],
    relatedWords: ['contraction', 'attract', 'extract', 'distract']
  },
  'distract': {
    word: 'distract',
    meaning: '使分心，分散注意力',
    level: 'cet6',
    roots: ['tract'],
    relatedWords: ['distraction', 'attract', 'extract', 'contract']
  },
  'subtract': {
    word: 'subtract',
    meaning: '减去，扣除',
    level: 'cet4',
    roots: ['tract'],
    relatedWords: ['subtraction', 'attract', 'extract', 'contract']
  },
  'traction': {
    word: 'traction',
    meaning: '牵引，拉力',
    level: 'toefl',
    roots: ['tract'],
    relatedWords: ['attract', 'extract', 'contract', 'distract']
  },
  'withdraw': {
    word: 'withdraw',
    meaning: '撤回，取款，退出',
    level: 'cet4',
    roots: ['draw'],
    relatedWords: ['withdrawal', 'draw', 'drawing', 'drawback']
  },
  'drawing': {
    word: 'drawing',
    meaning: '绘画，图画',
    level: 'cet4',
    roots: ['draw'],
    relatedWords: ['draw', 'withdraw', 'drawer', 'drawback']
  },
  
  // 写作词汇
  'paragraph': {
    word: 'paragraph',
    meaning: '段落',
    level: 'cet4',
    roots: ['graph'],
    relatedWords: ['photograph', 'autograph', 'biography', 'geography']
  },
  'photograph': {
    word: 'photograph',
    meaning: '照片',
    level: 'cet4',
    roots: ['graph'],
    relatedWords: ['photography', 'paragraph', 'autograph', 'biography']
  },
  'autograph': {
    word: 'autograph',
    meaning: '亲笔签名',
    level: 'cet6',
    roots: ['graph'],
    relatedWords: ['paragraph', 'photograph', 'biography', 'geography']
  },
  'biography': {
    word: 'biography',
    meaning: '传记',
    level: 'cet6',
    roots: ['graph', 'bio'],
    relatedWords: ['biographical', 'paragraph', 'photograph', 'autograph']
  },
  'geography': {
    word: 'geography',
    meaning: '地理学',
    level: 'cet4',
    roots: ['graph', 'geo'],
    relatedWords: ['geographical', 'paragraph', 'photograph', 'autograph']
  },
  'describe': {
    word: 'describe',
    meaning: '描述，描绘',
    level: 'cet4',
    roots: ['scrib'],
    relatedWords: ['description', 'inscribe', 'subscribe', 'prescribe']
  },
  'inscribe': {
    word: 'inscribe',
    meaning: '题写，铭刻',
    level: 'toefl',
    roots: ['scrib'],
    relatedWords: ['inscription', 'describe', 'subscribe', 'prescribe']
  },
  'subscribe': {
    word: 'subscribe',
    meaning: '订阅，签署，同意',
    level: 'cet6',
    roots: ['scrib'],
    relatedWords: ['subscription', 'describe', 'inscribe', 'prescribe']
  },
  'prescribe': {
    word: 'prescribe',
    meaning: '规定，开处方',
    level: 'toefl',
    roots: ['scrib'],
    relatedWords: ['prescription', 'describe', 'inscribe', 'subscribe']
  },
  'script': {
    word: 'script',
    meaning: '脚本，手稿',
    level: 'cet6',
    roots: ['scrib'],
    relatedWords: ['describe', 'inscribe', 'subscribe', 'prescribe']
  },
  
  // 言语词汇
  'dictionary': {
    word: 'dictionary',
    meaning: '词典',
    level: 'cet4',
    roots: ['dict'],
    relatedWords: ['predict', 'contradict', 'dictate', 'verdict']
  },
  'predict': {
    word: 'predict',
    meaning: '预测，预言',
    level: 'cet4',
    roots: ['dict'],
    relatedWords: ['prediction', 'dictionary', 'contradict', 'dictate']
  },
  'contradict': {
    word: 'contradict',
    meaning: '反驳，矛盾',
    level: 'toefl',
    roots: ['dict'],
    relatedWords: ['contradiction', 'dictionary', 'predict', 'dictate']
  },
  'dictate': {
    word: 'dictate',
    meaning: '口述，命令',
    level: 'cet6',
    roots: ['dict'],
    relatedWords: ['dictation', 'dictionary', 'predict', 'contradict']
  },
  'verdict': {
    word: 'verdict',
    meaning: '裁决，判决',
    level: 'toefl',
    roots: ['dict'],
    relatedWords: ['dictionary', 'predict', 'contradict', 'dictate']
  },
  'dialogue': {
    word: 'dialogue',
    meaning: '对话',
    level: 'cet4',
    roots: ['log'],
    relatedWords: ['monologue', 'prologue', 'epilogue', 'logic']
  },
  'logic': {
    word: 'logic',
    meaning: '逻辑，逻辑学',
    level: 'cet4',
    roots: ['log'],
    relatedWords: ['logical', 'dialogue', 'monologue', 'prologue']
  },
  'apology': {
    word: 'apology',
    meaning: '道歉',
    level: 'cet4',
    roots: ['log'],
    relatedWords: ['apologize', 'dialogue', 'monologue', 'logic']
  },
  
  // 水流词汇
  'aquarium': {
    word: 'aquarium',
    meaning: '水族馆',
    level: 'cet6',
    roots: ['aqua'],
    relatedWords: ['aquatic', 'aqueduct', 'aqualung', 'aquamarine']
  },
  'aquatic': {
    word: 'aquatic',
    meaning: '水生的，水上的',
    level: 'toefl',
    roots: ['aqua'],
    relatedWords: ['aquarium', 'aqueduct', 'aqualung', 'aquamarine']
  },
  'hydrogen': {
    word: 'hydrogen',
    meaning: '氢',
    level: 'cet6',
    roots: ['hydro'],
    relatedWords: ['hydroelectric', 'hydrate', 'dehydrate', 'hydropower']
  },
  'hydrate': {
    word: 'hydrate',
    meaning: '水合物，使水合',
    level: 'toefl',
    roots: ['hydro'],
    relatedWords: ['hydration', 'hydrogen', 'dehydrate', 'hydropower']
  },
  'dehydrate': {
    word: 'dehydrate',
    meaning: '脱水',
    level: 'toefl',
    roots: ['hydro'],
    relatedWords: ['dehydration', 'hydrogen', 'hydrate', 'hydropower']
  },
  
  // 土地词汇
  'territory': {
    word: 'territory',
    meaning: '领土，领域',
    level: 'cet4',
    roots: ['terra'],
    relatedWords: ['territorial', 'terrain', 'terrestrial', 'Mediterranean']
  },
  'terrain': {
    word: 'terrain',
    meaning: '地形，地势',
    level: 'toefl',
    roots: ['terra'],
    relatedWords: ['territory', 'terrestrial', 'Mediterranean', 'subterranean']
  },
  'geology': {
    word: 'geology',
    meaning: '地质学',
    level: 'toefl',
    roots: ['geo'],
    relatedWords: ['geological', 'geography', 'geometry', 'geopolitical']
  },
  'geometry': {
    word: 'geometry',
    meaning: '几何学',
    level: 'cet6',
    roots: ['geo'],
    relatedWords: ['geometrical', 'geography', 'geology', 'geopolitical']
  },
  
  // 生命词汇
  'biology': {
    word: 'biology',
    meaning: '生物学',
    level: 'cet4',
    roots: ['bio'],
    relatedWords: ['biological', 'biography', 'biodegradable', 'symbiotic']
  },
  'vital': {
    word: 'vital',
    meaning: '至关重要的，生命的',
    level: 'cet4',
    roots: ['vita'],
    relatedWords: ['vitality', 'vitamin', 'revitalize', 'survival']
  },
  'vitamin': {
    word: 'vitamin',
    meaning: '维生素',
    level: 'cet4',
    roots: ['vita'],
    relatedWords: ['vital', 'vitality', 'revitalize', 'survival']
  },
  'survival': {
    word: 'survival',
    meaning: '生存，幸存',
    level: 'cet4',
    roots: ['vita'],
    relatedWords: ['survive', 'vital', 'vitamin', 'vitality']
  },
  
  // 时间词汇
  'chronology': {
    word: 'chronology',
    meaning: '年表，年代学',
    level: 'gre',
    roots: ['chrono'],
    relatedWords: ['chronological', 'synchronize', 'anachronism']
  },
  'synchronize': {
    word: 'synchronize',
    meaning: '同步',
    level: 'toefl',
    roots: ['chrono'],
    relatedWords: ['synchronization', 'chronology', 'anachronism']
  },
  'temporary': {
    word: 'temporary',
    meaning: '暂时的，临时的',
    level: 'cet4',
    roots: ['temp'],
    relatedWords: ['temporarily', 'contemporary', 'temporal']
  },
  'contemporary': {
    word: 'contemporary',
    meaning: '当代的，同龄人',
    level: 'cet6',
    roots: ['temp'],
    relatedWords: ['temporary', 'temporal', 'temptation']
  },
  
  // 力量能力词汇
  'dynamic': {
    word: 'dynamic',
    meaning: '动态的，有活力的',
    level: 'cet6',
    roots: ['dyn'],
    relatedWords: ['dynamics', 'dynamite', 'aerodynamic']
  },
  'potential': {
    word: 'potential',
    meaning: '潜力，可能的',
    level: 'cet4',
    roots: ['potent'],
    relatedWords: ['potentially', 'potent', 'impotent']
  },
  'potent': {
    word: 'potent',
    meaning: '有效的，强有力的',
    level: 'toefl',
    roots: ['potent'],
    relatedWords: ['potentate', 'potential', 'impotent']
  },
  
  // 心灵精神词汇
  'psychology': {
    word: 'psychology',
    meaning: '心理学',
    level: 'cet4',
    roots: ['psych'],
    relatedWords: ['psychological', 'psychiatry', 'psychic'],
    examples: [
      { sentence: "Psychology is the scientific study of the mind and behavior.", translation: "心理学是对心理和行为的科学研究。", source: "academic" },
      { sentence: "She is studying psychology at university to understand human behavior better.", translation: "她在大学学习心理学，以便更好地理解人类行为。", source: "education" }
    ]
  },
  'psychiatry': {
    word: 'psychiatry',
    meaning: '精神病学',
    level: 'toefl',
    roots: ['psych'],
    relatedWords: ['psychiatrist', 'psychology', 'psychic']
  },
  'mental': {
    word: 'mental',
    meaning: '精神的，智力的',
    level: 'cet4',
    roots: ['ment'],
    relatedWords: ['mentally', 'mention', 'comment', 'mentor']
  },
  'mentor': {
    word: 'mentor',
    meaning: '导师，指导者',
    level: 'toefl',
    roots: ['ment'],
    relatedWords: ['mentorship', 'mental', 'mention', 'comment']
  },
  
  // 社会人群词汇
  'social': {
    word: 'social',
    meaning: '社会的，社交的',
    level: 'cet4',
    roots: ['soci'],
    relatedWords: ['society', 'sociology', 'associate']
  },
  'society': {
    word: 'society',
    meaning: '社会，社团',
    level: 'cet4',
    roots: ['soci'],
    relatedWords: ['social', 'sociology', 'associate']
  },
  'associate': {
    word: 'associate',
    meaning: '联系，伙伴',
    level: 'cet4',
    roots: ['soci'],
    relatedWords: ['association', 'social', 'society']
  },
  'democracy': {
    word: 'democracy',
    meaning: '民主，民主制度',
    level: 'cet4',
    roots: ['demo'],
    relatedWords: ['democratic', 'demographic', 'epidemic']
  },
  'demographic': {
    word: 'demographic',
    meaning: '人口统计的',
    level: 'toefl',
    roots: ['demo'],
    relatedWords: ['demographics', 'democracy', 'epidemic']
  },
  'epidemic': {
    word: 'epidemic',
    meaning: '流行病，流行的',
    level: 'toefl',
    roots: ['demo'],
    relatedWords: ['epidemiology', 'democracy', 'pandemic']
  }
};

// 词根分析函数
export function analyzeWordRoots(word: string): string[] {
  const normalizedWord = word.toLowerCase();
  const foundRoots: string[] = [];
  
  // 遍历所有词根，查找匹配
  for (const [root] of Object.entries(ROOT_DATABASE)) {
    if (normalizedWord.includes(root)) {
      foundRoots.push(root);
    }
  }
  
  return foundRoots;
}

// 获取词根的相关单词
export function getRelatedWords(root: string): WordInfo[] {
  const relatedWords: WordInfo[] = [];
  
  for (const [, wordInfo] of Object.entries(WORD_DATABASE)) {
    if (wordInfo.roots.includes(root)) {
      relatedWords.push(wordInfo);
    }
  }
  
  return relatedWords;
}

// 根据用户水平过滤单词
export function filterWordsByUserLevel(words: WordInfo[], userLevel: string): WordInfo[] {
  const levelHierarchy = ['cet4', 'cet6', 'toefl', 'ielts', 'gre', 'advanced'];
  const userLevelIndex = levelHierarchy.indexOf(userLevel);
  
  return words.filter(word => {
    const wordLevelIndex = levelHierarchy.indexOf(word.level);
    return wordLevelIndex <= userLevelIndex;
  });
}