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
        images: ["baju 1 pendek putih.png","SIZE CHART.png"],
        colors: ["Putih"],
        sizes: ["M", "L"],
        soldOut: false
    },
    {
        name: "VITAE CUSTOS — Long Sleeve",
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
        sizes: ["M", "L", "XL","XXL","XXXL"],
        soldOut: true
    },
    {
        name: "HEREDITAS",
        price: "Rp 139.000",
        desc: `HEREDITAS

Carry the Story Forward.

HEREDITAS merupakan koleksi kedua dari BAKAS yang lahir dari kisah yang terus hidup dan diterjemahkan ke dalam streetwear modern.

Melalui koleksi ini, BAKAS mengangkat inspirasi dari warisan budaya sebagai bentuk apresiasi terhadap cerita, identitas, dan nilai yang terus diwariskan dari generasi ke generasi. Setiap elemen dirancang bukan hanya untuk dikenakan, tetapi juga sebagai pengingat bahwa setiap cerita memiliki makna dan layak untuk diteruskan.

Product Details

* Cotton Combed 24s
* Plastisol Ink
* Free Sticker
* Premium Packaging

Production Information

* DP Minimal 50%
* Belum termasuk ongkos kirim.
* Estimasi produksi ±14 hari kerja setelah periode pre-order berakhir.`,
        oldPrice: null,
        images: ["baju 2 sampul.png","baju 2 pendek putih.png","baju 2 pendek hitam.png","baju 2 ukuran.png"],
        colors: ["Putih", "Hitam"],
        sizes: ["M", "L", "XL","XXL","XXXL"],
        soldOut: false
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

    // ===== CEK STATUS SOLD OUT =====
    const btnWa = document.getElementById("btnWa");
    if (p.soldOut) {
        btnWa.disabled = true;
        btnWa.classList.add("btn-disabled");
        btnWa.innerHTML = "Stok Habis";
    } else {
        btnWa.disabled = false;
        btnWa.classList.remove("btn-disabled");
        btnWa.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.508A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.366l-.359-.213-3.72.885.937-3.619-.234-.372A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
        </svg>
        Pesan via WhatsApp`;
    }

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
    // Cegah kirim pesan jika produk sold out
    if (currentProduct.soldOut) return;

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
