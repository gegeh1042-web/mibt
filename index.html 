<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PersonaQuest - 探索自我的冒险旅程</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&family=Ma+Shan+Zheng&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <!-- 加载动画 -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-content">
            <div class="loading-orb">
                <div class="orb-inner"></div>
                <div class="orb-particles">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <p class="loading-text">正在准备你的冒险之旅...</p>
        </div>
    </div>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
        <div class="floating-shapes">
            <div class="shape shape-1"></div>
            <div class="shape shape-2"></div>
            <div class="shape shape-3"></div>
            <div class="shape shape-4"></div>
            <div class="shape shape-5"></div>
        </div>
    </div>

    <!-- 导航栏 -->
    <header class="navbar" id="navbar">
        <div class="nav-container">
            <div class="logo">
                <span class="logo-icon">🌟</span>
                <span class="logo-text">PersonaQuest</span>
            </div>
            <nav class="nav-menu" id="navMenu">
                <a href="#home" class="nav-link active" data-section="home">
                    <i class="fas fa-home"></i>
                    <span>首页</span>
                </a>
                <a href="#gallery" class="nav-link" data-section="gallery">
                    <i class="fas fa-users"></i>
                    <span>人格画廊</span>
                </a>
                <a href="#journey" class="nav-link" data-section="journey">
                    <i class="fas fa-route"></i>
                    <span>冒险之旅</span>
                </a>
                <a href="#about" class="nav-link" data-section="about">
                    <i class="fas fa-info-circle"></i>
                    <span>关于MBTI</span>
                </a>
                <a href="#test" class="nav-link" data-section="test">
                    <i class="fas fa-play"></i>
                    <span>开始测试</span>
                </a>
            </nav>
            <button class="menu-toggle" id="menuToggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
        <!-- 首页英雄区 -->
        <section id="home" class="hero-section active">
            <div class="hero-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
            <div class="hero-content">
                <div class="hero-text">
                    <h1 class="hero-title">
                        <span class="title-line">探索内在宇宙</span>
                        <span class="title-line">发现真实自我</span>
                    </h1>
                    <p class="hero-subtitle">
                        在PersonaQuest的奇妙世界里，每一次选择都是一次自我发现的旅程
                    </p>
                    <div class="hero-stats">
                        <div class="stat-item">
                            <span class="stat-number">16</span>
                            <span class="stat-label">种灵魂角色</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">4</span>
                            <span class="stat-label">个维度探索</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">∞</span>
                            <span class="stat-label">种可能</span>
                        </div>
                    </div>
                    <div class="hero-actions">
                        <button class="cta-button primary" id="startJourney">
                            <span class="button-text">开始冒险</span>
                            <span class="button-icon">
                                <i class="fas fa-arrow-right"></i>
                            </span>
                        </button>
                        <button class="cta-button secondary" id="quickPreview">
                            <span class="button-text">快速预览</span>
                            <span class="button-icon">
                                <i class="fas fa-eye"></i>
                            </span>
                        </button>
                    </div>
                </div>
                <div class="hero-visual">
                    <div class="hero-orb-container">
                        <div class="hero-orb main-orb"></div>
                        <div class="hero-orb orbit-orb orbit-1"></div>
                        <div class="hero-orb orbit-orb orbit-2"></div>
                        <div class="hero-orb orbit-orb orbit-3"></div>
                    </div>
                    <div class="hero-quote">
                        <p>"认识你自己"</p>
                        <span>— 古希腊箴言</span>
                    </div>
                </div>
            </div>
            <div class="scroll-indicator">
                <span>向下滚动</span>
                <i class="fas fa-chevron-down"></i>
            </div>
        </section>

        <!-- 人格画廊 -->
        <section id="gallery" class="gallery-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="title-bg">灵魂角色画廊</span>
                    <span class="title-text">灵魂角色画廊</span>
                </h2>
                <p class="section-subtitle">16种独特人格，16个精彩故事</p>
            </div>
            
            <!-- 人格分类标签 -->
            <div class="personality-filters">
                <button class="filter-btn active" data-filter="all">全部</button>
                <button class="filter-btn" data-filter="analysts">分析师</button>
                <button class="filter-btn" data-filter="diplomats">外交家</button>
                <button class="filter-btn" data-filter="sentinels">守护者</button>
                <button class="filter-btn" data-filter="explorers">探险家</button>
            </div>

            <div class="personality-grid" id="personalityGrid">
                <!-- 动态生成人格卡片 -->
            </div>
        </section>

        <!-- 冒险之旅介绍 -->
        <section id="journey" class="journey-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="title-bg">冒险之旅</span>
                    <span class="title-text">冒险之旅</span>
                </h2>
                <p class="section-subtitle">一场与众不同的自我探索体验</p>
            </div>
            
            <div class="journey-timeline">
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas fa-compass"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>情景化问答</h3>
                        <p>通过生动的故事情景，自然展现你的真实选择倾向</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas fa-puzzle-piece"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>碎片收集</h3>
                        <p>每完成一个维度，收集一片人格碎片，逐步拼出完整自我</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>角色解锁</h3>
                        <p>完成测试，解锁属于你的独特灵魂角色和专属故事</p>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">
                        <i class="fas fa-book"></i>
                    </div>
                    <div class="timeline-content">
                        <h3>深度解析</h3>
                        <p>获得详细的个人报告，了解优势、挑战和成长路径</p>
                    </div>
                </div>
            </div>

            <div class="journey-features">
                <div class="feature-card">
                    <div class="feature-visual">
                        <div class="feature-icon">
                            <i class="fas fa-palette"></i>
                        </div>
                    </div>
                    <h3>治愈系画风</h3>
                    <p>柔和的色彩和流畅的动画，带来舒适的视觉体验</p>
                </div>
                <div class="feature-card">
                    <div class="feature-visual">
                        <div class="feature-icon">
                            <i class="fas fa-mobile-alt"></i>
                        </div>
                    </div>
                    <h3>全端适配</h3>
                    <p>完美适配各种设备，随时随地开始你的探索之旅</p>
                </div>
                <div class="feature-card">
                    <div class="feature-visual">
                        <div class="feature-icon">
                            <i class="fas fa-share-alt"></i>
                        </div>
                    </div>
                    <h3>社交分享</h3>
                    <p>轻松分享你的灵魂角色，与朋友一起探索人格奥秘</p>
                </div>
            </div>
        </section>

        <!-- MBTI科普 -->
        <section id="about" class="about-section">
            <div class="section-header">
                <h2 class="section-title">
                    <span class="title-bg">了解MBTI</span>
                    <span class="title-text">了解MBTI</span>
                </h2>
                <p class="section-subtitle">探索人格类型的科学基础</p>
            </div>

            <div class="about-container">
                <div class="about-intro">
                    <div class="intro-text">
                        <h3>什么是MBTI？</h3>
                        <p>MBTI（Myers-Briggs Type Indicator）是一种人格评估工具，基于卡尔·荣格的心理类型理论。它通过四个维度的不同偏好，将人格分为16种类型。</p>
                    </div>
                    <div class="intro-visual">
                        <div class="mbti-cube">
                            <div class="cube-face front">E/I</div>
                            <div class="cube-face back">S/N</div>
                            <div class="cube-face right">T/F</div>
                            <div class="cube-face left">J/P</div>
                            <div class="cube-face top">MBTI</div>
                            <div class="cube-face bottom"></div>
                        </div>
                    </div>
                </div>

                <div class="dimensions-grid">
                    <div class="dimension-card">
                        <div class="dimension-header">
                            <div class="dimension-icon">
                                <i class="fas fa-battery-full"></i>
                            </div>
                            <h4>能量来源</h4>
                        </div>
                        <div class="dimension-options">
                            <div class="option">
                                <span class="option-letter">E</span>
                                <span class="option-text">外向 (Extraversion)</span>
                                <span class="option-desc">从外部世界获得能量</span>
                            </div>
                            <div class="option">
                                <span class="option-letter">I</span>
                                <span class="option-text">内向 (Introversion)</span>
                                <span class="option-desc">从内心世界获得能量</span>
                            </div>
                        </div>
                    </div>

                    <div class="dimension-card">
                        <div class="dimension-header">
                            <div class="dimension-icon">
                                <i class="fas fa-eye"></i>
                            </div>
                            <h4>认知方式</h4>
                        </div>
                        <div class="dimension-options">
                            <div class="option">
                                <span class="option-letter">S</span>
                                <span class="option-text">实感 (Sensing)</span>
                                <span class="option-desc">关注具体事实和细节</span>
                            </div>
                            <div class="option">
                                <span class="option-letter">N</span>
                                <span class="option-text">直觉 (Intuition)</span>
                                <span class="option-desc">关注模式和可能性</span>
                            </div>
                        </div>
                    </div>

                    <div class="dimension-card">
                        <div class="dimension-header">
                            <div class="dimension-icon">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                            <h4>决策方式</h4>
                        </div>
                        <div class="dimension-options">
                            <div class="option">
                                <span class="option-letter">T</span>
                                <span class="option-text">思考 (Thinking)</span>
                                <span class="option-desc">基于逻辑和客观分析</span>
                            </div>
                            <div class="option">
                                <span class="option-letter">F</span>
                                <span class="option-text">情感 (Feeling)</span>
                                <span class="option-desc">基于价值观和他人感受</span>
                            </div>
                        </div>
                    </div>

                    <div class="dimension-card">
                        <div class="dimension-header">
                            <div class="dimension-icon">
                                <i class="fas fa-compass"></i>
                            </div>
                            <h4>生活方式</h4>
                        </div>
                        <div class="dimension-options">
                            <div class="option">
                                <span class="option-letter">J</span>
                                <span class="option-text">判断 (Judging)</span>
                                <span class="option-desc">喜欢计划和结构</span>
                            </div>
                            <div class="option">
                                <span class="option-letter">P</span>
                                <span class="option-text">感知 (Perceiving)</span>
                                <span class="option-desc">喜欢灵活和开放</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- 测试页面（初始隐藏） -->
    <div id="testPage" class="test-page hidden">
        <!-- 测试头部 -->
        <div class="test-header">
            <div class="test-progress">
                <div class="progress-info">
                    <span class="progress-label">探索进度</span>
                    <span class="progress-text">
                        <span id="currentQuestion">1</span> / <span id="totalQuestions">20</span>
                    </span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                    <div class="progress-glow"></div>
                </div>
            </div>
            
            <!-- 人格碎片收集器 -->
            <div class="fragment-collector">
                <div class="fragment-slot" data-fragment="EI">
                    <div class="fragment-outer">
                        <div class="fragment-inner"></div>
                        <span class="fragment-label">EI</span>
                    </div>
                </div>
                <div class="fragment-slot" data-fragment="SN">
                    <div class="fragment-outer">
                        <div class="fragment-inner"></div>
                        <span class="fragment-label">SN</span>
                    </div>
                </div>
                <div class="fragment-slot" data-fragment="TF">
                    <div class="fragment-outer">
                        <div class="fragment-inner"></div>
                        <span class="fragment-label">TF</span>
                    </div>
                </div>
                <div class="fragment-slot" data-fragment="JP">
                    <div class="fragment-outer">
                        <div class="fragment-inner"></div>
                        <span class="fragment-label">JP</span>
                    </div>
                </div>
            </div>

            <!-- 暂停按钮 -->
            <button class="pause-btn" id="pauseBtn">
                <i class="fas fa-pause"></i>
                <span>暂停</span>
            </button>
        </div>

        <!-- 题目容器 -->
        <div class="question-container">
            <div class="question-scene">
                <div class="scene-background" id="sceneBackground"></div>
                <div class="scene-illustration" id="sceneIllustration"></div>
                <div class="scene-particles">
                    <div class="particle"></div>
                    <div class="particle"></div>
                    <div class="particle"></div>
                </div>
            </div>
            
            <div class="question-content">
                <div class="question-header">
                    <h2 class="question-title" id="questionTitle"></h2>
                    <div class="question-type" id="questionType"></div>
                </div>
                <p class="question-description" id="questionDescription"></p>
                
                <div class="answer-container" id="answerContainer">
                    <!-- 动态生成不同类型的答案选项 -->
                </div>
            </div>
        </div>

        <!-- 导航控制 -->
        <div class="test-navigation">
            <button class="nav-btn prev-btn" id="prevBtn" disabled>
                <i class="fas fa-chevron-left"></i>
                <span>上一题</span>
            </button>
            
            <div class="question-indicator">
                <div class="indicator-dots" id="indicatorDots">
                    <!-- 动态生成指示点 -->
                </div>
            </div>
            
            <button class="nav-btn next-btn" id="nextBtn" disabled>
                <span>下一题</span>
                <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>

    <!-- 结果页面（初始隐藏） -->
    <div id="resultPage" class="result-page hidden">
        <div class="result-background">
            <div class="result-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
            </div>
        </div>

        <div class="result-container">
            <!-- 角色解锁动画 -->
            <div class="character-reveal">
                <div class="reveal-animation">
                    <div class="reveal-circle"></div>
                    <div class="character-avatar" id="characterAvatar">
                        <div class="avatar-glow"></div>
                        <span class="avatar-emoji"></span>
                    </div>
                </div>
                <div class="character-info">
                    <h1 class="character-name" id="characterName"></h1>
                    <p class="character-type" id="characterType"></p>
                    <div class="character-quote" id="characterQuote"></div>
                </div>
            </div>

            <!-- 人格维度分析 -->
            <div class="dimensions-analysis">
                <h3 class="analysis-title">人格维度分析</h3>
                <div class="dimension-bars">
                    <div class="dimension-bar">
                        <div class="bar-label">
                            <span>外向 E</span>
                            <span>内向 I</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" data-dimension="EI"></div>
                            <div class="bar-indicator"></div>
                        </div>
                    </div>
                    <div class="dimension-bar">
                        <div class="bar-label">
                            <span>实感 S</span>
                            <span>直觉 N</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" data-dimension="SN"></div>
                            <div class="bar-indicator"></div>
                        </div>
                    </div>
                    <div class="dimension-bar">
                        <div class="bar-label">
                            <span>思考 T</span>
                            <span>情感 F</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" data-dimension="TF"></div>
                            <div class="bar-indicator"></div>
                        </div>
                    </div>
                    <div class="dimension-bar">
                        <div class="bar-label">
                            <span>判断 J</span>
                            <span>感知 P</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" data-dimension="JP"></div>
                            <div class="bar-indicator"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 详细报告 -->
            <div class="report-section">
                <div class="report-tabs">
                    <button class="tab-btn active" data-tab="overview">
                        <i class="fas fa-user"></i>
                        <span>类型解析</span>
                    </button>
                    <button class="tab-btn" data-tab="strengths">
                        <i class="fas fa-star"></i>
                        <span>优势特长</span>
                    </button>
                    <button class="tab-btn" data-tab="challenges">
                        <i class="fas fa-mountain"></i>
                        <span>成长挑战</span>
                    </button>
                    <button class="tab-btn" data-tab="career">
                        <i class="fas fa-briefcase"></i>
                        <span>职业路径</span>
                    </button>
                    <button class="tab-btn" data-tab="relationships">
                        <i class="fas fa-heart"></i>
                        <span>关系指南</span>
                    </button>
                    <button class="tab-btn" data-tab="growth">
                        <i class="fas fa-seedling"></i>
                        <span>成长任务</span>
                    </button>
                </div>

                <div class="tab-content">
                    <div class="tab-pane active" id="overview">
                        <div class="content-card">
                            <h3>你的灵魂角色</h3>
                            <p id="typeDescription"></p>
                            <div class="trait-cloud" id="traitCloud">
                                <!-- 动态生成特质词云 -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane" id="strengths">
                        <div class="content-card">
                            <h3>与生俱来的天赋</h3>
                            <div class="strengths-grid" id="strengthsGrid">
                                <!-- 动态生成优势卡片 -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane" id="challenges">
                        <div class="content-card">
                            <h3>成长的方向</h3>
                            <div class="challenges-list" id="challengesList">
                                <!-- 动态生成挑战列表 -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane" id="career">
                        <div class="content-card">
                            <h3>适合的职业领域</h3>
                            <div class="career-matrix" id="careerMatrix">
                                <!-- 动态生成职业矩阵 -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane" id="relationships">
                        <div class="content-card">
                            <h3>人际关系指南</h3>
                            <div class="relationship-map" id="relationshipMap">
                                <!-- 动态生成关系地图 -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="tab-pane" id="growth">
                        <div class="content-card">
                            <h3>个人成长任务</h3>
                            <div class="growth-path" id="growthPath">
                                <!-- 动态生成成长路径 -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 分享功能区 -->
            <div class="share-section">
                <div class="share-options">
                    <button class="share-btn" id="shareResult">
                        <i class="fas fa-share-alt"></i>
                        <span>分享结果</span>
                    </button>
                    <button class="download-btn" id="downloadReport">
                        <i class="fas fa-download"></i>
                        <span>下载报告</span>
                    </button>
                    <button class="restart-btn" id="restartTest">
                        <i class="fas fa-redo"></i>
                        <span>重新测试</span>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- 人格详情模态框 -->
    <div class="modal" id="personalityModal">
        <div class="modal-content">
            <button class="modal-close" id="modalClose">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-body">
                <div class="modal-avatar"></div>
                <h2 class="modal-title"></h2>
                <p class="modal-type"></p>
                <p class="modal-description"></p>
                <div class="modal-traits"></div>
            </div>
        </div>
    </div>

    <!-- 暂停模态框 -->
    <div class="modal" id="pauseModal">
        <div class="modal-content">
            <h2>测试暂停</h2>
            <p>你的进度已自动保存，可以随时继续测试</p>
            <div class="modal-actions">
                <button class="btn-secondary" id="resumeTest">继续测试</button>
                <button class="btn-primary" id="exitTest">退出测试</button>
            </div>
        </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-info">
                <p>&copy; 2024 PersonaQuest. 探索自我，发现无限可能。</p>
                <p class="footer-note">本测试仅供参考，不作为专业心理诊断依据</p>
            </div>
            <div class="footer-links">
                <a href="#" class="footer-link">隐私政策</a>
                <a href="#" class="footer-link">使用条款</a>
                <a href="#" class="footer-link">联系我们</a>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
