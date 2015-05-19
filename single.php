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

    <article <?php post_class('single-article'); ?> id="post-<?php the_ID(); ?>">

<?php 
    if ($images) {
?>  
      <div class="masonry-content">
        <div class="js-masonry-container">
<?php 
      $i = 0;
      foreach ($images as $image) {
?>
          <div class="js-masonry-item js-single-masonry-item col col4 u-pointer" data-index="<?php echo $i; ?>">
            <img src="<?php echo $image['url']; ?>">
          </div>
<?php 
        $i++;
      } 
?>
        </div>
      </div>

      <div class="slider-content slider-hidden">
        <div class="slider-wrapper">
          <div class="slider-container cycle-slideshow" 
          data-cycle-fx="scrollHorz"
          data-cycle-timeout="0"
          data-cycle-prev=".slider-prev"
          data-cycle-next=".slider-next"
          data-cycle-slides=".slider-item">
<?php 
      foreach ($images as $image) {
?>
            <div class="slider-item">
              <div class="u-holder">
                <div class="u-held">
                  <img src="<?php echo $image['url']; ?>" class="slider-img u-pointer slider-next">
                </div>
              </div>
            </div>
<?php 
      } 
?>  
          </div>
          <div class="slider-nav">
            <span class="u-pointer slider-prev">&larr;</span>
            <span class="u-pointer slider-next">&rarr;</span>
          </div>
        </div>
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