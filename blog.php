<?php include 'includes/db.php'; ?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Blog pribadi Natanael Sitompul - Artikel tentang teknologi, kucing, dan masakan">
    <title>Blog | Natanael Sitompul</title>
    <link rel="icon" type="image/x-icon" href="img/logoKucing.png">
    <link rel="stylesheet" href="style.css">
</head>
<body class="blog">
    <header>
        <div class="header-container">
            <div class="logo">NS</div>
            <button id="mobile-menu-toggle" aria-label="Toggle menu">☰</button>
            <nav>
                <ul id="main-menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="gallery.html">Gallery</a></li>
                    <li><a href="blog.php" class="active">Blog</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        <section class="hero">
            <h1 class="spotlight">Blog Pribadi</h1>
            <p class="subtitle">Kumpulan artikel favorit saya</p>
        </section>

        <section class="article-list">
            <?php
            $result = mysqli_query($conn, "SELECT * FROM blog ORDER BY posted_at DESC");
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<article class='blog-post'>";
                echo "<h2><a href='" . htmlspecialchars($row['link']) . "' target='_blank' rel='noopener noreferrer'>" . htmlspecialchars($row['title']) . "</a></h2>";
                echo "<p>" . nl2br(htmlspecialchars(substr($row['content'], 0, 150))) . "...</p>";
                echo "<span class='category-tag " . strtolower($row['category']) . "'>" . htmlspecialchars($row['category']) . "</span>";
                echo "</article>";
            }
            ?>
        </section>
    </main>

    <footer>
        <div class="copyright">
            <p>&copy; <span id="year">2025</span> Natanael Sitompul</p>
        </div>
    </footer>

    <script src="script.js" defer></script>
</body>
</html>
