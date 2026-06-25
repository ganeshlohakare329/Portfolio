/* ==========================================================================
   Lohakare Ganesh - Main Portfolio Operations
   Includes: Typing animation, hamburger drawer, filters, command palette, case studies modal, testimonials, loader
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Hide Loading Screen
    // ==========================================
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Trigger Hero text reveal after loader is gone
                const heroTexts = document.querySelectorAll('#hero .reveal-text, #hero .reveal-fade, #hero .reveal-scale');
                heroTexts.forEach(el => el.classList.add('animated'));
            }, 500);
        }
    });
    
    // Safety fallback in case window load event doesn't fire
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 3000);

    // ==========================================
    // 2. Mobile Drawer Navigation
    // ==========================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Scroll spy for navigation highlighting
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSectionId = sec.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. Custom Typing Animation (Lightweight)
    // ==========================================
    const typedSpan = document.getElementById('typed-text');
    if (typedSpan) {
        const roles = [
            'Data Analyst.',
            'Computer Engineer.',
            'Machine Learning Enthusiast.',
            'Problem Solver.'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        const typeEffect = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                // Deleting text
                typedSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster deleting
            } else {
                // Writing text
                typedSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            // Handle limits
            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end of word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before writing next word
            }
            
            setTimeout(typeEffect, typeSpeed);
        };
        
        // Start after brief delay
        setTimeout(typeEffect, 1000);
    }

    // ==========================================
    // 4. Project Filters & Search Functionality
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectSearch = document.getElementById('projectSearch');
    
    function applyFilterAndSearch() {
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        const searchQuery = projectSearch ? projectSearch.value.toLowerCase().trim() : '';
        
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-categories').split(' ');
            const cardTitle = card.querySelector('.project-title').textContent.toLowerCase();
            const cardDesc = card.querySelector('.project-desc').textContent.toLowerCase();
            const cardTags = Array.from(card.querySelectorAll('.project-tags .tag')).map(t => t.textContent.toLowerCase());
            
            // Check matches
            const categoryMatch = (activeFilter === 'all' || categories.includes(activeFilter));
            const searchMatch = (
                searchQuery === '' || 
                cardTitle.includes(searchQuery) || 
                cardDesc.includes(searchQuery) ||
                cardTags.some(tag => tag.includes(searchQuery))
            );
            
            if (categoryMatch && searchMatch) {
                card.style.display = 'flex';
                // Trigger animation reset if needed
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilterAndSearch();
        });
    });
    
    if (projectSearch) {
        projectSearch.addEventListener('input', applyFilterAndSearch);
    }

    // ==========================================
    // 5. Testimonials Slider Logic
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlideIndex = 0;
    let slideTimer;

    if (slides.length > 0) {
        // Generate dots
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.dot');
        
        function updateSlideUI() {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[currentSlideIndex].classList.add('active');
            dots[currentSlideIndex].classList.add('active');
        }
        
        function goToSlide(index) {
            currentSlideIndex = index;
            updateSlideUI();
            resetTimer();
        }
        
        function nextSlide() {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlideUI();
        }
        
        function prevSlide() {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlideUI();
        }
        
        function resetTimer() {
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, 6000);
        }
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        resetTimer();
    }

    // ==========================================
    // 6. Project Case Studies & Lightbox
    // ==========================================
    const projectLightbox = document.getElementById('projectLightbox');
    const lightboxBody = document.getElementById('lightboxBody');
    const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const projectDetailBtns = document.querySelectorAll('.btn-project-details');
    const previewResumeBtn = document.getElementById('previewResumeBtn');
    const previewCertBtns = document.querySelectorAll('.preview-cert-btn');

    // Project metadata dictionary
    const projectDetails = {
        weed: {
            title: "Laser-Based Weed Removal System",
            category: "Computer Vision & Hardware Integration",
            client: "Sanjivani COE Agriculture R&D",
            timeline: "2024 - 2025",
            stack: ["YOLOv8", "OpenCV", "Python", "Arduino", "CNC Machining"],
            problem: "Traditional farming relies on chemical herbicides that pollute soils, damage water tables, and incur significant recurring costs for farmers. Hand weeding is labor-intensive and expensive.",
            solution: "We designed a robotic machine integrating an AI camera framework. The system processes fields in real-time, identifies weed foliage, and sends precise coordinates to a 3-axis CNC gantry controlling a targeted surgical thermal laser to incinerate the weed base.",
            features: [
                "Real-time object classification and segmentation using customized YOLOv8 models.",
                "High-speed image processing pipeline via OpenCV to generate coordinate arrays.",
                "Sub-millimeter hardware coordination translating pixel coordinates to physical motor movements via Arduino controllers.",
                "Sustainable mechanical weeding with 0% chemical footprint."
            ],
            github: "https://github.com/ganeshlohakare329",
            demo: "#"
        },
        fraud: {
            title: "FraudX – Credit Card Fraud Detection",
            category: "Data Science & Machine Learning",
            client: "Academic Capstone Project",
            timeline: "2025",
            stack: ["Python", "Random Forest", "Scikit-Learn", "SMOTE", "Pandas"],
            problem: "Financial institutions lose billions annually to credit card fraud. Detecting anomalous behaviors inside millions of normal data transactions requires speed, high recall, and exceptionally low false-positive rates.",
            solution: "Developed an end-to-end Machine Learning pipeline utilizing Random Forest algorithms. Implemented SMOTE (Synthetic Minority Over-sampling Technique) to resolve extreme transaction class imbalances (99.8% normal vs 0.2% fraud), yielding a robust classification engine.",
            features: [
                "Analyzed data streams containing over 285,000 transaction records.",
                "Rigorous preprocessing mapping mathematical features, scaling amounts, and resolving duplicates.",
                "Mitigated high false-positive alarms using custom probability decision boundaries.",
                "Achieved 94.2% recall for fraud cases with high overall model reliability."
            ],
            github: "https://github.com/ganeshlohakare329",
            demo: "#"
        },
        churn: {
            title: "Customer Churn Analytics",
            category: "Data Visualization & Dashboarding",
            client: "Corporate Simulation Study",
            timeline: "2026",
            stack: ["Power BI", "Excel Analytics", "SQL Server", "Data Preprocessing"],
            problem: "A subscription-based service company was experiencing unexplained customer churn, losing key accounts to competitors without identifying core churn predictors.",
            solution: "Cleaned and joined multiple disparate tables (demographics, billing, activity logs) totaling 10,000+ records. Built an interactive Power BI dashboard tracking KPIs, customer risk scores, and attrition factors, allowing retention teams to address accounts proactively.",
            features: [
                "Engineered robust SQL views to perform ETL on legacy billing transaction records.",
                "Created dynamic DAX queries in Power BI to calculate running churn percentages.",
                "Segmented profiles by contracts, payment methods, and technical support requests.",
                "Provided critical business insights that helped retention managers target high-risk clients, reducing customer loss indicators."
            ],
            github: "https://github.com/ganeshlohakare329",
            demo: "#"
        }
    };

    function openLightbox(contentHtml) {
        if (projectLightbox && lightboxBody) {
            lightboxBody.innerHTML = contentHtml;
            projectLightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Block background scroll
        }
    }

    function closeLightbox() {
        if (projectLightbox) {
            projectLightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Bind Case Study buttons
    projectDetailBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectKey = btn.getAttribute('data-project');
            const data = projectDetails[projectKey];
            if (!data) return;
            
            const tagsHtml = data.stack.map(tag => `<span class="tag">${tag}</span>`).join('');
            const bulletsHtml = data.features.map(f => `<li>${f}</li>`).join('');
            
            const html = `
                <div class="lightbox-case-study">
                    <h3>${data.title}</h3>
                    <span class="cs-tag">${data.category}</span>
                    
                    <div class="cs-meta-grid">
                        <div class="cs-meta-item">
                            <span>Client / Scope</span>
                            <p>${data.client}</p>
                        </div>
                        <div class="cs-meta-item">
                            <span>Project Timeline</span>
                            <p>${data.timeline}</p>
                        </div>
                    </div>
                    
                    <h4>The Problem</h4>
                    <p>${data.problem}</p>
                    
                    <h4>The Solution</h4>
                    <p>${data.solution}</p>
                    
                    <h4>Key Features & Metrics</h4>
                    <ul>
                        ${bulletsHtml}
                    </ul>
                    
                    <h4>Tech Stack</h4>
                    <div class="project-tags" style="margin-top: 10px;">
                        ${tagsHtml}
                    </div>
                    
                    <div class="cs-actions">
                        <a href="${data.github}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> View GitHub Repo</a>
                        <button class="btn btn-secondary" onclick="document.getElementById('projectLightbox').classList.remove('active'); document.body.style.overflow='';"><i class="fa-solid fa-xmark"></i> Close Preview</button>
                    </div>
                </div>
            `;
            
            openLightbox(html);
        });
    });

    // Quick View Resume
    if (previewResumeBtn) {
        previewResumeBtn.addEventListener('click', () => {
            const html = `
                <div class="lightbox-case-study text-center" style="text-align: center;">
                    <h3>Lohakare Ganesh - Curriculum Vitae</h3>
                    <span class="cs-tag">Professional Resume</span>
                    <p style="margin-bottom: 24px;">Below is a preview of my resume. You can also download the full PDF to your device.</p>
                    <div style="background: var(--primary-light); padding: 40px; border-radius: var(--border-radius-md); border: 1px dashed var(--primary); margin-bottom: 24px;">
                        <i class="fa-regular fa-file-pdf" style="font-size: 4rem; color: var(--primary); margin-bottom: 16px;"></i>
                        <h4 style="margin-top: 0;">Lohakare_Ganesh_Resume.pdf</h4>
                        <p style="font-size: 0.9rem;">B.Tech Computer Engineering Candidate | Data Analyst Intern</p>
                    </div>
                    <div class="cs-actions" style="justify-content: center;">
                        <a href="assets/resume/Lohakare_Ganesh_Resume.pdf" download class="btn btn-primary"><i class="fa-solid fa-download"></i> Download PDF</a>
                        <button class="btn btn-secondary" onclick="document.getElementById('projectLightbox').classList.remove('active'); document.body.style.overflow='';"><i class="fa-solid fa-xmark"></i> Close Preview</button>
                    </div>
                </div>
            `;
            openLightbox(html);
        });
    }

    // Quick View Certifications
    const certDetails = {
        ds_ai: {
            title: "Data Science & AI Training Certificate",
            issuer: "Sanjivani COE (2025)",
            desc: "Focus areas: Python Programming, Data cleaning modules, exploratory plots, regression models, classification metrics, artificial neural networks, and decision tree structures."
        },
        python_ds: {
            title: "Python for Data Science",
            issuer: "Great Learning Academy (2024)",
            desc: "Focus areas: NumPy multi-dimensional arrays, Pandas Series & DataFrames, file extraction, data cleansing methods, and visualization parameters using Matplotlib."
        }
    };

    previewCertBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const certKey = btn.getAttribute('data-cert');
            const data = certDetails[certKey];
            if (!data) return;
            
            const html = `
                <div class="lightbox-case-study text-center" style="text-align: center;">
                    <h3>${data.title}</h3>
                    <span class="cs-tag">Verified Credential</span>
                    <p style="margin-bottom: 24px;">Issued by ${data.issuer}</p>
                    <div style="background: var(--primary-light); padding: 40px; border-radius: var(--border-radius-md); border: 1px solid var(--border-color); margin-bottom: 24px;">
                        <i class="fa-solid fa-graduation-cap" style="font-size: 4rem; color: var(--primary); margin-bottom: 16px;"></i>
                        <h4 style="margin-top: 0; font-weight: 800;">${data.title}</h4>
                        <p style="font-size: 0.95rem; max-width: 500px; margin: 8px auto 0; color: var(--text-muted);">${data.desc}</p>
                    </div>
                    <div class="cs-actions" style="justify-content: center;">
                        <button class="btn btn-secondary" onclick="document.getElementById('projectLightbox').classList.remove('active'); document.body.style.overflow='';"><i class="fa-solid fa-xmark"></i> Close Preview</button>
                    </div>
                </div>
            `;
            openLightbox(html);
        });
    });

    // Close lightbox events
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // ==========================================
    // 7. Command Palette Modal (Ctrl + K)
    // ==========================================
    const cmdModal = document.getElementById('cmdModal');
    const cmdOverlay = document.getElementById('cmdOverlay');
    const cmdInput = document.getElementById('cmdInput');
    const cmdBtn = document.getElementById('cmdBtn');
    const cmdItems = document.querySelectorAll('.cmd-item');
    
    let activeCmdIndex = 0;

    function openCmdPalette() {
        if (cmdModal && cmdInput) {
            cmdModal.classList.add('active');
            cmdInput.value = '';
            cmdInput.focus();
            activeCmdIndex = 0;
            updateCmdSelection();
            document.body.style.overflow = 'hidden';
            filterCmdItems();
        }
    }

    function closeCmdPalette() {
        if (cmdModal) {
            cmdModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function updateCmdSelection() {
        const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
        cmdItems.forEach(item => item.classList.remove('selected'));
        if (visibleItems.length > 0) {
            if (activeCmdIndex >= visibleItems.length) activeCmdIndex = visibleItems.length - 1;
            if (activeCmdIndex < 0) activeCmdIndex = 0;
            visibleItems[activeCmdIndex].classList.add('selected');
            visibleItems[activeCmdIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    function filterCmdItems() {
        const query = cmdInput.value.toLowerCase();
        let visibleCount = 0;
        
        cmdItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });
        
        activeCmdIndex = 0;
        updateCmdSelection();
    }

    // Event listener for shortcut keys
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            if (cmdModal.classList.contains('active')) {
                closeCmdPalette();
            } else {
                openCmdPalette();
            }
        }
        
        if (cmdModal && cmdModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeCmdPalette();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
                if (visibleItems.length > 0) {
                    activeCmdIndex = (activeCmdIndex + 1) % visibleItems.length;
                    updateCmdSelection();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const visibleItems = Array.from(cmdItems).filter(item => item.style.display !== 'none');
                if (visibleItems.length > 0) {
                    activeCmdIndex = (activeCmdIndex - 1 + visibleItems.length) % visibleItems.length;
                    updateCmdSelection();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedItem = cmdModal.querySelector('.cmd-item.selected');
                if (selectedItem) {
                    triggerCmdAction(selectedItem.getAttribute('data-action'));
                }
            }
        }
    });

    if (cmdBtn) cmdBtn.addEventListener('click', openCmdPalette);
    if (cmdOverlay) cmdOverlay.addEventListener('click', closeCmdPalette);
    if (cmdInput) {
        cmdInput.addEventListener('input', filterCmdItems);
    }
    // Bind click events on command items
    cmdItems.forEach(item => {
        item.addEventListener('click', () => {
            triggerCmdAction(item.getAttribute('data-action'));
        });
    });

    function triggerCmdAction(action) {
        closeCmdPalette();
        
        if (!action) return;
        
        if (action === 'toggle-theme') {
            const toggleBtn = document.getElementById('themeToggleBtn');
            if (toggleBtn) toggleBtn.click();
        } else if (action === 'download-resume') {
            const dlBtn = document.getElementById('resumeDownloadBtn');
            if (dlBtn) dlBtn.click();
        } else {
            // Scroll to section action
            const section = document.getElementById(action);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    // ==========================================
    // 8. Profile Image Fallback (SVG)
    // ==========================================
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', () => {
            const fallbackSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240" width="100%" height="100%" style="background: linear-gradient(135deg, hsl(200, 100%, 95%) 0%, hsl(205, 90%, 88%) 100%); border-radius: 16px;">
                <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="hsl(200, 100%, 55%)" />
                        <stop offset="100%" stop-color="hsl(220, 100%, 65%)" />
                    </linearGradient>
                </defs>
                <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(14, 165, 233, 0.2)" stroke-width="2"/>
                <circle cx="100" cy="100" r="65" fill="none" stroke="rgba(14, 165, 233, 0.15)" stroke-width="1.5" stroke-dasharray="5 5"/>
                <path d="M 30,100 L 170,100" stroke="rgba(14, 165, 233, 0.1)" stroke-width="1"/>
                <path d="M 100,30 L 100,170" stroke="rgba(14, 165, 233, 0.1)" stroke-width="1"/>
                
                <!-- Face/Head -->
                <circle cx="100" cy="85" r="28" fill="url(#avatarGrad)"/>
                <!-- Torso -->
                <path d="M 52,165 C 52,135 73,125 100,125 C 127,125 148,135 148,165 C 148,175 140,185 100,185 C 60,185 52,175 52,165 Z" fill="hsl(202, 90%, 40%)"/>
                
                <!-- Code Elements -->
                <text x="35" y="60" font-family="monospace" font-size="12" fill="hsl(200, 90%, 30%)" font-weight="bold">&lt;/&gt;</text>
                <text x="145" y="60" font-family="monospace" font-size="12" fill="hsl(200, 90%, 30%)" font-weight="bold">{ }</text>
                <text x="30" y="125" font-family="monospace" font-size="10" fill="hsl(200, 90%, 30%)" font-weight="bold">f(x)</text>
                <text x="145" y="125" font-family="monospace" font-size="10" fill="hsl(200, 90%, 30%)" font-weight="bold">SQL</text>
            </svg>
            `;
            const wrapper = profileImg.parentElement;
            if (wrapper) {
                profileImg.style.display = 'none';
                const svgContainer = document.createElement('div');
                svgContainer.innerHTML = fallbackSvg;
                svgContainer.style.width = '100%';
                svgContainer.style.height = '100%';
                wrapper.appendChild(svgContainer);
            }
        });
    }
});

