<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

    <div class="container">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
      <div class="col col12">

        <?php the_content(); ?>

      </div>
    </article>

<?php
  }
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no page matched your criteria'); ?></article>
<?php
} ?>

    </div>
  <!-- end posts -->
  </section>

<!-- end main-content -->

</main>

<?php
get_footer();
?>