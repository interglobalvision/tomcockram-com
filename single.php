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
    $meta = get_post_meta($post->ID);
?>

    <article <?php post_class('single-article'); ?> id="post-<?php the_ID(); ?>">

<?php
    if ($meta['_igv_vimeo'][0]) {
?>
      <div id="single-vimeo-embed" class="u-video-embed-container">
        <iframe id="vimeo-embed" src="//player.vimeo.com/video/<?php echo $meta['_igv_vimeo'][0]; ?>?badge=0&byline=0&color=FFF&portrait=0&title=0" width="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </div>
<?php
}
    if ($images) {
?>
      <div class="masonry-content">
        <div class="js-masonry-container">
<?php
      $i = 0;
      foreach ($images as $image) {
?>
          <div class="js-masonry-item js-single-masonry-item col u-pointer" style="width: <?php echo mt_rand(15, 40); ?>%; margin-bottom: <?php echo mt_rand(50, 250); ?>px; margin-right: <?php echo mt_rand(30, 60); ?>px;" data-index="<?php echo $i; ?>">
            <img src="<?php echo $image['sizes']['single-thumb']; ?>">
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
                  <img src="<?php echo $image['sizes']['single-full']; ?>" class="slider-img">
                </div>
              </div>
            </div>
<?php
      }
?>
          </div>
          <div class="slider-nav slider-prev"></div>
          <div class="slider-nav slider-next"></div>
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