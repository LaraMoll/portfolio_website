/**
 * LARA MOLLAOGLU — PORTFOLIO JAVASCRIPT
 * Multi-page support, theme persistence, torn-paper intro, lightbox & gallery
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initPalette();
  initIntroModal();
  initProjectModals();
  initProjectSpotlight();
  initGalleryFilter();
  initLightbox();
  initHeroProjectSwitcher();
  initCozyFarmSpotlight();
  initContactPage();
});

/* ==========================================================================
   PALETTE SWITCHER (3 Curated Cafe Harmonized Palettes)
   - palette1: Strawberry Matcha Cafe (Warm Linen, Slate-Ink, Rose & Matcha)
   - palette2: Lavender Bookshop & Matcha (Antique Paper, Berry Slate & Lilac)
   - palette3: Vanilla Cream & Rose Latte (Vanilla Custard, Slate-Teal & Butterscotch)
   ========================================================================== */
function initPalette() {
  const paletteToggleBtn = document.getElementById('paletteToggleBtn');
  const paletteLabel = document.getElementById('paletteLabel');
  const htmlRoot = document.documentElement;

  const paletteNames = {
    palette1: 'Strawberry Matcha',
    palette2: 'Lavender Bookshop',
    palette3: 'Vanilla Rose Latte'
  };

  const savedPalette = localStorage.getItem('lara_color_palette') || 'palette1';
  setPalette(savedPalette);

  if (paletteToggleBtn) {
    paletteToggleBtn.addEventListener('click', () => {
      const current = htmlRoot.getAttribute('data-palette') || 'palette1';
      let next = 'palette1';
      if (current === 'palette1') next = 'palette2';
      else if (current === 'palette2') next = 'palette3';
      else next = 'palette1';
      setPalette(next);
    });
  }

  function setPalette(palette) {
    const validPalette = ['palette1', 'palette2', 'palette3'].includes(palette) ? palette : 'palette1';
    htmlRoot.setAttribute('data-palette', validPalette);
    localStorage.setItem('lara_color_palette', validPalette);
    if (paletteLabel) {
      paletteLabel.textContent = paletteNames[validPalette] || '1. Strawberry Matcha';
    }
    if (paletteToggleBtn) {
      paletteToggleBtn.setAttribute('title', `Click to switch curated cafe palette (Current: ${paletteNames[validPalette]})`);
    }
  }
}

/* ==========================================================================
   THEME TOGGLER (Light Warm Cozy / Dark Raven Feather)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('lara_portfolio_theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  setTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
    });
  }

  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('lara_portfolio_theme', theme);

    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Cozy Light Mode');
      } else {
        themeIcon.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Raven Dark Mode');
      }
    }
  }
}

/* ==========================================================================
   PERSONA 5 TORN-PAPER INTRO MODAL
   ========================================================================== */
function initIntroModal() {
  const introModal = document.getElementById('p5IntroModal');
  const enterBtn = document.getElementById('p5IntroEnterBtn');
  const closeCornerBtn = document.getElementById('p5IntroCloseCorner');
  const replayBtn = document.getElementById('replayIntroBtn');

  // Check URL params for explicit replay (e.g. from other pages)
  const urlParams = new URLSearchParams(window.location.search);
  const forceReplay = urlParams.get('intro') === 'true';

  if (introModal) {
    const hasSeenIntro = sessionStorage.getItem('p5_intro_seen');

    if (!hasSeenIntro || forceReplay) {
      setTimeout(() => {
        openIntro();
      }, 140);
    }

    function openIntro() {
      introModal.classList.remove('dismissing');
      introModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeIntro() {
      introModal.classList.add('dismissing');
      sessionStorage.setItem('p5_intro_seen', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        introModal.classList.remove('active');
        introModal.classList.remove('dismissing');
        document.dispatchEvent(new CustomEvent('p5_intro_closed'));
      }, 350);
    }

    if (enterBtn) enterBtn.addEventListener('click', closeIntro);
    if (closeCornerBtn) closeCornerBtn.addEventListener('click', closeIntro);

    introModal.addEventListener('click', (e) => {
      if (e.target === introModal || e.target.classList.contains('p5-intro-shard-layer')) {
        closeIntro();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && introModal.classList.contains('active')) {
        closeIntro();
      }
    });

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        openIntro();
      });
    }
  } else if (replayBtn) {
    // If on another page, clicking P5 Intro brings user back to home with intro
    replayBtn.addEventListener('click', () => {
      window.location.href = 'index.html?intro=true';
    });
  }
}

