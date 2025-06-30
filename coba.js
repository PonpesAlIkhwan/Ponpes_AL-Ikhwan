document.addEventListener("DOMContentLoaded", function () {
  // =====================
  // 1. Typewriter Arabic
  // =====================
  const arabicGreeting = "السلام عليكم ورحمة الله وبركاته";
  const arabicWelcome = "أهلاً وسهلاً";
  const fullText = "Bangunlah Pondasi Keimanan dengan Tauhid dan Takwa, dan berakhlak mulia. Jadikan keturunan kita sebagai penerus perjuangan Rasulullah ﷺ, dengan mendidik di Pondok Pesantren Al-Ikhwan.";

  const greetingEl = document.getElementById("arabicGreeting");
  const welcomeEl = document.getElementById("arabicWelcome");
  const paragraphEl = document.getElementById("typewriter");

  let gIndex = 0, wIndex = 0, pIndex = 0;

  function typeGreeting() {
    if (greetingEl && gIndex < arabicGreeting.length) {
      greetingEl.textContent += arabicGreeting.charAt(gIndex++);
      setTimeout(typeGreeting, 100);
    } else {
      setTimeout(typeWelcome, 300);
    }
  }

  function typeWelcome() {
    if (welcomeEl && wIndex < arabicWelcome.length) {
      welcomeEl.textContent += arabicWelcome.charAt(wIndex++);
      setTimeout(typeWelcome, 100);
    } else {
      setTimeout(typeParagraph, 500);
    }
  }

  function typeParagraph() {
    if (paragraphEl && pIndex < fullText.length) {
      paragraphEl.textContent += fullText.charAt(pIndex++);
      setTimeout(typeParagraph, 50);
    }
  }

  typeGreeting();

  // =============================
  // 2. Scroll Gallery Button
  // =============================
  const galleryList = document.getElementById("galleryList");
  const btnLeft = document.querySelector(".scroll-btn.left");
  const btnRight = document.querySelector(".scroll-btn.right");

  if (btnLeft && galleryList) {
    btnLeft.addEventListener("click", () => {
      galleryList.scrollBy({ left: -270, behavior: "smooth" });
    });
  }

  if (btnRight && galleryList) {
    btnRight.addEventListener("click", () => {
      galleryList.scrollBy({ left: 270, behavior: "smooth" });
    });
  }

  // =============================
  // 3. Navigasi Responsive Toggle
  // =============================
  window.toggleMenu = function () {
    document.querySelector('.nav-links')?.classList.toggle('active');
  };

  // =============================
  // 4. Scroll Animation Fade-in
  // =============================
  window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(el => {
      const position = el.getBoundingClientRect().top;
      const screenHeight = window.innerHeight;
      if (position < screenHeight - 100) {
        el.classList.add('visible');
      }
    });
  });

  // =============================
  // 5. Download PDF Button (Fix)
  // =============================
  window.downloadPDF = function () {
  const element = document.querySelector('.table-wrapper');
  if (!element) return;

  // Clone elemen supaya tidak mempengaruhi tampilan asli
  const clone = element.cloneNode(true);
  clone.style.width = element.scrollWidth + "px"; // Ambil lebar asli isi
  clone.style.padding = "20px";
  clone.style.margin = "0 auto";
  clone.style.boxSizing = "border-box";
  clone.style.background = "#fff";

  // Buat container sementara
  const tempContainer = document.createElement("div");
  tempContainer.style.position = "fixed";
  tempContainer.style.top = "-9999px";
  tempContainer.style.left = "-9999px";
  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);

  // Hitung ukuran kertas sesuai konten
  const contentWidth = clone.offsetWidth;
  const contentHeight = clone.offsetHeight;

  // Konversi ke satuan point untuk jsPDF (1 pt = 1/72 inch)
  const mmToPt = mm => mm * 2.83465;
  const pxToPt = px => px * 0.75; // asumsi 96dpi

  const pdfWidth = pxToPt(contentWidth);
  const pdfHeight = pxToPt(contentHeight);

  const opt = {
    margin: [10, 10, 10, 10], // dalam px
    filename: 'biaya-pendaftaran.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'pt',
      format: [pdfWidth + 20, pdfHeight + 20], // tambah margin
      orientation: 'landscape'
    }
  };

  html2pdf().set(opt).from(clone).save().then(() => {
    document.body.removeChild(tempContainer);
  });
};

  // =============================
  // 6. Highlight Active Nav
  // =============================
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // =============================
  // 7. Intersection Observer for .program-item
  // =============================
  const items = document.querySelectorAll('.program-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        entry.target.classList.remove('hidden');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    observer.observe(item);
  });
});
const galleryList = document.querySelector('.gallery-list');

  let scrollDirection = 1; // 1 = kanan, -1 = kiri

  function autoScrollGallery() {
    if (!galleryList) return;

    const maxScroll = galleryList.scrollWidth - galleryList.clientWidth;

    galleryList.scrollLeft += 2 * scrollDirection;

    if (galleryList.scrollLeft >= maxScroll) {
      scrollDirection = -1;
    } else if (galleryList.scrollLeft <= 0) {
      scrollDirection = 1;
    }
  }

  // Jalankan setiap 20ms agar smooth
  setInterval(autoScrollGallery, 20);