<?php
get_header();
?>

<!-- main content -->

<main id="main-content">

  <!-- main posts loop -->
  <section id="posts">

<?php
if( have_posts() ) {
?>
    <div class="js-masonry-container">
<?php
  while( have_posts() ) {
    the_post();
?>

      <div class="js-masonry-item feed-item col">
        <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">
          <a href="<?php the_permalink() ?>">

            <div class="feed-item-title">
              <div class="u-holder">
                <div class="u-held">
                  <h2 class="u-align-center"><?php the_title(); ?></h2>
                </div>
              </div>
            </div>

            <?php the_post_thumbnail( 'medium', 'class=feed-item-img'); ?>

          </a>
        </article>
      </div>

<?php } // END WHILE ?>
  </div>
<?php 
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
<?php
} ?>

  <!-- end posts -->
  </section>

  <?php get_template_part('partials/pagination'); ?>

<!-- end main-content -->

</main>

<?php
get_footer();
?>