/* ==========================================================================
   PROJECT CUSTOM MODALS (Story & Visual Gallery Modals)
   ========================================================================== */
function initProjectModals() {
  const storyModal = document.getElementById('projectStoryModal');
  const galleryModal = document.getElementById('projectGalleryModal');
  const cozyStoryModal = document.getElementById('cozyFarmStoryModal');
  const cozyGalleryModal = document.getElementById('cozyFarmGalleryModal');

  const openStoryBtn = document.getElementById('openStoryModalBtn');
  const openGalleryBtn = document.getElementById('openGalleryModalBtn');
  const openGalleryCardTrigger = document.getElementById('openGalleryCardTrigger');

  const closeStoryBtn = document.getElementById('closeStoryModalBtn');
  const closeGalleryBtn = document.getElementById('closeGalleryModalBtn');

  const openCozyStoryBtn = document.getElementById('openCozyStoryModalBtn');
  const openCozyGalleryBtn = document.getElementById('openCozyGalleryModalBtn');
  const openCozyGalleryCardTrigger = document.getElementById('openCozyGalleryCardTrigger');

  const closeCozyStoryBtn = document.getElementById('closeCozyStoryModalBtn');
  const closeCozyGalleryBtn = document.getElementById('closeCozyGalleryModalBtn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openStoryBtn && storyModal) {
    openStoryBtn.addEventListener('click', () => openModal(storyModal));
  }
  if (openGalleryBtn && galleryModal) {
    openGalleryBtn.addEventListener('click', () => openModal(galleryModal));
  }
  if (openGalleryCardTrigger && galleryModal) {
    openGalleryCardTrigger.addEventListener('click', () => openModal(galleryModal));
  }
  if (closeStoryBtn && storyModal) {
    closeStoryBtn.addEventListener('click', () => closeModal(storyModal));
  }
  if (closeGalleryBtn && galleryModal) {
    closeGalleryBtn.addEventListener('click', () => closeModal(galleryModal));
  }

  if (openCozyStoryBtn && cozyStoryModal) {
    openCozyStoryBtn.addEventListener('click', () => openModal(cozyStoryModal));
  }
  if (openCozyGalleryBtn && cozyGalleryModal) {
    openCozyGalleryBtn.addEventListener('click', () => openModal(cozyGalleryModal));
  }
  if (openCozyGalleryCardTrigger && cozyGalleryModal) {
    openCozyGalleryCardTrigger.addEventListener('click', () => openModal(cozyGalleryModal));
  }
  if (closeCozyStoryBtn && cozyStoryModal) {
    closeCozyStoryBtn.addEventListener('click', () => closeModal(cozyStoryModal));
  }
  if (closeCozyGalleryBtn && cozyGalleryModal) {
    closeCozyGalleryBtn.addEventListener('click', () => closeModal(cozyGalleryModal));
  }

  const allModals = [storyModal, galleryModal, cozyStoryModal, cozyGalleryModal];
  allModals.forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('cafe-modal-backdrop') || e.target.classList.contains('cafe-custom-modal')) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(m => {
        if (m && m.classList.contains('active')) closeModal(m);
      });
    }
  });
}

/* ==========================================================================
   PROJECT SPOTLIGHT (OVERDRIVE 2.4 STAGE)
   ========================================================================== */
