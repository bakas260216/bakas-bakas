// ===== DATA PRODUK =====
// Tambah atau edit produk di sini.
// images: array path foto produk (bisa 1, 2, 3, atau lebih)
const products = [
    {
        name: "VITAE CUSTOS — Short Sleeve",
        price: "Rp 139.000",
        desc: `PRE-ORDER

VITAE CUSTOS terinspirasi oleh nilai kepedulian, dedikasi, dan karakter. Sebuah desain yang merepresentasikan tanggung jawab terhadap apa yang kita jaga, apa yang kita perjuangkan, dan siapa diri kita dalam setiap proses kehidupan.

For Those Who Choose to Care.

• Cotton Combed 24s
• Plastisol Ink
• Free Sticker
• Premium Packaging

• DP Minimal 50%
• Belum termasuk ongkos kirim
• Estimasi produksi ±14 hari kerja setelah periode pre-order berakhir.`,
        oldPrice: null,
        images: ["baju 1 pendek putih.png","baju 1 pendek hitam.png","SIZE CHART.png"],
        colors: ["Putih", "Hitam"],
        sizes: ["M", "L", "XL","XXL","XXXL"]
    },
    {
        name: "VITAE CUSTOS — Short Sleeve",
        price: "Rp 149.000",
        desc: `PRE-ORDER

VITAE CUSTOS terinspirasi oleh nilai kepedulian, dedikasi, dan karakter. Sebuah desain yang merepresentasikan tanggung jawab terhadap apa yang kita jaga, apa yang kita perjuangkan, dan siapa diri kita dalam setiap proses kehidupan.

For Those Who Choose to Care.

• Cotton Combed 24s
• Plastisol Ink
• Free Sticker
• Premium Packaging

• DP Minimal 50%
• Belum termasuk ongkos kirim
• Estimasi produksi ±14 hari kerja setelah periode pre-order berakhir.`,
        oldPrice: null,
        images: ["baju 1 panjang putih.png","baju 1 panjang hitam.png","SIZE CHART.png"],
        colors: ["Putih", "Hitam"],
        sizes: ["M", "L", "XL","XXL","XXXL"]
    }
];

// ===== STATE =====
let currentProduct = null;
let currentSlide   = 0;
let totalSlides    = 0;
let activeColor    = 0;
let activeSize     = 0;
let qty            = 1;

// ===== BUKA HALAMAN DETAIL =====
function openDetail(p) {
    currentProduct = p;
    currentSlide   = 0;
    activeColor    = 0;
    activeSize     = 0;
    qty            = 1;

    // Isi header
    document.getElementById("dpHeaderTitle").textContent = p.name;

    // Isi nama & harga
    document.getElementById("dpName").textContent  = p.name;
    document.getElementById("dpPrice").textContent = p.price;
    const oldPriceEl = document.getElementById("dpOldPrice");
    oldPriceEl.textContent = p.oldPrice || "";

    // Isi deskripsi
    document.getElementById("dpDesc").innerHTML =
    p.desc.replace(/\n/g, "<br>");

    // Isi qty
    document.getElementById("qtyVal").textContent = 1;

    // Bangun carousel foto
    const track = document.getElementById("dpTrack");
    const dots  = document.getElementById("dpDots");
    track.innerHTML = "";
    dots.innerHTML  = "";
    totalSlides = p.images.length;

    p.images.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = p.name + " foto " + (i + 1);
        track.appendChild(img);

        const dot = document.createElement("span");
        dot.className = "dp-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => goToSlide(i));
        dots.appendChild(dot);
    });

    goToSlide(0);

    // Bangun pilihan warna
    const colorWrap = document.getElementById("dpColors");
    colorWrap.innerHTML = "";
    p.colors.forEach((c, i) => {
        const btn = document.createElement("button");
        btn.className = "color-btn" + (i === 0 ? " active" : "");
        btn.textContent = c;
        btn.addEventListener("click", () => {
            activeColor = i;
            colorWrap.querySelectorAll(".color-btn").forEach((b, j) => {
                b.classList.toggle("active", j === i);
            });
        });
        colorWrap.appendChild(btn);
    });

    // Bangun pilihan ukuran
    const sizeWrap = document.getElementById("dpSizes");
    sizeWrap.innerHTML = "";
    p.sizes.forEach((s, i) => {
        const btn = document.createElement("button");
        btn.className = "size-btn" + (i === 0 ? " active" : "");
        btn.textContent = s;
        btn.addEventListener("click", () => {
            activeSize = i;
            sizeWrap.querySelectorAll(".size-btn").forEach((b, j) => {
                b.classList.toggle("active", j === i);
            });
        });
        sizeWrap.appendChild(btn);
    });

    // Tampilkan overlay & footer
    const overlay = document.getElementById("detailOverlay");
    overlay.scrollTop = 0;
    overlay.classList.add("open");
    document.getElementById("dpFooter").classList.add("visible");
    document.body.style.overflow = "hidden";
}

// ===== TUTUP HALAMAN DETAIL =====
function closeDetail() {
    document.getElementById("detailOverlay").classList.remove("open");
    document.getElementById("dpFooter").classList.remove("visible");
    document.body.style.overflow = "";
}

// Tombol back browser (Android)
window.addEventListener("popstate", () => {
    if (document.getElementById("detailOverlay").classList.contains("open")) {
        closeDetail();
    }
});

// ===== CAROUSEL =====
function goToSlide(n) {
    currentSlide = n;
    document.getElementById("dpTrack").style.transform = `translateX(-${n * 100}%)`;
    document.querySelectorAll(".dp-dot").forEach((d, i) => {
        d.classList.toggle("active", i === n);
    });
}

document.getElementById("dpPrev").addEventListener("click", () => {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
});

document.getElementById("dpNext").addEventListener("click", () => {
    goToSlide((currentSlide + 1) % totalSlides);
});

// Swipe gesture untuk carousel di mobile
(function () {
    let startX = 0;
    const track = document.getElementById("dpTrack");

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchend", e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) goToSlide((currentSlide + 1) % totalSlides);
            else          goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
        }
    }, { passive: true });
})();

// ===== KONTROL JUMLAH =====
document.getElementById("qtyMinus").addEventListener("click", () => {
    if (qty > 1) {
        qty--;
        document.getElementById("qtyVal").textContent = qty;
    }
});

document.getElementById("qtyPlus").addEventListener("click", () => {
    qty++;
    document.getElementById("qtyVal").textContent = qty;
});

// ===== PESAN VIA WHATSAPP =====
document.getElementById("btnWa").addEventListener("click", () => {
    const p     = currentProduct;
    const color = p.colors[activeColor];
    const size  = p.sizes[activeSize];
    const nomor = "6288294641275";

    const pesan =
`Halo, saya ingin memesan:

Produk : ${p.name}
Harga  : ${p.price}
Warna  : ${color}
Ukuran : ${size}
Jumlah : ${qty}

Apakah masih tersedia?`;

    window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`, "_blank");
});
