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
    $images = get_field('gallery');
?>

    <article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

<?php 
    if ($images) {
?>
      <div class="js-packery-container">
<?php 
      foreach ($images as $image) {
?>
        <div class="js-packery-item col col4 u-pointer">
          <img src="<?php echo $image['url']; ?>">
        </div>
<?php 
      } 
?>
      </div>
      <div class="slider-wrapper">
        <div class="slider-container cycle-slideshow" 
        data-cycle-fx="scrollHorz"
        data-cycle-timeout="0"
        data-cycle-prev="#slider-prev"
        data-cycle-next="#slider-next">
<?php 
      foreach ($images as $image) {
?>
          <img src="<?php echo $image['url']; ?>" class="js-slider-item u-pointer">
<?php 
      } 
?>
        </div>
        <div class="slider-nav">
          <span id="slider-prev" class="u-pointer">&larr;</span>
          <span id="slider-next" class="u-pointer">&rarr;</span>
      </div>
<?php } ?>

    </article>

<?php
  }
} else {
?>
    <article class="u-alert"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
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