function initProjectSpotlight() {
  const mainImg = document.getElementById('spotlightMainImg');
  const thumbs = document.querySelectorAll('#brandAssetsThumbStrip .thumb-item');
  const stageFrame = document.getElementById('spotlightStageFrame');

  const modeAssetsBtn = document.getElementById('modeAssetsBtn');
  const modeFlipbookBtn = document.getElementById('modeFlipbookBtn');
  const brandbookNav = document.getElementById('brandbookNavControls');
  const thumbStrip = document.getElementById('brandAssetsThumbStrip');

  const prevBtn = document.getElementById('brandbookPrevBtn');
  const nextBtn = document.getElementById('brandbookNextBtn');
  const pageBadge = document.getElementById('brandbookPageBadge');

  if (!mainImg || !stageFrame) return;

  let currentMode = 'assets'; // 'assets' or 'flipbook'
  let brandbookPage = 1;
  const totalPages = 27;

  function updateBrandbookPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    brandbookPage = page;

    const pageImgSrc = `images/blikje/brandbook_page_${brandbookPage}.png`;
    const title = `Overdrive 2.4 — Brandbook Page ${brandbookPage} of ${totalPages}`;
    const desc = `Cyberpunk Energy Drink Brand Guidelines — Page ${brandbookPage} of ${totalPages}`;

    mainImg.style.opacity = '0';
    mainImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      mainImg.src = pageImgSrc;
      mainImg.setAttribute('data-full', pageImgSrc);
      mainImg.setAttribute('data-title', title);
      mainImg.setAttribute('data-desc', desc);
      mainImg.style.opacity = '1';
      mainImg.style.transform = 'scale(1)';
    }, 120);

    if (pageBadge) {
      pageBadge.innerHTML = `<span>PAGE ${String(brandbookPage).padStart(2, '0')} / ${totalPages}</span>`;
    }

    if (prevBtn) prevBtn.disabled = brandbookPage === 1;
    if (nextBtn) nextBtn.disabled = brandbookPage === totalPages;
  }

  if (modeAssetsBtn && modeFlipbookBtn) {
    modeAssetsBtn.addEventListener('click', () => {
      currentMode = 'assets';
      modeAssetsBtn.classList.add('active');
      modeFlipbookBtn.classList.remove('active');
      if (brandbookNav) brandbookNav.style.display = 'none';
      if (thumbStrip) thumbStrip.style.display = 'grid';

      const activeThumb = document.querySelector('.thumb-item.active') || thumbs[0];
      if (activeThumb) activeThumb.click();
    });

    modeFlipbookBtn.addEventListener('click', () => {
      currentMode = 'flipbook';
      modeFlipbookBtn.classList.add('active');
      modeAssetsBtn.classList.remove('active');
      if (brandbookNav) brandbookNav.style.display = 'flex';
      if (thumbStrip) thumbStrip.style.display = 'none';

      updateBrandbookPage(brandbookPage);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentMode === 'flipbook') {
        updateBrandbookPage(brandbookPage - 1);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentMode === 'flipbook') {
        updateBrandbookPage(brandbookPage + 1);
      }
    });
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      if (currentMode !== 'assets') {
        currentMode = 'assets';
        if (modeAssetsBtn) modeAssetsBtn.classList.add('active');
        if (modeFlipbookBtn) modeFlipbookBtn.classList.remove('active');
        if (brandbookNav) brandbookNav.style.display = 'none';
        if (thumbStrip) thumbStrip.style.display = 'grid';
      }

      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const newSrc = thumb.getAttribute('data-img');
      const newTitle = thumb.getAttribute('data-title') || 'Overdrive 2.4';
      const newDesc = thumb.getAttribute('data-desc') || '';

      mainImg.style.opacity = '0';
      mainImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        mainImg.src = newSrc;
        mainImg.setAttribute('data-full', newSrc);
        mainImg.setAttribute('data-title', newTitle);
        mainImg.setAttribute('data-desc', newDesc);
        mainImg.style.opacity = '1';
        mainImg.style.transform = 'scale(1)';
      }, 150);
    });
  });

  stageFrame.addEventListener('click', (e) => {
    if (e.target.closest('.brandbook-nav-controls') || e.target.closest('.brandbook-mode-bar')) return;

    const src = mainImg.src;
    const title = mainImg.getAttribute('data-title') || 'Overdrive 2.4 Concept';
    const desc = mainImg.getAttribute('data-desc') || 'CMD Breda Identity Design Series';
    openLightbox(src, title, desc);
  });

  document.addEventListener('keydown', (e) => {
    if (currentMode === 'flipbook') {
      if (e.key === 'ArrowLeft') {
        updateBrandbookPage(brandbookPage - 1);
      } else if (e.key === 'ArrowRight') {
        updateBrandbookPage(brandbookPage + 1);
      }
    }
  });
}

/* ==========================================================================
   COZY FARM PIXEL ART & VISUALS SPOTLIGHT
   ========================================================================== */
