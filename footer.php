    <footer id="footer">
    </footer>

  </section>
  <div id="loading" class="u-fixed">
    <p>loading<span>...</span></p>
  </div>

  <?php get_template_part('partials/scripts'); ?>

  <?php if (is_home()) { ?>

  <script type="application/ld+json">
    {
      "@context": "http://schema.org",
      "@type": "Person",
      "url": "http://www.tomcockram.com",
      "email": "info@tomcockram.com",
      "sameAs" : [
        "https://www.linkedin.com/pub/tom-cockram/52/260/867"
        ]
    }
  </script>

  <?php } ?>

  </body>
</html>
