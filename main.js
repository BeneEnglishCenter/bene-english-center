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