function initCozyFarmSpotlight() {
  const cozyMainImg = document.getElementById('cozyMainImg');
  const cozyStage = document.getElementById('cozyStageFrame');
  const cozyThumbs = document.querySelectorAll('#cozyThumbStrip .thumb-item');

  if (!cozyMainImg || !cozyStage) return;

  cozyThumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      cozyThumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const newSrc = thumb.getAttribute('data-img');
      const newTitle = thumb.getAttribute('data-title') || 'Cozy Farm Visual';
      const newDesc = thumb.getAttribute('data-desc') || '';

      cozyMainImg.style.opacity = '0';
      cozyMainImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        cozyMainImg.src = newSrc;
        cozyMainImg.setAttribute('data-full', newSrc);
        cozyMainImg.setAttribute('data-title', newTitle);
        cozyMainImg.setAttribute('data-desc', newDesc);
        cozyMainImg.style.opacity = '1';
        cozyMainImg.style.transform = 'scale(1)';
      }, 120);
    });
  });

  cozyStage.addEventListener('click', () => {
    const src = cozyMainImg.src;
    const title = cozyMainImg.getAttribute('data-title') || 'Cozy Farm Visual';
    const desc = cozyMainImg.getAttribute('data-desc') || 'Python Game & Pixel Art';
    openLightbox(src, title, desc);
  });
}

/* ==========================================================================
   ILLUSTRATION GALLERY FILTER
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'flex';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 40);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(12px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   FULLSCREEN LIGHTBOX MODAL
   ========================================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (!lightbox) return;

  const triggerElements = document.querySelectorAll('[data-lightbox="true"]');
  triggerElements.forEach(el => {
    el.addEventListener('click', () => {
      const imgEl = el.querySelector('img');
      const src = el.getAttribute('data-full') || (imgEl ? imgEl.src : '');
      const title = el.getAttribute('data-title') || (imgEl ? imgEl.alt : '');
      const desc = el.getAttribute('data-desc') || '';
      if (src) {
        openLightbox(src, title, desc);
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-dialog') || e.target.classList.contains('lightbox-image-wrap')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function openLightbox(src, title, desc) {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');

  if (!lightbox || !lightboxImg) return;

  lightboxImg.src = src;
  if (lightboxTitle) lightboxTitle.textContent = title || 'Artwork Preview';
  if (lightboxDesc) lightboxDesc.textContent = desc || '';

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* ==========================================================================
   HERO PROJECT SWITCHER & SLIDE-IN DRAWERS (INDEX.HTML SHOWCASE)
   Switches dynamically between Overdrive 2.4 and Cozy Farm 1.0
   ========================================================================== */
