// ===== Masonryギャラリー（PCのみ） =====
function initMasonry() {
  const wrapper = document.querySelector(".gallery-wrapper");
  if (!wrapper) return;

  // スマホは通常レイアウトに戻す
  if (window.innerWidth < 768) {
    wrapper.style.position = "";
    wrapper.style.height = "";
    Array.from(wrapper.children).forEach(item => {
      item.style.position = "";
      item.style.left = "";
      item.style.top = "";
      item.style.width = "";
    });
    return;
  }

  const items = Array.from(wrapper.querySelectorAll(".gallery-item"));
  const gap = 28;
  const colWidth = (wrapper.offsetWidth - gap) / 2;
  const colHeights = [0, 0]; // 左列・右列の高さを管理

  items.forEach(item => {
    // 短い列を選ぶ
    const col = colHeights[0] <= colHeights[1] ? 0 : 1;
    const x = col === 0 ? 0 : colWidth + gap;
    const y = colHeights[col];

    item.style.position = "absolute";
    item.style.width = colWidth + "px";
    item.style.left = x + "px";
    item.style.top = y + "px";

    colHeights[col] += item.offsetHeight + gap;
  });

  // wrapperの高さを左右の最大値に合わせる
  wrapper.style.height = Math.max(...colHeights) + "px";
}

// 画像が全て読み込まれてから実行
window.addEventListener("load", initMasonry);
window.addEventListener("resize", initMasonry);

// ===== トップに戻るボタン =====
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  // 200px以上スクロールしたら表示
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  });

  // クリックでトップへスムーズスクロール
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== コピーライト年自動更新 =====
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ===== ハンバーガーメニュー =====
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const overlay = document.getElementById("overlay");

// メニューを開く
hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  overlay.classList.toggle("active");
});

// オーバーレイ（ナビの外側の暗い部分）をクリックしたら閉じる
// ナビ内部のクリックには反応しないようにする
overlay.addEventListener("click", (e) => {
  e.stopPropagation();
  nav.classList.remove("active");
  overlay.classList.remove("active");
});

// ナビのリンクをクリック → オーバーレイに伝播させず遷移
nav.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  const href = link.getAttribute("href");

  // 未実装ページはメニューを閉じるだけ
  if (!href || href === "#") {
    nav.classList.remove("active");
    overlay.classList.remove("active");
    return;
  }

  // オーバーレイへの伝播を止めてから遷移
  e.stopPropagation();
  nav.classList.remove("active");
  overlay.classList.remove("active");
  window.location.href = href;
});

// ===== チラシPDFモーダル（汎用・複数対応） =====
function openModal(modalId, overlayId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById(overlayId);
  if (!modal || !overlay) return;
  modal.classList.add("active");
  overlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal(modalId, overlayId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById(overlayId);
  if (!modal || !overlay) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

// サマーキャンプバナー
const flyerBannerBtn = document.getElementById("flyerBannerBtn");
if (flyerBannerBtn) {
  flyerBannerBtn.addEventListener("click", () => openModal("flyerModal", "flyerModalOverlay"));
}

// 海外留学バナー
const studyBannerBtn = document.getElementById("studyBannerBtn");
if (studyBannerBtn) {
  studyBannerBtn.addEventListener("click", () => openModal("studyModal", "studyModalOverlay"));
}

// オーバーレイクリックで閉じる
const flyerModalOverlay = document.getElementById("flyerModalOverlay");
if (flyerModalOverlay) {
  flyerModalOverlay.addEventListener("click", () => closeModal("flyerModal", "flyerModalOverlay"));
}
const studyModalOverlay = document.getElementById("studyModalOverlay");
if (studyModalOverlay) {
  studyModalOverlay.addEventListener("click", () => closeModal("studyModal", "studyModalOverlay"));
}

// ✕ボタン（data-target属性でどのモーダルか判定）
document.querySelectorAll(".flyer-modal-close").forEach(btn => {
  btn.addEventListener("click", () => {
    const targetId = btn.dataset.target;
    const overlayId = targetId.replace("Modal", "ModalOverlay");
    closeModal(targetId, overlayId);
  });
});

// ESCキーで開いているモーダルをすべて閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal("flyerModal", "flyerModalOverlay");
    closeModal("studyModal", "studyModalOverlay");
  }
});

// ===== スライダー（スライダーがあるページのみ実行） =====
const sliderEl = document.querySelector(".slider");
if (sliderEl) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  let timer = null;
  const INTERVAL = 4000;

  function goTo(index) {
    slides[current].classList.remove("active");
    dots[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    dots[current].classList.add("active");
  }

  function startTimer() {
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goTo(parseInt(dot.dataset.index));
      resetTimer();
    });
  });

  startTimer();
}
