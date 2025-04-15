/**
 * Website JavaScript Interaktif
 * Natanael Sitompul
 */

// Menunggu document siap
document.addEventListener('DOMContentLoaded', function() {
    // Update tahun copyright di footer
    updateCopyrightYear();
    
    // Inisialisasi mobile menu
    initMobileMenu();
    
    // Inisialisasi galeri lightbox jika di halaman gallery
    if (document.querySelector('.gallery-grid')) {
        initGalleryLightbox();
    }
    
    // Inisialisasi validasi form jika di halaman contact
    if (document.querySelector('.contact-form form')) {
        initFormValidation();
    }
    
    // Inisialisasi fitur pencarian jika di halaman blog
    if (document.querySelector('.blog')) {
        initBlogSearch();
    }
    
    // Highlight menu aktif
    highlightActiveMenu();
});

/**
 * Update tahun copyright di footer
 */
function updateCopyrightYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

/**
 * Inisialisasi mobile menu
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('show-mobile');
            this.classList.toggle('open');
        });
        
        // Tutup menu saat klik di luar menu
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && !event.target.closest('#mobile-menu-toggle')) {
                if (mainMenu.classList.contains('show-mobile')) {
                    mainMenu.classList.remove('show-mobile');
                    menuToggle.classList.remove('open');
                }
            }
        });
    }
}

/**
 * Inisialisasi lightbox untuk galeri
 */
function initGalleryLightbox() {
    // Buat elemen modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="image-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Ambil semua gambar di gallery
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const modalImg = modal.querySelector('.modal-image');
    const captionText = modal.querySelector('.image-caption');
    const closeBtn = modal.querySelector('.close-modal');
    
    // Tambahkan event listener untuk setiap gambar
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.textContent = this.alt || 'Gambar Tanpa Deskripsi';
        });
    });
    
    // Tutup modal saat klik close button
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Tutup modal saat klik di luar gambar
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Navigasi dengan keyboard
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
}

/**
 * Inisialisasi validasi form kontak
 */
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    contactForm.addEventListener('submit', function(e) {
        const nameInput = this.querySelector('#name');
        const emailInput = this.querySelector('#email');
        const messageInput = this.querySelector('#message');
        let isValid = true;
        
        // Validasi nama
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Nama harus diisi');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validasi email
        if (!emailInput.value.trim()) {
            showError(emailInput, 'Email harus diisi');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            showError(emailInput, 'Email tidak valid');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validasi pesan
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Pesan harus diisi');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function clearError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.classList.remove('error');
    }
}

/**
 * Inisialisasi fitur pencarian blog
 */
function initBlogSearch() {
    const searchBox = document.createElement('div');
    searchBox.className = 'blog-search';
    searchBox.innerHTML = `
        <input type="text" placeholder="Cari artikel...">
        <button type="button">Cari</button>
    `;
    
    const blogContainer = document.querySelector('.article-list');
    blogContainer.prepend(searchBox);
    
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('h2').textContent.toLowerCase();
            const content = post.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || content.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Highlight menu aktif berdasarkan halaman saat ini
 */
function highlightActiveMenu() {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('nav a');
    
    menuLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
}