function initHeroProjectSwitcher() {
  const prevBtn = document.getElementById('prevHeroProjectBtn');
  const nextBtn = document.getElementById('nextHeroProjectBtn');
  const tabs = document.querySelectorAll('.project-pill-tab');
  const badge = document.getElementById('heroProjectBadge');
  const timerBar = document.getElementById('heroTimerBar');

  const specialVal = document.getElementById('heroSpecialVal');

  const triggerCard = document.getElementById('heroProjectCardTrigger');
  const artTag = document.getElementById('heroArtTag');
  const artLabel = document.getElementById('heroArtLabel');
  const posterImg = document.getElementById('heroPosterImg');
  const captionTitle = document.getElementById('heroCaptionTitle');

  // Single Unified Modal / Drawer Elements
  const projectDrawer = document.getElementById('projectShowcaseDrawer');
  const drawerBackdrop = document.getElementById('projectDrawerBackdrop');
  const drawerCloseBtn = document.getElementById('projectDrawerCloseBtn');

  const modalDrawerBadge = document.getElementById('modalDrawerBadge');
  const modalDrawerHeading = document.getElementById('modalDrawerHeading');
  const modalArtContainer = document.getElementById('modalArtContainer');
  const modalArtImg = document.getElementById('modalArtImg');
  const modalTagStrip = document.getElementById('modalTagStrip');
  const modalHeadline = document.getElementById('modalHeadline');
  const modalSubhead = document.getElementById('modalSubhead');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecProject = document.getElementById('modalSpecProject');
  const modalSpecMedium = document.getElementById('modalSpecMedium');
  const modalSpecApp = document.getElementById('modalSpecApp');
  const modalActionBtn = document.getElementById('modalActionBtn');
  const modalActionLabel = document.getElementById('modalActionLabel');

  const projects = [
    {
      id: 'overdrive',
      badgeText: 'PROJECT 01 / 02',
      specialText: 'Visual Storytelling • Character Art • 360° Packaging',
      artTag: 'EXHIBIT // 01',
      artLabel: 'identity_series // 2.4',
      imgSrc: 'images/blikje/blikje_poster.png',
      imgAlt: 'Cyberpunk Girl Illustration Poster',
      isPixelated: false,
      captionTitle: 'Awaken Your Inner Power',
      // Drawer content
      drawerBadge: 'EXHIBIT // 01',
      drawerHeading: 'Overdrive // 2.4 (Can Packaging)',
      drawerTags: ['#PackagingDesign', '#Overdrive2.4', '#Cyberpunk', '#IdentityDesign'],
      drawerHeadline: 'Awaken Your Inner Power',
      drawerSubhead: '360° Can Packaging & Cyberpunk Identity • Avans CMD',
      drawerDesc: 'Created for the <strong>Overdrive 2.4</strong> energy drink branding identity. In Year 1 CMD, I created a full brand identity with a 250ml 360° can wrap, dark futuristic aesthetics, neon color palettes, and character storytelling.',
      specProject: 'Overdrive 2.4 Identity',
      specMedium: 'Digital Illustration & Vector Wrap',
      specApp: '250ml 360° Print Wrap & Brandbook',
      actionUrl: 'projects.html',
      actionLabel: 'EXPLORE OVERDRIVE CASE STUDY ➔'
    },
    {
      id: 'cozy_farm',
      badgeText: 'PROJECT 02 / 02',
      specialText: 'Python Programming • Pixel Art • Character Customizer',
      artTag: 'EXHIBIT // 02',
      artLabel: 'game_series // cozy_farm',
      imgSrc: 'images/cozy_farm/pixelart_lara.png',
      imgAlt: 'Cozy Farm Pixel Art Lara',
      isPixelated: true,
      captionTitle: 'Cozy Farm • Pixel Adventure',
      // Drawer content
      drawerBadge: 'EXHIBIT // 02',
      drawerHeading: 'Cozy Farm // Python RPG & Pixel Art',
      drawerTags: ['#PythonGame', '#PixelArt', '#CharacterCreator', '#ChallengeWeek'],
      drawerHeadline: 'Cozy Farm // Python RPG & Customizer',
      drawerSubhead: 'Modular Character Creator & Story RPG • Challenge Week',
      drawerDesc: 'Developed in Python during Challenge Week. Escape the chaotic city accounting life to revitalize an old countryside homestead. Features an in-depth character customizer (skin tones, hair colors, accessories), quest dialogue with Annie the blacksmith, and riddle challenges.',
      specProject: 'Cozy Farm RPG 1.0',
      specMedium: 'Python 3 & Retro Pixel Art',
      specApp: 'Text RPG, Logic Engine & Character Creator',
      actionUrl: 'projects.html',
      actionLabel: 'EXPLORE COZY FARM CASE STUDY ➔'
    }
  ];

  let activeIndex = 0;
  const ROTATION_INTERVAL = 5000; // 5 seconds per project
  let elapsed = 0;
  let timerInterval = null;
  let isPaused = false;

  function setHeroProject(index) {
    if (index < 0) index = projects.length - 1;
    if (index >= projects.length) index = 0;
    activeIndex = index;

    const data = projects[activeIndex];

    if (posterImg) {
      posterImg.style.opacity = '0.35';
      posterImg.style.transform = 'scale(0.97)';
    }

    setTimeout(() => {
      if (badge) badge.textContent = data.badgeText;
      if (specialVal) specialVal.textContent = data.specialText;

      if (artTag) artTag.textContent = data.artTag;
      if (artLabel) artLabel.textContent = data.artLabel;
      if (captionTitle) captionTitle.textContent = data.captionTitle;

      if (posterImg) {
        posterImg.src = data.imgSrc;
        posterImg.alt = data.imgAlt;
        if (data.isPixelated) {
          posterImg.classList.add('pixelated-art');
        } else {
          posterImg.classList.remove('pixelated-art');
        }
        posterImg.style.opacity = '1';
        posterImg.style.transform = 'scale(1)';
      }

      tabs.forEach((tab, i) => {
        if (i === activeIndex) tab.classList.add('active');
        else tab.classList.remove('active');
      });
    }, 120);

    elapsed = 0;
    if (timerBar) timerBar.style.width = '0%';
  }

  // Timer loop for automatic showcase rotation
  function startShowcaseTimer() {
    stopShowcaseTimer();
    const tick = 50;
    timerInterval = setInterval(() => {
      if (!isPaused) {
        elapsed += tick;
        if (timerBar) {
          const pct = Math.min(100, (elapsed / ROTATION_INTERVAL) * 100);
          timerBar.style.width = pct + '%';
        }

        if (elapsed >= ROTATION_INTERVAL) {
          elapsed = 0;
          setHeroProject((activeIndex + 1) % projects.length);
        }
      }
    }, tick);
  }

  function stopShowcaseTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Pause timer when mouse hovers over showcase elements
  const pauseTargets = [triggerCard, prevBtn, nextBtn, document.querySelector('.project-pill-nav')];
  pauseTargets.forEach(el => {
    if (el) {
      el.addEventListener('mouseenter', () => { isPaused = true; });
      el.addEventListener('mouseleave', () => { isPaused = false; });
    }
  });

  // Switch buttons & tabs
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      setHeroProject(activeIndex - 1);
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      setHeroProject(activeIndex + 1);
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const idx = parseInt(tab.getAttribute('data-project'), 10) || 0;
      setHeroProject(idx);
    });
  });

  // Open the single modal populated with the active project's content
  function openProjectDrawer() {
    const data = projects[activeIndex];
    if (!projectDrawer) return;

    if (modalDrawerBadge) modalDrawerBadge.textContent = data.drawerBadge;
    if (modalDrawerHeading) modalDrawerHeading.textContent = data.drawerHeading;

    if (modalArtContainer) {
      modalArtContainer.setAttribute('data-full', data.imgSrc);
      modalArtContainer.setAttribute('data-title', data.drawerHeadline);
      modalArtContainer.setAttribute('data-desc', data.drawerSubhead);
      if (data.isPixelated) {
        modalArtContainer.style.background = '#14121e';
      } else {
        modalArtContainer.style.background = '';
      }
    }

    if (modalArtImg) {
      modalArtImg.src = data.imgSrc;
      modalArtImg.alt = data.imgAlt;
      if (data.isPixelated) {
        modalArtImg.classList.add('pixelated-art');
      } else {
        modalArtImg.classList.remove('pixelated-art');
      }
    }

    if (modalTagStrip) {
      modalTagStrip.innerHTML = data.drawerTags
        .map((tag, i) => `<span class="p5-tag ${i === 0 ? 'p5-tag-primary' : ''}"><span>${tag}</span></span>`)
        .join('');
    }

    if (modalHeadline) modalHeadline.textContent = data.drawerHeadline;
    if (modalSubhead) modalSubhead.textContent = data.drawerSubhead;
    if (modalDesc) modalDesc.innerHTML = data.drawerDesc;

    if (modalSpecProject) modalSpecProject.textContent = data.specProject;
    if (modalSpecMedium) modalSpecMedium.textContent = data.specMedium;
    if (modalSpecApp) modalSpecApp.textContent = data.specApp;

    if (modalActionBtn) modalActionBtn.href = data.actionUrl;
    if (modalActionLabel) modalActionLabel.textContent = data.actionLabel;

    projectDrawer.classList.add('active');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    isPaused = true;
  }

  function closeProjectDrawer() {
    if (projectDrawer) projectDrawer.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
    isPaused = false;
  }

  if (triggerCard) {
    triggerCard.addEventListener('click', openProjectDrawer);
    triggerCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectDrawer();
      }
    });
  }

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeProjectDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeProjectDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectDrawer();
    }
  });

  // Start rotation on load
  startShowcaseTimer();
}

/* ==========================================================================
   CONTACT PAGE (Copy Email Clipboard Interaction)
   ========================================================================== */
function initContactPage() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyEmailText');
  const emailToCopy = 'laramollaoglu21@gmail.com';

  if (!copyBtn || !copyText) return;

  copyBtn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      const originalHtml = copyText.innerHTML;
      copyText.innerHTML = 'Copied to clipboard! 📋';
      copyBtn.style.borderColor = 'var(--c-primary)';
      copyBtn.style.color = 'var(--c-primary)';

      setTimeout(() => {
        copyText.innerHTML = originalHtml;
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2400);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}


