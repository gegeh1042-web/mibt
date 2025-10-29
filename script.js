/**
 * PersonaQuest - MBTI人格测评网站
 * 版本: 3.0 Complete
 * 作者: AI Assistant
 * 创建日期: 2024年
 * 
 * 功能特性:
 * - 完整的16种MBTI人格类型
 * - 20道精心设计的测试题目
 * - 沉浸式用户体验
 * - 本地数据持久化
 * - 响应式设计
 * - 完善的错误处理
 */

'use strict';

// ========== 应用配置 ==========
const APP_CONFIG = {
    // 动画配置
    ANIMATION: {
        DURATION: 300,
        SCROLL_THRESHOLD: 100,
        STAGGER_DELAY: 100
    },
    
    // 测试配置
    TEST: {
        QUESTIONS_PER_DIMENSION: 5,
        AUTO_SAVE_INTERVAL: 30000,
        PROGRESS_EXPIRY: 24 * 60 * 60 * 1000 // 24小时
    },
    
    // 存储键名
    STORAGE: {
        PROGRESS: 'personaquest_progress_v3',
        RESULTS: 'personaquest_results_v3',
        SETTINGS: 'personaquest_settings_v3',
        HISTORY: 'personaquest_history_v3'
    },
    
    // UI配置
    UI: {
        TOAST_DURATION: 3000,
        MODAL_BACKDROP: 'rgba(0, 0, 0, 0.5)',
        BREAKPOINTS: {
            MOBILE: 768,
            TABLET: 1024
        }
    }
};

// ========== 应用状态管理 ==========
class AppState {
    constructor() {
        this.currentSection = 'home';
        this.testStarted = false;
        this.testCompleted = false;
        this.currentQuestion = 0;
        this.answers = [];
        this.personalityType = '';
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        this.settings = {
            soundEnabled: true,
            animationsEnabled: true,
            theme: 'light'
        };
        this.history = [];
        this.autoSaveTimer = null;
    }
    
    reset() {
        this.testStarted = false;
        this.testCompleted = false;
        this.currentQuestion = 0;
        this.answers = [];
        this.personalityType = '';
        this.scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };
        this.clearAutoSave();
    }
    
    clearAutoSave() {
        if (this.autoSaveTimer) {
            clearInterval(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
    }
    
    setAutoSave(callback) {
        this.clearAutoSave();
        this.autoSaveTimer = setInterval(callback, APP_CONFIG.TEST.AUTO_SAVE_INTERVAL);
    }
}

// ========== MBTI人格数据库 ==========
const PERSONALITY_DATABASE = {
    // 分析师组 (NT)
    analysts: [
        {
            type: 'INTJ',
            name: '建筑师',
            emoji: '🏛️',
            description: '建筑师是富有想象力和战略性的思想家，他们拥有一切为规划而生的特质。',
            quote: '想象力比知识更重要，因为知识是有限的。',
            traits: ['独立', '理性', '有远见', '果断', '创新', '完美主义'],
            strengths: [
                { icon: '🎯', text: '战略思维能力强，善于制定长期计划' },
                { icon: '🧠', text: '独立自主，不依赖他人意见' },
                { icon: '📚', text: '求知欲强，渴望理解和学习' },
                { icon: '🔍', text: '对复杂问题有深刻洞察力' }
            ],
            challenges: [
                { icon: '❄️', text: '可能显得过于冷漠和疏远' },
                { icon: '💔', text: '对情感表达不够敏感' },
                { icon: '⏰', text: '完美主义倾向可能导致拖延' },
                { icon: '👥', text: '可能低估他人的情感需求' }
            ],
            careers: ['软件架构师', '科学家', '战略顾问', '大学教授', '投资分析师'],
            relationships: {
                overview: '作为INTJ，你在关系中重视智力连接和共同成长。',
                romantic: '需要能够理解并尊重你独立性的伴侣',
                friendship: '重视深度的思想交流，而非表面社交',
                family: '可能需要更多努力表达情感',
                advice: '尝试更多地表达情感，理解伴侣的情感需求，而不仅仅是逻辑层面。'
            },
            growth: [
                { step: 1, title: '情感觉察', desc: '练习识别和表达自己的情感' },
                { step: 2, title: '同理心培养', desc: '主动理解他人的感受和需求' },
                { step: 3, title: '平衡完美', desc: '学会接受"足够好"而非追求完美' }
            ]
        },
        {
            type: 'INTP',
            name: '逻辑学家',
            emoji: '🔍',
            description: '逻辑学家是具有创新精神的发明家，他们对知识有着止不住的渴望。',
            quote: '逻辑是通往真理的路径。',
            traits: ['逻辑性强', '好奇', '独立', '灵活', '创新', '理性'],
            strengths: [
                { icon: '⚙️', text: '出色的逻辑分析能力' },
                { icon: '🌈', text: '思维开放，乐于接受新观点' },
                { icon: '💡', text: '富有创造力和想象力' },
                { icon: '⚖️', text: '客观公正，不易受偏见影响' }
            ],
            challenges: [
                { icon: '🌫️', text: '可能显得心不在焉' },
                { icon: '📝', text: '对日常事务缺乏耐心' },
                { icon: '🗣️', text: '社交技能可能不足' },
                { icon: '🔄', text: '可能过度分析而陷入瘫痪' }
            ],
            careers: ['研究员', '程序员', '哲学家', '数学家', '技术文档撰写人'],
            relationships: {
                overview: '作为INTP，你在关系中寻求智力上的刺激和思想的交流。',
                romantic: '需要能够进行深度对话的伴侣',
                friendship: '重视智力上的连接和共同兴趣',
                family: '可能需要更多实际的情感支持',
                advice: '努力关注伴侣的情感需求，学会表达自己的感受，而不仅仅是想法。'
            },
            growth: [
                { step: 1, title: '行动力', desc: '将想法转化为实际行动' },
                { step: 2, title: '情感表达', desc: '练习表达感受而非仅分析' },
                { step: 3, title: '专注当下', desc: '减少过度思考，享受当下' }
            ]
        },
        {
            type: 'ENTJ',
            name: '指挥官',
            emoji: '👑',
            description: '指挥官是大胆、富有想象力和意志强大的领导者，他们总能找到或创造解决方法。',
            quote: '领导力不是关于头衔，而是关于影响力。',
            traits: ['领导力强', '自信', '战略思维', '果断', '魅力', '目标导向'],
            strengths: [
                { icon: '🚀', text: '天生的领导者，善于激励他人' },
                { icon: '🎯', text: '自信果断，决策能力强' },
                { icon: '🗺️', text: '长远规划能力出色' },
                { icon: '⚡', text: '对挑战充满热情' }
            ],
            challenges: [
                { icon: '💪', text: '可能显得过于强势' },
                { icon: '❤️', text: '对他人情感不够敏感' },
                { icon: '⏳', text: '可能缺乏耐心' },
                { icon: '🔍', text: '有时会忽视细节' }
            ],
            careers: ['CEO', '管理顾问', '律师', '政治家', '创业者'],
            relationships: {
                overview: '作为ENTJ，你在关系中寻求成长和共同目标，喜欢带领伴侣一起前进。',
                romantic: '需要支持你雄心壮志的伴侣',
                friendship: '自然成为群体的领导者',
                family: '可能需要放慢脚步，倾听家人',
                advice: '学会倾听并尊重伴侣的意见，不要总是试图主导关系。'
            },
            growth: [
                { step: 1, title: '耐心培养', desc: '学会等待和给予他人时间' },
                { step: 2, title: '情感智慧', desc: '发展情商，理解他人感受' },
                { step: 3, title: '授权艺术', desc: '学会信任并授权给他人' }
            ]
        },
        {
            type: 'ENTP',
            name: '辩论家',
            emoji: '💬',
            description: '辩论家是聪明好奇的思想家，他们不会放弃智力上的挑战。',
            quote: '辩论不是为了赢，而是为了接近真理。',
            traits: ['机智', '创新', '适应性强', '善于辩论', '热情', '思维敏捷'],
            strengths: [
                { icon: '🎭', text: '思维敏捷，善于即兴发挥' },
                { icon: '🌍', text: '知识面广，兴趣多样' },
                { icon: '🎤', text: '出色的辩论和说服能力' },
                { icon: '🔥', text: '对挑战充满热情' }
            ],
            challenges: [
                { icon: '⚔️', text: '可能显得争强好胜' },
                { icon: '🎯', text: '可能对常规任务感到厌烦' },
                { icon: '🤝', text: '可能不善于承诺' },
                { icon: '🔍', text: '可能忽视细节和实际执行' }
            ],
            careers: ['创意总监', '律师', '记者', '市场营销', '企业家'],
            relationships: {
                overview: '作为ENTP，你在关系中寻求智力上的刺激和新奇感。',
                romantic: '需要能够跟上你思维节奏的伴侣',
                friendship: '喜欢辩论和思想交流的朋友',
                family: '可能需要更多稳定性和承诺',
                advice: '学会专注于当前关系，避免总是寻找下一个智力挑战。'
            },
            growth: [
                { step: 1, title: '承诺实践', desc: '学会坚持完成已开始的事情' },
                { step: 2, title: '深度连接', desc: '培养深入而非肤浅的关系' },
                { step: 3, title: '执行能力', desc: '将创意转化为具体成果' }
            ]
        }
    ],
    
    // 外交家组 (NF)
    diplomats: [
        {
            type: 'INFJ',
            name: '提倡者',
            emoji: '🌟',
            description: '提倡者是安静而神秘，同时鼓舞人心且不知疲倦的理想主义者。',
            quote: '成为你想在世界上看到的改变。',
            traits: ['理想主义', '有洞察力', '有原则', '有同情心', '直觉强', '深沉'],
            strengths: [
                { icon: '🔮', text: '深刻的洞察力和直觉' },
                { icon: '💝', text: '富有同情心和同理心' },
                { icon: '📜', text: '坚定的价值观和原则' },
                { icon: '🌱', text: '致力于帮助他人成长' }
            ],
            challenges: [
                { icon: '🌊', text: '可能过于敏感' },
                { icon: '☁️', text: '可能过度理想化' },
                { icon: '🗡️', text: '可能难以接受批评' },
                { icon: '🔋', text: '可能容易感到倦怠' }
            ],
            careers: ['心理咨询师', '作家', '社会工作者', '教师', '非营利组织工作者'],
            relationships: {
                overview: '作为INFJ，你在关系中寻求深度的情感连接和共同价值观。',
                romantic: '需要深刻理解和情感支持的伴侣',
                friendship: '重视真实和深度的友谊',
                family: '往往是家庭的情感支柱',
                advice: '学会设定界限，不要过度牺牲自己的需求。'
            },
            growth: [
                { step: 1, title: '界限设定', desc: '学会说"不"和保护自己' },
                { step: 2, title: '现实平衡', desc: '在理想与现实间找到平衡' },
                { step: 3, title: '自我关怀', desc: '优先照顾自己的情感需求' }
            ]
        },
        {
            type: 'INFP',
            name: '调停者',
            emoji: '🕊️',
            description: '调停者是诗意、善良和利他主义的人，总是热切地为帮助好的事业而努力。',
            quote: '在每个人心中都有一片值得探索的宇宙。',
            traits: ['理想主义', '忠诚', '适应性', '有创造力', '和谐', '真诚'],
            strengths: [
                { icon: '🎨', text: '强烈的价值观和道德感' },
                { icon: '✨', text: '富有创造力和想象力' },
                { icon: '💖', text: '忠诚和奉献' },
                { icon: '👂', text: '善于理解他人' }
            ],
            challenges: [
                { icon: '🌈', text: '可能过于理想化' },
                { icon: '💔', text: '可能对批评过于敏感' },
                { icon: '⚖️', text: '可能难以处理冲突' },
                { icon: '🛠️', text: '可能不善于实际事务' }
            ],
            careers: ['作家', '艺术家', '心理咨询师', '社会工作者', '教师'],
            relationships: {
                overview: '作为INFP，你在关系中寻求真实的情感连接和共同价值观。',
                romantic: '需要理解你内心世界的伴侣',
                friendship: '重视真实和深度的连接',
                family: '追求和谐，避免冲突',
                advice: '学会表达自己的需求和感受，不要总是牺牲自己。'
            },
            growth: [
                { step: 1, title: '自信建立', desc: '相信自己的价值和能力' },
                { step: 2, title: '冲突面对', desc: '学会建设性地处理分歧' },
                { step: 3, title: '行动导向', desc: '将理想转化为具体行动' }
            ]
        },
        {
            type: 'ENFJ',
            name: '主人公',
            emoji: '🌈',
            description: '主人公是富有魅力和鼓舞人心的领导者，有使听众听从他们想法的天赋。',
            quote: '领导他人最好的方式是服务他人。',
            traits: ['有魅力', '利他主义', '可靠', '天生的领导者', '热情', '同理心强'],
            strengths: [
                { icon: '🎭', text: '天生的领导者和激励者' },
                { icon: '❤️', text: '强烈的同理心' },
                { icon: '🗣️', text: '善于沟通和表达' },
                { icon: '🌟', text: '致力于帮助他人成长' }
            ],
            challenges: [
                { icon: '👥', text: '可能过于理想化他人' },
                { icon: '🙏', text: '可能忽视自己的需求' },
                { icon: '🎯', text: '可能对批评过于敏感' },
                { icon: '⚖️', text: '可能过度承担责任' }
            ],
            careers: ['教师', '咨询师', '人力资源', '公关专员', '非营利组织领导者'],
            relationships: {
                overview: '作为ENFJ，你在关系中寻求和谐与共同成长，喜欢帮助伴侣实现潜力。',
                romantic: '需要欣赏你付出并给予支持的伴侣',
                friendship: '是朋友中的精神领袖',
                family: '常常照顾每个人的需求',
                advice: '学会关注自己的需求，不要总是把他人放在第一位。'
            },
            growth: [
                { step: 1, title: '自我优先', desc: '学会先照顾自己再帮助他人' },
                { step: 2, title: '现实接纳', desc: '接受他人的不完美' },
                { step: 3, title: '界限维护', desc: '设定健康的个人界限' }
            ]
        },
        {
            type: 'ENFP',
            name: '竞选者',
            emoji: '🎭',
            description: '竞选者是热情、有创造力和社交能力强的人，他们总是自由地寻找生活中的真善美。',
            quote: '生活不是寻找自己，而是创造自己。',
            traits: ['热情', '有创造力', '社交能力强', '精神自由', '乐观', '灵感丰富'],
            strengths: [
                { icon: '🔥', text: '热情和活力' },
                { icon: '👥', text: '出色的社交技能' },
                { icon: '💡', text: '富有创造力和想象力' },
                { icon: '🌈', text: '善于激励他人' }
            ],
            challenges: [
                { icon: '🎯', text: '可能缺乏专注力' },
                { icon: '📅', text: '可能对常规任务感到厌烦' },
                { icon: '🤝', text: '可能过度承诺' },
                { icon: '💔', text: '可能对批评过于敏感' }
            ],
            careers: ['市场营销', '公关专员', '心理咨询师', '教师', '艺术家'],
            relationships: {
                overview: '作为ENFP，你在关系中寻求情感连接、新奇感和共同成长。',
                romantic: '需要能够理解你多变天性的伴侣',
                friendship: '拥有广泛而多样的朋友圈',
                family: '带来欢乐和活力',
                advice: '学会专注于当前关系，避免总是寻找下一个新奇体验。'
            },
            growth: [
                { step: 1, title: '专注培养', desc: '学会坚持完成重要任务' },
                { step: 2, title: '深度承诺', desc: '在关系中保持深度投入' },
                { step: 3, title: '现实规划', desc: '将创意转化为可行计划' }
            ]
        }
    ],
    
    // 守护者组 (SJ)
    sentinels: [
        {
            type: 'ISTJ',
            name: '物流师',
            emoji: '📋',
            description: '物流师是实用主义和注重事实的个人，他们的可靠性不容怀疑。',
            quote: '细节决定成败。',
            traits: ['负责任', '可靠', '务实', '注重细节', '忠诚', '有条理'],
            strengths: [
                { icon: '🛡️', text: '强烈的责任感和可靠性' },
                { icon: '🔍', text: '注重细节和准确性' },
                { icon: '⚖️', text: '诚实和正直' },
                { icon: '📊', text: '出色的组织能力' }
            ],
            challenges: [
                { icon: '🗿', text: '可能过于固执' },
                { icon: '🔄', text: '可能对变化适应不良' },
                { icon: '💭', text: '可能不善于表达情感' },
                { icon: '⚖️', text: '可能过于批判' }
            ],
            careers: ['会计师', '律师', '医生', '工程师', '银行家'],
            relationships: {
                overview: '作为ISTJ，你在关系中寻求稳定、忠诚和共同价值观。',
                romantic: '需要可靠和传统的伴侣',
                friendship: '虽然朋友不多但都很深厚',
                family: '是家庭的支柱和守护者',
                advice: '学会表达自己的情感，尝试接受变化和新体验。'
            },
            growth: [
                { step: 1, title: '灵活适应', desc: '学会接受和适应变化' },
                { step: 2, title: '情感表达', desc: '练习表达内心感受' },
                { step: 3, title: '开放思维', desc: '尝试新的可能性' }
            ]
        },
        {
            type: 'ISFJ',
            name: '守卫者',
            emoji: '🛡️',
            description: '守卫者是非常专注和温暖的守护者，时刻准备保护爱他们的人。',
            quote: '服务他人是最高尚的使命。',
            traits: ['支持', '可靠', '耐心', '实用', '关怀', '忠诚'],
            strengths: [
                { icon: '💝', text: '强烈的支持性和忠诚' },
                { icon: '🧠', text: '出色的记忆力和细节关注' },
                { icon: '⏳', text: '耐心和实用主义' },
                { icon: '🤝', text: '强烈的责任感' }
            ],
            challenges: [
                { icon: '🎁', text: '可能过于利他' },
                { icon: '💔', text: '可能对批评过于敏感' },
                { icon: '🔄', text: '可能不善于改变' },
                { icon: '🙍', text: '可能压抑自己的需求' }
            ],
            careers: ['护士', '教师', '社会工作者', '人力资源', '行政助理'],
            relationships: {
                overview: '作为ISFJ，你在关系中寻求稳定、和谐和相互支持。',
                romantic: '需要欣赏你付出的伴侣',
                friendship: '是朋友中的倾听者和支持者',
                family: '无条件地关爱家人',
                advice: '学会表达自己的需求，不要总是牺牲自己。'
            },
            growth: [
                { step: 1, title: '自我主张', desc: '学会表达自己的需求和意见' },
                { step: 2, title: '变化拥抱', desc: '积极面对生活中的变化' },
                { step: 3, title: '界限设定', desc: '保护自己的能量和时间' }
            ]
        },
        {
            type: 'ESTJ',
            name: '总经理',
            emoji: '📊',
            description: '总经理是出色的管理者，在管理事情或人的时候不可避免地渴望传统和秩序。',
            quote: '秩序是自由的保障。',
            traits: ['专注', '精力充沛', '自信', '坚强意志', '务实', '组织力强'],
            strengths: [
                { icon: '👔', text: '出色的组织和管理能力' },
                { icon: '💪', text: '强烈的责任感和可靠性' },
                { icon: '🎯', text: '实用和直接' },
                { icon: '✅', text: '致力于完成任务' }
            ],
            challenges: [
                { icon: '🗿', text: '可能过于固执' },
                { icon: '💭', text: '可能不善于表达情感' },
                { icon: '⚖️', text: '可能过于批判' },
                { icon: '👂', text: '可能不善于接受批评' }
            ],
            careers: ['企业管理者', '会计师', '军官', '法官', '教师'],
            relationships: {
                overview: '作为ESTJ，你在关系中寻求稳定、忠诚和共同价值观。',
                romantic: '需要传统和可靠的伴侣',
                friendship: '是朋友圈中的组织者',
                family: '为家庭提供结构和稳定',
                advice: '学会表达自己的情感，尝试理解伴侣的情感需求。'
            },
            growth: [
                { step: 1, title: '情感智慧', desc: '发展和表达情感' },
                { step: 2, title: '灵活思维', desc: '接受不同的观点和方式' },
                { step: 3, title: '倾听艺术', desc: '真正听取他人意见' }
            ]
        },
        {
            type: 'ESFJ',
            name: '执政官',
            emoji: '🤝',
            description: '执政官是极有同情心的人，他们总是热心地提供帮助和鼓励。',
            quote: '和谐是美好生活的基石。',
            traits: ['支持', '可靠', '有耐心', '积极', '关怀', '和谐'],
            strengths: [
                { icon: '❤️', text: '强烈的同理心和支持性' },
                { icon: '👥', text: '出色的社交技能' },
                { icon: '🛠️', text: '实用和可靠' },
                { icon: '🌟', text: '致力于帮助他人' }
            ],
            challenges: [
                { icon: '👀', text: '可能过于在意他人看法' },
                { icon: '⚔️', text: '可能不善于处理冲突' },
                { icon: '🙍', text: '可能忽视自己的需求' },
                { icon: '💔', text: '可能对批评过于敏感' }
            ],
            careers: ['护士', '教师', '社会工作者', '人力资源', '销售'],
            relationships: {
                overview: '作为ESFJ，你在关系中寻求和谐、稳定和相互支持。',
                romantic: '需要欣赏你付出的伴侣',
                friendship: '是朋友圈中的粘合剂',
                family: '无条件地关爱和照顾',
                advice: '学会表达自己的需求，不要总是牺牲自己。'
            },
            growth: [
                { step: 1, title: '自我价值', desc: '从内在而非外在认可中获得价值' },
                { step: 2, title: '冲突面对', desc: '学会建设性地处理分歧' },
                { step: 3, title: '独立思考', desc: '培养自己的观点和判断' }
            ]
        }
    ],
    
    // 探险家组 (SP)
    explorers: [
        {
            type: 'ISTP',
            name: '鉴赏家',
            emoji: '🔧',
            description: '鉴赏家是大胆而实际的实验家，他们擅长使用各种工具。',
            quote: '实践是检验真理的唯一标准。',
            traits: ['好奇', '实用', '放松', '擅长危机处理', '独立', '灵活'],
            strengths: [
                { icon: '🔧', text: '出色的动手能力' },
                { icon: '😌', text: '冷静和理性' },
                { icon: '🔄', text: '适应性强' },
                { icon: '⚡', text: '对危机反应迅速' }
            ],
            challenges: [
                { icon: '❄️', text: '可能显得过于冷漠' },
                { icon: '🗓️', text: '可能不善于长期规划' },
                { icon: '💭', text: '可能不善于表达情感' },
                { icon: '🎲', text: '可能过于冒险' }
            ],
            careers: ['工程师', '技术员', '消防员', '飞行员', '机械师'],
            relationships: {
                overview: '作为ISTP，你在关系中寻求自由、空间和实际支持。',
                romantic: '需要给予你空间和自由的伴侣',
                friendship: '喜欢一起动手做事情的朋友',
                family: '通过行动而非言语表达关爱',
                advice: '学会表达自己的情感，尝试理解伴侣的情感需求。'
            },
            growth: [
                { step: 1, title: '情感觉察', desc: '识别和表达自己的感受' },
                { step: 2, title: '长期规划', desc: '制定并坚持长期目标' },
                { step: 3, title: '深度连接', desc: '培养更深层的人际关系' }
            ]
        },
        {
            type: 'ISFP',
            name: '探险家',
            emoji: '🎨',
            description: '探险家是灵活而有魅力的艺术家，他们时刻准备着探索新的可能性。',
            quote: '美存在于生活的每一个瞬间。',
            traits: ['有创造力', '热情', '自然', '好奇', '敏感', '艺术性'],
            strengths: [
                { icon: '🎨', text: '强烈的审美感' },
                { icon: '💡', text: '富有创造力和想象力' },
                { icon: '💝', text: '敏感和善良' },
                { icon: '🌸', text: '对当下有深刻体验' }
            ],
            challenges: [
                { icon: '💔', text: '可能过于敏感' },
                { icon: '🗓️', text: '可能不善于长期规划' },
                { icon: '🎯', text: '可能对批评过于敏感' },
                { icon: '🏃', text: '可能过于独立' }
            ],
            careers: ['艺术家', '设计师', '音乐家', '摄影师', '心理咨询师'],
            relationships: {
                overview: '作为ISFP，你在关系中寻求真实的情感连接和共同价值观。',
                romantic: '需要理解你艺术天性的伴侣',
                friendship: '重视真诚和深度的友谊',
                family: '通过创造和行动表达爱',
                advice: '学会表达自己的需求和感受，不要总是隐藏自己。'
            },
            growth: [
                { step: 1, title: '自信建立', desc: '相信自己的艺术价值' },
                { step: 2, title: '未来规划', desc: '学会为未来做准备' },
                { step: 3, title: '自我表达', desc: '勇敢地展示真实的自己' }
            ]
        },
        {
            type: 'ESTP',
            name: '企业家',
            emoji: '🚀',
            description: '企业家是聪明、精力充沛的感知者，他们真心享受生活在边缘的感觉。',
            quote: '生命在于冒险，而非安逸。',
            traits: ['精力充沛', '感知敏锐', '自发', '实用', '冒险', '活力'],
            strengths: [
                { icon: '👁️', text: '出色的观察力' },
                { icon: '🔄', text: '适应性强' },
                { icon: '⚡', text: '精力充沛和热情' },
                { icon: '🚨', text: '对危机反应迅速' }
            ],
            challenges: [
                { icon: '⚡', text: '可能过于冲动' },
                { icon: '🗓️', text: '可能不善于长期规划' },
                { icon: '💭', text: '可能不善于表达情感' },
                { icon: '🎲', text: '可能过于冒险' }
            ],
            careers: ['销售', '企业家', '运动员', '表演者', '警察'],
            relationships: {
                overview: '作为ESTP，你在关系中寻求刺激、乐趣和实际支持。',
                romantic: '需要能跟上你节奏的活跃伴侣',
                friendship: '喜欢一起冒险和体验新事物',
                family: '带来活力和乐趣',
                advice: '学会表达自己的情感，尝试理解伴侣的情感需求。'
            },
            growth: [
                { step: 1, title: '深度思考', desc: '在行动前进行更多思考' },
                { step: 2, title: '情感发展', desc: '培养和表达情感' },
                { step: 3, title: '承诺坚持', desc: '学会对重要事情保持承诺' }
            ]
        },
        {
            type: 'ESFP',
            name: '娱乐家',
            emoji: '🎉',
            description: '娱乐家是自发的、精力充沛和热情的表演者，他们生活在他们周围从不感到无聊。',
            quote: '生活是一场舞台，尽情表演吧。',
            traits: ['热情', '友善', '外向', '自发', '乐观', '活泼'],
            strengths: [
                { icon: '🎭', text: '出色的社交技能' },
                { icon: '🔥', text: '热情和活力' },
                { icon: '🛠️', text: '实用和务实' },
                { icon: '🌈', text: '对当下有深刻体验' }
            ],
            challenges: [
                { icon: '⚡', text: '可能过于冲动' },
                { icon: '🗓️', text: '可能不善于长期规划' },
                { icon: '💔', text: '可能对批评过于敏感' },
                { icon: '👀', text: '可能过于关注当下' }
            ],
            careers: ['表演者', '销售', '教师', '活动策划', '公关专员'],
            relationships: {
                overview: '作为ESFP，你在关系中寻求乐趣、刺激和情感连接。',
                romantic: '需要能一起享受生活的伴侣',
                friendship: '是派对的灵魂人物',
                family: '带来欢乐和温暖',
                advice: '学会表达自己的情感，尝试理解伴侣的情感需求。'
            },
            growth: [
                { step: 1, title: '未来规划', desc: '为长远目标做准备' },
                { step: 2, title: '深度反思', desc: '花时间思考深层问题' },
                { step: 3, title: '坚持承诺', desc: '完成已承诺的责任' }
            ]
        }
    ]
};

// 获取所有人格类型
const getAllPersonalities = () => {
    return [
        ...PERSONALITY_DATABASE.analysts,
        ...PERSONALITY_DATABASE.diplomats,
        ...PERSONALITY_DATABASE.sentinels,
        ...PERSONALITY_DATABASE.explorers
    ];
};

// ========== 测试题库 ==========
const QUESTION_DATABASE = [
    // E/I 维度题目 (1-5)
    {
        id: 1,
        dimension: 'EI',
        type: 'scenario',
        title: '周末的抉择',
        description: '一个难得的周末，你更倾向于如何度过？',
        illustration: '🌅',
        options: [
            { text: '约上三五好友，去热闹的聚会或活动', value: 'E' },
            { text: '独自在家，享受安静的阅读或观影时光', value: 'I' }
        ]
    },
    {
        id: 2,
        dimension: 'EI',
        type: 'scenario',
        title: '工作方式',
        description: '在团队项目中，你更喜欢扮演什么角色？',
        illustration: '💼',
        options: [
            { text: '积极发言，带领讨论和决策', value: 'E' },
            { text: '深入思考，提供关键见解和建议', value: 'I' }
        ]
    },
    {
        id: 3,
        dimension: 'EI',
        type: 'scenario',
        title: '能量来源',
        description: '当你感到疲惫时，什么方式最能让你恢复精力？',
        illustration: '🔋',
        options: [
            { text: '和朋友聊天，参加社交活动', value: 'E' },
            { text: '独处反思，享受个人空间', value: 'I' }
        ]
    },
    {
        id: 4,
        dimension: 'EI',
        type: 'scenario',
        title: '旅行偏好',
        description: '计划一次旅行，你更倾向于？',
        illustration: '✈️',
        options: [
            { text: '热闹的目的地，结识新朋友，体验当地文化', value: 'E' },
            { text: '安静的地方，深度探索，享受独处时光', value: 'I' }
        ]
    },
    {
        id: 5,
        dimension: 'EI',
        type: 'scenario',
        title: '派对场景',
        description: '参加一个派对，你通常会？',
        illustration: '🎉',
        options: [
            { text: '主动与陌生人交谈，扩大社交圈', value: 'E' },
            { text: '和熟悉的朋友待在一起，享受温馨时光', value: 'I' }
        ]
    },
    
    // S/N 维度题目 (6-10)
    {
        id: 6,
        dimension: 'SN',
        type: 'scenario',
        title: '学习方式',
        description: '面对新知识，你更喜欢？',
        illustration: '📚',
        options: [
            { text: '具体实用的方法，立即可用', value: 'S' },
            { text: '理论框架和概念，理解底层原理', value: 'N' }
        ]
    },
    {
        id: 7,
        dimension: 'SN',
        type: 'scenario',
        title: '解决问题',
        description: '遇到复杂问题时，你倾向于？',
        illustration: '🧩',
        options: [
            { text: '关注事实和细节，逐步解决', value: 'S' },
            { text: '寻找模式和可能性，创新解决方案', value: 'N' }
        ]
    },
    {
        id: 8,
        dimension: 'SN',
        type: 'scenario',
        title: '艺术欣赏',
        description: '参观艺术展览时，你更关注？',
        illustration: '🎨',
        options: [
            { text: '技法、色彩和构图等具体元素', value: 'S' },
            { text: '作品背后的象征意义和情感表达', value: 'N' }
        ]
    },
    {
        id: 9,
        dimension: 'SN',
        type: 'scenario',
        title: '未来规划',
        description: '思考未来时，你更倾向于？',
        illustration: '🔮',
        options: [
            { text: '设定具体可行的短期目标', value: 'S' },
            { text: '构想长远愿景和可能性', value: 'N' }
        ]
    },
    {
        id: 10,
        dimension: 'SN',
        type: 'scenario',
        title: '会议讨论',
        description: '参加工作会议时，你更关注？',
        illustration: '📊',
        options: [
            { text: '具体的数据、事实和执行细节', value: 'S' },
            { text: '整体方向、战略和未来可能性', value: 'N' }
        ]
    },
    
    // T/F 维度题目 (11-15)
    {
        id: 11,
        dimension: 'TF',
        type: 'scenario',
        title: '决策依据',
        description: '做重要决定时，你更依赖？',
        illustration: '⚖️',
        options: [
            { text: '逻辑分析和客观事实', value: 'T' },
            { text: '价值观和对他人的影响', value: 'F' }
        ]
    },
    {
        id: 12,
        dimension: 'TF',
        type: 'scenario',
        title: '冲突处理',
        description: '面对团队冲突，你会？',
        illustration: '🤝',
        options: [
            { text: '分析问题，找出公平合理的解决方案', value: 'T' },
            { text: '关注各方感受，寻求和谐共处', value: 'F' }
        ]
    },
    {
        id: 13,
        dimension: 'TF',
        type: 'scenario',
        title: '评价他人',
        description: '评价一个人的工作表现时，你更看重？',
        illustration: '📈',
        options: [
            { text: '客观成果和效率', value: 'T' },
            { text: '努力程度和态度', value: 'F' }
        ]
    },
    {
        id: 14,
        dimension: 'TF',
        type: 'scenario',
        title: '给予反馈',
        description: '给他人提建议时，你倾向于？',
        illustration: '💬',
        options: [
            { text: '直接指出问题和改进方法', value: 'T' },
            { text: '委婉表达，考虑对方感受', value: 'F' }
        ]
    },
    {
        id: 15,
        dimension: 'TF',
        type: 'scenario',
        title: '道德困境',
        description: '面对道德困境时，你首先考虑？',
        illustration: '🤔',
        options: [
            { text: '原则和规则的公正性', value: 'T' },
            { text: '对相关人员的情感影响', value: 'F' }
        ]
    },
    
    // J/P 维度题目 (16-20)
    {
        id: 16,
        dimension: 'JP',
        type: 'scenario',
        title: '工作风格',
        description: '处理任务时，你更喜欢？',
        illustration: '📅',
        options: [
            { text: '制定详细计划，按部就班完成', value: 'J' },
            { text: '保持灵活性，根据情况调整', value: 'P' }
        ]
    },
    {
        id: 17,
        dimension: 'JP',
        type: 'scenario',
        title: '生活环境',
        description: '你的理想生活环境是？',
        illustration: '🏠',
        options: [
            { text: '整洁有序，一切井井有条', value: 'J' },
            { text: '舒适随性，允许一些混乱', value: 'P' }
        ]
    },
    {
        id: 18,
        dimension: 'JP',
        type: 'scenario',
        title: '面对截止日期',
        description: '临近截止日期时，你通常会？',
        illustration: '⏰',
        options: [
            { text: '提前完成，留出缓冲时间', value: 'J' },
            { text: '在压力下高效工作，最后一刻完成', value: 'P' }
        ]
    },
    {
        id: 19,
        dimension: 'JP',
        type: 'scenario',
        title: '购物习惯',
        description: '购物时，你倾向于？',
        illustration: '🛍️',
        options: [
            { text: '列好清单，按计划购买', value: 'J' },
            { text: '随意浏览，发现惊喜', value: 'P' }
        ]
    },
    {
        id: 20,
        dimension: 'JP',
        type: 'scenario',
        title: '旅行计划',
        description: '制定旅行计划时，你喜欢？',
        illustration: '🗺️',
        options: [
            { text: '详细规划每个细节', value: 'J' },
            { text: '只定大概方向，随性而行', value: 'P' }
        ]
    }
];

// ========== 工具函数库 ==========
const Utils = {
    // 延迟函数
    delay: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // 节流函数
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // 防抖函数
    debounce: (func, delay) => {
        let timeoutId;
        return function() {
            const args = arguments;
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(context, args), delay);
        };
    },
    
    // 平滑滚动
    smoothScrollTo: (element, offset = 0) => {
        const targetPosition = element.offsetTop - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    },
    
    // 检查元素是否在视口
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // 创建涟漪效果
    createRipple: (element, event) => {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    },
    
    // 生成随机ID
    generateId: () => '_' + Math.random().toString(36).substr(2, 9),
    
    // 格式化日期
    formatDate: (date) => {
        return new Date(date).toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // 获取设备类型
    getDeviceType: () => {
        const width = window.innerWidth;
        if (width < APP_CONFIG.UI.BREAKPOINTS.MOBILE) return 'mobile';
        if (width < APP_CONFIG.UI.BREAKPOINTS.TABLET) return 'tablet';
        return 'desktop';
    }
};

// ========== 本地存储管理 ==========
const StorageManager = {
    // 获取数据
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error(`Storage get error for key ${key}:`, e);
            return defaultValue;
        }
    },
    
    // 设置数据
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Storage set error for key ${key}:`, e);
            return false;
        }
    },
    
    // 删除数据
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error(`Storage remove error for key ${key}:`, e);
            return false;
        }
    },
    
    // 清空所有数据
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (e) {
            console.error('Storage clear error:', e);
            return false;
        }
    },
    
    // 获取存储大小
    getStorageSize: () => {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length + key.length;
            }
        }
        return total;
    }
};

// ========== UI管理器 ==========
class UIManager {
    constructor() {
        this.elements = this.initializeElements();
        this.toastContainer = this.createToastContainer();
    }
    
    // 初始化DOM元素引用
    initializeElements() {
        return {
            // 导航相关
            navbar: document.getElementById('navbar'),
            navMenu: document.getElementById('navMenu'),
            menuToggle: document.getElementById('menuToggle'),
            navLinks: document.querySelectorAll('.nav-link'),
            
            // 页面容器
            loadingScreen: document.getElementById('loadingScreen'),
            mainContent: document.querySelector('.main-content'),
            
            // 首页元素
            startJourney: document.getElementById('startJourney'),
            quickPreview: document.getElementById('quickPreview'),
            personalityGrid: document.getElementById('personalityGrid'),
            filterBtns: document.querySelectorAll('.filter-btn'),
            
            // 测试页面
            testPage: document.getElementById('testPage'),
            progressFill: document.getElementById('progressFill'),
            currentQuestion: document.getElementById('currentQuestion'),
            totalQuestions: document.getElementById('totalQuestions'),
            sceneIllustration: document.getElementById('sceneIllustration'),
            questionTitle: document.getElementById('questionTitle'),
            questionType: document.getElementById('questionType'),
            questionDescription: document.getElementById('questionDescription'),
            answerContainer: document.getElementById('answerContainer'),
            prevBtn: document.getElementById('prevBtn'),
            nextBtn: document.getElementById('nextBtn'),
            pauseBtn: document.getElementById('pauseBtn'),
            indicatorDots: document.getElementById('indicatorDots'),
            
            // 结果页面
            resultPage: document.getElementById('resultPage'),
            characterReveal: document.querySelector('.character-reveal'),
            characterAvatar: document.getElementById('characterAvatar'),
            characterName: document.getElementById('characterName'),
            characterType: document.getElementById('characterType'),
            characterQuote: document.getElementById('characterQuote'),
            typeDescription: document.getElementById('typeDescription'),
            traitCloud: document.getElementById('traitCloud'),
            strengthsGrid: document.getElementById('strengthsGrid'),
            challengesList: document.getElementById('challengesList'),
            careerMatrix: document.getElementById('careerMatrix'),
            relationshipMap: document.getElementById('relationshipMap'),
            growthPath: document.getElementById('growthPath'),
            shareResult: document.getElementById('shareResult'),
            downloadReport: document.getElementById('downloadReport'),
            restartTest: document.getElementById('restartTest'),
            
            // 标签页
            tabBtns: document.querySelectorAll('.tab-btn'),
            tabPanes: document.querySelectorAll('.tab-pane'),
            
            // 模态框
            personalityModal: document.getElementById('personalityModal'),
            modalClose: document.getElementById('modalClose'),
            pauseModal: document.getElementById('pauseModal'),
            resumeTest: document.getElementById('resumeTest'),
            exitTest: document.getElementById('exitTest')
        };
    }
    
    // 创建Toast容器
    createToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }
    
    // 显示Toast消息
    showToast(message, type = 'info', duration = APP_CONFIG.UI.TOAST_DURATION) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // 添加关闭事件
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));
        
        // 添加到容器
        this.toastContainer.appendChild(toast);
        
        // 自动移除
        setTimeout(() => this.removeToast(toast), duration);
        
        // 添加进入动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
    }
    
    // 移除Toast
    removeToast(toast) {
        if (toast && toast.parentNode) {
            toast.classList.add('hide');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }
    
    // 获取Toast图标
    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }
    
    // 显示加载屏幕
    showLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.classList.remove('hidden');
        }
    }
    
    // 隐藏加载屏幕
    hideLoadingScreen() {
        if (this.elements.loadingScreen) {
            this.elements.loadingScreen.classList.add('hidden');
        }
    }
    
    // 切换页面显示
    showPage(pageName) {
        // 隐藏所有页面
        const pages = ['mainContent', 'testPage', 'resultPage'];
        pages.forEach(page => {
            const element = this.elements[page];
            if (element) {
                element.classList.add('hidden');
            }
        });
        
        // 显示目标页面
        const targetElement = this.elements[pageName];
        if (targetElement) {
            targetElement.classList.remove('hidden');
        }
    }
    
    // 更新导航栏样式
    updateNavbar(scrolled) {
        if (this.elements.navbar) {
            if (scrolled) {
                this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                this.elements.navbar.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            } else {
                this.elements.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                this.elements.navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }
        }
    }
    
    // 切换移动端菜单
    toggleMobileMenu() {
        if (!this.elements.navMenu || !this.elements.menuToggle) return;
        
        this.elements.navMenu.classList.toggle('active');
        
        const spans = this.elements.menuToggle.querySelectorAll('span');
        if (this.elements.navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    // 更新活动导航链接
    updateActiveNavLink(sectionId) {
        this.elements.navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === sectionId);
        });
    }
}

// ========== 测试管理器 ==========
class TestManager {
    constructor(uiManager, appState) {
        this.ui = uiManager;
        this.state = appState;
        this.questions = QUESTION_DATABASE;
        this.currentFilter = 'all';
    }
    
    // 初始化测试系统
    initialize() {
        this.bindEvents();
        this.initializeIndicatorDots();
        this.updateTotalQuestions();
    }
    
    // 绑定事件
    bindEvents() {
        // 开始测试
        if (this.ui.elements.startJourney) {
            this.ui.elements.startJourney.addEventListener('click', () => this.startTest());
        }
        
        // 导航按钮
        if (this.ui.elements.prevBtn) {
            this.ui.elements.prevBtn.addEventListener('click', () => this.goToPreviousQuestion());
        }
        if (this.ui.elements.nextBtn) {
            this.ui.elements.nextBtn.addEventListener('click', () => this.goToNextQuestion());
        }
        
        // 暂停按钮
        if (this.ui.elements.pauseBtn) {
            this.ui.elements.pauseBtn.addEventListener('click', () => this.pauseTest());
        }
        
        // 恢复和退出测试
        if (this.ui.elements.resumeTest) {
            this.ui.elements.resumeTest.addEventListener('click', () => this.resumeTest());
        }
        if (this.ui.elements.exitTest) {
            this.ui.elements.exitTest.addEventListener('click', () => this.exitTest());
        }
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    // 开始测试
    startTest() {
        this.state.reset();
        this.state.testStarted = true;
        this.state.answers = new Array(this.questions.length).fill(null);
        
        // 设置自动保存
        this.state.setAutoSave(() => this.saveProgress());
        
        // 切换到测试页面
        this.ui.showPage('testPage');
        
        // 加载第一题
        this.loadQuestion(0);
        
        // 滚动到顶部
        window.scrollTo(0, 0);
        
        this.ui.showToast('测试开始！请根据你的真实感受选择答案', 'info');
    }
    
    // 加载问题
    loadQuestion(index) {
        if (index < 0 || index >= this.questions.length) return;
        
        const question = this.questions[index];
        
        // 更新进度
        this.updateProgress();
        
        // 更新问题内容
        this.updateQuestionContent(question);
        
        // 生成答案选项
        this.generateAnswerOptions(question, index);
        
        // 更新导航按钮
        this.updateNavigationButtons();
        
        // 更新指示点
        this.updateIndicatorDots();
        
        // 添加动画
        this.animateQuestionEntry();
    }
    
    // 更新问题内容
    updateQuestionContent(question) {
        if (this.ui.elements.sceneIllustration) {
            this.ui.elements.sceneIllustration.textContent = question.illustration;
        }
        if (this.ui.elements.questionTitle) {
            this.ui.elements.questionTitle.textContent = question.title;
        }
        if (this.ui.elements.questionType) {
            this.ui.elements.questionType.textContent = this.getQuestionTypeLabel(question.type);
        }
        if (this.ui.elements.questionDescription) {
            this.ui.elements.questionDescription.textContent = question.description;
        }
    }
    
    // 获取问题类型标签
    getQuestionTypeLabel(type) {
        const labels = {
            scenario: '情景选择',
            slider: '程度选择',
            ranking: '排序题',
            wordcloud: '词云选择'
        };
        return labels[type] || '选择题';
    }
    
    // 生成答案选项
    generateAnswerOptions(question, questionIndex) {
        if (!this.ui.elements.answerContainer) return;
        
        this.ui.elements.answerContainer.innerHTML = '';
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'answer-option ripple';
            
            optionElement.innerHTML = `
                <div class="option-indicator"></div>
                <div class="option-text">${option.text}</div>
            `;
            
            // 如果已选择，标记状态
            if (this.state.answers[questionIndex] === optionIndex) {
                optionElement.classList.add('selected');
            }
            
            // 添加点击事件
            optionElement.addEventListener('click', (e) => {
                this.selectOption(questionIndex, optionIndex);
                Utils.createRipple(optionElement, e);
            });
            
            this.ui.elements.answerContainer.appendChild(optionElement);
        });
    }
    
    // 选择选项
    selectOption(questionIndex, optionIndex) {
        // 记录答案
        this.state.answers[questionIndex] = optionIndex;
        
        // 更新分数
        const question = this.questions[questionIndex];
        const selectedOption = question.options[optionIndex];
        this.state.scores[selectedOption.value]++;
        
        // 更新UI
        const options = this.ui.elements.answerContainer.querySelectorAll('.answer-option');
        options.forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });
        
        // 更新导航按钮
        this.updateNavigationButtons();
        
        // 保存进度
        this.saveProgress();
        
        // 添加选择动画
        if (options[optionIndex]) {
            this.animateOptionSelection(options[optionIndex]);
        }
    }
    
    // 更新进度
    updateProgress() {
        const progress = ((this.state.currentQuestion + 1) / this.questions.length) * 100;
        
        if (this.ui.elements.progressFill) {
            this.ui.elements.progressFill.style.width = `${progress}%`;
        }
        if (this.ui.elements.currentQuestion) {
            this.ui.elements.currentQuestion.textContent = this.state.currentQuestion + 1;
        }
        
        // 更新碎片收集器
        this.updateFragmentCollector();
    }
    
    // 更新碎片收集器
    updateFragmentCollector() {
        const dimensions = ['EI', 'SN', 'TF', 'JP'];
        const questionsPerDimension = APP_CONFIG.TEST.QUESTIONS_PER_DIMENSION;
        
        dimensions.forEach((dimension) => {
            const start = dimensions.indexOf(dimension) * questionsPerDimension;
            const end = start + questionsPerDimension;
            const answered = this.state.answers.slice(start, end).filter(a => a !== null).length;
            
            const fragmentSlot = document.querySelector(`.fragment-slot[data-fragment="${dimension}"]`);
            if (fragmentSlot) {
                if (answered === questionsPerDimension) {
                    fragmentSlot.classList.add('collected');
                } else {
                    fragmentSlot.classList.remove('collected');
                }
            }
        });
    }
    
    // 更新导航按钮
    updateNavigationButtons() {
        if (this.ui.elements.prevBtn) {
            this.ui.elements.prevBtn.disabled = this.state.currentQuestion === 0;
        }
        
        const hasAnswer = this.state.answers[this.state.currentQuestion] !== null;
        if (this.ui.elements.nextBtn) {
            this.ui.elements.nextBtn.disabled = !hasAnswer;
            
            if (this.state.currentQuestion === this.questions.length - 1) {
                this.ui.elements.nextBtn.innerHTML = '<span>查看结果</span><i class="fas fa-check"></i>';
            } else {
                this.ui.elements.nextBtn.innerHTML = '<span>下一题</span><i class="fas fa-chevron-right"></i>';
            }
        }
    }
    
    // 初始化指示点
    initializeIndicatorDots() {
        if (!this.ui.elements.indicatorDots) return;
        
        this.ui.elements.indicatorDots.innerHTML = '';
        
        this.questions.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'indicator-dot';
            dot.dataset.index = index;
            
            dot.addEventListener('click', () => {
                if (this.state.answers[index] !== null) {
                    this.state.currentQuestion = index;
                    this.loadQuestion(index);
                }
            });
            
            this.ui.elements.indicatorDots.appendChild(dot);
        });
    }
    
    // 更新指示点
    updateIndicatorDots() {
        if (!this.ui.elements.indicatorDots) return;
        
        const dots = this.ui.elements.indicatorDots.querySelectorAll('.indicator-dot');
        
        dots.forEach((dot, index) => {
            dot.classList.remove('active', 'completed');
            
            if (index === this.state.currentQuestion) {
                dot.classList.add('active');
            } else if (this.state.answers[index] !== null) {
                dot.classList.add('completed');
            }
        });
    }
    
    // 更新总题数
    updateTotalQuestions() {
        if (this.ui.elements.totalQuestions) {
            this.ui.elements.totalQuestions.textContent = this.questions.length;
        }
    }
    
    // 前往上一题
    goToPreviousQuestion() {
        if (this.state.currentQuestion > 0) {
            this.state.currentQuestion--;
            this.loadQuestion(this.state.currentQuestion);
        }
    }
    
    // 前往下一题
    goToNextQuestion() {
        if (this.state.answers[this.state.currentQuestion] === null) return;
        
        if (this.state.currentQuestion < this.questions.length - 1) {
            this.state.currentQuestion++;
            this.loadQuestion(this.state.currentQuestion);
        } else {
            this.completeTest();
        }
    }
    
    // 暂停测试
    pauseTest() {
        if (this.ui.elements.pauseModal) {
            this.ui.elements.pauseModal.classList.add('active');
        }
    }
    
    // 恢复测试
    resumeTest() {
        if (this.ui.elements.pauseModal) {
            this.ui.elements.pauseModal.classList.remove('active');
        }
    }
    
    // 退出测试
    exitTest() {
        if (confirm('确定要退出测试吗？进度将被保存。')) {
            this.saveProgress();
            
            this.ui.showPage('mainContent');
            this.state.testStarted = false;
            this.state.clearAutoSave();
            
            if (this.ui.elements.pauseModal) {
                this.ui.elements.pauseModal.classList.remove('active');
            }
            
            this.ui.showToast('测试已暂停，进度已保存', 'info');
        }
    }
    
    // 完成测试
    completeTest() {
        this.state.testCompleted = true;
        this.state.clearAutoSave();
        
        // 计算人格类型
        this.calculatePersonalityType();
        
        // 保存结果
        this.saveResults();
        
        // 显示结果
        this.showResults();
        
        // 清除进度
        StorageManager.remove(APP_CONFIG.STORAGE.PROGRESS);
        
        this.ui.showToast('测试完成！正在生成你的专属报告...', 'success');
    }
    
    // 计算人格类型
    calculatePersonalityType() {
        const dimensions = ['EI', 'SN', 'TF', 'JP'];
        let type = '';
        
        dimensions.forEach(dimension => {
            const [first, second] = dimension.split('');
            if (this.state.scores[first] >= this.state.scores[second]) {
                type += first;
            } else {
                type += second;
            }
        });
        
        this.state.personalityType = type;
    }
    
    // 保存进度
    saveProgress() {
        const progressData = {
            currentQuestion: this.state.currentQuestion,
            answers: this.state.answers,
            scores: this.state.scores,
            timestamp: Date.now()
        };
        
        StorageManager.set(APP_CONFIG.STORAGE.PROGRESS, progressData);
    }
    
    // 保存结果
    saveResults() {
        const resultData = {
            personalityType: this.state.personalityType,
            scores: this.state.scores,
            timestamp: Date.now()
        };
        
        StorageManager.set(APP_CONFIG.STORAGE.RESULTS, resultData);
        
        // 添加到历史记录
        this.addToHistory(resultData);
    }
    
    // 添加到历史记录
    addToHistory(result) {
        const history = StorageManager.get(APP_CONFIG.STORAGE.HISTORY, []);
        history.unshift(result);
        
        // 保留最近10次记录
        if (history.length > 10) {
            history.pop();
        }
        
        StorageManager.set(APP_CONFIG.STORAGE.HISTORY, history);
    }
    
    // 检查保存的进度
    checkSavedProgress() {
        const savedProgress = StorageManager.get(APP_CONFIG.STORAGE.PROGRESS);
        
        if (savedProgress) {
            const now = Date.now();
            if (now - savedProgress.timestamp < APP_CONFIG.TEST.PROGRESS_EXPIRY) {
                if (confirm('检测到未完成的测试，是否恢复上次进度？')) {
                    this.state.currentQuestion = savedProgress.currentQuestion;
                    this.state.answers = savedProgress.answers || [];
                    this.state.scores = savedProgress.scores || {
                        E: 0, I: 0,
                        S: 0, N: 0,
                        T: 0, F: 0,
                        J: 0, P: 0
                    };
                    this.startTest();
                }
            } else {
                StorageManager.remove(APP_CONFIG.STORAGE.PROGRESS);
            }
        }
    }
    
    // 处理键盘事件
    handleKeyboard(e) {
        if (!this.state.testStarted || this.state.testCompleted) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                if (this.ui.elements.prevBtn && !this.ui.elements.prevBtn.disabled) {
                    this.goToPreviousQuestion();
                }
                break;
            case 'ArrowRight':
                if (this.ui.elements.nextBtn && !this.ui.elements.nextBtn.disabled) {
                    this.goToNextQuestion();
                }
                break;
            case ' ':
                e.preventDefault();
                if (this.ui.elements.pauseBtn) {
                    this.pauseTest();
                }
                break;
        }
    }
    
    // 动画效果
    animateQuestionEntry() {
        if (!this.ui.elements.answerContainer) return;
        
        const container = this.ui.elements.answerContainer.parentElement;
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.5s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
    
    animateOptionSelection(optionElement) {
        optionElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            optionElement.style.transform = 'scale(1)';
        }, 200);
    }
    
    // 显示结果（由ResultManager处理）
    showResults() {
        // 这个方法将由ResultManager实现
        if (window.personaQuest && window.personaQuest.resultManager) {
            window.personaQuest.resultManager.showResults();
        }
    }
}

// ========== 结果管理器 ==========
class ResultManager {
    constructor(uiManager, appState) {
        this.ui = uiManager;
        this.state = appState;
        this.personalities = getAllPersonalities();
    }
    
    // 初始化
    initialize() {
        this.bindEvents();
    }
    
    // 绑定事件
    bindEvents() {
        // 分享结果
        if (this.ui.elements.shareResult) {
            this.ui.elements.shareResult.addEventListener('click', () => this.shareResults());
        }
        
        // 下载报告
        if (this.ui.elements.downloadReport) {
            this.ui.elements.downloadReport.addEventListener('click', () => this.downloadReport());
        }
        
        // 重新测试
        if (this.ui.elements.restartTest) {
            this.ui.elements.restartTest.addEventListener('click', () => this.restartTest());
        }
        
        // 标签页切换
        this.ui.elements.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
        });
    }
    
    // 显示结果
    showResults() {
        // 切换到结果页面
        this.ui.showPage('resultPage');
        
        // 获取人格数据
        const personality = this.personalities.find(p => p.type === this.state.personalityType);
        
        if (!personality) {
            this.ui.showToast('结果生成失败，请重试', 'error');
            return;
        }
        
        // 渲染结果
        this.renderCharacterReveal(personality);
        this.renderDimensionsAnalysis();
        this.renderDetailedReport(personality);
        
        // 滚动到顶部
        window.scrollTo(0, 0);
    }
    
    // 渲染角色展示
    renderCharacterReveal(personality) {
        if (this.ui.elements.characterAvatar) {
            const avatarEmoji = this.ui.elements.characterAvatar.querySelector('.avatar-emoji');
            if (avatarEmoji) {
                avatarEmoji.textContent = personality.emoji;
            }
        }
        if (this.ui.elements.characterName) {
            this.ui.elements.characterName.textContent = personality.name;
        }
        if (this.ui.elements.characterType) {
            this.ui.elements.characterType.textContent = personality.type;
        }
        if (this.ui.elements.characterQuote) {
            this.ui.elements.characterQuote.innerHTML = `<p>"${personality.quote}"</p>`;
        }
        
        // 添加动画
        if (this.ui.elements.characterReveal) {
            setTimeout(() => {
                this.ui.elements.characterReveal.style.animation = 'fadeInUp 1s ease-out';
            }, 100);
        }
    }
    
    // 渲染维度分析
    renderDimensionsAnalysis() {
        const dimensions = [
            { key: 'EI', left: 'E', right: 'I' },
            { key: 'SN', left: 'S', right: 'N' },
            { key: 'TF', left: 'T', right: 'F' },
            { key: 'JP', left: 'J', right: 'P' }
        ];
        
        dimensions.forEach(dimension => {
            const leftScore = this.state.scores[dimension.left];
            const rightScore = this.state.scores[dimension.right];
            const total = leftScore + rightScore;
            const percentage = total > 0 ? (leftScore / total) * 100 : 50;
            
            const barFill = document.querySelector(`.bar-fill[data-dimension="${dimension.key}"]`);
            const barIndicator = barFill ? barFill.nextElementSibling : null;
            
            if (barFill) {
                setTimeout(() => {
                    barFill.style.width = `${percentage}%`;
                }, 500);
            }
            if (barIndicator) {
                setTimeout(() => {
                    barIndicator.style.left = `${percentage}%`;
                }, 500);
            }
        });
    }
    
    // 渲染详细报告
    renderDetailedReport(personality) {
        // 类型解析
        if (this.ui.elements.typeDescription) {
            this.ui.elements.typeDescription.textContent = personality.description;
        }
        
        // 特质词云
        if (this.ui.elements.traitCloud) {
            this.ui.elements.traitCloud.innerHTML = personality.traits.map(trait => 
                `<span class="trait-tag">${trait}</span>`
            ).join('');
        }
        
        // 优势特长
        if (this.ui.elements.strengthsGrid) {
            this.ui.elements.strengthsGrid.innerHTML = personality.strengths.map(strength => `
                <div class="strength-card">
                    <div class="strength-icon">${strength.icon}</div>
                    <p>${strength.text}</p>
                </div>
            `).join('');
        }
        
        // 成长挑战
        if (this.ui.elements.challengesList) {
            this.ui.elements.challengesList.innerHTML = personality.challenges.map(challenge => `
                <div class="challenge-item">
                    <div class="challenge-icon">${challenge.icon}</div>
                    <p>${challenge.text}</p>
                </div>
            `).join('');
        }
        
        // 职业路径
        if (this.ui.elements.careerMatrix) {
            this.ui.elements.careerMatrix.innerHTML = personality.careers.map(career => `
                <div class="career-item">${career}</div>
            `).join('');
        }
        
        // 关系指南
        if (this.ui.elements.relationshipMap) {
            this.ui.elements.relationshipMap.innerHTML = `
                <div class="relationship-card">
                    <h4>关系概述</h4>
                    <p>${personality.relationships.overview}</p>
                </div>
                <div class="relationship-card">
                    <h4>建议</h4>
                    <p>${personality.relationships.advice}</p>
                </div>
            `;
        }
        
        // 成长任务
        if (this.ui.elements.growthPath) {
            this.ui.elements.growthPath.innerHTML = personality.growth.map(step => `
                <div class="growth-step">
                    <div class="step-number">${step.step}</div>
                    <div class="step-content">
                        <h4>${step.title}</h4>
                        <p>${step.desc}</p>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // 切换标签页
    switchTab(tabName) {
        this.ui.elements.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });
        
        this.ui.elements.tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabName);
        });
    }
    
    // 分享结果
    async shareResults() {
        const personality = this.personalities.find(p => p.type === this.state.personalityType);
        
        const shareText = `我在PersonaQuest发现了我的灵魂角色：${personality.name} (${personality.type})！\n\n${personality.description}\n\n快来探索你的内在宇宙吧！`;
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'PersonaQuest - 探索自我的冒险旅程',
                    text: shareText,
                    url: window.location.href
                });
                this.ui.showToast('分享成功！', 'success');
            } catch (err) {
                if (err.name !== 'AbortError') {
                    this.copyToClipboard(shareText);
                }
            }
        } else {
            this.copyToClipboard(shareText);
        }
    }
    
    // 复制到剪贴板
    copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.ui.showToast('分享内容已复制到剪贴板！', 'success');
        } catch (err) {
            this.ui.showToast('复制失败，请手动复制', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    // 下载报告
    downloadReport() {
        const personality = this.personalities.find(p => p.type === this.state.personalityType);
        
        const reportContent = this.generateReportContent(personality);
        
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        link.href = url;
        link.download = `PersonaQuest-${personality.type}-${personality.name}-报告.txt`;
        link.click();
        
        URL.revokeObjectURL(url);
        
        this.ui.showToast('报告下载成功！', 'success');
    }
    
    // 生成报告内容
    generateReportContent(personality) {
        return `
PersonaQuest 人格分析报告
========================

基本信息
--------
类型：${personality.type} - ${personality.name}
时间：${Utils.formatDate(Date.now())}

类型描述
--------
${personality.description}

核心特质
--------
${personality.traits.map(trait => `• ${trait}`).join('\n')}

优势特长
--------
${personality.strengths.map(s => `• ${s.text}`).join('\n')}

成长挑战
--------
${personality.challenges.map(c => `• ${c.text}`).join('\n')}

适合职业
--------
${personality.careers.map(c => `• ${c}`).join('\n')}

关系指南
--------
${personality.relationships.advice}

成长任务
--------
${personality.growth.map(g => `${g.step}. ${g.title}: ${g.desc}`).join('\n')}

========================
感谢使用 PersonaQuest
探索自我，发现无限可能
    `.trim();
    }
    
    // 重新开始测试
    restartTest() {
        if (confirm('确定要重新开始测试吗？当前结果将被清除。')) {
            this.state.reset();
            
            this.ui.showPage('mainContent');
            window.scrollTo(0, 0);
            
            this.ui.showToast('测试已重置，可以重新开始', 'info');
        }
    }
}

// ========== 画廊管理器 ==========
class GalleryManager {
    constructor(uiManager) {
        this.ui = uiManager;
        this.personalities = getAllPersonalities();
        this.currentFilter = 'all';
    }
    
    // 初始化
    initialize() {
        this.bindEvents();
        this.renderGallery();
    }
    
    // 绑定事件
    bindEvents() {
        // 筛选按钮
        this.ui.elements.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.setFilter(filter);
            });
        });
        
        // 快速预览
        if (this.ui.elements.quickPreview) {
            this.ui.elements.quickPreview.addEventListener('click', () => this.showQuickPreview());
        }
    }
    
    // 设置筛选器
    setFilter(filter) {
        this.currentFilter = filter;
        
        // 更新按钮状态
        this.ui.elements.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // 重新渲染画廊
        this.renderGallery();
    }
    
    // 渲染画廊
    renderGallery() {
        if (!this.ui.elements.personalityGrid) return;
        
        this.ui.elements.personalityGrid.innerHTML = '';
        
        const filteredPersonalities = this.getFilteredPersonalities();
        
        filteredPersonalities.forEach((personality, index) => {
            const card = this.createPersonalityCard(personality, index);
            this.ui.elements.personalityGrid.appendChild(card);
        });
        
        // 添加动画
        setTimeout(() => {
            this.ui.elements.personalityGrid.querySelectorAll('.personality-card').forEach((card, index) => {
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                }, index * APP_CONFIG.ANIMATION.STAGGER_DELAY);
            });
        }, 100);
    }
    
    // 获取筛选后的人格
    getFilteredPersonalities() {
        if (this.currentFilter === 'all') {
            return this.personalities;
        }
        
        return this.personalities.filter(p => {
            // 根据类别筛选
            for (let category in PERSONALITY_DATABASE) {
                if (PERSONALITY_DATABASE[category].includes(p)) {
                    return category === this.currentFilter;
                }
            }
            return false;
        });
    }
    
    // 创建人格卡片
    createPersonalityCard(personality, index) {
        const card = document.createElement('div');
        card.className = 'personality-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="personality-avatar">${personality.emoji}</div>
            <h3 class="personality-name">${personality.name}</h3>
            <p class="personality-type">${personality.type}</p>
            <p class="personality-description">${personality.description}</p>
        `;
        
        // 添加点击事件
        card.addEventListener('click', (e) => {
            this.showPersonalityDetail(personality);
            Utils.createRipple(card, e);
        });
        
        return card;
    }
    
    // 显示人格详情
    showPersonalityDetail(personality) {
        if (!this.ui.elements.personalityModal) return;
        
        const modalBody = this.ui.elements.personalityModal.querySelector('.modal-body');
        if (!modalBody) return;
        
        modalBody.innerHTML = `
            <div class="modal-avatar">${personality.emoji}</div>
            <h2 class="modal-title">${personality.name}</h2>
            <p class="modal-type">${personality.type}</p>
            <p class="modal-description">${personality.description}</p>
            <div class="modal-traits">
                ${personality.traits.map(trait => 
                    `<span class="modal-trait">${trait}</span>`
                ).join('')}
            </div>
        `;
        
        this.ui.elements.personalityModal.classList.add('active');
    }
    
    // 显示快速预览
    showQuickPreview() {
        const randomPersonalities = [...this.personalities].sort(() => 0.5 - Math.random()).slice(0, 3);
        const message = `今日推荐人格：${randomPersonalities.map(p => p.name).join('、')}。快来发现属于你的灵魂角色！`;
        this.ui.showToast(message, 'info');
        
        // 滚动到画廊
        const gallery = document.getElementById('gallery');
        if (gallery) {
            Utils.smoothScrollTo(gallery, 80);
        }
    }
}

// ========== 导航管理器 ==========
class NavigationManager {
    constructor(uiManager, appState) {
        this.ui = uiManager;
        this.state = appState;
    }
    
    // 初始化
    initialize() {
        this.bindEvents();
        this.initializeScrollHandling();
    }
    
    // 绑定事件
    bindEvents() {
        // 移动端菜单切换
        if (this.ui.elements.menuToggle) {
            this.ui.elements.menuToggle.addEventListener('click', () => {
                this.ui.toggleMobileMenu();
            });
        }
        
        // 导航链接点击
        this.ui.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavLinkClick(e));
        });
    }
    
    // 初始化滚动处理
    initializeScrollHandling() {
        window.addEventListener('scroll', Utils.throttle(() => this.handleScroll(), 100));
    }
    
    // 处理导航链接点击
    handleNavLinkClick(e) {
        e.preventDefault();
        
        const link = e.currentTarget;
        const sectionId = link.dataset.section;
        
        if (!sectionId) return;
        
        // 更新活动状态
        this.ui.updateActiveNavLink(sectionId);
        
        // 关闭移动端菜单
        if (Utils.getDeviceType() === 'mobile' && this.ui.elements.navMenu) {
            this.ui.elements.navMenu.classList.remove('active');
        }
        
        // 处理特殊链接
        if (sectionId === 'test') {
            if (window.personaQuest && window.personaQuest.testManager) {
                window.personaQuest.testManager.startTest();
            }
            return;
        }
        
        // 滚动到对应部分
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            Utils.smoothScrollTo(targetSection, 80);
            this.state.currentSection = sectionId;
        }
    }
    
    // 处理滚动事件
    handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 更新导航栏样式
        this.ui.updateNavbar(scrollTop > APP_CONFIG.ANIMATION.SCROLL_THRESHOLD);
        
        // 更新当前部分
        this.updateCurrentSection();
        
        // 添加滚动动画
        this.animateOnScroll();
    }
    
    // 更新当前部分
    updateCurrentSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollTop;
            const sectionHeight = rect.height;
            
            if (scrollTop >= sectionTop - 200 && scrollTop < sectionTop + sectionHeight - 200) {
                this.state.currentSection = section.id;
                this.ui.updateActiveNavLink(section.id);
            }
        });
    }
    
    // 滚动动画
    animateOnScroll() {
        const elements = document.querySelectorAll('.section-title, .personality-card, .feature-card, .timeline-item');
        
        elements.forEach(element => {
            if (Utils.isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
                element.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }
}

// ========== 模态框管理器 ==========
class ModalManager {
    constructor(uiManager) {
        this.ui = uiManager;
        this.activeModal = null;
    }
    
    // 初始化
    initialize() {
        this.bindEvents();
    }
    
    // 绑定事件
    bindEvents() {
        // 关闭按钮
        if (this.ui.elements.modalClose) {
            this.ui.elements.modalClose.addEventListener('click', () => {
                this.closeModal('personalityModal');
            });
        }
        
        // 背景点击关闭
        [this.ui.elements.personalityModal, this.ui.elements.pauseModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal.id);
                    }
                });
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.closeModal(this.activeModal);
            }
        });
    }
    
    // 显示模态框
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            this.activeModal = modalId;
            document.body.style.overflow = 'hidden';
        }
    }
    
    // 关闭模态框
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            this.activeModal = null;
            document.body.style.overflow = '';
        }
    }
    
    // 关闭所有模态框
    closeAllModals() {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        this.activeModal = null;
        document.body.style.overflow = '';
    }
}

// ========== 主应用类 ==========
class PersonaQuestApp {
    constructor() {
        this.state = new AppState();
        this.ui = new UIManager();
        this.navigation = new NavigationManager(this.ui, this.state);
        this.gallery = new GalleryManager(this.ui);
        this.test = new TestManager(this.ui, this.state);
        this.result = new ResultManager(this.ui, this.state);
        this.modal = new ModalManager(this.ui);
        
        // 暴露到全局
        window.personaQuest = this;
    }
    
    // 初始化应用
    async initialize() {
        try {
            // 显示加载屏幕
            this.ui.showLoadingScreen();
            
            // 初始化各个模块
            await Promise.all([
                this.navigation.initialize(),
                this.gallery.initialize(),
                this.test.initialize(),
                this.result.initialize(),
                this.modal.initialize()
            ]);
            
            // 加载设置
            this.loadSettings();
            
            // 检查保存的进度
            this.test.checkSavedProgress();
            
            // 隐藏加载屏幕
            await Utils.delay(1500);
            this.ui.hideLoadingScreen();
            
            // 显示欢迎消息
            this.ui.showToast('欢迎来到PersonaQuest！开始探索你的内在宇宙', 'info');
            
            // 添加全局错误处理
            this.setupErrorHandling();
            
        } catch (error) {
            console.error('App initialization error:', error);
            this.ui.showToast('应用初始化失败，请刷新页面重试', 'error');
        }
    }
    
    // 加载设置
    loadSettings() {
        const settings = StorageManager.get(APP_CONFIG.STORAGE.SETTINGS, {
            soundEnabled: true,
            animationsEnabled: true,
            theme: 'light'
        });
        
        this.state.settings = settings;
    }
    
    // 设置错误处理
    setupErrorHandling() {
        // 全局错误处理
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.ui.showToast('发生了一个错误，请刷新页面重试', 'error');
        });
        
        // 未处理的Promise拒绝
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.ui.showToast('发生了一个错误，请刷新页面重试', 'error');
        });
        
        // 页面卸载前保存
        window.addEventListener('beforeunload', (e) => {
            if (this.state.testStarted && !this.state.testCompleted) {
                this.test.saveProgress();
                e.preventDefault();
                e.returnValue = '';
            }
        });
    }
}

// ========== 应用启动 ==========
// DOM加载完成后启动应用
document.addEventListener('DOMContentLoaded', () => {
    const app = new PersonaQuestApp();
    app.initialize();
});

// 导出模块（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PersonaQuestApp,
        AppState,
        UIManager,
        TestManager,
        ResultManager,
        GalleryManager,
        NavigationManager,
        ModalManager,
        PERSONALITY_DATABASE,
        QUESTION_DATABASE
    };
}
